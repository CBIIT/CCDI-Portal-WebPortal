import React, { useEffect, useRef, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect } from 'react-redux';
import env from '../../utils/env';
import axios from 'axios';
import { fetchNewsData } from '../news/parseNewsMarkdown';
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
import { srcList as localNewsSrcList } from '../../bento/newsData';
import parseLandingMarkdown, {
  createEmptyLandingContent,
  mergeLandingContent,
} from './parseLandingMarkdown';
import { LandingContentProvider } from './LandingContentContext';
import LandingView from './landingView';

const CCDCurl = 'https://datacatalog.ccdi.cancer.gov/service/datasets/count';
const NCCRExplorerUrl = 'https://datacatalog.ccdi.cancer.gov/service/datasets/CCDI-NCCR_Explorer';
const CBIOPORTAL_STUDIES_URL = 'https://cbioportal-api.ccdi.cancer.gov/api/studies';
const FEDERATION_ORGANIZATIONS_URL = 'https://federation.ccdi.cancer.gov/api/v1/organization';
const PARTICIPANT_INDEX_URL = 'https://ccdi.cancer.gov/ccdi-participant-index';
const LANDING_MD_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/landingData.md`;

const c3dcParticipantsStat = {
  num: '',
  title: 'Participants with Harmonized Clinical Data',
  detail: 'Childhood Clinical Cancer Data Commons',
  link: 'https://clinicalcommons.ccdi.cancer.gov/exploreParticipants',
};

const cBioPortalStat = {
  num: '',
  title: 'Datasets with Mutation and Other Data',
  detail: 'CCDI cBioPortal',
  link: 'https://cbioportal.ccdi.cancer.gov',
};

const federationStat = {
  num: '',
  title: 'Resources Participating in Federated Data Queries',
  detail: 'CCDI Federation Resource',
  link: '/data-federation-resource',
};

function isC3dcParticipantsStat(row) {
  const detail = String((row && row.detail) || '');
  const link = String((row && row.link) || '');
  return /exploreParticipants/i.test(link) || /clinical cancer data commons/i.test(detail);
}

function isCbioPortalStat(row) {
  const detail = String((row && row.detail) || '');
  const link = String((row && row.link) || '');
  return /cbioportal/i.test(detail) || /cbioportal/i.test(link);
}

function isFederationStat(row) {
  const detail = String((row && row.detail) || '');
  const link = String((row && row.link) || '');
  return /federation resource/i.test(detail)
    || /data-federation-resource/i.test(link)
    || /federation\.ccdi\.cancer\.gov/i.test(link);
}

function withParticipantIndexLink(items) {
  if (!Array.isArray(items)) {
    return items;
  }
  return items.map((item) => {
    if (!item || typeof item !== 'object') {
      return item;
    }
    const label = String(item.title || item.content || item.name || '');
    const link = String(item.link || '');
    if (!/participant index/i.test(label) && !/ccdi-participant-index/i.test(link)) {
      return item;
    }
    return { ...item, link: PARTICIPANT_INDEX_URL };
  });
}

/** Participating resources are the outer groups returned by the organization API. */
function federationResourceCount(body) {
  if (!Array.isArray(body)) {
    return null;
  }
  return body.length;
}

/**
 * Live counts replace markdown/static nums.
 * Labels still come from landingData.md when that row is present.
 * NCCR cases use the catalog dataset field case_id.
 * Harmonized clinical participants use C3DC numberOfParticipants.
 * cBioPortal datasets use the studies array length.
 * Federation resources use the organization response length.
 */
function applyLiveStatCounts(rows, liveCounts) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return Array.isArray(rows) ? rows : [];
  }
  const next = rows.map((row) => ({ ...row }));
  if (next[0] && liveCounts.catalog != null) {
    next[0] = { ...next[0], num: liveCounts.catalog };
  }
  if (next[1] && liveCounts.mci != null) {
    next[1] = { ...next[1], num: liveCounts.mci };
  }
  if (next[2] && liveCounts.nccr != null) {
    next[2] = { ...next[2], num: liveCounts.nccr };
  }

  let c3dcIndex = next.findIndex(isC3dcParticipantsStat);
  if (c3dcIndex === -1) {
    const cbioAt = next.findIndex(isCbioPortalStat);
    const insertAt = cbioAt === -1 ? next.length : cbioAt;
    next.splice(insertAt, 0, { ...c3dcParticipantsStat });
    c3dcIndex = insertAt;
  }
  if (liveCounts.participants != null) {
    next[c3dcIndex] = { ...next[c3dcIndex], num: liveCounts.participants };
  }

  let cbioIndex = next.findIndex(isCbioPortalStat);
  if (cbioIndex === -1) {
    next.push({ ...cBioPortalStat });
    cbioIndex = next.length - 1;
  }
  if (liveCounts.cbioportal != null) {
    next[cbioIndex] = { ...next[cbioIndex], num: liveCounts.cbioportal };
  }

  let federationIndex = next.findIndex(isFederationStat);
  if (federationIndex === -1) {
    next.push({ ...federationStat });
    federationIndex = next.length - 1;
  }
  if (liveCounts.federation != null) {
    next[federationIndex] = { ...next[federationIndex], num: liveCounts.federation };
  }
  return next;
}

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

  async function getNCCRExplorer() {
    const response = await fetch(NCCRExplorerUrl);
    const result = await response.json();
    return result;
  }

  async function getCBioPortalStudies() {
    const response = await fetch(CBIOPORTAL_STUDIES_URL);
    const result = await response.json();
    return result;
  }

  async function getFederationOrganizations() {
    const response = await fetch(FEDERATION_ORGANIZATIONS_URL);
    const result = await response.json();
    return result;
  }

  async function getNewsData() {
    const news = await fetchNewsData();
    const { releaseNotesList, ccdiDataUpdatesList } = await fetchReleaseNotesData();
    return {
      newsList: news.newsList,
      newsImgUrlList: { ...localNewsSrcList, ...news.newsImgUrlList },
      altList: news.altList,
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
      const merged = mergeLandingContent(parsed, landingAssetDefaults);
      return {
        ...merged,
        resourcesAppliationsListData: withParticipantIndexLink(merged.resourcesAppliationsListData),
        carouselList: withParticipantIndexLink(merged.carouselList),
      };
    } catch (_error) {
      return emptyLandingContent;
    }
  }

  const [landingContent, setLandingContent] = useState(emptyLandingContent);
  const [statsDataNew, setStatsDataNew] = useState([]);
  const [data, setData] = useState([]);
  const liveCountsRef = useRef({
    catalog: undefined,
    mci: undefined,
    nccr: undefined,
    participants: undefined,
    cbioportal: undefined,
    federation: undefined,
  });

  useEffect(() => {
    const controller = new AbortController();

    getLandingContent().then((content) => {
      setLandingContent(content);
      setStatsDataNew(applyLiveStatCounts(content.statsData, liveCountsRef.current));
    });

    getNewsData().then((resultData) => {
      setData(resultData);
    });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    getCCDC()
      .then((result) => {
        if (result == null || result.data == null) {
          return;
        }
        liveCountsRef.current.catalog = result.data;
        setStatsDataNew((prev) => applyLiveStatCounts(prev, liveCountsRef.current));
      })
      .catch(() => {
        // Keep labels visible when the catalog count request fails.
      });
    getData()
      .then((result) => {
        if (result == null) {
          return;
        }
        if (result.numberOfMCICount != null) {
          liveCountsRef.current.mci = result.numberOfMCICount;
        }
        if (result.numberOfParticipants != null) {
          liveCountsRef.current.participants = result.numberOfParticipants;
        }
        setStatsDataNew((prev) => applyLiveStatCounts(prev, liveCountsRef.current));
      })
      .catch(() => {
        // Keep labels visible when the MCI count request fails.
      });
    getNCCRExplorer()
      .then((result) => {
        const caseId = result && result.data && result.data.case_id;
        if (caseId == null) {
          return;
        }
        liveCountsRef.current.nccr = caseId;
        setStatsDataNew((prev) => applyLiveStatCounts(prev, liveCountsRef.current));
      })
      .catch(() => {
        // Keep the markdown case total when the NCCR dataset request fails.
      });
    getCBioPortalStudies()
      .then((result) => {
        if (!Array.isArray(result)) {
          return;
        }
        liveCountsRef.current.cbioportal = result.length;
        setStatsDataNew((prev) => applyLiveStatCounts(prev, liveCountsRef.current));
      })
      .catch(() => {
        // Keep the cBioPortal label visible when the studies request fails.
      });
    getFederationOrganizations()
      .then((result) => {
        const count = federationResourceCount(result);
        if (count == null) {
          return;
        }
        liveCountsRef.current.federation = count;
        setStatsDataNew((prev) => applyLiveStatCounts(prev, liveCountsRef.current));
      })
      .catch(() => {
        // Keep the federation label visible when the organization request fails.
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
