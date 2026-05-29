/**
 * Phase 3 — `src/utils/colors.js`: chart palette bundle.
 */

import colors from '../../src/utils/colors';

describe('colors', () => {
  it('should expose even/odd palettes with entries', () => {
    expect(Array.isArray(colors.even)).toBe(true);
    expect(colors.even.length).toBeGreaterThan(0);
    expect(colors.odd).toEqual(colors.even);
  });
});
