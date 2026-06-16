/**
 * Shape of **`studyDetails`** from **`GET_STUDY_DETAIL_DATA_QUERY`** (`src/bento/studyDetailData.js`).
 * **`study_id`** matches **`phs002431`** in **`studyOverviewTableRows`** so **`studyDownloadLinks`** resolves in overview.
 */

export const studyDetailsMinimalFixture = {
  study_id: 'phs002431',
  study_name: 'CCD Study Row Assert',
  dbgap_accession: 'TEST_DBGAP',
  study_description: 'Synthetic study description for unit tests.',
  pubmed_ids: '10000001;10000002',
  num_of_participants: 1200,
  num_of_samples: 3400,
  num_of_files: 5600,
  data_categories: [
    { group: 'Clinical', subjects: 10 },
    { group: 'Sequencing', subjects: 20 },
  ],
  diagnoses: [
    { group: 'Various', subjects: 15 },
  ],
  anatomic_sites: [
    { group: 'Blood', subjects: 8 },
  ],
  supporting_data: [],
  __typename: 'StudyDetail',
};

/** Non-empty **`supporting_data`** for the Supporting Data tab (IDC category with minimal JSON). */
export const studyDetailsWithSupportingDataFixture = {
  ...studyDetailsMinimalFixture,
  supporting_data: [
    {
      data_category: 'IDC',
      data_object: JSON.stringify({ collection_id: 'test-collection' }),
    },
  ],
};
