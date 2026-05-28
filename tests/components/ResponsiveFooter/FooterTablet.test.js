/**
 * FooterTablet — responsive footer layout; same data sources as desktop.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FooterTablet from '../../../src/components/ResponsiveFooter/FooterTablet';

describe('FooterTablet', () => {
  describe('Rendering', () => {
    it('should render primary footer sections and signup heading', () => {
      render(<FooterTablet />);

      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByText('Sign up for email updates')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should validate email input before submit', () => {
      render(<FooterTablet />);

      fireEvent.change(screen.getByLabelText(/Enter your email address/i), {
        target: { value: 'bad' },
      });
      fireEvent.click(screen.getByRole('button', { name: /^Sign up$/i }));

      expect(screen.getByText(/Enter a valid email address/i)).toBeInTheDocument();
    });
  });
});
