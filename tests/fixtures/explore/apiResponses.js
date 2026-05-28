/**
 * Mock API data for explore page (/explore) tests.
 * Shapes mirror production/backend GraphQL responses for DASHBOARD_QUERY_NEW.
 * Values are stable for assertions.
 *
 * @see src/bento/dashboardTabData.js DASHBOARD_QUERY_NEW
 * @see src/pages/inventory/inventoryCover.js getData()
 */

import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

/**
 * Sample dashboard data from searchParticipants query.
 * This is the shape returned by DASHBOARD_QUERY_NEW and stored in Redux as dashData.
 * @see src/pages/inventory/inventoryCover.js line 208
 */
export const sampleDashboardData = {
  numberOfParticipants: 3,
  numberOfStudies: 1,
  numberOfSamples: 5,
  numberOfFiles: 10,
  numberOfDiagnosis: 3,
  participantsFileCount: 8,
  diagnosisFileCount: 2,
  samplesFileCount: 6,
  studiesFileCount: 4,
  filesFileCount: 10,
  participantCountByDiagnosis: [],
  participantCountByDiagnosisAge: [],
  participantCountBySexAtBirth: [],
  participantCountByRace: [],
  participantCountByStudy: [],
  participantCountByDataCategory: [],
  filterParticipantCountByDataCategory: [],
  filterParticipantCountByDiagnosisAnatomicSite: [],
  filterParticipantCountByDiseasePhase: [],
  filterParticipantCountByFileType: [],
  filterParticipantCountBySexAtBirth: [],
  filterParticipantCountByDiagnosis: [],
  filterParticipantCountByDiagnosisClassificationSystem: [],
  filterParticipantCountByDiagnosisVerificationStatus: [],
  filterParticipantCountByDiagnosisBasis: [],
  filterParticipantCountByDiagnosisCategory: [],
  filterParticipantCountByLibrarySelection: [],
  filterParticipantCountByTumorGradeSource: [],
  filterParticipantCountByTumorStageSource: [],
  filterParticipantCountByLibrarySourceMaterial: [],
  filterParticipantCountByLibrarySourceMolecule: [],
  filterParticipantCountByLibraryStrategy: [],
  filterParticipantCountByFileMappingLevel: [],
  filterParticipantCountByDBGAPAccession: [],
  filterParticipantCountByRace: [],
  filterParticipantCountBySampleAnatomicSite: [],
  filterParticipantCountByStudyTitle: [],
  filterParticipantCountByStudyStatus: [],
  filterParticipantCountByTumorClassification: [],
  filterParticipantCountByTumorStatus: [],
  filterParticipantCountBySurvivalStatus: [],
  filterParticipantCountByFirstEvent: [],
  filterParticipantCountByTreatmentType: [],
  filterParticipantCountByTreatmentAgent: [],
  filterParticipantCountByResponseCategory: [],
  filterParticipantCountByAgeAtResponse: [],
  filterParticipantCountByDiagnosisAge: [],
  filterParticipantCountBySampleAge: [],
  filterParticipantCountByAgeAtLastKnownSurvivalStatus: [],
  filterParticipantCountByAgeAtTreatmentStart: [],
};

/**
 * Sample participant data for testing.
 * This represents a minimal subset of participant records.
 */
export const sampleParticipants = [
  {
    id: '1',
    participant_id: '00301d78915737fa100f',
    study_id: 'phs002431',
    sex_at_birth: 'Female',
    race: 'White',
    diagnosis_str: 'Glioblastoma, NOS',
    age_at_diagnosis_str: 'C71.9',
    treatment_type_str: '',
    treatment_agent_str: '',
    last_known_survival_status_str: '',
    diagnosis_category_str: '',
    cpi_data: [
      {
        associated_id: 'test_id_1',
        repository_of_synonym_id: 'test_repo_1',
        domain_description: 'Genomic',
        domain_category: 'Category1',
        data_location: 'Location1',
        data_type: 'Type1',
        p_id: '1',
      },
    ],
  },
  {
    id: '2',
    participant_id: '0061cbb084697320fcf',
    study_id: 'phs002431',
    sex_at_birth: 'Male',
    race: 'White',
    diagnosis_str: 'Mixed phenotype acute leukemia with t(v;11q23); MLL rearranged',
    age_at_diagnosis_str: 'C42.1',
    treatment_type_str: '',
    treatment_agent_str: '',
    last_known_survival_status_str: '',
    diagnosis_category_str: '',
    cpi_data: [
      {
        associated_id: 'test_id_2',
        repository_of_synonym_id: 'test_repo_2',
        domain_description: 'Clinical',
        domain_category: 'Category2',
        data_location: 'Location2',
        data_type: 'Type2',
        p_id: '2',
      },
    ],
  },
  {
    id: '3',
    participant_id: '0065af91e89ee2859595',
    study_id: 'phs002431',
    sex_at_birth: 'Female',
    race: 'Hispanic or Latino;White',
    diagnosis_str: 'Astrocytoma, anaplastic, NOS',
    age_at_diagnosis_str: 'C71.0',
    treatment_type_str: '',
    treatment_agent_str: '',
    last_known_survival_status_str: '',
    diagnosis_category_str: '',
    cpi_data: [],
  },
];

