/**
 * Unit tests for CustomThemeProvider and useTheme — localStorage seed and toggle behavior.
 * No network; uses an in-memory localStorage stub.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CustomThemeProvider, useTheme } from '../../src/components/ThemeContext';

// Ensure MutationObserver exists for RTL async helpers (e.g. waitFor) in this test env
if (typeof global.MutationObserver === 'undefined') {
  global.MutationObserver = class MutationObserver {
    disconnect() {}
    observe() {}
    takeRecords() { return []; }
  };
}

function ThemeProbe() {
  const { dark, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-mode">{dark ? 'dark' : 'light'}</span>
      <button type="button" onClick={toggleTheme}>
        toggle-theme
      </button>
    </div>
  );
}

describe('ThemeContext', () => {
  let store;

  beforeEach(() => {
    store = {};
    const localStorageMock = {
      getItem: jest.fn((key) => (Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null)),
      setItem: jest.fn((key, value) => {
        store[key] = String(value);
      }),
      removeItem: jest.fn((key) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        store = {};
      }),
    };
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: localStorageMock,
    });
  });

  describe('Rendering', () => {
    it('should provide light mode when localStorage has no dark flag', async () => {
      render(
        <CustomThemeProvider>
          <ThemeProbe />
        </CustomThemeProvider>,
      );
      await waitFor(() => {
        expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
      });
    });

    it('should read dark mode from localStorage when set to the string true', async () => {
      store.dark = 'true';
      render(
        <CustomThemeProvider>
          <ThemeProbe />
        </CustomThemeProvider>,
      );
      await waitFor(() => {
        expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
      });
    });
  });

  describe('Side effects', () => {
    it('should toggle theme and persist via localStorage', async () => {
      render(
        <CustomThemeProvider>
          <ThemeProbe />
        </CustomThemeProvider>,
      );
      await waitFor(() => {
        expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
      });

      fireEvent.click(screen.getByRole('button', { name: /toggle-theme/i }));
      expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
      expect(window.localStorage.setItem).toHaveBeenCalled();

      fireEvent.click(screen.getByRole('button', { name: /toggle-theme/i }));
      expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
    });
  });
});
