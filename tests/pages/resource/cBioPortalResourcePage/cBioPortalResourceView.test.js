/**
 * Unit tests for CBioPortalResourceView (`resourceData.yaml` — cBioPortal fields as static props).
 *
 * Structure follows tests/TEST_STRUCTURE.md:
 * Rendering → feature sections → Side effects → Edge cases.
 * Fixtures: tests/fixtures/resource/resourceDataViewProps.js (no network).
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { clickTopicNav, triggerResourceScroll, toggleMobileSection } from '../shared/resourceViewTestUtils';
import '@testing-library/jest-dom';
import CBioPortalResourceView from '../../../../src/pages/resource/cBioPortalResourcePage/cBioPortalResourceView';
import { minimalCBioPortalResourceData } from '../../../fixtures/resource/resourceDataViewProps';
import { multiTopicCBioData } from '../../../fixtures/resource/resourceInteractionData';

function renderCBioView(data = minimalCBioPortalResourceData) {
  return render(
    <MemoryRouter initialEntries={['/explore']}>
      <CBioPortalResourceView data={data} />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  window.scrollTo = jest.fn();
  for (let i = 0; i < 3; i += 1) {
    document.body.appendChild(document.createElement('footer'));
  }
});

afterEach(() => {
  document.querySelectorAll('footer').forEach((el) => el.remove());
});

describe('CBioPortalResourceView', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderCBioView();
      expect(container).toBeInTheDocument();
    });

    it('should render with default fixture data', () => {
      renderCBioView();
      expect(screen.getAllByText(/CCDI cBioPortal/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText('CCDI Hub').length).toBeGreaterThan(0);
    });
  });

  describe('Title and external links', () => {
    it('should expose Go to cBioPortal link with correct href', () => {
      renderCBioView();
      const goLink = screen.getByRole('link', { name: /Go to cBioPortal/i });
      expect(goLink).toHaveAttribute('href', 'https://cbioportal.ccdi.cancer.gov');
    });
  });

  describe('Topics and intro content', () => {
    it('should render intro block and topics when cpiIntroText is set', () => {
      renderCBioView();
      expect(screen.getByText(/cBioPortal intro for unit test/i)).toBeInTheDocument();
      expect(screen.getByText('TOPICS')).toBeInTheDocument();
      expect(screen.getAllByText('cBioPortal Topic').length).toBeGreaterThan(0);
      expect(screen.getByText(/cBioPortal section body/i)).toBeInTheDocument();
    });
  });

  describe('Side effects', () => {
    it('should call window.scrollTo on mount', () => {
      const scrollToMock = jest.fn();
      window.scrollTo = scrollToMock;
      renderCBioView();
      expect(scrollToMock).toHaveBeenCalledWith(0, 0);
    });
  });

  describe('Edge cases', () => {
    it('should omit intro block when cpiIntroText is falsy', () => {
      renderCBioView({ ...minimalCBioPortalResourceData, cpiIntroText: '' });
      expect(screen.queryByText(/cBioPortal intro for unit test/i)).not.toBeInTheDocument();
      expect(screen.getAllByText('cBioPortal Topic').length).toBeGreaterThan(0);
    });
  });

  describe('Navigation interactions', () => {
    it('should highlight topic when nav item is clicked', () => {
      const scrollTo = jest.fn();
      window.scrollTo = scrollTo;
      renderCBioView(multiTopicCBioData);
      const topic = clickTopicNav('cBio B');
      expect(topic).toHaveClass('selected');
      expect(scrollTo).toHaveBeenCalled();
    });

    it('should apply sticky nav on scroll', () => {
      renderCBioView(multiTopicCBioData);
      triggerResourceScroll('FederationBody');
      expect(document.getElementById('leftNav').className).toContain('navListSticky');
    });

    it('should toggle mobile section visibility', () => {
      renderCBioView(multiTopicCBioData);
      const mobileHeader = toggleMobileSection();
      expect(mobileHeader.className).not.toContain('sectionCollapse');
    });
  });
});
