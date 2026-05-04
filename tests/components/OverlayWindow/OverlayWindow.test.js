/**
 * Overlay consent dialog — opens when overlay flag absent; Continue persists preference.
 */

jest.mock('../../../src/pages/search/store/sitesearchReducer', () => ({
  setOverLayWindow: jest.fn(),
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setOverLayWindow } from '../../../src/pages/search/store/sitesearchReducer';
import OverlayWindow from '../../../src/components/OverlayWindow/OverlayWindow';

describe('OverlayWindow', () => {
  let store;

  beforeEach(() => {
    store = {};
    jest.clearAllMocks();
    Object.defineProperty(window, 'localStorage', {
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

  describe('Rendering', () => {
    it('should show the warning dialog when overlay has not been acknowledged', () => {
      render(<OverlayWindow />);
      expect(screen.getByText('Warning')).toBeInTheDocument();
      expect(screen.getByText('Continue')).toBeInTheDocument();
    });
  });

  describe('Side effects', () => {
    it('should set overlayLoad and clear overlay flag when Continue is clicked', () => {
      render(<OverlayWindow />);

      fireEvent.click(screen.getByText('Continue'));

      expect(localStorage.setItem).toHaveBeenCalledWith('overlayLoad', 'true');
      expect(setOverLayWindow).toHaveBeenCalledWith(false);
    });
  });
});
