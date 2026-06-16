/**
 * Unit tests for ResponsiveFooter (`src/components/ResponsiveFooter/index.js`).
 * Asserts desktop / tablet / mobile shells render mocked breakpoint footers.
 */

jest.mock('../../../src/components/ResponsiveFooter/FooterDesktop', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: function FooterDesktop() {
      return <div data-testid="footer-desktop" />;
    },
  };
});

jest.mock('../../../src/components/ResponsiveFooter/FooterTablet', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: function FooterTablet() {
      return <div data-testid="footer-tablet" />;
    },
  };
});

jest.mock('../../../src/components/ResponsiveFooter/FooterMobile', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: function FooterMobile() {
      return <div data-testid="footer-mobile" />;
    },
  };
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../../../src/components/ResponsiveFooter/index';

describe('ResponsiveFooter', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<Footer />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should mount desktop, tablet, and mobile footer variants', () => {
      render(<Footer />);
      expect(screen.getByTestId('footer-desktop')).toBeInTheDocument();
      expect(screen.getByTestId('footer-tablet')).toBeInTheDocument();
      expect(screen.getByTestId('footer-mobile')).toBeInTheDocument();
    });
  });
});
