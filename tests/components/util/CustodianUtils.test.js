/**
 * `custodianUtils` — labels and authenticator display names.
 */

import { custodianUtils } from '../../../src/components/util/CustodianUtils';

describe('custodianUtils', () => {
  describe('getNodeLevelLabel', () => {
    it('should truncate long labels when nodeLevelAccess is true', () => {
      const long = 'x'.repeat(40);
      expect(custodianUtils.getNodeLevelLabel(long, true)).toHaveLength(30);
    });

    it('should return the full label when nodeLevelAccess is false', () => {
      expect(custodianUtils.getNodeLevelLabel('Short', false)).toBe('Short');
    });
  });

  describe('getAuthenticatorName', () => {
    it('should map known IDPs to display names', () => {
      expect(custodianUtils.getAuthenticatorName('google')).toBe('Google');
      expect(custodianUtils.getAuthenticatorName('nih')).toBe('NIH');
      expect(custodianUtils.getAuthenticatorName('login.gov')).toBe('Login.gov');
    });

    it('should pass through unknown IDP strings', () => {
      expect(custodianUtils.getAuthenticatorName('custom-idp')).toBe('custom-idp');
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('should handle special-case membership strings', () => {
      expect(custodianUtils.capitalizeFirstLetter('non-member')).toBe('Non-Member');
      expect(custodianUtils.capitalizeFirstLetter('NIH')).toBe('NIH');
      expect(custodianUtils.capitalizeFirstLetter('esi')).toBe('ESI');
    });

    it('should title-case multi-word strings', () => {
      expect(custodianUtils.capitalizeFirstLetter('hello world')).toBe('Hello World');
    });
  });
});
