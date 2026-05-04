/**
 * SearchBarTablet — keyword search navigates to `/sitesearch`.
 */

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBarTablet from '../../../../src/components/ResponsiveHeader/components/SearchBarTablet';

describe('SearchBarTablet', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe('Side effects', () => {
    it('should navigate to site search when Search is clicked', () => {
      render(<SearchBarTablet />);

      fireEvent.change(screen.getByPlaceholderText('search'), {
        target: { value: 'trial' },
      });
      fireEvent.click(screen.getByRole('img', { name: 'searchIcon' }).closest('div'));

      expect(mockNavigate).toHaveBeenCalledWith('/sitesearch?keyword=trial');
    });
  });
});
