import React, { useState, useEffect } from 'react';
import env from '../../../utils/env';
import axios from 'axios';
import parseDataUsagePoliciesMarkdown from './parseDataUsagePoliciesMarkdown';
import DataUsagePoliciesView from './DataUsagePoliciesView';

const DATA_USAGE_POLICIES_MD_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/dataUsagePolicies.md`;

const DataUsagePoliciesController = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let resultData = {};
      try {
        const fileUrl = `${DATA_USAGE_POLICIES_MD_URL}?ts=${new Date().getTime()}`;
        const result = await axios.get(fileUrl);
        resultData = parseDataUsagePoliciesMarkdown(result.data);
      } catch (_error) {
        /* empty state; page still mounts */
      }
      setData(resultData);
    };
    fetchData();
  }, []);

  if (data.dataUsagePoliciesContent) {
    return <DataUsagePoliciesView data={data} />;
  }
  return <div />;
};

export default DataUsagePoliciesController;
