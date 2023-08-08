/* eslint-disable */
import gql from 'graphql-tag';
import { cellTypes } from '@bento-core/table';
import { customCasesTabDownloadCSV, customFilesTabDownloadCSV, customSamplesTabDownloadCSV } from './tableDownloadCSV';
import { dataFormatTypes } from '@bento-core/table';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
  0: 'Click button to add selected files associated with the selected participant(s).',
  1: 'Click button to add selected files associated with the selected sample(s).',
  2: 'Click button to add selected files.',
  Participants: 'Click button to add selected files associated with the selected participant(s).',
  Samples: 'Click button to add selected files associated with the selected sample(s).',
  Files: 'Click button to add selected files.',
  arrow: true,
  styles: {
    border: '#03A383 1px solid',
  }
};

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};


// --------------- Tabs Header Data configuration --------------
export const tabs = [
  {
    id: 'participant_tab',
    title: 'Participants',
    dataField: 'dataParticipant',
    count: 'numberOfParticipants',
  },
  {
    id: 'sample_tab',
    title: 'Samples',
    dataField: 'dataSample',
    count: 'numberOfSamples',
  },
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
    title: 'Participants',
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
  {
    title: 'Files',
    primaryColor: '#F7D7F7',
    secondaryColor: '#86D6F0',
    selectedColor: '#C92EC7',
  },
];

export const DASHBOARD_QUERY_NEW = gql`
query search (          
    $participant_ids: [String],
    $gender: [String] ,
    $race: [String] ,
    $ethnicity: [String] ,
    $age_at_diagnosis: [Int] ,
    $diagnosis_anatomic_site: [String] ,
    $disease_phase: [String] ,
    $diagnosis_icd_o: [String] ,
    $vital_status: [String] ,
    $sample_anatomic_site: [String] ,
    $participant_age_at_collection: [Int] ,
    $sample_tumor_status: [String] ,
    $tumor_classification: [String] ,
    $assay_method: [String],
    $file_type: [String],
    $phs_accession: [String],
    $grant_id: [String],
    $institution: [String],
    $study_acronym: [String],
    $study_short_title: [String],
    $library_selection: [String],
    $library_source: [String],
    $library_strategy: [String],
){
    searchParticipants (          
        participant_ids: $participant_ids,
        gender: $gender,
        race: $race,
        ethnicity: $ethnicity,
        age_at_diagnosis: $age_at_diagnosis,
        diagnosis_anatomic_site: $diagnosis_anatomic_site,
        disease_phase: $disease_phase,
        diagnosis_icd_o: $diagnosis_icd_o,
        vital_status: $vital_status,
        sample_anatomic_site: $sample_anatomic_site,
        participant_age_at_collection: $participant_age_at_collection,
        sample_tumor_status: $sample_tumor_status,
        tumor_classification: $tumor_classification,
        assay_method: $assay_method,
        file_type: $file_type,
        phs_accession: $phs_accession,       
        grant_id: $grant_id,
        institution: $institution,
        study_acronym: $study_acronym,
        study_short_title: $study_short_title,
        library_selection: $library_selection,
        library_source: $library_source,
        library_strategy: $library_strategy,
    ) {
        numberOfFiles
        numberOfParticipants
        numberOfSamples
        numberOfStudies
        participantCountByDiagnosis {
            group
            subjects
        }
        participantCountByDiagnosisAge {
            group
            subjects
        }
        participantCountByEthnicity {
            group
            subjects
        }
        participantCountByGender {
            group
            subjects
        }
        participantCountByRace {
            group
            subjects
        }
        participantCountByStudy {
            group
            subjects
        }
        filterParticipantCountByAcronym {
            group
            subjects
        }
        filterParticipantCountByAssayMethod{
            group
            subjects
        }
        filterParticipantCountByDiagnosisAnatomicSite{
            group
            subjects
        }
        filterParticipantCountByDiseasePhase{
            group
            subjects
        }
        filterParticipantCountByEthnicity{
            group
            subjects
        }
        filterParticipantCountByFileType{
            group
            subjects
        }
        filterParticipantCountByGender{
            group
            subjects
        }
        filterParticipantCountByGrantID{
            group
            subjects
        }
        filterParticipantCountByICDO{
            group
            subjects
        }
        filterParticipantCountByInstitution{
            group
            subjects
        }
        filterParticipantCountByLibrarySelection{
            group
            subjects
        }
        filterParticipantCountByLibrarySource{
            group
            subjects
        }
        filterParticipantCountByLibraryStrategy{
            group
            subjects
        }
        filterParticipantCountByPHSAccession{
            group
            subjects
        }
        filterParticipantCountByRace{
          group
          subjects
        }
        filterParticipantCountBySampleAnatomicSite{
          group
          subjects
        }
        filterParticipantCountByStudyTitle{
          group
          subjects
        }
        filterParticipantCountByTumorClassification{
          group
          subjects
        }
        filterParticipantCountByTumorStatus{
          group
          subjects
        }
        filterParticipantCountByVitalStatus{
          group
          subjects
        }
        filterParticipantCountByDiagnosisAge{
            lowerBound
            upperBound
            subjects
        }
        filterParticipantCountBySampleAge{
          lowerBound
          upperBound
          subjects
      }
    }
}
`;

