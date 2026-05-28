/**
 * Resets the singleton Redux store slices used by Explore (`inventoryCover` / `Inventory`).
 * Call in `beforeEach` when tests mount `/explore` multiple times — unmount dispatches `return2Page(true)`.
 */

import store from '../../src/store';
import {
  afterInitialLoading,
  changeTab,
  inDataloading,
  return2Page,
  returnQueryUrl,
  restoreActionType,
  syncUpDashboard,
  updateImportfrom,
} from '../../src/components/Inventory/InventoryState';
import { exploreDashboardWithSexAtBirthFacets } from '../fixtures/explore/apiResponses';

export function resetExploreSingletonStore() {
  store.dispatch(updateImportfrom(null, []));
  store.dispatch(return2Page(false));
  store.dispatch(returnQueryUrl(''));
  store.dispatch(restoreActionType());
  store.dispatch(changeTab(0, 'facet'));
  store.dispatch(syncUpDashboard(null, exploreDashboardWithSexAtBirthFacets));
  store.dispatch(inDataloading(false));
  store.dispatch(afterInitialLoading());
}
