import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { statsData } from '../../bento/landingPageData';
import LandingView from './landingView';
import { LANDING_DATA_QUERY } from '../../bento/landingPageData';

const CCDCurl ='http://localhost:3000/service/datasets/count';

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

  async function getCCDC() {
    const response = await fetch(CCDCurl);
    const result = await response.json();
    return result;
  }

  const [statsDataNew, setStatsDataNew] = useState(statsData);

  useEffect(() => {
    const controller = new AbortController();
    getCCDC().then((result) => {
      let newStatList = statsDataNew;
      newStatList[0].num = result.data;
      setStatsDataNew([...newStatList]);
    });
    getData().then((result) => {
      let newStatList = statsDataNew;
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