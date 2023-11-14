import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { statsData } from '../../bento/landingPageData';
import LandingView from './landingView';
import { DASHBOARD_QUERY_NEW } from '../../bento/dashboardTabData';

const getDashData = () => {
  const client = useApolloClient();
  async function getData() {
    let result = await client.query({
      query: DASHBOARD_QUERY_NEW,
      variables: {"phs_accession": ['phs002790'], "participant_ids": []},
    })
      .then((response) => response.data);
    return result;
  }

  const [statsDataNew, setStatsDataNew] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    getData().then((result) => {
      let newStatList = statsData;
      const participantsNum = result.searchParticipants.numberOfParticipants;
      newStatList[1].num = participantsNum;
      setStatsDataNew([...newStatList]);
    });
    return () => controller.abort();
  },[]);
  return { statsDataNew };
};

const LandingController = (() => {
  const { statsDataNew } = getDashData();

  if (!statsDataNew) {
    return (<div style={{"height": "1200px","paddingTop": "10px"}}><div style={{"margin": "auto","display": "flex","maxWidth": "1800px"}}><CircularProgress /></div></div>);
  }

  return (
    <LandingView
      statsData={statsDataNew}
    />
  );
});

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, null)(LandingController);