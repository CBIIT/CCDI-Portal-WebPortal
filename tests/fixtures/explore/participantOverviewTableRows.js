/**
 * Rows matching GET_PARTICIPANTS_OVERVIEW `participantOverview` selection in
 * `src/bento/dashboardTabData.js` — used when exercising real Bento table rendering.
 */

const cpiEmpty = [];

/** Two participants: one Female, one Male (stable IDs for assertions). */
export const participantOverviewTwoMixedSex = [
  {
    id: 'p-table-1',
    participant_id: 'TAB_PID_FEMALE',
    dbgap_accession: null,
    study_id: 'phs002431',
    race: 'Asian',
    sex_at_birth: 'Female',
    diagnosis: 'Glioma',
    diagnosis_category: 'CatA',
    anatomic_site: 'Brain',
    age_at_diagnosis: 1200,
    treatment_agent: 'DrugX',
    treatment_type: 'Chemo',
    age_at_treatment_start: 500,
    first_event: 'Progression',
    last_known_survival_status: 'Alive',
    age_at_last_known_survival_status: 2000,
    cpi_data: cpiEmpty,
  },
  {
    id: 'p-table-2',
    participant_id: 'TAB_PID_MALE',
    dbgap_accession: null,
    study_id: 'phs002431',
    race: 'White',
    sex_at_birth: 'Male',
    diagnosis: 'Leukemia',
    diagnosis_category: 'CatB',
    anatomic_site: 'Bone Marrow',
    age_at_diagnosis: 800,
    treatment_agent: 'DrugY',
    treatment_type: 'Chemo',
    age_at_treatment_start: 300,
    first_event: 'Diagnosis',
    last_known_survival_status: 'Alive',
    age_at_last_known_survival_status: 1500,
    cpi_data: cpiEmpty,
  },
];
