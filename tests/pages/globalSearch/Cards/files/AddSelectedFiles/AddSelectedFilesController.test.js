/**
 * Global Search **`AddSelectedFilesController`** — Apollo + cart wiring.
 *
 * The controller imports two paths that no longer exist in this branch
 * (**`../../../table/ContextProvider`**, **`../../../table/state/Actions`**)
 * so we provide virtual mocks for them. We also mock **`@bento-core/cart`** to
 * spy on `onAddCartFiles` and the **`WrapperService`** so we can drive
 * `getFilesID().then(...)` deterministically across cart-limit branches.
 *
 * @see src/pages/globalSearch/Cards/files/AddSelectedFiles/AddSelectedFilesController.js
 */

jest.mock(
  '../../../../../../src/pages/globalSearch/table/ContextProvider',
  () => {
    const ReactLib = require('react');
    return {
      __esModule: true,
      TableContext: ReactLib.createContext({}),
    };
  },
  { virtual: true },
);

jest.mock(
  '../../../../../../src/pages/globalSearch/table/state/Actions',
  () => ({
    __esModule: true,
    onRowSeclect: (rows) => ({ type: 'ON_ROW_SELECT', payload: rows }),
  }),
  { virtual: true },
);

const mockOnAddCartFiles = jest.fn((files) => ({
  type: '@@cart/ADD_CART_FILES',
  payload: files,
}));

jest.mock('@bento-core/cart', () => ({
  __esModule: true,
  onAddCartFiles: (...args) => mockOnAddCartFiles(...args),
}));

const mockGetFilesID = jest.fn();
jest.mock(
  '../../../../../../src/pages/globalSearch/Cards/WrapperService',
  () => ({
    __esModule: true,
    getFilesID: (...args) => mockGetFilesID(...args),
  }),
  { virtual: true },
);

const realGetFilesID = jest.requireActual(
  '../../../../../../src/pages/globalSearch/Cards/participant/WrapperService',
).getFilesID;

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AddSelectedFilesController from '../../../../../../src/pages/globalSearch/Cards/files/AddSelectedFiles/AddSelectedFilesController';
// eslint-disable-next-line import/no-unresolved
import { TableContext as MockedTableContext } from '../../../../../../src/pages/globalSearch/table/ContextProvider';

const renderWithStore = (ui, { tableContextValue = {} } = {}) => {
  const store = createStore((state = {}) => state);
  return render(
    <Provider store={store}>
      <MockedTableContext.Provider value={tableContextValue}>
        {ui}
      </MockedTableContext.Provider>
    </Provider>,
  );
};

