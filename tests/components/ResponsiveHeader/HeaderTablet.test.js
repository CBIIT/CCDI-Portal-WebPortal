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

function clickWithInnerText(element, text) {
  Object.defineProperty(element, 'innerText', { configurable: true, value: text });
  fireEvent.click(element);
}

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <HeaderTablet />
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
      expect(screen.getByText('MY FILES')).toBeInTheDocument();
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
