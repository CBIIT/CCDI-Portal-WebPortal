/**
 * Table helpers: options builder, footer generator, data-availability tooltip content.
 */

import React, { isValidElement } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  getOptions,
  getDefaultCustomFooter,
  generateDataAvailabilityTooltipText,
} from '../../../src/components/util/tables';

describe('tables', () => {
  describe('getOptions', () => {
    it('should apply defaults when table flags are omitted', () => {
      const opts = getOptions({}, { root: 'r' }, null, null, null);

      expect(opts.selectableRows).toBe(false);
      expect(opts.pagination).toBe(true);
      expect(opts.rowsPerPageOptions).toEqual([10, 25, 50, 100]);
      expect(opts.downloadOptions.filename).toBe('Bento_files_download.csv');
    });

    it('should respect explicit table flags when provided', () => {
      const opts = getOptions(
        {
          selectableRows: true,
          search: true,
          downloadFileName: 'custom.csv',
        },
        {},
        null,
        null,
        null,
      );

      expect(opts.selectableRows).toBe(true);
      expect(opts.search).toBe(true);
      expect(opts.downloadOptions.filename).toBe('custom.csv');
    });
  });

  describe('getDefaultCustomFooter', () => {
    it('should return empty string when count is below 1', () => {
      expect(getDefaultCustomFooter(0, 0, 10, jest.fn(), jest.fn(), {})).toBe('');
    });

    it('should return a React element when count is at least 1', () => {
      const footer = getDefaultCustomFooter(5, 0, 10, jest.fn(), jest.fn(), { root: 'foot' });
      expect(isValidElement(footer)).toBe(true);
    });
  });

  describe('generateDataAvailabilityTooltipText', () => {
    it('should render a heading and icon labels', () => {
      render(generateDataAvailabilityTooltipText());

      expect(screen.getByText('Data Availability:')).toBeInTheDocument();
      expect(screen.getByText('Case Files')).toBeInTheDocument();
      expect(screen.getByAltText('Case Files icon')).toBeInTheDocument();
    });
  });
});
