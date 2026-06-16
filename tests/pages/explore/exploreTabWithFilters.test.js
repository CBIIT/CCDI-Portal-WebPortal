/**
 * Explore milestone 2.3 — main tab navigation while a facet filter is active: Redux
 * `activeFilters` and `dashData` stay aligned with the filtered dashboard payload, the
 * query string keeps facet + `tab` when using `generateQueryStr`, and a tab-only click
 * does not issue another `client.query` after the facet refetch settles.
 *
 * Combines patterns from `exploreFacetFilterUi.test.js` (sidebar → Female) and
 * `exploreTabSwitching.test.js` (`createMemoryRouter` + tab roles).
 *
 * @see src/pages/inventory/tabs/TabsView.js
 * @see src/pages/inventory/sideBar/BentoFacetFilter.js (updateBrowserUrl)
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
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import '@testing-library/jest-dom';
import { useApolloClient } from '@apollo/client';

import store from '../../../src/store';
import Inventory from '../../../src/pages/inventory/inventoryController';
import {
  exploreDashboardWithSexAtBirthFacets,
  exploreDashboardFemaleOnly,
} from '../../fixtures/explore/apiResponses';
import { resetExploreSingletonStore } from '../../helpers/exploreStoreReset';

function renderExploreWithRouter() {
  const router = createMemoryRouter(
    [
      {
        path: '/explore',
        element: (
          <Provider store={store}>
            <Inventory />
          </Provider>
        ),
      },
    ],
    { initialEntries: ['/explore'] },
  );
  const utils = render(<RouterProvider router={router} />);
  return { ...utils, router };
}

/** Open Demographics → Sex at Birth → Female (same strategy as exploreFacetFilterUi.test.js). */
async function selectSexAtBirthFemale() {
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
}

describe('Explore — tabs with active facet filters (2.3)', () => {
  let mockQuery;

  beforeEach(() => {
    jest.clearAllMocks();
    resetExploreSingletonStore();

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

  it('should keep Female filter and filtered counts after switching to Studies without extra dashboard query', async () => {
    const { router } = renderExploreWithRouter();

    await waitFor(() => {
      const participantTab = screen.getAllByRole('tab').find((el) => /Participants/i.test(el.textContent));
      expect(participantTab).toBeTruthy();
      expect(participantTab.textContent).toMatch(/\(3\)/);
    });

    await selectSexAtBirthFemale();

    expect(store.getState().inventoryReducer.activeFilters.sex_at_birth).toEqual(['Female']);

    const queryCallsAfterFacet = mockQuery.mock.calls.length;

    const studiesTab = screen.getAllByRole('tab').find((t) => /Studies/i.test(t.textContent));
    expect(studiesTab).toBeTruthy();
    fireEvent.click(studiesTab);

    await waitFor(() => {
      expect(store.getState().inventoryReducer.tab).toBe(1);
    });

    expect(store.getState().inventoryReducer.activeFilters.sex_at_birth).toEqual(['Female']);
    expect(store.getState().inventoryReducer.dashData.numberOfParticipants).toBe(2);

    const participantTab = screen.getAllByRole('tab').find((el) => /Participants/i.test(el.textContent));
    expect(participantTab.textContent).toMatch(/\(2\)/);

    const search = router.state.location.search;
    expect(search).toMatch(/tab=1\b/);
    expect(search).toMatch(/sex_at_birth=Female/i);

    await waitFor(() => {
      expect(mockQuery.mock.calls.length).toBe(queryCallsAfterFacet);
    });
  });

  it('should preserve facet state when switching to Files then back to Participants', async () => {
    renderExploreWithRouter();

    await waitFor(() => {
      expect(screen.getAllByRole('tab').some((el) => /Participants/i.test(el.textContent))).toBe(true);
    });

    await selectSexAtBirthFemale();

    const queryCallsAfterFacet = mockQuery.mock.calls.length;

    const filesTab = screen.getAllByRole('tab').find((t) => /\bFiles\b/i.test(t.textContent || ''));
    fireEvent.click(filesTab);

    await waitFor(() => {
      expect(store.getState().inventoryReducer.tab).toBe(3);
    });

    expect(store.getState().inventoryReducer.activeFilters.sex_at_birth).toEqual(['Female']);
    expect(store.getState().inventoryReducer.dashData.numberOfParticipants).toBe(2);

    fireEvent.click(screen.getAllByRole('tab').find((t) => /Participants/i.test(t.textContent)));

    await waitFor(() => {
      expect(store.getState().inventoryReducer.tab).toBe(0);
    });

    expect(store.getState().inventoryReducer.activeFilters.sex_at_birth).toEqual(['Female']);

    await waitFor(() => {
      expect(mockQuery.mock.calls.length).toBe(queryCallsAfterFacet);
    });
  });
});
