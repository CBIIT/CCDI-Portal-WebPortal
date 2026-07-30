import React, { useState, useEffect } from 'react';
import env from '../../../utils/env';
import axios from 'axios';
import CCDIEventAnnouncementsResourceView from './CCDIEventAnnouncementsResourceView';
import parseEventAnnouncementsMarkdown from './parseEventAnnouncementsMarkdown';
import {
  buildDetailPageListEntryMarkdown,
  getAllEvents,
} from './eventsUtils';

const EVENT_ANNOUNCEMENTS_MD_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/eventAnnouncements.md`;

const buildFallbackAnnouncementsData = () => ({
  ccdiEventAnnouncementsIntroText: (
    'The CCDI Events Announcements page brings together news announcements '
    + 'and details on past events, webinars, and workshops.'
  ),
  ccdiEventAnnouncementsContent: [
    {
      id: 'CCDI_Event_Archive_1',
      topic: 'Past Events, Webinars, and Workshops',
      content: getAllEvents().map(buildDetailPageListEntryMarkdown).join('\n\n'),
    },
  ],
});

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

      if (!resultData.ccdiEventAnnouncementsContent
          || resultData.ccdiEventAnnouncementsContent.length === 0) {
        setData(buildFallbackAnnouncementsData());
      } else {
        setData(resultData);
      }
    };
    fetchData();
  }, []);

  if (data && data.ccdiEventAnnouncementsContent) {
    return <CCDIEventAnnouncementsResourceView data={data} />;
  }
  return <div />;
};

export default CCDIEventAnnouncementsResourceController;
