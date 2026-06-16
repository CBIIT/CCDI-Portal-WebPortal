/**
 * FooterDesktop — link columns, email signup, bottom NIH strip (fixture-driven copy).
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FooterDesktop from '../../../src/components/ResponsiveFooter/FooterDesktop';

describe('FooterDesktop', () => {
  describe('Rendering', () => {
    it('should render section headings and stable footer links from FooterData', () => {
      render(<FooterDesktop />);

      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Policies' })).toBeInTheDocument();
      expect(screen.getByText('Sign up for email updates')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'About CCDI Hub' })).toHaveAttribute('href', '/about');
    });

    it('should show National Cancer Institute branding in the bottom strip', () => {
      render(<FooterDesktop />);

      expect(
        screen.getByRole('heading', { name: /National Cancer Institute/i }),
      ).toBeInTheDocument();
      expect(screen.getByText(/Follow Us/i)).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should show validation copy when an invalid email is submitted', () => {
      render(<FooterDesktop />);

      fireEvent.change(screen.getByLabelText(/Enter your email address/i), {
        target: { value: 'not-an-email' },
      });
      fireEvent.click(screen.getByRole('button', { name: /^Sign up$/i }));

      expect(screen.getByText(/Enter a valid email address/i)).toBeInTheDocument();
    });
  });
});
