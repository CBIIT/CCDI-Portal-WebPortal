/**
 * DeleteConfirmationModal — cohort delete / unsaved-changes confirmations.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import DeleteConfirmationModal, {
  deletionTypes,
} from '../../../../src/pages/inventory/cohortModal/components/deleteConfirmationModal';

const theme = createMuiTheme();

function renderModal(props) {
  const setOpen = jest.fn();
  const utils = render(
    <ThemeProvider theme={theme}>
      <DeleteConfirmationModal
        open
        setOpen={setOpen}
        classes={{}}
        {...props}
      />
    </ThemeProvider>,
  );
  return { ...utils, setOpen };
}

describe('DeleteConfirmationModal', () => {
  beforeEach(() => {
    global.MutationObserver = class MutationObserver {
      disconnect() {}
      observe() {}
      takeRecords() { return []; }
    };
  });

  it('should render confirm and cancel for delete-all-cohorts', () => {
    renderModal({
      deletionType: deletionTypes.DELETE_ALL_COHORTS,
      handleDelete: jest.fn(),
    });
    expect(screen.getByText(/delete all cohorts/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('should call handleDelete and close when Confirm is clicked', () => {
    const handleDelete = jest.fn();
    const { setOpen } = renderModal({
      deletionType: deletionTypes.DELETE_SINGLE_COHORT,
      handleDelete,
    });
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(handleDelete).toHaveBeenCalled();
    expect(setOpen).toHaveBeenCalledWith(false);
  });

  it('should close without deleting when Cancel is clicked', () => {
    const handleDelete = jest.fn();
    const { setOpen } = renderModal({
      deletionType: deletionTypes.DELETE_SINGLE_COHORT,
      handleDelete,
    });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(handleDelete).not.toHaveBeenCalled();
    expect(setOpen).toHaveBeenCalledWith(false);
  });

  it('should render custom message with Close button when message prop is set', () => {
    const { setOpen } = renderModal({
      message: 'Cohort limit reached.',
      handleDelete: jest.fn(),
    });
    expect(screen.getByText('Cohort limit reached.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(setOpen).toHaveBeenCalledWith(false);
  });

  it('should show unsaved-changes warning for CLEAR_UNSAVED_CHANGES type', () => {
    renderModal({
      deletionType: deletionTypes.CLEAR_UNSAVED_CHANGES,
      handleDelete: jest.fn(),
    });
    expect(screen.getByText(/lose all unsaved changes/i)).toBeInTheDocument();
  });
});
