import React, { useState, useEffect } from "react";
import env from '../../../utils/env';
import yaml from "js-yaml";
import axios from "axios";
import CBioPortalResourceView from "./cBioPortalResourceView";

const RESOURCE_URL = env.REACT_APP_STATIC_CONTENT_URL + '/resourceData.yaml';

const CBioPortalResourceController = ({ match }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let resultData = [];
      let result = [];
      try {
        const fileUrl = `${RESOURCE_URL}?ts=${new Date().getTime()}`;
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
  return <CBioPortalResourceView data={data} />;
};
export default CBioPortalResourceController;
