import React, { useState, useEffect } from 'react';
import env from '../../../utils/env';
import axios from 'axios';
import parseFederationMarkdown from './parseFederationMarkdown';
import FederationResourceView from './FederationResourceView';

const FEDERATION_MD_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/federationData.md`;

const FederationResourceController = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let resultData = {};
      try {
        const fileUrl = `${FEDERATION_MD_URL}?ts=${new Date().getTime()}`;
        const result = await axios.get(fileUrl);
        resultData = parseFederationMarkdown(result.data);
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

  if (data.federationContent) {
    return <FederationResourceView data={data} />;
  }
  return <div />;
};

export default FederationResourceController;
