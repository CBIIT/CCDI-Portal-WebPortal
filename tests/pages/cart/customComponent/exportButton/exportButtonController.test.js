/**
 * **`ExportButtonController`** — Redux **`filesId`** → **`ExportButtonView`**.
 *
 * @see src/pages/cart/customComponent/exportButton/exportButtonController.js
 */

jest.mock('../../../../../src/pages/cart/customComponent/exportButton/exportButton', () => {
  function MockExportButton(props) {
    return (
      <div
        data-testid="export-button-view"
        data-file-ids={JSON.stringify(props.filesId)}
      />
    );
  }
  return MockExportButton;
});

jest.mock('../../../../../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: { query: jest.fn() },
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import ExportButtonController from '../../../../../src/pages/cart/customComponent/exportButton/exportButtonController';

function storeWithCart(filesId) {
  return createStore(() => ({
    cartReducer: { filesId, count: filesId.length },
  }));
}

describe('ExportButtonController', () => {
  it('should pass cart file ids from Redux into the export view', () => {
    const filesId = ['f1', 'f2'];

    render(
      <Provider store={storeWithCart(filesId)}>
        <ExportButtonController />
      </Provider>,
    );

    expect(screen.getByTestId('export-button-view')).toHaveAttribute(
      'data-file-ids',
      JSON.stringify(filesId),
    );
  });
});
