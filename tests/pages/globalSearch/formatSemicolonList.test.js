/**
 * formatSemicolonList — space after each semicolon in card field lists.
 *
 * @see src/pages/globalSearch/Cards/formatSemicolonList.js
 */

import formatSemicolonList from '../../../src/pages/globalSearch/Cards/formatSemicolonList';

describe('formatSemicolonList', () => {
  it('should insert a space after each semicolon in a concatenated list', () => {
    expect(formatSemicolonList('Other;Etoposide;Cyclophosphamide')).toBe(
      'Other; Etoposide; Cyclophosphamide',
    );
  });

  it('should leave already-spaced lists unchanged', () => {
    expect(formatSemicolonList('Alive; Dead')).toBe('Alive; Dead');
  });

  it('should collapse extra spaces after a semicolon to a single space', () => {
    expect(formatSemicolonList('White;  Hispanic')).toBe('White; Hispanic');
  });

  it('should join arrays with a spaced semicolon', () => {
    expect(formatSemicolonList(['id-a', 'id-b'])).toBe('id-a; id-b');
  });

  it('should pass through empty, null, and non-string values', () => {
    expect(formatSemicolonList('')).toBe('');
    expect(formatSemicolonList(null)).toBeNull();
    expect(formatSemicolonList(undefined)).toBeUndefined();
    expect(formatSemicolonList(0)).toBe(0);
  });
});
