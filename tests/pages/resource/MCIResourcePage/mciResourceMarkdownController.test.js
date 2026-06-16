/**
 * MCIResourceMarkdownController — mocked axios GET for `mciData.md`; markdown parses to view props.
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MCIResourceMarkdownController from '../../../../src/pages/resource/MCIResourcePage/MCIResourceMarkdownController';
import { sampleMciMarkdownRaw } from '../../../fixtures/resource/mciMarkdownSamples';

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

beforeEach(() => {
  window.scrollTo = jest.fn();
  axios.get.mockResolvedValue({ data: sampleMciMarkdownRaw });
  ['f0', 'f1', 'f2'].forEach(() => {
    document.body.appendChild(document.createElement('footer'));
  });
});

afterEach(() => {
  jest.clearAllMocks();
  document.querySelectorAll('footer').forEach((el) => el.remove());
});

describe('MCIResourceMarkdownController', () => {
  describe('Mocked axios (mciData.md)', () => {
    it('should request mciData.md and render parsed topic content', async () => {
      render(
        <MemoryRouter initialEntries={['/MCI']}>
          <MCIResourceMarkdownController />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getAllByText('Overview Section').length).toBeGreaterThan(0);
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/static\.example\.com\/mciData\.md\?ts=\d+$/),
      );
      expect(screen.getByText(/Unit test intro for MCI markdown page/i)).toBeInTheDocument();
      expect(screen.getByText(/Subsection body copy for testing/i)).toBeInTheDocument();
    });

    it('should still mount when axios fails', async () => {
      axios.get.mockRejectedValueOnce(new Error('network'));
      const { container } = render(
        <MemoryRouter initialEntries={['/MCI']}>
          <MCIResourceMarkdownController />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      expect(screen.getByText(/Molecular Characterization Initiative/i)).toBeInTheDocument();
      expect(container.querySelector('#MCIBody')).toBeInTheDocument();
    });
  });
});
