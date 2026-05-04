/**
 * `prepareLinks` and `Anchor` — placeholder substitution and external vs internal links.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { prepareLinks, Anchor } from '../../../src/components/util/Anchor';

describe('prepareLinks', () => {
  describe('Rendering / mapping', () => {
    it('should replace {field} placeholders in link and labelLink', () => {
      const props = prepareLinks(
        [
          { link: '/study/{study_id}', labelLink: 'https://x/{study_id}' },
        ],
        { study_id: 'phs001' },
      );
      expect(props[0].link).toBe('/study/phs001');
      expect(props[0].labelLink).toBe('https://x/phs001');
    });

    it('should leave rows without link keys unchanged apart from spread', () => {
      const props = prepareLinks([{ name: 'n' }], {});
      expect(props[0]).toEqual({ name: 'n' });
    });
  });
});

describe('Anchor', () => {
  const classes = { link: 'link-class' };

  describe('Rendering', () => {
    it('should render an external anchor for scheme URLs', () => {
      render(
        <Anchor
          link="https://example.com/path"
          text="Example"
          classes={classes}
        />,
      );
      const a = screen.getByRole('link', { name: 'Example' });
      expect(a).toHaveAttribute('href', 'https://example.com/path');
      expect(a).toHaveAttribute('target', '_blank');
      expect(a).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should use RouteLinks for internal paths', () => {
      render(
        <Anchor link="/about" text="About" classes={classes} />,
      );
      expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    });
  });
});
