/**
 * Unit tests for stats slice reducer in `StatsState.js` (receive / error / ready / request).
 */

jest.mock('../../../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));

import statsReducer, {
  initialState,
  RECIEVE_STATS,
  STATS_QUERY_ERR,
  READY_STATS,
  REQUEST_STATS,
} from '../../../src/components/Stats/StatsState';

describe('StatsState reducer', () => {
  describe('RECIEVE_STATS', () => {
    it('should store data and clear loading flags', () => {
      const data = { numberOfParticipants: 42 };
      const next = statsReducer(initialState, {
        type: RECIEVE_STATS,
        payload: { data },
      });
      expect(next.isFetched).toBe(true);
      expect(next.isLoading).toBe(false);
      expect(next.hasError).toBe(false);
      expect(next.data).toEqual(data);
    });
  });

  describe('STATS_QUERY_ERR', () => {
    it('should record error and stop loading', () => {
      const err = new Error('network');
      const next = statsReducer(
        { ...initialState, isLoading: true },
        { type: STATS_QUERY_ERR, error: err },
      );
      expect(next.hasError).toBe(true);
      expect(next.error).toBe(err);
      expect(next.isLoading).toBe(false);
      expect(next.isFetched).toBe(false);
    });
  });

  describe('READY_STATS', () => {
    it('should mark fetched without payload data', () => {
      const next = statsReducer(
        { ...initialState, isLoading: true },
        { type: READY_STATS },
      );
      expect(next.isFetched).toBe(true);
      expect(next.isLoading).toBe(false);
    });
  });

  describe('REQUEST_STATS', () => {
    it('should set loading', () => {
      const next = statsReducer(initialState, { type: REQUEST_STATS });
      expect(next.isLoading).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('should return previous state for unknown actions', () => {
      expect(statsReducer(initialState, { type: 'UNKNOWN' })).toEqual(initialState);
    });
  });
});
