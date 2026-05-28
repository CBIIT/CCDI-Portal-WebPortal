/**
 * Mock API payloads for **Cohort Analyzer** download flows (`GET_COHORT_MANIFEST_QUERY`, `GET_COHORT_METADATA_QUERY`)
 * and optional table queries (`participantOverview`, `diagnosisOverview`).
 */

export const cohortManifestCsvRowsFixture = [
  {
    guid: 'guid-analyze-1',
    file_name: 'sample1.tsv',
    participant_id: 'PART-A',
    drs_id: 'drs://example/1',
  },
];

export const cohortMetadataJsonFixture = {
  cohortId: 'mock-cohort',
  participantCount: 2,
  exportedAt: '2026-01-01T00:00:00Z',
};

export const participantOverviewRowsFixture = [
  {
    id: 'p1',
    participant_id: 'PART-001',
    race: 'Asian',
    sex_at_birth: 'Female',
    study_id: 'phs000001',
    __typename: 'ParticipantOverview',
  },
];

export const diagnosisOverviewRowsFixture = [
  {
    participant_id: 'PART-001',
    pid: 'p1',
    diagnosis: 'Glioma',
    anatomic_site: 'Brain',
    age_at_diagnosis: 1200,
    study_id: 'phs000001',
    __typename: 'DiagnosisOverview',
  },
];
