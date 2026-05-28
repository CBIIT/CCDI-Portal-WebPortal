/**
 * Participant **`WrapperService`** — GraphQL variable shaping + **`getFilesID`** (Phase 4).
 *
 * @see src/pages/globalSearch/Cards/participant/WrapperService.js
 */

import {
  getQueryVariables,
  getFilesID,
} from '../../../src/pages/globalSearch/Cards/participant/WrapperService';

describe('participant WrapperService', () => {
  it('should merge first: 200000 into query variables', () => {
    expect(getQueryVariables({ participant_ids: ['p1'] })).toEqual({
      participant_ids: ['p1'],
      first: 200000,
    });
  });

  it('should return async fetcher that resolves client.query data', async () => {
    const queryDoc = {};
    const query = jest.fn(() =>
      Promise.resolve({
        data: { fileIDsFromList: ['f1', 'f2'] },
      }),
    );

    const fetcher = getFilesID({
      client: { query },
      variables: { participant_ids: ['p1'] },
      query: queryDoc,
    });

    const result = await fetcher();

    expect(result).toEqual({ fileIDsFromList: ['f1', 'f2'] });
    expect(query).toHaveBeenCalledWith({
      query: queryDoc,
      variables: {
        participant_ids: ['p1'],
        first: 200000,
      },
    });
  });
});
