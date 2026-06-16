import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import SnackbarRedux from '../../../../../src/pages/globalSearch/Cards/participant/Snackbar/SnackbarRedux';

jest.mock('../../../../../src/pages/globalSearch/Cards/participant/Snackbar/Snackbar', () => (
  function MockSnackbar(props) {
    return <div>{`redux-count:${props.count}`}</div>;
  }
));

describe('SnackbarRedux', () => {
  it('should map cart count from redux state into SnackbarView', () => {
    const store = createStore((state = {
      cartReducer: {
        count: 11,
      },
    }) => state);

    render(
      <Provider store={store}>
        <SnackbarRedux open={false} onClose={jest.fn()} />
      </Provider>,
    );

    expect(screen.getByText('redux-count:11')).toBeInTheDocument();
  });
});
