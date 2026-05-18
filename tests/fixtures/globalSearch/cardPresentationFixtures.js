/**
 * Minimal row shapes for **global search result cards** (presentation tests).
 *
 * Align with `src/pages/globalSearch/Cards/**` props; can diverge slightly from GraphQL fixtures.
 */

export const studiesCardRow = {
  study_id: 'phsCARD_TEST_001',
  study_name: 'Card Test Study Name',
  study_status: 'Active',
  num_of_participants: 42,
  num_of_files: 99,
};

/** Study without manifest link — exercises download warning branch. */
export const studiesCardRowNoManifest = {
  ...studiesCardRow,
  study_id: 'phsUNKNOWN_NO_LINK',
};

export const longTitleStudiesCardRow = {
  ...studiesCardRow,
  study_id: `phsCARD_${'X'.repeat(80)}_LONG`,
};

export const samplesCardRow = {
  sample_id: 'SMP-CARD-001',
  participant_id: 'PART-CARD-001',
  study_id: 'phsCARD_TEST_001',
  sample_anatomic_site_str: 'Brain',
  sample_tumor_status: 'Tumor',
  diagnosis_str: 'Glioma',
  tumor_classification: 'Grade IV',
  diagnosis_category_str: 'CatA',
};

export const modelsCardRow = {
  node: 'Participant',
  property: 'race',
  property_description: 'Race field',
  property_required: false,
  property_type: 'string',
  value: 'Asian',
  highlight: 'Asian',
  category_type: 'demographic',
};

/** Hides property rows — only node label is shown. */
export const modelsCardNodeOnlyRow = {
  ...modelsCardRow,
  category_type: 'node',
  value: 'Participant Node Label That Is Intentionally Long For Truncation',
};

/** `AboutCard`: `data.text` must be an array of strings (see `AboutCard.js`). */
export const aboutCardPayload = {
  title: 'About Page Card Title',
  text: ['First sentence about $search$.'],
  page: '/about',
};

export const aboutCardExternalLinkPayload = {
  title: 'External About Resource With A Very Long Title For Truncation Testing',
  text: ['Visit https://example.com for details.', 'Another sentence,'],
  page: 'https://example.com/about-resource',
};

export const aboutCardHighlightPayload = {
  title: 'Highlight Test',
  text: ['Results mention tumor biology.'],
  page: '/about',
};

/** Participant card — `cpi_data` empty hides CPI-only actions; still renders core fields. */
export const participantCardRow = {
  id: 'part-card-gs-1',
  participant_id: 'PART-GS-001',
  diagnosis_str: 'Astrocytoma',
  study_id: 'phsGS001',
  age_at_diagnosis_str: '1200',
  treatment_type_str: 'Chemotherapy',
  sex_at_birth: 'Female',
  treatment_agent_str: 'AgentX',
  race_str: 'Asian',
  last_known_survival_status_str: 'Alive',
  diagnosis_category_str: 'CatA',
  cpi_data: [],
};

/** Non-empty `cpi_data` enables AVAILABLE ACTIONS (CPI modal stub, cohort submenu, Explore, cart). */
export const participantCardRowWithCpi = {
  ...participantCardRow,
  cpi_data: [{ source: 'fixture-cpi-1' }],
};

/** `ValueCard` — fields aligned with `CARD_PROPERTIES` / `prepareLinks` in ValueCard.js */
export const valueCardRow = {
  value: 'Participant',
  node_name: 'Participant',
  property_name: 'race',
  property_description: 'Race / ethnicity',
};

/** Files card — includes `participant_id` so title links to Explore (uses `Link`). */
export const filesCardRow = {
  id: 'file-gs-1',
  file_name: 'variants.vcf.gz',
  data_category: 'Simple Nucleotide Variation',
  participant_id: 'PART-GS-001',
  file_description: 'Mock file row for tests',
  study_id: 'phsGS001',
  file_type: 'vcf',
  sample_id: 'SMP-GS-1',
  file_size: 4096,
};

export const filesCardRowNoParticipant = {
  ...filesCardRow,
  id: 'file-gs-2',
  participant_id: null,
  file_name: 'orphan_file.bam',
};

export const filesCardRowLongIds = {
  ...filesCardRow,
  id: 'file-gs-3',
  participant_id: `[${'PART-LONG-'.repeat(12)}PART-END]`,
  sample_id: `[${'SMP-LONG-'.repeat(12)}SMP-END]`,
  data_category: '[Genomic, Transcriptomic]',
};

export const filesCardRowBracketedParticipant = {
  ...filesCardRow,
  id: 'file-gs-4',
  participant_id: '[PART-A, PART-B]',
  data_category: '[Genomic, Transcriptomic]',
};
