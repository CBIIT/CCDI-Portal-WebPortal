/**
 * Phase 2 — `Column.js`: `configColumn` wiring and `CustomCellView` display branches.
 *
 * @see src/pages/inventory/tabs/tableConfig/Column.js
 * @see tests/TEST_STRUCTURE.md
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { cellTypes, headerTypes } from '@bento-core/table';

import {
  CustomCellView,
  configColumn,
} from '../../../../../src/pages/inventory/tabs/tableConfig/Column';

describe('Explore — tableConfig Column', () => {
  describe('configColumn', () => {
    it('should attach customCellRender for CUSTOM_ELEM columns', () => {
      const out = configColumn([
        { id: 'c1', cellType: cellTypes.CUSTOM_ELEM, dataField: 'x' },
        { id: 'c2', dataField: 'y' },
      ]);

      expect(typeof out[0].customCellRender).toBe('function');
      expect(out[1].customCellRender).toBeUndefined();
    });

    it('should attach customColHeaderRender for CUSTOM_ELEM headers', () => {
      const out = configColumn([
        { id: 'h1', headerType: headerTypes.CUSTOM_ELEM, dataField: 'x' },
      ]);

      expect(typeof out[0].customColHeaderRender).toBe('function');
    });
  });

  describe('CustomCellView', () => {
    describe('Rendering', () => {
      it('should render the field value for the default cell style', () => {
        render(<CustomCellView dataField="study" study="phs001" />);
        expect(screen.getByText('phs001')).toBeInTheDocument();
      });

      it('should render a dbGaP link for DBGAP cells', () => {
        render(<CustomCellView dataField="dbgap_accession" cellStyle="DBGAP" dbgap_accession="phs002431" />);
        const link = screen.getByRole('link', { name: /phs002431/i });
        expect(link).toHaveAttribute('href', expect.stringContaining('phs002431'));
      });
    });

    describe('EXPAND cell style', () => {
      it('should toggle Read more / Read less when more than five lines', () => {
        const lines = Array.from({ length: 7 }, (_, i) => `Line ${i + 1}`);
        render(
          <CustomCellView
            dataField="notes"
            cellStyle="EXPAND"
            notes={lines}
          />,
        );

        expect(screen.getByText(/read more/i)).toBeInTheDocument();
        fireEvent.click(screen.getByText(/read more/i));
        expect(screen.getByText(/read less/i)).toBeInTheDocument();
      });
    });
  });
});
