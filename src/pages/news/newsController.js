import React, { useState, useEffect } from "react";
import yaml from "js-yaml";
import axios from "axios";
import NewsView from "./newsView";

// const ABOUT_CONTENT_URL = env.REACT_APP_ABOUT_CONTENT_URL;
const NEWS_URL = 'https://raw.githubusercontent.com/CBIIT/CCDI_Hub_Static_Contents/dev/newsData.yaml';

const NewsController = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let resultData = [];
      let result = [];
      try {
        const fileUrl = `${NEWS_URL}?ts=${new Date().getTime()}`;
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
  if (data.newsList) {
    return <NewsView newsList={data.newsList} />;
  } else {
    return <div />
  }
};
export default NewsController;
