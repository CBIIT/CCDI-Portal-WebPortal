import gql from 'graphql-tag';

export const GET_PARTICIPANTS_TAB = gql`
query participantOverViewPaged($participant_ids: [String], $offset: Int = 0, $first: Int = 1000, $order_by:String =""){
  participantOverViewPaged(participant_ids: $participant_ids, first: $first, offset: $offset, order_by: $order_by) {
    participant_id
    phs_accession
    race
    gender
    ethnicity
  }
}
`;

export const customParticipantsTabDownloadCSV = {
  keysToInclude: ['participant_id', 'phs_accession', 'race', 'gender', 'ethnicity'],
  header: ['Participant ID', 'Study Accession', 'Race', 'Gender', 'Ethnicity'],
  query: GET_PARTICIPANTS_TAB,
  apiVariable: 'participantOverView',
  fileName: 'tableDownload',
  defaultFullTableDownload: false,
};

export const GET_SAMPLES_TAB = gql`
query sampleOverview($sample_ids: [String], $offset: Int = 0, $first: Int = 1000, $order_by:String =""){
  sampleOverview(sample_ids: $sample_ids, offset: $offset,first: $first, order_by: $order_by) {
    sample_id
    subject_id
    program
    program_id
    arm
    diagnosis
    tissue_type
    tissue_composition
    sample_anatomic_site
    sample_procurement_method
    platform
    files 
}
}
`;

export const customSamplesTabDownloadCSV = {
  keysToInclude: ['sample_id', 'subject_id', 'program', 'arm', 'diagnosis', 'tissue_type', 'tissue_composition', 'sample_anatomic_site', 'sample_procurement_method', 'platform'],
  header: ['Sample ID', 'Case Id', 'Program Code', 'Arm', 'Diagnosis', 'Tissue Type', 'Tissue Composition', 'Sample Anatomic Site', 'Sample Procurement Method', 'Platform'],
  query: GET_SAMPLES_TAB,
  apiVariable: 'sampleOverview',
  fileName: 'tableDownload',
  defaultFullTableDownload: false,
};

export const GET_FILES_TAB = gql`
query fileOverview($file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="file_name"){
  fileOverview(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
    file_id
    file_name
    association
    file_description
    file_format
    file_size
    program
    program_id
    arm
    subject_id
    sample_id
    diagnosis
  }
}
`;

export const customFilesTabDownloadCSV = {
  keysToInclude: ['file_name', 'association', 'file_description', 'file_format', 'file_size', 'program', 'arm', 'subject_id', 'sample_id', 'diagnosis'],
  header: ['File Name', 'Association', 'Description', 'File Format', 'Size', 'Program Code', 'Arm', 'Case Id', 'Sample ID', 'Diagnosis'],
  query: GET_FILES_TAB,
  apiVariable: 'fileOverview',
  fileName: 'tableDownload',
  defaultFullTableDownload: false,
};

export const MY_CART = gql`
query filesInList($file_ids: [String], $offset: Int = 0, $first: Int = 1000, $order_by:String ="") {
    filesInList(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
        study_code
        subject_id
        file_name
        file_type
        association
        file_description
        file_format
        file_size
        file_id
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
