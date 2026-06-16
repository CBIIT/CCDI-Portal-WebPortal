/**
 * Phase 3 — `src/utils/fileTable.js`: cart-aware row selection helpers.
 */

import { FileDisableRowSelection, FileOnRowsSelect } from '../../src/utils/fileTable';

describe('fileTable', () => {
  describe('FileDisableRowSelection', () => {
    const row = { file_id: 'f-1' };

    it('should return true when cart is empty', () => {
      expect(FileDisableRowSelection(row, [])).toBe(true);
      expect(FileDisableRowSelection(row, undefined)).toBe(true);
    });

    it('should return false when file_id is already in cart', () => {
      expect(FileDisableRowSelection(row, ['f-1', 'f-2'])).toBe(false);
    });

    it('should return true when cart exists but file is not in cart', () => {
      expect(FileDisableRowSelection(row, ['f-99'])).toBe(true);
    });
  });

  describe('FileOnRowsSelect', () => {
    const data = [
      { file_id: 'a' },
      { file_id: 'b' },
      { file_id: 'c' },
    ];

    it('should map selection indices to file_id values', () => {
      const selected = [{ dataIndex: 0 }, { dataIndex: 2 }];
      expect(FileOnRowsSelect(data, selected)).toEqual(['a', 'c']);
    });
  });
});
