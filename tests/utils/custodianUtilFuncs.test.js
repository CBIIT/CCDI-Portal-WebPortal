/**
 * Phase 3 — `src/utils/custodianUtilFuncs.js`: labels and display helpers (site config mocked).
 */

jest.mock('../../src/bento/siteWideConfig', () => ({
  NODE_LABEL: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890EXTRA',
  NODE_LEVEL_ACCESS: true,
}));

import custodianUtils from '../../src/utils/custodianUtilFuncs';

describe('custodianUtilFuncs', () => {
  describe('getNodeLevelLabel', () => {
    it('should truncate NODE_LABEL when NODE_LEVEL_ACCESS is true', () => {
      expect(custodianUtils.getNodeLevelLabel()).toHaveLength(30);
      expect(custodianUtils.getNodeLevelLabel()).toBe(
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234',
      );
    });
  });

  describe('getAuthenticatorName', () => {
    it('should map known idp keys to display names', () => {
      expect(custodianUtils.getAuthenticatorName('google')).toBe('Google');
      expect(custodianUtils.getAuthenticatorName('nih')).toBe('NIH');
      expect(custodianUtils.getAuthenticatorName('login.gov')).toBe('Login.gov');
    });

    it('should pass through unknown idp values', () => {
      expect(custodianUtils.getAuthenticatorName('custom-idp')).toBe('custom-idp');
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('should handle special-case tokens', () => {
      expect(custodianUtils.capitalizeFirstLetter('non-member')).toBe('Non-Member');
      expect(custodianUtils.capitalizeFirstLetter('nih')).toBe('NIH');
      expect(custodianUtils.capitalizeFirstLetter('esi')).toBe('ESI');
      expect(custodianUtils.capitalizeFirstLetter('google')).toBe('Google');
    });

    it('should title-case ordinary phrases', () => {
      expect(custodianUtils.capitalizeFirstLetter('hello world')).toBe('Hello World');
    });
  });
});
