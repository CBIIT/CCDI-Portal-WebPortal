import React, { useState, useEffect } from 'react';
import env from '../../../utils/env';
import axios from 'axios';
import parseRareCancerMarkdown from './parseRareCancerMarkdown';
import RareCancerResourceView from './RareCancerResourceView';

const RARE_CANCER_MD_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/rareCancerData.md`;

const RareCancerResourceController = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let resultData = {};
      try {
        const fileUrl = `${RARE_CANCER_MD_URL}?ts=${new Date().getTime()}`;
        const result = await axios.get(fileUrl);
        resultData = parseRareCancerMarkdown(result.data);
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

  if (data.rareCancerContent) {
    return <RareCancerResourceView data={data} />;
  }
  return <div />;
};

export default RareCancerResourceController;
