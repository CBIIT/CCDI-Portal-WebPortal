/**
 * Unit tests for stats slice reducer in `StatsState.js` (receive / error / ready / request).
 */

jest.mock('../../../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));

import client from '../../../src/utils/graphqlClient';
import statsReducer, {
  initialState,
  RECIEVE_STATS,
  STATS_QUERY_ERR,
  READY_STATS,
  REQUEST_STATS,
  fetchDataForStats,
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

describe('fetchDataForStats', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  async function runFetchThunk() {
    const outerThunk = fetchDataForStats();
    await outerThunk(dispatch, getState);
    const innerThunks = dispatch.mock.calls
      .map(([arg]) => arg)
      .filter((arg) => typeof arg === 'function');
    await Promise.all(innerThunks.map((thunk) => thunk(dispatch, getState)));
  }

  beforeEach(() => {
    jest.clearAllMocks();
    getState.mockReturnValue({
      stats: { isFetched: false },
      login: { isSignedIn: false },
    });
  });

  it('should fetch stats when not yet fetched', async () => {
    client.query.mockResolvedValue({ data: { numberOfParticipants: 10 } });

    await runFetchThunk();

    expect(client.query).toHaveBeenCalledWith(
      expect.objectContaining({
        context: { clientName: 'publicService' },
      }),
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: RECIEVE_STATS,
        payload: { data: { numberOfParticipants: 10 } },
      }),
    );
  });

  it('should use authenticated client context when signed in', async () => {
    getState.mockReturnValue({
      stats: { isFetched: false },
      login: { isSignedIn: true },
    });
    client.query.mockResolvedValue({ data: {} });

    await runFetchThunk();

    expect(client.query).toHaveBeenCalledWith(
      expect.objectContaining({
        context: { clientName: '' },
      }),
    );
  });

  it('should dispatch READY_STATS when data is already fetched', async () => {
    getState.mockReturnValue({
      stats: { isFetched: true },
      login: { isSignedIn: false },
    });

    await fetchDataForStats()(dispatch, getState);

    expect(client.query).not.toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({ type: READY_STATS });
  });

  it('should dispatch STATS_QUERY_ERR when query fails', async () => {
    const networkError = new Error('network');
    client.query.mockRejectedValue(networkError);

    await runFetchThunk();

    expect(dispatch).toHaveBeenCalledWith({
      type: STATS_QUERY_ERR,
      error: networkError,
    });
  });
});
