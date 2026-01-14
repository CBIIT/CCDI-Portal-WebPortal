import React, { useState, useEffect } from "react";
import env from '../../../utils/env';
import yaml from "js-yaml";
import axios from "axios";
import CPIResourceView from "./CPIResourceView";

const RESOURCE_URL = env.REACT_APP_STATIC_CONTENT_URL + '/resourceData.yaml';
const CPI_URL = 'https://participantindex.ccdi.cancer.gov/v1/statistic';

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
      if (response.status !== 200) {
        console.error('Error fetching CPI statistics: Status', response.status);
        throw new Error(`API returned status ${response.status}`);
      }
      const result = await response.json();
      return { success: true, data: result };
    } catch (error) {
      console.error('Error fetching CPI statistics:', error);
      return { success: false, error: error.message };
    }
  }

  const [data, setData] = useState([]);
  const [cpiStats, setCpiStats] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingCpiStats, setLoadingCpiStats] = useState(true);
  const [cpiStatsError, setCpiStatsError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    
    setLoadingData(true);
    getResourceData().then((resultData) => {
      setData(resultData);
      setLoadingData(false);
    });
    
    setLoadingCpiStats(true);
    setCpiStatsError(false);
    getCpiStats().then((result) => {
      if (result.success) {
        setCpiStats(result.data);
        setCpiStatsError(false);
      } else {
        setCpiStats(null);
        setCpiStatsError(true);
      }
      setLoadingCpiStats(false);
    });
    
    return () => controller.abort();
  }, []);
  
  return { data, cpiStats, loadingData, loadingCpiStats, cpiStatsError };
};

const CPIResourceController = ({ match }) => {
  const { data, cpiStats, loadingData, loadingCpiStats, cpiStatsError } = getCPIData();
  
  // Show loading while resource data is being fetched
  if (loadingData) {
    return <div>Loading...</div>;
  }
  
  // If resource data is loaded, show the view
  // The view will handle loading/error states for cpiStats
  if (data) {
    return (
      <CPIResourceView 
        data={data} 
        cpiStats={cpiStats} 
        loadingCpiStats={loadingCpiStats}
        cpiStatsError={cpiStatsError}
      />
    );
  }
  
  // Fallback (shouldn't normally reach here)
  return <div>Loading...</div>;
};

export default CPIResourceController;
