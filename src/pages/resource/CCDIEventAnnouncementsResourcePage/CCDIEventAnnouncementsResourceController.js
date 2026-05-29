import React, { useState, useEffect } from "react";
import env from '../../../utils/env';
import yaml from "js-yaml";
import axios from "axios";
import CCDIEventAnnouncementsResourceView from "./CCDIEventAnnouncementsResourceView";
import {
  buildDetailPageListEntryHtml,
  getAllEvents,
} from './eventsUtils';

const RESOURCE_URL = env.REACT_APP_STATIC_CONTENT_URL + '/resourceData.yaml';

const buildFallbackAnnouncementsData = () => ({
  ccdiEventAnnouncementsIntroText: (
    '<p>The CCDI Events Announcements page brings together news announcements '
    + 'and details on past events, webinars, and workshops.</p>'
  ),
  ccdiEventAnnouncementsContent: [
    {
      id: 'CCDI_Event_Archive_1',
      topic: 'Past Events, Webinars, and Workshops',
      content: `<p>${getAllEvents().map(buildDetailPageListEntryHtml).join('<br><br>')}</p>`,
    },
  ],
});

const CCDIEventAnnouncementsResourceController = ({ match }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let resultData = {};
      try {
        const fileUrl = `${RESOURCE_URL}?ts=${new Date().getTime()}`;
        const result = await axios.get(fileUrl);
        resultData = yaml.safeLoad(result.data) || {};
      } catch (_error) {
        resultData = {};
      }

      if (!resultData.ccdiEventAnnouncementsContent) {
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
