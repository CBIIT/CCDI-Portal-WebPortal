/**
 * NavbarDesktop — primary navigation strip (Explore, Studies, Resources dropdown, etc.).
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import NavbarDesktop from '../../../../src/components/ResponsiveHeader/components/NavbarDesktop';

describe('NavbarDesktop', () => {
  function renderNav(path = '/') {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <NavbarDesktop />
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
      expect(screen.getByText('Explore')).toBeInTheDocument();
      expect(screen.getByText('Studies')).toBeInTheDocument();
      expect(screen.getByText('Resources')).toBeInTheDocument();
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
      expect(screen.getByText('About CCDI Hub')).toBeInTheDocument();
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
