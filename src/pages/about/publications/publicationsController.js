import React, { useState, useEffect } from "react";
import env from '../../../utils/env'
import yaml from "js-yaml";
import axios from "axios";
import PublicationsView from "./publicationsView";

const PUBLICATIONS_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/publicationsData.yaml`;

const PublicationsController = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let resultData = [];
      let result = [];
      try {
        const fileUrl = `${PUBLICATIONS_URL}?ts=${new Date().getTime()}`;
        result = await axios.get(
          fileUrl
        );
        resultData = yaml.safeLoad(result.data);
      } catch (_error) {
        // result = await axios.get(YAMLData);
        // resultData = yaml.safeLoad(result.data);
      }

      setData(resultData);
    };
    fetchData();
  }, []);
  if (data.publicationsList) {
    return <PublicationsView bannerText={data.bannerText} publicationsList={data.publicationsList} />;
  } else {
    return <div />
  }
};
export default PublicationsController;
