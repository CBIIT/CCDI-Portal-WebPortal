/**
 * **`CartController`** — Redux **`filesId`** + **`table`** config forwarded to **`CartView`** (provider wiring).
 *
 * @see src/pages/cart/cartController.js
 */

jest.mock('../../../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));

jest.mock('@bento-core/cart', () => ({
  CartContextProvider: ({ children }) => children,
}));

jest.mock('@bento-core/paginated-table', () => ({
  ...jest.requireActual('@bento-core/paginated-table'),
  TableContextProvider: ({ children }) => children,
}));

jest.mock('../../../src/pages/cart/cartView', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="cart-view-stub" />),
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import CartController from '../../../src/pages/cart/cartController';
import CartView from '../../../src/pages/cart/cartView';
import { table } from '../../../src/bento/fileCentricCartWorkflowData';

function cartStore(filesId) {
  return createStore(() => ({
    cartReducer: { filesId },
  }));
}

describe('CartController', () => {
  beforeEach(() => {
    CartView.mockClear();
  });

  it('should pass Redux cart file IDs and table config into CartView', () => {
    const filesId = ['id-alpha', 'id-beta'];

    render(
      <Provider store={cartStore(filesId)}>
        <CartController />
      </Provider>,
    );

    expect(CartView).toHaveBeenCalledWith(
      expect.objectContaining({
        filesId,
        config: table,
      }),
      {},
    );
    expect(screen.getByTestId('cart-view-stub')).toBeInTheDocument();
  });
});
