import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect } from 'react-redux';
import env from '../../utils/env';
import yaml from 'js-yaml';
import axios from 'axios';
import { fetchReleaseNotesData, mergeReleaseNotesLists } from '../releaseNotePage/parseReleaseNotesMarkdown';
import { CircularProgress } from '@material-ui/core';
import {
  introData as defaultIntroData,
  titleData as defaultTitleData,
  statsData as defaultStatsData,
  statsNote as defaultStatsNote,
  resourcesAppliationsListData as defaultResourcesApplications,
  resourcesCloudListData as defaultResourcesCloud,
  carouselList as defaultCarouselList,
  LANDING_DATA_QUERY,
} from '../../bento/landingPageData';
import parseLandingMarkdown, { mergeLandingContent } from './parseLandingMarkdown';
import { LandingContentProvider } from './LandingContentContext';
import LandingView from './landingView';

const CCDCurl = 'https://datacatalog.ccdi.cancer.gov/service/datasets/count';
const NEWS_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/newsData.yaml`;
const LANDING_MD_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/landingData.md`;

const defaultLandingContent = {
  introData: defaultIntroData,
  titleData: defaultTitleData,
  statsData: defaultStatsData,
  statsNote: defaultStatsNote,
  resourcesAppliationsListData: defaultResourcesApplications,
  resourcesCloudListData: defaultResourcesCloud,
  carouselList: defaultCarouselList,
};

const getDashData = () => {
  const client = useApolloClient();
  async function getData() {
    const result = await client.query({
      query: LANDING_DATA_QUERY,
      variables: {},
    })
      .then((response) => response.data);
    return result;
  }

  async function getCCDC() {
    const response = await fetch(CCDCurl);
    const result = await response.json();
    return result;
  }

  async function getNewsData() {
    let resultData = {};
    try {
      const fileUrl = `${NEWS_URL}?ts=${new Date().getTime()}`;
      const result = await axios.get(fileUrl);
      resultData = yaml.safeLoad(result.data) || {};
    } catch (_error) {
      /* empty */
    }
    const { releaseNotesList, ccdiDataUpdatesList } = await fetchReleaseNotesData();
    return {
      ...resultData,
      releaseNotesList: mergeReleaseNotesLists(releaseNotesList, ccdiDataUpdatesList),
    };
  }

  async function getLandingContent() {
    try {
      const fileUrl = `${LANDING_MD_URL}?ts=${new Date().getTime()}`;
      const result = await axios.get(fileUrl);
      const parsed = parseLandingMarkdown(result.data);
      return mergeLandingContent(parsed, defaultLandingContent);
    } catch (_error) {
      return defaultLandingContent;
    }
  }

  const [landingContent, setLandingContent] = useState(defaultLandingContent);
  const [statsDataNew, setStatsDataNew] = useState(defaultStatsData);
  const [data, setData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    getLandingContent().then((content) => {
      setLandingContent(content);
      setStatsDataNew(content.statsData.map((row) => ({ ...row })));
    });

    getNewsData().then((resultData) => {
      setData(resultData);
    });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    getCCDC().then((result) => {
      setStatsDataNew((prev) => {
        const next = prev.map((row) => ({ ...row }));
        if (next[0]) {
          next[0] = { ...next[0], num: result.data };
        }
        return next;
      });
    });
    getData().then((result) => {
      setStatsDataNew((prev) => {
        const next = prev.map((row) => ({ ...row }));
        if (next[1]) {
          next[1] = { ...next[1], num: result.numberOfMCICount };
        }
        return next;
      });
    });
  }, []);

  return { statsDataNew, data, landingContent };
};

const LandingController = (() => {
  const { statsDataNew, data, landingContent } = getDashData();

  if (!statsDataNew) {
    return (
      <div style={{ height: '1200px', paddingTop: '10px' }}>
        <div style={{ margin: 'auto', display: 'flex', maxWidth: '1800px' }}>
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <LandingContentProvider value={landingContent}>
      <LandingView
        statsData={statsDataNew}
        newsData={data}
      />
    </LandingContentProvider>
  );
});

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, null)(LandingController);
