/**
 * Phase 4 — `src/bento/sitesearch.js`: global search GraphQL helpers vs **mock API** fixtures.
 *
 * **`createGlobalSearchClientQueryMock`** routes `graphqlClient.query` by GraphQL document (same as production)
 * and resolves **`tests/fixtures/globalSearch/globalSearchApiResponses.js`** — no live **`REACT_APP_BACKEND_API`** calls.
 *
 * @see src/bento/sitesearch.js
 * @see tests/helpers/globalSearchApiMocks.js
 */

jest.mock('../../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));

import client from '../../src/utils/graphqlClient';
import {
  getResultQueryByField,
  queryAutocompleteAPI,
  queryCountAPI,
  queryResultAPI,
  SEARCH,
  SEARCH_PAGE_RESULTS,
  SEARCH_PAGE_RESULT_PARTICIPANTS,
  SEARCH_PAGE_RESULT_FILES,
  SEARCH_PAGE_RESULT_STUDIES,
  SEARCH_PAGE_RESULT_MODEL,
} from '../../src/bento/sitesearch';
import { clearFederatedUniqueMergeCache } from '../../src/pages/globalSearch/federatedGlobalSearch';
import { searchAboutPages } from '../../src/pages/globalSearch/aboutFuseSearch';

import { createGlobalSearchClientQueryMock } from '../helpers/globalSearchApiMocks';
import {
  globalSearchAutocompleteFixture,
  globalSearchCountsFixture,
  globalSearchParticipantRowsFixture,
  globalSearchStudyRowsFixture,
} from '../fixtures/globalSearch/globalSearchApiResponses';

describe('sitesearch', () => {
  describe('getResultQueryByField', () => {
    it('should map known datafields to the correct gql document', () => {
      expect(getResultQueryByField('all')).toBe(SEARCH_PAGE_RESULT_PARTICIPANTS);
      expect(getResultQueryByField('participants')).toBe(SEARCH_PAGE_RESULT_PARTICIPANTS);
      expect(getResultQueryByField('studies')).toBe(SEARCH_PAGE_RESULT_STUDIES);
      expect(getResultQueryByField('samples')).toBeDefined();
      expect(getResultQueryByField('files')).toBeDefined();
      expect(getResultQueryByField('model')).toBe(SEARCH_PAGE_RESULT_MODEL);
      expect(getResultQueryByField('about_page')).toBeNull();
    });

    it('should fall back to model query for unknown fields', () => {
      expect(getResultQueryByField('unknown_tab')).toBe(SEARCH_PAGE_RESULT_MODEL);
    });
  });

  describe('mock globalSearch API (fixtures + graphqlClient.router)', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      clearFederatedUniqueMergeCache();
      client.query.mockImplementation(createGlobalSearchClientQueryMock());
    });

    describe('queryAutocompleteAPI', () => {
      it('should call SEARCH and return autocomplete fixture payload', async () => {
        const result = await queryAutocompleteAPI('neuro');

        expect(client.query).toHaveBeenCalledWith(expect.objectContaining({
          query: SEARCH,
          variables: { input: 'neuro' },
          context: { clientName: '' },
        }));
        expect(result.participants).toEqual(
          expect.arrayContaining(globalSearchAutocompleteFixture.participants.map((row) => (
            expect.objectContaining(row)
          ))),
        );
        expect(result.model).toEqual(globalSearchAutocompleteFixture.model);
      });
    });

    describe('queryCountAPI', () => {
      it('should call SEARCH_PAGE_RESULTS and return entity counts with Fuse about_count', async () => {
        const result = await queryCountAPI('glioma');
        const fuseAbout = searchAboutPages('glioma', { first: 10000, offset: 0 });

        expect(client.query).toHaveBeenCalledWith(expect.objectContaining({
          query: SEARCH_PAGE_RESULTS,
          variables: { input: 'glioma' },
          context: { clientName: '' },
        }));
        expect(result).toEqual({
          ...globalSearchCountsFixture,
          about_count: fuseAbout.about_count,
        });
      });

      it('should sum Hub and C3DC federated entity counts', async () => {
        client.query.mockImplementation(createGlobalSearchClientQueryMock({
          c3dcCounts: {
            participant_count: 5,
            study_count: 1,
            sample_count: 2,
            file_count: 3,
          },
        }));

        const result = await queryCountAPI('glioma');
        const fuseAbout = searchAboutPages('glioma', { first: 10000, offset: 0 });
        expect(result.participant_count).toBe(globalSearchCountsFixture.participant_count + 5);
        expect(result.study_count).toBe(globalSearchCountsFixture.study_count + 1);
        expect(result.model_count).toBe(globalSearchCountsFixture.model_count);
        expect(result.about_count).toBe(fuseAbout.about_count);
      });

      it('should dedupe overlapping Hub and C3DC study counts', async () => {
        client.query.mockImplementation(createGlobalSearchClientQueryMock({
          counts: {
            ...globalSearchCountsFixture,
            study_count: 1,
          },
          studies: [{
            study_id: 'phs002599',
            study_name: 'Hub Study',
            study_status: 'Completed',
          }],
          c3dcCounts: {
            participant_count: 0,
            study_count: 1,
            sample_count: 0,
            file_count: 0,
          },
          c3dcStudies: [{
            study_id: 'phs002599',
            study_name: 'C3DC Study',
            study_phase: 'Completed',
          }],
        }));

        const result = await queryCountAPI('phs002599');
        expect(result.study_count).toBe(1);
      });

      it('should dedupe overlapping participant, sample, and file counts', async () => {
        client.query.mockImplementation(createGlobalSearchClientQueryMock({
          counts: {
            ...globalSearchCountsFixture,
            participant_count: 1,
            sample_count: 1,
            file_count: 1,
            study_count: 0,
          },
          participants: [{ participant_id: 'P1', study_id: 'phs002599' }],
          samples: [{ sample_id: 'S1', participant_id: 'P1', study_id: 'phs002599' }],
          files: [{
            id: 'hub-file',
            file_name: 'wgs.bam',
            study_id: 'phs002599',
            participant_id: 'P1',
            sample_id: 'S1',
          }],
          c3dcCounts: {
            participant_count: 1,
            study_count: 0,
            sample_count: 1,
            file_count: 1,
          },
          c3dcParticipants: [{ participant_id: 'P1', study_id: 'phs002599' }],
          c3dcSamples: [{ sample_id: 'S1', participant_id: 'P1', study_id: 'phs002599' }],
          c3dcFiles: [{
            id: 'c3dc-file',
            file_name: 'wgs.bam',
            study_id: 'phs002599',
            participant_id: 'P1',
            sample_id: 'S1',
          }],
        }));

        const result = await queryCountAPI('phs002599');
        expect(result.participant_count).toBe(1);
        expect(result.sample_count).toBe(1);
        expect(result.file_count).toBe(1);
      });
    });

    describe('queryResultAPI', () => {
      it('should call the field-specific query and return nested rows from fixtures', async () => {
        const result = await queryResultAPI('participants', {
          input: 'test',
          first: 10,
          offset: 0,
        });

        expect(client.query).toHaveBeenCalledWith(expect.objectContaining({
          query: SEARCH_PAGE_RESULT_PARTICIPANTS,
          variables: { input: 'test', first: 10, offset: 0 },
          context: { clientName: '' },
        }));
        expect(result).toEqual(
          expect.arrayContaining([
            expect.objectContaining(globalSearchParticipantRowsFixture[0]),
          ]),
        );
      });

      it('should return studies rows when datafield is studies', async () => {
        const result = await queryResultAPI('studies', {
          input: 'cx',
          first: 5,
          offset: 0,
        });
        expect(result).toEqual(
          expect.arrayContaining([
            expect.objectContaining(globalSearchStudyRowsFixture[0]),
          ]),
        );
      });

      it('should return Fuse about_page rows without calling GraphQL about query', async () => {
        client.query.mockClear();
        const result = await queryResultAPI('about_page', {
          input: 'cancer',
          first: 10,
          offset: 0,
        });
        const fuse = searchAboutPages('cancer', { first: 10, offset: 0 });

        expect(result).toEqual(fuse.about_page);
        expect(result.length).toBeGreaterThan(0);
        expect(client.query).not.toHaveBeenCalled();
      });

      it('should merge and dedupe Hub + C3DC participant rows', async () => {
        client.query.mockImplementation(createGlobalSearchClientQueryMock({
          counts: {
            ...globalSearchCountsFixture,
            participant_count: 1,
          },
          c3dcCounts: {
            participant_count: 1,
            study_count: 0,
            sample_count: 0,
            file_count: 0,
          },
          c3dcParticipants: [
            {
              participant_id: 'C3DC_ONLY',
              study_id: 'phs999',
              diagnosis_str: 'C3DC only',
            },
          ],
        }));

        // Both sides have hits and total is small → unique merge (Hub + C3DC-only).
        const page = await queryResultAPI('participants', {
          input: 'test',
          first: 10,
          offset: 0,
        });
        expect(page).toEqual(
          expect.arrayContaining([
            expect.objectContaining(globalSearchParticipantRowsFixture[0]),
            expect.objectContaining({ participant_id: 'C3DC_ONLY' }),
          ]),
        );
        expect(page).toHaveLength(2);
      });

      it('should return one study card when Hub and C3DC share the same study_id', async () => {
        client.query.mockImplementation(createGlobalSearchClientQueryMock({
          counts: {
            ...globalSearchCountsFixture,
            study_count: 1,
          },
          studies: [{
            study_id: 'phs002599',
            study_name: 'Hub name',
            study_status: 'Completed',
            num_of_participants: 104,
          }],
          c3dcCounts: {
            participant_count: 0,
            study_count: 1,
            sample_count: 0,
            file_count: 0,
          },
          c3dcStudies: [{
            study_id: 'phs002599',
            study_name: 'C3DC name',
            study_phase: 'Completed',
            num_of_participants: 104,
          }],
        }));

        const result = await queryResultAPI('studies', {
          input: 'phs002599',
          first: 10,
          offset: 0,
        });

        expect(result).toHaveLength(1);
        expect(result[0].study_id).toBe('phs002599');
        expect(result[0].data_source).toBe('both');
      });

      it.each([
        ['participants', {
          counts: { participant_count: 1 },
          c3dcCounts: { participant_count: 1, study_count: 0, sample_count: 0, file_count: 0 },
          hubRowsKey: 'participants',
          hubRows: [{ participant_id: 'P1', study_id: 'phs002599', diagnosis_str: 'Hub' }],
          c3dcRowsKey: 'c3dcParticipants',
          c3dcRows: [{ participant_id: 'P1', study_id: 'phs002599', diagnosis_str: 'C3DC' }],
          match: (row) => row.participant_id === 'P1',
        }],
        ['samples', {
          counts: { sample_count: 1 },
          c3dcCounts: { participant_count: 0, study_count: 0, sample_count: 1, file_count: 0 },
          hubRowsKey: 'samples',
          hubRows: [{ sample_id: 'S1', participant_id: 'P1', study_id: 'phs002599' }],
          c3dcRowsKey: 'c3dcSamples',
          c3dcRows: [{
            sample_id: 'S1',
            participant_id: 'P1',
            study_id: 'phs002599',
            tumor_spatial_extent: 'Primary',
          }],
          match: (row) => row.sample_id === 'S1',
        }],
        ['files', {
          counts: { file_count: 1 },
          c3dcCounts: { participant_count: 0, study_count: 0, sample_count: 0, file_count: 1 },
          hubRowsKey: 'files',
          hubRows: [{
            id: 'hub-doc',
            file_name: 'wgs.bam',
            study_id: 'phs002599',
            participant_id: 'P1',
            sample_id: 'S1',
          }],
          c3dcRowsKey: 'c3dcFiles',
          c3dcRows: [{
            id: 'c3dc-doc',
            file_name: 'wgs.bam',
            study_id: 'phs002599',
            participant_id: 'P1',
            sample_id: 'S1',
          }],
          match: (row) => row.file_name === 'wgs.bam',
        }],
      ])('should return one %s card when Hub and C3DC share the same entity', async (field, fixture) => {
        client.query.mockImplementation(createGlobalSearchClientQueryMock({
          counts: {
            ...globalSearchCountsFixture,
            ...fixture.counts,
          },
          [fixture.hubRowsKey]: fixture.hubRows,
          c3dcCounts: fixture.c3dcCounts,
          [fixture.c3dcRowsKey]: fixture.c3dcRows,
        }));

        const result = await queryResultAPI(field, {
          input: 'phs002599',
          first: 10,
          offset: 0,
        });

        expect(result).toHaveLength(1);
        expect(fixture.match(result[0])).toBe(true);
        expect(result[0].data_source).toBe('both');
      });

      it('should straddle Hub end into C3DC so trailing pages are not empty', async () => {
        // Combined counts above unique-merge threshold → Hub-then-C3DC concat.
        client.query.mockImplementation(createGlobalSearchClientQueryMock({
          counts: {
            ...globalSearchCountsFixture,
            study_count: 42,
          },
          studies: Array.from({ length: 2 }, (_, i) => ({
            study_id: `hub-phs-${40 + i}`,
            study_name: `Hub Study ${40 + i}`,
          })),
          c3dcCounts: {
            participant_count: 0,
            study_count: 2500,
            sample_count: 0,
            file_count: 0,
          },
          c3dcStudies: Array.from({ length: 8 }, (_, i) => ({
            study_id: `c3dc-phs-${i}`,
            study_name: `C3DC Study ${i}`,
            study_phase: 'Completed',
          })),
        }));

        const result = await queryResultAPI('studies', {
          input: 'phs',
          first: 10,
          offset: 40,
        });

        expect(result).toHaveLength(10);
        expect(result.slice(0, 2).every((row) => String(row.study_id).startsWith('hub-'))).toBe(true);
        expect(result.slice(2).every((row) => String(row.study_id).startsWith('c3dc-'))).toBe(true);
      });

      it('should return empty array when globalSearch omits the requested tab field', async () => {
        const defaultRouter = createGlobalSearchClientQueryMock();
        client.query.mockImplementation(async (args) => {
          if (args.query === SEARCH_PAGE_RESULT_FILES) {
            return {
              data: {
                globalSearch: {
                  participants: [],
                },
              },
            };
          }
          return defaultRouter(args);
        });

        const result = await queryResultAPI('files', {
          input: 'q',
          first: 5,
          offset: 0,
        });

        expect(result).toEqual([]);
      });
    });
  });

  describe('graphql errors', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      clearFederatedUniqueMergeCache();
    });

    it('queryAutocompleteAPI should return empty buckets when the endpoint rejects', async () => {
      client.query.mockRejectedValue(new Error('network'));

      const result = await queryAutocompleteAPI('x');
      expect(result.participants).toEqual([]);
      expect(result.studies).toEqual([]);
    });

    it('queryCountAPI should return zeroed federated counts when the endpoint rejects', async () => {
      client.query.mockRejectedValue(new Error('network'));
      const fuseAbout = searchAboutPages('x', { first: 10000, offset: 0 });

      await expect(queryCountAPI('x')).resolves.toEqual({
        participant_count: 0,
        study_count: 0,
        sample_count: 0,
        file_count: 0,
        about_count: fuseAbout.about_count,
      });
    });

    it('queryResultAPI should return [] when the endpoint rejects', async () => {
      client.query.mockRejectedValue(new Error('network'));

      await expect(
        queryResultAPI('participants', { input: 'x', first: 1, offset: 0 }),
      ).resolves.toEqual([]);
    });

    it('queryResultAPI about_page should still work when GraphQL rejects', async () => {
      client.query.mockRejectedValue(new Error('network'));
      const result = await queryResultAPI('about_page', {
        input: 'cancer',
        first: 5,
        offset: 0,
      });
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toEqual(expect.objectContaining({
        page: expect.any(String),
        title: expect.any(String),
        text: expect.any(Array),
      }));
    });
  });
});
