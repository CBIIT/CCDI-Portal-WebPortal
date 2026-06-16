/**
 * **`graphqlClient.query`** router for **`globalSearch`** operations — implements the portal “mock API”
 * layer for Phase 4 sitesearch tests (no network).
 *
 * Dispatches by **GraphQL document identity** (`query === SEARCH`, etc.), matching production `sitesearch.js`.
 *
 * @see src/bento/sitesearch.js
 * @see tests/fixtures/globalSearch/globalSearchApiResponses.js
 */

import {
  SEARCH,
  SEARCH_PAGE_RESULTS,
  SEARCH_PAGE_RESULT_PARTICIPANTS,
  SEARCH_PAGE_RESULT_STUDIES,
  SEARCH_PAGE_RESULT_SAMPLES,
  SEARCH_PAGE_RESULT_FILES,
  SEARCH_PAGE_RESULT_MODEL,
  SEARCH_PAGE_RESULT_ABOUT,
} from '../../src/bento/sitesearch';

import {
  globalSearchAutocompleteFixture,
  globalSearchCountsFixture,
  globalSearchParticipantRowsFixture,
  globalSearchStudyRowsFixture,
  globalSearchSampleRowsFixture,
  globalSearchFileRowsFixture,
  globalSearchModelRowsFixture,
  globalSearchAboutRowsFixture,
} from '../fixtures/globalSearch/globalSearchApiResponses';

/**
 * Returns an async implementation suitable for **`client.query.mockImplementation(fn)`**.
 *
 * @param {object} [overrides] — optional fixture overrides keyed like the exports from **`globalSearchApiResponses.js`**
 * @returns {(args: { query: object, variables: object, context?: object }) => Promise<{ data: object }>}
 */
export function createGlobalSearchClientQueryMock(overrides = {}) {
  const autocomplete = overrides.autocomplete ?? globalSearchAutocompleteFixture;
  const counts = overrides.counts ?? globalSearchCountsFixture;
  const participants = overrides.participants ?? globalSearchParticipantRowsFixture;
  const studies = overrides.studies ?? globalSearchStudyRowsFixture;
  const samples = overrides.samples ?? globalSearchSampleRowsFixture;
  const files = overrides.files ?? globalSearchFileRowsFixture;
  const model = overrides.model ?? globalSearchModelRowsFixture;
  const about_page = overrides.about_page ?? globalSearchAboutRowsFixture;

  return async ({ query }) => {
    if (query === SEARCH) {
      return { data: { globalSearch: autocomplete } };
    }
    if (query === SEARCH_PAGE_RESULTS) {
      return { data: { globalSearch: counts } };
    }
    if (query === SEARCH_PAGE_RESULT_PARTICIPANTS) {
      return { data: { globalSearch: { participants } } };
    }
    if (query === SEARCH_PAGE_RESULT_STUDIES) {
      return { data: { globalSearch: { studies } } };
    }
    if (query === SEARCH_PAGE_RESULT_SAMPLES) {
      return { data: { globalSearch: { samples } } };
    }
    if (query === SEARCH_PAGE_RESULT_FILES) {
      return { data: { globalSearch: { files } } };
    }
    if (query === SEARCH_PAGE_RESULT_MODEL) {
      return { data: { globalSearch: { model } } };
    }
    if (query === SEARCH_PAGE_RESULT_ABOUT) {
      return { data: { globalSearch: { about_page } } };
    }

    throw new Error(
      `[globalSearchApiMocks] Unhandled query document — add a branch or fix the import.`,
    );
  };
}
