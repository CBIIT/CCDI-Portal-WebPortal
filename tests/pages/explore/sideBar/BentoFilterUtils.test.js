/**
 * Phase 2 — `BentoFilterUtils`: GraphQL list helpers and facet bridge from study arm routing.
 *
 * @see src/pages/inventory/sideBar/BentoFilterUtils.js
 * @see tests/TEST_STRUCTURE.md
 */

jest.mock('../../../../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));

import client from '../../../../src/utils/graphqlClient';
import store from '../../../../src/store';
import {
  getFacetValues,
  getAllIds,
  getAllParticipantIds,
  onClearAllAndSelectFacetValue,
} from '../../../../src/pages/inventory/sideBar/BentoFilterUtils';

describe('Explore — BentoFilterUtils', () => {
  describe('getFacetValues', () => {
    it('should build a single-facet filter map with a true flag for the value', () => {
      expect(getFacetValues('sex_at_birth', 'Female')).toEqual({
        sex_at_birth: { Female: true },
      });
    });
  });

  describe('getAllIds', () => {
    it('should return idsLists from the GraphQL client', async () => {
      client.query.mockResolvedValueOnce({
        data: { idsLists: ['id-a', 'id-b'] },
      });

      const ids = await getAllIds('case');

      expect(client.query).toHaveBeenCalled();
      expect(ids).toEqual(['id-a', 'id-b']);
    });

    it('should return an empty array when the query fails', async () => {
      client.query.mockRejectedValueOnce(new Error('network'));

      const ids = await getAllIds('case');

      expect(ids).toEqual([]);
    });
  });

  describe('getAllParticipantIds', () => {
    it('should return findParticipantIdsInList from the GraphQL client', async () => {
      client.query.mockResolvedValueOnce({
        data: { findParticipantIdsInList: ['p1', 'p2'] },
      });

      const ids = await getAllParticipantIds(['p1']);

      expect(ids).toEqual(['p1', 'p2']);
    });

    it('should return an empty array when the query fails', async () => {
      client.query.mockRejectedValueOnce(new Error('network'));

      const ids = await getAllParticipantIds([]);

      expect(ids).toEqual([]);
    });
  });

  describe('onClearAllAndSelectFacetValue', () => {
    it('should dispatch clear-all-and-select with the facet map', () => {
      const spy = jest.spyOn(store, 'dispatch');

      onClearAllAndSelectFacetValue('sex_at_birth', 'Female');

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });
});
