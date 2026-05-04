/**
 * NavbarDesktop — primary navigation strip (Explore, Studies, Resources dropdown, etc.).
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import NavbarDesktop from '../../../../src/components/ResponsiveHeader/components/NavbarDesktop';

describe('NavbarDesktop', () => {
  describe('Rendering', () => {
    it('should render core nav labels from global header data', () => {
      render(
        <MemoryRouter>
          <NavbarDesktop />
        </MemoryRouter>,
      );

      expect(screen.getByText('Explore')).toBeInTheDocument();
      expect(screen.getByText('Studies')).toBeInTheDocument();
      expect(screen.getByText('Resources')).toBeInTheDocument();
    });
  });
});
