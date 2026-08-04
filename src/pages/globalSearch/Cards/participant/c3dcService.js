import gql from 'graphql-tag';
import env from '../../../../utils/env';

export { getCpiDedupKey, mergeCpiData } from './cpiMergeUtils';

export const C3DC_BASE_URL = (
  env.REACT_APP_C3DC || 'https://clinicalcommons-integrated-dev.ccdi.cancer.gov'
).replace(/\/$/, '');

export const C3DC_BACKEND_API = `${C3DC_BASE_URL}/v1/graphql/`;

/**
 * Build a C3DC Explore deep-link (`p_id` only, optional `tab` / `path`).
 * Defaults to `/exploreParticipants`.
 */
export const buildC3dcExploreUrl = (participantId, options = {}) => {
  const path = options.path || '/exploreParticipants';
  if (!participantId) {
    return `${C3DC_BASE_URL}${path}`;
  }
  const params = new URLSearchParams();
  params.set('p_id', participantId);
  if (options.tab != null && options.tab !== '') {
    params.set('tab', String(options.tab));
  }
  return `${C3DC_BASE_URL}${path}?${params.toString()}`;
};

export const openC3dcExplore = (participantId, options = {}) => {
  const url = buildC3dcExploreUrl(participantId, options);
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const openC3dcExploreFiles = () => {
  openC3dcExplore(null, { path: '/exploreFiles' });
};

/**
 * Open C3DC Data Model Navigator.
 */
export const openC3dcDataModel = () => {
  window.open(`${C3DC_BASE_URL}/data-model`, '_blank', 'noopener,noreferrer');
};

/**
 * Build a C3DC study detail deep-link (same path shape as Hub `/studies/:studyId`).
 */
export const buildC3dcStudyUrl = (studyId) => {
  if (!studyId) {
    return `${C3DC_BASE_URL}/studies`;
  }
  return `${C3DC_BASE_URL}/studies/${encodeURIComponent(studyId)}`;
};

export const openC3dcStudy = (studyId) => {
  const url = buildC3dcStudyUrl(studyId);
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Integrated participantOverview filter/result fields for CPI enrichment.
 * Note: filter arg is `participant_ids` (plural); CPI enrichment adds `data_type` + `p_id`.
 */
export const GET_PARTICIPANT_CPI_QUERY = gql`
  query participantCpiMapping(
    $participant_ids: [String],
    $dbgap_accession: [String],
    $first: Int,
    $offset: Int
  ) {
    participantOverview(
      participant_ids: $participant_ids,
      dbgap_accession: $dbgap_accession,
      first: $first,
      offset: $offset
    ) {
      participant_id
      study_id
      dbgap_accession
      cpi_data {
        associated_id
        repository_of_synonym_id
        domain_description
        domain_category
        data_location
        data_type
        p_id
        __typename
      }
      __typename
    }
  }
`;

const studyKeysMatch = (row, studyId) => {
  if (!studyId || !row) {
    return false;
  }
  return row.study_id === studyId || row.dbgap_accession === studyId;
};

/**
 * Fetch CPI mapping rows from the C3DC (Integrated) GraphQL API for a participant.
 * Matches Integrated PrivateESDataFetcher.participantOverview → insertCPIDataIntoParticipants.
 */
export const fetchParticipantCpiData = async (client, {
  participantId,
  studyId,
} = {}) => {
  if (!client || !participantId) {
    return [];
  }

  const variables = {
    participant_ids: [participantId],
    first: 10,
    offset: 0,
  };
  // Integrated filters studies via dbgap_accession; Hub cards typically pass study_id,
  // which is the same accession for most C3DC studies.
  if (studyId) {
    variables.dbgap_accession = [studyId];
  }

  const response = await client.query({
    query: GET_PARTICIPANT_CPI_QUERY,
    variables,
    context: { clientName: 'c3dcService' },
    fetchPolicy: 'network-only',
  });

  const rows = (response && response.data && response.data.participantOverview) || [];
  if (!rows.length) {
    return [];
  }

  // Prefer the row matching study_id or dbgap_accession when multiple are returned.
  const matched = studyId
    ? rows.find((row) => studyKeysMatch(row, studyId)) || rows[0]
    : rows[0];

  return (matched && matched.cpi_data) || [];
};
