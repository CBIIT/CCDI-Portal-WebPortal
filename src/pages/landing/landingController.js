import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect } from 'react-redux';
import env from '../../utils/env'
import yaml from "js-yaml";
import axios from "axios";
import { CircularProgress } from '@material-ui/core';
import { statsData } from '../../bento/landingPageData';
import LandingView from './landingView';
import { LANDING_DATA_QUERY } from '../../bento/landingPageData';

const CCDCurl ='https://datacatalog.ccdi.cancer.gov/service/datasets/count';
const NEWS_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/newsData.yaml`;

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

  async function getNewsData() {
    let resultData = [];
    let result = [];
    try {
      const fileUrl = `${NEWS_URL}?ts=${new Date().getTime()}`;
      result = await axios.get(
        fileUrl
      );
      resultData = yaml.safeLoad(result.data);
    } catch (_error) {
    }
    return resultData
  }

  const [statsDataNew, setStatsDataNew] = useState(statsData);
  const [data, setData] = useState([]);

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
    getNewsData().then((resultData) => {
      setData(resultData);
    });
    return () => controller.abort();
  },[]);
  return { statsDataNew, data };
};

const LandingController = (() => {
  const { statsDataNew, data } = getDashData();

  if (!statsDataNew) {
    return (<div style={{"height": "1200px","paddingTop": "10px"}}><div style={{"margin": "auto","display": "flex","maxWidth": "1800px"}}><CircularProgress /></div></div>);
  }

  return (
    <LandingView
      statsData={statsDataNew}
      newsData={data}
    />
  );
});

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, null)(LandingController);