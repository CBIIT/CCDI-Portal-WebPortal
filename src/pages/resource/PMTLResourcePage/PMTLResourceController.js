import React, { useState, useEffect } from 'react';
import env from '../../../utils/env';
import axios from 'axios';
import parsePmtlMarkdown from './parsePmtlMarkdown';
import PMTLResourceView from './PMTLResourceView';

const PMTL_MD_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/pmtlData.md`;

const PMTLResourceController = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let resultData = {};
      try {
        const fileUrl = `${PMTL_MD_URL}?ts=${new Date().getTime()}`;
        const result = await axios.get(fileUrl);
        resultData = parsePmtlMarkdown(result.data);
      } catch (_error) {
        /* empty state; page still mounts */
      }
      setData(resultData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!data.title) {
      return undefined;
    }
    const previousTitle = document.title;
    document.title = data.title;
    return () => {
      document.title = previousTitle;
    };
  }, [data.title]);

  return <PMTLResourceView data={data} />;
};

export default PMTLResourceController;
