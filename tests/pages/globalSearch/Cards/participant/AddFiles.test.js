import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useApolloClient } from '@apollo/client';

import AddFilesView from '../../../../../src/pages/globalSearch/Cards/participant/AddFiles';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useApolloClient: jest.fn(),
}));

jest.mock('../../../../../src/pages/globalSearch/Cards/participant/CPIFilesView/CPIFilesView', () => (
  function MockCPIFilesView(props) {
    return (
      <div>
        <span data-testid="client-injected">{String(Boolean(props.client))}</span>
        <span data-testid="cart-count">{props.cartFiles.length}</span>
        <button type="button" onClick={() => props.setOpenSnackbar(true)}>
          open-snackbar
        </button>
        <button type="button" onClick={() => props.setAlterDisplay(true)}>
          open-alert
        </button>
      </div>
    );
  }
));

jest.mock('../../../../../src/pages/globalSearch/Cards/participant/Snackbar/Snackbar', () => (
  function MockSnackbarView({ open, count, onClose }) {
    return open ? (
      <div>
        <span>{`snackbar-count-${count}`}</span>
        <button type="button" onClick={onClose}>close-snackbar</button>
      </div>
    ) : null;
  }
));

jest.mock('../../../../../src/pages/globalSearch/Cards/participant/AddToCartDialog/AddToCartDialogAlertView', () => (
  function MockAlertView({ open, alertMessage, onClose }) {
    return open ? (
      <div>
        <span>{alertMessage}</span>
        <button type="button" onClick={onClose}>close-alert</button>
      </div>
    ) : null;
  }
));

describe('AddFiles', () => {
  beforeEach(() => {
    useApolloClient.mockReturnValue({ query: jest.fn() });
  });

  it('should inject Apollo client/cart props and control snackbar + alert visibility', () => {
    render(
      <AddFilesView
        count={4}
        alertMessage="Cart limit hit"
        cartFiles={['f1', 'f2']}
        buttonStyle={{ color: 'red' }}
      />,
    );

    expect(screen.getByTestId('client-injected')).toHaveTextContent('true');
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    expect(screen.queryByText('snackbar-count-4')).not.toBeInTheDocument();
    expect(screen.queryByText('Cart limit hit')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'open-snackbar' }));
    expect(screen.getByText('snackbar-count-4')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'close-snackbar' }));
    expect(screen.queryByText('snackbar-count-4')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'open-alert' }));
    expect(screen.getByText('Cart limit hit')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'close-alert' }));
    expect(screen.queryByText('Cart limit hit')).not.toBeInTheDocument();
  });
});
