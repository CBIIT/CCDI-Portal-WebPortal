/**
 * Canonical mock API data for landing page integration tests.
 * Shapes mirror production/backend responses; values are stable for assertions.
 *
 * URL strings must stay aligned with:
 * @see src/pages/landing/landingController.js
 */

/** GET …/service/datasets/count — JSON body */
export const ccdcDatasetsCountUrl =
  'https://datacatalog.ccdi.cancer.gov/service/datasets/count';

export const ccdcDatasetsCountResponseBody = {
  data: 12345,
};

/** Expected stat display when using en-US locale (see landingView formatting) */
export const ccdcDatasetsCountFormatted = '12,345';

/** GET …/service/datasets/CCDI-NCCR_Explorer — case_id is the reported-case total */
export const nccrExplorerDatasetUrl =
  'https://datacatalog.ccdi.cancer.gov/service/datasets/CCDI-NCCR_Explorer';

export const nccrExplorerDatasetResponseBody = {
  status: 'success',
  data: {
    case_id: 2026371,
  },
};

export const nccrExplorerCaseCountFormatted = '2,026,371';

/** GET cBioPortal studies — stat count is the array length */
export const cBioPortalStudiesUrl = 'https://cbioportal-api.ccdi.cancer.gov/api/studies';

export const cBioPortalStudiesResponseBody = [
  { studyId: 'phs001327_ccss_sn' },
  { studyId: 'pedmatch_phs002883' },
  { studyId: 'phs002790' },
  { studyId: 'phs002529' },
  { studyId: 'openpedcan_v15' },
  { studyId: 'pstpdx_uthsa_2023' },
];

export const cBioPortalStudiesCountFormatted = '6';

/** GET federation organizations — stat count is the outer array length */
export const federationOrganizationsUrl =
  'https://federation.ccdi.cancer.gov/api/v1/organization';

export const federationOrganizationsResponseBody = [
  [{ identifier: 'pcdc' }],
  [{ identifier: 'ucsc-treehouse' }],
  [{ identifier: 'stjudecloud' }],
  [{ identifier: 'cbtn' }, { identifier: 'kidsfirst-drc' }],
  [{ identifier: 'sanfordburnhamprebys' }],
  [{ identifier: 'IUSCCC' }],
  [{ identifier: 'CCDI-DCC' }],
];

export const federationOrganizationsCountFormatted = '7';

/**
 * GraphQL LANDING_DATA_QUERY — shape of `response.data` from Apollo client.query
 * against C3DC Integrated (`clientName: 'c3dcService'`).
 * @see src/bento/landingPageData.js LANDING_DATA_QUERY
 */
export const landingDataQueryData = {
  numberOfMCICount: 999,
  numberOfParticipants: 63610,
};

export const c3dcParticipantCountFormatted = '63,610';

/**
 * Raw markdown returned for newsData.md (axios.get). Parsed by parseNewsMarkdown.
 */
export const newsDataMarkdownRaw = '';

export const landingPageApi = {
  ccdcDatasetsCount: {
    url: ccdcDatasetsCountUrl,
    json: ccdcDatasetsCountResponseBody,
    formattedStat: ccdcDatasetsCountFormatted,
  },
  landingDataQuery: {
    data: landingDataQueryData,
  },
  newsMarkdown: {
    raw: newsDataMarkdownRaw,
  },
};
