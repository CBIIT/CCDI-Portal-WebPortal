/**
 * DonutChart — active slice rendering and hover index updates (recharts mocked).
 */

jest.mock('recharts', () => {
  const React = require('react');
  return {
    ResponsiveContainer: ({ children }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
    PieChart: ({ children }) => <div data-testid="pie-chart">{children}</div>,
    Pie: ({
      data, activeShape, activeIndex, onMouseEnter,
    }) => {
      const Active = activeShape;
      const entry = data[activeIndex] || data[0];
      return (
        <div
          data-testid="pie"
          role="button"
          tabIndex={0}
          onMouseEnter={() => onMouseEnter && onMouseEnter(null, 1)}
          onKeyDown={() => {}}
        >
          {Active && entry && Active({
            cx: 150,
            cy: 150,
            innerRadius: 60,
            outerRadius: 90,
            startAngle: 0,
            endAngle: 180,
            fill: '#137E87',
            payload: entry,
            value: entry.value,
          })}
        </div>
      );
    },
    Cell: () => null,
    Sector: (props) => <path aria-label={props['aria-label']} />,
  };
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DonutChart from '../../../src/components/common/DonutChart';

const chartData = [
  { name: 'Central Nervous System', value: 100 },
  { name: 'This is an extremely long diagnosis label for truncation', value: 50 },
];

describe('DonutChart', () => {
  it('should render chart container and active slice labels', () => {
    render(
      <DonutChart
        data={chartData}
        innerRadiusP={60}
        outerRadiusP={90}
        paddingSpace={2}
        textColor="#000000"
      />,
    );

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Participants')).toBeInTheDocument();
    expect(screen.getByText(/Central Nervous System/)).toBeInTheDocument();
  });

  it('should reset active index when data changes', () => {
    const { rerender } = render(
      <DonutChart
        data={chartData}
        innerRadiusP={60}
        outerRadiusP={90}
        paddingSpace={2}
        textColor="#000000"
      />,
    );

    rerender(
      <DonutChart
        data={[{ name: 'Rare Tumors', value: 10 }]}
        innerRadiusP={60}
        outerRadiusP={90}
        paddingSpace={2}
        textColor="#000000"
      />,
    );

    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should update active slice on mouse enter', () => {
    render(
      <DonutChart
        data={chartData}
        innerRadiusP={60}
        outerRadiusP={90}
        paddingSpace={2}
        textColor="#000000"
      />,
    );

    fireEvent.mouseEnter(screen.getByTestId('pie'));
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('should render short labels without truncation', () => {
    render(
      <DonutChart
        data={[{ name: 'Short', value: 5 }]}
        innerRadiusP={60}
        outerRadiusP={90}
        paddingSpace={2}
        textColor="#000000"
      />,
    );
    expect(screen.getByText('Short')).toBeInTheDocument();
  });
});
