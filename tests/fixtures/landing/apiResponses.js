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

/**
 * GraphQL LANDING_DATA_QUERY — shape of `response.data` from Apollo client.query
 * @see src/bento/landingPageData.js LANDING_DATA_QUERY
 */
export const landingDataQueryData = {
  numberOfMCICount: 999,
};

/**
 * Raw YAML returned for newsData.yaml (axios.get). Parsed by landingController with js-yaml.
 */
export const newsDataYamlRaw =
  'newsList: []\nnewsImgUrlList: []\nreleaseNotesList: []\naltList: []';

export const landingPageApi = {
  ccdcDatasetsCount: {
    url: ccdcDatasetsCountUrl,
    json: ccdcDatasetsCountResponseBody,
    formattedStat: ccdcDatasetsCountFormatted,
  },
  landingDataQuery: {
    data: landingDataQueryData,
  },
  newsYaml: {
    raw: newsDataYamlRaw,
  },
};
