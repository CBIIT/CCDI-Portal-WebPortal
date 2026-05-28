/**
 * HeaderDesktop — US banner, main shell, search area hidden on /sitesearch.
 * Child header pieces are mocked to keep the suite fast.
 */

jest.mock('../../../src/components/ResponsiveHeader/components/LogoDesktop', () => {
  const React = require('react');
  return { __esModule: true, default: () => <div data-testid="logo-mock" /> };
});
jest.mock('../../../src/components/ResponsiveHeader/components/SearchBarDesktop', () => {
  const React = require('react');
  return { __esModule: true, default: () => <div data-testid="search-mock" /> };
});
jest.mock('../../../src/components/ResponsiveHeader/components/NavbarDesktop', () => {
  const React = require('react');
  return { __esModule: true, default: () => <nav data-testid="navbar-mock" /> };
});
jest.mock('../../../src/components/ResponsiveHeader/components/CartDesktop', () => {
  const React = require('react');
  return { __esModule: true, default: () => <div data-testid="cart-mock" /> };
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import HeaderDesktop from '../../../src/components/ResponsiveHeader/HeaderDesktop';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <HeaderDesktop />
    </MemoryRouter>,
  );
}

describe('HeaderDesktop', () => {
  describe('Rendering', () => {
    it('should show the US government banner and main header region', () => {
      renderAt('/home');
      expect(
        screen.getByText(/An official website of the United States government/i),
      ).toBeInTheDocument();
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByTestId('logo-mock')).toBeInTheDocument();
      expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();
      expect(screen.getByTestId('cart-mock')).toBeInTheDocument();
    });

    it('should show the search area when the path is not /sitesearch', () => {
      renderAt('/explore');
      expect(screen.getByTestId('search-mock')).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should not render the search area on /sitesearch', () => {
      renderAt('/sitesearch');
      expect(screen.queryByTestId('search-mock')).not.toBeInTheDocument();
    });
  });
});
