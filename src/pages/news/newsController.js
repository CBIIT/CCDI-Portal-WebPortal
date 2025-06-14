import React, { useState, useEffect } from "react";
import env from '../../utils/env'
import yaml from "js-yaml";
import axios from "axios";
import NewsView from "./newsView";

const NEWS_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/newsData.yaml`;

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
    return <NewsView newsList={data.newsList} altList={data.altList} releaseNotesList={data.releaseNotesList} />;
  } else {
    return <div />
  }
};
export default NewsController;
