import gql from 'graphql-tag';
import { FileOnRowsSelect } from '../utils/fileTable';
import { SampleOnRowsSelect } from '../utils/sampleFileTable';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  src: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
};

// -------------- Case ID area configurations --------------
const caseHeader = {
  label: 'File ID',
  dataField: 'submitted_file_id',
};

// --------------- Data panel configuration --------------
const leftPanel = [
  // Each object here represents a subsection in the panel
  // A maximum of 3 subsections are allowed
  {
    sectionHeader: 'Administrative',
    // sectionDesc: 'Subsection description goes here',
    properties: [
      // A maximum of 10 properties are allowed
      {
        label: 'Submitter ID',
        dataField: 'submitter_id',
      },
      {
        label: 'Submitter Name',
        dataField: 'submitter_name',
      },
      {
        label: 'CCDI ARM',
        dataField: 'ccdi_arm',
      },
      {
        label: 'Submission Date',
        dataField: 'submission_date',
      },
      {
        label: 'Submission Timestamp',
        dataField: 'submission_ts',
      },
      {
        label: 'Source IP',
        dataField: 'source_ip',
      },
      {
        label: 'File Count Validated',
        dataField: 'file_count_validate',
      },
      {
        label: 'Filename List Validated',
        dataField: 'filename_list_validate',
      },
      {
        label: 'Study Registered',
        dataField: 'study_registered',
      },
    ],
  },
  {
    sectionHeader: 'Compliance',
    // sectionDesc: 'Demographic Related Info',
    properties: [
      // A maximum of 10 properties are allowed
      {
        label: 'Species',
        dataField: 'species',
      },
      {
        label: 'Human Subjects Data',
        dataField: 'human_subjects',
      },
    ],
  },
];

const rightPanel = [
  // Each object here represents a subsection in the panel
  // A maximum of 3 subsections are allowed
  {
    sectionHeader: 'Submitted File Information',
    // sectionDesc: 'Treatment Related Info',
    properties: [
      // A maximum of 10 properties are allowed
      {
        label: 'Total Size In Bytes',
        dataField: 'total_size_in_bytes',
      },
    ],
  },
  {
    sectionHeader: 'Content Types',
    // sectionDesc: 'Follow Up Related Info',
    properties: [
      // A maximum of 10 properties are allowed
      {
        label: 'Primary DataType',
        dataField: 'primary_datatype',
      },
      {
        label: 'Contain Subject IDs',
        dataField: 'have_subject_ids',
      },
      {
        label: 'Contain PII information',
        dataField: 'have_pii',
      },
      {
        label: 'Subject ID to additional Subject ID cross-reference',
        dataField: 'subject_id_cross_reference',
      },
      {
        label: 'Contain Biospecimen IDs',
        dataField: 'contain_biospecimen_ids',
      },
    ],
  },
  {
    sectionHeader: 'Participant Info',
    // sectionDesc: 'Follow Up Related Info',
    properties: [
      // A maximum of 10 properties are allowed
      {
        label: 'Column Header or Number',
        dataField: 'participant_id_column_header_or_number',
      },
      {
        label: 'Alternate Column Header or Number',
        dataField: 'alt_participant_id_column_header_or_number',
      },
    ],
  },
];

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Table 1 configuration --------------
const table1 = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle: 'ASSOCIATED Studies',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'studies',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'study_id',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Text to appear on Add to cart button
  buttonText: 'Add Selected Files',
  saveButtonDefaultStyle: {
    color: '#fff',
    backgroundColor: '#09A175',
    opacity: '1',
    border: '0px',
    cursor: 'pointer',
  },
  ActiveSaveButtonDefaultStyle: {
    disabled: 'true',
    opacity: '0.3',
    cursor: 'auto',
  },
  DeactiveSaveButtonDefaultStyle: {
    cursor: 'pointer',
    opacity: 'unset',
    border: 'unset',
  },
  // Help Icon Message
  tooltipMessage: 'Click button to add selected files associated with the selected sample(s).',
  helpMessage: 'Here help message',
  // showHideColumns 'true' or 'false'
  showHideColumns: true,
  // download csv
  download: false,
  // downloaded File Name
  downloadFileName: 'Bento_case_files_download',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: false,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'study_id',
      header: 'Study ID',
      sort: 'asc',
      primary: true,
      display: true,
    },
    {
      dataField: 'study_title',
      header: 'Study Title',
    },
    {
      dataField: 'pi_name',
      header: 'PI Name',
    },
    {
      dataField: 'pi_institution',
      header: 'PI Institution',
    },
    {
      dataField: 'study_phs_id',
      header: 'Study PHS ID',
    },
    {
      dataField: 'is_published',
      header: 'Published',
    },
    {
      dataField: 'submitted_2_repo',
      header: 'Submitted to Repository',
    },
  ],
  // Util Functions
  // Custom function on selct checkbox is selected.
  customOnRowsSelect: SampleOnRowsSelect,
};

