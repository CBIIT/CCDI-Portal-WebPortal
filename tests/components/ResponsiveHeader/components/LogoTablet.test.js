/**
 * LogoTablet — compact logo NavLink to home.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import LogoTablet from '../../../../src/components/ResponsiveHeader/components/LogoTablet';

describe('LogoTablet', () => {
  describe('Rendering', () => {
    it('should render a home link with the portal logo label', () => {
      render(
        <MemoryRouter>
          <LogoTablet />
        </MemoryRouter>,
      );

      const logoLink = screen.getByLabelText('logoPortal');
      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveAttribute('href', '/');
    });
  });
});
