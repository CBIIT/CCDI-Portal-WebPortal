/**
 * **`graphqlClient.query`** router for **Cohort Analyzer** download queries (no network).
 *
 * Dispatches by **GraphQL document identity** (`args.query === GET_COHORT_MANIFEST_QUERY`, etc.).
 *
 * @see src/pages/CohortAnalyzer/downloadCohort/DownloadSelectedCohorts.js
 * @see src/bento/dashboardTabData.js
 */

import {
  GET_COHORT_MANIFEST_QUERY,
  GET_COHORT_METADATA_QUERY,
} from '../../src/bento/dashboardTabData';

import {
  cohortManifestCsvRowsFixture,
  cohortMetadataJsonFixture,
} from '../fixtures/cohortAnalyzer/cohortAnalyzerApiResponses';

/**
 * @param {object} [overrides]
 * @param {object[]} [overrides.cohortManifest] — rows for **`cohortManifest`**
 * @param {object} [overrides.cohortMetadata] — payload for **`cohortMetadata`**
 * @returns {(args: { query: object, variables?: object }) => Promise<{ data: object }>}
 */
export function createCohortDownloadClientQueryMock(overrides = {}) {
  const manifest = overrides.cohortManifest ?? cohortManifestCsvRowsFixture;
  const metadata = overrides.cohortMetadata ?? cohortMetadataJsonFixture;

  return async (args) => {
    if (args.query === GET_COHORT_MANIFEST_QUERY) {
      return { data: { cohortManifest: manifest } };
    }
    if (args.query === GET_COHORT_METADATA_QUERY) {
      return { data: { cohortMetadata: metadata } };
    }
    return { data: {} };
  };
}
