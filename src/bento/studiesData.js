import gql from 'graphql-tag';
import { cellTypes } from '@bento-core/table';

const studyDownloadLinks = {
  "phs000463": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs000463_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs000464": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs000464_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs000465": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs000465_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs003163": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs003163_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs000720": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs000720_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs001437": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs001437_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs002371": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002371_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs002430": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002430_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs002431": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002431_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs002504": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002504_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs002517": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002517_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs002518": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002518_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs002529": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002529_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs002599": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002599_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs002677": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002677_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs002790": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002790_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs003164": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs003164_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs003432": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs003432_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs003519": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs003519_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs000466": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs000466_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs000467": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs000467_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs000468": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs000468_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs000469": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs000469_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs000470": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs000470_CCDI_Study_Manifest_v2.1.0.xlsx",
  "phs000471": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs000471_CCDI_Study_Manifest_v2.1.0.xlsx",
};

export async function openDoubleLink(url, fileName) {
  let urlContent = await fetch(url);
  if (urlContent.ok) {
    let data = await urlContent.blob();
    let a = document.createElement('a');
    a.href = window.URL.createObjectURL(data);
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}

const GET_STUDIES_DATA_QUERY = gql`
  query studiesListing (
    $first: Int,
    $offset: Int,
    $order_by: String,
    $sort_direction: String) {
      studiesListing(
        first: $first,
        offset: $offset,
        order_by: $order_by,
        sort_direction: $sort_direction
      ) {
        study_id
        study_name
        num_of_participants
        num_of_samples
        num_of_files
      }
    }
`;

const GET_NUMBER_OF_STUDIES = gql`{
    numberOfStudies
}`

const table = {
  name: 'Studies',
  dataField: 'study_id',
  paginationAPIField: 'studiesListing',
  api: GET_STUDIES_DATA_QUERY,
  dataKey: 'study_id',
  defaultSortField: 'study_id',
  defaultSortDirection: 'asc',
  tableID: 'studies_table',
  extendedViewConfig: {
    pagination: true,
    hasExport: false,
  },
  columns: [
    {
      dataField: 'study_id',
      header: 'Study ID',
      tooltipText: 'Sort by Study ID',
      cellType: cellTypes.LINK,
      linkAttr: {
        rootPath: '/studies',
        pathParams: ['study_id']
      },
      display: true,
    },
    {
      dataField: 'study_name',
      header: 'Study Name',
      tooltipText: 'Sort by Study Name',
      display: true,
    },
    {
      dataField: 'num_of_participants',
      header: 'Participants Count',
      tooltipText: 'Sort by Participants Count',
      display: true,
    },
    {
      dataField: 'num_of_samples',
      header: 'Samples Count',
      tooltipText: 'Sort by Diagnosis Count',
      display: true,
    },
    {
      dataField: 'num_of_files',
      header: 'Files Count',
      tooltipText: 'Sort by File Count',
      display: true,
    },
  ],
};


export {
  table,
  GET_STUDIES_DATA_QUERY,
  GET_NUMBER_OF_STUDIES,
  studyDownloadLinks
};