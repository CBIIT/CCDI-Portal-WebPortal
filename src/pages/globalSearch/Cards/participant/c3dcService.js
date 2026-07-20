import gql from 'graphql-tag';
import {
  C3DC_BASE_URL,
  C3DC_BACKEND_API,
  resolveC3dcBaseUrl,
} from '../../../../utils/c3dcEnv';

export {
  C3DC_BASE_URL,
  C3DC_BACKEND_API,
  resolveC3dcBaseUrl,
};

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

export const GET_PARTICIPANT_CPI_QUERY = gql`
  query participantCpiMapping(
    $participant_id: [String],
    $dbgap_accession: [String],
    $first: Int,
    $offset: Int
  ) {
    participantOverview(
      participant_id: $participant_id,
      dbgap_accession: $dbgap_accession,
      first: $first,
      offset: $offset
    ) {
      participant_id
      dbgap_accession
      cpi_data {
        associated_id
        repository_of_synonym_id
        domain_description
        domain_category
        data_location
        data_type
        __typename
      }
      __typename
    }
  }
`;

/**
 * Fetch CPI mapping rows from the C3DC GraphQL API for a participant.
 */
export const fetchParticipantCpiData = async (client, {
  participantId,
  studyId,
} = {}) => {
  if (!client || !participantId) {
    return [];
  }

  const variables = {
    participant_id: [participantId],
    first: 10,
    offset: 0,
  };
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

  // Prefer the row matching study accession when multiple are returned.
  const matched = studyId
    ? rows.find((row) => row.dbgap_accession === studyId) || rows[0]
    : rows[0];

  return (matched && matched.cpi_data) || [];
};
