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
});
