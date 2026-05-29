/**
 * Phase 3 — `src/utils/env.js`: `getEnvBoolean` and merged env export.
 */

import env, { getEnvBoolean } from '../../src/utils/env';

describe('env', () => {
  describe('getEnvBoolean', () => {
    it('should return false when envVariable is the string "false"', () => {
      expect(getEnvBoolean('false', true)).toBe(false);
      expect(getEnvBoolean('false', false)).toBe(false);
    });

    it('should return the boolean value when envVariable is a boolean', () => {
      expect(getEnvBoolean(true, false)).toBe(true);
      expect(getEnvBoolean(false, true)).toBe(false);
    });

    it('should return defaultValue when envVariable is undefined', () => {
      expect(getEnvBoolean(undefined, true)).toBe(true);
      expect(getEnvBoolean(undefined, false)).toBe(false);
    });

    it('should return defaultValue when envVariable is not a boolean (e.g. string)', () => {
      expect(getEnvBoolean('true', false)).toBe(false);
      expect(getEnvBoolean('', true)).toBe(true);
    });
  });

  describe('default export', () => {
    it('should be an object merged from process env (and optional injected env)', () => {
      expect(env).toBeTruthy();
      expect(typeof env).toBe('object');
    });
  });
});
