/**
 * NavbarDesktop — primary navigation strip (Explore, Studies, Resources dropdown, etc.).
 */

jest.mock('../../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_C3DC: 'https://clinicalcommons-dev.ccdi.cancer.gov',
  },
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import NavbarDesktop from '../../../../src/components/ResponsiveHeader/components/NavbarDesktop';
import NavContentContext from '../../../../src/components/ResponsiveHeader/NavContentContext';
import {
  navMobileList,
  navbarSublists,
} from '../../../../src/bento/globalHeaderData';

const C3DC_URL = 'https://clinicalcommons-dev.ccdi.cancer.gov';

const navValue = { navMobileList, navbarSublists };

describe('NavbarDesktop', () => {
  function renderNav(path = '/') {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <NavContentContext.Provider value={navValue}>
          <NavbarDesktop />
        </NavContentContext.Provider>
      </MemoryRouter>,
    );
  }

  function clickNavLabel(label) {
    const navItem = Array.from(document.querySelectorAll('.navText'))
      .find((el) => el.textContent.trim() === label);
    Object.defineProperty(navItem, 'innerText', { configurable: true, value: label });
    fireEvent.click(navItem);
  }

  describe('Rendering', () => {
    it('should render core nav labels from global header data', () => {
      renderNav();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Explore')).toBeInTheDocument();
      expect(screen.getByText('Studies')).toBeInTheDocument();
      expect(screen.getByText('Resources')).toBeInTheDocument();
      expect(screen.getByText('News')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.queryByText('Cohort Analyzer')).not.toBeInTheDocument();
    });

    it('should link Explore and Studies to C3DC in the same tab', () => {
      renderNav();
      const explore = screen.getByRole('link', { name: 'Explore' });
      const studies = screen.getByRole('link', { name: 'Studies' });
      expect(explore).toHaveAttribute('href', `${C3DC_URL}/exploreParticipants`);
      expect(studies).toHaveAttribute('href', `${C3DC_URL}/studies`);
      expect(explore).not.toHaveAttribute('target');
      expect(studies).not.toHaveAttribute('target');
    });

    it('should keep internal primary items as router links', () => {
      renderNav();
      expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/home');
      expect(screen.getByRole('link', { name: 'News' })).toHaveAttribute('href', '/news');
    });
  });

  describe('Dropdown interaction', () => {
    it('should open Resources dropdown and list external links', () => {
      renderNav();
      clickNavLabel('Resources');
      expect(screen.getByText('Childhood Cancer Data Catalog')).toBeInTheDocument();
    });

    it('should toggle Resources dropdown closed when clicked again', () => {
      renderNav();
      clickNavLabel('Resources');
      clickNavLabel('Resources');
      expect(screen.queryByText('Childhood Cancer Data Catalog')).not.toBeInTheDocument();
    });

    it('should open About submenu on /about route styling', () => {
      renderNav('/about');
      clickNavLabel('About');
      expect(screen.getByText('About CCDI Data')).toBeInTheDocument();
      expect(screen.getByText('CCDI Knowledge and Training')).toBeInTheDocument();
      expect(screen.getByText('Help')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'About CCDI Hub' })).toHaveAttribute('href', '/about');
      expect(screen.getByRole('link', { name: 'Release Notes' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'CCDI FAQs' })).toHaveAttribute('href', '/faq');
      expect(screen.queryByText('Hub Explore Dashboard Tutorial Video')).not.toBeInTheDocument();
    });

    it('should support keyboard Enter on clickable nav items', () => {
      renderNav();
      const resources = Array.from(document.querySelectorAll('.navText'))
        .find((el) => el.textContent.trim() === 'Resources');
      Object.defineProperty(resources, 'innerText', { configurable: true, value: 'Resources' });
      fireEvent.keyDown(resources, { key: 'Enter' });
      expect(screen.getByText('Childhood Cancer Data Catalog')).toBeInTheDocument();
    });
  });
});
