import React, { useState, useEffect } from "react";
import env from '../../../utils/env';
import axios from "axios";
import PublicationsView from "./publicationsView";
import { parsePublicationsMarkdown } from "./parsePublicationsMarkdown";

const PUBLICATIONS_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/publicationsData.md`;

const PublicationsController = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let resultData = [];
      try {
        const fileUrl = `${PUBLICATIONS_URL}?ts=${new Date().getTime()}`;
        const result = await axios.get(fileUrl);
        resultData = parsePublicationsMarkdown(result.data);
      } catch (_error) {
        // leave resultData as []
      }

      setData(resultData);
    };
    fetchData();
  }, []);
  if (data.publicationsList) {
    return <PublicationsView headerImg={data.Publications_Header} bannerText={data.bannerText} publicationsList={data.publicationsList} />;
  } else {
    return <div />
  }
};
export default PublicationsController;
