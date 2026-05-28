/**
 * GlobalProvider exposes Notification helpers via context (`useGlobal`).
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GlobalProvider, useGlobal } from '../../../src/components/Global/GlobalProvider';

if (typeof global.MutationObserver === 'undefined') {
  global.MutationObserver = class MutationObserver {
    disconnect() {}
    observe() {}
    takeRecords() { return []; }
  };
}

function Harness() {
  const { Notification } = useGlobal();
  const { open, message } = Notification.getProps();
  React.useEffect(() => {
    Notification.show('global-probe', 1000);
  }, [Notification]);
  return (
    <div>
      <span data-testid="open-state">{String(open)}</span>
      <span data-testid="message-state">{message}</span>
    </div>
  );
}

function MissingProviderConsumer() {
  useGlobal();
  return null;
}

describe('GlobalProvider', () => {
  describe('Rendering', () => {
    it('should render children', () => {
      render(
        <GlobalProvider>
          <span data-testid="child">child</span>
        </GlobalProvider>,
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });
  });

  describe('useGlobal', () => {
    it('should expose Notification that updates after show()', async () => {
      render(
        <GlobalProvider>
          <Harness />
        </GlobalProvider>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('open-state')).toHaveTextContent('true');
      });
      expect(screen.getByTestId('message-state')).toHaveTextContent('global-probe');
    });

    it('should throw when used outside GlobalProvider', () => {
      const err = jest.spyOn(console, 'error').mockImplementation(() => {});
      try {
        expect(() => {
          render(<MissingProviderConsumer />);
        }).toThrow(/must be inside a Provider/);
      } finally {
        err.mockRestore();
      }
    });
  });
});
