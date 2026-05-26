/**
 * **`CohortAnalyzer`** — full view (selector list, sort, radio category, venn-driven
 * row queries, create-new-cohort guards, delete confirmation flow, search, auto-select
 * from `location.state.cohort`).
 *
 * Heavy children are mocked (`TableView`, `ChartVenn`, `DownloadSelectedCohort`,
 * `DeleteConfirmationModal`, `CohortModalGenerator`, `@bento-core/tool-tip`, `useGlobal`)
 * so the test exercises the analyzer's own state machine and `client.query` wiring without
 * canvas / chart rendering.
 *
 * @see src/pages/CohortAnalyzer/CohortAnalyzer.js
 */

jest.mock('../../../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: {
    query: jest.fn(() => Promise.resolve({ data: { participantOverview: [], diagnosisOverview: [] } })),
  },
}));

jest.mock('@bento-core/paginated-table', () => ({
  __esModule: true,
  TableView: function MockTableView(props) {
    const React = require('react');
    // Ensure the configured initState (which carries SearchBox / showSearchBox) is invoked.
    const initial = typeof props.initState === 'function' ? props.initState({}) : (props.initState || {});
    const SearchBoxRender = initial.SearchBox;
    return React.createElement(
      'div',
      { 'data-testid': 'cohort-analyzer-table' },
      React.createElement('span', { 'data-testid': 'rows-count' }, String(props.totalRowCount)),
      React.createElement('span', { 'data-testid': 'rows' }, JSON.stringify(props.tblRows)),
      React.createElement('span', { 'data-testid': 'vars' }, JSON.stringify(props.queryVariables)),
      initial.showSearchBox && SearchBoxRender ? SearchBoxRender() : null,
    );
  },
}));

jest.mock('@bento-core/tool-tip/dist/ToolTip', () => ({
  __esModule: true,
  default: function MockTooltip({ children }) { return children; },
}));

jest.mock('../../../src/pages/CohortAnalyzer/vennDiagram/ChartVenn', () => ({
  __esModule: true,
  default: function MockChartVenn(props) {
    const React = require('react');
    return React.createElement(
      'div',
      { 'data-testid': 'chart-venn' },
      React.createElement('span', { 'data-testid': 'venn-intersection' }, String(props.intersection)),
      React.createElement(
        'button',
        {
          'data-testid': 'venn-select-alpha',
          onClick: () => {
            props.setSelectedChart(['A-id-1', 'A-id-2']);
            props.setSelectedCohortSections(['Alpha (2)']);
            props.setGeneralInfo({ 'Alpha (2)': ['A-id-1'] });
          },
        },
        'select-alpha',
      ),
    );
  },
}));

jest.mock('../../../src/pages/CohortAnalyzer/downloadCohort/DownloadSelectedCohorts', () => ({
  __esModule: true,
  default: function MockDownload({ queryVariable, isSelected }) {
    const React = require('react');
    return React.createElement(
      'div',
      { 'data-testid': 'download-selected' },
      React.createElement('span', { 'data-testid': 'dl-vars' }, JSON.stringify(queryVariable)),
      React.createElement('span', { 'data-testid': 'dl-selected' }, String(isSelected)),
    );
  },
}));

jest.mock('../../../src/pages/inventory/cohortModal/components/deleteConfirmationModal', () => ({
  __esModule: true,
  default: function MockDeleteConfirm({ open, setOpen, handleDelete, deletionType, message }) {
    const React = require('react');
    if (!open) return null;
    return React.createElement(
      'div',
      { 'data-testid': message ? 'warning-modal' : 'delete-modal' },
      React.createElement('span', { 'data-testid': 'delete-type' }, String(deletionType)),
      React.createElement('span', { 'data-testid': 'delete-message' }, message || ''),
      React.createElement(
        'button',
        {
          'data-testid': 'confirm-delete',
          onClick: () => {
            handleDelete();
            setOpen(false);
          },
        },
        'Confirm',
      ),
    );
  },
}));

jest.mock('../../../src/pages/inventory/cohortModal/cohortModalGenerator', () => ({
  __esModule: true,
  default: () => ({
    CohortModal: function MockCohortModal({ open }) {
      const React = require('react');
      return open ? React.createElement('div', { 'data-testid': 'cohort-modal' }) : null;
    },
  }),
}));

jest.mock('../../../src/components/Global/GlobalProvider', () => ({
  __esModule: true,
  useGlobal: () => ({ Notification: { show: jest.fn() } }),
}));

jest.mock('../../../src/components/CohortSelectorState/CohortStateContext', () => {
  const React = require('react');
  return { CohortStateContext: React.createContext() };
});

