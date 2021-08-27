import gql from 'graphql-tag';

// --------------- Page title configuration --------------
const pageTitle = {
  label: 'Program :',
  dataField: 'program_id',
};

const pageSubTitle = {
  dataField: 'program_id',
};

const breadCrumb = {
  label: 'ALL PROGRAMS',
  link: '/programs',
};

// --------------- Aggregated count configuration --------------
const aggregateCount = {
  labelText: 'Files',
  dataField: 'num_files',
  link: '/files',
  display: true,
};

// --------------- Icons configuration --------------
// Ideal size for programDetailIcon is 107x107 px
// Ideal size for externalLinkIcon is 16x16 px
const programDetailIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programIcon.svg',
  alt: 'Bento program logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Left Pannel configuration --------------
// A maximum of 6 leftPanelattributes are allowed
const leftPanel = {
  attributes: [
    {
      dataField: 'program_id',
      label: 'Program',
    },
    {
      dataField: 'start_date',
      label: 'Program Start Date',
    },
    {
      dataField: 'end_date',
      label: 'Program End Date',
    },
  ],
};

// --------------- Right Pannel configuration --------------
// Ideal size for fileIconSrc is 66x53 px
const rightPanel = {
  widget: [
    {
      dataField: 'studies',
      label: 'Studies',
      display: true,
    },
  ],
  files: [
    {
      dataField: 'num_participants',
      label: 'Number of Participants',
      fileIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programNumberofFilesIcon.svg',
      fileIconAlt: 'Number of participants icon',
      display: true,
    },
  ],
};

// --------------- Table configuration --------------
const table = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  title: 'Submitted Files',
  // Field name for table data, need to be updated only when using a different GraphQL query
  dataField: 'files',
  // Value must be one of the 'field' in columns
  defaultSortField: 'submitted_file_id',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: false,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'submitted_file_id',
      header: 'Submitted File ID',
      link: '/file/{submitted_file_id}',
    },
    {
      dataField: 'ccdi_arm',
      header: 'CCDI ARM',
    },
    {
      dataField: 'study_registered',
      header: 'Study Registered',
    },
    {
      dataField: 'primary_datatype',
      header: 'Primary DataType',
    },
    {
      dataField: 'have_subject_ids',
      header: 'Contain Subject IDs',
    },
    {
      dataField: 'have_pii',
      header: 'Have PII',
    },
    {
      dataField: 'subject_id_cross_reference',
      header: 'Subject ID Cross Reference',
    },
    {
      dataField: 'contain_biospecimen_ids',
      header: 'Contain Biospecimen IDs',
    },
    {
      dataField: 'participant_id_column_header_or_number',
      header: 'Participant ID Column Header',
    },
  ],
};

// --------------- GraphQL query - Retrieve program details --------------
const GET_PROGRAM_DETAIL_DATA_QUERY = gql`
query programDetail($program_id: String!) {
  programDetail(program_id: $program_id) {
    program_id
    start_date
    end_date
    num_files
    num_participants
    num_studies
    files { 
      submitted_file_id
      ccdi_arm
      submission_date
      submission_ts
      file_count_validate
      filename_list_validate
      study_registered
      primary_datatype
      derived_interventional_clinical_trial
      derived_observational_study
      have_subject_ids
      have_pii
      subject_id_cross_reference
      contain_biospecimen_ids
      contain_biospecimen_2_subject_mappings
      participant_id_column_header_or_number
      alt_participant_id_column_header_or_number
    }
  }
}`;

export {
  pageTitle,
  pageSubTitle,
  aggregateCount,
  programDetailIcon,
  leftPanel,
  rightPanel,
  externalLinkIcon,
  breadCrumb,
  GET_PROGRAM_DETAIL_DATA_QUERY,
  table,
};
