/**
 * Wire global fetch + axios to fixture data so tests never hit real backends.
 * Use with Apollo `mockQuery` from the test file (jest.mock is hoisted).
 */
import axios from 'axios';
import {
  ccdcDatasetsCountUrl,
  ccdcDatasetsCountResponseBody,
  landingDataQueryData,
  newsDataYamlRaw,
} from '../fixtures/landing/apiResponses';

/**
 * Resolves `fetch` for CCDC count URL only; rejects other URLs to catch accidental calls.
 */
export function createCcdcFetchMock(overrides = {}) {
  const body = overrides.ccdcJson ?? ccdcDatasetsCountResponseBody;
  return jest.fn((url) => {
    if (url === ccdcDatasetsCountUrl) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(body),
      });
    }
    return Promise.reject(new Error(`Unexpected fetch in test: ${url}`));
  });
}

/**
 * GraphQL `client.query` mock for LANDING_DATA_QUERY.
 */
export function createLandingGraphqlQueryMock(overrides = {}) {
  const data = { ...landingDataQueryData, ...overrides.graphqlData };
  return jest.fn(() => Promise.resolve({ data }));
}

/**
 * axios.get for news YAML and release notes markdown — must be assigned after jest.mock in tests that mock axios.
 */
export function setupNewsYamlAxiosMock(overrides = {}) {
  const raw = overrides.newsYamlRaw ?? newsDataYamlRaw;
  const releaseNotesMarkdown = overrides.releaseNotesMarkdown ?? '';
  axios.get = jest.fn((url) => {
    const pathPart = String(url).split('?')[0];
    if (pathPart.endsWith('/newsData.yaml')) {
      return Promise.resolve({ data: raw });
    }
    if (pathPart.endsWith('/releaseNotesData.md')) {
      return Promise.resolve({ data: releaseNotesMarkdown });
    }
    return Promise.reject(new Error(`Unexpected axios.get URL in test: ${url}`));
  });
  return axios.get;
}
