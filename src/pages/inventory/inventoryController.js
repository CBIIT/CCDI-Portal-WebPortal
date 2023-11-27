import React from 'react';
import { useSelector } from 'react-redux';
import InventoryCover from './inventoryCover';
import InventoryView from './inventoryView';

const InventoryController = (() => {

  const activeFilters = useSelector((state) => state.inventoryReducer.activeFilters);
  const dashData = useSelector((state) => state.inventoryReducer.dashData);

  return (
    <>
      <InventoryCover />
      <InventoryView dashData={dashData} activeFilters={activeFilters} />
    </>
  );
});

export default InventoryController;