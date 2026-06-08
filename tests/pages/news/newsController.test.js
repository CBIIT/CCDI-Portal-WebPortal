/**
 * NewsController — mocked axios GET for `newsData.yaml` and `releaseNotesData.md`.
 *
 * @see src/pages/news/newsController.js
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import yaml from 'js-yaml';

import NewsController from '../../../src/pages/news/newsController';
import { newsYamlFixture } from '../../fixtures/news/newsYamlMinimal';
import { sampleReleaseNotesMarkdownRaw } from '../../fixtures/resource/releaseNotesMarkdownSamples';

if (typeof global.MutationObserver === 'undefined') {
  global.MutationObserver = class MutationObserver {
    disconnect() {}
    observe() {}
    takeRecords() {
      return [];
    }
  };
}

jest.mock('axios');

jest.mock('js-yaml', () => ({
  safeLoad: jest.fn((data) => data),
}));

jest.mock('../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_STATIC_CONTENT_URL: 'https://static.example.com',
  },
}));

jest.mock('../../../src/pages/news/newsView', () => function MockNewsView({ newsList, releaseNotesList }) {
  return (
    <div data-testid="news-view-stub">
      <span data-testid="news-headline">{newsList?.[0]?.title ?? ''}</span>
      <span data-testid="release-notes-count">{releaseNotesList?.length ?? 0}</span>
    </div>
  );
});

function setupAxiosMock() {
  axios.get.mockImplementation((url) => {
    const pathPart = String(url).split('?')[0];
    if (pathPart.endsWith('/newsData.yaml')) {
      return Promise.resolve({ data: newsYamlFixture });
    }
    if (pathPart.endsWith('/releaseNotesData.md')) {
      return Promise.resolve({ data: sampleReleaseNotesMarkdownRaw });
    }
    return Promise.reject(new Error(`Unexpected axios.get URL in test: ${url}`));
  });
}

beforeEach(() => {
  window.scrollTo = jest.fn();
  yaml.safeLoad.mockImplementation((data) => data);
  setupAxiosMock();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('NewsController', () => {
  describe('Mocked axios (newsData.yaml + releaseNotesData.md)', () => {
    it('should request both static files and pass data into NewsView', async () => {
      render(<NewsController />);

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/static\.example\.com\/newsData\.yaml\?ts=\d+$/),
      );
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/static\.example\.com\/releaseNotesData\.md\?ts=\d+$/),
      );

      await waitFor(() => {
        expect(screen.getByTestId('news-headline')).toHaveTextContent(
          'Phase 4 controller YAML headline',
        );
      });
      expect(screen.getByTestId('release-notes-count')).toHaveTextContent('2');
    });
  });
});
