/**
 * Unit tests for NotificationFunctions — stateful notification helper (show / close / getProps).
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotificationFunctions from '../../../src/components/Notifications/NotificationFunctions';

function NotificationHarness() {
  const { show, close, getProps } = NotificationFunctions();
  return (
    <div>
      <span data-testid="open">{String(getProps().open)}</span>
      <span data-testid="message">{getProps().message}</span>
      <span data-testid="duration">{String(getProps().duration)}</span>
      <button type="button" onClick={() => show('hello', 3000)}>show-msg</button>
      <button type="button" onClick={(e) => close(e, 'timeout')}>close-normal</button>
      <button type="button" onClick={(e) => close(e, 'clickaway')}>close-clickaway</button>
    </div>
  );
}

describe('NotificationFunctions', () => {
  describe('Rendering / state', () => {
    it('should start closed with empty message and default duration', () => {
      render(<NotificationHarness />);
      expect(screen.getByTestId('open')).toHaveTextContent('false');
      expect(screen.getByTestId('message')).toHaveTextContent('');
      expect(screen.getByTestId('duration')).toHaveTextContent('10000');
    });

    it('should open with message and duration when show is called', () => {
      render(<NotificationHarness />);
      fireEvent.click(screen.getByRole('button', { name: /show-msg/i }));
      expect(screen.getByTestId('open')).toHaveTextContent('true');
      expect(screen.getByTestId('message')).toHaveTextContent('hello');
      expect(screen.getByTestId('duration')).toHaveTextContent('3000');
    });
  });

  describe('Side effects', () => {
    it('should close when close is called with a reason other than clickaway', () => {
      render(<NotificationHarness />);
      fireEvent.click(screen.getByRole('button', { name: /show-msg/i }));
      fireEvent.click(screen.getByRole('button', { name: /close-normal/i }));
      expect(screen.getByTestId('open')).toHaveTextContent('false');
    });

    it('should not close when reason is clickaway', () => {
      render(<NotificationHarness />);
      fireEvent.click(screen.getByRole('button', { name: /show-msg/i }));
      fireEvent.click(screen.getByRole('button', { name: /close-clickaway/i }));
      expect(screen.getByTestId('open')).toHaveTextContent('true');
    });
  });
});
