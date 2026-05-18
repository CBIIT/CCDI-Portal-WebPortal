/**
 * Phase 2 — `Column.js`: `configColumn` wiring and `CustomCellView` display branches.
 *
 * @see src/pages/inventory/tabs/tableConfig/Column.js
 * @see tests/TEST_STRUCTURE.md
 */

jest.mock('../../../../../src/bento/studiesData', () => ({
  studyDownloadLinks: { phsTEST001: 'https://example.com/manifest.xlsx' },
  openDoubleLink: jest.fn(),
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { cellTypes, headerTypes } from '@bento-core/table';

import {
  CustomCellView,
  configColumn,
} from '../../../../../src/pages/inventory/tabs/tableConfig/Column';
import { openDoubleLink } from '../../../../../src/bento/studiesData';

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

      it('should render all lines when five or fewer', () => {
        const lines = ['A', 'B', 'C'];
        const { container } = render(
          <CustomCellView dataField="notes" cellStyle="EXPAND" notes={lines} />,
        );
        expect(screen.queryByText(/read more/i)).not.toBeInTheDocument();
        expect(container).toHaveTextContent('ABC');
      });
    });

    it('should render TRANSFORM cell via dataFormatter', () => {
      render(
        <CustomCellView
          dataField="html"
          cellStyle="TRANSFORM"
          html="<p>Formatted</p>"
          dataFormatter={(val) => `<strong>${val}</strong>`}
        />,
      );
      expect(screen.getByText('Formatted')).toBeInTheDocument();
    });

    it('should render MODAL cell with inline ids when five or fewer', () => {
      render(
        <CustomCellView
          dataField="sample_id"
          cellStyle="MODAL"
          sample_id="SMP-1, SMP-2"
        />,
      );
      expect(screen.getByText('SMP-1')).toBeInTheDocument();
      expect(screen.getByText('SMP-2')).toBeInTheDocument();
    });

    it('should open modal from View All when more than five ids', () => {
      const ids = Array.from({ length: 8 }, (_, i) => `ID-${i}`);
      render(
        <CustomCellView
          dataField="sample_id"
          cellStyle="MODAL"
          header="Sample IDs"
          sample_id={`[${ids.join(', ')}]`}
        />,
      );
      fireEvent.click(screen.getByText(/view all/i));
      expect(screen.getByText('Sample IDs')).toBeInTheDocument();
      expect(screen.getByText('8')).toBeInTheDocument();
    });

    it('should trigger study manifest download for STUDY_DOWNLOAD cells', () => {
      render(
        <CustomCellView
          dataField="study_id"
          cellStyle="STUDY_DOWNLOAD"
          study_id="phsTEST001"
        />,
      );
      fireEvent.click(screen.getByTitle('Download study manifest'));
      expect(openDoubleLink).toHaveBeenCalledWith(
        'https://example.com/manifest.xlsx',
        'phsTEST001_CCDI_Study_Manifest.xlsx',
      );
    });

    it('should render cohort color chips when dataField is cohort', () => {
      const { container } = render(
        <CustomCellView
          dataField="cohort"
          label={[
            { cohort: 'A', color: '#ff0000' },
            { cohort: 'B', color: '#00ff00' },
          ]}
        />,
      );
      const chips = Array.from(container.querySelectorAll('div')).filter(
        (el) => el.style.width === '17px' && el.style.height === '17px',
      );
      expect(chips.length).toBeGreaterThanOrEqual(2);
    });
  });
});
