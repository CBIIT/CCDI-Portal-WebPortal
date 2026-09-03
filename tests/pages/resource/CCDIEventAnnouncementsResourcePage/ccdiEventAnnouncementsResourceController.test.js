/**
 * CCDIEventAnnouncementsResourceController — fetches eventAnnouncements.md, parses markdown,
 * renders view when `ccdiEventAnnouncementsContent` is present.
 *
 * Follows tests/TEST_STRUCTURE.md controller pattern (mock env/axios, waitFor, assert URL + DOM).
 */

jest.mock('axios');
jest.mock('../../../../src/utils/env', () => ({
  REACT_APP_STATIC_CONTENT_URL: 'https://static.example.com',
}));

jest.mock('../../../../src/pages/resource/CCDIEventAnnouncementsResourcePage/parseEventAnnouncementsMarkdown', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    CCDI_Event_Announcements_Header: '',
    ccdiEventAnnouncementsIntroText: 'CCDI events intro for unit test.',
    ccdiEventAnnouncementsContent: [
      {
        id: 'event_section',
        topic: 'Announcements Topic',
        content: 'Announcements body.',
      },
    ],
  })),
}));

jest.mock('../../../../src/pages/resource/CCDIEventAnnouncementsResourcePage/CCDIEventAnnouncementsResourceView', () => (
  function MockCCDIEventAnnouncementsResourceView({ data }) {
    const topics = (data?.ccdiEventAnnouncementsContent || []).map((item) => item.topic);
    return (
      <div>
        <div>CCDI Events Announcements</div>
        {topics.map((topic) => (
          <div key={topic}>{topic}</div>
        ))}
        <div>{data?.ccdiEventAnnouncementsContent?.[0]?.content || ''}</div>
      </div>
    );
  }
));

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import CCDIEventAnnouncementsResourceController from '../../../../src/pages/resource/CCDIEventAnnouncementsResourcePage/CCDIEventAnnouncementsResourceController';
import parseEventAnnouncementsMarkdown from '../../../../src/pages/resource/CCDIEventAnnouncementsResourcePage/parseEventAnnouncementsMarkdown';
import { minimalCcdiEventAnnouncementsResourceData } from '../../../fixtures/resource/resourceDataViewProps';

beforeEach(() => {
  jest.clearAllMocks();
  axios.get.mockResolvedValue({ data: 'event-announcements-markdown' });
  parseEventAnnouncementsMarkdown.mockImplementation(() => ({
    ...minimalCcdiEventAnnouncementsResourceData,
  }));
  global.MutationObserver = class {
    constructor() {
      this.observe = jest.fn();
      this.disconnect = jest.fn();
      this.takeRecords = jest.fn(() => []);
    }
  };
});

describe('CCDIEventAnnouncementsResourceController', () => {
  describe('Mocked axios (eventAnnouncements.md)', () => {
    it('should fetch eventAnnouncements.md and render announcements when content key exists', async () => {
      render(
        <MemoryRouter initialEntries={['/explore']}>
          <CCDIEventAnnouncementsResourceController />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByText('CCDI Events Announcements')).toBeInTheDocument();
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/static\.example\.com\/eventAnnouncements\.md\?ts=\d+$/),
      );
      expect(parseEventAnnouncementsMarkdown).toHaveBeenCalledWith('event-announcements-markdown');
      expect(screen.getByText('Announcements Topic')).toBeInTheDocument();
    });

    it('should render empty when markdown lacks ccdiEventAnnouncementsContent', async () => {
      parseEventAnnouncementsMarkdown.mockReturnValueOnce({});

      const { container } = render(
        <MemoryRouter initialEntries={['/explore']}>
          <CCDIEventAnnouncementsResourceController />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      expect(screen.queryByText('CCDI Events Announcements')).not.toBeInTheDocument();
      expect(screen.queryByText(/CCDI March Community Forum/)).not.toBeInTheDocument();
      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it('should render empty when fetch fails (no local eventsData.json injection)', async () => {
      axios.get.mockRejectedValueOnce(new Error('network'));

      render(
        <MemoryRouter initialEntries={['/explore']}>
          <CCDIEventAnnouncementsResourceController />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      expect(screen.queryByText(/CCDI March Community Forum/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Developing Pediatric Data Standards/)).not.toBeInTheDocument();
    });
  });
});
