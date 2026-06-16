/**
 * SearchBarDesktop — keyword search navigates to `/sitesearch`.
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
import SearchBarDesktop from '../../../../src/components/ResponsiveHeader/components/SearchBarDesktop';

describe('SearchBarDesktop', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe('Side effects', () => {
    it('should navigate to site search when Search is clicked', () => {
      render(<SearchBarDesktop />);

      fireEvent.change(screen.getByPlaceholderText('search'), {
        target: { value: '  lung  ' },
      });
      fireEvent.click(screen.getByText('Search'));

      expect(mockNavigate).toHaveBeenCalledWith('/sitesearch?keyword=lung');
    });

    it('should navigate when Enter is pressed in the search field', () => {
      render(<SearchBarDesktop />);

      fireEvent.change(screen.getByPlaceholderText('search'), {
        target: { value: 'cbc' },
      });
      fireEvent.keyPress(screen.getByPlaceholderText('search'), {
        key: 'Enter',
        code: 'Enter',
        charCode: 13,
      });

      expect(mockNavigate).toHaveBeenCalledWith('/sitesearch?keyword=cbc');
    });
  });
});
