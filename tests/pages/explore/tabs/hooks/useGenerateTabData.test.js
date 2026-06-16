/**
 * useGenerateTabData — tab label/panel generation for Explore tabs.
 */

jest.mock('../../../../../src/pages/inventory/tabs/TabPanel', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: function MockTabPanel({ tab }) {
      return React.createElement('div', { 'data-testid': `tab-panel-${tab.name}` }, tab.name);
    },
  };
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import useGenerateTabData from '../../../../../src/pages/inventory/tabs/hooks/useGenerateTabData';

function HookHarness({
  tabContainers,
  activeFilters,
  dashboardStats,
  activeTab,
}) {
  const { generatedTabData } = useGenerateTabData({
    tabContainers,
    activeFilters,
    dashboardStats,
    activeTab,
  });
  return React.createElement(
    'div',
    null,
    React.createElement('span', { 'data-testid': 'tab-count' }, generatedTabData.length),
    ...generatedTabData.map((entry, index) =>
      React.createElement(
        'div',
        { key: index, 'data-testid': `tab-entry-${index}` },
        entry.panel,
      ),
    ),
  );
}

const tabContainers = [
  { name: 'Participants', count: 'numberOfParticipants' },
  { name: 'Studies', count: 'numberOfStudies' },
];

const dashboardStats = {
  numberOfParticipants: 42,
  numberOfStudies: 7,
};

describe('useGenerateTabData', () => {
  it('should generate tab data when dashboardStats is available', () => {
    render(
      React.createElement(HookHarness, {
        tabContainers,
        activeFilters: {},
        dashboardStats,
        activeTab: 0,
      }),
    );
    expect(screen.getByTestId('tab-count')).toHaveTextContent('2');
    expect(screen.getByTestId('tab-panel-Participants')).toBeInTheDocument();
    expect(screen.getByTestId('tab-panel-Studies')).toBeInTheDocument();
  });

  it('should return empty tab data when dashboardStats is missing', () => {
    render(
      React.createElement(HookHarness, {
        tabContainers,
        activeFilters: {},
        dashboardStats: null,
        activeTab: 0,
      }),
    );
    expect(screen.getByTestId('tab-count')).toHaveTextContent('0');
  });

  it('should regenerate panels when activeTab changes', () => {
    const { rerender } = render(
      React.createElement(HookHarness, {
        tabContainers,
        activeFilters: {},
        dashboardStats,
        activeTab: 0,
      }),
    );
    expect(screen.getByTestId('tab-panel-Participants')).toBeInTheDocument();

    rerender(
      React.createElement(HookHarness, {
        tabContainers,
        activeFilters: {},
        dashboardStats,
        activeTab: 1,
      }),
    );
    expect(screen.getByTestId('tab-panel-Studies')).toBeInTheDocument();
  });
});
