/**
 * PMTLResourceController — mocked axios GET for `pmtlData.md`; markdown resolves to PMTLResourceView props.
 *
 * Follows tests/TEST_STRUCTURE.md controller pattern (mock env/axios/heavy children, waitFor, assert URL + DOM).
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import PMTLResourceController from '../../../../src/pages/resource/PMTLResourcePage/PMTLResourceController';
import { samplePmtlMarkdownWithSubtopics } from '../../../fixtures/resource/pmtlMarkdownSamples';

jest.mock('../../../../src/pages/resource/PMTLResourcePage/PmtlMarkdown', () => (
  function MockPmtlMarkdown({ children }) {
    return <div>{children}</div>;
  }
));

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

beforeEach(() => {
  window.scrollTo = jest.fn();
  document.title = 'Initial Title';
  axios.get.mockResolvedValue({ data: samplePmtlMarkdownWithSubtopics });
  ['f0', 'f1', 'f2'].forEach(() => {
    document.body.appendChild(document.createElement('footer'));
  });
});

afterEach(() => {
  jest.clearAllMocks();
  document.querySelectorAll('footer').forEach((el) => el.remove());
});

describe('PMTLResourceController', () => {
  describe('Mocked axios (pmtlData.md)', () => {
    it('should request pmtlData.md and render topic content after load', async () => {
      render(
        <MemoryRouter initialEntries={['/pmtl']}>
          <PMTLResourceController />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getAllByText('Overview Section').length).toBeGreaterThan(0);
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/static\.example\.com\/pmtlData\.md\?ts=\d+$/),
      );
      expect(screen.getByText(/Unit test intro for PMTL resource page/i)).toBeInTheDocument();
      expect(screen.getByText(/PMTL subsection body for testing/i)).toBeInTheDocument();
    });

    it('should set document title from parsed front matter title', async () => {
      render(
        <MemoryRouter initialEntries={['/pmtl']}>
          <PMTLResourceController />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(document.title).toBe('Pediatric Molecular Target Lists');
      });
    });
  });
});
