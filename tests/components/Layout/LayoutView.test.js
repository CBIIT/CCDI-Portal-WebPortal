/**
 * Layout shell: CssBaseline, header, routes, footer, overlay, scroll button.
 * Page controllers and route targets are mocked (tests/TEST_STRUCTURE.md — no heavy imports).
 */

jest.mock('../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_C3DC: 'https://clinicalcommons-dev.ccdi.cancer.gov',
  },
}));

jest.mock('../../../src/components/ResponsiveFooter/', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="layout-footer" />,
  };
});

jest.mock('../../../src/components/ResponsiveHeader/', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="layout-header" />,
  };
});

jest.mock('../../../src/components/OverlayWindow/OverlayWindow', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="overlay-window" />,
  };
});

jest.mock('../../../src/components/ScrollButton/ScrollButtonView', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="scroll-button" />,
  };
});

jest.mock('../../../src/pages/landing/landingController', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="route-home" />,
  };
});

jest.mock('../../../src/pages/about/AboutPage/AboutController', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="route-about" />,
  };
});

jest.mock('../../../src/pages/about/DataUsagePoliciesPage/DataUsagePoliciesController', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="route-data-usage" />,
  };
});

jest.mock('../../../src/pages/about/FaqPage/FaqController', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="route-faqs" />,
  };
});

jest.mock('../../../src/pages/about/publications/publicationsController', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="route-publications" />,
  };
});

jest.mock('../../../src/pages/news/newsController', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="route-news" />,
  };
});

jest.mock('../../../src/pages/dmn/DataModelNavigator', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="route-dmn" />,
  };
});

jest.mock('../../../src/pages/error/Error', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="route-error" />,
  };
});

jest.mock('../../../src/pages/globalSearch/searchController', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="route-search" />,
  };
});

jest.mock('../../../src/pages/resource/MCIResourcePage/MCIResourceMarkdownController', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="route-mci" />,
  };
});

jest.mock('../../../src/pages/resource/PMTLResourcePage/PMTLResourceController', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="route-pmtl" />,
  };
});

jest.mock('../../../src/pages/resource/FederationResourcePage/FederationResourceController', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="route-federation-resource" />,
  };
});

jest.mock('../../../src/pages/resource/FederationDMN/FederationDMN', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="route-federation-dmn" />,
  };
});

jest.mock('../../../src/pages/resource/CPIResourcePage/CPIResourceController', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="route-cpi" />,
  };
});

jest.mock('../../../src/pages/releaseNotePage/releaseNotePageController', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="route-release-notes" />,
  };
});

jest.mock('../../../src/pages/resource/ToolsResourcePage/ToolsResourceController', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="route-tools" />,
  };
});

jest.mock('../../../src/pages/resource/CCDIEventAnnouncementsResourcePage/CCDIEventAnnouncementsResourceController', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="route-events" />,
  };
});

jest.mock('../../../src/pages/resource/CCDIEventAnnouncementsResourcePage/EventDetailController', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="route-event-detail" />,
  };
});

jest.mock('../../../src/pages/resource/RareCancerResourcePage/RareCancerResourceController', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="route-rare-cancer" />,
  };
});

jest.mock('../../../src/pages/resource/MCIJson2TsvResourcePage/MCIJson2TsvResourceController', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => <div data-testid="route-mci-json2tsv" />,
  };
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Layout from '../../../src/components/Layout/LayoutView';

const theme = createTheme();
const C3DC_URL = 'https://clinicalcommons-dev.ccdi.cancer.gov';

function renderLayoutAt(path) {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <Layout />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe('LayoutView', () => {
  describe('Rendering', () => {
    it('should render shell regions and route outlet without crashing', () => {
      renderLayoutAt('/');

      expect(screen.getByTestId('layout-header')).toBeInTheDocument();
      expect(screen.getByTestId('layout-footer')).toBeInTheDocument();
      expect(screen.getByTestId('overlay-window')).toBeInTheDocument();
      expect(screen.getByTestId('scroll-button')).toBeInTheDocument();
    });

    it('should render the home controller on /', () => {
      renderLayoutAt('/');
      expect(screen.getByTestId('route-home')).toBeInTheDocument();
    });

    it('should render the about controller on /about', () => {
      renderLayoutAt('/about');
      expect(screen.getByTestId('route-about')).toBeInTheDocument();
    });

    it('should render the FAQ controller on /faqs', () => {
      renderLayoutAt('/faqs');
      expect(screen.getByTestId('route-faqs')).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should render the error route for unknown paths', () => {
      renderLayoutAt('/this-route-does-not-exist');
      expect(screen.getByTestId('route-error')).toBeInTheDocument();
    });

    it('should render the error route for removed cart path', () => {
      renderLayoutAt('/fileCentricCart');
      expect(screen.getByTestId('route-error')).toBeInTheDocument();
    });

    it.each([
      ['/explore', `${C3DC_URL}/exploreParticipants`],
      ['/explore?tab=1', `${C3DC_URL}/exploreParticipants?tab=1`],
      ['/studies', `${C3DC_URL}/studies`],
      ['/studies/phs000001', `${C3DC_URL}/studies/phs000001`],
      ['/cohortAnalyzer', `${C3DC_URL}/cohortAnalyzer`],
    ])('should redirect %s to %s', (path, expectedUrl) => {
      const replace = jest.fn();
      const originalLocation = window.location;
      delete window.location;
      window.location = { replace };

      renderLayoutAt(path);

      expect(replace).toHaveBeenCalledWith(expectedUrl);
      expect(screen.queryByTestId('route-error')).not.toBeInTheDocument();

      window.location = originalLocation;
    });
  });
});
