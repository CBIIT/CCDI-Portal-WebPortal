/**
 * Unit tests for StatsView — maps dashboard `data` into @bento-core/stats-bar `stats` props.
 * StatsBar is mocked; assertions use fixture-shaped `data` only (no network).
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatsView from '../../../src/components/Stats/StatsView';

jest.mock('@bento-core/stats-bar', () => function StatsBarMock({ stats }) {
  return (
    <div data-testid="stats-bar">
      {stats.map((s) => (
        <span key={s.name} data-testid={`stat-${s.name}`}>{String(s.val)}</span>
      ))}
    </div>
  );
});

const statsDataFixture = {
  numberOfStudies: 11,
  numberOfParticipants: 22,
  numberOfSamples: 33,
  numberOfFiles: 44,
};

describe('StatsView', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<StatsView data={statsDataFixture} />);
      expect(container).toBeInTheDocument();
      expect(screen.getByTestId('stats-bar')).toBeInTheDocument();
    });

    it('should pass mapped stat values from globalStatsData keys', () => {
      render(<StatsView data={statsDataFixture} />);
      expect(screen.getByTestId('stat-Studies')).toHaveTextContent('11');
      expect(screen.getByTestId('stat-Participants')).toHaveTextContent('22');
      expect(screen.getByTestId('stat-Samples')).toHaveTextContent('33');
      expect(screen.getByTestId('stat-Files')).toHaveTextContent('44');
    });
  });

  describe('Edge cases', () => {
    it('should render undefined for missing data keys', () => {
      render(<StatsView data={{}} />);
      expect(screen.getByTestId('stat-Studies')).toHaveTextContent('undefined');
    });
  });
});
