/**
 * Explore milestone 2.2 — main tab strip: user switches tabs, URL gains `tab=`, Redux
 * `inventoryReducer.tab` updates, and the dashboard query is not re-run for a tab-only
 * change (action_type `not-facet` path in `inventoryCover`).
 *
 * Uses the real singleton `src/store` and the same mock stack as `exploreFacetFilterUi.test.js`
 * (TabPanel is still a light stub so table stacks are not mounted).
 *
 * @see src/pages/inventory/tabs/TabsView.js
 * @see src/pages/inventory/inventoryCover.js
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
import { exploreDashboardWithSexAtBirthFacets } from '../../fixtures/explore/apiResponses';
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

describe('Explore — main tab switching (TabsView)', () => {
  let mockQuery;

  beforeEach(() => {
    jest.clearAllMocks();
    resetExploreSingletonStore();

    mockQuery = jest.fn();
    useApolloClient.mockReturnValue({ query: mockQuery });

    mockQuery.mockResolvedValue({
      data: { searchParticipants: exploreDashboardWithSexAtBirthFacets },
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

  it('should navigate with tab in the URL and set Redux tab when user selects Studies', async () => {
    const { router } = renderExploreWithRouter();

    await waitFor(() => {
      expect(screen.getAllByRole('tab').some((t) => /Studies/i.test(t.textContent))).toBe(true);
    });

    await waitFor(() => {
      expect(mockQuery).toHaveBeenCalled();
    });
    const queryCallsAfterLoad = mockQuery.mock.calls.length;

    const studiesTab = screen.getAllByRole('tab').find((t) => /Studies/i.test(t.textContent));
    expect(studiesTab).toBeTruthy();
    fireEvent.click(studiesTab);

    await waitFor(() => {
      expect(store.getState().inventoryReducer.tab).toBe(1);
    });

    expect(router.state.location.pathname).toBe('/explore');
    expect(router.state.location.search).toMatch(/tab=1\b/);

    await waitFor(() => {
      expect(mockQuery.mock.calls.length).toBe(queryCallsAfterLoad);
    });
  });

  it('should update URL and Redux when user selects Files', async () => {
    const { router } = renderExploreWithRouter();

    await waitFor(() => {
      expect(screen.getAllByRole('tab').some((t) => /Files/i.test(t.textContent))).toBe(true);
    });

    const filesTab = screen.getAllByRole('tab').find((t) => /\bFiles\b/i.test(t.textContent || ''));
    expect(filesTab).toBeTruthy();
    fireEvent.click(filesTab);

    await waitFor(() => {
      expect(store.getState().inventoryReducer.tab).toBe(3);
    });

    expect(router.state.location.search).toMatch(/tab=3\b/);
  });

  it('should allow switching back to Participants and reflect tab index 0', async () => {
    const { router } = renderExploreWithRouter();

    await waitFor(() => {
      expect(screen.getAllByRole('tab').some((t) => /Samples/i.test(t.textContent))).toBe(true);
    });

    fireEvent.click(screen.getAllByRole('tab').find((t) => /Samples/i.test(t.textContent)));

    await waitFor(() => {
      expect(store.getState().inventoryReducer.tab).toBe(2);
    });

    const participantsTab = screen.getAllByRole('tab').find((t) => /Participants/i.test(t.textContent));
    expect(participantsTab).toBeTruthy();
    fireEvent.click(participantsTab);

    await waitFor(() => {
      expect(store.getState().inventoryReducer.tab).toBe(0);
    });

    expect(router.state.location.search).toMatch(/tab=0\b/);
  });
});
