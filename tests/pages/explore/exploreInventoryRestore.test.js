/**
 * Explore milestone 2.6 — `inventoryCover` restore paths and `import_from` failure:
 *
 * - **Return to explore:** empty URL + `return_2_page` + saved `return_query_url` → `navigate` restores query.
 * - **Main menu:** empty URL + `navigationType === 'main_menu'` + saved `return_query_url` → same restore branch.
 * - **`import_from` fetch rejects:** catch block clears import state and still runs `continueWithFilters()` (dashboard query).
 *
 * @see src/pages/inventory/inventoryCover.js (effects at lines ~106–116, ~218–231)
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
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  MemoryRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import '@testing-library/jest-dom';
import { useApolloClient } from '@apollo/client';

import store from '../../../src/store';
import Inventory from '../../../src/pages/inventory/inventoryController';
import {
  return2Page,
  returnQueryUrl,
} from '../../../src/components/Inventory/InventoryState';
import {
  exploreDashboardFemaleOnly,
  exploreDashboardWithSexAtBirthFacets,
} from '../../fixtures/explore/apiResponses';
import { resetExploreSingletonStore } from '../../helpers/exploreStoreReset';

const IMPORT_JSON_URL = 'https://cdn.example.com/ccdi/import-list.json';

/** Exposes `useLocation()` for assertions (same router context as `Inventory`). */
function LocationProbe() {
  const { pathname, search } = useLocation();
  return (
    <div
      data-testid="location-probe"
      data-pathname={pathname}
      data-search={search}
    />
  );
}

function setupFemaleExactMock(mockQueryFn) {
  mockQueryFn.mockImplementation(async ({ variables }) => {
    const sex = variables?.sex_at_birth;
    if (Array.isArray(sex) && sex.length === 1 && sex[0] === 'Female') {
      return { data: { searchParticipants: exploreDashboardFemaleOnly } };
    }
    return { data: { searchParticipants: exploreDashboardWithSexAtBirthFacets } };
  });
}

function renderExploreAtEntry(initialEntry) {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route
            path="/explore"
            element={(
              <>
                <LocationProbe />
                <Inventory />
              </>
            )}
          />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

let fetchBackup;

describe('Explore — restore navigation & import_from failure (inventoryCover)', () => {
  let mockQuery;

  beforeAll(() => {
    fetchBackup = global.fetch;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = fetchBackup;
    resetExploreSingletonStore();

    mockQuery = jest.fn();
    useApolloClient.mockReturnValue({ query: mockQuery });
    setupFemaleExactMock(mockQuery);

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

  afterEach(() => {
    global.fetch = fetchBackup;
  });

  it('should navigate to saved return_query_url when return_2_page is true and /explore has no search', async () => {
    store.dispatch(return2Page(true));
    store.dispatch(returnQueryUrl('?sex_at_birth=Female'));

    renderExploreAtEntry('/explore');

    await waitFor(() => {
      expect(screen.getByTestId('location-probe').getAttribute('data-search')).toMatch(
        /sex_at_birth=Female/i,
      );
    });

    await waitFor(() => {
      expect(mockQuery).toHaveBeenCalled();
    });

    const femaleCall = mockQuery.mock.calls.find(
      (call) => call[0].variables
        && Array.isArray(call[0].variables.sex_at_birth)
        && call[0].variables.sex_at_birth[0] === 'Female',
    );
    expect(femaleCall).toBeTruthy();
  });

  it('should navigate to saved return_query_url for main_menu when query is empty', async () => {
    store.dispatch(returnQueryUrl('?tab=2'));

    renderExploreAtEntry({
      pathname: '/explore',
      search: '',
      state: { navigationType: 'main_menu' },
    });

    await waitFor(() => {
      expect(screen.getByTestId('location-probe').getAttribute('data-search')).toMatch(/tab=2\b/);
    });

    await waitFor(() => {
      expect(store.getState().inventoryReducer.tab).toBe(2);
    });
  });

  describe('import_from fetch failure', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.reject(new Error('import JSON failed')));
    });

    it('should clear import state and still run the dashboard query', async () => {
      const path = `/explore?import_from=${encodeURIComponent(IMPORT_JSON_URL)}`;
      renderExploreAtEntry(path);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(IMPORT_JSON_URL);
      });

      await waitFor(() => {
        expect(mockQuery).toHaveBeenCalled();
      });

      expect(store.getState().inventoryReducer.importFromURL).toBeNull();
      expect(store.getState().inventoryReducer.importFromData).toEqual([]);

      const firstVars = mockQuery.mock.calls[0][0].variables;
      expect(firstVars.import_data).toBeUndefined();
    });
  });

  describe('Unknown-age URL sync', () => {
    it('should add and remove age_at_diagnosis_unknownAges in URL when unknownAges state changes', async () => {
      renderExploreAtEntry('/explore?age_at_diagnosis=0,18');

      await waitFor(() => {
        expect(mockQuery).toHaveBeenCalled();
      });

      store.dispatch({
        type: 'UNKNOWN_AGES_CHANGED',
        payload: {
          datafield: 'age_at_diagnosis',
          unknownAges: 'exclude',
        },
      });

      await waitFor(() => {
        expect(screen.getByTestId('location-probe').getAttribute('data-search')).toMatch(
          /age_at_diagnosis_unknownAges=exclude/,
        );
      });

      store.dispatch({
        type: 'UNKNOWN_AGES_CHANGED',
        payload: {
          datafield: 'age_at_diagnosis',
          unknownAges: 'include',
        },
      });

      await waitFor(() => {
        expect(screen.getByTestId('location-probe').getAttribute('data-search')).not.toMatch(
          /age_at_diagnosis_unknownAges=/,
        );
      });
    });
  });
});
