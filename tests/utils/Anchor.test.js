/**
 * Phase 3 — `src/utils/Anchor.js`: external `<a>` vs internal `Link`.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import Anchor from '../../src/utils/Anchor';

describe('Anchor', () => {
  const classes = { link: 'link-class' };

  describe('Rendering', () => {
    it('should render an external https link with target _blank', () => {
      render(<Anchor link="https://example.com/path" text="Outside" classes={classes} />);
      const link = screen.getByRole('link', { name: 'Outside' });
      expect(link).toHaveAttribute('href', 'https://example.com/path');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should render an internal router link for paths without a URL scheme', () => {
      render(
        <MemoryRouter>
          <Anchor link="/explore" text="Inside" classes={classes} />
        </MemoryRouter>,
      );
      expect(screen.getByRole('link', { name: 'Inside' })).toHaveAttribute('href', '/explore');
    });
  });
});
