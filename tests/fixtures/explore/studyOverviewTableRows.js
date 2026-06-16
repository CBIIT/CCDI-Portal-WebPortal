/**
 * Rows matching GET_STUDY_OVERVIEW_QUERY `studyOverview` selection in
 * `src/bento/dashboardTabData.js`.
 */

export const studyOverviewOneRow = [
  {
    id: 'study-table-1',
    study_id: 'phs002431',
    pubmed_id: null,
    grant_id: null,
    dbgap_accession: 'TEST_DBGAP',
    study_name: 'CCD Study Row Assert',
    study_status: 'released',
    personnel_name: 'Lab Lead',
    // Studies tab columns use EXPAND styling — Column.js expects arrays for `.join(...)`.
    diagnosis: ['Various'],
    anatomic_site: ['Various'],
    num_of_participants: 12,
    num_of_samples: 34,
    num_of_files: 56,
    file_type: ['clinical', 'sequencing'],
  },
];
