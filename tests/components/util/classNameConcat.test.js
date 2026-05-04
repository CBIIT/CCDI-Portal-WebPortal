/**
 * Unit tests for `cn` (classNameConcat) — filters falsy class segments and joins with spaces.
 * Follows tests/TEST_STRUCTURE.md: Rendering / behavior sections, `it('should …')` names, no I/O.
 */

import cn from '../../../src/components/util/classNameConcat';

describe('classNameConcat (cn)', () => {
  describe('Rendering / string output', () => {
    it('should return an empty string when no arguments are passed', () => {
      expect(cn()).toBe('');
    });

    it('should join defined string arguments with a single space', () => {
      expect(cn('a', 'b', 'c')).toBe('a b c');
    });

    it('should omit undefined, null, and empty string arguments', () => {
      expect(cn('a', undefined, 'b', null, '', 'c')).toBe('a b c');
    });

    it('should return a single class when one argument is provided', () => {
      expect(cn('only')).toBe('only');
    });
  });

  describe('Edge cases', () => {
    it('should treat the string "0" as a valid class segment', () => {
      expect(cn('0')).toBe('0');
    });

    it('should omit false but keep other truthy segments', () => {
      expect(cn('x', false && 'hidden', 'y')).toBe('x y');
    });
  });
});