export const GET_FILES_OVERVIEW_QUERY = gql`
query fileOverview(
    $participant_ids: [String],
    $file_ids: [String],
    $programs: [String] ,
    $studies: [String] ,
    $diagnoses: [String] ,
    $rc_scores: [String] ,
    $tumor_sizes: [String] ,
    $chemo_regimen: [String] ,
    $tumor_grades: [String] ,
    $er_status: [String] ,
    $pr_status: [String] ,
    $endo_therapies: [String] ,
    $meno_status: [String] ,
    $tissue_type: [String],
    $composition: [String],
    $association: [String],
    $file_type: [String],
    $age_at_index: [Float],
    $first: Int, 
    $offset: Int, 
    $order_by:  String
    $sort_direction: String ){
    fileOverview(
        participant_ids: $participant_ids,
        file_ids: $file_ids,
        programs: $programs,
        studies: $studies,
        diagnoses: $diagnoses,
        rc_scores: $rc_scores,
        tumor_sizes: $tumor_sizes,
        chemo_regimen: $chemo_regimen,
        tumor_grades: $tumor_grades,
        er_status: $er_status,
        pr_status: $pr_status,
        endo_therapies: $endo_therapies,
        meno_status: $meno_status,
        tissue_type: $tissue_type,
        composition: $composition,
        association: $association,       
        file_type: $file_type,
        age_at_index: $age_at_index,
        first: $first, 
        offset: $offset, 
        order_by: $order_by,
        sort_direction: $sort_direction
    ){
        file_id,
        program_id,
        file_name,
        association,
        file_description,
        file_format,
        file_size,
        program,
        arm,
        acl,
        participant_id,
        sample_id,
        diagnosis,
    }
}
`;

export const GET_SAMPLES_OVERVIEW_QUERY = gql`
query sampleOverview(
    $participant_ids: [String],
    $gender: [String] ,
    $race: [String] ,
    $ethnicity: [String] ,
    $age_at_diagnosis: [Int] ,
    $diagnosis_anatomic_site: [String] ,
    $disease_phase: [String] ,
    $diagnosis_icd_o: [String] ,
    $vital_status: [String] ,
    $sample_anatomic_site: [String] ,
    $participant_age_at_collection: [Int] ,
    $sample_tumor_status: [String] ,
    $tumor_classification: [String] ,
    $assay_method: [String],
    $file_type: [String],
    $phs_accession: [String],
    $grant_id: [String],
    $institution: [String],
    $study_acronym: [String],
    $study_short_title: [String],
    $library_selection: [String],
    $library_source: [String],
    $library_strategy: [String],
    $first: Int, 
    $offset: Int, 
    $order_by: String,
    $sort_direction: String ){
    sampleOverview(
        participant_ids: $participant_ids,
        gender: $gender,
        race: $race,
        ethnicity: $ethnicity,
        age_at_diagnosis: $age_at_diagnosis,
        diagnosis_anatomic_site: $diagnosis_anatomic_site,
        disease_phase: $disease_phase,
        diagnosis_icd_o: $diagnosis_icd_o,
        vital_status: $vital_status,
        sample_anatomic_site: $sample_anatomic_site,
        participant_age_at_collection: $participant_age_at_collection,
        sample_tumor_status: $sample_tumor_status,
        tumor_classification: $tumor_classification,
        assay_method: $assay_method,
        file_type: $file_type,
        phs_accession: $phs_accession,       
        grant_id: $grant_id,
        institution: $institution,
        study_acronym: $study_acronym,
        study_short_title: $study_short_title,
        library_selection: $library_selection,
        library_source: $library_source,
        library_strategy: $library_strategy,
        first: $first, 
        offset: $offset, 
        order_by: $order_by,
        sort_direction: $sort_direction
    ){
        sample_id,
        participant_id,
        study_id,
        anatomic_site,
        participant_age_at_collection,
        diagnosis_icd_o,
        sample_tumor_status,
        tumor_classification,
    }
}
`;

