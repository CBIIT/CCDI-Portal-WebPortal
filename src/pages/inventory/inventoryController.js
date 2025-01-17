import React from 'react';
import { useSelector } from 'react-redux';
import InventoryCover from './inventoryCover';
import InventoryView from './inventoryView';
import { CohortStateProvider } from '../../components/CohortSelectorState/CohortStateContext';
import { CohortModalProvider } from './cohortModal/CohortModalContext';

const InventoryController = (() => {

  const activeFilters = useSelector((state) => state.inventoryReducer.activeFilters);
  const dashData = useSelector((state) => state.inventoryReducer.dashData);

  return (
    <>
      <CohortStateProvider>
        <CohortModalProvider>
          <InventoryCover />
          <InventoryView dashData={dashData} activeFilters={activeFilters} />
        </CohortModalProvider>
      </CohortStateProvider>
    </>
  );
});

export default InventoryController;