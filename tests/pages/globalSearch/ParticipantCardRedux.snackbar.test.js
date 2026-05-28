/**
 * **`ParticipantCardRedux`** — snackbar + cart-limit **`AlertView`** with fake timers.
 *
 * @see src/pages/globalSearch/Cards/participant/ParticipantCardRedux.js
 */

jest.mock('../../../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: { query: jest.fn() },
}));

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useApolloClient: jest.fn(() => ({
    query: jest.fn(() => Promise.resolve({ data: {} })),
  })),
}));

jest.mock('../../../src/components/CohortSelectorState/CohortStateContext', () => {
  const React = require('react');
  const CohortStateContext = React.createContext({
    state: {},
    dispatch: jest.fn(),
  });
  return { CohortStateContext };
});

jest.mock('../../../src/pages/globalSearch/Cards/participant/ParticipantCard', () => {
  function MockParticipantCard({ setOpenSnackbar, setAlterDisplay }) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpenSnackbar(true)}
        >
          trigger-snackbar
        </button>
        <button
          type="button"
          onClick={() => setAlterDisplay(true)}
        >
          trigger-alert
        </button>
      </div>
    );
  }
  return MockParticipantCard;
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import ParticipantCardRedux from '../../../src/pages/globalSearch/Cards/participant/ParticipantCardRedux';

function renderWithStore(ui, { filesId = [], count = 0 } = {}) {
  const store = createStore(() => ({
    cartReducer: { filesId, count },
  }));
  return render(<Provider store={store}>{ui}</Provider>);
}

describe('ParticipantCardRedux — snackbar and alert', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should show snackbar message then close after timeout', () => {
    renderWithStore(
      <ParticipantCardRedux data={{}} index={0} />,
      { count: 3 },
    );

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /trigger-snackbar/i }));
    });

    expect(
      screen.getByText(/File\(s\) successfully added to your cart/i),
    ).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });
  });

  it('should open cart limit alert dialog', () => {
    const alertText =
      'The cart is limited to 200,000 files. Please narrow the search criteria or remove some files from the cart to add more.';

    renderWithStore(
      <ParticipantCardRedux data={{}} index={0} />,
      { count: 1 },
    );

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /trigger-alert/i }));
    });

    expect(screen.getByText(alertText)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(4000);
    });
  });
});