export const GET_PARTICIPANTS_OVERVIEW_QUERY = gql`
query participantOverview(
    $participant_ids: [String],
    $gender: [String] ,
    $race: [String] ,
    $ethnicity: [String] ,
    $age_at_diagnosis: [Int] ,
    $diagnosis_anatomic_site: [String] ,
    $disease_phase: [String] ,
    $diagnosis_icd_o: [String] ,
    $vital_status: [String] ,
    $sample_anatomic_site: [String] ,
    $participant_age_at_collection: [Int] ,
    $sample_tumor_status: [String] ,
    $tumor_classification: [String] ,
    $assay_method: [String],
    $file_type: [String],
    $phs_accession: [String],
    $grant_id: [String],
    $institution: [String],
    $study_acronym: [String],
    $study_short_title: [String],
    $library_selection: [String],
    $library_source: [String],
    $library_strategy: [String],
    $first: Int, 
    $offset: Int, 
    $order_by: String,
    $sort_direction: String ){
    participantOverview(
        participant_ids: $participant_ids,
        gender: $gender,
        race: $race,
        ethnicity: $ethnicity,
        age_at_diagnosis: $age_at_diagnosis,
        diagnosis_anatomic_site: $diagnosis_anatomic_site,
        disease_phase: $disease_phase,
        diagnosis_icd_o: $diagnosis_icd_o,
        vital_status: $vital_status,
        sample_anatomic_site: $sample_anatomic_site,
        participant_age_at_collection: $participant_age_at_collection,
        sample_tumor_status: $sample_tumor_status,
        tumor_classification: $tumor_classification,
        assay_method: $assay_method,
        file_type: $file_type,
        phs_accession: $phs_accession,       
        grant_id: $grant_id,
        institution: $institution,
        study_acronym: $study_acronym,
        study_short_title: $study_short_title,
        library_selection: $library_selection,
        library_source: $library_source,
        library_strategy: $library_strategy,
        first: $first, 
        offset: $offset, 
        order_by: $order_by,
        sort_direction: $sort_direction
    ) {
        participant_id
        phs_accession
        race
        gender
        ethnicity
    }
}
`;

export const GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL = gql`
query search (          
  $participant_ids: [String],
){
  fileIDsFromList (          
      participant_ids: $participant_ids,
  ) 
}
  `;

export const GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL = gql`
query search (          
  $participant_ids: [String],
){
  fileIDsFromList (          
      participant_ids: $participant_ids,
  ) 
}
  `;

export const GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL = gql`
query search (          
  $file_names: [String] 
){
  fileIDsFromList (          
      file_names: $file_names
  ) 
}
  `;

