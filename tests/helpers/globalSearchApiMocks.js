/**
 * **`graphqlClient.query`** router for **`globalSearch`** operations — implements the portal “mock API”
 * layer for Phase 4 sitesearch tests (no network).
 *
 * Dispatches by **GraphQL document identity** (`query === SEARCH`, etc.), matching production `sitesearch.js`.
 * C3DC federation calls (`clientName: 'c3dcService'`) default to empty payloads unless overridden.
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
} from '../../src/bento/sitesearch';

import {
  C3DC_SEARCH_AUTOCOMPLETE,
  C3DC_SEARCH_PAGE_RESULTS,
  C3DC_SEARCH_PAGE_RESULT_PARTICIPANTS,
  C3DC_SEARCH_PAGE_RESULT_STUDIES,
  C3DC_SEARCH_PAGE_RESULT_SAMPLES,
  C3DC_SEARCH_PAGE_RESULT_FILES,
} from '../../src/pages/globalSearch/c3dcGlobalSearch';

import {
  globalSearchAutocompleteFixture,
  globalSearchCountsFixture,
  globalSearchParticipantRowsFixture,
  globalSearchStudyRowsFixture,
  globalSearchSampleRowsFixture,
  globalSearchFileRowsFixture,
  globalSearchModelRowsFixture,
} from '../fixtures/globalSearch/globalSearchApiResponses';

/**
 * Honor offset/first for pagination. When offset is 0 and the fixture is
 * shorter than `first`, pad unique rows so unique-merge fetches
 * (first = reported count) stay aligned with count fixtures.
 */
function pageRows(rows, variables, makePad) {
  const list = Array.isArray(rows) ? rows : [];
  const first = Math.max(0, Number(variables && variables.first) || list.length);
  const offset = Math.max(0, Number(variables && variables.offset) || 0);
  if (!first) {
    return [];
  }

  // Offset pages: tests usually stub only the current window's rows.
  if (offset > 0) {
    if (list.length > offset) {
      return list.slice(offset, offset + first);
    }
    return list.slice(0, first);
  }

  if (list.length >= first) {
    return list.slice(0, first);
  }
  if (typeof makePad !== 'function') {
    return list.slice(0, first);
  }

  const template = list[0] || {};
  const out = list.slice();
  for (let i = out.length; i < first; i += 1) {
    out.push(makePad(i, template));
  }
  return out;
}

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
  const c3dcAutocomplete = overrides.c3dcAutocomplete ?? {
    participants: [],
    studies: [],
    samples: [],
    files: [],
  };
  const c3dcCounts = overrides.c3dcCounts ?? {
    participant_count: 0,
    study_count: 0,
    sample_count: 0,
    file_count: 0,
  };
  const c3dcParticipants = overrides.c3dcParticipants ?? [];
  const c3dcStudies = overrides.c3dcStudies ?? [];
  const c3dcSamples = overrides.c3dcSamples ?? [];
  const c3dcFiles = overrides.c3dcFiles ?? [];
  const padToFirst = overrides.padToFirst !== false;

  return async ({ query, variables, context }) => {
    const clientName = context && context.clientName;
    const vars = variables || {};

    if (clientName === 'c3dcService' || query === C3DC_SEARCH_AUTOCOMPLETE
      || query === C3DC_SEARCH_PAGE_RESULTS
      || query === C3DC_SEARCH_PAGE_RESULT_PARTICIPANTS
      || query === C3DC_SEARCH_PAGE_RESULT_STUDIES
      || query === C3DC_SEARCH_PAGE_RESULT_SAMPLES
      || query === C3DC_SEARCH_PAGE_RESULT_FILES) {
      if (query === C3DC_SEARCH_AUTOCOMPLETE) {
        return { data: { globalSearch: c3dcAutocomplete } };
      }
      if (query === C3DC_SEARCH_PAGE_RESULTS) {
        return { data: { globalSearch: c3dcCounts } };
      }
      if (query === C3DC_SEARCH_PAGE_RESULT_PARTICIPANTS) {
        const rows = padToFirst
          ? pageRows(c3dcParticipants, vars, (i, t) => ({
            ...t,
            participant_id: `C3DC_PAD_${i}`,
            study_id: t.study_id || `c3dc-phs-pad-${i}`,
          }))
          : c3dcParticipants;
        return { data: { globalSearch: { participants: rows } } };
      }
      if (query === C3DC_SEARCH_PAGE_RESULT_STUDIES) {
        const rows = padToFirst
          ? pageRows(c3dcStudies, vars, (i, t) => ({
            ...t,
            study_id: `c3dc-pad-phs-${i}`,
          }))
          : c3dcStudies;
        return { data: { globalSearch: { studies: rows } } };
      }
      if (query === C3DC_SEARCH_PAGE_RESULT_SAMPLES) {
        const rows = padToFirst
          ? pageRows(c3dcSamples, vars, (i, t) => ({
            ...t,
            sample_id: `C3DC_SMP_PAD_${i}`,
          }))
          : c3dcSamples;
        return { data: { globalSearch: { samples: rows } } };
      }
      if (query === C3DC_SEARCH_PAGE_RESULT_FILES) {
        const rows = padToFirst
          ? pageRows(c3dcFiles, vars, (i, t) => ({
            ...t,
            id: `c3dc-file-pad-${i}`,
            file_name: `c3dc_pad_${i}.bam`,
          }))
          : c3dcFiles;
        return { data: { globalSearch: { files: rows } } };
      }
      return { data: { globalSearch: {} } };
    }

    if (query === SEARCH) {
      return { data: { globalSearch: autocomplete } };
    }
    if (query === SEARCH_PAGE_RESULTS) {
      return { data: { globalSearch: counts } };
    }
    if (query === SEARCH_PAGE_RESULT_PARTICIPANTS) {
      const rows = padToFirst
        ? pageRows(participants, vars, (i, t) => ({
          ...t,
          id: `hub-row-pad-${i}`,
          participant_id: `HUB_PAD_${i}`,
          study_id: t.study_id || `hub-phs-pad-${i}`,
        }))
        : participants;
      return { data: { globalSearch: { participants: rows } } };
    }
    if (query === SEARCH_PAGE_RESULT_STUDIES) {
      const rows = padToFirst
        ? pageRows(studies, vars, (i, t) => ({
          ...t,
          study_id: `hub-pad-phs-${i}`,
        }))
        : studies;
      return { data: { globalSearch: { studies: rows } } };
    }
    if (query === SEARCH_PAGE_RESULT_SAMPLES) {
      const rows = padToFirst
        ? pageRows(samples, vars, (i, t) => ({
          ...t,
          sample_id: `HUB_SMP_PAD_${i}`,
        }))
        : samples;
      return { data: { globalSearch: { samples: rows } } };
    }
    if (query === SEARCH_PAGE_RESULT_FILES) {
      const rows = padToFirst
        ? pageRows(files, vars, (i, t) => ({
          ...t,
          id: `hub-file-pad-${i}`,
          file_name: `hub_pad_${i}.bam`,
        }))
        : files;
      return { data: { globalSearch: { files: rows } } };
    }
    if (query === SEARCH_PAGE_RESULT_MODEL) {
      return { data: { globalSearch: { model } } };
    }

    throw new Error(
      `[globalSearchApiMocks] Unhandled query document — add a branch or fix the import.`,
    );
  };
}
