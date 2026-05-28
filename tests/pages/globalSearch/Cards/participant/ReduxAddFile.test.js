import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { onAddCartFiles } from '@bento-core/cart';

import ReduxAddFile from '../../../../../src/pages/globalSearch/Cards/participant/ReduxAddFile';

jest.mock('@bento-core/cart', () => ({
  onAddCartFiles: jest.fn((files) => ({
    type: 'MOCK/ADD_FILES',
    payload: files,
  })),
}));

jest.mock('../../../../../src/pages/globalSearch/Cards/participant/AddFiles', () => (
  function MockAddFiles(props) {
    return (
      <div>
        <span>{`count:${props.count}`}</span>
        <span>{`files:${props.cartFiles.length}`}</span>
        <button type="button" onClick={() => props.addFiles(['f-1', 'f-2'])}>
          dispatch-add
        </button>
      </div>
    );
  }
));

describe('ReduxAddFile', () => {
  it('should map cart state and dispatch onAddCartFiles', () => {
    const store = createStore((state = {
      cartReducer: {
        count: 9,
        filesId: ['x', 'y', 'z'],
      },
    }) => state);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <ReduxAddFile />
      </Provider>,
    );

    expect(screen.getByText('count:9')).toBeInTheDocument();
    expect(screen.getByText('files:3')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'dispatch-add' }));

    expect(onAddCartFiles).toHaveBeenCalledWith(['f-1', 'f-2']);
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'MOCK/ADD_FILES',
      payload: ['f-1', 'f-2'],
    });
  });
});
