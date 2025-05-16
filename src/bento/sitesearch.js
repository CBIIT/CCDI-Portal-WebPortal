import gql from 'graphql-tag';
import client from '../utils/graphqlClient';

/**
 * Maps a datafield to the correct search query
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
        return SEARCH_PAGE_RESULT_ABOUT;
      default:
        return SEARCH_PAGE_RESULT_ABOUT;
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
            participant_count
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
      about_page {
        title
      }
    }
  }
`;


export const SEARCH_PAGE_RESULT_ABOUT_PUBLIC = gql`
    query globalSearch($input: String, $first: Int, $offset: Int){
        globalSearch(
            input: $input
            first: $first
            offset: $offset
        ) {
            about_page {
                text
                page
                title
            }
        }
    }`;

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
            about_count
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
        participant_id
        study_id
        diagnosis_str
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
        study_id
        study_name
        study_status
        num_of_participants
        num_of_samples
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
      files {
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

export async function queryAutocompleteAPI(inputValue) {
    const data = await client.query({
      query:  SEARCH,
      variables: {
        input: inputValue,
      },
      context: {
        clientName:  '',
      },
    })
      .then((result) => (result.data.globalSearch))
      .catch(() => []);
  
    return data;
  }


/**
 * Query the backend API for the search result counts by search string
 *
 * @param {string} inputValue search text
 */
export async function queryCountAPI(inputValue) {
    const data = await client.query({
      query: SEARCH_PAGE_RESULTS,
      variables: {
        input: inputValue,
      },
      context: {
        clientName: '',
      },
    })
      .then((result) => result.data.globalSearch)
      .catch(() => {});
  
    return data;
  }
  
  /**ƒ
   * Query the backend API for the search results by datafield
   *
   * @param {string} datafield
   * @param {object} input search query variable input
   */
  export async function queryResultAPI(datafield, input) {
    
    const data = await client.query({
      query: getResultQueryByField(datafield),
      variables: input,
      context: {
        clientName: '',
      },
    })
      .then((result) => (result.data.globalSearch))
      .catch(() => []);
    console.log(data)
    return data[datafield] || [];
  }