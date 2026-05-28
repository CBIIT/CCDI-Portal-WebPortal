/**
 * Unit tests for `capitalize` in `src/components/util/Style.js`.
 */

import { capitalize } from '../../../src/components/util/Style';

describe('Style helpers', () => {
  describe('capitalize', () => {
    it('should uppercase the first character and keep the rest', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should handle single-character strings', () => {
      expect(capitalize('a')).toBe('A');
    });

    it('should return empty string for empty input', () => {
      expect(capitalize('')).toBe('');
    });
  });
});
