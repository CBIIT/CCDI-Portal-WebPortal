/**
 * ChartView — bar chart, legend, tooltip, and hover handlers (recharts mocked).
 */

jest.mock('recharts', () => {
  const React = require('react');
  return {
    ResponsiveContainer: ({ children }) => (
      React.createElement('div', { 'data-testid': 'responsive-container' }, children)
    ),
    BarChart: ({
      children, onMouseMove, onMouseLeave, data,
    }) => (
      React.createElement(
        'div',
        {
          'data-testid': 'bar-chart',
          onMouseEnter: () => {
            if (onMouseMove && data && data.length) {
              onMouseMove({ activePayload: [{ payload: data[0] }] });
            }
          },
          onMouseLeave: () => onMouseLeave && onMouseLeave(),
        },
        children,
      )
    ),
    Bar: ({ children }) => React.createElement('div', { 'data-testid': 'bar' }, children),
    Cell: () => null,
    XAxis: () => null,
    YAxis: () => null,
    CartesianGrid: () => null,
    Tooltip: ({ content }) => React.createElement(
      React.Fragment,
      null,
      React.isValidElement(content) && React.cloneElement(content, {
        active: true,
        payload: [{ value: 42 }],
        label: 'Clinical',
      }),
      React.isValidElement(content) && React.cloneElement(content, {
        active: false,
        payload: [],
        label: '',
      }),
    ),
    Legend: ({ content }) => (
      React.isValidElement(content)
        ? React.cloneElement(content, { hoveredGroup: 'Clinical' })
        : null
    ),
  };
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ChartView from '../../../../../src/pages/studyDetail/overview/chart/ChartView';
import { chartDataFixture } from '../../../../fixtures/studyDetail/overviewViewProps';

const theme = createMuiTheme();

function renderChart(isModalView = true) {
  return render(
    <ThemeProvider theme={theme}>
      <ChartView data={chartDataFixture} isModalView={isModalView} />
    </ThemeProvider>,
  );
}

describe('ChartView', () => {
  it('should render chart container in modal layout', () => {
    renderChart(true);
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByText('Clinical')).toBeInTheDocument();
    expect(screen.getByText('Sequencing')).toBeInTheDocument();
  });

  it('should render inline chart layout when not in modal view', () => {
    const { container } = renderChart(false);
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    const root = container.firstChild;
    expect(root.className).toMatch(/chartContainer/);
    expect(root.className).not.toMatch(/chartContainerModal/);
  });

  it('should show tooltip value when chart reports active payload', () => {
    renderChart(true);
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText(/Clinical:/i)).toBeInTheDocument();
  });

  it('should update legend highlight on mouse move and clear on mouse leave', () => {
    renderChart(true);
    const chart = screen.getByTestId('bar-chart');
    fireEvent.mouseEnter(chart);
    expect(screen.getByText('Clinical')).toBeInTheDocument();
    fireEvent.mouseLeave(chart);
    expect(screen.getByText('Clinical')).toBeInTheDocument();
  });
});
