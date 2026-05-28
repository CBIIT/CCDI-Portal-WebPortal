/**
 * CCDIEventAnnouncementsResourceController — mocked axios GET for `resourceData.yaml`; view only when
 * `ccdiEventAnnouncementsContent` is present.
 *
 * Follows tests/TEST_STRUCTURE.md controller pattern (mock env/axios, waitFor, assert URL + DOM).
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import CCDIEventAnnouncementsResourceController from '../../../../src/pages/resource/CCDIEventAnnouncementsResourcePage/CCDIEventAnnouncementsResourceController';
import { minimalCcdiEventAnnouncementsResourceData } from '../../../fixtures/resource/resourceDataViewProps';
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

describe('CCDIEventAnnouncementsResourceController', () => {
  describe('Mocked axios (resourceData.yaml)', () => {
    it('should fetch resourceData.yaml and render announcements when content key exists', async () => {
      axios.get.mockImplementation(
        createDedicatedYamlAxiosMock({
          '/resourceData.yaml': minimalCcdiEventAnnouncementsResourceData,
        }),
      );

      render(
        <MemoryRouter initialEntries={['/explore']}>
          <CCDIEventAnnouncementsResourceController />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByText('CCDI Events Announcements')).toBeInTheDocument();
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/static\.example\.com\/resourceData\.yaml\?ts=\d+$/),
      );
    });

    it('should render an empty div when YAML lacks ccdiEventAnnouncementsContent', async () => {
      axios.get.mockImplementation(
        createDedicatedYamlAxiosMock({
          '/resourceData.yaml': {},
        }),
      );

      render(
        <MemoryRouter initialEntries={['/explore']}>
          <CCDIEventAnnouncementsResourceController />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      expect(screen.queryByText('CCDI Events Announcements')).not.toBeInTheDocument();
    });
  });
});
