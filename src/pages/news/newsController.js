import React, { useState, useEffect } from "react";
import NewsView from "./newsView";
import { fetchNewsData } from "./parseNewsMarkdown";
import { fetchReleaseNotesData } from "../releaseNotePage/parseReleaseNotesMarkdown";
import { srcList as localNewsSrcList } from "../../bento/newsData";

const NewsController = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const news = await fetchNewsData();
      const { releaseNotesList, ccdiDataUpdatesList } = await fetchReleaseNotesData();
      setData({
        newsList: news.newsList,
        newsImgUrlList: { ...localNewsSrcList, ...news.newsImgUrlList },
        altList: news.altList,
        releaseNotesList,
        ccdiDataUpdatesList,
      });
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
