import gql from 'graphql-tag';
import { customFilesTabDownloadCSV } from './tableDownloadCSV';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
  0: 'Click button to add selected files associated with the selected case(s).',
  1: 'Click button to add selected files associated with the selected sample(s).',
  2: 'Click button to add selected files.',
};

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Tabs Table configuration --------------
export const tabContainers = [
  {
    name: 'Files',
    dataField: 'dataFile',
    api: 'GET_FILES_OVERVIEW_QUERY',
    paginationAPIField: 'fileOverview',
    paginationAPIFieldDesc: 'fileOverviewDesc',
    defaultSortField: 'submitted_file_id',
    defaultSortDirection: 'asc',
    count: 'numberOfFiles',
    buttonText: 'Add Selected Files',
    dataKey: 'submitted_file_id',
    saveButtonDefaultStyle: {
      color: '#fff',
      backgroundColor: '#DC2FDA',
      opacity: '1',
      border: '0px',
      cursor: 'pointer',
    },
    DeactiveSaveButtonDefaultStyle: {
      opacity: '0.3',
      cursor: 'auto',
    },
    ActiveSaveButtonDefaultStyle: {
      cursor: 'pointer',
      opacity: 'unset',
      border: 'unset',
    },
    columns: [
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
    id: 'file_tab',
    onRowsSelect: 'type1',
    disableRowSelection: 'type1',
    tableID: 'case_tab_table',
    selectableRows: true,
    tabIndex: '0',
    tableDownloadCSV: customFilesTabDownloadCSV,
    downloadFileName: 'Bento_Dashboard_cases_download',
    headerPagination: true,
    footerPagination: true,
  },
];

// --------------- Tabs Header Data configuration --------------
export const tabs = [
  {
    id: 'file_tab',
    title: 'Files',
    dataField: 'dataFile',
    count: 'numberOfFiles',
  },
];

// --------------- Tabs Header Style configuration --------------
export const tabIndex = [
  {
    title: 'Files',
    primaryColor: '#F7D7F7',
    secondaryColor: '#86D6F0',
    selectedColor: '#C92EC7',
  },
  {
    title: 'Cases',
    primaryColor: '#D6F2EA',
    secondaryColor: '#FFDFB8',
    selectedColor: '#10A075',
  },
  {
    title: 'Samples',
    primaryColor: '#CFEDF9',
    secondaryColor: '#C9F1F1',
    selectedColor: '#0DAFEC',
  },
];

export const DASHBOARD_QUERY = gql`{
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

export const FILTER_GROUP_QUERY = gql`
  query groupCounts($subject_ids: [String]){
    fileCountByProgram(submitted_file_ids: $subject_ids){
      group
      subjects
    }
    fileCountByContentFormat(submitted_file_ids: $subject_ids){
      group
      subjects
    } 
}
 `;

export const FILTER_QUERY = gql`
query search($programs: [String] ,
  $file_content_formats: [String] ,
  $first: Int ) {
searchFiles(programs: $programs,
  file_content_formats: $file_content_formats,
      first: $first) {
        numberOfPrograms
        numberOfSubmitters
        numberOfStudies
        numberOfFiles
        fileIds
        subjectIds: fileIds
        firstPage {
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
        }
}
filterFileCountByProgram(programs: $programs, file_content_formats: $file_content_formats) {
  group
  subjects
}
filterFileCountByContentFormat(programs: $programs, file_content_formats: $file_content_formats) {
  group
  subjects
}
}

`;

// --------------- GraphQL query - Retrieve files tab details --------------
export const GET_FILES_OVERVIEW_QUERY = gql`
query fileOverViewPaged($submitted_file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="submitted_file_id"){
  fileOverViewPaged(submitted_file_ids: $submitted_file_ids, first: $first, offset: $offset, order_by: $order_by) {
      submitted_file_id
      ccdi_arm
      submission_date
      submission_ts
      source_ip
      file_count_validate
      filename_list_validate
      files{
        file_set_id
      }
      study_registered
      primary_datatype
      derived_interventional_clinical_trial
      derived_observational_study
      have_subject_ids
      have_pii
      contain_biospecimen_ids
      contain_biospecimen_2_subject_mappings
  }
}
  `;

export const GET_FILES_OVERVIEW_DESC_QUERY = gql`
  query fileOverviewPagedDesc($submitted_file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="submitted_file_id"){
    fileOverviewPagedDesc(submitted_file_ids: $submitted_file_ids, offset: $offset,first: $first, order_by: $order_by) {
      submitted_file_id
      ccdi_arm
      submission_date
      submission_ts
      source_ip
      file_count_validate
      filename_list_validate
      files{
        file_set_id
      }
      primary_datatype
      have_subject_ids
      have_pii
      contain_biospecimen_ids
      study_registered
    }
  }
    `;

export const GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL = gql`
  query subjectOverViewPaged($subject_ids: [String], $first: Int = 10000000){
    fileOverViewPaged(submitted_file_ids: $subject_ids, first: $first) {
        files {
              file_id: file_set_id
        }
    }
}
  `;

export const GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL = gql`
query sampleOverview($sample_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
  sampleOverview(sample_ids: $sample_ids, offset: $offset,first: $first, order_by: $order_by) {
    files
}
}
  `;

export const GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL = gql`
query fileOverview($file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by: String = "file_name") {
  fileOverview(file_ids: $file_ids, offset: $offset, first: $first, order_by: $order_by) {
    file_id
  }
}
  `;

// --------------- GraphQL query - Retrieve files tab details --------------
export const GET_FILES_NAME_QUERY = gql`
query fileOverview($file_ids: [String], $offset: Int = 0, $first: Int = 100000, $order_by:String ="file_name"){
  fileOverview(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
    file_name
  }
}
  `;

export const GET_FILE_IDS_FROM_FILE_NAME = gql`
  query (
      $file_name: [String],
      $offset: Int,
      $first: Int,
      $order_by: String
  )
  {
      fileIdsFromFileNameDesc(
          file_name:$file_name, 
          offset:$offset,
          first:$first,
          order_by:$order_by
      )
      {
          file_id
      }
  }`;
