import React from 'react';
import gql from 'graphql-tag';
import { cellTypes, headerTypes } from '@bento-core/table';
import DataAvailabilityHeader from '../pages/studies/tableConfig/DataAvailabilityHeader';

const studyDownloadLinks = {
  "phs000463": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs000463_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs000464": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs000464_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs000465": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs000465_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs000466": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs000466_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs000467": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs000467_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs000468": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs000468_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs000469": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs000469_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs000470": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs000470_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs000471": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs000471_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs000720": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs000720_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs001228": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs001228_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs001327": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs001327_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs001437": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs001437_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs001714": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs001714_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs001738": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs001738_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs001846": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs001846_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs001878": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs001878_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs002187": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002187_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs002276": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002276_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs002322": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002322_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs002371": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002371_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs002430": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002430_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs002431": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002431_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs002504": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002504_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs002517": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002517_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs002518": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002518_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs002529": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002529_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs002599": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002599_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs002620": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002620_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs002677": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002677_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs002790": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002790_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs002883": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs002883_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs003111": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs003111_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs003160": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs003160_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs003161": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs003161_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs003163": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs003163_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs003164": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs003164_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs003215": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs003215_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs003432": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs003432_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs003519": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs003519_CCDI_Study_Manifest_v3.1.0.xlsx",
  "phs003975": "https://d2xnga7irezzit.cloudfront.net/metadata_files/phs003975_CCDI_Study_Manifest_v3.1.0.xlsx",
};

const studycBioPortalLinks = {
  'phs000463': 'https://cbioportal.ccdi.cancer.gov/study/summary?id=openpedcan_v15',
  'phs000464': 'https://cbioportal.ccdi.cancer.gov/study/summary?id=openpedcan_v15',
  'phs000465': 'https://cbioportal.ccdi.cancer.gov/study/summary?id=openpedcan_v15',
  'phs000466': 'https://cbioportal.ccdi.cancer.gov/study/summary?id=openpedcan_v15',
  'phs000467': 'https://cbioportal.ccdi.cancer.gov/study/summary?id=openpedcan_v15',
  'phs000468': 'https://cbioportal.ccdi.cancer.gov/study/summary?id=openpedcan_v15',
  'phs000469': 'https://cbioportal.ccdi.cancer.gov/study/summary?id=openpedcan_v15',
  'phs000470': 'https://cbioportal.ccdi.cancer.gov/study/summary?id=openpedcan_v15',
  'phs000471': 'https://cbioportal.ccdi.cancer.gov/study/summary?id=openpedcan_v15',
  'phs001437': 'https://cbioportal.ccdi.cancer.gov/study/summary?id=openpedcan_v15',
  'phs002276': 'https://cbioportal.ccdi.cancer.gov/study/summary?id=openpedcan_v15',
  'phs002517': 'https://cbioportal.ccdi.cancer.gov/study/summary?id=openpedcan_v15',
  'phs002790': 'https://cbioportal.ccdi.cancer.gov/study/summary?id=phs002790',
  'phs002883': 'https://cbioportal.ccdi.cancer.gov/study/summary?id=openpedcan_v15',
  'phs003432': 'https://cbioportal.ccdi.cancer.gov/study/summary?id=openpedcan_v15',
  'phs003519': 'https://cbioportal.ccdi.cancer.gov/study/summary?id=openpedcan_v15',
};

const studyClinicalDataLinks = {
  phs000463: [
    'https://d2l5jy2ao2mx5b.cloudfront.net/target/phs000463/TARGET_ALL_ClinicalData_Phase_I_20190325.xlsx',
  ],
  phs000464: [
    'https://d2l5jy2ao2mx5b.cloudfront.net/target/phs000464/TARGET_ALL_ClinicalData_Phase_II_Discovery_20211118.xlsx',
    'https://d2l5jy2ao2mx5b.cloudfront.net/target/phs000464/TARGET_ALL_ClinicalData_Phase_II_Validation_20211118.xlsx',
    'https://d2l5jy2ao2mx5b.cloudfront.net/target/phs000464/TARGET_ALL_ClinicalData_Phase_III_20181213.xlsx',
  ],
  phs000465: [
    'https://d2l5jy2ao2mx5b.cloudfront.net/target/phs000465/TARGET_AML_ClinicalData_Discovery_20211201.xlsx',
    'https://d2l5jy2ao2mx5b.cloudfront.net/target/phs000465/TARGET_AML_ClinicalData_Validation_20211201.xlsx',
  ],
  phs000466: [
    'https://d2l5jy2ao2mx5b.cloudfront.net/target/phs000466/TARGET_CCSK_ClinicalData_Discovery_20170525.xlsx',
  ],
  phs000467: [
    'https://d2l5jy2ao2mx5b.cloudfront.net/target/phs000467/TARGET_NBL_ClinicalData_Discovery_20220125.xlsx',
    'https://d2l5jy2ao2mx5b.cloudfront.net/target/phs000467/TARGET_NBL_ClinicalData_Validation_20220125.xlsx',
  ],
  phs000468: [
    'https://d2l5jy2ao2mx5b.cloudfront.net/target/phs000468/TARGET_OS_ClinicalData_Discovery_20210520.xlsx',
    'https://d2l5jy2ao2mx5b.cloudfront.net/target/phs000468/TARGET_OS_ClinicalData_Validation_20211108.xlsx',
  ],
  phs000469: [
    'https://d2l5jy2ao2mx5b.cloudfront.net/target/phs000469/TARGET_MDLS-NBL_ClinicalData_20151124.xlsx',
  ],
  phs000470: [
    'https://d2l5jy2ao2mx5b.cloudfront.net/target/phs000470/TARGET_RT_ClinicalData_Discovery_20211111.xlsx',
    'https://d2l5jy2ao2mx5b.cloudfront.net/target/phs000470/TARGET_RT_ClinicalData_Validation_20211111.xlsx',
  ],
  phs000471: [
    'https://d2l5jy2ao2mx5b.cloudfront.net/target/phs000471/TARGET_WT_ClinicalData_Discovery_20211111.xlsx',
    'https://d2l5jy2ao2mx5b.cloudfront.net/target/phs000471/TARGET_WT_ClinicalData_Validation_20211111.xlsx',
  ],
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
        num_of_diagnoses
        num_of_files
        num_of_study_files
        num_of_participant_files
        num_of_sample_files
        num_of_publications
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
    pagination: false,
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
      dataField: 'data_availability',
      header: 'Data Availability',
      headerType: headerTypes.CUSTOM_ELEM,
      customColHeaderRender: () => <DataAvailabilityHeader />,
      tooltipText: 'Data Availability',
      cellType: cellTypes.STUDIES,
      sortable: false,
      display: true,
      customCellData: {
        width: '400px',
        fields: [
          'num_of_study_files',
          'num_of_participant_files',
          'num_of_sample_files',
          'num_of_publications'
        ]
      }
    },
    {
      dataField: 'num_of_participants',
      header: 'Participants Count',
      tooltipText: 'Sort by Participants Count',
      display: true,
    },
    {
      dataField: 'num_of_diagnoses',
      header: 'Diagnosis Count',
      tooltipText: 'Sort by Diagnosis Count',
      display: true,
    },
    {
      dataField: 'num_of_samples',
      header: 'Samples Count',
      tooltipText: 'Sort by Sample Count',
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
  studyDownloadLinks,
  studycBioPortalLinks,
  studyClinicalDataLinks,
};
