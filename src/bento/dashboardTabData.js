/* eslint-disable */
import gql from 'graphql-tag';
import { cellTypes, cellStyles } from '@bento-core/table';
import { customParticipantsTabDownloadCSV, customFilesTabDownloadCSV, customSamplesTabDownloadCSV, customStudyTabDownloadCSV } from './tableDownloadCSV';
import { dataFormatTypes } from '@bento-core/table';
import questionIcon from '../assets/icons/Question_Icon.svg';

// --------------- Tooltip configuration --------------
export const tooltipContentAddAll = {
  icon: questionIcon,
  alt: 'tooltipIcon',
  Participants: 'Click button to add all files associated with the filtered row(s).',
  Studies: 'Click button to add all files associated with the filtered row(s).',
  Samples: 'Click button to add all files associated with the filtered row(s).',
  Files: 'Click button to add all files associated with the filtered row(s).',
  arrow: true,
  styles: {
    border: '#03A383 1px solid',
  }
};

export const tooltipContent = {
  icon: questionIcon,
  alt: 'tooltipIcon',
  Participants: 'Click button to add files associated with the selected row(s).',
  Studies: 'Click button to add files associated with the selected row(s).',
  Samples: 'Click button to add files associated with the selected row(s).',
  Files: 'Click button to add files associated with the selected row(s).',
  arrow: true,
  styles: {
    border: '#03A383 1px solid',
  }
};
export const tooltipContentAddToNewCohort = {
  icon: questionIcon,
  alt: 'tooltipIcon',
  Participants: 'Create a new cohort using the selected Participant IDs',
  Studies: 'Create a new cohort using the selected Participant IDs',
  Treatment: 'Create a new cohort using the selected Participant IDs',
  Survival: 'Create a new cohort using the selected Participant IDs ',
  "Treatment Response": 'Create a new cohort using the selected Participant IDs',
  arrow: true,
  styles: {
    border: '1px red solid'
  }
}

export const tooltipContentAddToExistingCohort = {
  icon: questionIcon,
  alt: 'tooltipIcon',
  Participants: 'Add selected Participant IDs to an existing cohort',
  Studies: 'Add selected Participant IDs to an existing cohort',
  Survival: 'Add selected Participant IDs to an existing cohort',
  Treatment: 'Add selected Participant IDs to an existing cohort',
  "Treatment Response": 'Add selected Participant IDs to an existing cohort',
  arrow: true,
  styles: {
  }
}

export const tooltipContentListAll = {
  icon: questionIcon,
  alt: 'tooltipIcon',
  Participants: 'Click to view the complete list of all cohorts',
  Studies: 'Click to view the complete list of all cohorts',
  Treatment: 'Click to view the complete list of all cohorts',
  Survival: 'Click to view the complete list of all cohorts',
  "Treatment Response": 'Click to view the complete list of all cohorts',
  arrow: true,
  styles: {
  }
}

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
    id: 'study_tab',
    title: 'Studies',
    dataField: 'dataStudy',
    count: 'numberOfStudies',
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
  {
    title: 'Studies',
    primaryColor: '#F7D7F7',
    secondaryColor: '#86D6F0',
    selectedColor: '#C92EC7',
  },
];

