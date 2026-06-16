/**
 * Phase 3 — `src/utils/graphqlQueries.js`: GraphQL documents built with `gql`.
 */

import { getOperationAST } from 'graphql';
import {
  GET_CASE_DETAIL_DATA_QUERY,
  STATS_QUERY,
  LANDING_QUERY,
} from '../../src/utils/graphqlQueries';

describe('graphqlQueries', () => {
  it('should export parsed Document nodes', () => {
    expect(GET_CASE_DETAIL_DATA_QUERY.kind).toBe('Document');
    expect(STATS_QUERY.kind).toBe('Document');
    expect(LANDING_QUERY.kind).toBe('Document');
  });

  it('should name the case-detail operation subjectDetail', () => {
    const op = getOperationAST(GET_CASE_DETAIL_DATA_QUERY);
    expect(op.name.value).toBe('subjectDetail');
  });

  it('should define stats and landing queries with definitions', () => {
    expect(STATS_QUERY.definitions.length).toBeGreaterThan(0);
    expect(LANDING_QUERY.definitions.length).toBeGreaterThan(0);
  });
});
