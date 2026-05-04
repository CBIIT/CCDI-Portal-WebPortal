/**
 * PMTLTable — four-column desktop table.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PMTLTable from '../../../../src/pages/resource/components/PMTLTable';
import { pmtlFourColumnTableFixture } from '../../../fixtures/resource/resourceComponentsFixtures';

describe('PMTLTable', () => {
  describe('Rendering', () => {
    it('should render title, headers, and cells', () => {
      render(<PMTLTable table={pmtlFourColumnTableFixture} />);

      expect(screen.getByText('Test PMTL Table')).toBeInTheDocument();
      expect(screen.getByText('H1')).toBeInTheDocument();
      expect(screen.getByText('r2c4')).toBeInTheDocument();
    });
  });
});
