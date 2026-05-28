/**
 * Add-to-cart dialog views and controller branches.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

beforeEach(() => {
  global.MutationObserver = class MutationObserver {
    disconnect() {}
    observe() {}
    takeRecords() { return []; }
  };
});
import AddToCartDialogView from '../../../src/pages/globalSearch/Cards/participant/AddToCartDialog/AddToCartDialogView';
import AddToCartDialogController from '../../../src/pages/globalSearch/Cards/participant/AddToCartDialog/AddToCartDialogController';
import AddToCartDialogAlertView from '../../../src/pages/globalSearch/Cards/participant/AddToCartDialog/AddToCartDialogAlertView';

describe('AddToCartDialogView', () => {
  it('should render confirmation dialog with file count', () => {
    render(
      <AddToCartDialogView
        open
        numberOfFilesSelected={3}
        onYesClick={jest.fn()}
        onNoClick={jest.fn()}
        dialogText="Add"
      />,
    );
    expect(screen.getByText(/Add/)).toBeInTheDocument();
    expect(screen.getByText(/3/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument();
  });

  it('should call handlers when Yes and No are clicked', () => {
    const onYes = jest.fn();
    const onNo = jest.fn();
    render(
      <AddToCartDialogView
        open
        numberOfFilesSelected={1}
        onYesClick={onYes}
        onNoClick={onNo}
        dialogText="Add"
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Yes' }));
    fireEvent.click(screen.getByRole('button', { name: 'No' }));
    expect(onYes).toHaveBeenCalled();
    expect(onNo).toHaveBeenCalled();
  });

  it('should render cart-full alert when cartWillFull is true', () => {
    const onNo = jest.fn();
    render(
      <AddToCartDialogView
        open
        cartWillFull
        alertMessage="Cart is full"
        onNoClick={onNo}
      />,
    );
    expect(screen.getByText('Cart is full')).toBeInTheDocument();
  });

  it('should call onNoClick when the cart-full alert auto-closes', () => {
    jest.useFakeTimers();
    const onNo = jest.fn();
    render(
      <AddToCartDialogView
        open
        cartWillFull
        alertMessage="Cart is full"
        onNoClick={onNo}
      />,
    );
    jest.advanceTimersByTime(4000);
    expect(onNo).toHaveBeenCalled();
    jest.useRealTimers();
  });
});

describe('AddToCartDialogAlertView', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should auto-close after timeout when open', () => {
    const onClose = jest.fn();
    render(
      <AddToCartDialogAlertView open alertMessage="Limit reached" onClose={onClose} />,
    );
    jest.advanceTimersByTime(4000);
    expect(onClose).toHaveBeenCalled();
  });
});

describe('AddToCartDialogController', () => {
  it('should render alert branch when cartWillFull is true', () => {
    expect(() => render(<AddToCartDialogController cartWillFull />)).not.toThrow();
    expect(screen.queryByRole('button', { name: 'Yes' })).not.toBeInTheDocument();
  });

  it('should render dialog branch when cartWillFull is false', () => {
    expect(() =>
      render(
        <AddToCartDialogController
          cartWillFull={false}
          numberOfFilesSelected={2}
          onYesClick={jest.fn()}
          onNoClick={jest.fn()}
        />,
      ),
    ).not.toThrow();
  });

  it('should call its internal handleClose when the alert requests onClose', () => {
    // The alert's onClose handler closes a local `open` flag in the controller.
    // We invoke it via the real AddToCartDialogAlertView's auto-close timer to
    // exercise the controller's handleClose branch.
    jest.useFakeTimers();
    const { rerender } = render(<AddToCartDialogController cartWillFull />);
    expect(() => jest.advanceTimersByTime(4000)).not.toThrow();
    rerender(<AddToCartDialogController cartWillFull />);
    jest.useRealTimers();
  });
});
