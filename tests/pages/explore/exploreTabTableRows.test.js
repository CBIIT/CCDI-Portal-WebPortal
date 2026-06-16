/**
 * Explore — real `@bento-core/paginated-table` + `@bento-core/table` render for a `TabPanel`.
 *
 * Test type (tests/TEST_STRUCTURE.md §§133–153): **2 — API / data layer (mocked integration)** —
 * mock `useApolloClient().query`, fixtures under `tests/fixtures/explore/`; asserts **call-shaped data**
 * and **DOM** (column headers, cells). Filter case overlaps **type 3** (props → different rows).
 * Bento is not stubbed.
 *
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

jest.mock('@apollo/client', () => {
  const actual = jest.requireActual('@apollo/client');
  return {
    ...actual,
    useApolloClient: jest.fn(),
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
import { render, screen, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { getOperationAST } from 'graphql';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import { useApolloClient } from '@apollo/client';

import TabPanel from '../../../src/pages/inventory/tabs/TabPanel';
import { tabContainers } from '../../../src/bento/dashboardTabData';
import { participantOverviewTwoMixedSex } from '../../fixtures/explore/participantOverviewTableRows';
import { studyOverviewOneRow } from '../../fixtures/explore/studyOverviewTableRows';
import { CohortModalProvider } from '../../../src/pages/inventory/cohortModal/CohortModalContext';
import store from '../../../src/store';
import { changeTab } from '../../../src/components/Inventory/InventoryState';
import { resetExploreSingletonStore } from '../../helpers/exploreStoreReset';
import { GlobalProvider } from '../../../src/components/Global/GlobalProvider';

function operationNameFromDoc(doc) {
  const op = getOperationAST(doc);
  return op.name ? op.name.value : '';
}

function dashboardStatsParticipantTab() {
  return {
    numberOfParticipants: 100,
    numberOfStudies: 10,
    numberOfSamples: 50,
    numberOfFiles: 200,
    participantsFileCount: 80,
    studiesFileCount: 30,
    samplesFileCount: 60,
    filesFileCount: 200,
  };
}

function dashboardStatsStudyTab() {
  return {
    ...dashboardStatsParticipantTab(),
    numberOfStudies: 1,
  };
}

function renderParticipantTabHarness(props = {}) {
  const {
    activeFilters = null,
    unknownAgesState = {},
  } = props;

  const participantTab = tabContainers[0];

  return render(
    <Provider store={store}>
      <GlobalProvider>
        <MemoryRouter initialEntries={['/explore']}>
          <Routes>
            <Route
              path="/explore"
              element={(
                <CohortModalProvider>
                  <TabPanel
                    tab={participantTab}
                    config={participantTab}
                    dashboardStats={dashboardStatsParticipantTab()}
                    activeFilters={activeFilters}
                    unknownAgesState={unknownAgesState}
                    activeTab
                  />
                </CohortModalProvider>
              )}
            />
          </Routes>
        </MemoryRouter>
      </GlobalProvider>
    </Provider>,
  );
}

function renderStudyTabHarness() {
  const studyTab = tabContainers[1];
  return render(
    <Provider store={store}>
      <GlobalProvider>
        <MemoryRouter initialEntries={['/explore']}>
          <Routes>
            <Route
              path="/explore"
              element={(
                <CohortModalProvider>
                  <TabPanel
                    tab={studyTab}
                    config={studyTab}
                    dashboardStats={dashboardStatsStudyTab()}
                    activeFilters={null}
                    unknownAgesState={{}}
                    activeTab
                  />
                </CohortModalProvider>
              )}
            />
          </Routes>
        </MemoryRouter>
      </GlobalProvider>
    </Provider>,
  );
}

describe('Explore — TabPanel table rows/columns (real Bento paginated-table)', () => {
  let mockQuery;

  beforeEach(() => {
    jest.clearAllMocks();
    resetExploreSingletonStore();
    store.dispatch(changeTab(0, 'not-facet'));

    mockQuery = jest.fn();
    useApolloClient.mockReturnValue({ query: mockQuery });

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

  it('should render Participants column headers and both overview rows from mocked Apollo data', async () => {
    mockQuery.mockImplementation(async ({ query: doc }) => {
      const name = operationNameFromDoc(doc);
      if (name === 'participantOverview') {
        return { data: { participantOverview: participantOverviewTwoMixedSex } };
      }
      return { data: {} };
    });

    renderParticipantTabHarness();

    await waitFor(() => {
      expect(screen.getByRole('columnheader', { name: /participant id/i })).toBeInTheDocument();
    });

    expect(screen.getByRole('columnheader', { name: /sex at birth/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /study id/i })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('TAB_PID_FEMALE')).toBeInTheDocument();
      expect(screen.getByText('TAB_PID_MALE')).toBeInTheDocument();
    });
  });

  it('should render only Female participant rows when activeFilters include sex_at_birth Female', async () => {
    mockQuery.mockImplementation(async ({ query: doc, variables }) => {
      const name = operationNameFromDoc(doc);
      if (name === 'participantOverview') {
        let rows = participantOverviewTwoMixedSex;
        if (variables.sex_at_birth && variables.sex_at_birth.includes('Female')) {
          rows = rows.filter((r) => r.sex_at_birth === 'Female');
        }
        return { data: { participantOverview: rows } };
      }
      return { data: {} };
    });

    renderParticipantTabHarness({
      activeFilters: { sex_at_birth: ['Female'] },
    });

    await waitFor(() => {
      expect(screen.getByText('TAB_PID_FEMALE')).toBeInTheDocument();
    });

    expect(screen.queryByText('TAB_PID_MALE')).not.toBeInTheDocument();
  });

  it('should render Studies column headers and study overview row from mocked Apollo data', async () => {
    store.dispatch(changeTab(1, 'not-facet'));

    mockQuery.mockImplementation(async ({ query: doc }) => {
      const name = operationNameFromDoc(doc);
      if (name === 'studyOverview') {
        return { data: { studyOverview: studyOverviewOneRow } };
      }
      return { data: {} };
    });

    renderStudyTabHarness();

    await waitFor(() => {
      expect(screen.getByRole('columnheader', { name: /study name/i })).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('CCD Study Row Assert')).toBeInTheDocument();
    });

    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row');
    expect(rows.length).toBeGreaterThanOrEqual(2);
    const firstBodyRow = rows.find((row) => within(row).queryByText('CCD Study Row Assert'));
    expect(firstBodyRow).toBeTruthy();
    expect(within(firstBodyRow).getByText('CCD Study Row Assert')).toBeInTheDocument();
  });
});
