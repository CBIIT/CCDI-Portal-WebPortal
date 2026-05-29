/**
 * **`CohortAnalyzerController`** — providers wrap **`CohortAnalyzer`** (smoke).
 *
 * @see src/pages/CohortAnalyzer/CohortAnalyzerController.js
 */

jest.mock('../../../src/pages/CohortAnalyzer/CohortAnalyzer', () => ({
  CohortAnalyzer: () => <div data-testid="cohort-analyzer-page">Cohort Analyzer</div>,
}));

jest.mock('../../../src/components/CohortSelectorState/CohortStateContext', () => {
  const React = require('react');
  const CohortStateContext = React.createContext({
    state: {},
    dispatch: jest.fn(),
  });
  return {
    CohortStateProvider: ({ children }) => (
      <CohortStateContext.Provider value={{ state: {}, dispatch: jest.fn() }}>
        {children}
      </CohortStateContext.Provider>
    ),
    CohortStateContext,
  };
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CohortAnalyzerController from '../../../src/pages/CohortAnalyzer/CohortAnalyzerController';

describe('CohortAnalyzerController', () => {
  it('should render Cohort Analyzer inside cohort providers', () => {
    render(<CohortAnalyzerController />);

    expect(screen.getByTestId('cohort-analyzer-page')).toBeInTheDocument();
    expect(screen.getByText('Cohort Analyzer')).toBeInTheDocument();
  });
});
