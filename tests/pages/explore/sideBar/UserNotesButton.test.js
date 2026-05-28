/**
 * UserNotesButton — opens notes-to-user modal.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import UserNotesButton from '../../../../src/pages/inventory/sideBar/UserNotesButton';

const theme = createMuiTheme();

describe('UserNotesButton', () => {
  beforeEach(() => {
    global.MutationObserver = class MutationObserver {
      disconnect() {}
      observe() {}
      takeRecords() { return []; }
    };
  });

  it('should render notes button label', () => {
    render(
      <ThemeProvider theme={theme}>
        <UserNotesButton />
      </ThemeProvider>,
    );
    expect(screen.getByText('Notes to User')).toBeInTheDocument();
  });

  it('should open modal with disclaimer bullets when clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <UserNotesButton />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/agree not to attempt to reidentify/i)).toBeInTheDocument();
    expect(screen.getByText(/cumulative counts might include duplicate/i)).toBeInTheDocument();
  });

  it('should close modal when close icon is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <UserNotesButton />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByLabelText('close'));
    expect(screen.queryByText(/agree not to attempt to reidentify/i)).not.toBeInTheDocument();
  });
});
