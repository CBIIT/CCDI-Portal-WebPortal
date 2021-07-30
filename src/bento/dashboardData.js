import gql from 'graphql-tag';

// --------------- Dashboard Sidebar Filters configuration --------------
// A maximum of 12 facetSearchData are allowed
export const facetSearchData = [
  {
    label: 'Program', field: 'group', api: 'fileCountByProgram', apiForFiltering: 'filterFileCountByProgram', datafield: 'programs', section: 'Filter By Files', show: true,
  },
  {
    label: 'File Content Format', field: 'group', api: 'fileCountByContentFormat', apiForFiltering: 'filterFileCountByContentFormat', datafield: 'file_content_formats', section: 'Filter By Files', show: true,
  },
];

// --------------- Dashboard Sidebar Sections styling --------------
export const facetSectionVariables = {
  'Filter By Cases': {
    color: '#10A075',
    checkBoxColorsOne: '#E8F7DC',
    checkBoxColorsTwo: '#F5FDEE',
    height: '5px',
    isExpanded: false,
  },
  'Filter By Samples': {
    color: '#10BEFF',
    checkBoxColorsOne: '#C9EBF7',
    checkBoxColorsTwo: '#E8F8FE',
    height: '5px',
    isExpanded: false,
  },
  'Filter By Files': {
    color: '#E636E4',
    checkBoxColorsOne: '#FBE3FB',
    checkBoxColorsTwo: '#FFF2FF',
    height: '5px',
    isExpanded: false,
  },
};

// --------------- Default Dashboard Sidebar Sections styling --------------
export const defaultFacetSectionVariables = {
  color: '#000000',
  checkBoxColorsOne: '#E8F7DC',
  checkBoxColorsTwo: '#F5FDEE',
  height: '5px',
  isExpanded: false,
};

// --------------- Dashboard Widgets configuration --------------
// A maximum of 6 widgets are allowed
export const widgetsData = [
];

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Facet resetIcon link configuration --------------
// Ideal size for resetIcon is 16x16 px
export const resetIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
  alt: 'Reset icon',
  size: '12 px',
};
export const resetIconFilter = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
  alt: 'Reset icon',
  size: '12 px',
};

// --------------- Dashboard Table configuration --------------
export const dashboardTable = {
  tableTitle: 'Files',
  tableData: [
    // A maximum of 10 columns (tableData) are allowed
    {
      dataField: 'submitted_file_id',
      header: 'Submitted File ID',
      sort: 'asc',
      link: '/file/{submitted_file_id}',
      primary: true,
      display: true,
    },
    {
      dataField: 'ccdi_arm',
      header: 'CCDI ARM',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'submission_date',
      header: 'Submission Date',
      sort: 'asc',
      display: false,
    },
    {
      dataField: 'submission_ts',
      header: 'Submission Timestamp',
      sort: 'asc',
      display: false,
    },
    {
      dataField: 'source_ip',
      header: 'Source IP',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'file_count_validate',
      header: 'File Count Valideted',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'filename_list_validate',
      header: 'Filename List Validated',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'study_registered',
      header: 'Study Registered',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'primary_datatype',
      header: 'Primary DataType',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'have_subject_ids',
      header: 'Contain Subject IDs',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'have_pii',
      header: 'Have PII',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'contain_biospecimen_ids',
      header: 'Contain Biospecimen IDs',
      sort: 'asc',
      display: true,
    },
  ],
};

// --------------- Sorting related labels configuration --------------
export const sortLabels = {
  sortAlphabetically: 'Sort alphabetically',
  sortByCount: 'Sort by counts',
  showMore: '...expand to see all selections',
};

export const showCheckboxCount = 5;

// --------------- Dashboard Query configuration --------------
export const GET_DASHBOARD_DATA_QUERY = gql`{
  numberOfPrograms
  numberOfSubmitters
  numberOfStudies
  numberOfFiles
  fileCountByProgram{
    group
    subjects
  }
  fileCountByContentFormat{
    group
    subjects
  }

  fileOverViewPaged(first: 100) {
    submitted_file_id
    ccdi_arm
    submission_date
    submission_ts
    source_ip
    file_count_validate
    filename_list_validate
    study_registered
    primary_datatype
    have_subject_ids
    have_pii
    contain_biospecimen_ids
    files{
      file_set_id
    }
  }
  }`;

// --------------- Dashboard Query configuration --------------
export const GET_DASHBOARD_TABLE_DATA_QUERY = gql`{
  fileOverViewPaged(first: 1000000) {
    submitted_file_id
    ccdi_arm
    submission_date
    submission_ts
    source_ip
    file_count_validate
    filename_list_validate
    study_registered
    primary_datatype
    have_subject_ids
    have_pii
    contain_biospecimen_ids
    files{
      file_set_id
    }
  }
  }`;
