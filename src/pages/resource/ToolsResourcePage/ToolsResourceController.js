import React, { useState, useEffect } from 'react';
import env from '../../../utils/env';
import axios from 'axios';
import parseToolsMarkdown from './parseToolsMarkdown';
import ToolsResourceView from './ToolsResourceView';

const TOOLS_MD_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/toolsData.md`;

const ToolsController = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let resultData = {};
      try {
        const fileUrl = `${TOOLS_MD_URL}?ts=${new Date().getTime()}`;
        const result = await axios.get(fileUrl);
        resultData = parseToolsMarkdown(result.data);
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

  if (data.toolsContent) {
    return <ToolsResourceView data={data} />;
  }
  return <div />;
};

export default ToolsController;
