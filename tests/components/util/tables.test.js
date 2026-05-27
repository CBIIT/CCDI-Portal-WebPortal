/**
 * Table helpers: options builder, footer generator, data-availability tooltip content.
 */

import React, { isValidElement } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  getColumns,
  getOptions,
  getDefaultCustomFooter,
  generateDataAvailabilityTooltipText,
} from '../../../src/components/util/tables';

describe('tables', () => {
  describe('getColumns', () => {
    const classes = {
      link: 'link',
      linkSpan: 'linkSpan',
      tableCell1: 'cell1',
      tableCell2: 'cell2',
    };

    it('should render internal NavLink for internalLink columns', () => {
      const columns = getColumns(
        {
          columns: [{
            dataField: 'case_id',
            header: 'Case',
            internalLink: true,
            actualLink: '/case/',
            actualLinkId: 0,
          }],
        },
        classes,
        {},
        null,
        '/explore',
        jest.fn(),
      );

      const cell = columns[0].options.customBodyRender('CASE-1', { rowData: ['CASE-1'] });
      render(cell);
      expect(screen.getByRole('link', { name: 'CASE-1' })).toHaveAttribute('href', '#/case/CASE-1');
    });

    it('should render external link with icon when configured', () => {
      const columns = getColumns(
        {
          columns: [{
            dataField: 'url',
            header: 'URL',
            externalLink: true,
            actualLink: 'https://example.com/',
            actualLinkId: 0,
          }],
        },
        classes,
        {},
        { src: '/icon.svg', alt: 'external' },
      );

      const cell = columns[0].options.customBodyRender('doc', { rowData: ['doc'] });
      render(cell);
      expect(screen.getByRole('link', { name: /doc/i })).toHaveAttribute('href', 'https://example.com/doc');
      expect(screen.getByAltText('external')).toBeInTheDocument();
    });

    it('should render explore link for num_subjects column', () => {
      const linkClick = jest.fn();
      const columns = getColumns(
        {
          columns: [{
            dataField: 'num_subjects',
            header: 'Subjects',
          }],
        },
        classes,
        {},
        null,
        '/explore',
        linkClick,
      );

      const cell = columns[0].options.customBodyRender('12', { rowData: ['12'], rowIndex: 0 });
      render(cell);
      fireEvent.click(screen.getByRole('link', { name: '12' }));
      expect(linkClick).toHaveBeenCalled();
    });

    it('should read values from root data when dataFromRoot is set', () => {
      const columns = getColumns(
        {
          columns: [{
            dataField: 'study_name',
            header: 'Study',
            dataFromRoot: true,
          }],
        },
        classes,
        { study_name: 'Root Study' },
      );

      const cell = columns[0].options.customBodyRender('placeholder', { rowData: ['placeholder'] });
      render(cell);
      expect(screen.getByText('Root Study')).toBeInTheDocument();
    });

    it('should render document download component when configured', () => {
      const MockDownload = () => <div data-testid="doc-download" />;
      const columns = getColumns(
        {
          columns: [{
            dataField: 'acl',
            header: 'ACL',
            downloadDocument: true,
            documentDownloadProps: {
              fileSizeColumn: 'file_size',
              fileLocationColumn: 'file_location',
              fileFormatColumn: 'file_format',
              caseIdColumn: 'case_id',
              maxFileSize: 100,
            },
          }, {
            dataField: 'file_size',
            header: 'Size',
          }, {
            dataField: 'file_location',
            header: 'Location',
          }, {
            dataField: 'file_format',
            header: 'Format',
          }, {
            dataField: 'case_id',
            header: 'Case',
          }],
        },
        classes,
        {},
        null,
        '',
        jest.fn(),
        MockDownload,
      );

      const cell = columns[0].options.customBodyRender('ACL', {
        rowData: ['ACL', '10', '/path', 'pdf', 'CASE-9'],
      });
      render(cell);
      expect(screen.getByTestId('doc-download')).toBeInTheDocument();
    });

    it('should use replaceEmptyValueWith when value is empty', () => {
      const columns = getColumns(
        { columns: [{ dataField: 'note', header: 'Note' }] },
        classes,
        {},
        null,
        '',
        jest.fn(),
        null,
        '—',
      );

      const cell = columns[0].options.customBodyRender('', { rowData: [''] });
      render(cell);
      expect(screen.getByText('—')).toBeInTheDocument();
    });
  });

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

    it('should wire custom footer, row selection, and isRowSelectable callbacks', () => {
      const customFooter = jest.fn(() => 'footer');
      const onRowSelectionChange = jest.fn();
      const isRowSelectable = jest.fn(() => false);
      const opts = getOptions(
        { title: 'Files' },
        { root: 'tbl' },
        customFooter,
        onRowSelectionChange,
        isRowSelectable,
      );

      expect(opts.customFooter(3, 0, 10, jest.fn(), jest.fn())).toBe('footer');
      expect(customFooter).toHaveBeenCalled();

      expect(opts.isRowSelectable(2)).toBe(false);
      expect(isRowSelectable).toHaveBeenCalledWith(2);

      opts.onRowsSelect('curr', ['all']);
      expect(onRowSelectionChange).toHaveBeenCalledWith('curr', ['all']);
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
