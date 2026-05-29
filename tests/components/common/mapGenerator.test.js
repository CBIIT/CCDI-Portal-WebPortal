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
import MapView from '../../../src/components/common/mapGenerator';

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
      capturedOption = opt;
    });

    render(<MapView mapData={mapData} />);

    await waitFor(() => {
      expect(setOption).toHaveBeenCalled();
    });

    expect(capturedOption.tooltip.show).toBe(false);

    const enrollmentMarkers = capturedOption.series.find((s) => s.name === 'enrollmentMarkers');
    expect(enrollmentMarkers.data).toEqual([[1, 2, 'CALIFORNIA', 12]]);

    const sizeFn = enrollmentMarkers.symbolSize;
    expect(sizeFn([0, 0, 'TEXAS', 0])).toBe(0);
    expect(sizeFn([0, 0, 'CALIFORNIA', 12])).toBeGreaterThan(0);
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
});
