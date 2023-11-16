import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { statsData } from '../../bento/landingPageData';
import LandingView from './landingView';
import { LANDING_DATA_QUERY } from '../../bento/landingPageData';

const getDashData = () => {
  const client = useApolloClient();
  async function getData() {
    let result = await client.query({
      query: LANDING_DATA_QUERY,
      variables: {},
    })
      .then((response) => response.data);
    return result;
  }

  const [statsDataNew, setStatsDataNew] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    getData().then((result) => {
      let newStatList = statsData;
      const MCICount = result.numberOfMCICount;
      newStatList[1].num = MCICount;
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