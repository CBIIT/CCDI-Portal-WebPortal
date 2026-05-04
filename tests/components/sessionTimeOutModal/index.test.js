/**
 * Session timeout modal — cancel / login actions and title rendering.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import SessionTimeOutModal from '../../../src/components/sessionTimeOutModal/index';

const theme = createTheme();

function renderModal(props = {}) {
  const closeModal = jest.fn();
  const submit = jest.fn();
  const view = render(
    <ThemeProvider theme={theme}>
      <SessionTimeOutModal
        open
        title="Session expired"
        closeModal={closeModal}
        submit={submit}
        {...props}
      />
    </ThemeProvider>,
  );
  return { ...view, closeModal, submit };
}

describe('SessionTimeOutModal', () => {
  describe('Rendering', () => {
    it('should display the title and session copy', () => {
      renderModal();
      expect(screen.getByText('Session expired')).toBeInTheDocument();
      expect(screen.getByText(/Your session has expired/i)).toBeInTheDocument();
      expect(screen.getByText(/Please login again/i)).toBeInTheDocument();
    });

    it('should expose Cancel and Login buttons', () => {
      renderModal();
      expect(screen.getByRole('button', { name: /^Cancel$/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^Login$/i })).toBeInTheDocument();
    });
  });

  describe('Side effects', () => {
    it('should call closeModal when Cancel is clicked', () => {
      const { closeModal } = renderModal();
      fireEvent.click(screen.getByRole('button', { name: /^Cancel$/i }));
      expect(closeModal).toHaveBeenCalledTimes(1);
    });

    it('should call submit and closeModal when Login is clicked', () => {
      const { closeModal, submit } = renderModal();
      fireEvent.click(screen.getByRole('button', { name: /^Login$/i }));
      expect(submit).toHaveBeenCalledTimes(1);
      expect(closeModal).toHaveBeenCalledTimes(1);
    });

    it('should call closeModal when the close icon is clicked', () => {
      const { closeModal } = renderModal();
      fireEvent.click(screen.getByAltText('close icon'));
      expect(closeModal).toHaveBeenCalledTimes(1);
    });
  });
});
