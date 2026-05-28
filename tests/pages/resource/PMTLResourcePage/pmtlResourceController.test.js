/**
 * PMTLResourceController — mocked axios GET for `pmtlData.yaml`; YAML resolves to PMTLResourceView props.
 *
 * Follows tests/TEST_STRUCTURE.md controller pattern (mock env/axios/heavy children, waitFor, assert URL + DOM).
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import PMTLResourceController from '../../../../src/pages/resource/PMTLResourcePage/PMTLResourceController';
import { defaultPmtlViewData } from '../../../fixtures/resource/pmtlViewProps';
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

jest.mock('../../../../src/pages/resource/components/PMTLTable', () => function MockPMTLTable() {
  return <div data-testid="pmtl-table" />;
});
jest.mock('../../../../src/pages/resource/components/PMTLTableMobile', () => function MockPMTLTableMobile() {
  return <div data-testid="pmtl-table-mobile" />;
});
jest.mock('../../../../src/pages/resource/components/MCISearchTable', () => function MockMCISearchTable() {
  return <div data-testid="pmtl-search-table" />;
});
jest.mock('../../../../src/pages/resource/components/MCISearchTableMobile', () => function MockMCISearchTableMobile() {
  return <div data-testid="pmtl-search-table-mobile" />;
});
jest.mock('../../../../src/pages/resource/components/MCIDiseaseTable', () => function MockMCIDiseaseTable() {
  return <div data-testid="pmtl-disease-table" />;
});
jest.mock('../../../../src/pages/resource/components/MCIDiseaseTableMobile', () => function MockMCIDiseaseTableMobile() {
  return <div data-testid="pmtl-disease-table-mobile" />;
});
jest.mock('../../../../src/components/common/mapGenerator', () => function MockMapView() {
  return <div data-testid="pmtl-map" />;
});
jest.mock('../../../../src/pages/resource/components/MapViewMobile', () => function MockMapViewMobile() {
  return <div data-testid="pmtl-map-mobile" />;
});

// Match pmtlResourceView.test.js mocks — keep controller test fast

beforeEach(() => {
  window.scrollTo = jest.fn();
  axios.get.mockImplementation(
    createDedicatedYamlAxiosMock({
      '/pmtlData.yaml': defaultPmtlViewData,
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

describe('PMTLResourceController', () => {
  describe('Mocked axios (pmtlData.yaml)', () => {
    it('should request pmtlData.yaml and render topic content after load', async () => {
      render(
        <MemoryRouter initialEntries={['/explore']}>
          <PMTLResourceController />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getAllByText('Overview Section').length).toBeGreaterThan(0);
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/static\.example\.com\/pmtlData\.yaml\?ts=\d+$/),
      );
      expect(screen.getByText(/Unit test intro for PMTL resource page/i)).toBeInTheDocument();
    });
  });
});
