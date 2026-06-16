/**
 * MCIDiseaseTable — donut + name/value grid (DonutChart mocked).
 */

jest.mock('../../../../src/components/common/DonutChart', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: function DonutChartMock() {
      return <div data-testid="donut-chart-mock" />;
    },
  };
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MCIDiseaseTable from '../../../../src/pages/resource/components/MCIDiseaseTable';
import { mciDiseaseTableFixture } from '../../../fixtures/resource/resourceComponentsFixtures';

describe('MCIDiseaseTable', () => {
  describe('Rendering', () => {
    it('should render title, headers, donut, and name/value cells', () => {
      render(<MCIDiseaseTable table={mciDiseaseTableFixture} />);

      expect(screen.getByText('Disease breakdown')).toBeInTheDocument();
      expect(screen.getByText('Category')).toBeInTheDocument();
      expect(screen.getByTestId('donut-chart-mock')).toBeInTheDocument();
      expect(screen.getByText('Asthma')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });
  });
});
