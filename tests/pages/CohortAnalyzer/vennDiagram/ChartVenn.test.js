/**
 * Cohort Analyzer — **ChartVenn** (Venn diagram wiring).
 *
 * Mocks **`chartjs-chart-venn`** (`VennDiagramChart`, `extractSets`) so tests run without canvas/chart rendering.
 *
 * @see src/pages/CohortAnalyzer/vennDiagram/ChartVenn.js
 */

const mockDestroy = jest.fn();
const mockGetElementsAtEventForMode = jest.fn(() => []);

jest.mock('chartjs-chart-venn', () => ({
  VennDiagramChart: jest.fn().mockImplementation(() => ({
    destroy: mockDestroy,
    getElementsAtEventForMode: mockGetElementsAtEventForMode,
  })),
  // Single-set regions only so background colors use `baseColorArray` + valid rgba (avoids brittle intersection palette indexing).
  extractSets: jest.fn((input) => ({
    datasets: [{
      data: (input || []).map((item, index) => ({
        label: item.label,
        values: item.values || [],
        sets: [`region-${index}`],
      })),
    }],
  })),
}));

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VennDiagramChart } from 'chartjs-chart-venn';
import ChartVenn from '../../../../src/pages/CohortAnalyzer/vennDiagram/ChartVenn';

const defaultCohortData = [
  {
    cohortName: 'Alpha',
    participants: [{ id: 'p1' }, { id: 'p2' }],
  },
  {
    cohortName: 'Beta',
    participants: [{ id: 'p3' }],
  },
];

function setup(override = {}) {
  const setSelectedChart = jest.fn();
  const setSelectedCohortSections = jest.fn();
  const setGeneralInfo = jest.fn();
  const props = {
    intersection: 0,
    cohortData: defaultCohortData,
    setSelectedChart,
    setSelectedCohortSections,
    selectedCohortSection: [],
    selectedCohort: [],
    setGeneralInfo,
    ...override,
  };
  const utils = render(<ChartVenn {...props} />);
  return { ...utils, ...props };
}

describe('ChartVenn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetElementsAtEventForMode.mockReturnValue([]);
    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
  });

  it('should show loading when cohort data yields no sets (empty cohort list)', () => {
    setup({ cohortData: [] });
    expect(screen.getByText('Loading....')).toBeInTheDocument();
    expect(document.querySelector('#canvas')).not.toBeInTheDocument();
  });

  it('should render canvas and construct VennDiagramChart when cohort data is present', async () => {
    setup();
    const canvas = await waitFor(() => document.querySelector('#canvas'));
    expect(canvas).toBeInTheDocument();
    await waitFor(() => {
      expect(VennDiagramChart).toHaveBeenCalled();
    });
    const [, chartConfig] = VennDiagramChart.mock.calls[VennDiagramChart.mock.calls.length - 1];
    expect(chartConfig.type).toBe('venn');
    expect(chartConfig.options.onClick).toEqual(expect.any(Function));
  });

  it('should invoke selection callbacks when chart segment is clicked', async () => {
    const setSelectedChart = jest.fn((updater) => {
      if (typeof updater === 'function') updater([]);
    });
    const setSelectedCohortSections = jest.fn();

    mockGetElementsAtEventForMode.mockReturnValue([
      { datasetIndex: 0, index: 0 },
    ]);

    setup({ setSelectedChart, setSelectedCohortSections });

    await waitFor(() => {
      expect(VennDiagramChart).toHaveBeenCalled();
    });

    const [, chartConfig] = VennDiagramChart.mock.calls[VennDiagramChart.mock.calls.length - 1];
    const syntheticEvent = { clientX: 1, clientY: 1 };
    chartConfig.options.onClick(syntheticEvent);

    expect(mockGetElementsAtEventForMode).toHaveBeenCalled();
    expect(setSelectedChart).toHaveBeenCalled();
    expect(setSelectedCohortSections).toHaveBeenCalled();
  });

  it('should call setGeneralInfo when selected sections are chosen after chart data exists', async () => {
    const setGeneralInfo = jest.fn();
    const props = {
      intersection: 0,
      cohortData: defaultCohortData,
      setSelectedChart: jest.fn(),
      setSelectedCohortSections: jest.fn(),
      selectedCohortSection: [],
      selectedCohort: [],
      setGeneralInfo,
    };
    const { rerender } = render(<ChartVenn {...props} />);
    await waitFor(() => {
      expect(document.querySelector('#canvas')).toBeInTheDocument();
    });

    rerender(
      <ChartVenn
        {...props}
        selectedCohortSection={['Alpha (2)']}
      />,
    );

    await waitFor(() => {
      expect(setGeneralInfo).toHaveBeenCalledWith(
        expect.objectContaining({
          'Alpha (2)': expect.any(Array),
        }),
      );
    });
  });

  it('should destroy prior chart instance on update', async () => {
    const { rerender } = setup();
    await waitFor(() => {
      expect(VennDiagramChart).toHaveBeenCalled();
    });
    const callsAfterFirst = VennDiagramChart.mock.calls.length;
    rerender(
      <ChartVenn
        intersection={0}
        cohortData={defaultCohortData}
        setSelectedChart={jest.fn()}
        setSelectedCohortSections={jest.fn()}
        selectedCohortSection={['Alpha (2)']}
        selectedCohort={[]}
        setGeneralInfo={jest.fn()}
      />,
    );
    await waitFor(() => {
      expect(VennDiagramChart.mock.calls.length).toBeGreaterThan(callsAfterFirst);
    });
    expect(mockDestroy).toHaveBeenCalled();
  });
});
