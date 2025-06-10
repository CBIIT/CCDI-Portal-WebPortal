import { cellTypes } from "@bento-core/table";
import { GET_COHORT_MANIFEST_QUERY } from "./dashboardTabData";
import gql from "graphql-tag";

export const tableConfig = {
  name: 'Participants',
  dataField: 'dataParticipant',
  api: GET_COHORT_MANIFEST_QUERY,
  paginationAPIField: 'participantOverview',
  count: 'numberOfParticipants',
  fileCount: 'participantsFileCount',
  dataKey: 'participant_id',
  hiddenDataKeys: ['participant_id', 'id', 'study_id'],
  defaultSortField: 'participant_id',
  defaultSortDirection: 'asc',
  toolTipText: 'Count of Participant Record',
  buttonText: 'Add Selected Files',
  tableID: 'participant_tab_table',
  hasToolTip: true,
  extendedViewConfig: {
    pagination: true,
    manageViewColumns: false,
    download: true,
    downloadButtonConfig: {
      title: 'DOWNLOAD DATA',
      cloudIcon: true,
    },
    hasExport: false,
  },
  columns: [
    {
      dataField: 'participant_id',
      header: 'Participant Id',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },

    {
      dataField: 'study_id',
      header: 'dbGaP Accession',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
      linkAttr: {
        linkAttr: {
          rootPath: 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=',
        },
        cellType: cellTypes.CUSTOM_ELEM,
      },
      doNotDownload: true,
    },
    {
      dataField: 'race',
      header: 'Race',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'sex_at_birth',
      header: 'Sex at Birth',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: "cohort",
      header: "Cohorts",
      display: true,
      tooltipText: "This entry is found in the following cohorts",
      role: cellTypes.DISPLAY,
      cellType: cellTypes.CUSTOM_ELEM
    }
  ],
  id: 'participant_tab',
  tableDownloadCSV: {},
  tabIndex: '0',
  downloadFileName: 'CCDI Hub Participants Download',
  tableMsg: {
    noMatch: 'To proceed, please select a cohort from the Cohort List (Left Panel).',
  },
};

export const diagnosesTableConfig =
{
  name: 'Diagnosis',
  dataField: 'dataParticipant',
  api: GET_COHORT_MANIFEST_QUERY,
  paginationAPIField: 'diagnosisOverview',
  count: 'numberOfDiagnosis',
  fileCount: 'diagnosisFileCount',
  dataKey: 'participant_id',
  hiddenDataKeys: ['participant_id', 'id', 'study_id'],
  defaultSortField: 'participant_id',
  defaultSortDirection: 'asc',
  toolTipText: 'Count of Diagnosis Record',
  buttonText: 'Add Selected Files',
  tableID: 'diagnosis_tab_table',
  hasToolTip: true,
  extendedViewConfig: {
    pagination: true,
    manageViewColumns: false,
    download: true,
    downloadButtonConfig: {
      title: 'DOWNLOAD DATA',
      cloudIcon: true,
    },
    hasExport: false,
  },
  columns: [
    {
      dataField: 'participant_id',
      header: 'Participant Id',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'diagnosis',
      header: 'Diagnosis',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'anatomic_site',
      header: 'Anatomic Sites',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'age_at_diagnosis',
      header: 'Age At Diagnosis',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: "cohort",
      header: "Cohorts",
      display: true,
      tooltipText: "This entry is found in the following cohorts",
      role: cellTypes.DISPLAY,
      cellType: cellTypes.CUSTOM_ELEM
    }
  ],
  id: 'participant_tab',
  tableDownloadCSV: {},
  tabIndex: '0',
  downloadFileName: 'C3DC Participants Download',
  tableMsg: {
    noMatch: 'To proceed, please select a cohort from the Cohort List (Left Panel).',
  },
}

const participant_query = gql`query participantOverview(
    $id: [String],
    # Table config
    $first: Int,
    $offset: Int,
    $order_by: String,
    $sort_direction: String
) {
participantOverview(
    # Demographics
    id: $id,

    # Table config
    first: $first,
    offset: $offset,
    order_by: $order_by,
    sort_direction: $sort_direction
) { 
    id
    participant_id
    race
    sex_at_birth
    study_id
    __typename
}}`;

const diagnosis_query = gql`query diagnosisOverview(
    # Demographics
    $id: [String]

    # Table config
    $first: Int,
    $offset: Int,
    $order_by: String,
    $sort_direction: String
) {
diagnosisOverview(
    # Demographics
    pid: $id,

    # Table config
    first: $first,
    offset: $offset,
    order_by: $order_by,
    sort_direction: $sort_direction
) {
    # Demographics
    participant_id
    id
    # Diagnosis
    d_id
    diagnosis_id
    age_at_diagnosis
    anatomic_site
    diagnosis
    study_id
    __typename
}}`;

export const analyzer_query = [participant_query, diagnosis_query];
export const analyzer_tables = [tableConfig, diagnosesTableConfig];
export const responseKeys = ["participantOverview", "diagnosisOverview"];