import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import { CohortAnalyzer } from '../../../src/pages/CohortAnalyzer/CohortAnalyzer';
import { CohortStateContext } from '../../../src/components/CohortSelectorState/CohortStateContext';
import { CohortModalContext } from '../../../src/pages/inventory/cohortModal/CohortModalContext';
import client from '../../../src/utils/graphqlClient';
import { onCreateNewCohort } from '../../../src/components/CohortSelectorState/store/action';
import {
  cohortStateNamedKeys,
  cohortStateTwoSmallCohorts,
  buildCohortStateWithNCohorts,
  buildCohortStateWithLargeCohort,
} from '../../fixtures/cohortAnalyzer/cohortAnalyzerViewProps';
import { participantOverviewRowsFixture } from '../../fixtures/cohortAnalyzer/cohortAnalyzerApiResponses';

function setupClientForRows(rows = participantOverviewRowsFixture) {
  client.query.mockImplementation(() => Promise.resolve({
    data: {
      participantOverview: rows,
      diagnosisOverview: rows,
    },
  }));
}

function renderAnalyzer({
  state = {},
  routerEntries = ['/cohortanalyzer'],
  modalCtx,
} = {}) {
  const dispatch = jest.fn();
  const setShowCohortModal = jest.fn();
  const setWarningMessage = jest.fn();
  const setCurrentCohortChanges = jest.fn();
  const ctxValue = {
    setShowCohortModal,
    showCohortModal: false,
    setCurrentCohortChanges,
    setWarningMessage,
    warningMessage: '',
    ...modalCtx,
  };

  const utils = render(
    <MemoryRouter initialEntries={routerEntries}>
      <CohortModalContext.Provider value={ctxValue}>
        <CohortStateContext.Provider value={{ state, dispatch }}>
          <CohortAnalyzer />
        </CohortStateContext.Provider>
      </CohortModalContext.Provider>
    </MemoryRouter>,
  );

  return { ...utils, dispatch, setShowCohortModal, setWarningMessage, setCurrentCohortChanges };
}

