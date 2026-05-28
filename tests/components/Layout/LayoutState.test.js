/**
 * Unit tests for Layout Redux slice — initial state, sidebar toggle, unknown actions.
 */

import LayoutReducer, {
  initialState,
  toggleSidebar,
  TOGGLE_SIDEBAR,
} from '../../../src/components/Layout/LayoutState';

describe('LayoutState', () => {
  describe('toggleSidebar', () => {
    it('should flip isSidebarOpened when TOGGLE_SIDEBAR is dispatched', () => {
      const afterFirst = LayoutReducer(initialState, toggleSidebar());
      expect(afterFirst.isSidebarOpened).toBe(false);
      const afterSecond = LayoutReducer(afterFirst, toggleSidebar());
      expect(afterSecond.isSidebarOpened).toBe(true);
    });

    it('should use TOGGLE_SIDEBAR action type', () => {
      expect(toggleSidebar().type).toBe(TOGGLE_SIDEBAR);
    });
  });

  describe('Edge cases', () => {
    it('should return the previous state for unknown action types', () => {
      expect(LayoutReducer(initialState, { type: 'UNKNOWN' })).toEqual(initialState);
    });
  });
});
