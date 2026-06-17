/**
 * mapGenerator (MapView) — loads SVG map and initializes echarts instance.
 */

if (typeof global.MutationObserver === 'undefined') {
  global.MutationObserver = class MutationObserver {
    disconnect() {}

    observe() {}

    takeRecords() { return []; }
  };
}

jest.mock('echarts', () => ({
  registerMap: jest.fn(),
  init: jest.fn(),
}));

import React from 'react';
import { render, waitFor, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as echarts from 'echarts';
import MapView, {
  resolveKeyboardInstructions,
  findDistrictOfColumbiaRow,
  getDcLabelGeoCoords,
  resolveGeoPixelPosition,
  resolveDcLabelLayout,
  buildDcLabelGraphicElements,
} from '../../../src/components/common/mapGenerator';

const sampleMapData = {
  title: 'Enrollment by State',
  data: [[10, 20, 'CALIFORNIA', 42]],
};

describe('mapGenerator (MapView)', () => {
  const setOption = jest.fn();
  const resize = jest.fn();
  const dispose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, 'addEventListener');
    jest.spyOn(window, 'removeEventListener');
    echarts.init.mockReturnValue({
      setOption,
      resize,
      dispose,
      getDom: () => document.createElement('div'),
      getZr: () => ({ on: jest.fn(), off: jest.fn() }),
      dispatchAction: jest.fn(),
    });
    global.fetch = jest.fn(() => Promise.resolve({
      text: () => Promise.resolve('<svg viewBox="0 0 100 100"></svg>'),
    }));
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 800 });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.restoreAllMocks();
  });

  it('should fetch map svg, register map, and render chart container', async () => {
    const view = render(<MapView mapData={sampleMapData} />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/map.svg');
    });

    await waitFor(() => {
      expect(echarts.registerMap).toHaveBeenCalledWith(
        'usa_svg',
        expect.objectContaining({ svg: expect.stringContaining('<svg') }),
      );
      expect(echarts.init).toHaveBeenCalledWith(expect.any(HTMLElement));
      expect(setOption).toHaveBeenCalled();
    });

    expect(view.container.querySelector('[id^="mci-enrollment-map-chart-"]')).toBeInTheDocument();
  });

  it('should disable native tooltips and hide zero-enrollment markers', async () => {
    const mapData = {
      title: 'Map',
      data: [[0, 0, 'TEXAS', 0], [1, 2, 'CALIFORNIA', 12]],
    };
    let capturedOption;
    setOption.mockImplementation((opt) => {
      if (opt && opt.series) {
        capturedOption = opt;
      }
    });

    render(<MapView mapData={mapData} />);

    await waitFor(() => {
      expect(capturedOption).toBeDefined();
    });

    expect(capturedOption.tooltip.show).toBe(false);

    const enrollmentMarkers = capturedOption.series.find((s) => s.name === 'enrollmentMarkers');
    expect(enrollmentMarkers.data).toEqual([[1, 2, 'CALIFORNIA', 12]]);

    const sizeFn = enrollmentMarkers.symbolSize;
    expect(sizeFn([0, 0, 'TEXAS', 0])).toBe(0);
    expect(sizeFn([0, 0, 'CALIFORNIA', 12])).toBeGreaterThan(0);
  });

  it('should render keyboard instructions from mapData YAML', async () => {
    const mapDataWithInstructions = {
      ...sampleMapData,
      keyboardInstructions: {
        title: 'Custom Keyboard Help',
        items: [
          { label: 'Step one:', text: 'Do something.' },
        ],
      },
    };
    const view = render(<MapView mapData={mapDataWithInstructions} />);

    await waitFor(() => {
      expect(setOption).toHaveBeenCalled();
    });

    expect(view.getByText('Custom Keyboard Help')).toBeInTheDocument();
    expect(view.getByText('Step one:')).toBeInTheDocument();
    expect(view.getByText(/Do something\./)).toBeInTheDocument();
  });

  it('should not render keyboard instructions when YAML is omitted', async () => {
    expect(resolveKeyboardInstructions(sampleMapData)).toBeNull();

    const view = render(<MapView mapData={sampleMapData} />);

    await waitFor(() => {
      expect(setOption).toHaveBeenCalled();
    });

    expect(view.container.querySelector('.mci-map-keyboard-instructions')).not.toBeInTheDocument();
  });

  it('should show enrollment text in the keyboard tooltip mirror', async () => {
    const view = render(<MapView mapData={sampleMapData} />);

    await waitFor(() => {
      expect(setOption).toHaveBeenCalled();
    });

    const region = view.container.querySelector('.mci-map-keyboard-region');
    fireEvent.focus(region);

    await waitFor(() => {
      const tooltip = view.container.querySelector('.mci-map-keyboard-tooltip-mirror');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip.textContent).toContain('CALIFORNIA');
      expect(tooltip.textContent).toContain('42 enrolled');
    });
  });

  it('should resize chart on window resize and dispose on unmount', async () => {
    const view = render(<MapView mapData={sampleMapData} />);

    await waitFor(() => {
      expect(echarts.init).toHaveBeenCalled();
    });

    const resizeCall = window.addEventListener.mock.calls.find(([event]) => event === 'resize');
    expect(resizeCall).toBeDefined();
    const resizeHandler = resizeCall[1];

    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1200 });
    await act(async () => {
      resizeHandler();
    });

    expect(resize).toHaveBeenCalled();

    view.unmount();
    expect(dispose).toHaveBeenCalled();
  });

  it('should log fetch errors without throwing', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = jest.fn(() => Promise.reject(new Error('network')));

    render(<MapView mapData={sampleMapData} />);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith('MCI enrollment map fetch error', expect.any(Error));
    });

    consoleError.mockRestore();
  });

  it('should render nothing when map data is empty', () => {
    const { container } = render(<MapView mapData={{ title: 'Map', data: [] }} />);
    expect(container.firstChild).toBeNull();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should resolve District of Columbia map row and callout coords', () => {
    const rows = [
      [100, 200, 'MARYLAND', 10],
      [790, 305, 'DISTRICT OF COLUMBIA', 54],
    ];

    expect(findDistrictOfColumbiaRow(rows)).toEqual(rows[1]);
    expect(getDcLabelGeoCoords(rows[1])).toEqual({
      marker: [790, 305],
      label: [838, 329],
    });
  });

  it('should build DC label graphics that match state label styling', () => {
    const layout = {
      marker: { left: 360, top: 215 },
      label: { left: 430, top: 238 },
    };
    const graphics = buildDcLabelGraphicElements(layout);

    expect(graphics).toHaveLength(2);
    expect(graphics[0].type).toBe('line');
    expect(graphics[0].style.stroke).toBe('#4B545B');
    expect(graphics[1].type).toBe('text');
    expect(graphics[1].style.fill).toBe('#4B545B');
    expect(graphics[1].style.font).toBe('500 8px Inter, sans-serif');
    expect(graphics[1].style.text).toContain('DISTRICT OF');
    expect(graphics[1].style.text).toContain('COLUMBIA');
    expect(buildDcLabelGraphicElements(null)).toEqual([]);
  });

  it('should render DC via ECharts graphics after the chart is ready', async () => {
    const mapData = {
      title: 'Map',
      data: [[790, 305, 'DISTRICT OF COLUMBIA', 54]],
    };
    const convertToPixel = jest.fn((coordSys, coords) => {
      if (coords[0] === 790) return [360, 215];
      if (coords[0] === 838) return [430, 238];
      return [0, 0];
    });
    setOption.mockImplementation(() => {});
    echarts.init.mockReturnValue({
      setOption,
      resize,
      dispose,
      getDom: () => document.createElement('div'),
      getZr: () => ({ on: jest.fn(), off: jest.fn() }),
      dispatchAction: jest.fn(),
      convertToPixel,
    });

    const view = render(<MapView mapData={mapData} />);

    await waitFor(() => {
      expect(convertToPixel).toHaveBeenCalledWith('geo', [790, 305]);
      expect(convertToPixel).toHaveBeenCalledWith('geo', [838, 329]);
    });

    await waitFor(() => {
      const graphicCalls = setOption.mock.calls.filter((call) => call[0] && call[0].graphic);
      expect(graphicCalls.length).toBeGreaterThan(0);
      const lastGraphic = graphicCalls[graphicCalls.length - 1][0].graphic;
      const lineGraphic = lastGraphic.find((g) => g.id === 'mci-map-dc-callout-line');
      const textGraphic = lastGraphic.find((g) => g.id === 'mci-map-dc-state-label');
      expect(lineGraphic).toBeDefined();
      expect(textGraphic).toBeDefined();
      expect(textGraphic.style.text).toContain('DISTRICT OF');
      expect(textGraphic.style.text).toContain('COLUMBIA');
      expect(textGraphic.style.fill).toBe('#4B545B');
      expect(textGraphic.style.font).toBe('500 8px Inter, sans-serif');
      expect(lineGraphic.shape.x1).toBe(360);
      expect(lineGraphic.shape.y1).toBe(215);
      expect(lineGraphic.shape.x2).toBe(430);
      expect(lineGraphic.shape.y2).toBe(238);
    });

    expect(view.container.querySelector('.mci-map-dc-state-label')).toBeNull();

    const layout = resolveDcLabelLayout(
      { convertToPixel: jest.fn(() => [10, 20]) },
      getDcLabelGeoCoords(mapData.data[0]),
    );
    expect(layout).toEqual({
      marker: { left: 10, top: 20 },
      label: { left: 10, top: 20 },
    });
  });

  it('should not add a duplicate stateLabels series because names are in map.svg', async () => {
    const mapData = {
      title: 'Map',
      data: [[638, 420, 'ALABAMA', 12]],
    };
    let capturedOption;
    setOption.mockImplementation((opt) => {
      if (opt && opt.series) {
        capturedOption = opt;
      }
    });

    render(<MapView mapData={mapData} />);

    await waitFor(() => {
      expect(capturedOption).toBeDefined();
    });

    expect(capturedOption.series).toHaveLength(1);
    expect(capturedOption.series[0].name).toBe('enrollmentMarkers');
    expect(capturedOption.series.find((s) => s.name === 'stateLabels')).toBeUndefined();
    expect(resolveGeoPixelPosition(null, [1, 2])).toBeNull();
  });
});
