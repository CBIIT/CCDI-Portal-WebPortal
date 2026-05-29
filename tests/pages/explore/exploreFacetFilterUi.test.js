/**
 * UI integration: explore facet sidebar — open Demographics, select Sex at Birth → Female,
 * verify dashboard query variables and participant tab count update (mocked Apollo).
 *
 * inventoryCover dispatches to the singleton src/store (not only React context), so this
 * test must use that same store instance in <Provider>.
 *
 * Uses fixtures from tests/fixtures/explore/apiResponses.js
 */

jest.mock('../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_BACKEND_API: 'http://localhost:4000/graphql',
    REACT_APP_INTEROP_SERVICE_API: 'http://localhost:5000/',
  },
}));

jest.mock('../../../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: {
    query: jest.fn(() => Promise.resolve({ data: {} })),
    mutate: jest.fn(),
  },
}));

jest.mock('@apollo/client', () => {
  const actual = jest.requireActual('@apollo/client');
  return {
    ...actual,
    useApolloClient: jest.fn(),
  };
});

jest.mock('../../../src/pages/inventory/widget/WidgetView', () => ({
  __esModule: true,
  default: function MockWidgetView() {
    return null;
  },
}));

jest.mock('../../../src/pages/inventory/tabs/TabPanel', () => ({
  __esModule: true,
  default: function TabPanel() {
    const React = require('react');
    return React.createElement('div', { 'data-testid': 'tab-panel' });
  },
}));

jest.mock('../../../src/components/CohortSelectorState/CohortStateContext', () => {
  const React = require('react');
  const { initialState } = require('../../../src/components/CohortSelectorState/store/reducer');
  const cohortDispatch = jest.fn();
  const CohortStateContext = React.createContext({ state: initialState, dispatch: cohortDispatch });
  return {
    CohortStateContext,
    CohortStateProvider: ({ children }) => (
      React.createElement(CohortStateContext.Provider, {
        value: { state: initialState, dispatch: cohortDispatch },
      }, children)
    ),
  };
});

jest.mock('../../../src/pages/inventory/cohortModal/cohortModalGenerator', () => ({
  __esModule: true,
  default: () => ({
    CohortModal: function CohortModal() {
      return null;
    },
  }),
}));

jest.mock('../../../src/pages/inventory/cohortModal/CohortModalContext', () => {
  const React = require('react');
  const CohortModalContext = React.createContext();
  const value = {
    showCohortModal: false,
    setShowCohortModal: jest.fn(),
    warningMessage: '',
    setWarningMessage: jest.fn(),
    currentCohortChanges: null,
    setCurrentCohortChanges: jest.fn(),
  };
  return {
    CohortModalContext,
    CohortModalProvider: ({ children }) => (
      React.createElement(CohortModalContext.Provider, { value }, children)
    ),
  };
});

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import { useApolloClient } from '@apollo/client';

import store from '../../../src/store';
import Inventory from '../../../src/pages/inventory/inventoryController';
import {
  exploreDashboardWithSexAtBirthFacets,
  exploreDashboardFemaleOnly,
} from '../../fixtures/explore/apiResponses';

function renderExplorePage() {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/explore']}>
        <Routes>
          <Route path="/explore" element={<Inventory />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

describe('Explore — facet filter UI (Sex at Birth)', () => {
  let mockQuery;

  beforeEach(() => {
    jest.clearAllMocks();
    mockQuery = jest.fn();
    useApolloClient.mockReturnValue({ query: mockQuery });

    mockQuery.mockImplementation(async ({ variables }) => {
      if (
        variables
        && Array.isArray(variables.sex_at_birth)
        && variables.sex_at_birth.includes('Female')
      ) {
        return { data: { searchParticipants: exploreDashboardFemaleOnly } };
      }
      return { data: { searchParticipants: exploreDashboardWithSexAtBirthFacets } };
    });

    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
  });

  it('should open Demographics, select Female, refetch with sex_at_birth, and update participant count', async () => {
    renderExplorePage();

    await waitFor(() => {
      const participantTabInitial = screen.getAllByRole('tab').find((el) => /Participants/i.test(el.textContent));
      expect(participantTabInitial).toBeTruthy();
      expect(participantTabInitial.textContent).toMatch(/\(3\)/);
    });

    expect(mockQuery).toHaveBeenCalled();
    const firstCallVars = mockQuery.mock.calls[0][0].variables;
    expect(firstCallVars.sex_at_birth).toBeUndefined();

    const demoHeading = screen.getByText('Demographics');
    fireEvent.click(demoHeading.closest('li') || demoHeading);

    await waitFor(() => {
      expect(screen.getByText('Sex at Birth')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Sex at Birth'));

    const facetsRoot = await waitFor(() => {
      const el = document.querySelector('[class*="contentPanelBody"]');
      expect(el).toBeTruthy();
      return el;
    });

    await waitFor(() => {
      const anyFacet = facetsRoot.querySelector('input[type="checkbox"], [role="checkbox"]');
      expect(anyFacet).toBeTruthy();
    });

    const femaleTarget = await waitFor(() => {
      const leaves = facetsRoot.querySelectorAll('*');
      const textNode = [...leaves].find(
        (n) => n.children.length === 0 && /\bFemale\b/i.test((n.textContent || '').trim()),
      );
      expect(textNode).toBeTruthy();
      const clickable = textNode.closest('.MuiFormControlLabel-root')
        || textNode.closest('button')
        || textNode.closest('li')
        || textNode.parentElement;
      expect(clickable).toBeTruthy();
      return clickable;
    });

    fireEvent.click(femaleTarget);

    await waitFor(() => {
      expect(store.getState().inventoryReducer.dashData.numberOfParticipants).toBe(2);
    });

    expect(store.getState().inventoryReducer.activeFilters.sex_at_birth).toEqual(['Female']);

    const participantTab = screen.getAllByRole('tab').find((el) => /Participants/i.test(el.textContent));
    expect(participantTab).toBeTruthy();
    expect(participantTab.textContent).toMatch(/\(2\)/);

    const femaleCall = mockQuery.mock.calls.find(
      (call) => call[0].variables
        && Array.isArray(call[0].variables.sex_at_birth)
        && call[0].variables.sex_at_birth.includes('Female'),
    );
    expect(femaleCall).toBeTruthy();
    expect(femaleCall[0].variables.sex_at_birth).toEqual(['Female']);
  });

  it('should close the sidebar content panel when close icon is clicked', async () => {
    renderExplorePage();

    await waitFor(() => {
      expect(screen.getByText('Demographics')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Demographics').closest('li'));

    await waitFor(() => {
      expect(screen.getByAltText('vector')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByAltText('close').closest('a'));

    await waitFor(() => {
      expect(screen.queryByAltText('vector')).not.toBeInTheDocument();
    });
  });

  it('should collapse the category row when the same section heading is clicked twice', async () => {
    renderExplorePage();

    await waitFor(() => {
      expect(screen.getByText('Demographics')).toBeInTheDocument();
    });

    const demoRow = screen.getByText('Demographics').closest('li');
    expect(demoRow).toBeTruthy();

    fireEvent.click(demoRow);

    await waitFor(() => {
      expect(screen.getByAltText('vector')).toBeInTheDocument();
    });

    fireEvent.click(demoRow);

    await waitFor(() => {
      expect(screen.queryByAltText('vector')).not.toBeInTheDocument();
    });
  });
});
