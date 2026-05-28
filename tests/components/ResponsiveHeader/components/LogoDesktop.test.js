/**
 * LogoDesktop — branded NavLink to home with accessible label.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import LogoDesktop from '../../../../src/components/ResponsiveHeader/components/LogoDesktop';

describe('LogoDesktop', () => {
  describe('Rendering', () => {
    it('should render a home link with the portal logo label', () => {
      render(
        <MemoryRouter>
          <LogoDesktop />
        </MemoryRouter>,
      );

      const logoLink = screen.getByLabelText('logoPortal');
      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveAttribute('href', '/');
    });
  });
});