/**
 * GraphQL DASHBOARD_QUERY_NEW response - shape of `response.data.searchParticipants`
 * This is what getData() returns and gets stored in Redux.
 * @see src/pages/inventory/inventoryCover.js getData()
 */
export const dashboardQueryResponseData = {
  searchParticipants: sampleDashboardData,
};

/**
 * Helper to create a mock Redux store for testing
 */
export function createMockStore(initialState = {}) {
  return mockStore({
    inventoryReducer: {
      tab: 0,
      activeFilters: null,
      dashData: sampleDashboardData,
      ...initialState.inventoryReducer,
    },
    ...initialState,
  });
}

/**
 * Helper to create a mock Apollo client.query response for DASHBOARD_QUERY_NEW
 */
export function createDashboardQueryMock(overrides = {}) {
  const searchParticipants = {
    ...sampleDashboardData,
    ...overrides.dashboardData,
  };
  const data = {
    searchParticipants,
  };
  return jest.fn(() => Promise.resolve({ data }));
}

/**
 * Unfiltered dashboard payload with Sex at Birth facet buckets populated so the
 * explore facet panel renders Female / Male checkbox options (UI tests).
 * @see sampleParticipants — two Female, one Male
 */
export const exploreDashboardWithSexAtBirthFacets = {
  ...sampleDashboardData,
  participantCountBySexAtBirth: [
    { group: 'Female', subjects: 2 },
    { group: 'Male', subjects: 1 },
  ],
  filterParticipantCountBySexAtBirth: [
    { group: 'Female', subjects: 2 },
    { group: 'Male', subjects: 1 },
  ],
};

/**
 * Mock API result after filtering to Female only (matches sampleParticipants).
 */
export const exploreDashboardFemaleOnly = {
  ...exploreDashboardWithSexAtBirthFacets,
  numberOfParticipants: 2,
  numberOfStudies: 1,
  numberOfSamples: 4,
  numberOfFiles: 8,
  participantCountBySexAtBirth: [{ group: 'Female', subjects: 2 }],
  filterParticipantCountBySexAtBirth: [{ group: 'Female', subjects: 2 }],
};

/**
 * Full widget-chart slices for `WidgetView`, aligned with **`sampleParticipants`** and the same
 * **`numberOfParticipants: 3`** story as **`sampleDashboardData`** / **`exploreDashboardWithSexAtBirthFacets`**:
 *
 * | Widget field | Alignment |
 * |--------------|-----------|
 * | `participantCountByStudy` | All three rows use **`study_id` `phs002431`** |
 * | `participantCountBySexAtBirth` | **`exploreDashboardWithSexAtBirthFacets`** (Female 2, Male 1) |
 * | `participantCountByRace` | Two **`White`**, one **`Hispanic or Latino;White`** |
 * | `participantCountByDiagnosis` | **`diagnosis_str`** values, one subject each |
 * | `participantCountByDiagnosisAge` | Single bucket totaling **3** participants (matches cohort size) |
 * | `participantCountByDataCategory` | Three buckets totaling **3** (illustrative file-level mix) |
 *
 * Used by `tests/fixtures/explore/widgetDashboardData.js` and `exploreWidgetView.test.js`.
 */
export const exploreDashboardWithAllWidgetsForTests = {
  ...exploreDashboardWithSexAtBirthFacets,
  participantCountByStudy: [{ group: 'phs002431', subjects: 3 }],
  participantCountByDiagnosis: [
    { group: 'Glioblastoma, NOS', subjects: 1 },
    { group: 'Mixed phenotype acute leukemia with t(v;11q23); MLL rearranged', subjects: 1 },
    { group: 'Astrocytoma, anaplastic, NOS', subjects: 1 },
  ],
  participantCountByDiagnosisAge: [{ group: '0-3650 days', subjects: 3 }],
  participantCountByRace: [
    { group: 'White', subjects: 2 },
    { group: 'Hispanic or Latino;White', subjects: 1 },
  ],
  participantCountByDataCategory: [
    { group: 'Genomic', subjects: 1 },
    { group: 'Clinical', subjects: 1 },
    { group: 'Aggregated', subjects: 1 },
  ],
};
