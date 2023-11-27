import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import InventoryView from './inventoryView';

const InventoryController = (() => {
  const dashData = useSelector((state) => state.dashboardData);

  if (!dashData) {
    return (<div style={{"height": "1200px","paddingTop": "10px"}}><div style={{"margin": "auto","display": "flex","maxWidth": "1800px"}}><CircularProgress /></div></div>);
  }

  return (
    <InventoryView />
  );
});

export default InventoryController;