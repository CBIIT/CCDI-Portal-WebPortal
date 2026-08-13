import {
  GLOBAL_SEARCH_ENTITY_FIELDS,
  GLOBAL_SEARCH_COUNT_FIELDS,
  mergeGlobalSearchAutocomplete,
} from '../pages/globalSearch/globalSearchMergeUtils';
import {
  fetchFederatedPage,
  refineFederatedCounts,
} from '../pages/globalSearch/federatedGlobalSearch';
import {
  ensureAboutSearchCorpusLoaded,
  searchAboutAutocomplete,
  searchAboutPages,
} from '../pages/globalSearch/aboutFuseSearch';
import { mergeCpiData } from '../pages/globalSearch/Cards/participant/cpiMergeUtils';
import {
  queryC3dcAutocompleteAPI,
  queryC3dcCountAPI,
  queryC3dcResultAPI,
} from '../pages/globalSearch/c3dcGlobalSearch';
import client from '../utils/graphqlClient';
import gql from 'graphql-tag';

/**
 * Maps a datafield to the correct Hub GraphQL search query.
 * About is Fuse.js (FE corpus) — returns null (no OpenSearch/GraphQL).
 *
 * @param {string} field datatable field name
 */
export function getResultQueryByField(field) {
    switch (field) {
      case 'all':
        return SEARCH_PAGE_RESULT_PARTICIPANTS;
      case 'participants':
        return SEARCH_PAGE_RESULT_PARTICIPANTS;
      case 'studies':
        return SEARCH_PAGE_RESULT_STUDIES;
      case 'samples':
        return SEARCH_PAGE_RESULT_SAMPLES;
      case 'files':
        return SEARCH_PAGE_RESULT_FILES;
      case 'model':
        return SEARCH_PAGE_RESULT_MODEL;
      case 'about_page':
        return null;
      default:
        return SEARCH_PAGE_RESULT_MODEL;
    }
  }

const isFederatedGlobalSearchField = (field) => GLOBAL_SEARCH_ENTITY_FIELDS.includes(field);

// --------------- Icons configuration --------------
// Ideal size for programListingIcon is 100x100 px
// Ideal size for externalLinkIcon is 16x16 px
export const programListingIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programIcon.svg',
  alt: 'Bento program logo',
};

export const SEARCH_KEYS = {
    public: [],
    private: ['gs_list'],
  };
  
  export const SEARCH_DATAFIELDS = {
    public: [],
    private: ['autocomplete_list'],
  };
  
  /** used by the Global Search page results */
  export const SEARCH_PAGE_KEYS = {
    private: [...SEARCH_KEYS.private, 'model_search'],
    public: [],
  };

export const SEARCH_PAGE_DATAFIELDS = {
    public: [],
    private: [...SEARCH_DATAFIELDS.private, 'node'],
  };

/** Public search queries */
export const SEARCH_PUBLIC = gql`
    query publicGlobalSearchQuery($input: String) {
        globalSearch(input: $input) {
            participant_count
        }
    }
`;

// AutoComplete main Query (About is Fuse.js — not requested from Hub OpenSearch)
export const SEARCH = gql`
  query globalSearch($input: String){
    globalSearch(input: $input) {
      participants {
        participant_id
      }
      studies {
        study_id
      }
      samples {
        sample_id
      }
      files {
        file_name
      }
      model {
        node
      }
    }
  }
`;

export const SEARCH_PAGE_RESULTS_PUBLIC = gql`
    query globalSearch($input: String, $first: Int, $offset: Int){
        globalSearch(
            input: $input
            first: $first
            offset: $offset
        ) {
            participant_count
            study_count
            sample_count
            file_count
            model_count
        }
    }
`;

export const SEARCH_PAGE_RESULT_PARTICIPANTS = gql`
  query globalSearch($input: String, $first: Int, $offset: Int){
    globalSearch(
      input: $input
      first: $first
      offset: $offset
    ) {
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

export const SEARCH_PAGE_RESULT_STUDIES = gql`
  query globalSearch($input: String, $first: Int, $offset: Int){
    globalSearch(
      input: $input
      first: $first
      offset: $offset
    ) {
      studies {
        study_id
        study_name
        study_status
        num_of_participants
        num_of_samples
        num_of_files
        consent_codes
      }
    }
  }
`;

export const SEARCH_PAGE_RESULT_SAMPLES = gql`
  query globalSearch($input: String, $first: Int, $offset: Int){
    globalSearch(
      input: $input
      first: $first
      offset: $offset
    ) {
      samples {
        sample_id
        participant_id
        study_id
        sample_anatomic_site_str
        sample_tumor_status
        diagnosis_str
        tumor_classification
        diagnosis_category_str
      }
    }
  }
