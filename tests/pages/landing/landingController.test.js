/**
 * Integration-style tests for LandingController: mock the count APIs (CCDC and MCI)
 * and assert the frontend displays the mocked counts. Uses React Testing Library.
 *
 * Mock response shapes and URLs live in tests/fixtures/landing/apiResponses.js
 * (aligned with src/pages/landing/landingController.js). Network behavior is wired via
 * tests/helpers/landingApiMocks.js — no real HTTP calls.
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import '@testing-library/jest-dom';
import axios from 'axios';
import LandingController from '../../../src/pages/landing/landingController';
import { LANDING_DATA_QUERY } from '../../../src/bento/landingPageData';
import {
  ccdcDatasetsCountUrl,
  ccdcDatasetsCountFormatted,
  landingDataQueryData,
} from '../../fixtures/landing/apiResponses';
import { createCcdcFetchMock, setupNewsYamlAxiosMock } from '../../helpers/landingApiMocks';

// Ensure MutationObserver exists for RTL async helpers (e.g. waitFor) in this test env
if (typeof global.MutationObserver === 'undefined') {
  global.MutationObserver = class MutationObserver {
    disconnect() {}
    observe() {}
    takeRecords() { return []; }
  };
}

// Mock child components to avoid asset/context dependencies
jest.mock('../../../src/pages/landing/component/carousel', () => function Carousel() {
  return <div data-testid="carousel" />;
});
jest.mock('../../../src/pages/landing/component/heroMobile', () => function HeroMobile() {
  return <div data-testid="hero-mobile" />;
});
jest.mock('../../../src/pages/landing/component/latestUpdate', () => function LatestUpdate() {
  return <div data-testid="latest-update" />;
});

// Mock Apollo useApolloClient — closure reads mockQuery after init (see module comment above)
const mockQuery = jest.fn(() => Promise.resolve({ data: landingDataQueryData }));
jest.mock('@apollo/client', () => {
  const actual = jest.requireActual('@apollo/client');
  return {
    ...actual,
    useApolloClient: () => ({ query: mockQuery }),
  };
});

// Avoid real env and news request
jest.mock('../../../src/utils/env', () => ({
  REACT_APP_STATIC_CONTENT_URL: 'https://static.example.com/',
}));
setupNewsYamlAxiosMock();

// Minimal Redux store for connected LandingController (mapStateToProps is empty)
const rootReducer = combineReducers({
  layout: (state = {}) => state,
  stats: (state = {}) => state,
  inventoryReducer: (state = {}) => state,
  localFind: (state = {}) => state,
  cartReducer: (state = {}) => state,
  statusReducer: (state = {}) => state,
});
const store = createStore(rootReducer);

function renderLandingController() {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <LandingController />
      </MemoryRouter>
    </Provider>,
  );
}

beforeEach(() => {
  window.scrollTo = jest.fn();
  mockQuery.mockClear();
  mockQuery.mockImplementation(() => Promise.resolve({ data: landingDataQueryData }));
  axios.get.mockClear();
  setupNewsYamlAxiosMock();
  global.fetch = createCcdcFetchMock();
});

describe('LandingController (mocked count APIs)', () => {
  it('should call CCDC count endpoint and display the mocked count', async () => {
    renderLandingController();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(ccdcDatasetsCountUrl);
    });

    await waitFor(() => {
      expect(screen.getByText(ccdcDatasetsCountFormatted)).toBeInTheDocument();
    });
  });

  it('should call MCI GraphQL query and display the mocked count', async () => {
    renderLandingController();

    await waitFor(() => {
      expect(mockQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          query: LANDING_DATA_QUERY,
          variables: {},
        }),
      );
    });

    await waitFor(() => {
      expect(screen.getByText(String(landingDataQueryData.numberOfMCICount))).toBeInTheDocument();
    });
  });

  it('should display both CCDC and MCI counts when both APIs resolve', async () => {
    renderLandingController();

    await waitFor(() => {
      expect(screen.getByText(ccdcDatasetsCountFormatted)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(String(landingDataQueryData.numberOfMCICount))).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith(ccdcDatasetsCountUrl);
    expect(mockQuery).toHaveBeenCalledWith(
      expect.objectContaining({ query: LANDING_DATA_QUERY }),
    );
  });
});
