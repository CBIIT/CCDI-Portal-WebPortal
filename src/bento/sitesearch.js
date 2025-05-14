import gql from 'graphql-tag';
import client from '../utils/graphqlClient';

/**
 * Maps a datafield to the correct search query
 *
 * @param {string} field datatable field name
 * @param {boolean} isPublic whether the search is public or not
 */
export function getResultQueryByField(field, isPublic) {
    switch (field) {
      case 'all':
        return isPublic ? SEARCH_PUBLIC : SEARCH_PAGE_RESULT_PARTICIPANTS;
      case 'participants':
        return SEARCH_PAGE_RESULT_PARTICIPANTS;
      case 'studies':
        return SEARCH_PAGE_RESULT_STUDIES;
      case 'model':
        return SEARCH_PAGE_RESULT_MODEL;
      case 'about_page':
        return isPublic ? SEARCH_PAGE_RESULT_ABOUT_PUBLIC : SEARCH_PAGE_RESULT_ABOUT;
      default:
        return SEARCH_PAGE_RESULT_PARTICIPANTS;
    }
  }

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
            about_count
            about_page{
                page
                title
                type
                text
            }
        }
    }
`;

// AutoComplete main Query
export const SEARCH = gql`
  query globalSearch($input: String){
    globalSearch(input: $input) {
      participants {
        participant_id
      }
      biospecimens {
        parent_specimen_id
      }
      gs_list {
        autocomplete_list
      }
      model_search {
        node
      }
    }
  }
`;


export const SEARCH_PAGE_RESULT_ABOUT_PUBLIC = gql`
    query publicGlobalSearch($input: String, $first: Int, $offset: Int){
        globalSearch(
            input: $input
            first: $first
            offset: $offset
        ) {
            about_page {
                type
                text
                page
                title
            }
        }
    }`;

export const SEARCH_PAGE_RESULTS_PUBLIC = gql`
    query publicGlobalSearch($input: String, $first: Int, $offset: Int){
        globalSearch(
            input: $input
            first: $first
            offset: $offset
        ) {
            about_count
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
        participant_id
        study_id
        age_at_diagnosis_str
        treatment_type_str
        sex_at_birth
        treatment_agent_str
        race_str
        last_known_survival_status_str
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
        type
        study_id
        study_name
        study_status
        num_of_participants
        num_of_files
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
        type
        sample_id
        participant_id
        study_id
        sample_anatomic_site_str
        sample_tumor_status
        diagnosis_str
        tumor_classification
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
      samples {
        type
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
                type
                node
                property
                property_description
                property_required
                property_type
                value
                highlight
            }
        }
    }
`;

export const SEARCH_PAGE_RESULT_ABOUT = gql`
  query globalSearch($input: String, $first: Int, $offset: Int){
    globalSearch(
      input: $input
      first: $first
      offset: $offset
    ) {
        about_page {
          type
          text
          page
          title
        }
    }
  }
`;

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
        about_count
    }
  }
`;

export async function queryAutocompleteAPI(inputValue, isPublic) {
    const data = await client.query({
      query: isPublic ? SEARCH_PUBLIC : SEARCH,
      variables: {
        input: inputValue,
      },
      context: {
        clientName: isPublic ? 'publicService' : '',
      },
    })
      .then((result) => (isPublic ? result.data.publicGlobalSearch : result.data.globalSearch))
      .catch(() => []);
  
    return data;
  }


/**
 * Query the backend API for the search result counts by search string
 *
 * @param {string} inputValue search text
 * @param {boolean} isPublic whether to use the public service or not
 */
export async function queryCountAPI(inputValue, isPublic) {
    const data = await client.query({
      query: isPublic ? SEARCH_PAGE_RESULTS_PUBLIC : SEARCH_PAGE_RESULTS,
      variables: {
        input: inputValue,
      },
      context: {
        clientName: isPublic ? 'publicService' : '',
      },
    })
      .then((result) => (isPublic ? result.data.publicGlobalSearch : result.data.globalSearch))
      .catch(() => {});
  
    return data;
  }
  
  /**
   * Query the backend API for the search results by datafield
   *
   * @param {string} datafield
   * @param {object} input search query variable input
   * @param {boolean} isPublic is the search public or private
   */
  export async function queryResultAPI(datafield, input, isPublic) {
    const data = await client.query({
      query: getResultQueryByField(datafield, isPublic),
      variables: input,
      context: {
        clientName: isPublic ? 'publicService' : '',
      },
    })
      .then((result) => (isPublic ? result.data.publicGlobalSearch : result.data.globalSearch))
      .catch(() => []);
  
    return data[datafield] || [];
  }