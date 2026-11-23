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
import { act, render, screen, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import '@testing-library/jest-dom';
import axios from 'axios';
import LandingController from '../../../src/pages/landing/landingController';
import { LANDING_DATA_QUERY } from '../../../src/bento/landingPageData';
import {
  ccdcDatasetsCountUrl,
  ccdcDatasetsCountFormatted,
  nccrManualCaseCountFormatted,
  cBioPortalStudiesUrl,
  cBioPortalStudiesCountFormatted,
  federationOrganizationsUrl,
  federationOrganizationsCountFormatted,
  c3dcParticipantCountFormatted,
  landingDataQueryData,
} from '../../fixtures/landing/apiResponses';
import { createCcdcFetchMock, setupNewsYamlAxiosMock } from '../../helpers/landingApiMocks';
import { sampleLandingMarkdownRaw } from '../../fixtures/landing/landingMarkdownSamples';

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
setupNewsYamlAxiosMock({ landingMarkdown: sampleLandingMarkdownRaw });

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
  setupNewsYamlAxiosMock({ landingMarkdown: sampleLandingMarkdownRaw });
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

  it('should call MCI GraphQL query on C3DC and display the mocked count', async () => {
    renderLandingController();

    await waitFor(() => {
      expect(mockQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          query: LANDING_DATA_QUERY,
          variables: {},
          context: { clientName: 'c3dcService' },
          fetchPolicy: 'network-only',
        }),
      );
    });

    await waitFor(() => {
      expect(screen.getByText(String(landingDataQueryData.numberOfMCICount))).toBeInTheDocument();
    });
  });

  it('should keep live catalog and MCI counts when landing copy arrives later', async () => {
    let releaseLanding;
    axios.get.mockImplementation((url) => {
      const pathPart = String(url).split('?')[0];
      if (pathPart.endsWith('/landingData.md')) {
        return new Promise((resolve) => {
          releaseLanding = () => resolve({
            data: sampleLandingMarkdownRaw
              .replace(
                '  - title: Cataloged Datasets\n',
                '  - title: Cataloged Datasets\n    num: 1\n',
              )
              .replace(
                '  - title: Participants with Available Genomic and Clinical Data\n',
                '  - title: Participants with Available Genomic and Clinical Data\n    num: 2\n',
              ),
          });
        });
      }
      if (pathPart.endsWith('/newsData.md')
        || pathPart.endsWith('/releaseNotesData.md')
        || pathPart.endsWith('/ccdiDataUpdates.md')) {
        return Promise.resolve({ data: '' });
      }
      return Promise.reject(new Error(`Unexpected axios.get URL in test: ${url}`));
    });

    renderLandingController();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(ccdcDatasetsCountUrl);
      expect(mockQuery).toHaveBeenCalled();
    });

    await act(async () => {
      releaseLanding();
    });

    await waitFor(() => {
      expect(screen.getByText(ccdcDatasetsCountFormatted)).toBeInTheDocument();
      expect(screen.getByText(String(landingDataQueryData.numberOfMCICount))).toBeInTheDocument();
      expect(screen.getByText(nccrManualCaseCountFormatted)).toBeInTheDocument();
    });
  });

  it('should show the C3DC participant count before the cBioPortal stat', async () => {
    renderLandingController();

    await waitFor(() => {
      expect(screen.getByText(c3dcParticipantCountFormatted)).toBeInTheDocument();
    });

    const commonsLink = screen.getByRole('link', { name: /Childhood Clinical Cancer Data Commons/i });
    expect(commonsLink).toHaveAttribute(
      'href',
      'https://clinicalcommons.ccdi.cancer.gov/exploreParticipants',
    );
    expect(screen.getByText('Participants with Harmonized Clinical Data')).toBeInTheDocument();

    const statsSection = screen.getByTestId('landing-stats-section');
    const links = within(statsSection).getAllByRole('link');
    const commonsAt = links.findIndex((link) => /Clinical Cancer Data Commons/i.test(link.textContent));
    const cbioAt = links.findIndex((link) => /cBioPortal/i.test(link.textContent));
    expect(commonsAt).toBeGreaterThan(-1);
    expect(cbioAt).toBeGreaterThan(commonsAt);
  });

  it('should count cBioPortal studies and link the explorer label', async () => {
    renderLandingController();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(cBioPortalStudiesUrl);
    });

    await waitFor(() => {
      expect(screen.getByText(cBioPortalStudiesCountFormatted)).toBeInTheDocument();
    });

    const explorerLink = screen.getByRole('link', { name: /CCDI cBioPortal/i });
    expect(explorerLink).toHaveAttribute('href', 'https://cbioportal.ccdi.cancer.gov');
    expect(screen.getByText('Datasets with Mutation and Other Data')).toBeInTheDocument();
  });

  it('should count federation organization groups and link the federation resource', async () => {
    renderLandingController();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(federationOrganizationsUrl);
    });

    await waitFor(() => {
      expect(screen.getByText(federationOrganizationsCountFormatted)).toBeInTheDocument();
    });

    const federationLink = screen.getByRole('link', { name: /CCDI Federation Resource/i });
    expect(federationLink).toHaveAttribute('href', '/data-federation-resource');
    expect(screen.getByText('Resources Participating in Federated Data Queries')).toBeInTheDocument();
  });

  it('should show the manual NCCR Explorer case count without calling the NCCR endpoint', async () => {
    renderLandingController();

    await waitFor(() => {
      expect(screen.getByText(nccrManualCaseCountFormatted)).toBeInTheDocument();
    });

    const nccrCalls = global.fetch.mock.calls.filter(([url]) => String(url).includes('CCDI-NCCR_Explorer'));
    expect(nccrCalls).toHaveLength(0);
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
      expect.objectContaining({
        query: LANDING_DATA_QUERY,
        context: { clientName: 'c3dcService' },
      }),
    );
  });

  it('should request landingData.md with cache-bust query', async () => {
    renderLandingController();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/\/landingData\.md\?ts=/),
      );
    });
  });

  it('should overlay hero title from landingData.md when fetch succeeds', async () => {
    setupNewsYamlAxiosMock({
      landingMarkdown: `---
heroTitle: Remote Hero Title Here
heroSubtitle: Remote subtitle from markdown
introTitle3: ABOUT CCDI HUB
introButtonTitle: ABOUT CCDI
---
`,
    });

    renderLandingController();

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Remote');
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hero');
      expect(screen.getByText(/Remote subtitle from markdown/)).toBeInTheDocument();
    });
  });

  it('should leave hero empty when landingData.md is unavailable', async () => {
    setupNewsYamlAxiosMock();

    renderLandingController();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/\/landingData\.md\?ts=/),
      );
    });

    await waitFor(() => {
      const heroHeading = screen.getByRole('heading', { level: 1 });
      expect(heroHeading).toHaveTextContent('');
    });
  });
});
