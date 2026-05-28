/**
 * CPIResourceController — mocked `axios.get` for `resourceData.yaml` and `global.fetch` for CPI stats API.
 *
 * Follows tests/TEST_STRUCTURE.md: MutationObserver when needed, mock `env` / `axios` / `fetch`,
 * `createDedicatedYamlAxiosMock`, `waitFor`, assert URL contracts and fixture-derived DOM.
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import CPIResourceController from '../../../../src/pages/resource/CPIResourcePage/CPIResourceController';
import {
  CPI_PARTICIPANT_STATS_URL,
  minimalCpiResourceYamlData,
  minimalCpiStatsApiResponse,
} from '../../../fixtures/resource/cpiResourceFixtures';
import {
  createCpiStatsFetchHttpErrorMock,
  createCpiStatsFetchSuccessMock,
} from '../../../helpers/cpiApiMocks';
import { createDedicatedYamlAxiosMock } from '../../../helpers/resourceYamlApiMocks';

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

jest.mock('../../../../src/utils/env', () => ({
  REACT_APP_STATIC_CONTENT_URL: 'https://static.example.com',
}));

let originalFetch;

beforeEach(() => {
  originalFetch = global.fetch;
  window.scrollTo = jest.fn();
  for (let i = 0; i < 3; i += 1) {
    document.body.appendChild(document.createElement('footer'));
  }
  axios.get.mockImplementation(
    createDedicatedYamlAxiosMock({
      '/resourceData.yaml': minimalCpiResourceYamlData,
    }),
  );
  global.fetch = createCpiStatsFetchSuccessMock(minimalCpiStatsApiResponse);
});

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
  document.querySelectorAll('footer').forEach((el) => el.remove());
});

describe('CPIResourceController', () => {
  describe('Mocked axios (resourceData.yaml) and fetch (participant statistics)', () => {
    it('should request resourceData.yaml and CPI stats URL, then show formatted statistics', async () => {
      render(
        <MemoryRouter initialEntries={['/explore']}>
          <CPIResourceController />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByText('CCDI Participant Index')).toBeInTheDocument();
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/static\.example\.com\/resourceData\.yaml\?ts=\d+$/),
      );
      expect(global.fetch).toHaveBeenCalledWith(CPI_PARTICIPANT_STATS_URL);

      await waitFor(() => {
        expect(screen.getByText(/4,242/)).toBeInTheDocument();
      });
      expect(screen.getByText(/CPI intro for unit test/i)).toBeInTheDocument();
    });

    it('should show statistic unavailable when the stats API returns a non-200 status', async () => {
      global.fetch = createCpiStatsFetchHttpErrorMock(503);

      render(
        <MemoryRouter initialEntries={['/explore']}>
          <CPIResourceController />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByText('CCDI Participant Index')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText('Statistic Temporarily Unavailable')).toBeInTheDocument();
      });

      expect(global.fetch).toHaveBeenCalledWith(CPI_PARTICIPANT_STATS_URL);
    });
  });
});
