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
  SEARCH_PAGE_RESULT_ABOUT,
} from '../../src/bento/sitesearch';

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
      expect(getResultQueryByField('model')).toBeDefined();
      expect(getResultQueryByField('about_page')).toBe(SEARCH_PAGE_RESULT_ABOUT);
    });

    it('should fall back to about-page query for unknown fields', () => {
      expect(getResultQueryByField('unknown_tab')).toBe(SEARCH_PAGE_RESULT_ABOUT);
    });
  });

  describe('mock globalSearch API (fixtures + graphqlClient.router)', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      client.query.mockImplementation(createGlobalSearchClientQueryMock());
    });

    describe('queryAutocompleteAPI', () => {
      it('should call SEARCH and return autocomplete fixture payload', async () => {
        const result = await queryAutocompleteAPI('neuro');

        expect(client.query).toHaveBeenCalledWith({
          query: SEARCH,
          variables: { input: 'neuro' },
          context: { clientName: '' },
        });
        expect(result).toEqual(globalSearchAutocompleteFixture);
      });
    });

    describe('queryCountAPI', () => {
      it('should call SEARCH_PAGE_RESULTS and return counts fixture', async () => {
        const result = await queryCountAPI('glioma');

        expect(client.query).toHaveBeenCalledWith({
          query: SEARCH_PAGE_RESULTS,
          variables: { input: 'glioma' },
          context: { clientName: '' },
        });
        expect(result).toEqual(globalSearchCountsFixture);
      });
    });

    describe('queryResultAPI', () => {
      it('should call the field-specific query and return nested rows from fixtures', async () => {
        const result = await queryResultAPI('participants', {
          input: 'test',
          first: 10,
          offset: 0,
        });

        expect(client.query).toHaveBeenCalledWith({
          query: SEARCH_PAGE_RESULT_PARTICIPANTS,
          variables: { input: 'test', first: 10, offset: 0 },
          context: { clientName: '' },
        });
        expect(result).toEqual(globalSearchParticipantRowsFixture);
      });

      it('should return studies rows when datafield is studies', async () => {
        const result = await queryResultAPI('studies', {
          input: 'cx',
          first: 5,
          offset: 0,
        });
        expect(result).toEqual(globalSearchStudyRowsFixture);
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
    });

    it('queryAutocompleteAPI should return [] when the endpoint rejects', async () => {
      client.query.mockRejectedValue(new Error('network'));

      await expect(queryAutocompleteAPI('x')).resolves.toEqual([]);
    });

    it('queryCountAPI should return undefined when the endpoint rejects', async () => {
      client.query.mockRejectedValue(new Error('network'));

      await expect(queryCountAPI('x')).resolves.toEqual(undefined);
    });

    it('queryResultAPI should return [] when the endpoint rejects', async () => {
      client.query.mockRejectedValue(new Error('network'));

      await expect(
        queryResultAPI('participants', { input: 'x', first: 1, offset: 0 }),
      ).resolves.toEqual([]);
    });
  });
});
