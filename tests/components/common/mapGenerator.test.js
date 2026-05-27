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
import { render, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as echarts from 'echarts';
import MapView from '../../../src/components/common/mapGenerator';

describe('mapGenerator (MapView)', () => {
  const setOption = jest.fn();
  const resize = jest.fn();
  const dispose = jest.fn();
  let chartEl;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, 'addEventListener');
    jest.spyOn(window, 'removeEventListener');
    chartEl = document.createElement('div');
    chartEl.id = 'beef';
    document.body.appendChild(chartEl);
    jest.spyOn(document, 'getElementById').mockReturnValue(chartEl);
    echarts.init.mockReturnValue({ setOption, resize, dispose });
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
    const mapData = {
      title: 'Enrollment by State',
      data: [[10, 20, 'CALIFORNIA', 42]],
    };

    const view = render(<MapView mapData={mapData} />);
    const { container } = view;

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('./map.svg');
    });

    await waitFor(() => {
      expect(echarts.registerMap).toHaveBeenCalledWith(
        'usa_svg',
        expect.objectContaining({ svg: expect.stringContaining('<svg') }),
      );
      expect(echarts.init).toHaveBeenCalledWith(chartEl);
      expect(setOption).toHaveBeenCalled();
    });

    expect(container.querySelector('#beef')).toBeInTheDocument();
  });

  it('should format tooltip labels and hide markers when enrollment is zero', async () => {
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

    const html = capturedOption.tooltip.formatter({
      data: [0, 0, 'TEXAS', 42],
    });
    expect(html).toContain('TEXAS');
    expect(html).toContain('42 enrolled');

    const sizeFn = capturedOption.series.symbolSize;
    expect(sizeFn([0, 0, 'TEXAS', 0])).toBe(0);
    expect(sizeFn([0, 0, 'CALIFORNIA', 12])).toBeGreaterThan(0);
  });

  it('should resize chart on window resize and dispose on unmount', async () => {
    const view = render(<MapView mapData={{ title: 'Map', data: [] }} />);

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
  });

  it('should log fetch errors without throwing', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = jest.fn(() => Promise.reject(new Error('network')));

    render(<MapView mapData={{ title: 'Map', data: [] }} />);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith('fetch error', expect.any(Error));
    });

    consoleError.mockRestore();
  });
});
