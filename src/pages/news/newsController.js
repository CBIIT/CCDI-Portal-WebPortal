import React, { useState, useEffect } from "react";
import env from '../../utils/env'
import yaml from "js-yaml";
import axios from "axios";
import NewsView from "./newsView";
import { fetchReleaseNotesData } from "../releaseNotePage/parseReleaseNotesMarkdown";

const NEWS_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/newsData.yaml`;

const NewsController = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let resultData = {};
      try {
        const fileUrl = `${NEWS_URL}?ts=${new Date().getTime()}`;
        const result = await axios.get(fileUrl);
        resultData = yaml.safeLoad(result.data) || {};
      } catch (_error) {
        // resultData stays {}
      }

      const { releaseNotesList, ccdiDataUpdatesList } = await fetchReleaseNotesData();
      setData({ ...resultData, releaseNotesList, ccdiDataUpdatesList });
    };
    fetchData();
  }, []);
  if (data.newsList) {
    return (
      <NewsView
        newsList={data.newsList}
        srcList={data.newsImgUrlList}
        altList={data.altList}
        releaseNotesList={data.releaseNotesList}
        ccdiDataUpdatesList={data.ccdiDataUpdatesList}
      />
    );
  } else {
    return <div />
  }
};
export default NewsController;
