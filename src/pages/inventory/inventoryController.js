import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { getFilters } from '@bento-core/facet-filter';
import InventoryView from './inventoryView';
import { DASHBOARD_QUERY_NEW } from '../../bento/dashboardTabData';

const getDashData = (states) => {
  const {
    filterState,
    localFindUpload, localFindAutocomplete,
  } = states;

  const client = useApolloClient();
  async function getData(activeFilters) {
    // let result = await client.query({
    //   query: DASHBOARD_QUERY_NEW,
    //   variables: activeFilters,
    // })
    //   .then((response) => response.data);
    const result = {
      "numberOfPrograms": 1,
      "numberOfStudies": 1,
      "numberOfSubjects": 2,
      "numberOfSamples": 3,
      "numberOfLabProcedures": 4,
      "numberOfFiles": 5
    }
    console.log(result);
    return result;
  }

  const [dashData, setDashData] = useState(null);

  const activeFilters = {
    ...getFilters(filterState),
    subject_ids: [
      ...(localFindUpload || []).map((obj) => obj.subject_id),
      ...(localFindAutocomplete || []).map((obj) => obj.title),
    ],
  };

  useEffect(() => {
    const controller = new AbortController();
    getData(activeFilters).then((result) => {
      if (result.searchSubjects) {
        setDashData(result.searchSubjects);
      }
    });
    return () => controller.abort();
  }, [filterState, localFindUpload, localFindAutocomplete]);
  return { dashData, activeFilters };
};

const InventoryController = ((props) => {
  const { dashData, activeFilters } = getDashData(props);

  console.log("adfasdf");

  if (!dashData) {
    return (<CircularProgress />);
  }

  return (
    <InventoryView
      {...props}
      dashData={dashData}
      activeFilters={activeFilters}
    />
  );
});

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
  localFindUpload: state.localFind.upload,
  localFindAutocomplete: state.localFind.autocomplete,
});

export default connect(mapStateToProps, null)(InventoryController);