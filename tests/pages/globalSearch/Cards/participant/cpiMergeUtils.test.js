/**
 * Unit tests for CPI Hub + Integrated merge / dedupe helpers.
 */

import {
  getCpiDedupKey,
  mergeCpiData,
} from '../../../../../src/pages/globalSearch/Cards/participant/cpiMergeUtils';

describe('cpiMergeUtils', () => {
  describe('getCpiDedupKey', () => {
    it('builds a key from associated_id and repository', () => {
      expect(getCpiDedupKey({
        associated_id: 'A1',
        repository_of_synonym_id: 'phs1',
      })).toBe('A1||phs1');
    });

    it('returns empty string for invalid rows', () => {
      expect(getCpiDedupKey(null)).toBe('');
      expect(getCpiDedupKey({})).toBe('');
    });
  });

  describe('mergeCpiData', () => {
    it('unions Hub and Integrated rows and dedupes on associated_id + repository', () => {
      const hub = [
        {
          associated_id: 'A1',
          repository_of_synonym_id: 'phs1',
          domain_description: 'Hub desc',
          data_location: 'https://hub.example',
        },
        {
          associated_id: 'A2',
          repository_of_synonym_id: 'phs2',
          domain_description: 'Hub only',
        },
      ];
      const integrated = [
        {
          associated_id: 'A1',
          repository_of_synonym_id: 'phs1',
          domain_description: 'Integrated desc',
          data_type: 'internal',
          p_id: 'pid-1',
        },
        {
          associated_id: 'A3',
          repository_of_synonym_id: 'phs3',
          domain_description: 'Integrated only',
          data_type: 'external',
        },
      ];

      const merged = mergeCpiData(hub, integrated);
      expect(merged).toHaveLength(3);

      const a1 = merged.find((row) => row.associated_id === 'A1');
      expect(a1.domain_description).toBe('Integrated desc');
      expect(a1.data_type).toBe('internal');
      expect(a1.p_id).toBe('pid-1');
      expect(a1.data_location).toBe('https://hub.example');

      expect(merged.some((row) => row.associated_id === 'A2')).toBe(true);
      expect(merged.some((row) => row.associated_id === 'A3')).toBe(true);
    });

    it('handles empty or invalid inputs', () => {
      expect(mergeCpiData(null, null)).toEqual([]);
      expect(mergeCpiData([{ associated_id: 'X', repository_of_synonym_id: 'Y' }], undefined))
        .toEqual([{ associated_id: 'X', repository_of_synonym_id: 'Y' }]);
    });
  });
});
