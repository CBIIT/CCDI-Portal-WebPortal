/**
 * Phase 3 — `src/utils/columnsUtil.js`: column visibility helpers.
 */

import updateColumns, { hasMultiStudyParticipants } from '../../src/utils/columnsUtil';

describe('columnsUtil', () => {
  describe('updateColumns', () => {
    it('should set options.viewColumns false when columnList marks header as non-view', () => {
      const columns = [
        { label: 'Participant ID', options: { viewColumns: true } },
        { label: 'Study ID', options: { viewColumns: true } },
      ];
      const columnList = [
        { header: 'participant id', viewColumns: false },
      ];

      const result = updateColumns(columns, columnList);

      expect(result[0].options.viewColumns).toBe(false);
      expect(result[1].options.viewColumns).toBe(true);
    });

    it('should match headers case-insensitively', () => {
      const columns = [{ label: 'Race', options: { viewColumns: true } }];
      const columnList = [{ header: 'RACE', viewColumns: false }];

      const result = updateColumns(columns, columnList);
      expect(result[0].options.viewColumns).toBe(false);
    });
  });

  describe('hasMultiStudyParticipants', () => {
    it('should return false when tableMeta is empty', () => {
      expect(hasMultiStudyParticipants([])).toBe(false);
    });

    it('should return true when tableMeta has at least one row', () => {
      expect(hasMultiStudyParticipants([{ id: 1 }])).toBe(true);
    });
  });
});
