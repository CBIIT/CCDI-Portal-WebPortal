import env from './env';

const C3DC_TIER_BY_HUB_HOST = {
  'ccdi-dev.cancer.gov': 'https://clinicalcommons-integrated-dev.ccdi.cancer.gov',
  'ccdi-qa.cancer.gov': 'https://clinicalcommons-qa.ccdi.cancer.gov',
  'ccdi-stage.cancer.gov': 'https://clinicalcommons-stage.ccdi.cancer.gov',
  'ccdi.cancer.gov': 'https://clinicalcommons.ccdi.cancer.gov',
};

const DEFAULT_C3DC_BASE_URL = 'https://clinicalcommons-integrated-dev.ccdi.cancer.gov';

/**
 * Resolve the C3DC frontend base URL from Hub's existing REACT_APP_BACKEND_API
 * host so each deployed tier maps without new injectEnv vars.
 */
export const resolveC3dcBaseUrl = (backendApi = env.REACT_APP_BACKEND_API) => {
  if (!backendApi) {
    return DEFAULT_C3DC_BASE_URL;
  }

  try {
    const { hostname } = new URL(backendApi);
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return DEFAULT_C3DC_BASE_URL;
    }
    return C3DC_TIER_BY_HUB_HOST[hostname] || DEFAULT_C3DC_BASE_URL;
  } catch (err) {
    return DEFAULT_C3DC_BASE_URL;
  }
};

export const C3DC_BASE_URL = resolveC3dcBaseUrl().replace(/\/$/, '');

export const C3DC_BACKEND_API = `${C3DC_BASE_URL}/v1/graphql/`;
