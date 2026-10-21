/**
 * Unit tests for resolveContentTokens ({{C3DC}} substitution).
 */

jest.mock('../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_C3DC: 'https://c3dc.test.example',
  },
}));

import resolveContentTokens, {
  applyContentVariables,
  resolveContentTokenString,
} from '../../src/utils/resolveContentTokens';

describe('resolveContentTokens', () => {
  it('should replace {{C3DC}} in a string', () => {
    expect(resolveContentTokenString('{{C3DC}}/exploreParticipants')).toBe(
      'https://c3dc.test.example/exploreParticipants',
    );
  });

  it('should allow whitespace inside the token', () => {
    expect(resolveContentTokenString('{{ C3DC }}/')).toBe(
      'https://c3dc.test.example/',
    );
  });

  it('should deep-replace tokens in objects and arrays', () => {
    const input = {
      link: '{{C3DC}}/',
      items: [{ href: '{{C3DC}}/studies' }],
    };
    expect(resolveContentTokens(input)).toEqual({
      link: 'https://c3dc.test.example/',
      items: [{ href: 'https://c3dc.test.example/studies' }],
    });
  });

  it('should replace {{cpiVersion}} from render-time values', () => {
    expect(applyContentVariables('Summary of CPI {{cpiVersion}}', { cpiVersion: 'v1.5' })).toBe(
      'Summary of CPI v1.5',
    );
  });

  it('should leave unknown content variables unchanged', () => {
    expect(applyContentVariables('See {{otherValue}}', { cpiVersion: 'v1.5' })).toBe(
      'See {{otherValue}}',
    );
  });

  it('should leave non-string values unchanged', () => {
    expect(resolveContentTokens(42)).toBe(42);
    expect(resolveContentTokens(null)).toBe(null);
  });
});
