import React, { useState, useEffect } from 'react';
import env from '../../../utils/env';
import axios from 'axios';
import parseMciJson2TsvMarkdown from './parseMciJson2TsvMarkdown';
import MCIJson2TsvResourceView from './MCIJson2TsvResourceView';

const MCI_JSON2TSV_MD_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/MCI_JSON2TSV.md`;

const MCIJson2TsvResourceController = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let resultData = {};
      try {
        const fileUrl = `${MCI_JSON2TSV_MD_URL}?ts=${new Date().getTime()}`;
        const result = await axios.get(fileUrl);
        resultData = parseMciJson2TsvMarkdown(result.data);
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

  if (data.mciJson2TsvContent) {
    return <MCIJson2TsvResourceView data={data} />;
  }
  return <div />;
};

export default MCIJson2TsvResourceController;
