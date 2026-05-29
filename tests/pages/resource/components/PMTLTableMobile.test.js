/**
 * PMTLTableMobile — column-major body split into sections.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PMTLTableMobile from '../../../../src/pages/resource/components/PMTLTableMobile';
import { pmtlFourColumnTableFixture } from '../../../fixtures/resource/resourceComponentsFixtures';

describe('PMTLTableMobile', () => {
  describe('Rendering', () => {
    it('should render title and column sections with row values', () => {
      render(<PMTLTableMobile table={pmtlFourColumnTableFixture} />);

      expect(screen.getByText('Test PMTL Table')).toBeInTheDocument();
      expect(screen.getByText('H1')).toBeInTheDocument();
      expect(screen.getByText('r1c1')).toBeInTheDocument();
      expect(screen.getByText('r2c1')).toBeInTheDocument();
    });
  });
});
