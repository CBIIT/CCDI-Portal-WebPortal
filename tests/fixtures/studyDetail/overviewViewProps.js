/**
 * Props for study detail overview subcomponents (`overviewView`, charts, modal).
 */

import { studyDetailsMinimalFixture } from './studyDetailApiResponse';

/** Overview left/right panel — manifest link resolves via `phs002431` in `studyDownloadLinks`. */
export const overviewViewDataFixture = {
  ...studyDetailsMinimalFixture,
};

/** Study with TARGET clinical data files (`studyClinicalDataLinks`). */
export const overviewViewClinicalDataFixture = {
  ...studyDetailsMinimalFixture,
  study_id: 'phs000463',
  study_name: 'TARGET Open Pediatric Cancer',
};

/** Study with cBioPortal explorer link (`studycBioPortalLinks`). */
export const overviewViewCBioPortalFixture = {
  ...studyDetailsMinimalFixture,
  study_id: 'phs002790',
  study_name: 'Study With cBioPortal',
};

export const chartDataFixture = [
  { group: 'Clinical', subjects: 10 },
  { group: 'Sequencing', subjects: 20 },
  { group: 'Imaging', subjects: 5 },
];
