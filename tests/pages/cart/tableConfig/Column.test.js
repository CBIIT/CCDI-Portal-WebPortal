/**
 * MY FILES **`configColumn`** / **`CustomCellView`** — bracket stripping + delete wiring.
 *
 * @see src/pages/cart/tableConfig/Column.js
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { cellTypes, headerTypes } from '@bento-core/table';

import {
  configColumn,
  CustomCellView,
  CustomHeaderCellView,
} from '../../../../src/pages/cart/tableConfig/Column';

describe('cart table Column', () => {
  describe('CustomCellView', () => {
    it('should strip square brackets from participant_id and sample_id values', () => {
      const { rerender } = render(
        <CustomCellView dataField="participant_id" label="[PART-001]" />,
      );
      expect(screen.getByText('PART-001')).toBeInTheDocument();

      rerender(<CustomCellView dataField="sample_id" label="[S1]" />);
      expect(screen.getByText('S1')).toBeInTheDocument();
    });

    it('should render other fields as-is', () => {
      render(<CustomCellView dataField="file_name" label="readme.txt" />);
      expect(screen.getByText('readme.txt')).toBeInTheDocument();
    });

    it('should return empty label unchanged when brackets are stripped from blank values', () => {
      const { container } = render(
        <CustomCellView dataField="participant_id" label="" />,
      );
      expect(container.textContent).toBe('');
    });
  });

  describe('CustomHeaderCellView', () => {
    it('should render nothing', () => {
      const { container } = render(<CustomHeaderCellView />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('configColumn', () => {
    it('should wire custom cells, row delete, and bulk delete header', () => {
      const deleteAllFiles = jest.fn();
      const deleteCartFile = jest.fn();

      const columns = [
        {
          dataField: 'participant_id',
          header: 'PID',
          display: true,
          cellType: cellTypes.CUSTOM_ELEM,
        },
        {
          cellType: cellTypes.DELETE,
          headerType: headerTypes.DELETE,
          display: true,
        },
      ];

      const configured = configColumn({
        columns,
        deleteAllFiles,
        deleteCartFile,
      });

      const customCol = configured.find((c) => c.dataField === 'participant_id');
      const { unmount } = render(
        customCol.customCellRender({
          dataField: 'participant_id',
          label: '[X]',
        }),
      );
      expect(screen.getByText('X')).toBeInTheDocument();
      unmount();

      const deleteCol = configured.find((c) => c.cellType === cellTypes.DELETE);
      deleteCol.cellEventHandler({ id: 'row-1' });
      expect(deleteCartFile).toHaveBeenCalledWith({ id: 'row-1' });

      deleteCol.headerEventHandler();
      expect(deleteAllFiles).toHaveBeenCalled();
    });

    it('should pass through standard columns and wire custom header renderers', () => {
      const deleteAllFiles = jest.fn();
      const deleteCartFile = jest.fn();

      const columns = [
        {
          dataField: 'file_name',
          header: 'File',
          display: true,
        },
        {
          dataField: 'hidden_field',
          display: false,
        },
        {
          dataField: 'notes',
          header: 'Notes',
          display: true,
          headerType: headerTypes.CUSTOM_ELEM,
        },
      ];

      const configured = configColumn({
        columns,
        deleteAllFiles,
        deleteCartFile,
      });

      expect(configured).toHaveLength(2);

      const plainCol = configured.find((c) => c.dataField === 'file_name');
      expect(plainCol.customCellRender).toBeUndefined();
      expect(plainCol.cellEventHandler).toBeUndefined();

      const customHeaderCol = configured.find((c) => c.dataField === 'notes');
      expect(typeof customHeaderCol.customColHeaderRender).toBe('function');
      const { container } = render(customHeaderCol.customColHeaderRender({}));
      expect(container.firstChild).toBeNull();
    });
  });
});
