/**
 * CBioPortalResourceController — mocked axios GET for `resourceData.yaml`.
 *
 * Follows tests/TEST_STRUCTURE.md controller pattern (mock env/axios, waitFor, assert URL + DOM from fixtures).
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import CBioPortalResourceController from '../../../../src/pages/resource/cBioPortalResourcePage/cBioPortalResourceController';
import { minimalCBioPortalResourceData } from '../../../fixtures/resource/resourceDataViewProps';
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

describe('CBioPortalResourceController', () => {
  describe('Mocked axios (resourceData.yaml)', () => {
    it('should fetch resourceData.yaml and render cBioPortal content', async () => {
      axios.get.mockImplementation(
        createDedicatedYamlAxiosMock({
          '/resourceData.yaml': minimalCBioPortalResourceData,
        }),
      );

      render(
        <MemoryRouter initialEntries={['/explore']}>
          <CBioPortalResourceController />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByText(/CCDI cBioPortal/i)).toBeInTheDocument();
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/static\.example\.com\/resourceData\.yaml\?ts=\d+$/),
      );
      expect(screen.getByText(/cBioPortal intro for unit test/i)).toBeInTheDocument();
    });
  });
});