export const GET_ALL_FILEIDS_FROM_CASESTAB_FOR_ADD_ALL_CART = gql`
query subjectsAddAllToCart(
  $participant_ids: [String],
  $programs: [String] ,
  $studies: [String] ,
  $diagnoses: [String] ,
  $rc_scores: [String] ,
  $tumor_sizes: [String] ,
  $chemo_regimen: [String] ,
  $tumor_grades: [String] ,
  $er_status: [String] ,
  $pr_status: [String] ,
  $endo_therapies: [String] ,
  $meno_status: [String] ,
  $tissue_type: [String],
  $composition: [String],
  $association: [String],
  $file_type: [String],
  $age_at_index: [Float],
  $first: Int,
  $offset: Int= 0, 
  $order_by: String = "file_id",
  $sort_direction: String = "asc" 
  ){
    participantOverview(
      participant_ids: $participant_ids,
      programs: $programs,
      studies: $studies,
      diagnoses: $diagnoses,
      rc_scores: $rc_scores,
      tumor_sizes: $tumor_sizes,
      chemo_regimen: $chemo_regimen,
      tumor_grades: $tumor_grades,
      er_status: $er_status,
      pr_status: $pr_status,
      endo_therapies: $endo_therapies,
      meno_status: $meno_status,
      tissue_type: $tissue_type,
      composition: $composition,
      association: $association,
      file_type: $file_type,
      age_at_index: $age_at_index,
      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
      ) {
      files
  }
}
    `;

export const GET_ALL_FILEIDS_FROM_SAMPLETAB_FOR_ADD_ALL_CART = gql`
    query samplesAddAllToCart(
      $participant_ids: [String],
      $sample_ids: [String],
      $programs: [String] ,
      $studies: [String] ,
      $diagnoses: [String] ,
      $rc_scores: [String] ,
      $tumor_sizes: [String] ,
      $chemo_regimen: [String] ,
      $tumor_grades: [String] ,
      $er_status: [String] ,
      $pr_status: [String] ,
      $endo_therapies: [String] ,
      $meno_status: [String] ,
      $tissue_type: [String],
      $composition: [String],
      $association: [String],
      $file_type: [String],
      $age_at_index: [Float],
      $first: Int,
      $offset: Int= 0, 
      $order_by: String = "file_id",
      $sort_direction: String = "asc" ){
      sampleOverview(
          participant_ids: $participant_ids,
          sample_ids: $sample_ids,
          programs: $programs,
          studies: $studies,
          diagnoses: $diagnoses,
          rc_scores: $rc_scores,
          tumor_sizes: $tumor_sizes,
          chemo_regimen: $chemo_regimen,
          tumor_grades: $tumor_grades,
          er_status: $er_status,
          pr_status: $pr_status,
          endo_therapies: $endo_therapies,
          meno_status: $meno_status,
          tissue_type: $tissue_type,
          composition: $composition,
          association: $association,
          file_type: $file_type,
          age_at_index: $age_at_index,
          first: $first,
          offset: $offset,
          order_by: $order_by,
          sort_direction: $sort_direction
          ) {
          files
      }
    }
        `;

