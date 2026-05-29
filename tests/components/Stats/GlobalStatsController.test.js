/**
 * GlobalStatsController — Apollo useQuery branches: loading, error, success → StatsView.
 */

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
}));

jest.mock('../../../src/components/Stats/StatsView', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: function StatsViewMock({ data }) {
      return <div data-testid="stats-view">{JSON.stringify(data)}</div>;
    },
  };
});

jest.mock('../../../src/components/Wrappers/Wrappers', () => ({
  Typography: function TypographyMock({ children }) {
    return <div data-testid="stats-error">{children}</div>;
  },
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useQuery } from '@apollo/client';
import GlobalStatsController from '../../../src/components/Stats/GlobalStatsController';

describe('GlobalStatsController', () => {
  beforeEach(() => {
    useQuery.mockReset();
  });

  describe('Rendering', () => {
    it('should show a progress indicator while loading', () => {
      useQuery.mockReturnValue({ loading: true, error: undefined, data: undefined });
      render(<GlobalStatsController />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should show an error message when the query fails', () => {
      const err = new Error('GraphQL failure');
      useQuery.mockReturnValue({ loading: false, error: err, data: undefined });
      render(<GlobalStatsController />);
      expect(screen.getByTestId('stats-error')).toHaveTextContent(/GraphQL failure/);
    });

    it('should render StatsView when data is present', () => {
      const data = { numberOfParticipants: 9 };
      useQuery.mockReturnValue({ loading: false, error: undefined, data });
      render(<GlobalStatsController />);
      expect(screen.getByTestId('stats-view')).toHaveTextContent(JSON.stringify(data));
    });
  });
});
