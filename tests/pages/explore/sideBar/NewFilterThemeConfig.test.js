/**
 * NewFilterThemeConfig — MUI theme provider for NewBentoFacetFilter.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewFilterThemeConfig from '../../../../src/pages/inventory/sideBar/NewFilterThemeConfig';

describe('NewFilterThemeConfig', () => {
  it('should render children inside theme provider', () => {
    render(
      <NewFilterThemeConfig>
        <span>New facet child</span>
      </NewFilterThemeConfig>,
    );
    expect(screen.getByText('New facet child')).toBeInTheDocument();
  });
});
