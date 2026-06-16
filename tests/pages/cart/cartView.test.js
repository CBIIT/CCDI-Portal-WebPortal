/**
 * **`CartView`** — MY FILES instructions + **`file_ids`** passed into table/wrapper (smoke + wiring).
 *
 * @see src/pages/cart/cartView.js
 */

jest.mock('../../../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));

jest.mock('@bento-core/paginated-table', () => {
  const actual = jest.requireActual('@bento-core/paginated-table');
  return {
    ...actual,
    TableView: function MockTableView(props) {
      return (
        <div data-testid="cart-table-view">
          <span data-testid="table-query-vars">{JSON.stringify(props.queryVariables)}</span>
          <span data-testid="table-total">{props.totalRowCount}</span>
        </div>
      );
    },
  };
});

jest.mock('../../../src/pages/cart/cartWrapper', () => ({
  __esModule: true,
  default: function MockCartWrapper({ children }) {
    return <div data-testid="cart-wrapper">{children}</div>;
  },
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import CartView from '../../../src/pages/cart/cartView';
import { table } from '../../../src/bento/fileCentricCartWorkflowData';

const theme = createMuiTheme();

describe('CartView', () => {
  beforeEach(() => {
    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
  });

  it('should show export instructions and pass cart file IDs to the table', () => {
    const filesId = ['cart-file-1', 'cart-file-2'];

    render(
      <ThemeProvider theme={theme}>
        <CartView
          config={table}
          filesId={filesId}
          deleteAllFiles={jest.fn()}
          deleteCartFile={jest.fn()}
        />
      </ThemeProvider>,
    );

    expect(
      screen.getByText(/Available Export Options/i),
    ).toBeInTheDocument();

    expect(screen.getByTestId('cart-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('cart-table-view')).toBeInTheDocument();

    const vars = JSON.parse(screen.getByTestId('table-query-vars').textContent);
    expect(vars.file_ids).toEqual(filesId);

    expect(screen.getByTestId('table-total')).toHaveTextContent(String(filesId.length));
  });
});
