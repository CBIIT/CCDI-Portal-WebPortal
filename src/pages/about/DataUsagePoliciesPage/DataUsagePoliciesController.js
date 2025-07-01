import React, { useState, useEffect } from "react";
import env from '../../../utils/env';
import yaml from "js-yaml";
import axios from "axios";
import DataUsagePoliciesView from "./DataUsagePoliciesView";

const ABOUT_URL = env.REACT_APP_STATIC_CONTENT_URL + '/aboutStaticData.yaml';

const DataUsagePoliciesController = ({ match }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let resultData = [];
      let result = [];
      try {
        const fileUrl = `${ABOUT_URL}?ts=${new Date().getTime()}`;
        result = await axios.get(
          fileUrl
        );
        resultData = yaml.safeLoad(result.data);
      } catch (_error) {
        // result = await axios.get(YAMLData);
        // resultData = yaml.safeLoad(result.data);
      }

      setData(resultData);
    };
    fetchData();
  }, []);
  if (data.dataUsagePoliciesContent) {
    return <DataUsagePoliciesView data={data} />;
  } else {
    return <div />
  }
};
export default DataUsagePoliciesController;
