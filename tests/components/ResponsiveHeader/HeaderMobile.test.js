/**
 * HeaderMobile — same structure as tablet: US banner, menu, search, slide-out nav.
 * Logos and search are mocked; real `globalHeaderData` drives menu content.
 */

jest.mock('../../../src/components/ResponsiveHeader/components/LogoMobile', () => {
  const React = require('react');
  return { __esModule: true, default: () => <div data-testid="logo-mock" /> };
});
jest.mock('../../../src/components/ResponsiveHeader/components/SearchBarMobile', () => {
  const React = require('react');
  return { __esModule: true, default: () => <div data-testid="search-mock" /> };
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import HeaderMobile from '../../../src/components/ResponsiveHeader/HeaderMobile';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <HeaderMobile />
    </MemoryRouter>,
  );
}

describe('HeaderMobile', () => {
  describe('Rendering', () => {
    it('should show the US government banner, menu, and search (off /sitesearch)', () => {
      renderAt('/home');
      expect(
        screen.getByText(/An official website of the United States government/i),
      ).toBeInTheDocument();
      expect(screen.getByText('Menu')).toBeInTheDocument();
      expect(screen.getByTestId('search-mock')).toBeInTheDocument();
    });
  });

  describe('Menu interaction', () => {
    it('should open the menu and expose Home and MY FILES links', () => {
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
});
