import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect } from 'react-redux';
import env from '../../utils/env';
import yaml from 'js-yaml';
import axios from 'axios';
import { fetchReleaseNotesData, mergeReleaseNotesLists } from '../releaseNotePage/parseReleaseNotesMarkdown';
import { CircularProgress } from '@material-ui/core';
import {
  introData as assetIntroData,
  titleData as assetTitleData,
  statsData as assetStatsData,
  statsNote as assetStatsNote,
  resourcesAppliationsListData as assetResourcesApplications,
  resourcesCloudListData as assetResourcesCloud,
  carouselList as assetCarouselList,
  LANDING_DATA_QUERY,
} from '../../bento/landingPageData';
import parseLandingMarkdown, {
  createEmptyLandingContent,
  mergeLandingContent,
} from './parseLandingMarkdown';
import { LandingContentProvider } from './LandingContentContext';
import LandingView from './landingView';

const CCDCurl = 'https://datacatalog.ccdi.cancer.gov/service/datasets/count';
const NEWS_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/newsData.yaml`;
const LANDING_MD_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/landingData.md`;

/** Local webpack assets only — never used as copy fallback when MD is missing. */
const landingAssetDefaults = {
  introData: assetIntroData,
  titleData: assetTitleData,
  statsData: assetStatsData,
  statsNote: assetStatsNote,
  resourcesAppliationsListData: assetResourcesApplications,
  resourcesCloudListData: assetResourcesCloud,
  carouselList: assetCarouselList,
};

const emptyLandingContent = createEmptyLandingContent(landingAssetDefaults);

const getDashData = () => {
  const client = useApolloClient();
  async function getData() {
    // MCI participant count lives on C3DC Integrated OpenSearch, not Hub.
    const result = await client.query({
      query: LANDING_DATA_QUERY,
      variables: {},
      context: { clientName: 'c3dcService' },
      fetchPolicy: 'network-only',
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
      if (!parsed) {
        return emptyLandingContent;
      }
      return mergeLandingContent(parsed, landingAssetDefaults);
    } catch (_error) {
      return emptyLandingContent;
    }
  }

  const [landingContent, setLandingContent] = useState(emptyLandingContent);
  const [statsDataNew, setStatsDataNew] = useState([]);
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

  if (statsDataNew == null) {
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
