/**
 * Canonical **`globalSearch`** GraphQL response shapes for mocked Apollo **`client.query`** tests.
 *
 * Align field names with `src/bento/sitesearch.js` selections (counts, autocomplete buckets, tab rows).
 * Tests and **`createGlobalSearchClientQueryMock`** import from here — single source for “mock API” data.
 */

/** Autocomplete query `SEARCH` — nested lists under `globalSearch`. */
export const globalSearchAutocompleteFixture = {
  participants: [{ participant_id: 'MOCK_PARTICIPANT_001' }],
  studies: [{ study_id: 'MOCK_STUDY_PHS' }],
  samples: [{ sample_id: 'MOCK_SAMPLE_001' }],
  files: [{ file_name: 'mock_results.tsv' }],
  model: [{ node: 'MockModelNode' }],
  about_page: [{ title: 'Mock About Page Hit' }],
};

/** Tab counts query `SEARCH_PAGE_RESULTS` — aggregate counts only. */
export const globalSearchCountsFixture = {
  participant_count: 12,
  study_count: 4,
  sample_count: 30,
  file_count: 55,
  model_count: 2,
  about_count: 1,
};

/** `SEARCH_PAGE_RESULT_PARTICIPANTS` row (minimal fields used in UI tables). */
export const globalSearchParticipantRowsFixture = [
  {
    id: 'mock-row-1',
    participant_id: 'MOCK_PID_001',
    study_id: 'phs000001',
    diagnosis_str: 'Glioma',
    sex_at_birth: 'Female',
  },
];

export const globalSearchStudyRowsFixture = [
  {
    study_id: 'phs000002',
    study_name: 'Mock Study',
    study_status: 'Active',
    num_of_participants: 100,
    num_of_samples: 200,
    num_of_files: 40,
  },
];

export const globalSearchSampleRowsFixture = [
  {
    sample_id: 'SMP-MOCK-1',
    participant_id: 'MOCK_PID_001',
    study_id: 'phs000001',
    diagnosis_str: 'Astrocytoma',
  },
];

export const globalSearchFileRowsFixture = [
  {
    id: 'file-mock-1',
    file_name: 'wgs.bam',
    data_category: 'Sequencing',
    participant_id: 'MOCK_PID_001',
    study_id: 'phs000001',
    file_type: 'bam',
    sample_id: 'SMP-MOCK-1',
    file_size: 1024,
  },
];

export const globalSearchModelRowsFixture = [
  {
    node: 'Participant',
    property: 'race',
    property_description: 'Race',
    property_required: false,
    property_type: 'string',
    value: 'Asian',
    highlight: '',
    category_type: 'demographic',
  },
];

export const globalSearchAboutRowsFixture = [
  {
    text: '<p>Mock about content</p>',
    page: '/about',
    title: 'About CCDI',
  },
];