export const DASHBOARD_QUERY_NEW = gql`
query search (          
    $participant_ids: [String],
    $sex_at_birth: [String] ,
    $race: [String] ,
    $age_at_diagnosis: [Int] ,
    $diagnosis_anatomic_site: [String] ,
    $disease_phase: [String] ,
    $diagnosis: [String] ,
    $diagnosis_classification_system: [String] ,
    $diagnosis_basis: [String] ,
    $last_known_survival_status: [String] ,
    $age_at_last_known_survival_status: [Int],
    $first_event: [String],
    $treatment_type: [String],
    $treatment_agent: [String],
    $age_at_treatment_start: [Int] ,
    $response_category: [String] ,
    $age_at_response: [Int] ,
    $sample_anatomic_site: [String] ,
    $participant_age_at_collection: [Int] ,
    $sample_tumor_status: [String] ,
    $tumor_classification: [String] ,
    $data_category: [String],
    $file_type: [String],
    $dbgap_accession: [String],
    $study_name: [String],
    $study_status: [String],
    $library_selection: [String],
    $library_source_material: [String],
    $library_source_molecule: [String],
    $library_strategy: [String],
    $file_mapping_level: [String],
){
    searchParticipants (          
        participant_ids: $participant_ids,
        sex_at_birth: $sex_at_birth,
        race: $race,
        age_at_diagnosis: $age_at_diagnosis,
        diagnosis_anatomic_site: $diagnosis_anatomic_site,
        disease_phase: $disease_phase,
        diagnosis: $diagnosis,
        diagnosis_classification_system: $diagnosis_classification_system,
        diagnosis_basis: $diagnosis_basis,
        last_known_survival_status: $last_known_survival_status,
        age_at_last_known_survival_status: $age_at_last_known_survival_status,
        first_event: $first_event,
        treatment_type: $treatment_type,
        treatment_agent: $treatment_agent,
        age_at_treatment_start: $age_at_treatment_start,
        response_category: $response_category,
        age_at_response: $age_at_response,
        sample_anatomic_site: $sample_anatomic_site,
        participant_age_at_collection: $participant_age_at_collection,
        sample_tumor_status: $sample_tumor_status,
        tumor_classification: $tumor_classification,
        data_category: $data_category,
        file_type: $file_type,
        dbgap_accession: $dbgap_accession,       
        study_name: $study_name,
        study_status: $study_status,
        library_selection: $library_selection,
        library_source_material: $library_source_material,
        library_source_molecule: $library_source_molecule,
        library_strategy: $library_strategy,
        file_mapping_level: $file_mapping_level,
    ) {
        numberOfDiagnosis
        numberOfFiles
        numberOfParticipants
        numberOfSamples
        numberOfStudies
        participantsFileCount
        diagnosisFileCount
        samplesFileCount
        studiesFileCount
        filesFileCount
        participantCountByDiagnosis {
            group
            subjects
        }
        participantCountByDiagnosisAge {
            group
            subjects
        }
        participantCountBySexAtBirth {
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
        participantCountByDataCategory{
            group
            subjects
        }
        filterParticipantCountByDataCategory{
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
        filterParticipantCountByFileType{
            group
            subjects
        }
        filterParticipantCountBySexAtBirth{
            group
            subjects
        }
        filterParticipantCountByDiagnosis{
            group
            subjects
        }
        filterParticipantCountByDiagnosisClassificationSystem{
            group
            subjects
        }
        filterParticipantCountByDiagnosisVerificationStatus{
            group
            subjects
        }
        filterParticipantCountByDiagnosisBasis{
          group
          subjects
        }
        filterParticipantCountByLibrarySelection{
            group
            subjects
        }
        filterParticipantCountByTumorGradeSource{
            group
            subjects
        }
        filterParticipantCountByTumorStageSource{
            group
            subjects
        }
        filterParticipantCountByLibrarySourceMaterial{
            group
            subjects
        }
        filterParticipantCountByLibrarySourceMolecule{
            group
            subjects
        }
        filterParticipantCountByLibraryStrategy{
            group
            subjects
        }
        filterParticipantCountByFileMappingLevel{
            group
            subjects
        }
        filterParticipantCountByDBGAPAccession{
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
        filterParticipantCountByStudyStatus{
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
        filterParticipantCountBySurvivalStatus{
          group
          subjects
        } 
        filterParticipantCountByFirstEvent{
          group
          subjects
        }
        filterParticipantCountByTreatmentType{
          group
          subjects
        }
        filterParticipantCountByTreatmentAgent{
          group
          subjects
        }
        filterParticipantCountByResponseCategory{
          group
          subjects
        }
        filterParticipantCountByAgeAtResponse{
          lowerBound
          upperBound
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
      filterParticipantCountByAgeAtLastKnownSurvivalStatus{
          lowerBound
          upperBound
          subjects
      }
      filterParticipantCountByAgeAtTreatmentStart {
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
    $sex_at_birth: [String] ,
    $race: [String] ,
    $age_at_diagnosis: [Int] ,
    $diagnosis_anatomic_site: [String] ,
    $disease_phase: [String] ,
    $diagnosis: [String] ,
    $diagnosis_classification_system: [String] ,
    $diagnosis_basis: [String] ,
    $last_known_survival_status: [String] ,
    $age_at_last_known_survival_status: [Int],
    $first_event: [String],
    $treatment_type: [String],
    $treatment_agent: [String],
    $age_at_treatment_start: [Int] ,
    $response_category: [String] ,
    $age_at_response: [Int] ,
    $sample_anatomic_site: [String] ,
    $participant_age_at_collection: [Int] ,
    $sample_tumor_status: [String] ,
    $tumor_classification: [String] ,
    $data_category: [String],
    $file_type: [String],
    $dbgap_accession: [String],
    $study_name: [String],
    $study_status: [String],
    $library_selection: [String],
    $library_source_material: [String],
    $library_source_molecule: [String],
    $library_strategy: [String],
    $file_mapping_level: [String],
    $first: Int, 
    $offset: Int, 
    $order_by: String,
    $sort_direction: String ){
    fileOverview(
        participant_ids: $participant_ids,
        sex_at_birth: $sex_at_birth,
        race: $race,
        age_at_diagnosis: $age_at_diagnosis,
        diagnosis_anatomic_site: $diagnosis_anatomic_site,
        disease_phase: $disease_phase,
        diagnosis: $diagnosis,
        diagnosis_classification_system: $diagnosis_classification_system,
        diagnosis_basis: $diagnosis_basis,
        last_known_survival_status: $last_known_survival_status,
        age_at_last_known_survival_status: $age_at_last_known_survival_status,
        first_event: $first_event,
        treatment_type: $treatment_type,
        treatment_agent: $treatment_agent,
        age_at_treatment_start: $age_at_treatment_start,
        response_category: $response_category,
        age_at_response: $age_at_response,
        sample_anatomic_site: $sample_anatomic_site,
        participant_age_at_collection: $participant_age_at_collection,
        sample_tumor_status: $sample_tumor_status,
        tumor_classification: $tumor_classification,
        data_category: $data_category,
        file_type: $file_type,
        dbgap_accession: $dbgap_accession,       
        study_name: $study_name,
        study_status: $study_status,
        library_selection: $library_selection,
        library_source_material: $library_source_material,
        library_source_molecule: $library_source_molecule,
        library_strategy: $library_strategy,
        file_mapping_level: $file_mapping_level
        first: $first, 
        offset: $offset, 
        order_by: $order_by,
        sort_direction: $sort_direction
    ){
        id
        file_name
        data_category
        file_description
        file_type
        file_size
        study_id
        participant_id
        sample_id
        file_id
        guid
        md5sum
        library_selection
        library_source_material
        library_source_molecule
        library_strategy
        file_access
        file_mapping_level
    }
}
`;

