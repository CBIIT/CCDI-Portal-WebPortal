/**
 * ToastNotification — success, error, info, auto-dismiss, and manual close.
 */

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToastNotification from '../../../src/pages/globalSearch/Cards/participant/ToastNotification';

describe('ToastNotification', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render success toast with message', () => {
    render(
      <ToastNotification open message="Added to cart" type="success" onClose={jest.fn()} />,
    );
    expect(screen.getByText('Added to cart')).toBeInTheDocument();
  });

  it('should render error and info icon branches', () => {
    const { rerender } = render(
      <ToastNotification open message="Error" type="error" onClose={jest.fn()} />,
    );
    expect(screen.getByText('Error')).toBeInTheDocument();

    rerender(
      <ToastNotification open message="Info" type="info" onClose={jest.fn()} />,
    );
    expect(screen.getByText('Info')).toBeInTheDocument();
  });

  it('should auto-dismiss after duration', () => {
    const onClose = jest.fn();
    render(
      <ToastNotification
        open
        message="Auto close"
        duration={3000}
        onClose={onClose}
      />,
    );
    act(() => {
      jest.advanceTimersByTime(3300);
    });
    expect(onClose).toHaveBeenCalled();
  });

  it('should close when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <ToastNotification open message="Close me" onClose={onClose} />,
    );
    fireEvent.click(screen.getByRole('button'));
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(onClose).toHaveBeenCalled();
  });

  it('should render nothing when not visible', () => {
    const { container } = render(
      <ToastNotification open={false} message="Hidden" onClose={jest.fn()} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should fall back to default styling for an unknown type', () => {
    render(
      <ToastNotification
        open
        message="Unknown variant"
        type="warning"
        onClose={jest.fn()}
      />,
    );
    expect(screen.getByText('Unknown variant')).toBeInTheDocument();
  });

  it('should not auto-dismiss when duration is zero', () => {
    const onClose = jest.fn();
    render(
      <ToastNotification
        open
        message="Sticky"
        duration={0}
        onClose={onClose}
      />,
    );
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(onClose).not.toHaveBeenCalled();
  });
});
