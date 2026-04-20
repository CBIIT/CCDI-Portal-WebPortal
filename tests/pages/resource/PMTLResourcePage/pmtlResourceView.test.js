/**
 * Unit tests for PMTLResourceView (dedicated `pmtlData.yaml` shape as static props).
 *
 * Structure follows tests/TEST_STRUCTURE.md:
 * Rendering → feature sections → Side effects → Edge cases.
 * Fixtures: tests/fixtures/resource/pmtlViewProps.js. Tables/maps mocked (no network).
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PMTLResourceView from '../../../../src/pages/resource/PMTLResourcePage/PMTLResourceView';
import { defaultPmtlViewData } from '../../../fixtures/resource/pmtlViewProps';

// Mock heavy resource components — isolate PMTLResourceView
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

function renderPmtlView(data = defaultPmtlViewData) {
  return render(
    <MemoryRouter initialEntries={['/explore']}>
      <PMTLResourceView data={data} />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  window.scrollTo = jest.fn();
  ['f0', 'f1', 'f2'].forEach(() => {
    document.body.appendChild(document.createElement('footer'));
  });
});

afterEach(() => {
  document.querySelectorAll('footer').forEach((el) => el.remove());
});

describe('PMTLResourceView', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderPmtlView();
      expect(container).toBeInTheDocument();
    });

    it('should render page title and CCDI Hub header text', () => {
      renderPmtlView();
      expect(screen.getByText(/Pediatric Molecular Target Lists/i)).toBeInTheDocument();
      expect(screen.getAllByText('CCDI Hub').length).toBeGreaterThan(0);
    });
  });

  describe('Navigation and links', () => {
    it('should link Home to root path', () => {
      renderPmtlView();
      expect(screen.getByRole('link', { name: /Home/i, hidden: true })).toHaveAttribute('href', '/');
    });
  });

  describe('Content from fixtures', () => {
    it('should show topic nav and subsection from pmtlContent', () => {
      renderPmtlView();
      expect(screen.getByText('TOPICS')).toBeInTheDocument();
      expect(screen.getAllByText('Overview Section').length).toBeGreaterThan(0);
      expect(screen.getAllByText('First Subsection').length).toBeGreaterThan(0);
      expect(screen.getByText(/PMTL subsection body for testing/i)).toBeInTheDocument();
    });

    it('should render intro HTML from introText', () => {
      renderPmtlView();
      expect(screen.getByText(/Unit test intro for PMTL resource page/i)).toBeInTheDocument();
    });
  });

  describe('Side effects', () => {
    it('should call window.scrollTo on mount', () => {
      const scrollToMock = jest.fn();
      window.scrollTo = scrollToMock;
      renderPmtlView();
      expect(scrollToMock).toHaveBeenCalledWith(0, 0);
    });
  });

  describe('Edge cases', () => {
    it('should render when pmtlContent is missing without throwing', () => {
      expect(() =>
        renderPmtlView({ introText: '<p>Intro only.</p>' }),
      ).not.toThrow();
      expect(screen.getByText(/Intro only/i)).toBeInTheDocument();
    });
  });
});
