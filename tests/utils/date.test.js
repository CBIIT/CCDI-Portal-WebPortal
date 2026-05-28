/**
 * Phase 3 — `src/utils/date.js`: pure date formatting (tests/TEST_STRUCTURE.md utilities batch).
 */

import getDateInFormat from '../../src/utils/date';

describe('getDateInFormat', () => {
  describe('Rendering', () => {
    it('should return slash-separated local y/m/d when no separator', () => {
      const input = '2024-03-05T12:00:00.000Z';
      const d = new Date(input);
      const expected = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
      expect(getDateInFormat(input)).toBe(expected);
    });

    it('should use a custom separator when provided', () => {
      const input = '2024-03-05T12:00:00.000Z';
      const d = new Date(input);
      const expected = `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;
      expect(getDateInFormat(input, '-')).toBe(expected);
    });
  });

  describe('Edge cases', () => {
    it('should return empty string when dateString is missing', () => {
      expect(getDateInFormat('')).toBe('');
      expect(getDateInFormat(undefined)).toBe('');
    });

    it('should ignore empty separator and use default pattern', () => {
      const input = '2024-06-01T00:00:00.000Z';
      const d = new Date(input);
      const expected = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
      expect(getDateInFormat(input, '')).toBe(expected);
    });
  });
});
