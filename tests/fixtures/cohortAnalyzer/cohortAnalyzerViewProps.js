/**
 * Shared **Cohort Analyzer** view fixtures: cohort state shapes used by
 * `CohortStateContext.Provider` in `CohortAnalyzer` view tests, plus helpers
 * that build edge-case states (cohort cap, participant cap).
 *
 * The shapes mirror what `CohortStateProvider` produces for each cohort:
 * `{ cohortName, cohortDescription, participants: [{ id, participant_id, study_id, ... }] }`.
 *
 * @see src/components/CohortSelectorState/store/reducer.js
 * @see src/pages/CohortAnalyzer/CohortAnalyzer.js
 */

const buildParticipant = (i, prefix = 'P') => ({
  id: `${prefix}-id-${i}`,
  participant_id: `${prefix}-${String(i).padStart(3, '0')}`,
  study_id: 'phs000001',
});

export const buildCohort = (cohortName, participantCount, prefix = cohortName) => ({
  cohortName,
  cohortDescription: `${cohortName} description`,
  participants: Array.from({ length: participantCount }, (_, i) => buildParticipant(i + 1, prefix)),
});

export const cohortStateTwoSmallCohorts = {
  'cohort-alpha': buildCohort('Alpha', 2, 'A'),
  'cohort-beta': buildCohort('Beta', 1, 'B'),
};

/**
 * Cohort state where each cohort key matches its `cohortName`. The view's
 * regex-based retention logic in `selectedCohorts` cleanup compares cohort
 * names extracted from venn labels (e.g. "Alpha (2)") against cohort keys, so
 * tests that exercise that flow need keys equal to display names.
 */
export const cohortStateNamedKeys = {
  Alpha: buildCohort('Alpha', 2, 'A'),
  Beta: buildCohort('Beta', 1, 'B'),
};

/**
 * Build a cohort state with `count` cohorts (for limit testing).
 * @param {number} count
 */
export const buildCohortStateWithNCohorts = (count) => {
  const state = {};
  for (let i = 0; i < count; i += 1) {
    state[`cohort-${i}`] = buildCohort(`Cohort${i}`, 1, `c${i}`);
  }
  return state;
};

/**
 * Single cohort containing `participantCount` rows (for participant limit testing).
 * @param {number} participantCount
 */
export const buildCohortStateWithLargeCohort = (participantCount) => ({
  'cohort-large': buildCohort('LargeCohort', participantCount, 'L'),
});
