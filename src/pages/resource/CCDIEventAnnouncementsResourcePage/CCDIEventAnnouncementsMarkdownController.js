import React, { useState, useEffect } from 'react';
import env from '../../../utils/env';
import yaml from 'js-yaml';
import axios from 'axios';
import parseCcdiEventAnnouncementsMarkdown from './parseCcdiEventAnnouncementsMarkdown';
import CCDIEventAnnouncementsMarkdownView from './CCDIEventAnnouncementsMarkdownView';

const CCDI_EVENTS_MD_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/ccdiEventAnnouncements.md`;
const RESOURCE_DATA_YAML_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/resourceData.yaml`;

const CCDIEventAnnouncementsMarkdownController = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let resultData = {};
      try {
        const fileUrl = `${CCDI_EVENTS_MD_URL}?ts=${new Date().getTime()}`;
        const result = await axios.get(fileUrl);
        resultData = parseCcdiEventAnnouncementsMarkdown(result.data);
      } catch (_mdError) {
        try {
          const fileUrl = `${RESOURCE_DATA_YAML_URL}?ts=${new Date().getTime()}`;
          const result = await axios.get(fileUrl);
          resultData = yaml.safeLoad(result.data) || {};
        } catch (_yamlError) {
          resultData = {};
        }
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
