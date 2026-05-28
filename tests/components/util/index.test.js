/**
 * Barrel exports from `src/components/util/index.js`.
 */

import * as util from '../../../src/components/util';

describe('components/util index', () => {
  it('should re-export table, dashboard, storage, and helper utilities', () => {
    expect(typeof util.getColumns).toBe('function');
    expect(typeof util.getOptions).toBe('function');
    expect(typeof util.generateDataAvailabilityTooltipText).toBe('function');
    expect(typeof util.filterData).toBe('function');
    expect(typeof util.getDonutDataFromDashboardData).toBe('function');
    expect(typeof util.storeInLocalStorage).toBe('function');
    expect(typeof util.getFromLocalStorage).toBe('function');
    expect(typeof util.capitalize).toBe('function');
    expect(typeof util.manipulateLinks).toBe('function');
    expect(typeof util.cn).toBe('function');
    expect(util.createSvgIcon).toBeDefined();
    expect(util.RouteLinks).toBeDefined();
  });

  it('should wire local storage helpers', () => {
    const key = 'util-index-test-key';
    util.storeInLocalStorage(key, { ok: true });
    expect(util.getFromLocalStorage(key)).toEqual({ ok: true });
    util.deleteFromLocalStorage(key);
    expect(util.getFromLocalStorage(key)).toEqual({});
  });
});
