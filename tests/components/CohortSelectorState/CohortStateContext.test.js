/**
 * `CohortStateProvider` — loads persisted state and exposes dispatch via context.
 */

jest.mock('use-reducer-logger', () => ({
  __esModule: true,
  default: (reducer) => reducer,
}));

import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  CohortStateContext,
  CohortStateProvider,
} from '../../../src/components/CohortSelectorState/CohortStateContext';
import { initialState } from '../../../src/components/CohortSelectorState/store/reducer';
import { onCreateNewCohort } from '../../../src/components/CohortSelectorState/store/action';

const validParticipant = {
  id: 'pk1',
  participant_id: 'P001',
  study_id: 'S001',
};

function CohortConsumer() {
  const { state, dispatch } = useContext(CohortStateContext);
  return (
    <div>
      <span data-testid="cohort-count">{Object.keys(state).length}</span>
      <span data-testid="first-cohort">{state['my-cohort']?.cohortName || ''}</span>
      <button
        type="button"
        onClick={() =>
          dispatch(
            onCreateNewCohort(
              'my-cohort',
              'Test cohort',
              [validParticipant],
              jest.fn(),
              jest.fn(),
            ),
          )
        }
      >
        Create cohort
      </button>
    </div>
  );
}

describe('CohortStateContext', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should provide empty initial state when localStorage is empty', () => {
    render(
      <CohortStateProvider>
        <CohortConsumer />
      </CohortStateProvider>,
    );

    expect(screen.getByTestId('cohort-count')).toHaveTextContent('0');
    expect(localStorage.getItem).toHaveBeenCalledWith('cohortState');
  });

  it('should hydrate state from localStorage on mount', () => {
    const persisted = {
      saved: {
        cohortId: 'saved',
        cohortName: 'Saved Cohort',
        cohortDescription: '',
        participants: [validParticipant],
        lastUpdated: new Date().toISOString(),
      },
    };
    Storage.prototype.getItem.mockReturnValue(JSON.stringify(persisted));

    function HydratedConsumer() {
      const { state } = useContext(CohortStateContext);
      return <span data-testid="saved-name">{state.saved?.cohortName}</span>;
    }

    render(
      <CohortStateProvider>
        <HydratedConsumer />
      </CohortStateProvider>,
    );

    expect(screen.getByTestId('saved-name')).toHaveTextContent('Saved Cohort');
  });

  it('should fall back to reducer initialState when localStorage has no entry', () => {
    Storage.prototype.getItem.mockReturnValue(null);

    function StateProbe() {
      const { state } = useContext(CohortStateContext);
      return (
        <span data-testid="is-initial">
          {Object.keys(state).length === Object.keys(initialState).length ? 'yes' : 'no'}
        </span>
      );
    }

    render(
      <CohortStateProvider>
        <StateProbe />
      </CohortStateProvider>,
    );

    expect(screen.getByTestId('is-initial')).toHaveTextContent('yes');
  });

  it('should update context state when dispatching create cohort', () => {
    render(
      <CohortStateProvider>
        <CohortConsumer />
      </CohortStateProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Create cohort' }));

    expect(screen.getByTestId('cohort-count')).toHaveTextContent('1');
    expect(screen.getByTestId('first-cohort')).toHaveTextContent('my-cohort');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cohortState',
      expect.stringContaining('my-cohort'),
    );
  });
});
