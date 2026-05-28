/**
 * 404 / page-not-found view.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Error from '../../../src/pages/error/Error';
import { errorData } from '../../../src/bento/pageNotFoundData';

describe('Error page', () => {
  describe('Rendering', () => {
    it('should render error copy and return-home link', () => {
      render(
        <MemoryRouter>
          <Error />
        </MemoryRouter>,
      );

      expect(screen.getByAltText('404 Error Icon')).toBeInTheDocument();
      expect(screen.getByText(errorData.titleFirst)).toBeInTheDocument();
      expect(screen.getByText(errorData.titleSecond)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: errorData.buttonTitle })).toHaveAttribute('href', '/');
    });
  });
});