// --------------- Table 2 configuration --------------
const table2 = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle: 'ASSOCIATED FILES',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'files',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'file_ordinal',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Text to appear on Add to cart button
  buttonText: 'Add Selected Files',
  saveButtonDefaultStyle: {
    color: '#fff',
    backgroundColor: '#09A175',
    opacity: '1',
    border: '0px',
    cursor: 'pointer',
  },
  ActiveSaveButtonDefaultStyle: {
    disabled: 'true',
    opacity: '0.3',
    cursor: 'auto',
  },
  DeactiveSaveButtonDefaultStyle: {
    cursor: 'pointer',
    opacity: 'unset',
    border: 'unset',
  },
  // Help Icon Message
  tooltipMessage: 'Click button to add selected files.',
  helpMessage: 'Here help message',
  // showHideColumns 'true' or 'false'
  showHideColumns: true,
  // download csv 'true' or 'false'
  download: false,
  // downloaded File Name
  downloadFileName: 'Bento_case_samples_download',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: true,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'file_id',
      header: 'File ID',
    },
    {
      dataField: 'file_ordinal',
      header: 'Ordinal',
    },
    {
      dataField: 'file_uuid',
      header: 'File UUID',
    },
    {
      dataField: 'file_name',
      header: 'File Name',
    },
    {
      dataField: 'file_md5',
      header: 'File MD5',
    },
    {
      dataField: 'file_content_format',
      header: 'File Content Format',
    },
    {
      dataField: 'file_deposit_location',
      header: 'File Deposit Location',
    },
  ],
  // Util Functions
  // Custom function on selct checkbox is selected.
  customOnRowsSelect: FileOnRowsSelect,
};

// --------------- Table 3 configuration --------------
const table3 = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle: 'PARTICIPANTS',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'participants',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'participant_id',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Text to appear on Add to cart button
  buttonText: 'Add Selected Files',
  saveButtonDefaultStyle: {
    color: '#fff',
    backgroundColor: '#09A175',
    opacity: '1',
    border: '0px',
    cursor: 'pointer',
  },
  ActiveSaveButtonDefaultStyle: {
    disabled: 'true',
    opacity: '0.3',
    cursor: 'auto',
  },
  DeactiveSaveButtonDefaultStyle: {
    cursor: 'pointer',
    opacity: 'unset',
    border: 'unset',
  },
  // Help Icon Message
  tooltipMessage: 'Click button to add selected files.',
  helpMessage: 'Here help message',
  // showHideColumns 'true' or 'false'
  showHideColumns: true,
  // download csv 'true' or 'false'
  download: false,
  // downloaded File Name
  downloadFileName: 'Bento_case_samples_download',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: false,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'participant_id',
      header: 'Participant ID',
    },
    {
      dataField: 'gender',
      header: 'Gender',
    },
    {
      dataField: 'age_at_index',
      header: 'Age At Index',
    },
    {
      dataField: 'alt_participants',
      header: 'Alternative Participant IDs',
    },
  ],
  // Util Functions
  // Custom function on selct checkbox is selected.
  customOnRowsSelect: FileOnRowsSelect,
};

// --------------- GraphQL query configuration --------------

// query name, also used as root of returned data
const dataRoot = 'fileDetail';
// query name, also used as key for files to Samples Mapping.
const filesOfSamples = 'samplesForSubjectId';
// Primary ID field used to query a case
const caseIDField = 'submitted_file_id';

// GraphQL query to retrieve detailed info for a case
const GET_CASE_DETAIL_DATA_QUERY = gql`
  query subjectDetail($submitted_file_id: String!) {
    fileDetail(submitted_file_id: $submitted_file_id) {
      submitted_file_id
      submitter_id
      submitter_name
      ccdi_arm
      submission_date
      submission_ts
      source_ip
      file_count_validate
      filename_list_validate
      species
      human_subjects
      total_size_in_bytes
      primary_datatype
      have_subject_ids
      have_pii
      subject_id_cross_reference
      contain_biospecimen_ids
      contain_biospecimen_2_subject_mappings
      participant_id_column_header_or_number
      alt_participant_id_column_header_or_number
      files {
        file_id: file_set_id
        file_ordinal
        file_uuid: file_id
        file_name
        file_md5
        file_content_format
        file_deposit_location
      }
      studies {
        study_id
        pi_name
        pi_institution
        pi_email
        pi_era_id
        study_title
        study_phs_id
        is_published
        doi
        submitted_2_repo
        gdc
        pdc
        dbGap
        sra
        genbank
        figshare
        other_repo
      }
      participants {
        participant_id
        gender
        age_at_index
        alt_participants
      }
    }
  }
`;

export {
  caseHeader,
  dataRoot,
  caseIDField,
  filesOfSamples,
  leftPanel,
  rightPanel,
  table1,
  table2,
  table3,
  GET_CASE_DETAIL_DATA_QUERY,
};
