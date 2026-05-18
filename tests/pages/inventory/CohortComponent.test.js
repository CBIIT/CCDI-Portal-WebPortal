/**
 * CohortComponent — local cohort participant list (legacy helper UI).
 */

jest.mock('../../../src/components/CohortSelector/CohortContext.js', () => {
  const React = require('react');
  return { CohortContext: React.createContext() };
}, { virtual: true });

import React, { useReducer } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CohortContext } from '../../../src/components/CohortSelector/CohortContext.js';
import CohortComponent from '../../../src/pages/inventory/CohortComponent';

function cohortReducer(state, action) {
  switch (action.type) {
    case 'ADD_PARTICIPANT':
      return { ...state, participants: [...state.participants, action.payload] };
    case 'REMOVE_PARTICIPANT':
      return {
        ...state,
        participants: state.participants.filter((p) => p.id !== action.payload),
      };
    default:
      return state;
  }
}

function renderWithCohort(initialState = { cohort: 'Test Cohort', participants: [] }) {
  function Wrapper({ children }) {
    const [state, dispatch] = useReducer(cohortReducer, initialState);
    return (
      <CohortContext.Provider value={{ state, dispatch }}>
        {children}
      </CohortContext.Provider>
    );
  }
  return render(
    <Wrapper>
      <CohortComponent />
    </Wrapper>,
  );
}

describe('CohortComponent', () => {
  it('should render cohort name and empty participant list', () => {
    renderWithCohort();
    expect(screen.getByText('Cohort: Test Cohort')).toBeInTheDocument();
    expect(screen.getByText('Participants:')).toBeInTheDocument();
  });

  it('should show default message when no cohort is selected', () => {
    renderWithCohort({ cohort: '', participants: [] });
    expect(screen.getByText('Cohort: No cohort selected')).toBeInTheDocument();
  });

  it('should add and remove participants', () => {
    renderWithCohort();
    fireEvent.change(screen.getByPlaceholderText('Add participant'), {
      target: { value: 'Alice' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add Participant' }));
    expect(screen.getByText('Alice')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
  });
});
