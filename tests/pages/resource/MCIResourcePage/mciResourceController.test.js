/**
 * MCIResourceController — mocked axios GET for `mciData.yaml`; YAML resolves to MCIResourceView props.
 *
 * Follows tests/TEST_STRUCTURE.md controller pattern: MutationObserver when needed, mock env/axios/heavy
 * children, `waitFor` + assert URL contract and fixture-derived DOM text.
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MCIResourceController from '../../../../src/pages/resource/MCIResourcePage/MCIResourceController';
import { defaultMciViewData } from '../../../fixtures/resource/mciViewProps';
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

jest.mock('../../../../src/pages/resource/components/MCITable', () => function MockMCITable() {
  return <div data-testid="mci-table" />;
});
jest.mock('../../../../src/pages/resource/components/MCITableMobile', () => function MockMCITableMobile() {
  return <div data-testid="mci-table-mobile" />;
});
jest.mock('../../../../src/pages/resource/components/MCISearchTable', () => function MockMCISearchTable() {
  return <div data-testid="mci-search-table" />;
});
jest.mock('../../../../src/pages/resource/components/MCISearchTableMobile', () => function MockMCISearchTableMobile() {
  return <div data-testid="mci-search-table-mobile" />;
});
jest.mock('../../../../src/pages/resource/components/MCIDiseaseTable', () => function MockMCIDiseaseTable() {
  return <div data-testid="mci-disease-table" />;
});
jest.mock('../../../../src/pages/resource/components/MCIDiseaseTableMobile', () => function MockMCIDiseaseTableMobile() {
  return <div data-testid="mci-disease-table-mobile" />;
});
jest.mock('../../../../src/components/common/mapGenerator', () => function MockMapView() {
  return <div data-testid="mci-map" />;
});
jest.mock('../../../../src/pages/resource/components/MapViewMobile', () => function MockMapViewMobile() {
  return <div data-testid="mci-map-mobile" />;
});

// Same heavy dependencies as mciResourceView.test.js — keep controller test fast

beforeEach(() => {
  window.scrollTo = jest.fn();
  axios.get.mockImplementation(
    createDedicatedYamlAxiosMock({
      '/mciData.yaml': defaultMciViewData,
    }),
  );
  ['f0', 'f1', 'f2'].forEach(() => {
    document.body.appendChild(document.createElement('footer'));
  });
});

afterEach(() => {
  jest.clearAllMocks();
  document.querySelectorAll('footer').forEach((el) => el.remove());
});

describe('MCIResourceController', () => {
  describe('Mocked axios (mciData.yaml)', () => {
    it('should request mciData.yaml and render topic content after load', async () => {
      render(
        <MemoryRouter initialEntries={['/explore']}>
          <MCIResourceController />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getAllByText('Overview Section').length).toBeGreaterThan(0);
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/static\.example\.com\/mciData\.yaml\?ts=\d+$/),
      );
      expect(screen.getByText(/Unit test intro for MCI resource page/i)).toBeInTheDocument();
    });
  });
});
