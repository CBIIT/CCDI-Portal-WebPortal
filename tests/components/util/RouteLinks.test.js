/**
 * RouteLinks — mailto, internal hash links, and external anchors.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RouteLinks from '../../../src/components/util/RouteLinks';

describe('RouteLinks', () => {
  describe('Rendering', () => {
    it('should render a mailto link when `to` looks like an email', () => {
      render(
        <RouteLinks to="user@nih.gov" title="mail">
          Email us
        </RouteLinks>,
      );
      const link = screen.getByRole('link', { name: 'Email us' });
      expect(link).toHaveAttribute('href', 'mailto:user@nih.gov');
    });

    it('should render an internal hash-router link when `to` starts with /', () => {
      render(
        <RouteLinks to="/explore" title="Explore">
          Explore
        </RouteLinks>,
      );
      expect(screen.getByRole('link', { name: 'Explore' })).toBeInTheDocument();
    });

    it('should render an external anchor for other strings', () => {
      render(
        <RouteLinks to="https://www.cancer.gov" title="NCI">
          NCI
        </RouteLinks>,
      );
      const link = screen.getByRole('link', { name: 'NCI' });
      expect(link).toHaveAttribute('href', 'https://www.cancer.gov');
      expect(link).toHaveAttribute('target', 'external-url');
    });
  });
});
