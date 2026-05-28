import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../../utils/env';
import parseMciMarkdown from './parseMciMarkdown';
import MCIResourceMarkdownView from './MCIResourceMarkdownView';

const MCI_MD_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/mciData.md`;

const MCIResourceMarkdownController = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let resultData = {};
      try {
        const fileUrl = `${MCI_MD_URL}?ts=${new Date().getTime()}`;
        const result = await axios.get(fileUrl);
        resultData = parseMciMarkdown(result.data);
      } catch (_error) {
        /* empty state; page still mounts */
      }
      setData(resultData);
    };
    fetchData();
  }, []);

  return <MCIResourceMarkdownView data={data} />;
};

export default MCIResourceMarkdownController;