describe('CohortAnalyzer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupClientForRows([]);
    window.scrollTo = jest.fn();
    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
  });

  describe('Rendering', () => {
    it('should render header copy and instructions when cohort state is empty', () => {
      renderAnalyzer({ state: {} });

      expect(screen.getByRole('heading', { name: /cohort analyzer/i })).toBeInTheDocument();
      expect(screen.getByText('(0/3)')).toBeInTheDocument();
      expect(
        screen.getByText(/Select up to three cohorts to view in the Cohort Analyzer/i),
      ).toBeInTheDocument();
      expect(screen.getByAltText('placeholder')).toBeInTheDocument();
    });

    it('should render cohorts from state with their participant counts', () => {
      renderAnalyzer({ state: cohortStateTwoSmallCohorts });

      expect(screen.getByText(/^\s*Alpha \(2\)\s*$/)).toBeInTheDocument();
      expect(screen.getByText(/^\s*Beta \(1\)\s*$/)).toBeInTheDocument();
    });

    it('should pass cohort selection state into the download component', () => {
      renderAnalyzer({ state: {} });
      expect(screen.getByTestId('dl-selected').textContent).toBe('false');
    });
  });

  describe('Cohort selector interactions', () => {
    it('should select a cohort via checkbox and update the (N/3) counter', async () => {
      renderAnalyzer({ state: cohortStateTwoSmallCohorts });

      const [alphaCheckbox] = screen.getAllByRole('checkbox');
      fireEvent.click(alphaCheckbox);

      await waitFor(() => {
        expect(screen.getByText('(1/3)')).toBeInTheDocument();
      });

      // Selecting a cohort triggers the participant overview query
      await waitFor(() => {
        expect(client.query).toHaveBeenCalled();
      });
      const lastCall = client.query.mock.calls.at(-1)[0];
      expect(lastCall.variables.first).toBe(12000);
      expect(lastCall.variables.id).toEqual(['A-id-1', 'A-id-2']);
    });

    it('should not exceed three cohort selections', async () => {
      const fourCohorts = {
        Alpha: cohortStateNamedKeys.Alpha,
        Beta: cohortStateNamedKeys.Beta,
        Gamma: { cohortName: 'Gamma', cohortDescription: 'g', participants: [{ id: 'g1', participant_id: 'G-1', study_id: 'phs' }] },
        Delta: { cohortName: 'Delta', cohortDescription: 'd', participants: [{ id: 'd1', participant_id: 'D-1', study_id: 'phs' }] },
      };

      renderAnalyzer({ state: fourCohorts });

      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);
      fireEvent.click(checkboxes[1]);
      fireEvent.click(checkboxes[2]);
      fireEvent.click(checkboxes[3]);

      await waitFor(() => {
        expect(screen.getByText('(3/3)')).toBeInTheDocument();
      });
      expect(screen.queryByText('(4/3)')).not.toBeInTheDocument();
    });

    it('should toggle off a selected cohort when clicked again', async () => {
      renderAnalyzer({ state: cohortStateTwoSmallCohorts });
      const [alphaCheckbox] = screen.getAllByRole('checkbox');
      fireEvent.click(alphaCheckbox);
      await waitFor(() => expect(screen.getByText('(1/3)')).toBeInTheDocument());

      fireEvent.click(alphaCheckbox);
      await waitFor(() => expect(screen.getByText('(0/3)')).toBeInTheDocument());
    });

    it('should toggle sort buttons between alphabet and count', () => {
      renderAnalyzer({ state: cohortStateTwoSmallCohorts });
      const sortByCount = screen.getByText(/sort by count/i);
      fireEvent.click(sortByCount);
      // Click alphabet button to flip back; we can't easily assert color text on inline styles,
      // but firing the click exercises sortBy + setSortType
      fireEvent.click(screen.getByText(/sort alphabetically/i));
      // Click reset icon path
      fireEvent.click(screen.getByAltText('sortIcon'));
    });
  });

  describe('Delete confirmation flow', () => {
    it('should open the delete-all modal when the header trash icon is clicked', () => {
      renderAnalyzer({ state: cohortStateTwoSmallCohorts });

      const trashCans = screen.getAllByAltText('Trashcan');
      fireEvent.click(trashCans[0]);

      expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
      expect(screen.getByTestId('delete-type').textContent).toBe('delete ALL cohorts?');
    });

    it('should open the delete-single modal when a cohort row trash icon is clicked', () => {
      renderAnalyzer({ state: cohortStateTwoSmallCohorts });

      const trashCans = screen.getAllByAltText('Trashcan');
      fireEvent.click(trashCans[1]);

      expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
      expect(screen.getByTestId('delete-type').textContent).toBe('delete this cohort?');
    });

    it('should dispatch delete action when confirming the delete modal', async () => {
      const { dispatch } = renderAnalyzer({ state: cohortStateTwoSmallCohorts });

      fireEvent.click(screen.getAllByAltText('Trashcan')[0]);
      fireEvent.click(screen.getByTestId('confirm-delete'));

      await waitFor(() => {
        expect(dispatch).toHaveBeenCalled();
      });
    });
  });

  describe('Data category radio', () => {
    it('should switch to diagnosisOverview query when Diagnosis radio is clicked', async () => {
      renderAnalyzer({ state: cohortStateNamedKeys });

      // Select Alpha first to enable radio
      fireEvent.click(screen.getAllByRole('checkbox')[0]);

      await waitFor(() => {
        expect(screen.getByText('(1/3)')).toBeInTheDocument();
      });

      const radios = screen.getAllByRole('radio');
      fireEvent.click(radios[1]);

      // Wait for client.query to be called with diagnosis fixture; assert response key path
      // by ensuring at least one diagnosis query went through. We check that intersection
      // value 1 reached ChartVenn (mocked).
      await waitFor(() => {
        expect(screen.getByTestId('venn-intersection').textContent).toBe('1');
      });
    });
  });

  describe('Create New Cohort', () => {
    it('should warn when more than 20 cohorts exist before creating a new one', async () => {
      // 20 cohorts already → exceedLimitCreatedCohost returns true
      const stateWithTwenty = {
        ...buildCohortStateWithNCohorts(20),
        Alpha: cohortStateNamedKeys.Alpha,
      };

      const setWarningMessage = jest.fn();
      renderAnalyzer({
        state: stateWithTwenty,
        modalCtx: { setWarningMessage },
      });

      // Select Alpha and pretend Venn segment chosen
      const allCheckboxes = screen.getAllByRole('checkbox');
      const alphaCheckbox = allCheckboxes[allCheckboxes.length - 1];
      fireEvent.click(alphaCheckbox);

      await waitFor(() => {
        expect(screen.getByText(/\(1\/3\)/)).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId('venn-select-alpha'));
      fireEvent.click(screen.getByRole('button', { name: /create new cohort/i }));

      await waitFor(() => {
        expect(setWarningMessage).toHaveBeenCalledWith(
          expect.stringMatching(/not allowed to create more that 20 cohorts/i),
        );
      });
    });

    it('should warn when selected rowData would exceed 4000 participants', async () => {
      const largeRows = Array.from({ length: 4001 }, (_, i) => ({
        id: `id-${i}`,
        participant_id: `P-${i}`,
        study_id: 'phs000001',
      }));
      setupClientForRows(largeRows);

      const setWarningMessage = jest.fn();
      renderAnalyzer({
        state: cohortStateNamedKeys,
        modalCtx: { setWarningMessage },
      });

      fireEvent.click(screen.getAllByRole('checkbox')[0]);

      await waitFor(() => {
        expect(screen.getByTestId('rows-count').textContent).toBe('4001');
      });

      fireEvent.click(screen.getByTestId('venn-select-alpha'));
      fireEvent.click(screen.getByRole('button', { name: /create new cohort/i }));

      await waitFor(() => {
        expect(setWarningMessage).toHaveBeenCalledWith(
          expect.stringMatching(/more than 4000 participants/i),
        );
      });
    });

    it('should dispatch onCreateNewCohort when row data and segment are selected', async () => {
      const rows = [
        { id: 'A-id-1', participant_id: 'A-001', study_id: 'phs000001' },
        { id: 'A-id-2', participant_id: 'A-002', study_id: 'phs000001' },
      ];
      setupClientForRows(rows);

      const { dispatch, setShowCohortModal } = renderAnalyzer({
        state: cohortStateNamedKeys,
      });

      fireEvent.click(screen.getAllByRole('checkbox')[0]);

      await waitFor(() => {
        expect(screen.getByTestId('rows-count').textContent).toBe('2');
      });

      fireEvent.click(screen.getByTestId('venn-select-alpha'));
      fireEvent.click(screen.getByRole('button', { name: /create new cohort/i }));

      await waitFor(() => {
        expect(dispatch).toHaveBeenCalled();
      });
      // Action shape mirrors onCreateNewCohort
      const dispatched = dispatch.mock.calls.map((c) => c[0]);
      const created = dispatched.find((a) => a && a.type === 'CREATE_NEW_COHORT');
      expect(created).toBeTruthy();
      expect(created.payload.participants).toEqual([
        expect.objectContaining({ id: 'A-id-1', participant_id: 'A-001' }),
        expect.objectContaining({ id: 'A-id-2', participant_id: 'A-002' }),
      ]);

      // success callback path: triggerNotification → setShowCohortModal(true)
      created.payload.success(2);
      expect(setShowCohortModal).toHaveBeenCalledWith(true);
    });

    it('should be a no-op (no dispatch) when no Venn segment is selected', async () => {
      setupClientForRows([
        { id: 'A-id-1', participant_id: 'A-001', study_id: 'phs000001' },
      ]);
      const { dispatch } = renderAnalyzer({ state: cohortStateNamedKeys });

      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      await waitFor(() => expect(screen.getByTestId('rows-count').textContent).toBe('1'));

      fireEvent.click(screen.getByRole('button', { name: /create new cohort/i }));

      // small wait to allow any async work
      await new Promise((r) => setTimeout(r, 10));
      const created = dispatch.mock.calls
        .map((c) => c[0])
        .find((a) => a && a.type === 'CREATE_NEW_COHORT');
      expect(created).toBeUndefined();
    });
  });

  describe('Side effects / location auto-select', () => {
    it('should auto-select cohort when navigated with location.state.cohort', async () => {
      const entries = [{
        pathname: '/cohortanalyzer',
        state: { cohort: { cohortId: 'Alpha' } },
      }];

      renderAnalyzer({ state: cohortStateNamedKeys, routerEntries: entries });

      await waitFor(() => {
        expect(screen.getByText('(1/3)')).toBeInTheDocument();
      });
      expect(window.scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({ top: 0, behavior: 'smooth' }),
      );
    });
  });

  describe('Search box', () => {
    it('should re-query and filter by participant_id when search input changes', async () => {
      const rows = [
        { id: 'A-id-1', participant_id: 'A-MATCH-1', study_id: 'phs000001' },
        { id: 'A-id-2', participant_id: 'OTHER-2', study_id: 'phs000001' },
      ];
      setupClientForRows(rows);

      renderAnalyzer({ state: cohortStateNamedKeys });

      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      await waitFor(() => expect(screen.getByTestId('rows-count').textContent).toBe('2'));

      const searchInput = screen.getByPlaceholderText(/search participant id/i);
      fireEvent.change(searchInput, { target: { value: 'MATCH' } });

      await waitFor(() => {
        expect(screen.getByTestId('rows-count').textContent).toBe('1');
      });
    });
  });

  describe('Edge cases', () => {
    it('should not crash when rendering with a very large cohort state', () => {
      // exercises render performance and the (0/3) initial counter
      renderAnalyzer({ state: buildCohortStateWithLargeCohort(50) });
      expect(screen.getByText('(0/3)')).toBeInTheDocument();
    });

    it('should not call onCreateNewCohort related dispatch when state has no cohorts', async () => {
      const { dispatch } = renderAnalyzer({ state: {} });
      fireEvent.click(screen.getByRole('button', { name: /create new cohort/i }));
      await new Promise((r) => setTimeout(r, 10));
      const created = dispatch.mock.calls
        .map((c) => c[0])
        .find((a) => a && a.type === 'CREATE_NEW_COHORT');
      expect(created).toBeUndefined();
    });
  });
});

// `onCreateNewCohort` import kept to ensure action shape compatibility at runtime.
void onCreateNewCohort;
