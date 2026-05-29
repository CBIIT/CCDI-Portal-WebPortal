/**
 * SearchController — wraps CohortStateProvider and SearchView.
 */

jest.mock('../../../src/components/CohortSelectorState/CohortStateContext', () => {
  const React = require('react');
  return {
    CohortStateProvider: ({ children }) =>
      React.createElement('div', { 'data-testid': 'cohort-provider' }, children),
  };
});

jest.mock('../../../src/pages/globalSearch/searchView', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => React.createElement('div', { 'data-testid': 'search-view' }),
  };
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchController from '../../../src/pages/globalSearch/searchController';

describe('SearchController', () => {
  it('should render search view inside cohort provider', () => {
    render(<SearchController />);
    expect(screen.getByTestId('cohort-provider')).toBeInTheDocument();
    expect(screen.getByTestId('search-view')).toBeInTheDocument();
  });
});
