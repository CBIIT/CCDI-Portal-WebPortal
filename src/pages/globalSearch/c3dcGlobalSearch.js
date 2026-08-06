/**
 * C3DC Integrated GraphQL globalSearch helpers (frontend federation).
 * Uses Apollo `clientName: 'c3dcService'` — same pattern as CPI fetch.
 *
 * IMPORTANT — Integrated schema differs from Hub WebService:
 * - Studies: C3DC exposes `study_phase` (Hub uses `study_status`)
 * - Samples: C3DC exposes `tumor_spatial_extent` (Hub uses `tumor_classification`)
 * Query the C3DC names here; `normalizeC3dcGlobalSearchRow` maps them for Hub cards.
 * Field selections mirror CCDI-C3DC-Integrated-UI `src/bento/sitesearch.js`.
 */
import gql from 'graphql-tag';
import client from '../../utils/graphqlClient';

/** Counts only — Integrated schema field names. */
export const C3DC_SEARCH_PAGE_RESULTS = gql`
  query c3dcGlobalSearchCounts($input: String, $first: Int, $offset: Int) {
    globalSearch(input: $input, first: $first, offset: $offset) {
      participant_count
      study_count
      sample_count
      file_count
    }
  }
`;

export const C3DC_SEARCH_AUTOCOMPLETE = gql`
  query c3dcGlobalSearchAutocomplete($input: String) {
    globalSearch(input: $input) {
      participants {
        participant_id
        study_id
      }
      studies {
        study_id
      }
      samples {
        sample_id
        participant_id
        study_id
      }
      files {
        id
        file_name
        study_id
        participant_id
      }
    }
  }
`;

export const C3DC_SEARCH_PAGE_RESULT_PARTICIPANTS = gql`
  query c3dcGlobalSearchParticipants($input: String, $first: Int, $offset: Int) {
    globalSearch(input: $input, first: $first, offset: $offset) {
      participants {
        id
        participant_id
        study_id
        diagnosis_str
        age_at_diagnosis_str
        treatment_type_str
        sex_at_birth
        treatment_agent_str
        race_str
        last_known_survival_status_str
        diagnosis_category_str
        consent_codes
        cpi_data {
          associated_id
          repository_of_synonym_id
          domain_description
          domain_category
          data_location
          data_type
          p_id
        }
      }
    }
  }
`;

export const C3DC_SEARCH_PAGE_RESULT_STUDIES = gql`
  query c3dcGlobalSearchStudies($input: String, $first: Int, $offset: Int) {
    globalSearch(input: $input, first: $first, offset: $offset) {
      studies {
        study_id
        study_name
        study_phase
        num_of_participants
        num_of_samples
        num_of_files
        consent_codes
      }
    }
  }
`;

export const C3DC_SEARCH_PAGE_RESULT_SAMPLES = gql`
  query c3dcGlobalSearchSamples($input: String, $first: Int, $offset: Int) {
    globalSearch(input: $input, first: $first, offset: $offset) {
      samples {
        sample_id
        participant_id
        study_id
        sample_anatomic_site_str
        sample_tumor_status
        diagnosis_str
        tumor_spatial_extent
        diagnosis_category_str
      }
    }
  }
`;

export const C3DC_SEARCH_PAGE_RESULT_FILES = gql`
  query c3dcGlobalSearchFiles($input: String, $first: Int, $offset: Int) {
    globalSearch(input: $input, first: $first, offset: $offset) {
      files {
        id
        file_name
        data_category
        participant_id
        file_description
        study_id
        file_type
        sample_id
        file_size
      }
    }
  }
`;

export function getC3dcResultQueryByField(field) {
  switch (field) {
    case 'participants':
    case 'all':
      return C3DC_SEARCH_PAGE_RESULT_PARTICIPANTS;
    case 'studies':
      return C3DC_SEARCH_PAGE_RESULT_STUDIES;
    case 'samples':
      return C3DC_SEARCH_PAGE_RESULT_SAMPLES;
    case 'files':
      return C3DC_SEARCH_PAGE_RESULT_FILES;
    default:
      return null;
  }
}

const c3dcQueryContext = {
  clientName: 'c3dcService',
};

/**
 * Fetch C3DC globalSearch counts. Returns {} on failure so Hub search still works.
 */
export async function queryC3dcCountAPI(inputValue, apolloClient = client) {
  try {
    const result = await apolloClient.query({
      query: C3DC_SEARCH_PAGE_RESULTS,
      variables: { input: inputValue, first: 10, offset: 0 },
      context: c3dcQueryContext,
      fetchPolicy: 'network-only',
    });
    return (result && result.data && result.data.globalSearch) || {};
  } catch (e) {
    return {};
  }
}

/**
 * Fetch C3DC autocomplete buckets. Returns {} on failure.
 */
export async function queryC3dcAutocompleteAPI(inputValue, apolloClient = client) {
  try {
    const result = await apolloClient.query({
      query: C3DC_SEARCH_AUTOCOMPLETE,
      variables: { input: inputValue },
      context: c3dcQueryContext,
      fetchPolicy: 'network-only',
    });
    return (result && result.data && result.data.globalSearch) || {};
  } catch (e) {
    return {};
  }
}

/**
 * Fetch C3DC result rows for a federated datafield. Returns [] on failure / non-federated fields.
 */
export async function queryC3dcResultAPI(datafield, input, apolloClient = client) {
  const query = getC3dcResultQueryByField(datafield);
  if (!query) {
    return [];
  }
  try {
    const result = await apolloClient.query({
      query,
      variables: input,
      context: c3dcQueryContext,
      fetchPolicy: 'network-only',
    });
    const globalSearch = (result && result.data && result.data.globalSearch) || {};
    return globalSearch[datafield] || [];
  } catch (e) {
    return [];
  }
}
