/**
 * Explore milestone 2.1 — URL query sync with inventoryCover / getData / Redux.
 *
 * inventoryCover parses `URLSearchParams` (facets, tab, p_id, u, import_from, age ranges, …)
 * and builds `filters` for `client.query(DASHBOARD_QUERY_NEW, { variables: filters })`.
 *
 * Uses the real singleton `src/store` (same as exploreFacetFilterUi.test.js).
 * Structure follows tests/TEST_STRUCTURE.md.
 *
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
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import { useApolloClient } from '@apollo/client';

import store from '../../../src/store';
import Inventory from '../../../src/pages/inventory/inventoryController';
import {
  exploreDashboardFemaleOnly,
  exploreDashboardWithSexAtBirthFacets,
} from '../../fixtures/explore/apiResponses';
import { resetExploreSingletonStore } from '../../helpers/exploreStoreReset';

const IMPORT_JSON_URL = 'https://cdn.example.com/ccdi/import-list.json';

function renderExploreAtPath(path) {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/explore" element={<Inventory />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

/** Female-only dashboard fixture only when URL encodes exactly one sex value (Female). */
function setupDashboardQueryMock(mockQueryFn) {
  mockQueryFn.mockImplementation(async ({ variables }) => {
    const sex = variables?.sex_at_birth;
    if (Array.isArray(sex) && sex.length === 1 && sex[0] === 'Female') {
      return { data: { searchParticipants: exploreDashboardFemaleOnly } };
    }
    return { data: { searchParticipants: exploreDashboardWithSexAtBirthFacets } };
  });
}

let fetchBackup;