export const GET_COHORT_METADATA_QUERY = gql`
query cohortMetadata(
    $id: [String],
    $first: Int,
    $offset: Int,
    $order_by: String,
    $sort_direction: String
) {

cohortMetadata(
    id: $id,
    first: $first,
    offset: $offset,
    order_by: $order_by,
    sort_direction: $sort_direction
) {
    dbgap_accession

    participants {
        participant_id
        dbgap_accession  
        race
        sex_at_birth
        diagnoses {
            diagnosis_id
            diagnosis
            diagnosis_classification_system
            diagnosis_basis
            disease_phase
            anatomic_site
            age_at_diagnosis
        }
        survivals {
            survival_id
            age_at_event_free_survival_status
            age_at_last_known_survival_status
            cause_of_death
            event_free_survival_status
            first_event
            last_known_survival_status
        }
        treatments {
            treatment_id
            age_at_treatment_end
            age_at_treatment_start
            treatment_agent
            treatment_type
        }
        treatment_responses {    
            treatment_response_id
            age_at_response
            response
            response_category
            response_system
        }
        samples {
            sample_id
            anatomic_site
            participant_age_at_collection
            sample_tumor_status
            tumor_classification
        }
        files {
            file_name
            data_category
            file_description
            file_type
            file_size
            study_id
            participant_id
            sample_id
            file_id
            guid
            md5sum
            library_selection
            library_source_material
            library_source_molecule
            library_strategy
            file_access
            file_mapping_level
        }
    }
}}
`;

export const GET_COHORT_MANIFEST_QUERY = gql`
  query cohortManifest(
    $id: [String],
    $first: Int,
    $offset: Int,
    $order_by: String,
    $sort_direction: String) {
      cohortManifest(
        id: $id,
        first: $first,
        offset: $offset,
        order_by: $order_by,
        sort_direction: $sort_direction
      ) {
        participant_id
        dbgap_accession  
        race
        sex_at_birth
        diagnosis
      }
    }
`

