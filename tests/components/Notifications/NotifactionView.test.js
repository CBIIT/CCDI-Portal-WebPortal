/**
 * NotificationView — snackbar UI wired to GlobalProvider notification state.
 */

jest.mock('@material-ui/core/Snackbar', () => {
  const React = require('react');
  return function SnackbarMock({ open, children, onClose }) {
    if (!open) {
      return null;
    }
    return (
      <div data-testid="snackbar">
        <button type="button" onClick={(e) => onClose(e, 'timeout')}>close-snackbar</button>
        {children}
      </div>
    );
  };
});

jest.mock('../../../src/components/Global/GlobalProvider', () => ({
  useGlobal: jest.fn(),
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import NotificationView from '../../../src/components/Notifications/NotifactionView';
import { useGlobal } from '../../../src/components/Global/GlobalProvider';

if (typeof global.MutationObserver === 'undefined') {
  global.MutationObserver = class MutationObserver {
    disconnect() {}
    observe() {}
    takeRecords() { return []; }
  };
}

const theme = createTheme();

function renderNotification(notificationOverrides = {}) {
  const close = jest.fn();
  useGlobal.mockReturnValue({
    Notification: {
      getProps: () => ({
        open: true,
        message: 'Cohort saved',
        duration: 4000,
        location: { vertical: 'top', horizontal: 'center' },
        ...notificationOverrides,
      }),
      close,
    },
  });

  const view = render(
    <ThemeProvider theme={theme}>
      <NotificationView />
    </ThemeProvider>,
  );

  return { close, ...view };
}

describe('NotifactionView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render snackbar message when notification is open', () => {
    renderNotification();
    expect(screen.getByText('Cohort saved')).toBeInTheDocument();
  });

  it('should call Notification.close when snackbar requests close', () => {
    const { close } = renderNotification();
    fireEvent.click(screen.getByRole('button', { name: 'close-snackbar' }));
    expect(close).toHaveBeenCalled();
  });

  it('should not render message when notification is closed', () => {
    renderNotification({ open: false, message: 'Hidden' });
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });
});
