/**
 * FooterMobile — stacked footer; signup + links from FooterData.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FooterMobile from '../../../src/components/ResponsiveFooter/FooterMobile';

describe('FooterMobile', () => {
  describe('Rendering', () => {
    it('should render contentinfo and signup region', () => {
      render(<FooterMobile />);

      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByText('Sign up for email updates')).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should validate email input before submit', () => {
      render(<FooterMobile />);

      fireEvent.change(screen.getByLabelText(/Enter your email address/i), {
        target: { value: 'invalid' },
      });
      fireEvent.click(screen.getByRole('button', { name: /^Sign up$/i }));

      expect(screen.getByText(/Enter a valid email address/i)).toBeInTheDocument();
    });
  });
});
