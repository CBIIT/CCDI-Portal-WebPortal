/**
 * Phase 3 — `src/utils/utils.js`: CRDC link shaping, string helpers, dashboard navigation bridge.
 */

jest.mock('../../src/pages/inventory/sideBar/BentoFilterUtils', () => ({
  onClearAllAndSelectFacetValue: jest.fn(),
}));

import { onClearAllAndSelectFacetValue } from '../../src/pages/inventory/sideBar/BentoFilterUtils';
import {
  navigatedToDashboard,
  convertCRDCLinksToValue,
  removeSquareBracketsFromString,
} from '../../src/utils/utils';

describe('utils', () => {
  describe('navigatedToDashboard', () => {
    it('should delegate to onClearAllAndSelectFacetValue with study facet', () => {
      navigatedToDashboard('phs001');

      expect(onClearAllAndSelectFacetValue).toHaveBeenCalledWith('study', 'phs001');
    });
  });

  describe('convertCRDCLinksToValue', () => {
    it('should aggregate CRDCLinks into length + links when key is omitted', () => {
      const inner = [
        {
          id: '1',
          CRDCLinks: ['http://a', 'http://b'],
        },
      ];
      const data = { studies: inner };

      const result = convertCRDCLinksToValue(data);

      expect(result.studies[0].CRDCLinks).toBe(2);
      expect(result.studies[0].links).toEqual(['http://a', 'http://b']);
    });

    it('should transform the nested array when key is provided', () => {
      const data = {
        rows: [{ CRDCLinks: ['x'], name: 'n' }],
      };

      const result = convertCRDCLinksToValue(data, 'rows');

      expect(result.rows[0].CRDCLinks).toBe(1);
      expect(result.rows[0].links).toEqual(['x']);
      expect(result.rows[0].name).toBe('n');
    });
  });

  describe('removeSquareBracketsFromString', () => {
    it('should strip square brackets', () => {
      expect(removeSquareBracketsFromString('[a, b]')).toBe('a, b');
    });
  });
});