describe('Global Search — AddSelectedFilesController', () => {
  let baseProps;
  let dispatchSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    global.MutationObserver = class MutationObserver {
      disconnect() {}
      observe() {}
      takeRecords() { return []; }
    };
    dispatchSpy = jest.fn();
    baseProps = {
      clsName: 'add_selected',
      section: 'files',
      addFileQuery: { kind: 'fake-query' },
      responseKeys: ['fileIDsFromList'],
      dataKey: 'file_ids',
      setOpenSnackbar: jest.fn(),
      setAlterDisplay: jest.fn(),
      client: { query: jest.fn() },
      cartFiles: [],
      title: 'ADD SELECTED FILES',
    };
  });

  describe('Rendering', () => {
    it('should render a disabled button when no rows are selected', () => {
      renderWithStore(<AddSelectedFilesController {...baseProps} />, {
        tableContextValue: { context: { selectedRows: [], dispatch: dispatchSpy } },
      });

      const button = screen.getByRole('button', { name: /add selected files/i });
      expect(button).toBeDisabled();
    });

    it('should enable the button when at least one row is selected', () => {
      renderWithStore(<AddSelectedFilesController {...baseProps} />, {
        tableContextValue: {
          context: { selectedRows: ['row-1'], dispatch: dispatchSpy },
        },
      });

      expect(
        screen.getByRole('button', { name: /add selected files/i }),
      ).not.toBeDisabled();
    });
  });

  describe('Add-selected flow', () => {
    it('should dispatch add-cart and reset selection when below the cart limit', async () => {
      mockGetFilesID.mockReturnValue(() =>
        Promise.resolve({ fileIDsFromList: ['f-1', 'f-2', 'f-2'] }),
      );

      renderWithStore(<AddSelectedFilesController {...baseProps} />, {
        tableContextValue: {
          context: { selectedRows: ['row-1'], dispatch: dispatchSpy },
        },
      });

      fireEvent.click(screen.getByRole('button', { name: /add selected files/i }));

      await waitFor(() => {
        expect(mockOnAddCartFiles).toHaveBeenCalledWith(['f-1', 'f-2']);
      });
      expect(baseProps.setOpenSnackbar).toHaveBeenCalledWith(true);
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: 'ON_ROW_SELECT',
        payload: [],
      });
    });

    it('should still add files when removing duplicates keeps the cart under the limit', async () => {
      const upperLimit = 200000;
      const cartFiles = Array.from({ length: upperLimit - 1 }, (_, i) => `cart-${i}`);
      // includes one duplicate of an existing cart file so the duplicate path runs
      mockGetFilesID.mockReturnValue(() =>
        Promise.resolve({ fileIDsFromList: ['cart-0', 'new-1'] }),
      );

      renderWithStore(
        <AddSelectedFilesController {...baseProps} cartFiles={cartFiles} />,
        {
          tableContextValue: {
            context: { selectedRows: ['row-2'], dispatch: dispatchSpy },
          },
        },
      );

      fireEvent.click(screen.getByRole('button', { name: /add selected files/i }));

      await waitFor(() => {
        expect(mockOnAddCartFiles).toHaveBeenCalled();
      });
      expect(baseProps.setOpenSnackbar).toHaveBeenCalledWith(true);
      expect(baseProps.setAlterDisplay).not.toHaveBeenCalled();
    });

    it('should request cart-limit alert when duplicates cannot save the cart', async () => {
      const upperLimit = 200000;
      const cartFiles = Array.from({ length: upperLimit - 1 }, (_, i) => `cart-${i}`);
      // both ids are new — duplicates can't reduce the count below the limit
      mockGetFilesID.mockReturnValue(() =>
        Promise.resolve({ fileIDsFromList: ['new-a', 'new-b'] }),
      );

      renderWithStore(
        <AddSelectedFilesController {...baseProps} cartFiles={cartFiles} />,
        {
          tableContextValue: {
            context: { selectedRows: ['row-3'], dispatch: dispatchSpy },
          },
        },
      );

      fireEvent.click(screen.getByRole('button', { name: /add selected files/i }));

      await waitFor(() => {
        expect(baseProps.setAlterDisplay).toHaveBeenCalledWith(true);
      });
      expect(mockOnAddCartFiles).not.toHaveBeenCalled();
    });

    it('should request cart-limit alert when the resolved file count exceeds the limit', async () => {
      const upperLimit = 200000;
      // Build a unique-id list larger than the upper limit (mock the resolved value).
      const huge = Array.from({ length: upperLimit + 1 }, (_, i) => `f-${i}`);
      mockGetFilesID.mockReturnValue(() =>
        Promise.resolve({ fileIDsFromList: huge }),
      );

      renderWithStore(<AddSelectedFilesController {...baseProps} />, {
        tableContextValue: {
          context: { selectedRows: ['row-4'], dispatch: dispatchSpy },
        },
      });

      fireEvent.click(screen.getByRole('button', { name: /add selected files/i }));

      await waitFor(() => {
        expect(baseProps.setAlterDisplay).toHaveBeenCalledWith(true);
      });
      expect(mockOnAddCartFiles).not.toHaveBeenCalled();
    });

    it('should fall back to an empty array when the response key is missing', async () => {
      mockGetFilesID.mockReturnValue(() => Promise.resolve({}));

      renderWithStore(<AddSelectedFilesController {...baseProps} />, {
        tableContextValue: {
          context: { selectedRows: ['row-5'], dispatch: dispatchSpy },
        },
      });

      fireEvent.click(screen.getByRole('button', { name: /add selected files/i }));

      await waitFor(() => {
        expect(mockOnAddCartFiles).toHaveBeenCalledWith([]);
      });
    });
  });

  describe('Sanity', () => {
    it('should keep the real WrapperService.getFilesID exported as a function', () => {
      expect(typeof realGetFilesID).toBe('function');
    });
  });
});
