/**
 * Unit tests for Hub + C3DC unique-merge federation helpers.
 */

import {
  canUniqueMergeFederatedField,
  clearFederatedUniqueMergeCache,
  FEDERATED_UNIQUE_MERGE_MAX,
  fetchFederatedPage,
  loadUniqueFederatedRows,
  refineFederatedCounts,
} from '../../../src/pages/globalSearch/federatedGlobalSearch';

describe('federatedGlobalSearch', () => {
  beforeEach(() => {
    clearFederatedUniqueMergeCache();
  });

  describe('canUniqueMergeFederatedField', () => {
    it('requires both sides to have hits under the max', () => {
      expect(canUniqueMergeFederatedField(1, 1)).toBe(true);
      expect(canUniqueMergeFederatedField(1, 0)).toBe(false);
      expect(canUniqueMergeFederatedField(0, 5)).toBe(false);
      expect(canUniqueMergeFederatedField(FEDERATED_UNIQUE_MERGE_MAX, 1)).toBe(false);
    });
  });

  describe('refineFederatedCounts', () => {
    it('replaces summed study count with unique length when sets overlap', async () => {
      const hubRows = [{ study_id: 'phs002599', study_name: 'Hub' }];
      const c3dcRows = [{ study_id: 'phs002599', study_name: 'C3DC', study_phase: 'Completed' }];

      const refined = await refineFederatedCounts({
        hubCounts: { study_count: 1, participant_count: 0 },
        c3dcCounts: { study_count: 1, participant_count: 0 },
        searchInput: 'phs002599',
        fetchHubRows: jest.fn(async (field) => (field === 'studies' ? hubRows : [])),
        fetchC3dcRows: jest.fn(async (field) => (field === 'studies' ? c3dcRows : [])),
      });

      expect(refined.study_count).toBe(1);
    });

    it('dedupes overlapping participants, samples, and files counts', async () => {
      const hubByField = {
        participants: [{ participant_id: 'P1', study_id: 'phs1' }],
        samples: [{ sample_id: 'S1', participant_id: 'P1', study_id: 'phs1' }],
        files: [{
          id: 'hub-1',
          file_name: 'a.bam',
          study_id: 'phs1',
          participant_id: 'P1',
          sample_id: 'S1',
        }],
        studies: [],
      };
      const c3dcByField = {
        participants: [
          { participant_id: 'P1', study_id: 'phs1' },
          { participant_id: 'P2', study_id: 'phs1' },
        ],
        samples: [
          { sample_id: 'S1', participant_id: 'P1', study_id: 'phs1' },
          { sample_id: 'S2', participant_id: 'P1', study_id: 'phs1' },
        ],
        files: [
          {
            id: 'c3dc-1',
            file_name: 'a.bam',
            study_id: 'phs1',
            participant_id: 'P1',
            sample_id: 'S1',
          },
          {
            id: 'c3dc-2',
            file_name: 'b.bam',
            study_id: 'phs1',
            participant_id: 'P1',
            sample_id: 'S1',
          },
        ],
        studies: [],
      };

      const refined = await refineFederatedCounts({
        hubCounts: {
          participant_count: 1,
          sample_count: 1,
          file_count: 1,
          study_count: 0,
        },
        c3dcCounts: {
          participant_count: 2,
          sample_count: 2,
          file_count: 2,
          study_count: 0,
        },
        searchInput: 'phs1',
        fetchHubRows: jest.fn(async (field) => hubByField[field] || []),
        fetchC3dcRows: jest.fn(async (field) => c3dcByField[field] || []),
      });

      expect(refined.participant_count).toBe(2);
      expect(refined.sample_count).toBe(2);
      expect(refined.file_count).toBe(2);
    });
  });

  describe('fetchFederatedPage', () => {
    it('slices the unique merged list for small overlapping sets', async () => {
      const rows = await fetchFederatedPage({
        field: 'studies',
        searchInput: 'phs',
        pageSize: 10,
        offset: 0,
        hubCount: 1,
        c3dcCount: 1,
        fetchHubRows: jest.fn(async () => [{ study_id: 'phs1', study_name: 'A' }]),
        fetchC3dcRows: jest.fn(async () => [{ study_id: 'phs1', study_name: 'B', study_phase: 'Active' }]),
      });

      expect(rows).toHaveLength(1);
      expect(rows[0].study_id).toBe('phs1');
    });

    it.each([
      ['participants', {
        hub: [{ participant_id: 'P1', study_id: 'phs1', diagnosis_str: 'Hub' }],
        c3dc: [{ participant_id: 'P1', study_id: 'phs1', diagnosis_str: 'C3DC' }],
        id: (row) => row.participant_id,
      }],
      ['samples', {
        hub: [{ sample_id: 'S1', participant_id: 'P1', study_id: 'phs1' }],
        c3dc: [{ sample_id: 'S1', participant_id: 'P1', study_id: 'phs1', tumor_spatial_extent: 'Primary' }],
        id: (row) => row.sample_id,
      }],
      ['files', {
        hub: [{
          id: 'hub-doc',
          file_name: 'wgs.bam',
          study_id: 'phs1',
          participant_id: 'P1',
          sample_id: 'S1',
        }],
        c3dc: [{
          id: 'c3dc-doc',
          file_name: 'wgs.bam',
          study_id: 'phs1',
          participant_id: 'P1',
          sample_id: 'S1',
        }],
        id: (row) => row.file_name,
      }],
    ])('dedupes overlapping %s rows to a single card', async (field, fixture) => {
      const rows = await fetchFederatedPage({
        field,
        searchInput: 'phs1',
        pageSize: 10,
        offset: 0,
        hubCount: 1,
        c3dcCount: 1,
        fetchHubRows: jest.fn(async () => fixture.hub),
        fetchC3dcRows: jest.fn(async () => fixture.c3dc),
      });

      expect(rows).toHaveLength(1);
      expect(fixture.id(rows[0])).toBe(fixture.id(fixture.hub[0]));
      expect(rows[0].data_source).toBe('both');
    });

    it('caches unique merge results across calls', async () => {
      const fetchHubRows = jest.fn(async () => [{ study_id: 'phs1' }]);
      const fetchC3dcRows = jest.fn(async () => [{ study_id: 'phs2' }]);

      await loadUniqueFederatedRows({
        field: 'studies',
        searchInput: 'x',
        hubCount: 1,
        c3dcCount: 1,
        fetchHubRows,
        fetchC3dcRows,
      });
      await loadUniqueFederatedRows({
        field: 'studies',
        searchInput: 'x',
        hubCount: 1,
        c3dcCount: 1,
        fetchHubRows,
        fetchC3dcRows,
      });

      expect(fetchHubRows).toHaveBeenCalledTimes(1);
      expect(fetchC3dcRows).toHaveBeenCalledTimes(1);
    });
  });
});
