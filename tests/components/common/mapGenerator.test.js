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
import { render, waitFor } from '@testing-library/react';
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
});
