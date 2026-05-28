/**
 * Explore Phase 2 — cohort **`CustomDropDown`** (Explore tab tables): gated by row selection,
 * **`onAddParticipantsToCohort`**, and the **4000 participant** cap (modal message).
 *
 * @see src/pages/inventory/tabs/wrapperConfig/CustomDropDown.js
 * @see tests/TEST_STRUCTURE.md
 */

jest.mock('../../../../../src/pages/inventory/cohortModal/components/deleteConfirmationModal', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: function MockDeleteConfirmationModal({ open, message }) {
      if (!open || !message) {
        return null;
      }
      return React.createElement(
        'div',
        { 'data-testid': 'cohort-limit-modal', role: 'alert' },
        message,
      );
    },
  };
});

jest.mock('../../../../../src/components/CohortSelectorState/CohortStateContext', () => {
  const React = require('react');
  const CohortStateContext = React.createContext({
    state: {},
    dispatch: jest.fn(),
  });
  return { CohortStateContext };
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TableContext } from '@bento-core/paginated-table';

import { CustomDropDown } from '../../../../../src/pages/inventory/tabs/wrapperConfig/CustomDropDown';
import { CohortStateContext } from '../../../../../src/components/CohortSelectorState/CohortStateContext';
import { GlobalProvider } from '../../../../../src/components/Global/GlobalProvider';
import { actionTypes } from '../../../../../src/components/CohortSelectorState/store/action';

function validParticipant(prefix, i) {
  return {
    id: `${prefix}-${i}`,
    participant_id: `PID-${prefix}-${i}`,
    study_id: 'phs001',
  };
}

function buildCohort(overrides = {}) {
  const now = new Date().toISOString();
  return {
    cohortId: 'TestCohort',
    cohortName: 'Test Cohort',
    cohortDescription: '',
    participants: [],
    lastUpdated: now,
    ...overrides,
  };
}

function renderWithProviders(ui, {
  hiddenSelectedRows = [],
  cohortState = { TestCohort: buildCohort() },
  cohortDispatch = jest.fn(),
  tableDispatch = jest.fn(),
} = {}) {
  const tableContextValue = {
    context: {
      hiddenSelectedRows,
      dispatch: tableDispatch,
    },
    setContext: jest.fn(),
  };

  const cohortContextValue = {
    state: cohortState,
    dispatch: cohortDispatch,
  };

  return render(
    <GlobalProvider>
      <TableContext.Provider value={tableContextValue}>
        <CohortStateContext.Provider value={cohortContextValue}>
          {ui}
        </CohortStateContext.Provider>
      </TableContext.Provider>
    </GlobalProvider>,
  );
}

describe('Explore — CustomDropDown (cohort)', () => {
  const defaultProps = {
    options: ['TestCohort'],
    label: 'Add to cohort',
    isHidden: false,
    backgroundColor: '#2A6E93',
    borderColor: '#73A9C7',
  };

  describe('Rendering', () => {
    it('should render the cohort label', () => {
      renderWithProviders(<CustomDropDown {...defaultProps} />);
      expect(screen.getByText(/add to cohort/i)).toBeInTheDocument();
    });
  });

  describe('Selection gate', () => {
    it('should not open the cohort list when no rows are selected', () => {
      renderWithProviders(<CustomDropDown {...defaultProps} />, {
        hiddenSelectedRows: [],
      });

      fireEvent.click(screen.getByText(/add to cohort/i));

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('should open the list and dispatch add-participants when a cohort is chosen', () => {
      const cohortDispatch = jest.fn();
      const tableDispatch = jest.fn();
      const hiddenSelectedRows = [
        validParticipant('sel', 1),
      ];

      renderWithProviders(<CustomDropDown {...defaultProps} />, {
        hiddenSelectedRows,
        cohortDispatch,
        tableDispatch,
      });

      fireEvent.click(screen.getByText(/add to cohort/i));

      expect(screen.getByText('TestCohort')).toBeInTheDocument();

      fireEvent.click(screen.getByText('TestCohort'));

      expect(cohortDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: actionTypes.ADD_PARTICIPANTS_TO_COHORT,
          payload: expect.objectContaining({
            cohortId: 'TestCohort',
            participants: hiddenSelectedRows,
          }),
        }),
      );

      expect(tableDispatch).toHaveBeenCalled();
    });
  });

  describe('4000 participant limit', () => {
    it('should show the limit message instead of dispatching when over the cap', () => {
      const cohortDispatch = jest.fn();
      const manyParticipants = Array.from({ length: 3999 }, (_, i) => validParticipant('big', i));
      const cohortState = {
        TestCohort: buildCohort({ participants: manyParticipants }),
      };
      const hiddenSelectedRows = [
        validParticipant('extra', 1),
        validParticipant('extra', 2),
      ];

      renderWithProviders(<CustomDropDown {...defaultProps} />, {
        cohortState,
        cohortDispatch,
        hiddenSelectedRows,
      });

      fireEvent.click(screen.getByText(/add to cohort/i));
      fireEvent.click(screen.getByText('TestCohort'));

      expect(cohortDispatch).not.toHaveBeenCalled();

      expect(screen.getByTestId('cohort-limit-modal')).toHaveTextContent(
        /not allowed to add more than 4000 participants/i,
      );
    });
  });
});
