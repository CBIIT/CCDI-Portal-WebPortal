import React, { useState, useEffect } from "react";
import yaml from "js-yaml";
import axios from "axios";
import FederationResourceView from "./FederationResourceView";

// const ABOUT_CONTENT_URL = env.REACT_APP_ABOUT_CONTENT_URL;
const FEDERATION_URL = 'https://raw.githubusercontent.com/CBIIT/CCDI_Hub_Static_Contents/local/federationData.yaml';

const FederationResourceController = ({ match }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let resultData = [];
      let result = [];
      try {
        const fileUrl = `${FEDERATION_URL}?ts=${new Date().getTime()}`;
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
  return <FederationResourceView data={data} />;
};
export default FederationResourceController;