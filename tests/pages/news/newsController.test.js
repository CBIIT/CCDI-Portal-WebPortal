/**
 * NewsController — mocked axios GET for `newsData.yaml`; YAML resolves to **`NewsView`** props.
 *
 * Phase 4 playbook: same contract as **`mciResourceController.test.js`** (URL + fixture-driven content).
 *
 * @see src/pages/news/newsController.js
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';

import NewsController from '../../../src/pages/news/newsController';
import { newsYamlFixture } from '../../fixtures/news/newsYamlMinimal';
import { createDedicatedYamlAxiosMock } from '../../helpers/resourceYamlApiMocks';

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
  },
}));

jest.mock('../../../src/pages/news/newsView', () => function MockNewsView({ newsList }) {
  return (
    <div data-testid="news-view-stub">
      {newsList?.[0]?.title ?? ''}
    </div>
  );
});

beforeEach(() => {
  window.scrollTo = jest.fn();
  axios.get.mockImplementation(
    createDedicatedYamlAxiosMock({
      '/newsData.yaml': newsYamlFixture,
    }),
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('NewsController', () => {
  describe('Mocked axios (newsData.yaml)', () => {
    it('should request newsData.yaml and pass headline data into NewsView', async () => {
      render(<NewsController />);

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/static\.example\.com\/newsData\.yaml\?ts=\d+$/),
      );

      await waitFor(() => {
        expect(screen.getByTestId('news-view-stub')).toHaveTextContent(
          'Phase 4 controller YAML headline',
        );
      });
    });
  });
});
