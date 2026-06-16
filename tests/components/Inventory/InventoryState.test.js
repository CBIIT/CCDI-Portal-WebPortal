/**
 * Unit tests for Inventory Redux reducer (`InventoryState.js`).
 */

import InventoryReducer, {
  initialState,
  afterInitialLoading,
  inDataloading,
  updateImportfrom,
  syncUpFacets,
  syncUpDashboard,
  return2Page,
  returnQueryUrl,
  changeTab,
  restoreActionType,
} from '../../../src/components/Inventory/InventoryState';

describe('InventoryState reducer', () => {
  describe('afterInitialLoading', () => {
    it('should set initialLoading to false', () => {
      const next = InventoryReducer(initialState, afterInitialLoading());
      expect(next.initialLoading).toBe(false);
    });
  });

  describe('inDataloading', () => {
    it('should update isDataloading', () => {
      const next = InventoryReducer(initialState, inDataloading(true));
      expect(next.isDataloading).toBe(true);
    });
  });

  describe('updateImportfrom', () => {
    it('should store import URL and data', () => {
      const payload = { url: 'u', rows: [1, 2] };
      const next = InventoryReducer(
        initialState,
        updateImportfrom(payload.url, payload.rows),
      );
      expect(next.importFromURL).toBe('u');
      expect(next.importFromData).toEqual([1, 2]);
    });
  });

  describe('syncUpFacets / syncUpDashboard', () => {
    it('should set activeFilters from syncUpFacets', () => {
      const facets = { sex_at_birth: ['Female'] };
      const next = InventoryReducer(initialState, syncUpFacets(facets));
      expect(next.activeFilters).toEqual(facets);
    });

    it('should set activeFilters and dashData from syncUpDashboard', () => {
      const dash = { searchParticipants: {} };
      const next = InventoryReducer(
        initialState,
        syncUpDashboard({ a: 1 }, dash),
      );
      expect(next.activeFilters).toEqual({ a: 1 });
      expect(next.dashData).toEqual(dash);
    });
  });

  describe('return2Page / returnQueryUrl / changeTab / restoreActionType', () => {
    it('should update return flags and tab metadata', () => {
      let state = InventoryReducer(initialState, return2Page(true));
      expect(state.return_2_page).toBe(true);

      state = InventoryReducer(state, returnQueryUrl('?tab=1'));
      expect(state.return_query_url).toBe('?tab=1');

      state = InventoryReducer(state, changeTab(2, 'filter'));
      expect(state.tab).toBe(2);
      expect(state.action_type).toBe('filter');

      state = InventoryReducer(state, restoreActionType());
      expect(state.action_type).toBe('facet');
    });
  });

  describe('Edge cases', () => {
    it('should return the same state for unknown actions', () => {
      expect(InventoryReducer(initialState, { type: 'UNKNOWN' })).toEqual(initialState);
    });
  });
});
