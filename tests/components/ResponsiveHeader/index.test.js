/**
 * Unit tests for ResponsiveHeader (`src/components/ResponsiveHeader/index.js`).
 * Dispatch of `initCart` on mount; responsive shells render mocked breakpoint variants.
 */

jest.mock('@bento-core/cart', () => ({
  initCart: jest.fn(() => ({ type: 'INIT_CART_MOCK' })),
}));

jest.mock('../../../src/components/ResponsiveHeader/HeaderDesktop', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: function HeaderDesktop() {
      return <div data-testid="header-desktop" />;
    },
  };
});

jest.mock('../../../src/components/ResponsiveHeader/HeaderTablet', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: function HeaderTablet() {
      return <div data-testid="header-tablet" />;
    },
  };
});

jest.mock('../../../src/components/ResponsiveHeader/HeaderMobile', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: function HeaderMobile() {
      return <div data-testid="header-mobile" />;
    },
  };
});

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { initCart } from '@bento-core/cart';
import Header from '../../../src/components/ResponsiveHeader/index';

if (typeof global.MutationObserver === 'undefined') {
  global.MutationObserver = class MutationObserver {
    disconnect() {}
    observe() {}
    takeRecords() { return []; }
  };
}

function renderWithStore(ui) {
  const store = createStore(() => ({}));
  jest.spyOn(store, 'dispatch');
  const view = render(<Provider store={store}>{ui}</Provider>);
  return { ...view, store };
}

describe('ResponsiveHeader', () => {
  describe('Rendering', () => {
    it('should render desktop, tablet, and mobile header shells', () => {
      renderWithStore(<Header />);
      expect(screen.getByTestId('header-desktop')).toBeInTheDocument();
      expect(screen.getByTestId('header-tablet')).toBeInTheDocument();
      expect(screen.getByTestId('header-mobile')).toBeInTheDocument();
    });
  });

  describe('Side effects', () => {
    it('should dispatch initCart once on mount', async () => {
      const { store } = renderWithStore(<Header />);
      await waitFor(() => {
        expect(store.dispatch).toHaveBeenCalledWith(initCart());
      });
    });
  });
});
