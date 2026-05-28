/**
 * FilterThemeConfig — MUI theme provider wrapper for facet filters.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterThemeConfig from '../../../../src/pages/inventory/sideBar/FilterThemeConfig';

describe('FilterThemeConfig', () => {
  it('should render children inside theme provider', () => {
    render(
      <FilterThemeConfig>
        <span>Facet child</span>
      </FilterThemeConfig>,
    );
    expect(screen.getByText('Facet child')).toBeInTheDocument();
  });
});
