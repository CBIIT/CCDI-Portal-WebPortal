/**
 * Unit tests for LandingView (home page).
 *
 * Structure follows tests/TEST_STRUCTURE.md for consistency across the app:
 * Rendering → Feature sections (Hero, Stats, Resources, etc.) → Side effects → Edge cases.
 * Default props come from tests/fixtures/landing/landingViewProps.js (no network).
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingView from '../../../src/pages/landing/landingView';
import {
  defaultLandingStatsData,
  defaultLandingNewsData,
} from '../../fixtures/landing/landingViewProps';

// Mock child components to isolate LandingView and avoid asset/context dependencies
jest.mock('../../../src/pages/landing/component/carousel', () => function Carousel() {
  return <div data-testid="carousel" />;
});
jest.mock('../../../src/pages/landing/component/heroMobile', () => function HeroMobile() {
  return <div data-testid="hero-mobile" />;
});
jest.mock('../../../src/pages/landing/component/latestUpdate', () => function LatestUpdate() {
  return <div data-testid="latest-update" />;
});

function renderLandingView(props = {}) {
  const { statsData = defaultLandingStatsData, newsData = defaultLandingNewsData } = props;
  return render(
    <MemoryRouter>
      <LandingView statsData={statsData} newsData={newsData} />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  window.scrollTo = jest.fn();
});

describe('LandingView', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderLandingView();
      expect(container).toBeInTheDocument();
    });

    it('should render with default stats and news data', () => {
      renderLandingView();
      expect(screen.getByText(/Discover/)).toBeInTheDocument();
      expect(screen.getByText(/CCDI Stats At a Glance/)).toBeInTheDocument();
      expect(screen.getByTestId('carousel')).toBeInTheDocument();
      expect(screen.getByTestId('latest-update')).toBeInTheDocument();
    });
  });

  describe('Hero / Intro section', () => {
    it('should display the main hero heading', () => {
      renderLandingView();
      const heroHeading = screen.getByRole('heading', { level: 1 });
      expect(heroHeading).toHaveTextContent('Discover');
      expect(heroHeading).toHaveTextContent('CCDI');
      expect(heroHeading).toHaveTextContent('Resources');
    });

    it('should display intro copy about exploring the CCDI Hub', () => {
      renderLandingView();
      expect(screen.getByText(/Explore the CCDI Hub/)).toBeInTheDocument();
    });

    it('should link to About page with correct href', () => {
      renderLandingView();
      const aboutLink = screen.getByRole('link', { name: /ABOUT CCDI HUB/i });
      expect(aboutLink).toBeInTheDocument();
      expect(aboutLink).toHaveAttribute('href', '/about');
    });

    it('should link to external CCDI page with target and rel', () => {
      renderLandingView();
      const externalLinks = screen.getAllByRole('link', { name: /ABOUT CCDI/i });
      const externalLink = externalLinks.find((node) => node.getAttribute('href')?.startsWith('https://www.cancer.gov'));
      expect(externalLink).toBeDefined();
      expect(externalLink).toHaveAttribute('target', '_blank');
      expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(externalLink).toHaveAttribute('href', 'https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative');
    });

    it('should render the Carousel component', () => {
      renderLandingView();
      expect(screen.getByTestId('carousel')).toBeInTheDocument();
    });

    it('should render HeroMobile component', () => {
      renderLandingView();
      expect(screen.getByTestId('hero-mobile')).toBeInTheDocument();
    });
  });

  describe('Stats section', () => {
    it('should display the stats section heading', () => {
      renderLandingView();
      expect(screen.getByRole('heading', { name: /CCDI Stats At a Glance/i })).toBeInTheDocument();
    });

    it('should render one stat item per statsData entry', () => {
      renderLandingView();
      const statsSection = screen.getByTestId('landing-stats-section');
      const statLinks = within(statsSection).getAllByRole('link', { name: /Childhood Cancer Data Catalog|Molecular Characterization Initiative|Molecular Targets Platform|National Childhood Cancer Registry Explorer/i });
      expect(statLinks.length).toBe(4);
    });

    it('should format stat numbers with en-US locale', () => {
      renderLandingView();
      expect(screen.getByText('1,700,440')).toBeInTheDocument();
      expect(screen.getByText('58,867')).toBeInTheDocument();
    });

    it('should show asterisk for Participants stat', () => {
      renderLandingView();
      const participantsHeading = screen.getByText(/Participants with Available Genomic and Clinical Data/);
      expect(participantsHeading).toBeInTheDocument();
      expect(screen.getByText(/Counts for MCI participants/)).toBeInTheDocument();
    });

    it('should use external link with target and rel for http stats links', () => {
      renderLandingView();
      const statsSection = screen.getByTestId('landing-stats-section');
      const catalogLink = within(statsSection).getByRole('link', { name: /Childhood Cancer Data Catalog/i });
      expect(catalogLink).toHaveAttribute('href', 'https://datacatalog.ccdi.cancer.gov');
      expect(catalogLink).toHaveAttribute('target', '_blank');
      expect(catalogLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should use NavLink for internal stats links', () => {
      renderLandingView();
      const statsSection = screen.getByTestId('landing-stats-section');
      const mciLink = within(statsSection).getByRole('link', { name: /Molecular Characterization Initiative/i });
      expect(mciLink).toHaveAttribute('href', '/MCI');
    });

    it('should display the stats note', () => {
      renderLandingView();
      expect(screen.getByText(/Counts for MCI participants in CCDI Hub/)).toBeInTheDocument();
    });
  });

  describe('LatestUpdate section', () => {
    it('should render LatestUpdate with newsData props', () => {
      renderLandingView();
      expect(screen.getByTestId('latest-update')).toBeInTheDocument();
    });
  });

  describe('Resources section', () => {
    it('should display the Resources section title', () => {
      renderLandingView();
      expect(screen.getByRole('heading', { name: /^Resources$/i })).toBeInTheDocument();
    });

    it('should display CCDI-Supported Resources subsection', () => {
      renderLandingView();
      expect(screen.getByRole('heading', { name: /CCDI-SUPPORTED RESOURCES/i })).toBeInTheDocument();
    });

    it('should display Other Resources subsection', () => {
      renderLandingView();
      expect(screen.getByRole('heading', { name: /OTHER RESOURCES/i })).toBeInTheDocument();
    });

    it('should render application resource links', () => {
      renderLandingView();
      expect(screen.getAllByText(/Childhood Cancer Data Catalog/).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(/Molecular Characterization Initiative/).length).toBeGreaterThanOrEqual(1);
    });

    it('should render cloud resource links with external attributes', () => {
      renderLandingView();
      const cgcLink = screen.getByRole('link', { name: /Cancer Genomics Cloud/ });
      expect(cgcLink).toHaveAttribute('target', '_blank');
      expect(cgcLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Side effects', () => {
    it('should call window.scrollTo on mount', () => {
      const scrollToMock = jest.fn();
      window.scrollTo = scrollToMock;
      renderLandingView();
      expect(scrollToMock).toHaveBeenCalledWith(0, 0);
    });
  });

  describe('Edge cases', () => {
    it('should render with empty statsData without crashing', () => {
      const { container } = renderLandingView({ statsData: [] });
      expect(container).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /CCDI Stats At a Glance/i })).toBeInTheDocument();
      expect(screen.getByTestId('landing-stats-section')).toBeInTheDocument();
    });

    it('should render with empty newsData without crashing', () => {
      const emptyNews = { newsList: [], newsImgUrlList: [], releaseNotesList: [], altList: [] };
      const { container } = renderLandingView({ newsData: emptyNews });
      expect(container).toBeInTheDocument();
      expect(screen.getByTestId('latest-update')).toBeInTheDocument();
    });

    it('should handle stat with empty num without crashing', () => {
      const statsWithEmptyNum = [
        { num: '', title: 'Test Stat', detail: 'Test stat detail link', link: '/test' },
      ];
      const { container } = renderLandingView({ statsData: statsWithEmptyNum });
      expect(container).toBeInTheDocument();
      expect(screen.getByText('Test Stat')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Test stat detail link' })).toBeInTheDocument();
    });
  });
});
