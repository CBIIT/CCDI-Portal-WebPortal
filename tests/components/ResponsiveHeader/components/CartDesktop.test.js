/**
 * CartDesktop — MY FILES cart link with count from Redux cart slice.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import CartDesktop from '../../../../src/components/ResponsiveHeader/components/CartDesktop';

function renderCart(filesId) {
  const store = createStore(() => ({
    cartReducer: { filesId },
  }));

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <CartDesktop />
      </MemoryRouter>
    </Provider>,
  );
}

describe('CartDesktop', () => {
  describe('Rendering', () => {
    it('should show MY FILES and the cart count from state', () => {
      renderCart(['f1', 'f2', 'f3']);

      expect(screen.getByText('MY FILES')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });
});
