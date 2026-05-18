/**
 * Unit tests for CPIResourceView (static YAML-shaped `data` + optional `cpiStats` from API).
 *
 * Structure follows tests/TEST_STRUCTURE.md:
 * Rendering → feature sections → Side effects → Edge cases.
 * Fixtures: tests/fixtures/resource/cpiResourceFixtures.js (no network).
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { clickTopicNav, triggerResourceScroll, toggleMobileSection } from '../shared/resourceViewTestUtils';
import '@testing-library/jest-dom';
import CPIResourceView from '../../../../src/pages/resource/CPIResourcePage/CPIResourceView';
import {
  minimalCpiResourceYamlData,
  minimalCpiStatsApiResponse,
} from '../../../fixtures/resource/cpiResourceFixtures';

function renderCpiView(props = {}) {
  const {
    data = minimalCpiResourceYamlData,
    cpiStats = minimalCpiStatsApiResponse,
    loadingCpiStats = false,
    cpiStatsError = false,
  } = props;
  return render(
    <MemoryRouter initialEntries={['/explore']}>
      <CPIResourceView
        data={data}
        cpiStats={cpiStats}
        loadingCpiStats={loadingCpiStats}
        cpiStatsError={cpiStatsError}
      />
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

describe('CPIResourceView', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderCpiView();
      expect(container).toBeInTheDocument();
    });

    it('should render with default fixture data', () => {
      renderCpiView();
      expect(screen.getByText('CCDI Participant Index')).toBeInTheDocument();
      expect(screen.getAllByText('CCDI Hub').length).toBeGreaterThan(0);
      expect(screen.getByText(/CPI intro for unit test/i)).toBeInTheDocument();
    });
  });

  describe('CPI stats panel', () => {
    it('should show loading copy while statistics are loading', () => {
      renderCpiView({
        loadingCpiStats: true,
        cpiStats: null,
      });
      expect(screen.getByText('Loading Statistics...')).toBeInTheDocument();
    });

    it('should show unavailable message when stats failed or are missing', () => {
      renderCpiView({
        cpiStats: null,
        loadingCpiStats: false,
        cpiStatsError: true,
      });
      expect(screen.getByText('Statistic Temporarily Unavailable')).toBeInTheDocument();
    });

    it('should render formatted counts when cpiStats is provided', () => {
      renderCpiView({
        cpiStats: minimalCpiStatsApiResponse,
        loadingCpiStats: false,
        cpiStatsError: false,
      });
      expect(screen.getByText('CPI Stats at a Glance')).toBeInTheDocument();
      expect(screen.getByText(/4,242/)).toBeInTheDocument();
      expect(screen.getByText(/9,001/)).toBeInTheDocument();
      expect(screen.getByText(/111/)).toBeInTheDocument();
    });
  });

  describe('Topics and body content', () => {
    it('should render TOPICS and section copy from cpiContent', () => {
      renderCpiView();
      expect(screen.getByText('TOPICS')).toBeInTheDocument();
      expect(screen.getAllByText('Overview Topic').length).toBeGreaterThan(0);
      expect(screen.getByText(/CPI section body for testing/i)).toBeInTheDocument();
      expect(screen.getAllByText('Components Topic').length).toBeGreaterThan(0);
    });
  });

  describe('Side effects', () => {
    it('should call window.scrollTo on mount', () => {
      const scrollToMock = jest.fn();
      window.scrollTo = scrollToMock;
      renderCpiView();
      expect(scrollToMock).toHaveBeenCalledWith(0, 0);
    });
  });

  describe('Edge cases', () => {
    it('should render stats unavailable when cpiStats is null after load', () => {
      renderCpiView({
        cpiStats: null,
        loadingCpiStats: false,
        cpiStatsError: false,
      });
      expect(screen.getByText('Statistic Temporarily Unavailable')).toBeInTheDocument();
    });
  });

  describe('Navigation interactions', () => {
    it('should highlight topic when nav item is clicked', () => {
      const scrollTo = jest.fn();
      window.scrollTo = scrollTo;
      renderCpiView();
      const topic = clickTopicNav('Components Topic');
      expect(topic).toHaveClass('selected');
      expect(scrollTo).toHaveBeenCalled();
    });

    it('should apply sticky nav on scroll', () => {
      renderCpiView();
      triggerResourceScroll('FederationBody');
      expect(document.getElementById('leftNav').className).toContain('navListSticky');
    });

    it('should toggle mobile section visibility', () => {
      renderCpiView();
      const mobileHeader = toggleMobileSection();
      expect(mobileHeader.className).not.toContain('sectionCollapse');
    });
  });
});