`;

export const SEARCH_PAGE_RESULT_FILES = gql`
  query globalSearch($input: String, $first: Int, $offset: Int){
    globalSearch(
      input: $input
      first: $first
      offset: $offset
    ) {
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

export const SEARCH_PAGE_RESULT_MODEL = gql`
    query globalSearch($input: String, $first: Int, $offset: Int){
        globalSearch(
            input: $input
            first: $first
            offset: $offset
        ) {
            model {
                node
                property
                property_description
                property_required
                property_type
                value
                highlight
                category_type
            }
        }
    }
`;

/** Hub counts only — About counts come from Fuse.js (FE), not OpenSearch. */
export const SEARCH_PAGE_RESULTS = gql`
  query globalSearch($input: String, $first: Int, $offset: Int){
    globalSearch(
      input: $input
      first: $first
      offset: $offset
    ) {
        participant_count
        study_count
        sample_count
        file_count
        model_count
    }
  }
`;

export async function queryAutocompleteAPI(inputValue) {
    const [hubData, c3dcData] = await Promise.all([
      client.query({
        query: SEARCH,
        variables: {
          input: inputValue,
        },
        context: {
          clientName: '',
        },
      })
        .then((result) => (result.data.globalSearch))
        .catch(() => ({})),
      queryC3dcAutocompleteAPI(inputValue),
    ]);

    const base = (!hubData || Array.isArray(hubData))
      ? mergeGlobalSearchAutocomplete({}, c3dcData, { mergeCpiData })
      : mergeGlobalSearchAutocomplete(hubData, c3dcData, { mergeCpiData });

    // About autocomplete is Fuse.js over static aboutSearchContent.md.
    await ensureAboutSearchCorpusLoaded();
    return {
      ...base,
      about_page: searchAboutAutocomplete(inputValue),
    };
  }


/**
 * Query Hub + C3DC for search result counts by search string.
 * Federated entity counts are summed, then refined to unique lengths when
 * both sides have hits and the combined set is small enough to full-merge.
 * About counts come from Fuse.js (FE corpus), not OpenSearch.
 *
 * @param {string} inputValue search text
 */
export async function queryCountAPI(inputValue) {
    const [hubData, c3dcData] = await Promise.all([
      client.query({
        query: SEARCH_PAGE_RESULTS,
        variables: {
          input: inputValue,
        },
        context: {
          clientName: '',
        },
      })
        .then((result) => result.data.globalSearch)
        .catch(() => null),
      queryC3dcCountAPI(inputValue),
    ]);

    const hubCounts = hubData || {};
    const c3dcCounts = c3dcData || {};

    const merged = await refineFederatedCounts({
      hubCounts,
      c3dcCounts,
      searchInput: inputValue,
      fetchHubRows: async (field, variables) => {
        const query = getResultQueryByField(field);
        if (!query) {
          return [];
        }
        const data = await client.query({
          query,
          variables,
          context: { clientName: '' },
        })
          .then((result) => result.data.globalSearch)
          .catch(() => ({}));
        return (data && data[field]) || [];
      },
      fetchC3dcRows: (field, variables) => queryC3dcResultAPI(field, variables),
      mergeOptions: { mergeCpiData },
    });

    await ensureAboutSearchCorpusLoaded();
    const about = searchAboutPages(inputValue, { first: 10000, offset: 0 });
    return {
      ...merged,
      about_count: about.about_count,
    };
  }
  
  /**
   * Query Hub (+ C3DC when federated) for search results by datafield.
   *
   * About tab uses Fuse.js over the FE static corpus (no GraphQL / OpenSearch).
   * When both Hub and C3DC have hits and the combined set is small, full-fetch
   * and dedupe (fixes shared study_ids counted twice). Otherwise Hub-then-C3DC
   * concatenation keeps large catalogs paginated.
   *
   * @param {string} datafield
   * @param {object} input search query variable input
   */
  export async function queryResultAPI(datafield, input) {
    if (datafield === 'about_page') {
      await ensureAboutSearchCorpusLoaded();
      const about = searchAboutPages(input.input, {
        first: input.first,
        offset: input.offset,
      });
      return about.about_page;
    }

    const fetchHubRows = async (variables) => {
      const query = getResultQueryByField(datafield);
      if (!query) {
        return [];
      }
      const data = await client.query({
        query,
        variables,
        context: {
          clientName: '',
        },
      })
        .then((result) => (result.data.globalSearch))
        .catch(() => ({}));
      return (data && data[datafield]) || [];
    };

    if (!isFederatedGlobalSearchField(datafield)) {
      return fetchHubRows(input);
    }

    const pageSize = Number(input.first) || 10;
    const offset = Number(input.offset) || 0;
    const searchInput = input.input;

    const [hubCounts, c3dcCounts] = await Promise.all([
      client.query({
        query: SEARCH_PAGE_RESULTS,
        variables: { input: searchInput, first: 10, offset: 0 },
        context: { clientName: '' },
      })
        .then((result) => result.data.globalSearch)
        .catch(() => ({})),
      queryC3dcCountAPI(searchInput),
    ]);

    const countField = GLOBAL_SEARCH_COUNT_FIELDS[datafield];
    const hubCount = Number(hubCounts && hubCounts[countField]) || 0;
    const c3dcCount = Number(c3dcCounts && c3dcCounts[countField]) || 0;

    return fetchFederatedPage({
      field: datafield,
      searchInput,
      pageSize,
      offset,
      hubCount,
      c3dcCount,
      fetchHubRows,
      fetchC3dcRows: (variables) => queryC3dcResultAPI(datafield, variables),
      mergeOptions: { mergeCpiData },
    });
  }