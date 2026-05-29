/**
 * Hub stats reducer (`src/store/StatsState.js`).
 */

import hubReducer, {
  initialState,
  RECIEVE_STATS,
  STATS_QUERY_ERR,
  READY_STATS,
  REQUEST_STATS,
} from '../../src/store/StatsState';

describe('store StatsState reducer', () => {
  describe('initialState', () => {
    it('should return initial state for unknown actions', () => {
      expect(hubReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
      expect(hubReducer(initialState, { type: 'UNKNOWN' })).toEqual(initialState);
    });
  });

  describe('REQUEST_STATS', () => {
    it('should set isLoading to true', () => {
      const next = hubReducer(initialState, { type: REQUEST_STATS });
      expect(next.isLoading).toBe(true);
      expect(next.isFetched).toBe(false);
    });
  });

  describe('RECIEVE_STATS', () => {
    it('should store payload data and clear error flags', () => {
      const payload = { data: [{ label: 'Studies', value: 10 }] };
      const loading = hubReducer(initialState, { type: REQUEST_STATS });
      const next = hubReducer(loading, { type: RECIEVE_STATS, payload });

      expect(next.data).toEqual(payload.data);
      expect(next.isLoading).toBe(false);
      expect(next.isFetched).toBe(true);
      expect(next.hasError).toBe(false);
    });
  });

  describe('STATS_QUERY_ERR', () => {
    it('should record error and reset fetch state', () => {
      const next = hubReducer(initialState, {
        type: STATS_QUERY_ERR,
        error: 'GraphQL failed',
      });

      expect(next.hasError).toBe(true);
      expect(next.error).toBe('GraphQL failed');
      expect(next.isLoading).toBe(false);
      expect(next.isFetched).toBe(false);
    });
  });

  describe('READY_STATS', () => {
    it('should mark stats as fetched without changing data', () => {
      const next = hubReducer(
        { ...initialState, isLoading: true },
        { type: READY_STATS },
      );

      expect(next.isLoading).toBe(false);
      expect(next.isFetched).toBe(true);
      expect(next.data).toEqual([]);
    });
  });
});
