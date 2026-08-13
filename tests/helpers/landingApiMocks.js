/**
 * Wire global fetch + axios to fixture data so tests never hit real backends.
 * Use with Apollo `mockQuery` from the test file (jest.mock is hoisted).
 */
import axios from 'axios';
import {
  ccdcDatasetsCountUrl,
  ccdcDatasetsCountResponseBody,
  landingDataQueryData,
  newsDataMarkdownRaw,
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
 * GraphQL `client.query` mock for LANDING_DATA_QUERY (C3DC `c3dcService`).
 */
export function createLandingGraphqlQueryMock(overrides = {}) {
  const data = { ...landingDataQueryData, ...overrides.graphqlData };
  return jest.fn(() => Promise.resolve({ data }));
}

/**
 * axios.get for news markdown, release notes markdown, and optional landingData.md.
 * Must be assigned after jest.mock in tests that mock axios.
 * @deprecated Prefer setupNewsMarkdownAxiosMock — alias kept for existing landing tests.
 */
export function setupNewsMarkdownAxiosMock(overrides = {}) {
  const raw = overrides.newsMarkdownRaw ?? overrides.newsYamlRaw ?? newsDataMarkdownRaw;
  const releaseNotesMarkdown = overrides.releaseNotesMarkdown ?? '';
  const ccdiDataUpdatesMarkdown = overrides.ccdiDataUpdatesMarkdown ?? '';
  const landingMarkdown = overrides.landingMarkdown;
  axios.get = jest.fn((url) => {
    const pathPart = String(url).split('?')[0];
    if (pathPart.endsWith('/newsData.md')) {
      return Promise.resolve({ data: raw });
    }
    if (pathPart.endsWith('/releaseNotesData.md')) {
      return Promise.resolve({ data: releaseNotesMarkdown });
    }
    if (pathPart.endsWith('/ccdiDataUpdates.md')) {
      return Promise.resolve({ data: ccdiDataUpdatesMarkdown });
    }
    if (pathPart.endsWith('/landingData.md')) {
      if (landingMarkdown === undefined) {
        return Promise.reject(new Error('landingData.md not available in test'));
      }
      return Promise.resolve({ data: landingMarkdown });
    }
    return Promise.reject(new Error(`Unexpected axios.get URL in test: ${url}`));
  });
  return axios.get;
}

/** @deprecated Use setupNewsMarkdownAxiosMock */
export const setupNewsYamlAxiosMock = setupNewsMarkdownAxiosMock;
