/**
 * **`cartWrapper`** — **`setCartConfig`** when **`queryVariables.file_ids`** updates (Cart context).
 *
 * @see src/pages/cart/cartWrapper.js
 */

jest.mock('@bento-core/paginated-table', () => ({
  ...jest.requireActual('@bento-core/paginated-table'),
  Wrapper: function MockWrapper({ children }) {
    return <div data-testid="paginated-wrapper">{children}</div>;
  },
}));

jest.mock('../../../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: { query: jest.fn() },
}));

jest.mock('@bento-core/cart', () => {
  const React = require('react');
  const setCartConfig = jest.fn((config) => ({ type: 'SET_CART_CONFIG', payload: config }));
  const CartContext = React.createContext(null);
  return { CartContext, setCartConfig };
});

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CartContext, setCartConfig } from '@bento-core/cart';
import CartWrapper from '../../../src/pages/cart/cartWrapper';

describe('cartWrapper (Header)', () => {
  beforeEach(() => {
    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
    if (!document.createRange) {
      document.createRange = () => ({
        setStart: () => {},
        setEnd: () => {},
        commonAncestorContainer: document.body,
      });
    }
  });

  it('should dispatch setCartConfig when queryVariables include file_ids', async () => {
    const dispatch = jest.fn();

    const queryVariables = { file_ids: ['file-a', 'file-b'] };

    render(
      <CartContext.Provider value={{ context: { dispatch } }}>
        <CartWrapper classes={{}} queryVariables={queryVariables}>
          <span>table</span>
        </CartWrapper>
      </CartContext.Provider>,
    );

    await waitFor(() => {
      expect(setCartConfig).toHaveBeenCalled();
    });

    expect(setCartConfig).toHaveBeenCalledWith(
      expect.objectContaining({
        queryVariables,
        manifestFileName: expect.any(String),
      }),
    );
    expect(dispatch).toHaveBeenCalled();
  });
});