export const GET_ALL_FILEIDS_FROM_FILESTAB_FOR_ADD_ALL_CART = gql`
query fileAddAllToCart(
  $participant_ids: [String],
  $programs: [String] ,
  $studies: [String] ,
  $diagnoses: [String] ,
  $rc_scores: [String] ,
  $tumor_sizes: [String] ,
  $chemo_regimen: [String] ,
  $tumor_grades: [String] ,
  $er_status: [String] ,
  $pr_status: [String] ,
  $endo_therapies: [String] ,
  $meno_status: [String] ,
  $tissue_type: [String],
  $composition: [String],
  $association: [String],
  $file_type: [String],
  $age_at_index: [Float],
  $first: Int,
  $offset: Int= 0, 
  $order_by: String = "file_id",
  $sort_direction: String = "asc"
 ){
  fileOverview(
      participant_ids:$participant_ids,
      programs: $programs,
      studies: $studies,
      diagnoses: $diagnoses,
      rc_scores: $rc_scores,
      tumor_sizes: $tumor_sizes,
      chemo_regimen: $chemo_regimen,
      tumor_grades: $tumor_grades,
      er_status: $er_status,
      pr_status: $pr_status,
      endo_therapies: $endo_therapies,
      meno_status: $meno_status,
      tissue_type: $tissue_type,
      composition: $composition,
      association: $association,       
      file_type: $file_type,
      age_at_index: $age_at_index,
      first: $first, 
      offset: $offset, 
      order_by: $order_by,
      sort_direction: $sort_direction
  ){
      file_id,
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

// --------------- Tabs Table configuration --------------
export const tabContainers = [
  {
    name: 'Participants',
    dataField: 'dataParticipant',
    api: GET_PARTICIPANTS_OVERVIEW_QUERY,
    paginationAPIField: 'participantOverview',
    count: 'numberOfParticipants',
    dataKey: 'participant_id',
    defaultSortField: 'participant_id',
    defaultSortDirection: 'asc',
    buttonText: 'Add Selected Files',
    tableID: 'participant_tab_table',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
    },
    columns: [
      {
        cellType: cellTypes.CHECKBOX,
        display: true,
        role: cellTypes.CHECKBOX,
      },
      {
        dataField: 'participant_id',
        header: 'Participant ID',
        cellType: cellTypes.LINK,
        linkAttr : {
          rootPath: '/participant',
          pathParams: ['participant_id'],
        },
        display: true,
        tooltipText: 'sort',
      },
      {
        dataField: 'phs_accession',
        header: 'Study Accession',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'race',
        header: 'Race',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'gender',
        header: 'Gender',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'ethnicity',
        header: 'Ethnicity',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
    ],
    id: 'participant_tab',
    tableID: 'participant_tab_table',
    tableDownloadCSV: customCasesTabDownloadCSV,
    tabIndex: '0',
    downloadFileName: 'Bento_Dashboard_participants_download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    addFilesRequestVariableKey: 'participant_ids',
    addFilesResponseKeys: ['fileIDsFromList'],
    addAllFilesResponseKeys: ['participantOverview', 'files'],
    addAllFileQuery: GET_ALL_FILEIDS_FROM_CASESTAB_FOR_ADD_ALL_CART,
    addSelectedFilesQuery: GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL,
  },
  {
    name: 'Samples',
    dataField: 'dataSample',
    api: GET_SAMPLES_OVERVIEW_QUERY,
    count: 'numberOfSamples',
    paginationAPIField: 'sampleOverview',
    dataKey: 'sample_id',
    defaultSortField: 'sample_id',
    defaultSortDirection: 'asc',
    tableID: 'sample_tab_table',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
    },
    saveButtonDefaultStyle: {
      color: '#fff',
      backgroundColor: '#00AEEF',
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
        cellType: cellTypes.CHECKBOX,
        display: true,
        role: cellTypes.CHECKBOX,
      },
      {
        dataField: 'sample_id',
        header: 'Sample ID',
        display: true,
        tooltipText: 'sort',
      },
      {
        dataField: 'participant_id',
        header: 'Particpant ID',
        link: '/participant/{participant_id}',
        cellType: cellTypes.LINK,
        linkAttr : {
          rootPath: '/participant',
          pathParams: ['participant_id'],
        },
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'program',
        header: 'Program Code',
        cellType: cellTypes.LINK,
        tooltipText: 'sort',
        linkAttr : {
          rootPath: '/program',
          pathParams: ['program_id'],
        },
        display: true,
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'program_id',
        header: 'Program ID',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'arm',
        header: 'Arm',
        link: '/arm/{arm}',
        cellType: cellTypes.LINK,
        linkAttr : {
          rootPath: '/arm',
          pathParams: ['arm'],
        },
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
        dataField: 'tissue_type',
        header: 'Tissue Type',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'tissue_composition',
        header: 'Tissue Composition',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'sample_anatomic_site',
        header: 'Sample Anatomic Site',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'sample_procurement_method',
        header: 'Sample Procurement Method',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'platform',
        header: 'platform',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
    ],
    id: 'sample_tab',
    tableID: 'sample_tab_table',
    tabIndex: '1',
    tableDownloadCSV: customSamplesTabDownloadCSV,
    downloadFileName: 'Bento_Dashboard_participants_download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    addFilesRequestVariableKey: 'sample_ids',
    addFilesResponseKeys: ['fileIDsFromList'],
    addAllFilesResponseKeys: ['sampleOverview', 'files'],
    addAllFileQuery: GET_ALL_FILEIDS_FROM_SAMPLETAB_FOR_ADD_ALL_CART,
    addSelectedFilesQuery: GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL,
  },
  {
    name: 'Files',
    dataField: 'dataFile',
    api: GET_FILES_OVERVIEW_QUERY,
    paginationAPIField: 'fileOverview',
    defaultSortField: 'file_name',
    defaultSortDirection: 'asc',
    count: 'numberOfFiles',
    dataKey: 'file_name',
    tableID: 'file_tab_table',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
    },
    columns: [
      {
        cellType: cellTypes.CHECKBOX,
        display: true,
        role: cellTypes.CHECKBOX,
      },
      {
        dataField: 'file_name',
        header: 'File Name',
        display: true,
        tooltipText: 'sort',
      },
      {
        dataField: 'file_id',
        header: 'File ID',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'association',
        header: 'Association',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'file_description',
        header: 'Description',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'file_format',
        header: 'File Format',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'file_size',
        header: 'Size',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        dataFormatType: dataFormatTypes.FORMAT_BYTES,
        cellType: cellTypes.FORMAT_DATA,
      },
      {
        dataField: 'acl', // This need to left empty if no data need to be displayed before file download icon
        header: 'Access',
        display: true,
        cellType: cellTypes.CUSTOM_ELEM,
        downloadDocument: true, // To indicate that column is document donwload
        documentDownloadProps: {
          // Max file size needs to bin Bytes to seperate two support file preview and download
          maxFileSize: 315,
          // Tool top text for Unauthenticated users
          toolTipTextUnauthenticated: 'Controlled access file',
          // Tool top text for file download
          toolTipTextFileDownload: 'Download a copy of this file',
          // Tool top text for file preview
          toolTipTextFilePreview: 'Because of its size and/or format, this file is unavailable for download and must be accessed via the My Files workflow',
          // datafield where file file column exists in the table
          fileSizeColumn: 'file_size',
          // datafield where file file id exists in the table which is used to get file location
          fileLocationColumn: 'file_id',
          // datafield where file format exists in the table
          fileFormatColumn: 'file_format',
          // datafield where file case id exists in the table which is used to get file information
          participantIdColumn: 'participant_id',
          // Unauthenticated lock icon
          iconUnauthenticated: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Access_Lock.svg',
          // file download icon
          iconFileDownload: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadPDF.svg',
          // file preview icon
          iconFilePreview: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadCloud.svg',
          // file viewer icon JBrowse
          iconFileViewer: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadBAM.svg',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'program',
        header: 'Program Code',
        link: '/program/{program_id}',
        cellType: cellTypes.LINK,
        linkAttr : {
          rootPath: '/program',
          pathParams: ['program_id'],
        },
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'program_id',
        header: 'Program ID',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'arm',
        header: 'Arm',
        link: '/arm/{arm}',
        cellType: cellTypes.LINK,
        linkAttr : {
          rootPath: '/arm',
          pathParams: ['arm'],
        },
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'participant_id',
        header: 'Participant ID',
        link: '/participant/{participant_id}',
        cellType: cellTypes.LINK,
        linkAttr : {
          rootPath: '/participant',
          pathParams: ['participant_id'],
        },
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'sample_id',
        header: 'Sample ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
    ],
    id: 'file_tab',
    tableID: 'file_tab_table',
    selectableRows: true,
    tableDownloadCSV: customFilesTabDownloadCSV,
    downloadFileName: 'Bento_Dashboard_participants_download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    addFilesRequestVariableKey: 'file_names',
    addFilesResponseKeys: ['fileIDsFromList'],
    addAllFilesResponseKeys: ['fileOverview', 'file_id'],
    addAllFileQuery: GET_ALL_FILEIDS_FROM_FILESTAB_FOR_ADD_ALL_CART,
    addSelectedFilesQuery: GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL,
  },
];

  