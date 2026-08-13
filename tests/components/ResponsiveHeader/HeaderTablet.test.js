/**
 * HeaderTablet — US banner, menu + search, slide-out menu with primary nav links.
 * Logos and search are mocked; real `globalHeaderData` drives menu content.
 */

if (typeof global.MutationObserver === 'undefined') {
  global.MutationObserver = class MutationObserver {
    disconnect() {}
    observe() {}
    takeRecords() { return []; }
  };
}

jest.mock('../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_C3DC: 'https://clinicalcommons-dev.ccdi.cancer.gov',
  },
}));

jest.mock('../../../src/components/ResponsiveHeader/components/LogoTablet', () => {
  const React = require('react');
  return { __esModule: true, default: () => <div data-testid="logo-mock" /> };
});
jest.mock('../../../src/components/ResponsiveHeader/components/SearchBarTablet', () => {
  const React = require('react');
  return { __esModule: true, default: () => <div data-testid="search-mock" /> };
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import HeaderTablet from '../../../src/components/ResponsiveHeader/HeaderTablet';
import NavContentContext from '../../../src/components/ResponsiveHeader/NavContentContext';
import {
  navMobileList,
  navbarSublists,
} from '../../../src/bento/globalHeaderData';

function clickWithInnerText(element, text) {
  Object.defineProperty(element, 'innerText', { configurable: true, value: text });
  fireEvent.click(element);
}

const navValue = { navMobileList, navbarSublists };

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <NavContentContext.Provider value={navValue}>
        <HeaderTablet />
      </NavContentContext.Provider>
    </MemoryRouter>,
  );
}

describe('HeaderTablet', () => {
  describe('Rendering', () => {
    it('should show the US government banner, menu control, and search (off /sitesearch)', () => {
      renderAt('/home');
      expect(
        screen.getByText(/An official website of the United States government/i),
      ).toBeInTheDocument();
      expect(screen.getByText('Menu')).toBeInTheDocument();
      expect(screen.getByTestId('search-mock')).toBeInTheDocument();
    });
  });

  describe('Menu interaction', () => {
    it('should open the mobile menu and list top-level nav links', () => {
      renderAt('/');

      fireEvent.click(screen.getByText('Menu'));

      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      expect(screen.queryByText('MY FILES')).not.toBeInTheDocument();
    });

    it('should list primary nav without Cohort Analyzer and point Explore/Studies to C3DC', () => {
      renderAt('/');

      fireEvent.click(screen.getByText('Menu'));

      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Explore' })).toHaveAttribute(
        'href',
        'https://clinicalcommons-dev.ccdi.cancer.gov/exploreParticipants',
      );
      expect(screen.getByRole('link', { name: 'Studies' })).toHaveAttribute(
        'href',
        'https://clinicalcommons-dev.ccdi.cancer.gov/studies',
      );
      expect(screen.getByRole('link', { name: 'Explore' })).not.toHaveAttribute('target');
      expect(screen.getByRole('link', { name: 'Studies' })).not.toHaveAttribute('target');
      expect(screen.getByText('Resources')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'News' })).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.queryByText('Cohort Analyzer')).not.toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should not mount the search bar on /sitesearch', () => {
      renderAt('/sitesearch');
      expect(screen.queryByTestId('search-mock')).not.toBeInTheDocument();
    });
  });

  describe('Submenu navigation', () => {
    it('should open Resources submenu from the slide-out menu', async () => {
      renderAt('/');
      fireEvent.click(screen.getByText('Menu'));
      clickWithInnerText(document.querySelector('.navMobileItem.clickable'), 'Resources');
      await waitFor(() => {
        expect(screen.getByText('Molecular Characterization Initiative')).toBeInTheDocument();
      });
    });

    it('should close menu from overlay and close icon', () => {
      renderAt('/');
      fireEvent.click(screen.getByText('Menu'));
      fireEvent.click(document.querySelector('.greyContainer'));
      fireEvent.click(screen.getByText('Menu'));
      fireEvent.click(screen.getByAltText('menuClearButton'));
    });
  });
});
