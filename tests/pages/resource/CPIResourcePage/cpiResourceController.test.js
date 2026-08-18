/**
 * CPIResourceController — mocked `axios.get` for `cpiData.md` and `global.fetch` for CPI stats API.
 *
 * Follows tests/TEST_STRUCTURE.md: MutationObserver when needed, mock `env` / `axios` / `fetch`,
 * assert URL contracts and fixture-derived DOM.
 */

jest.mock('axios');
jest.mock('../../../../src/utils/env', () => ({
  REACT_APP_STATIC_CONTENT_URL: 'https://static.example.com',
}));

jest.mock('../../../../src/pages/resource/CPIResourcePage/parseCpiMarkdown', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    cpiIntroText: 'CPI intro for unit test.',
    CPI_Header_URL: '',
    CPI_Unique_Participants_Icon_URL: '',
    CPI_Total_Mapped_Participants_Ids_Icon_URL: '',
    CPI_Cross_Dataset_Linkages_Icon_URL: '',
    CPI_Domain_Coverage_Icon_URL: '',
    CPI_Img_URL: '',
    cpiContent: [
      {
        id: 'overview_section',
        topic: 'Overview Topic',
        content: 'CPI section body for testing.',
      },
    ],
  })),
}));

jest.mock('../../../../src/pages/resource/CPIResourcePage/CpiMarkdown', () => (
  function MockCpiMarkdown({ children }) {
    return <div data-testid="cpi-markdown">{children}</div>;
  }
));

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import parseCpiMarkdown from '../../../../src/pages/resource/CPIResourcePage/parseCpiMarkdown';
import CPIResourceController from '../../../../src/pages/resource/CPIResourcePage/CPIResourceController';
import {
  CPI_PARTICIPANT_STATS_URL,
  minimalCpiStatsApiResponse,
} from '../../../fixtures/resource/cpiResourceFixtures';
import {
  createCpiStatsFetchHttpErrorMock,
  createCpiStatsFetchSuccessMock,
} from '../../../helpers/cpiApiMocks';

if (typeof global.MutationObserver === 'undefined') {
  global.MutationObserver = class MutationObserver {
    disconnect() {}
    observe() {}
    takeRecords() {
      return [];
    }
  };
}

let originalFetch;

beforeEach(() => {
  originalFetch = global.fetch;
  window.scrollTo = jest.fn();
  for (let i = 0; i < 3; i += 1) {
    document.body.appendChild(document.createElement('footer'));
  }
  axios.get.mockResolvedValue({ data: 'cpi-markdown' });
  global.fetch = createCpiStatsFetchSuccessMock(minimalCpiStatsApiResponse);
});

afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
  document.querySelectorAll('footer').forEach((el) => el.remove());
});

describe('CPIResourceController', () => {
  describe('Mocked axios (cpiData.md) and fetch (participant statistics)', () => {
    it('should request cpiData.md and CPI stats URL, then show formatted statistics', async () => {
      render(
        <MemoryRouter initialEntries={['/explore']}>
          <CPIResourceController />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByText('CCDI Participant Index')).toBeInTheDocument();
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/static\.example\.com\/cpiData\.md\?ts=\d+$/),
      );
      expect(parseCpiMarkdown).toHaveBeenCalledWith('cpi-markdown');
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
