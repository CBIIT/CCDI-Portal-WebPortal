/**
 * Explore — tab strip drives one `TabPanel` per `tabContainers` entry; each panel mounts
 * `@bento-core/paginated-table` `TableView` with tab-specific `paginationAPIField` and queries.
 *
 * The real paginated table + GraphQL is **mocked** here; we assert **which “table”** is wired
 * (Participants / Studies / Samples / Files), **`activeTab`**, and **`queryVariables`** plumbing.
 *
 * Test types (tests/TEST_STRUCTURE.md §§133–153): **§2 API / data layer** (query contract + wiring);
 * tab clicks overlap **§3** (interaction). For real Bento row/column DOM, see **`exploreTabTableRows.test.js`**.
 *
 * @see src/pages/inventory/tabs/TabsView.js
 * @see src/pages/inventory/tabs/TabPanel.js
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

jest.mock('@bento-core/paginated-table', () => {
  const React = require('react');
  const types = {
    BUTTON: 'BUTTON',
    LINK: 'LINK',
    ICON: 'ICON',
    TEXT: 'TEXT',
    TEXT_INPUT: 'TEXT_INPUT',
    CUSTOM_ELEM: 'CUSTOM_ELEM',
    COHORT_ELEM: 'COHORT_ELEM',
  };
  const btnTypes = {
    DOWNLOAD_MANIFEST: 'DOWNLOAD_MANIFEST',
    ADD_SELECTED_FILES: 'ADD_SELECTED_FILES',
    ADD_ALL_FILES: 'ADD_ALL_FILES',
  };
  const MockTableView = (props) => {
    const init = typeof props.initState === 'function' ? props.initState({}) : {};
    return (
      <section
        role="region"
        aria-label={init.title || 'table'}
        data-pagination-api-field={init.paginationAPIField || ''}
        data-active-tab={String(props.activeTab)}
        data-query-variables={JSON.stringify(props.queryVariables || {})}
        data-total-row-count={String(props.totalRowCount ?? '')}
      />
    );
  };
  return {
    types,
    btnTypes,
    TableContextProvider: ({ children }) => React.createElement(React.Fragment, null, children),
    Wrapper: ({ children, section }) =>
      React.createElement('div', { 'data-wrapper-section': section }, children),
    TableView: MockTableView,
  };
});

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

import store from '../../../src/store';
import TabsView from '../../../src/pages/inventory/tabs/TabsView';
import { CohortModalProvider } from '../../../src/pages/inventory/cohortModal/CohortModalContext';
import { exploreDashboardWithSexAtBirthFacets } from '../../fixtures/explore/apiResponses';
import { resetExploreSingletonStore } from '../../helpers/exploreStoreReset';
import { changeTab } from '../../../src/components/Inventory/InventoryState';

function renderTabsHarness(props = {}) {
  const {
    dashboardStats = exploreDashboardWithSexAtBirthFacets,
    activeFilters = null,
    unknownAgesState = {},
  } = props;

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/explore']}>
        <Routes>
          <Route
            path="/explore"
            element={(
              <CohortModalProvider>
                <TabsView
                  dashboardStats={dashboardStats}
                  activeFilters={activeFilters}
                  unknownAgesState={unknownAgesState}
                />
              </CohortModalProvider>
            )}
          />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

function tableRegion(name) {
  // Tab panels use `hidden` on the wrapper; include hidden regions for a11y queries.
  return screen.getByRole('region', { name, hidden: true });
}

describe('Explore — TabsView / TabPanel table wiring', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetExploreSingletonStore();
    store.dispatch(changeTab(0, 'not-facet'));

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

  it('should mount four tab panels with distinct pagination API fields', () => {
    renderTabsHarness();

    expect(tableRegion('Participants')).toHaveAttribute('data-pagination-api-field', 'participantOverview');
    expect(tableRegion('Studies')).toHaveAttribute('data-pagination-api-field', 'studyOverview');
    expect(tableRegion('Samples')).toHaveAttribute('data-pagination-api-field', 'sampleOverview');
    expect(tableRegion('Files')).toHaveAttribute('data-pagination-api-field', 'fileOverview');
  });

  it('should set activeTab only on the visible tab’s table (Participants by default)', () => {
    renderTabsHarness();

    expect(tableRegion('Participants')).toHaveAttribute('data-active-tab', 'true');
    expect(tableRegion('Studies')).toHaveAttribute('data-active-tab', 'false');
    expect(tableRegion('Samples')).toHaveAttribute('data-active-tab', 'false');
    expect(tableRegion('Files')).toHaveAttribute('data-active-tab', 'false');
  });

  it('should switch active table when user selects Studies', async () => {
    renderTabsHarness();

    const studiesTab = screen.getAllByRole('tab').find((t) => /Studies/i.test(t.textContent));
    expect(studiesTab).toBeTruthy();
    fireEvent.click(studiesTab);

    await waitFor(() => {
      expect(store.getState().inventoryReducer.tab).toBe(1);
    });

    expect(tableRegion('Participants')).toHaveAttribute('data-active-tab', 'false');
    expect(tableRegion('Studies')).toHaveAttribute('data-active-tab', 'true');
  });

  it('should switch active table when user selects Files', async () => {
    renderTabsHarness();

    const filesTab = screen.getAllByRole('tab').find((t) => /\bFiles\b/i.test(t.textContent));
    expect(filesTab).toBeTruthy();
    fireEvent.click(filesTab);

    await waitFor(() => {
      expect(store.getState().inventoryReducer.tab).toBe(3);
    });

    expect(tableRegion('Files')).toHaveAttribute('data-active-tab', 'true');
    expect(tableRegion('Samples')).toHaveAttribute('data-active-tab', 'false');
  });

  it('should pass active facet filters through to TableView queryVariables', () => {
    renderTabsHarness({
      activeFilters: { sex_at_birth: ['Female'] },
    });

    const vars = JSON.parse(tableRegion('Participants').getAttribute('data-query-variables'));
    expect(vars.sex_at_birth).toEqual(['Female']);
  });
});
