/**
 * Overlay consent dialog — opens when overlay flag absent; Continue persists preference.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OverlayWindow from '../../../src/components/OverlayWindow/OverlayWindow';

describe('OverlayWindow', () => {
  let store;
  const originalSessionStorage = window.sessionStorage;

  beforeEach(() => {
    store = {};
    jest.clearAllMocks();
    Object.defineProperty(window, 'sessionStorage', {
      configurable: true,
      value: {
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
      },
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'sessionStorage', {
      configurable: true,
      value: originalSessionStorage,
      writable: true,
    });
  });

  describe('Rendering', () => {
    it('should show the warning dialog when overlay has not been acknowledged', () => {
      render(<OverlayWindow />);
      expect(screen.getByText('Warning')).toBeInTheDocument();
      expect(screen.getByText('Continue')).toBeInTheDocument();
    });
  });

  describe('Side effects', () => {
    it('should set overlayLoad when Continue is clicked', () => {
      render(<OverlayWindow />);

      fireEvent.click(screen.getByText('Continue'));

      expect(sessionStorage.setItem).toHaveBeenCalledWith('overlayLoad', 'true');
    });
  });
});
