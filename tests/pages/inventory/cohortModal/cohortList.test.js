/**
 * CohortList — cohort selection, duplicate, and delete actions.
 */

jest.mock('@bento-core/tool-tip', () => ({
  __esModule: true,
  default: ({ children }) => children,
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CohortList from '../../../../src/pages/inventory/cohortModal/components/cohortList';

const theme = createMuiTheme();

const mockState = {
  alpha: {
    cohortId: 'alpha',
    cohortName: 'Alpha Cohort',
    lastUpdated: '2026-01-02T00:00:00.000Z',
    participants: [],
  },
  beta: {
    cohortId: 'beta',
    cohortName: 'Beta Cohort',
    lastUpdated: '2026-01-01T00:00:00.000Z',
    participants: [],
  },
};

function renderCohortList(overrides = {}) {
  const setSelectedCohort = jest.fn();
  const handleDeleteCohort = jest.fn();
  const handleDeleteAllCohorts = jest.fn();
  const handleDuplicateCohort = jest.fn();
  const handleClearCurrentCohortChanges = jest.fn();
  const closeParentModal = jest.fn();

  const props = {
    selectedCohort: 'alpha',
    setSelectedCohort,
    unSavedChanges: false,
    setChangingConfirmation: jest.fn(),
    setShowChangingConfirmation: jest.fn(),
    closeParentModal,
    handleDeleteCohort,
    handleDeleteAllCohorts,
    handleDuplicateCohort,
    handleClearCurrentCohortChanges,
    state: mockState,
    config: { listHeading: 'COHORTS' },
    classes: {},
    deleteConfirmationClasses: {},
    ...overrides,
  };

  const utils = render(
    <ThemeProvider theme={theme}>
      <CohortList {...props} />
    </ThemeProvider>,
  );

  return {
    ...utils,
    setSelectedCohort,
    handleDeleteCohort,
    handleDeleteAllCohorts,
    handleDuplicateCohort,
    handleClearCurrentCohortChanges,
    closeParentModal,
  };
}

describe('CohortList', () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = jest.fn();
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      get() { return 500; },
    });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      get() { return 200; },
    });
  });

  it('should render cohort list heading with count', () => {
    renderCohortList();
    expect(screen.getByText(/COHORTS \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText('alpha')).toBeInTheDocument();
    expect(screen.getByText('beta')).toBeInTheDocument();
  });

  it('should select a different cohort when list item is clicked', () => {
    const { setSelectedCohort, handleClearCurrentCohortChanges } = renderCohortList();
    fireEvent.click(screen.getByText('beta'));
    expect(setSelectedCohort).toHaveBeenCalledWith('beta');
    expect(handleClearCurrentCohortChanges).toHaveBeenCalled();
  });

  it('should duplicate cohort when duplicate action is clicked', () => {
    const { handleDuplicateCohort } = renderCohortList();
    const duplicateButtons = screen.getAllByAltText('duplicate cohort icon');
    fireEvent.click(duplicateButtons[0]);
    expect(handleDuplicateCohort).toHaveBeenCalledWith('alpha');
  });

  it('should open delete confirmation for single cohort delete', () => {
    const { handleDeleteCohort } = renderCohortList();
    const deleteButtons = screen.getAllByAltText('delete cohort icon');
    fireEvent.click(deleteButtons[0]);
    expect(screen.getByText(/delete this cohort/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(handleDeleteCohort).toHaveBeenCalledWith('alpha');
  });

  it('should open delete-all confirmation from heading trash icon', () => {
    const { handleDeleteAllCohorts } = renderCohortList();
    fireEvent.click(screen.getByAltText('delete all cohorts icon'));
    expect(screen.getByText(/delete all cohorts/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(handleDeleteAllCohorts).toHaveBeenCalled();
  });

  it('should prompt for unsaved changes before switching cohorts', () => {
    const setChangingConfirmation = jest.fn();
    const setShowChangingConfirmation = jest.fn();
    renderCohortList({
      unSavedChanges: true,
      setChangingConfirmation,
      setShowChangingConfirmation,
    });
    fireEvent.click(screen.getByText('beta'));
    expect(setChangingConfirmation).toHaveBeenCalled();
    expect(setShowChangingConfirmation).toHaveBeenCalledWith(true);
  });

  it('should disable duplicate when cohort limit is reached', () => {
    const manyCohorts = Object.fromEntries(
      Array.from({ length: 20 }, (_, i) => [
        `cohort-${i}`,
        {
          cohortId: `cohort-${i}`,
          cohortName: `Cohort ${i}`,
          lastUpdated: `2026-01-${String(i + 1).padStart(2, '0')}T00:00:00.000Z`,
          participants: [],
        },
      ]),
    );
    const { handleDuplicateCohort } = renderCohortList({
      state: manyCohorts,
      selectedCohort: 'cohort-0',
    });
    const duplicateButton = screen.getAllByAltText('duplicate cohort icon')[0].closest('button');
    expect(duplicateButton).toBeDisabled();
    fireEvent.click(duplicateButton);
    expect(handleDuplicateCohort).not.toHaveBeenCalled();
  });
});
