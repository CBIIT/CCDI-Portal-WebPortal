/**
 * Re-exports Explore widget test payloads derived from **`apiResponses.js`** so widget DOM
 * assertions stay tied to **`sampleParticipants`** / **`exploreDashboardWithSexAtBirthFacets`**.
 *
 * @see `./apiResponses.js` — `exploreDashboardWithAllWidgetsForTests`
 * @see `src/pages/inventory/widget/WidgetUtils.js`
 */

import { exploreDashboardWithAllWidgetsForTests, sampleDashboardData } from './apiResponses';

/** Same object as `exploreDashboardWithAllWidgetsForTests` — canonical sample-API-aligned dashData for charts. */
export const dashboardDataAllWidgetsPopulated = exploreDashboardWithAllWidgetsForTests;

/** Counts preserved from sample API base; widget arrays cleared → no chart bodies (collapse chrome only). */
export const dashboardDataNoWidgetSlices = {
  ...sampleDashboardData,
  participantCountByStudy: [],
  participantCountByDiagnosis: [],
  participantCountByDiagnosisAge: [],
  participantCountBySexAtBirth: [],
  participantCountByRace: [],
  participantCountByDataCategory: [],
};
