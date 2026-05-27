import React, { useState, useEffect } from 'react';
import env from '../../../utils/env';
import axios from 'axios';
import parseCcdiEventAnnouncementsMarkdown from './parseCcdiEventAnnouncementsMarkdown';
import CCDIEventAnnouncementsMarkdownView from './CCDIEventAnnouncementsMarkdownView';

const CCDI_EVENTS_MD_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/pages/About/ccdi-events-announcements.md`;

const CCDIEventAnnouncementsMarkdownController = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let resultData = {};
      try {
        const fileUrl = `${CCDI_EVENTS_MD_URL}?ts=${new Date().getTime()}`;
        const result = await axios.get(fileUrl);
        resultData = parseCcdiEventAnnouncementsMarkdown(result.data);
      } catch (_error) {
        resultData = {};
      }
      setData(resultData);
    };
    fetchData();
  }, []);

  if (data.ccdiEventAnnouncementsContent && data.ccdiEventAnnouncementsContent.length) {
    return <CCDIEventAnnouncementsMarkdownView data={data} />;
  }
  return <div />;
};

export default CCDIEventAnnouncementsMarkdownController;
