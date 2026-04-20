/**
 * Unit tests for MCIResourceView (dedicated `mciData.yaml` shape as static props).
 *
 * Structure follows tests/TEST_STRUCTURE.md:
 * Rendering → feature sections → Side effects → Edge cases.
 * Fixtures: tests/fixtures/resource/mciViewProps.js. Tables/maps mocked (no network).
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MCIResourceView from '../../../../src/pages/resource/MCIResourcePage/MCIResourceView';
import { defaultMciViewData } from '../../../fixtures/resource/mciViewProps';

// Mock heavy resource components (tables, maps) — isolate MCIResourceView
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

function renderMciView(data = defaultMciViewData) {
  return render(
    <MemoryRouter initialEntries={['/explore']}>
      <MCIResourceView data={data} />
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

describe('MCIResourceView', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderMciView();
      expect(container).toBeInTheDocument();
    });

    it('should render page title and CCDI Hub header text', () => {
      renderMciView();
      expect(screen.getByText(/Molecular Characterization Initiative/i)).toBeInTheDocument();
      expect(screen.getAllByText('CCDI Hub').length).toBeGreaterThan(0);
    });
  });

  describe('Navigation and links', () => {
    it('should link Home to root path', () => {
      renderMciView();
      // Breadcrumb nav is visually hidden (display:none) but href must remain correct for layout/CSS breakpoints.
      expect(screen.getByRole('link', { name: /Home/i, hidden: true })).toHaveAttribute('href', '/');
    });

    it('should render dbGaP Request Access link', () => {
      renderMciView();
      const link = screen.getByRole('link', { name: /Request Access \(dbGaP\)/i });
      expect(link).toHaveAttribute(
        'href',
        'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002790',
      );
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  describe('Content from fixtures', () => {
    it('should show topic nav and subsection from mciContent', () => {
      renderMciView();
      expect(screen.getByText('TOPICS')).toBeInTheDocument();
      expect(screen.getAllByText('Overview Section').length).toBeGreaterThan(0);
      expect(screen.getAllByText('First Subsection').length).toBeGreaterThan(0);
      expect(screen.getByText(/Subsection body copy for testing/i)).toBeInTheDocument();
    });

    it('should render intro HTML from introText', () => {
      renderMciView();
      expect(screen.getByText(/Unit test intro for MCI resource page/i)).toBeInTheDocument();
    });
  });

  describe('Side effects', () => {
    it('should call window.scrollTo on mount', () => {
      const scrollToMock = jest.fn();
      window.scrollTo = scrollToMock;
      renderMciView();
      expect(scrollToMock).toHaveBeenCalledWith(0, 0);
    });
  });

  describe('Edge cases', () => {
    it('should render when mciContent is missing without throwing', () => {
      expect(() =>
        renderMciView({ introText: '<p>Only intro.</p>' }),
      ).not.toThrow();
      expect(screen.getByText(/Only intro/i)).toBeInTheDocument();
    });
  });
});