describe('Explore — URL query integration (inventoryCover)', () => {
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

    setupDashboardQueryMock(mockQuery);

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

  describe('Facet filters from search string', () => {
    it('should call the dashboard query with sex_at_birth from ?sex_at_birth=Female and sync Redux', async () => {
      renderExploreAtPath('/explore?sex_at_birth=Female');

      await waitFor(() => {
        expect(mockQuery).toHaveBeenCalled();
      });

      const femaleCall = mockQuery.mock.calls.find(
        (call) => call[0].variables
          && Array.isArray(call[0].variables.sex_at_birth)
          && call[0].variables.sex_at_birth.includes('Female'),
      );
      expect(femaleCall).toBeTruthy();
      expect(femaleCall[0].variables.sex_at_birth).toEqual(['Female']);

      await waitFor(() => {
        expect(store.getState().inventoryReducer.activeFilters?.sex_at_birth).toEqual(['Female']);
      });

      await waitFor(() => {
        expect(store.getState().inventoryReducer.dashData?.numberOfParticipants).toBe(2);
      });
    });

    it('should parse pipe-separated facet values (?sex_at_birth=Female|Male)', async () => {
      renderExploreAtPath('/explore?sex_at_birth=Female|Male');

      await waitFor(() => {
        expect(mockQuery).toHaveBeenCalled();
      });

      const vars = mockQuery.mock.calls[0][0].variables;
      expect(vars.sex_at_birth).toEqual(['Female', 'Male']);

      await waitFor(() => {
        expect(store.getState().inventoryReducer.activeFilters?.sex_at_birth).toEqual([
          'Female',
          'Male',
        ]);
      });

      expect(store.getState().inventoryReducer.dashData?.numberOfParticipants).toBe(3);
    });
  });

  describe('Age range and unknown-age flags', () => {
    it('should pass age_at_diagnosis as [min,max] from comma-separated query value', async () => {
      renderExploreAtPath('/explore?age_at_diagnosis=5,120');

      await waitFor(() => {
        expect(mockQuery).toHaveBeenCalled();
      });

      expect(mockQuery.mock.calls[0][0].variables.age_at_diagnosis).toEqual([5, 120]);
    });

    it('should add age_at_diagnosis_unknownAges to variables when query includes it', async () => {
      renderExploreAtPath(
        '/explore?age_at_diagnosis=0,18&age_at_diagnosis_unknownAges=exclude',
      );

      await waitFor(() => {
        expect(mockQuery).toHaveBeenCalled();
      });

      const v = mockQuery.mock.calls[0][0].variables;
      expect(v.age_at_diagnosis).toEqual([0, 18]);
      expect(v.age_at_diagnosis_unknownAges).toEqual(['exclude']);
    });

    it('should omit age_at_diagnosis from query variables when the range is not two comma-separated numbers', async () => {
      renderExploreAtPath('/explore?age_at_diagnosis=5');

      await waitFor(() => {
        expect(mockQuery).toHaveBeenCalled();
      });

      expect(mockQuery.mock.calls[0][0].variables.age_at_diagnosis).toBeUndefined();
    });

    it('should omit age_at_diagnosis when the range has invalid numeric bounds', async () => {
      renderExploreAtPath('/explore?age_at_diagnosis=NaN,10');

      await waitFor(() => {
        expect(mockQuery).toHaveBeenCalled();
      });

      expect(mockQuery.mock.calls[0][0].variables.age_at_diagnosis).toBeUndefined();
    });
  });

  describe('Participant id and upload query params', () => {
    it('should merge p_id pipe list into participant_ids', async () => {
      renderExploreAtPath('/explore?p_id=p001|p002');

      await waitFor(() => {
        expect(mockQuery).toHaveBeenCalled();
      });

      expect(mockQuery.mock.calls[0][0].variables.participant_ids).toEqual(['p001', 'p002']);
    });

    it('should merge upload u= pipe list into participant_ids', async () => {
      renderExploreAtPath('/explore?u=u111|u222');

      await waitFor(() => {
        expect(mockQuery).toHaveBeenCalled();
      });

      expect(mockQuery.mock.calls[0][0].variables.participant_ids).toEqual(['u111', 'u222']);
    });

    it('should combine u, u_fc, and u_um for upload metadata (participant_ids unchanged shape)', async () => {
      renderExploreAtPath('/explore?u=a|b&u_fc=fc1|fc2&u_um=m1|m2');

      await waitFor(() => {
        expect(mockQuery).toHaveBeenCalled();
      });

      expect(mockQuery.mock.calls[0][0].variables.participant_ids).toEqual(['a', 'b']);

      const lf = store.getState().localFind;
      expect(lf?.uploadMetadata?.fileContent).toBe('fc1,fc2');
      expect(lf?.uploadMetadata?.unmatched).toEqual(['m1', 'm2']);
    });
  });

  describe('import_from', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([{ pid: 'imported-1' }, { pid: 'imported-2' }]),
        }),
      );
    });

    it('should fetch import JSON then pass stringified rows as import_data to the dashboard query', async () => {
      renderExploreAtPath(`/explore?import_from=${encodeURIComponent(IMPORT_JSON_URL)}`);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(IMPORT_JSON_URL);
      });

      await waitFor(() => {
        expect(mockQuery).toHaveBeenCalled();
      });

      expect(mockQuery.mock.calls[0][0].variables.import_data).toEqual([
        JSON.stringify({ pid: 'imported-1' }),
        JSON.stringify({ pid: 'imported-2' }),
      ]);
    });
  });

  describe('Tab index from search string', () => {
    it('should dispatch tab from ?tab=2 while running an unfiltered dashboard query', async () => {
      renderExploreAtPath('/explore?tab=2');

      await waitFor(() => {
        expect(mockQuery).toHaveBeenCalled();
      });

      const firstCallVars = mockQuery.mock.calls[0][0].variables;
      expect(firstCallVars.sex_at_birth).toBeUndefined();

      await waitFor(() => {
        expect(store.getState().inventoryReducer.tab).toBe(2);
      });
    });
  });

  describe('Combined query parameters', () => {
    it('should apply tab and facet filters together (?sex_at_birth=Female&tab=1)', async () => {
      renderExploreAtPath('/explore?sex_at_birth=Female&tab=1');

      await waitFor(() => {
        expect(store.getState().inventoryReducer.tab).toBe(1);
      });

      await waitFor(() => {
        expect(store.getState().inventoryReducer.activeFilters?.sex_at_birth).toEqual(['Female']);
      });

      const femaleCall = mockQuery.mock.calls.find(
        (call) => call[0].variables
          && Array.isArray(call[0].variables.sex_at_birth)
          && call[0].variables.sex_at_birth.includes('Female'),
      );
      expect(femaleCall).toBeTruthy();
    });
  });
});
