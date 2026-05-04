/**
 * Phase 3 — `src/utils/sampleFileTable.js`: sample-tab row selection vs cart file IDs.
 */

import { SampleDisableRowSelection, SampleOnRowsSelect } from '../../src/utils/sampleFileTable';

describe('sampleFileTable', () => {
  describe('SampleDisableRowSelection', () => {
    const rowWithFiles = {
      files: [
        { file_id: 'f1' },
        { file_id: 'f2' },
      ],
    };

    it('should return true when cart is empty', () => {
      expect(SampleDisableRowSelection(rowWithFiles, [])).toBe(true);
    });

    it('should return false when all files are already in cart', () => {
      expect(SampleDisableRowSelection(rowWithFiles, ['f1', 'f2'])).toBe(false);
    });

    it('should return true when cart has entries but some row files are missing from cart', () => {
      expect(SampleDisableRowSelection(rowWithFiles, ['f1'])).toBe(true);
    });

    it('should return false when cart has entries but row has no files', () => {
      expect(SampleDisableRowSelection({ files: [] }, ['x'])).toBe(false);
    });

    it('should return false when cart has entries but row.files is missing', () => {
      expect(SampleDisableRowSelection({}, ['x'])).toBe(false);
    });
  });

  describe('SampleOnRowsSelect', () => {
    const data = [
      { files: [{ file_id: 'a' }, { file_id: 'b' }] },
      { files: [{ file_id: 'c' }] },
    ];

    it('should flatten file_id values from selected row indices', () => {
      const selected = [{ dataIndex: 0 }, { dataIndex: 1 }];
      expect(SampleOnRowsSelect(data, selected)).toEqual(['a', 'b', 'c']);
    });

    it('should skip rows with no files', () => {
      const mixed = [{ files: [] }, { files: [{ file_id: 'z' }] }];
      expect(SampleOnRowsSelect(mixed, [{ dataIndex: 0 }, { dataIndex: 1 }])).toEqual(['z']);
    });
  });
});
