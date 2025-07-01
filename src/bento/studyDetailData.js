import gql from 'graphql-tag';

const GET_STUDY_DETAIL_DATA_QUERY = gql`
query studyDetails($study_id: String) {
    studyDetails(study_id: $study_id) {
        study_id
        study_name
        dbgap_accession
        study_description
        pubmed_ids
        num_of_participants
        num_of_samples
        num_of_files
        data_categories {
          group
          subjects
        }
        diagnoses {
          group
          subjects
        }
        anatomic_sites {
          group
          subjects
        }
        __typename
    }
  }`;

export {
    GET_STUDY_DETAIL_DATA_QUERY,
};