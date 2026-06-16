/**
 * Unit tests for FederationResourceView (federationData.md parsed props).
 *
 * Structure follows tests/TEST_STRUCTURE.md:
 * Rendering → feature sections → Side effects → Edge cases.
 * Fixtures: tests/fixtures/resource/resourceDataViewProps.js (no network).
 */

jest.mock('../../../../src/pages/resource/FederationResourcePage/FederationMarkdown', () => (
  function MockFederationMarkdown({ children }) {
    return <div data-testid="federation-markdown">{children}</div>;
  }
));

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FederationResourceView from '../../../../src/pages/resource/FederationResourcePage/FederationResourceView';
import { minimalFederationResourceData } from '../../../fixtures/resource/resourceDataViewProps';
import { multiTopicFederationData } from '../../../fixtures/resource/resourceInteractionData';
import {
  clickTopicNav,
  triggerResourceScroll,
  toggleMobileSection,
} from '../shared/resourceViewTestUtils';

function renderFederationView(data = minimalFederationResourceData) {
  return render(
    <MemoryRouter initialEntries={['/explore']}>
      <FederationResourceView data={data} />
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

describe('FederationResourceView', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderFederationView();
      expect(container).toBeInTheDocument();
    });

    it('should render with default fixture data', () => {
      renderFederationView();
      expect(screen.getByText(/CCDI Data Federation Resource/i)).toBeInTheDocument();
      expect(screen.getAllByText('CCDI Hub').length).toBeGreaterThan(0);
    });
  });

  describe('Title and external links', () => {
    it('should expose API Access link with correct href', () => {
      renderFederationView();
      const apiLink = screen.getByRole('link', { name: /API Access/i });
      expect(apiLink).toHaveAttribute('href', 'https://cbiit.github.io/ccdi-federation-api-aggregation/');
    });
  });

  describe('Topics and body content', () => {
    it('should render TOPICS nav and federation section copy from fixtures', () => {
      renderFederationView();
      expect(screen.getByText('TOPICS')).toBeInTheDocument();
      expect(screen.getAllByText('Federation Overview').length).toBeGreaterThan(0);
      expect(screen.getByText(/Federation intro for unit test/i)).toBeInTheDocument();
      expect(screen.getByText(/Federation body content/i)).toBeInTheDocument();
    });
  });

  describe('Side effects', () => {
    it('should call window.scrollTo on mount', () => {
      const scrollToMock = jest.fn();
      window.scrollTo = scrollToMock;
      renderFederationView();
      expect(scrollToMock).toHaveBeenCalledWith(0, 0);
    });

    it('should apply sticky nav class when page is scrolled', () => {
      renderFederationView(multiTopicFederationData);
      triggerResourceScroll('FederationBody');
      expect(document.getElementById('leftNav').className).toContain('navListSticky');
    });
  });

  describe('Navigation interactions', () => {
    it('should highlight topic and scroll when a nav item is clicked', () => {
      const scrollTo = jest.fn();
      window.scrollTo = scrollTo;
      renderFederationView(multiTopicFederationData);

      const topicB = clickTopicNav('Topic B');
      expect(topicB).toHaveClass('selected');
      expect(scrollTo).toHaveBeenCalled();
    });

    it('should toggle mobile section visibility', () => {
      renderFederationView(multiTopicFederationData);
      const mobileHeader = toggleMobileSection();
      expect(mobileHeader.className).not.toContain('sectionCollapse');
    });

    it('should render federation data access infographic when section id matches', () => {
      renderFederationView(multiTopicFederationData);
      expect(screen.getByAltText(/Federation Service ecosystem/i)).toBeInTheDocument();
    });
  });
});
