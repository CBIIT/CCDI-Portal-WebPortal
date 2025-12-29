import React, { useState, useEffect } from "react";
import env from '../../../utils/env';
import yaml from "js-yaml";
import axios from "axios";
import CPIResourceView from "./CPIResourceView";

const RESOURCE_URL = env.REACT_APP_STATIC_CONTENT_URL + '/resourceData.yaml';
const CPI_URL = 'https://participantindex-qa.ccdi.cancer.gov/v1/statistic';

const getCPIData = () => {
  async function getResourceData() {
    let resultData = [];
    let result = [];
    try {
      const fileUrl = `${RESOURCE_URL}?ts=${new Date().getTime()}`;
      result = await axios.get(
        fileUrl
      );
      resultData = yaml.safeLoad(result.data);
    } catch (_error) {
      // result = await axios.get(YAMLData);
      // resultData = yaml.safeLoad(result.data);
    }
    return resultData;
  }

  async function getCpiStats() {
    try {
      const response = await fetch(CPI_URL);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching CPI statistics:', error);
      return null;
    }
  }

  const [data, setData] = useState([]);
  const [cpiStats, setCpiStats] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    getResourceData().then((resultData) => {
      setData(resultData);
    });
    getCpiStats().then((result) => {
      setCpiStats(result);
    });
    return () => controller.abort();
  }, []);
  return { data, cpiStats };
};

const CPIResourceController = ({ match }) => {
  const { data, cpiStats } = getCPIData();
  if (cpiStats && data) {
    return <CPIResourceView data={data} cpiStats={cpiStats} />;
  } else {
    return <div>Loading...</div>;
  }
};

export default CPIResourceController;
