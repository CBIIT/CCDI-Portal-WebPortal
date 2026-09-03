import React, { useState, useEffect } from 'react';
import env from '../../../utils/env';
import axios from 'axios';
import CCDIEventAnnouncementsResourceView from './CCDIEventAnnouncementsResourceView';
import parseEventAnnouncementsMarkdown from './parseEventAnnouncementsMarkdown';

const EVENT_ANNOUNCEMENTS_MD_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/eventAnnouncements.md`;

const CCDIEventAnnouncementsResourceController = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let resultData = {};
      try {
        const fileUrl = `${EVENT_ANNOUNCEMENTS_MD_URL}?ts=${new Date().getTime()}`;
        const result = await axios.get(fileUrl);
        resultData = parseEventAnnouncementsMarkdown(result.data) || {};
      } catch (_error) {
        resultData = {};
      }

      setData(resultData);
    };
    fetchData();
  }, []);

  if (data && data.ccdiEventAnnouncementsContent) {
    return <CCDIEventAnnouncementsResourceView data={data} />;
  }
  return <div />;
};

export default CCDIEventAnnouncementsResourceController;