export const GET_SAMPLES_OVERVIEW_QUERY = gql`
query sampleOverview(
    $participant_ids: [String],
    $sex_at_birth: [String] ,
    $race: [String] ,
    $age_at_diagnosis: [Int] ,
    $diagnosis_anatomic_site: [String] ,
    $disease_phase: [String] ,
    $diagnosis: [String] ,
    $diagnosis_classification_system: [String] ,
    $diagnosis_basis: [String] ,
    $last_known_survival_status: [String] ,
    $age_at_last_known_survival_status: [Int],
    $first_event: [String],
    $treatment_type: [String],
    $treatment_agent: [String],
    $age_at_treatment_start: [Int] ,
    $response_category: [String] ,
    $age_at_response: [Int] ,
    $sample_anatomic_site: [String] ,
    $participant_age_at_collection: [Int] ,
    $sample_tumor_status: [String] ,
    $tumor_classification: [String] ,
    $data_category: [String],
    $file_type: [String],
    $dbgap_accession: [String],
    $study_name: [String],
    $study_status: [String],
    $library_selection: [String],
    $library_source_material: [String],
    $library_source_molecule: [String],
    $library_strategy: [String],
    $file_mapping_level: [String],
    $first: Int, 
    $offset: Int, 
    $order_by: String,
    $sort_direction: String ){
    sampleOverview(
        participant_ids: $participant_ids,
        sex_at_birth: $sex_at_birth,
        race: $race,
        age_at_diagnosis: $age_at_diagnosis,
        diagnosis_anatomic_site: $diagnosis_anatomic_site,
        disease_phase: $disease_phase,
        diagnosis: $diagnosis,
        diagnosis_classification_system: $diagnosis_classification_system,
        diagnosis_basis: $diagnosis_basis,
        last_known_survival_status: $last_known_survival_status,
        age_at_last_known_survival_status: $age_at_last_known_survival_status,
        first_event: $first_event,
        treatment_type: $treatment_type,
        treatment_agent: $treatment_agent,
        age_at_treatment_start: $age_at_treatment_start,
        response_category: $response_category,
        age_at_response: $age_at_response,
        sample_anatomic_site: $sample_anatomic_site,
        participant_age_at_collection: $participant_age_at_collection,
        sample_tumor_status: $sample_tumor_status,
        tumor_classification: $tumor_classification,
        data_category: $data_category,
        file_type: $file_type,
        dbgap_accession: $dbgap_accession,       
        study_name: $study_name,
        study_status: $study_status,
        library_selection: $library_selection,
        library_source_material: $library_source_material,
        library_source_molecule: $library_source_molecule,
        library_strategy: $library_strategy,
        file_mapping_level: $file_mapping_level
        first: $first, 
        offset: $offset, 
        order_by: $order_by,
        sort_direction: $sort_direction
    ){
        id
        sample_id
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

export const GET_PARTICIPANTS_OVERVIEW_QUERY = gql`
query participantOverview(
    $participant_ids: [String],
    $sex_at_birth: [String] ,
    $race: [String] ,
    $age_at_diagnosis: [Int] ,
    $diagnosis_anatomic_site: [String] ,
    $disease_phase: [String] ,
    $diagnosis: [String] ,
    $diagnosis_classification_system: [String] ,
    $diagnosis_basis: [String] ,
    $last_known_survival_status: [String] ,
    $age_at_last_known_survival_status: [Int],
    $first_event: [String],
    $treatment_type: [String],
    $treatment_agent: [String],
    $age_at_treatment_start: [Int] ,
    $response_category: [String] ,
    $age_at_response: [Int] ,
    $sample_anatomic_site: [String] ,
    $participant_age_at_collection: [Int] ,
    $sample_tumor_status: [String] ,
    $tumor_classification: [String] ,
    $data_category: [String],
    $file_type: [String],
    $dbgap_accession: [String],
    $study_name: [String],
    $study_status: [String],
    $library_selection: [String],
    $library_source_material: [String],
    $library_source_molecule: [String],
    $library_strategy: [String],
    $file_mapping_level: [String],
    $first: Int, 
    $offset: Int, 
    $order_by: String,
    $sort_direction: String ){
    participantOverview(
        participant_ids: $participant_ids,
        sex_at_birth: $sex_at_birth,
        race: $race,
        age_at_diagnosis: $age_at_diagnosis,
        diagnosis_anatomic_site: $diagnosis_anatomic_site,
        disease_phase: $disease_phase,
        diagnosis: $diagnosis,
        diagnosis_classification_system: $diagnosis_classification_system,
        diagnosis_basis: $diagnosis_basis,
        last_known_survival_status: $last_known_survival_status,
        age_at_last_known_survival_status: $age_at_last_known_survival_status,
        first_event: $first_event,
        treatment_type: $treatment_type,
        treatment_agent: $treatment_agent,
        age_at_treatment_start: $age_at_treatment_start,
        response_category: $response_category,
        age_at_response: $age_at_response,
        sample_anatomic_site: $sample_anatomic_site,
        participant_age_at_collection: $participant_age_at_collection,
        sample_tumor_status: $sample_tumor_status,
        tumor_classification: $tumor_classification,
        data_category: $data_category,
        file_type: $file_type,
        dbgap_accession: $dbgap_accession,       
        study_name: $study_name,
        study_status: $study_status,
        library_selection: $library_selection,
        library_source_material: $library_source_material,
        library_source_molecule: $library_source_molecule,
        library_strategy: $library_strategy,
        file_mapping_level: $file_mapping_level
        first: $first, 
        offset: $offset, 
        order_by: $order_by,
        sort_direction: $sort_direction
    ) {
        id
        participant_id
        dbgap_accession
        study_id
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
        cpi_data {
          associated_id
          repository_of_synonym_id
          domain_description
          domain_category
          data_location
          data_type
          p_id
        }
    }
}
`;

export const GET_STUDY_OVERVIEW_QUERY = gql`
query studyOverview(
    $participant_ids: [String],
    $sex_at_birth: [String] ,
    $race: [String] ,
    $age_at_diagnosis: [Int] ,
    $diagnosis_anatomic_site: [String] ,
    $disease_phase: [String] ,
    $diagnosis: [String] ,
    $diagnosis_basis: [String] ,
    $diagnosis_classification_system: [String] ,
    $last_known_survival_status: [String] ,
    $age_at_last_known_survival_status: [Int],
    $first_event: [String],
    $treatment_type: [String],
    $treatment_agent: [String],
    $age_at_treatment_start: [Int] ,
    $response_category: [String] ,
    $age_at_response: [Int] ,
    $sample_anatomic_site: [String] ,
    $participant_age_at_collection: [Int] ,
    $sample_tumor_status: [String] ,
    $tumor_classification: [String] ,
    $data_category: [String],
    $file_type: [String],
    $file_mapping_level: [String],
    $dbgap_accession: [String],
    $study_name: [String],
    $study_status: [String],
    $library_selection: [String],
    $library_source_material: [String],
    $library_source_molecule: [String],
    $library_strategy: [String],
    $first: Int, 
    $offset: Int, 
    $order_by: String,
    $sort_direction: String ){
    studyOverview(
        participant_ids: $participant_ids,
        sex_at_birth: $sex_at_birth,
        race: $race,
        age_at_diagnosis: $age_at_diagnosis,
        diagnosis_anatomic_site: $diagnosis_anatomic_site,
        disease_phase: $disease_phase,
        diagnosis: $diagnosis,
        diagnosis_classification_system: $diagnosis_classification_system,
        diagnosis_basis: $diagnosis_basis,
        last_known_survival_status: $last_known_survival_status,
        age_at_last_known_survival_status: $age_at_last_known_survival_status,
        first_event: $first_event,
        treatment_type: $treatment_type,
        treatment_agent: $treatment_agent,
        age_at_treatment_start: $age_at_treatment_start,
        response_category: $response_category,
        age_at_response: $age_at_response,
        sample_anatomic_site: $sample_anatomic_site,
        participant_age_at_collection: $participant_age_at_collection,
        sample_tumor_status: $sample_tumor_status,
        tumor_classification: $tumor_classification,
        data_category: $data_category,
        file_type: $file_type,
        file_mapping_level: $file_mapping_level,
        dbgap_accession: $dbgap_accession,       
        study_name: $study_name,
        study_status: $study_status,
        library_selection: $library_selection,
        library_source_material: $library_source_material,
        library_source_molecule: $library_source_molecule,
        library_strategy: $library_strategy,
        first: $first, 
        offset: $offset, 
        order_by: $order_by,
        sort_direction: $sort_direction
    ) {
        id
        study_id
        pubmed_id
        grant_id
        dbgap_accession
        study_name
        study_status
        personnel_name
        diagnosis
        anatomic_site
        num_of_participants
        num_of_samples
        num_of_files
        file_type
    }
}
`;

export const GET_ALL_FILEIDS_PARTICIPANTSTAB_FOR_SELECT_ALL = gql`
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
  $sample_ids: [String],
){
  fileIDsFromList (          
    sample_ids: $sample_ids,
  ) 
}
  `;

export const GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL = gql`
query search (          
  $file_ids: [String] 
){
  fileIDsFromList (          
      file_ids: $file_ids
  ) 
}
  `;

export const GET_ALL_FILEIDS_DIAGNOSISTAB_FOR_SELECT_ALL = gql`
query search (          
  $diagnosis_ids: [String] 
){
  fileIDsFromList (          
      diagnosis_ids: $diagnosis_ids
  ) 
}
  `;
export const GET_ALL_FILEIDS_STUDYISTAB_FOR_SELECT_ALL = gql`
query search (          
  $study_ids: [String] 
){
  fileIDsFromList (          
      study_ids: $study_ids
  ) 
}
  `;

export const GET_ALL_FILEIDS_FROM_PARTICIPANTSTAB_FOR_ADD_ALL_CART = gql`
query participantsAddAllToCart(
    $participant_ids: [String],
    $sex_at_birth: [String] ,
    $race: [String] ,
    $age_at_diagnosis: [Int] ,
    $diagnosis_anatomic_site: [String] ,
    $disease_phase: [String] ,
    $diagnosis: [String] ,
    $diagnosis_classification_system: [String] ,
    $diagnosis_basis: [String] ,
    $last_known_survival_status: [String] ,
    $age_at_last_known_survival_status: [Int],
    $first_event: [String],
    $treatment_type: [String],
    $treatment_agent: [String],
    $age_at_treatment_start: [Int] ,
    $response_category: [String] ,
    $age_at_response: [Int] ,
    $sample_anatomic_site: [String] ,
    $participant_age_at_collection: [Int] ,
    $sample_tumor_status: [String] ,
    $tumor_classification: [String] ,
    $data_category: [String],
    $file_type: [String],
    $dbgap_accession: [String],
    $study_name: [String],
    $study_status: [String],
    $library_selection: [String],
    $library_source_material: [String],
    $library_source_molecule: [String],
    $library_strategy: [String],
    $file_mapping_level: [String],
    $first: Int,
    $offset: Int= 0, 
    $order_by: String = "file_id",
    $sort_direction: String = "asc" 
  ){
    participantOverview(
      participant_ids: $participant_ids,
      sex_at_birth: $sex_at_birth,
      race: $race,
      age_at_diagnosis: $age_at_diagnosis,
      diagnosis_anatomic_site: $diagnosis_anatomic_site,
      disease_phase: $disease_phase,
      diagnosis: $diagnosis,
      diagnosis_classification_system: $diagnosis_classification_system,
      diagnosis_basis: $diagnosis_basis,
      last_known_survival_status: $last_known_survival_status,
      age_at_last_known_survival_status: $age_at_last_known_survival_status,
      first_event: $first_event,
      treatment_type: $treatment_type,
      treatment_agent: $treatment_agent,
      age_at_treatment_start: $age_at_treatment_start,
      response_category: $response_category,
      age_at_response: $age_at_response,
      sample_anatomic_site: $sample_anatomic_site,
      participant_age_at_collection: $participant_age_at_collection,
      sample_tumor_status: $sample_tumor_status,
      tumor_classification: $tumor_classification,
      data_category: $data_category,
      file_type: $file_type,
      dbgap_accession: $dbgap_accession,       
      study_name: $study_name,
      study_status: $study_status,
      library_selection: $library_selection,
      library_source_material: $library_source_material,
      library_source_molecule: $library_source_molecule,
      library_strategy: $library_strategy,
      file_mapping_level: $file_mapping_level
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
      $sex_at_birth: [String] ,
      $race: [String] ,
      $age_at_diagnosis: [Int] ,
      $diagnosis_anatomic_site: [String] ,
      $disease_phase: [String] ,
      $diagnosis: [String] ,
      $diagnosis_basis: [String] ,
      $diagnosis_classification_system: [String] ,
      $last_known_survival_status: [String] ,
      $age_at_last_known_survival_status: [Int],
      $first_event: [String],
      $treatment_type: [String],
      $treatment_agent: [String],
      $age_at_treatment_start: [Int] ,
      $response_category: [String] ,
      $age_at_response: [Int] ,
      $sample_anatomic_site: [String] ,
      $participant_age_at_collection: [Int] ,
      $sample_tumor_status: [String] ,
      $tumor_classification: [String] ,
      $data_category: [String],
      $file_type: [String],
      $file_mapping_level: [String],
      $dbgap_accession: [String],
      $study_name: [String],
      $study_status: [String],
      $library_selection: [String],
      $library_source_material: [String],
      $library_source_molecule: [String],
      $library_strategy: [String],
      $first: Int,
      $offset: Int= 0, 
      $order_by: String = "file_id",
      $sort_direction: String = "asc" ){
      sampleOverview(
          participant_ids: $participant_ids,
          sex_at_birth: $sex_at_birth,
          race: $race,
          age_at_diagnosis: $age_at_diagnosis,
          diagnosis_anatomic_site: $diagnosis_anatomic_site,
          disease_phase: $disease_phase,
          diagnosis: $diagnosis ,
          diagnosis_basis: $diagnosis_basis ,
          diagnosis_classification_system: $diagnosis_classification_system ,
          last_known_survival_status: $last_known_survival_status,
          age_at_last_known_survival_status: $age_at_last_known_survival_status,
          first_event: $first_event,
          treatment_type: $treatment_type,
          treatment_agent: $treatment_agent,
          age_at_treatment_start: $age_at_treatment_start,
          response_category: $response_category,
          age_at_response: $age_at_response,
          sample_anatomic_site: $sample_anatomic_site,
          participant_age_at_collection: $participant_age_at_collection,
          sample_tumor_status: $sample_tumor_status,
          tumor_classification: $tumor_classification,
          data_category: $data_category,
          file_type: $file_type,
          file_mapping_level: $file_mapping_level,
          dbgap_accession: $dbgap_accession,       
          study_name: $study_name,
          study_status: $study_status,
          library_selection: $library_selection,
          library_source_material: $library_source_material,
          library_source_molecule: $library_source_molecule,
          library_strategy: $library_strategy,
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
  $sex_at_birth: [String] ,
  $race: [String] ,
  $age_at_diagnosis: [Int] ,
  $diagnosis_anatomic_site: [String] ,
  $disease_phase: [String] ,
  $diagnosis: [String] ,
  $diagnosis_classification_system: [String] ,
  $diagnosis_basis: [String] ,
  $last_known_survival_status: [String] ,
  $age_at_last_known_survival_status: [Int],
  $first_event: [String],
  $treatment_type: [String],
  $treatment_agent: [String],
  $age_at_treatment_start: [Int] ,
  $response_category: [String] ,
  $age_at_response: [Int] ,
  $sample_anatomic_site: [String] ,
  $participant_age_at_collection: [Int] ,
  $sample_tumor_status: [String] ,
  $tumor_classification: [String] ,
  $data_category: [String],
  $file_type: [String],
  $dbgap_accession: [String],
  $study_name: [String],
  $study_status: [String],
  $library_selection: [String],
  $library_source_material: [String],
  $library_source_molecule: [String],
  $library_strategy: [String],
  $file_mapping_level: [String],
  $first: Int,
  $offset: Int= 0, 
  $order_by: String = "file_id",
  $sort_direction: String = "asc"
 ){
  fileOverview(
      participant_ids: $participant_ids,
      sex_at_birth: $sex_at_birth,
      race: $race,
      age_at_diagnosis: $age_at_diagnosis,
      diagnosis_anatomic_site: $diagnosis_anatomic_site,
      disease_phase: $disease_phase,
      diagnosis: $diagnosis,
      diagnosis_classification_system: $diagnosis_classification_system,
      diagnosis_basis: $diagnosis_basis,
      last_known_survival_status: $last_known_survival_status,
      age_at_last_known_survival_status: $age_at_last_known_survival_status,
      first_event: $first_event,
      treatment_type: $treatment_type,
      treatment_agent: $treatment_agent,
      age_at_treatment_start: $age_at_treatment_start,
      response_category: $response_category,
      age_at_response: $age_at_response,
      sample_anatomic_site: $sample_anatomic_site,
      participant_age_at_collection: $participant_age_at_collection,
      sample_tumor_status: $sample_tumor_status,
      tumor_classification: $tumor_classification,
      data_category: $data_category,
      file_type: $file_type,
      dbgap_accession: $dbgap_accession,       
      study_name: $study_name,
      study_status: $study_status,
      library_selection: $library_selection,
      library_source_material: $library_source_material,
      library_source_molecule: $library_source_molecule,
      library_strategy: $library_strategy,
      file_mapping_level: $file_mapping_level
      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
  ){
    files
  }
}
            `;

export const GET_ALL_FILEIDS_FROM_DIAGNOSISTAB_FOR_ADD_ALL_CART = gql`
query diagnosisAddAllToCart(
  $participant_ids: [String],
  $sex_at_birth: [String] ,
  $race: [String] ,
  $age_at_diagnosis: [Int] ,
  $diagnosis_anatomic_site: [String] ,
  $disease_phase: [String] ,
  $diagnosis: [String] ,
  $diagnosis_classification_system: [String] ,
  $diagnosis_basis: [String] ,
  $last_known_survival_status: [String] ,
  $age_at_last_known_survival_status: [Int],
  $first_event: [String],
  $treatment_type: [String],
  $treatment_agent: [String],
  $age_at_treatment_start: [Int] ,
  $response_category: [String] ,
  $age_at_response: [Int] ,
  $sample_anatomic_site: [String] ,
  $participant_age_at_collection: [Int] ,
  $sample_tumor_status: [String] ,
  $tumor_classification: [String] ,
  $data_category: [String],
  $file_type: [String],
  $dbgap_accession: [String],
  $study_name: [String],
  $study_status: [String],
  $library_selection: [String],
  $library_source_material: [String],
  $library_source_molecule: [String],
  $library_strategy: [String],
  $file_mapping_level: [String],
  $first: Int,
  $offset: Int= 0, 
  $order_by: String = "file_id",
  $sort_direction: String = "asc" ){
  diagnosisOverview(
      participant_ids: $participant_ids,
      sex_at_birth: $sex_at_birth,
      race: $race,
      age_at_diagnosis: $age_at_diagnosis,
      diagnosis_anatomic_site: $diagnosis_anatomic_site,
      disease_phase: $disease_phase,
      diagnosis: $diagnosis,
      diagnosis_classification_system: $diagnosis_classification_system,
      diagnosis_basis: $diagnosis_basis,
      last_known_survival_status: $last_known_survival_status,
      age_at_last_known_survival_status: $age_at_last_known_survival_status,
      first_event: $first_event,
      treatment_type: $treatment_type,
      treatment_agent: $treatment_agent,
      age_at_treatment_start: $age_at_treatment_start,
      response_category: $response_category,
      age_at_response: $age_at_response,
      sample_anatomic_site: $sample_anatomic_site,
      participant_age_at_collection: $participant_age_at_collection,
      sample_tumor_status: $sample_tumor_status,
      tumor_classification: $tumor_classification,
      data_category: $data_category,
      file_type: $file_type,
      dbgap_accession: $dbgap_accession,       
      study_name: $study_name,
      study_status: $study_status,
      library_selection: $library_selection,
      library_source_material: $library_source_material,
      library_source_molecule: $library_source_molecule,
      library_strategy: $library_strategy,
      file_mapping_level: $file_mapping_level
      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
      ) {
      files
  }
}
    `;

export const GET_ALL_FILEIDS_FROM_STUDYTAB_FOR_ADD_ALL_CART = gql`
query studyAddAllToCart(
  $participant_ids: [String],
  $sex_at_birth: [String] ,
  $race: [String] ,
  $age_at_diagnosis: [Int] ,
  $diagnosis_anatomic_site: [String] ,
  $disease_phase: [String] ,
  $diagnosis: [String] ,
  $diagnosis_classification_system: [String] ,
  $diagnosis_basis: [String] ,
  $last_known_survival_status: [String] ,
  $age_at_last_known_survival_status: [Int],
  $first_event: [String],
  $treatment_type: [String],
  $treatment_agent: [String],
  $age_at_treatment_start: [Int] ,
  $response_category: [String] ,
  $age_at_response: [Int] ,
  $sample_anatomic_site: [String] ,
  $participant_age_at_collection: [Int] ,
  $sample_tumor_status: [String] ,
  $tumor_classification: [String] ,
  $data_category: [String],
  $file_type: [String],
  $dbgap_accession: [String],
  $study_name: [String],
  $study_status: [String],
  $library_selection: [String],
  $library_source_material: [String],
  $library_source_molecule: [String],
  $library_strategy: [String],
  $file_mapping_level: [String],
  $first: Int,
  $offset: Int= 0, 
  $order_by: String = "file_id",
  $sort_direction: String = "asc" ){
  studyOverview(
      participant_ids: $participant_ids,
      sex_at_birth: $sex_at_birth,
      race: $race,
      age_at_diagnosis: $age_at_diagnosis,
      diagnosis_anatomic_site: $diagnosis_anatomic_site,
      disease_phase: $disease_phase,
      diagnosis: $diagnosis,
      diagnosis_classification_system: $diagnosis_classification_system,
      diagnosis_basis: $diagnosis_basis,
      last_known_survival_status: $last_known_survival_status,
      age_at_last_known_survival_status: $age_at_last_known_survival_status,
      first_event: $first_event,
      treatment_type: $treatment_type,
      treatment_agent: $treatment_agent,
      age_at_treatment_start: $age_at_treatment_start,
      response_category: $response_category,
      age_at_response: $age_at_response,
      sample_anatomic_site: $sample_anatomic_site,
      participant_age_at_collection: $participant_age_at_collection,
      sample_tumor_status: $sample_tumor_status,
      tumor_classification: $tumor_classification,
      data_category: $data_category,
      file_type: $file_type,
      dbgap_accession: $dbgap_accession,       
      study_name: $study_name,
      study_status: $study_status,
      library_selection: $library_selection,
      library_source_material: $library_source_material,
      library_source_molecule: $library_source_molecule,
      library_strategy: $library_strategy,
      file_mapping_level: $file_mapping_level,
      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
      ) {
      files
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
    fileCount: 'participantsFileCount',
    dataKey: 'id',
    hiddenDataKeys: ['id', 'participant_id', 'study_id'],
    defaultSortField: 'participant_id',
    defaultSortDirection: 'asc',
    buttonText: 'Add Selected Files',
    tableID: 'participant_tab_table',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: {
        title: 'View Columns',
      },
    },
    columns: [
      {
        cellType: cellTypes.CHECKBOX,
        display: true,
        role: cellTypes.CHECKBOX,
      },
      // {
      //   dataField: 'participant_id',
      //   header: 'Participant ID',
      //   cellType: cellTypes.LINK,
      //   linkAttr : {
      //     rootPath: '/participant',
      //     pathParams: ['participant_id'],
      //   },
      //   display: true,
      //   tooltipText: 'sort',
      // },
      {
        dataField: 'participant_id',
        header: 'Participant ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        cellType: cellTypes.CPI,
      },
      {
        dataField: 'study_id',
        header: 'Study ID',
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
        hideable: true,
      },
      {
        dataField: 'race',
        header: 'Race',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'anatomic_site',
        header: 'Diagnosis Anatomic Site',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'age_at_diagnosis',
        header: 'Age at Diagnosis (days)',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'treatment_agent',
        header: 'Treatment Agent',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'treatment_type',
        header: 'Treatment Type',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'age_at_treatment_start',
        header: 'Age at Treatment Start (days)',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'first_event',
        header: 'First Event',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'last_known_survival_status',
        header: 'Last Known Survival Status',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'age_at_last_known_survival_status',
        header: 'Age at Last Known Survival Status (days)',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
    ],
    id: 'participant_tab',
    tableID: 'participant_tab_table',
    tableDownloadCSV: customParticipantsTabDownloadCSV,
    tabIndex: '0',
    downloadFileName: 'CCDI Hub Participants Download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    addFilesRequestVariableKey: 'participant_ids',
    addFilesResponseKeys: ['fileIDsFromList'],
    addAllFilesResponseKeys: ['participantOverview', 'files'],
    addAllFileQuery: GET_ALL_FILEIDS_FROM_PARTICIPANTSTAB_FOR_ADD_ALL_CART,
    addSelectedFilesQuery: GET_ALL_FILEIDS_PARTICIPANTSTAB_FOR_SELECT_ALL,
  },
  {
    name: 'Studies',
    dataField: 'dataStudy',
    api: GET_STUDY_OVERVIEW_QUERY,
    paginationAPIField: 'studyOverview',
    defaultSortField: 'study_name',
    defaultSortDirection: 'asc',
    count: 'numberOfStudies',
    fileCount: 'studiesFileCount',
    dataKey: 'id',
    tableID: 'study_tab_table',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: {
        title: 'View Columns',
      },
    },
    columns: [
      {
        cellType: cellTypes.CHECKBOX,
        display: true,
        role: cellTypes.CHECKBOX,
      },
      {
        dataField: 'study_name',
        header: 'Study Name',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'study_id',
        header: 'Study ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        cellType: cellTypes.CUSTOM_ELEM,
        cellStyle: cellStyles.DBGAP,
      },
      {
        dataField: 'study_status',
        header: 'Study Status',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'dbgap_accession',
        header: 'Manifest',
        display: true,
        sortable: false,
        tooltipText: 'sort',
        cellType: cellTypes.CUSTOM_ELEM,
        cellStyle: cellStyles.STUDY_DOWNLOAD,
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis (Top 5)',
        downloadHeader: 'Diagnosis',
        display: true,
        sortable: false,
        headerType: cellTypes.CUSTOM_ELEM,
        cellType: cellTypes.CUSTOM_ELEM,
        cellStyle: cellStyles.EXPAND,
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'anatomic_site',
        header: 'Diagnosis Anatomic Site (Top 5)',
        downloadHeader: 'Diagnosis Anatomic Site',
        display: true,
        sortable: false,
        cellType: cellTypes.CUSTOM_ELEM,
        cellStyle: cellStyles.EXPAND,
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'num_of_participants',
        header: 'Number of Participants',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'num_of_samples',
        header: 'Number of Samples',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'num_of_files',
        header: 'Number of Files',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'file_type',
        header: 'File Type (Top 5)',
        downloadHeader: 'File Type',
        display: true,
        sortable: false,
        cellType: cellTypes.CUSTOM_ELEM,
        cellStyle: cellStyles.EXPAND,
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'pubmed_id',
        header: 'PubMed ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'personnel_name',
        header: 'Principal Investigator(s)',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'grant_id',
        header: 'Grant ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
    ],
    id: 'study_tab',
    tableID: 'study_tab_table',
    tabIndex: '4',
    selectableRows: true,
    tableDownloadCSV: customStudyTabDownloadCSV,
    downloadFileName: 'CCDI Hub Studies Download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    addFilesRequestVariableKey: 'study_ids',
    addFilesResponseKeys: ['fileIDsFromList'],
    addAllFilesResponseKeys: ['studyOverview', 'files'],
    addAllFileQuery: GET_ALL_FILEIDS_FROM_STUDYTAB_FOR_ADD_ALL_CART,
    addSelectedFilesQuery: GET_ALL_FILEIDS_STUDYISTAB_FOR_SELECT_ALL,
  },
  {
    name: 'Samples',
    dataField: 'dataSample',
    api: GET_SAMPLES_OVERVIEW_QUERY,
    count: 'numberOfSamples',
    fileCount: 'samplesFileCount',
    paginationAPIField: 'sampleOverview',
    dataKey: 'id',
    defaultSortField: 'sample_id',
    defaultSortDirection: 'asc',
    tableID: 'sample_tab_table',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: {
        title: 'View Columns',
      },
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
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'participant_id',
        header: 'Participant ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'study_id',
        header: 'Study ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'anatomic_site',
        header: 'Sample Anatomic Site',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'participant_age_at_collection',
        header: 'Age at Sample Collection (days)',
        display: true,
        tooltipText: 'sort',
        cellType: cellTypes.CUSTOM_ELEM,
        cellStyle: cellStyles.TRANSFORM,
        dataFormatter: (dt) => {
          if (dt === -999) {
            return 'Not Reported';
          }
          return dt.toString();
        },
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'sample_tumor_status',
        header: 'Sample Tumor Status',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'tumor_classification',
        header: 'Sample Tumor Classification',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'diagnosis',
        header: 'Sample Diagnosis',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
    ],
    id: 'sample_tab',
    tableID: 'sample_tab_table',
    tabIndex: '1',
    tableDownloadCSV: customSamplesTabDownloadCSV,
    downloadFileName: 'CCDI Hub Samples Download',
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
    fileCount: 'filesFileCount',
    dataKey: 'id',
    tableID: 'file_tab_table',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: {
        title: 'View Columns',
      },
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
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'data_category',
        header: 'Data Category',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        cellType: cellTypes.CUSTOM_ELEM,
        cellStyle: cellStyles.TRANSFORM,
        dataFormatter: (dt) => {
          if(dt instanceof Array){
            return dt.join(',')
          }
          else if(dt === null){
            return "";
          }
          else if(dt.toString().charAt(0) === '[' && dt.toString().charAt(dt.toString().length - 1) === ']'){
            return dt.toString().substring(1,dt.length-1)
          }
          return dt.toString();
        },
        hideable: true,
      },
      {
        dataField: 'file_description',
        header: 'File Description',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'file_type',
        header: 'File Type',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'file_size',
        header: 'File Size',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        dataFormatType: dataFormatTypes.FORMAT_BYTES,
        cellType: cellTypes.FORMAT_DATA,
        hideable: true,
      },
      {
        dataField: 'file_access',
        header: 'File Access',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'study_id',
        header: 'Study ID',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'participant_id',
        header: 'Participant ID',
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
        dataField: 'guid',
        header: 'GUID',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'md5sum',
        header: 'MD5sum',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'library_selection',
        header: 'Library Selection',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'library_source_material',
        header: 'Library Source Material',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'library_strategy',
        header: 'Library Strategy',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'library_source_molecule',
        header: 'Library Source Molecule',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
      {
        dataField: 'file_mapping_level',
        header: 'File Mapping',
        display: false,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        hideable: true,
      },
    ],
    id: 'file_tab',
    tableID: 'file_tab_table',
    tabIndex: '2',
    selectableRows: true,
    tableDownloadCSV: customFilesTabDownloadCSV,
    downloadFileName: 'CCDI Hub Files Download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    addFilesRequestVariableKey: 'file_ids',
    addFilesResponseKeys: ['fileIDsFromList'],
    addAllFilesResponseKeys: ['fileOverview', 'files'],
    addAllFileQuery: GET_ALL_FILEIDS_FROM_FILESTAB_FOR_ADD_ALL_CART,
    addSelectedFilesQuery: GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL,
  },
];

  