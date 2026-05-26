/**
 * CPIFilesView — add-all / add-selected files flows with cart dialog.
 */

jest.mock('@bento-core/tool-tip', () => ({
  __esModule: true,
  default: ({ children }) => children,
}));

jest.mock('../../../src/pages/globalSearch/Cards/participant/WrapperService', () => ({
  getFilesID: jest.fn(() => () => Promise.resolve({ fileIDsFromList: ['cpi-file-1'] })),
}));

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CPIFilesView from '../../../src/pages/globalSearch/Cards/participant/CPIFilesView/CPIFilesView';
import { getFilesID } from '../../../src/pages/globalSearch/Cards/participant/WrapperService';

describe('CPIFilesView', () => {
  beforeEach(() => {
    global.MutationObserver = class MutationObserver {
      disconnect() {}
      observe() {}
      takeRecords() { return []; }
    };
  });

  const defaultProps = {
    title: 'ADD ALL FILES',
    btnType: 'ADD_ALL_FILES',
    clsName: 'cpi-btn',
    section: 'participant',
    addFiles: jest.fn(),
    setAlterDisplay: jest.fn(),
    setOpenSnackbar: jest.fn(),
    client: { query: jest.fn() },
    cartFiles: [],
    participantIds: [{ data_type: 'internal', p_id: 'PART-1' }],
    rowID: ['row-file-1'],
    buttonStyle: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
    getFilesID.mockImplementation(() => () =>
      Promise.resolve({ fileIDsFromList: ['cpi-file-1'] }),
    );
  });

  it('should open confirmation dialog after resolving file ids for ADD_ALL_FILES', async () => {
    render(<CPIFilesView {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: 'ADD ALL FILES' }));

    await waitFor(() => {
      expect(screen.getByText(/Are you sure to add All Files/i)).toBeInTheDocument();
    });
  });

  it('should add files to cart when dialog Yes is confirmed', async () => {
    const addFiles = jest.fn();
    render(<CPIFilesView {...defaultProps} addFiles={addFiles} />);

    fireEvent.click(screen.getByRole('button', { name: 'ADD ALL FILES' }));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Yes' }));

    expect(addFiles).toHaveBeenCalledWith(['cpi-file-1']);
  });

  it('should disable button for ADD_SELECTED_FILES when no participants selected', () => {
    render(
      <CPIFilesView
        {...defaultProps}
        btnType="ADD_SELECTED_FILES"
        title="ADD SELECTED"
        participantIds={[]}
      />,
    );
    expect(screen.getByRole('button', { name: 'ADD SELECTED' })).toBeDisabled();
  });

  it('should show alter display when cart is full', () => {
    const setAlterDisplay = jest.fn();
    const fullCart = Array.from({ length: 200000 }, (_, i) => `f-${i}`);
    render(
      <CPIFilesView
        {...defaultProps}
        cartFiles={fullCart}
        setAlterDisplay={setAlterDisplay}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'ADD ALL FILES' }));
    expect(setAlterDisplay).toHaveBeenCalledWith(true);
  });

  it('should request alter display when duplicates can not save the cart', async () => {
    const upperLimit = 200000;
    const cart = Array.from({ length: upperLimit - 1 }, (_, i) => `cart-${i}`);
    // Both new IDs are not in the cart, so duplicates can't bring count under the limit.
    getFilesID.mockImplementation(() => () =>
      Promise.resolve({ fileIDsFromList: ['new-a', 'new-b'] }),
    );
    const setAlterDisplay = jest.fn();

    render(
      <CPIFilesView
        {...defaultProps}
        cartFiles={cart}
        setAlterDisplay={setAlterDisplay}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'ADD ALL FILES' }));

    await waitFor(() => {
      expect(setAlterDisplay).toHaveBeenCalledWith(true);
    });
  });

  it('should request alter display when resolved file count exceeds the upper limit', async () => {
    const upperLimit = 200000;
    const huge = Array.from({ length: upperLimit + 1 }, (_, i) => `f-${i}`);
    getFilesID.mockImplementation(() => () =>
      Promise.resolve({ fileIDsFromList: huge }),
    );
    const setAlterDisplay = jest.fn();

    render(<CPIFilesView {...defaultProps} setAlterDisplay={setAlterDisplay} />);
    fireEvent.click(screen.getByRole('button', { name: 'ADD ALL FILES' }));

    await waitFor(() => {
      expect(setAlterDisplay).toHaveBeenCalledWith(true);
    });
  });

  it('should add files via ADD_SELECTED_FILES branch (no internal filter)', async () => {
    const addFiles = jest.fn();
    getFilesID.mockImplementation(() => () =>
      Promise.resolve({ fileIDsFromList: ['selected-file-1'] }),
    );

    render(
      <CPIFilesView
        {...defaultProps}
        btnType="ADD_SELECTED_FILES"
        title="ADD SELECTED"
        participantIds={['p-x']}
        rowID={['row-x']}
        addFiles={addFiles}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'ADD SELECTED' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Yes' }));
    expect(addFiles).toHaveBeenCalledWith(['selected-file-1']);
  });

  it('should call setOpenSnackbar when files are confirmed via Yes click', async () => {
    const setOpenSnackbar = jest.fn();
    getFilesID.mockImplementation(() => () =>
      Promise.resolve({ fileIDsFromList: ['snack-file-1'] }),
    );

    render(<CPIFilesView {...defaultProps} setOpenSnackbar={setOpenSnackbar} />);
    fireEvent.click(screen.getByRole('button', { name: 'ADD ALL FILES' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Yes' }));
    expect(setOpenSnackbar).toHaveBeenCalledWith(true);
  });

  it('should render tooltip image when tooltipCofig is provided', () => {
    render(
      <CPIFilesView
        {...defaultProps}
        tooltipCofig={{ src: '/tip.png', alt: 'cpi-tip', participant: 'Add CPI files' }}
      />,
    );
    expect(screen.getByAltText('cpi-tip')).toBeInTheDocument();
  });
});
