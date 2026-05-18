/**
 * `src/bento/cohortAnalayzerPageData.js` — cohort analyzer table and query config.
 */

import {
  tableConfig,
  diagnosesTableConfig,
  analyzer_query,
  analyzer_tables,
  responseKeys,
} from '../../src/bento/cohortAnalayzerPageData';
import { GET_COHORT_MANIFEST_QUERY } from '../../src/bento/dashboardTabData';

describe('cohortAnalayzerPageData', () => {
  it('should configure participant and diagnosis analyzer tables', () => {
    expect(tableConfig.name).toBe('Participants');
    expect(tableConfig.api).toBe(GET_COHORT_MANIFEST_QUERY);
    expect(tableConfig.paginationAPIField).toBe('participantOverview');
    expect(tableConfig.columns.some((c) => c.dataField === 'participant_id')).toBe(true);

    expect(diagnosesTableConfig.name).toBe('Diagnosis');
    expect(diagnosesTableConfig.paginationAPIField).toBe('diagnosisOverview');
    expect(diagnosesTableConfig.tableMsg.noMatch).toContain('cohort');
  });

  it('should pair queries, tables, and response keys', () => {
    expect(analyzer_query).toHaveLength(2);
    expect(analyzer_tables).toEqual([tableConfig, diagnosesTableConfig]);
    expect(responseKeys).toEqual(['participantOverview', 'diagnosisOverview']);
    analyzer_query.forEach((query) => {
      expect(query).toBeDefined();
    });
  });
});
