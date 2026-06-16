/**
 * Phase 3 — `src/utils/localStorage.js`: thin localStorage wrapper.
 */

import {
  storeInLocalStorage,
  getFromLocalStorage,
  deleteFromLocalStorage,
} from '../../src/utils/localStorage';

describe('localStorage helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should round-trip an object via store and get', () => {
    storeInLocalStorage('k', { a: 1 });
    expect(getFromLocalStorage('k')).toEqual({ a: 1 });
  });

  it('should return empty object when key is missing', () => {
    expect(getFromLocalStorage('missing')).toEqual({});
  });

  it('should remove a key', () => {
    storeInLocalStorage('x', { n: 2 });
    deleteFromLocalStorage('x');
    expect(getFromLocalStorage('x')).toEqual({});
  });
});
