import gql from 'graphql-tag';

export const GET_PARTICIPANTS_TAB = gql`
query participantOverViewPaged($participant_ids: [String], $offset: Int = 0, $first: Int = 1000, $order_by:String =""){
  participantOverViewPaged(participant_ids: $participant_ids, first: $first, offset: $offset, order_by: $order_by) {
    participant_id
    dbgap_accession
    race
    sex_at_birth
    diagnosis
    anatomic_site
    age_at_diagnosis
    treatment_agent
    treatment_type
    age_at_treatment_start
    first_event
    last_known_survival_status
    age_at_last_known_survival_status
  }
}
`;

export const customParticipantsTabDownloadCSV = {
  keysToInclude: ['participant_id', 'dbgap_accession', 'race', 'sex_at_birth', 'diagnosis', 'anatomic_site', 'age_at_diagnosis', 'treatment_agent', 'age_at_treatment_start', 'first_event', 'last_known_survival_status', 'age_at_last_known_survival_status'],
  header: ['Participant ID', 'Study Accession', 'Race', 'Sex', 'Diagnosis', 'Diagnosis Anatomic Site', 'Age at Diagnosis (days)', 'Treatment Agent', 'Treatment Type', 'Age at Treatment Start (days)', 'First Event', 'Last Known Survival Status', 'Age at Last Known Survival Status (days)'],
  query: GET_PARTICIPANTS_TAB,
  apiVariable: 'participantOverView',
  fileName: 'tableDownload',
  defaultFullTableDownload: false,
};

export const GET_SAMPLES_TAB = gql`
query sampleOverview($sample_ids: [String], $offset: Int = 0, $first: Int = 1000, $order_by:String =""){
  sampleOverview(sample_ids: $sample_ids, offset: $offset,first: $first, order_by: $order_by) {
    sample_id,
    participant_id
    study_id
    anatomic_site
    participant_age_at_collection
    sample_tumor_status
    tumor_classification
    diagnosis
  }
}
`;

export const customSamplesTabDownloadCSV = {
  keysToInclude: ['sample_id', 'participant_id', 'study_id', 'anatomic_site', 'participant_age_at_collection', 'sample_tumor_status', 'tumor_classification', 'diagnosis'],
  header: ['Sample ID', 'Participant ID', 'Study ID', 'Sample Anatomic Site', 'Age at Sample Collection (days)', 'Diagnosis', 'Sample Tumor Status', 'Sample Tumor Classification', 'Diagnosis'],
  query: GET_SAMPLES_TAB,
  apiVariable: 'sampleOverview',
  fileName: 'tableDownload',
  defaultFullTableDownload: false,
};

export const GET_FILES_TAB = gql`
query fileOverview($file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="file_name"){
  fileOverview(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
    file_name
    data_category
    file_description
    file_type
    file_size
    file_access
    study_id
    participant_id
    sample_id
    file_id
    md5sum
    library_selection
    library_source_material
    library_source_molecule
    library_strategy
    file_mapping_level
  }
}
`;

export const customFilesTabDownloadCSV = {
  keysToInclude: ['file_name', 'data_category', 'file_description', 'file_type', 'file_size', 'study_id', 'participant_id', 'sample_id', 'file_id', 'md5sum', 'library_selection', 'library_source_material', 'library_strategy', 'library_source_molecule', 'file_mapping_level'],
  header: ['File Name', 'File Category', 'File Description', 'File Type', 'File Size', 'Study ID', 'Participant ID', 'Sample ID', 'GUID', 'MD5sum', 'Library Selection', 'Library Source', 'Library Strategy', 'File Mapping'],
  query: GET_FILES_TAB,
  apiVariable: 'fileOverview',
  fileName: 'tableDownload',
  defaultFullTableDownload: false,
};

export const GET_STUDY_TAB = gql`
query studyOverview($study_id: [String], $offset: Int = 0, $first: Int = 1000, $order_by:String =""){
  studyOverview(study_id: $participant_id, offset: $offset,first: $first, order_by: $order_by) {
    participant_id
    dbgap_accession
    diagnosis
    disease_phase
    anatomic_site
    age_at_diagnosis
    last_known_survival_status
  }
}
`;

export const customStudyTabDownloadCSV = {
  keysToInclude: ['study_id', 'pubmed_id', 'grant_id', 'dbgap_accession', 'study_name', 'study_status', 'personnel_name', 'number_of_participants', 'diagnosis', 'number_of_samples', 'anatomic_site', 'number_of_files', 'file_type'],
  header: ['Study ID', 'PubMed ID', 'Grant ID', 'Study Accession', 'Study Name', 'Study Status', 'Principle Investigator(s)', 'Number of Participants', 'Diagnosis', 'Number of Samples', 'Diagnosis Anatomic Site', 'Number of Files', 'File Type'],
  query: GET_STUDY_TAB,
  apiVariable: 'studyOverview',
  fileName: 'tableDownload',
  defaultFullTableDownload: false,
};

export const MY_CART = gql`
query filesManifestInList($file_ids: [String], $offset: Int = 0, $first: Int = 200000, $order_by:String ="file_name", $sort_direction:String="asc") {
    filesManifestInList(id: $file_ids, offset: $offset,first: $first, order_by: $order_by, sort_direction: $sort_direction) {
        guid
        file_name
        participant_id
        md5sum
    }
}`;

export const customMyFilesTabDownloadCSV = {
  keysToInclude: ['file_name', 'file_type', 'association', 'file_description', 'file_format', 'file_size', 'subject_id', 'study_code'],
  header: ['File Name', 'File Type', 'Association', 'Description', 'File Format', 'Size', 'Case Id', 'Study Code'],
  query: MY_CART,
  apiVariable: 'filesInList',
  fileName: 'BENTO File Manifest',
  defaultFullTableDownload: false,
};
