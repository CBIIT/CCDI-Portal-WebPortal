/**
 * Unit tests for Hub + C3DC globalSearch merge / dedupe helpers.
 */

import {
  getGlobalSearchDedupKey,
  mergeGlobalSearchAutocomplete,
  mergeGlobalSearchCounts,
  mergeGlobalSearchRows,
  normalizeC3dcGlobalSearchRow,
  planFederatedPage,
} from '../../../src/pages/globalSearch/globalSearchMergeUtils';

describe('globalSearchMergeUtils', () => {
  describe('getGlobalSearchDedupKey', () => {
    it('builds participant keys from participant_id + study_id', () => {
      expect(getGlobalSearchDedupKey('participants', {
        participant_id: 'P1',
        study_id: 'phs1',
      })).toBe('P1||phs1');
    });

    it('builds study keys from study_id', () => {
      expect(getGlobalSearchDedupKey('studies', { study_id: 'phs1' })).toBe('phs1');
    });

    it('builds sample keys from sample_id + participant_id + study_id', () => {
      expect(getGlobalSearchDedupKey('samples', {
        sample_id: 'S1',
        participant_id: 'P1',
        study_id: 'phs1',
      })).toBe('S1||P1||phs1');
    });

    it('builds file keys from business fields, not document id', () => {
      expect(getGlobalSearchDedupKey('files', {
        id: 'hub-doc-1',
        file_name: 'wgs.bam',
        study_id: 'phs1',
        participant_id: 'P1',
        sample_id: 'S1',
      })).toBe('wgs.bam||phs1||P1||S1');
    });

    it('prefers file_id when present for file keys', () => {
      expect(getGlobalSearchDedupKey('files', {
        id: 'hub-doc-1',
        file_id: 'dg.4DFC/abc',
        file_name: 'wgs.bam',
        study_id: 'phs1',
      })).toBe('dg.4DFC/abc');
    });

    it('normalizes array participant_id values on file keys', () => {
      expect(getGlobalSearchDedupKey('files', {
        file_name: 'a.bam',
        study_id: 'phs1',
        participant_id: ['P2', 'P1'],
        sample_id: 'S1',
      })).toBe('a.bam||phs1||P1,P2||S1');
    });

    it('returns empty string for invalid rows', () => {
      expect(getGlobalSearchDedupKey('participants', null)).toBe('');
      expect(getGlobalSearchDedupKey('files', {})).toBe('');
    });
  });

  describe('normalizeC3dcGlobalSearchRow', () => {
    it('maps study_phase to study_status for Hub cards', () => {
      expect(normalizeC3dcGlobalSearchRow('studies', {
        study_id: 'phs1',
        study_phase: 'Active',
      })).toEqual({
        study_id: 'phs1',
        study_phase: 'Active',
        study_status: 'Active',
      });
    });

    it('maps tumor_spatial_extent to tumor_classification for Hub cards', () => {
      expect(normalizeC3dcGlobalSearchRow('samples', {
        sample_id: 'S1',
        tumor_spatial_extent: 'Primary',
      }).tumor_classification).toBe('Primary');
    });
  });

  describe('mergeGlobalSearchRows', () => {
    it('unions Hub and C3DC participants and dedupes on participant_id + study_id', () => {
      const hub = [
        {
          participant_id: 'P1',
          study_id: 'phs1',
          diagnosis_str: 'Hub dx',
          sex_at_birth: 'Female',
        },
        {
          participant_id: 'P2',
          study_id: 'phs2',
          diagnosis_str: 'Hub only',
        },
      ];
      const c3dc = [
        {
          participant_id: 'P1',
          study_id: 'phs1',
          diagnosis_str: 'C3DC dx',
          race_str: 'Asian',
        },
        {
          participant_id: 'P3',
          study_id: 'phs3',
          diagnosis_str: 'C3DC only',
        },
      ];

      const merged = mergeGlobalSearchRows('participants', hub, c3dc);
      expect(merged).toHaveLength(3);

      const p1 = merged.find((row) => row.participant_id === 'P1');
      expect(p1.diagnosis_str).toBe('C3DC dx');
      expect(p1.sex_at_birth).toBe('Female');
      expect(p1.race_str).toBe('Asian');
      expect(p1.data_source).toBe('both');

      expect(merged.some((row) => row.participant_id === 'P2')).toBe(true);
      expect(merged.some((row) => row.participant_id === 'P3')).toBe(true);
    });

    it('merges nested cpi_data when mergeCpiData is provided', () => {
      const mergeCpiData = jest.fn((hubCpi, c3dcCpi) => [...hubCpi, ...c3dcCpi]);
      const hub = [{
        participant_id: 'P1',
        study_id: 'phs1',
        cpi_data: [{ associated_id: 'A1', repository_of_synonym_id: 'phs1' }],
      }];
      const c3dc = [{
        participant_id: 'P1',
        study_id: 'phs1',
        cpi_data: [{ associated_id: 'A2', repository_of_synonym_id: 'phs1' }],
      }];

      const merged = mergeGlobalSearchRows('participants', hub, c3dc, { mergeCpiData });
      expect(mergeCpiData).toHaveBeenCalled();
      expect(merged[0].cpi_data).toHaveLength(2);
    });

    it('dedupes samples on sample_id + participant_id + study_id', () => {
      const merged = mergeGlobalSearchRows(
        'samples',
        [{
          sample_id: 'S1',
          participant_id: 'P1',
          study_id: 'phs1',
          tumor_classification: 'Hub',
        }],
        [{
          sample_id: 'S1',
          participant_id: 'P1',
          study_id: 'phs1',
          tumor_spatial_extent: 'Primary',
        }],
      );
      expect(merged).toHaveLength(1);
      expect(merged[0].tumor_classification).toBe('Primary');
      expect(merged[0].data_source).toBe('both');
    });

    it('dedupes files across different document ids with the same business key', () => {
      const merged = mergeGlobalSearchRows(
        'files',
        [{
          id: 'hub-uuid',
          file_name: 'wgs.bam',
          study_id: 'phs1',
          participant_id: 'P1',
          sample_id: 'S1',
          file_type: 'bam',
        }],
        [{
          id: 'c3dc-uuid',
          file_name: 'wgs.bam',
          study_id: 'phs1',
          participant_id: 'P1',
          sample_id: 'S1',
          file_description: 'WGS',
        }],
      );
      expect(merged).toHaveLength(1);
      expect(merged[0].file_type).toBe('bam');
      expect(merged[0].file_description).toBe('WGS');
      expect(merged[0].data_source).toBe('both');
    });
  });

  describe('mergeGlobalSearchCounts', () => {
    it('sums federated entity counts and keeps Hub model/about counts', () => {
      const merged = mergeGlobalSearchCounts(
        {
          participant_count: 10,
          study_count: 2,
          sample_count: 5,
          file_count: 7,
          model_count: 3,
          about_count: 1,
        },
        {
          participant_count: 4,
          study_count: 1,
          sample_count: 2,
          file_count: 3,
        },
      );

      expect(merged).toEqual({
        participant_count: 14,
        study_count: 3,
        sample_count: 7,
        file_count: 10,
        model_count: 3,
        about_count: 1,
      });
    });
  });

  describe('planFederatedPage', () => {
    it('serves Hub-only pages before Hub is exhausted', () => {
      expect(planFederatedPage({ hubCount: 42, offset: 0, pageSize: 10 })).toEqual({
        mode: 'hub',
        hub: { offset: 0, first: 10 },
        c3dc: null,
      });
    });

    it('straddles Hub end into the start of C3DC', () => {
      expect(planFederatedPage({ hubCount: 42, offset: 40, pageSize: 10 })).toEqual({
        mode: 'straddle',
        hub: { offset: 40, first: 2 },
        c3dc: { offset: 0, first: 8 },
      });
    });

    it('serves C3DC-only pages after Hub is exhausted', () => {
      expect(planFederatedPage({ hubCount: 42, offset: 80, pageSize: 10 })).toEqual({
        mode: 'c3dc',
        hub: null,
        c3dc: { offset: 38, first: 10 },
      });
    });
  });

  describe('mergeGlobalSearchAutocomplete', () => {
    it('merges federated autocomplete buckets', () => {
      const merged = mergeGlobalSearchAutocomplete(
        {
          participants: [{ participant_id: 'P1', study_id: 'phs1' }],
          model: [{ node: 'Participant' }],
        },
        {
          participants: [{ participant_id: 'P2', study_id: 'phs2' }],
        },
      );

      expect(merged.participants).toHaveLength(2);
      expect(merged.model).toEqual([{ node: 'Participant' }]);
    });
  });
});
