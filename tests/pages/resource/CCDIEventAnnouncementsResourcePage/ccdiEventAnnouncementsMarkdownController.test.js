/**
 * CCDIEventAnnouncementsMarkdownController — mocked axios GET for events markdown file.
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import CCDIEventAnnouncementsMarkdownController from '../../../../src/pages/resource/CCDIEventAnnouncementsResourcePage/CCDIEventAnnouncementsMarkdownController';
import {
  sampleCcdiEventsMarkdownRaw,
  sampleCcdiEventsMarkdownEmptyBody,
} from '../../../fixtures/resource/ccdiEventsMarkdownSamples';

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

jest.mock('../../../../src/pages/resource/MCIResourcePage/MciMarkdown', () => {
  const React = require('react');
  return function MockMciMarkdown({ children }) {
    return <div data-testid="mci-markdown">{children}</div>;
  };
});

beforeEach(() => {
  window.scrollTo = jest.fn();
  for (let i = 0; i < 3; i += 1) {
    document.body.appendChild(document.createElement('footer'));
  }
});

afterEach(() => {
  jest.clearAllMocks();
  document.querySelectorAll('footer').forEach((el) => el.remove());
});

describe('CCDIEventAnnouncementsMarkdownController', () => {
  describe('Mocked axios (ccdi-events-announcements.md)', () => {
    it('should fetch markdown and render announcements when content exists', async () => {
      axios.get.mockResolvedValue({ data: sampleCcdiEventsMarkdownRaw });

      render(
        <MemoryRouter initialEntries={['/ccdi-events-announcements']}>
          <CCDIEventAnnouncementsMarkdownController />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByText('CCDI Events Announcements')).toBeInTheDocument();
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(
          /^https:\/\/static\.example\.com\/pages\/About\/ccdi-events-announcements\.md\?ts=\d+$/,
        ),
      );
      expect(screen.getByText(/CCDI events intro for unit test/i)).toBeInTheDocument();
      expect(screen.getByText(/Announcements body from markdown/i)).toBeInTheDocument();
    });

    it('should render empty div when parsed content is empty', async () => {
      axios.get.mockResolvedValue({ data: sampleCcdiEventsMarkdownEmptyBody });

      const { container } = render(
        <MemoryRouter initialEntries={['/ccdi-events-announcements']}>
          <CCDIEventAnnouncementsMarkdownController />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      expect(screen.queryByText('CCDI Events Announcements')).not.toBeInTheDocument();
      expect(container.firstChild).toBeTruthy();
    });

    it('should render empty div when axios fails', async () => {
      axios.get.mockRejectedValueOnce(new Error('network'));

      render(
        <MemoryRouter initialEntries={['/ccdi-events-announcements']}>
          <CCDIEventAnnouncementsMarkdownController />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      expect(screen.queryByText('CCDI Events Announcements')).not.toBeInTheDocument();
    });
  });
});
