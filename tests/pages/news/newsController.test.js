/**
 * NewsController — mocked axios GET for `newsData.md` and `releaseNotesData.md`.
 *
 * @see src/pages/news/newsController.js
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';

import NewsController from '../../../src/pages/news/newsController';
import { newsMarkdownControllerFixture } from '../../fixtures/news/newsMarkdownSamples';
import { sampleReleaseNotesMarkdownRaw, sampleCcdiDataUpdatesMarkdownRaw } from '../../fixtures/resource/releaseNotesMarkdownSamples';

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

jest.mock('../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_STATIC_CONTENT_URL: 'https://static.example.com',
    REACT_APP_DATA_RELEASES_URL: 'https://data-releases.example.com',
  },
}));

jest.mock('../../../src/pages/news/newsView', () => function MockNewsView({ newsList, releaseNotesList, ccdiDataUpdatesList }) {
  return (
    <div data-testid="news-view-stub">
      <span data-testid="news-headline">{newsList?.[0]?.title ?? ''}</span>
      <span data-testid="release-notes-count">{releaseNotesList?.length ?? 0}</span>
      <span data-testid="ccdi-data-updates-count">{ccdiDataUpdatesList?.length ?? 0}</span>
    </div>
  );
});

function setupAxiosMock() {
  axios.get.mockImplementation((url) => {
    const pathPart = String(url).split('?')[0];
    if (pathPart.endsWith('/newsData.md')) {
      return Promise.resolve({ data: newsMarkdownControllerFixture });
    }
    if (pathPart.endsWith('/releaseNotesData.md')) {
      return Promise.resolve({ data: sampleReleaseNotesMarkdownRaw });
    }
    if (pathPart.endsWith('/ccdiDataUpdates.md')) {
      return Promise.resolve({ data: sampleCcdiDataUpdatesMarkdownRaw });
    }
    return Promise.reject(new Error(`Unexpected axios.get URL in test: ${url}`));
  });
}

beforeEach(() => {
  window.scrollTo = jest.fn();
  setupAxiosMock();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('NewsController', () => {
  describe('Mocked axios (newsData.md + releaseNotesData.md + ccdiDataUpdates.md)', () => {
    it('should request static files and pass hub and ecosystem lists into NewsView', async () => {
      render(<NewsController />);

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/static\.example\.com\/newsData\.md\?ts=\d+$/),
      );
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/static\.example\.com\/releaseNotesData\.md\?ts=\d+$/),
      );
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/data-releases\.example\.com\/ccdiDataUpdates\.md\?ts=\d+$/),
      );

      await waitFor(() => {
        expect(screen.getByTestId('news-headline')).toHaveTextContent(
          'Phase 4 controller MD headline',
        );
      });
      expect(screen.getByTestId('release-notes-count')).toHaveTextContent('2');
      expect(screen.getByTestId('ccdi-data-updates-count')).toHaveTextContent('2');
    });
  });
});
