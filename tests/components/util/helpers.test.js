/**
 * Unit tests for `src/components/util/helpers.js` — link manipulation, byte formatting, date stamp.
 * `dateTimeStamp` uses the current time; the suite fixes `Date` for deterministic output.
 */

import {
  manipulateLinks,
  dateTimeStamp,
  formatBytes,
} from '../../../src/components/util/helpers';

describe('helpers', () => {
  describe('manipulateLinks', () => {
    it('should mark internal links when the link text before the placeholder starts with /', () => {
      const tableData = [
        { dataField: 'other', link: undefined },
        { dataField: 'id', link: '/explore{other}' },
      ];
      const result = manipulateLinks(tableData);
      expect(result[1].internalLink).toBe(true);
      expect(result[1].actualLink).toBe('/explore');
      expect(result[1].actualLinkId).toBe(0);
    });

    it('should mark external links when the link text does not start with /', () => {
      const tableData = [
        { dataField: 'key', link: 'https://example.com/{key}' },
      ];
      const result = manipulateLinks(tableData);
      expect(result[0].externalLink).toBe(true);
      expect(result[0].actualLink).toBe('https://example.com/');
    });

    it('should leave rows without link unchanged aside from iteration', () => {
      const tableData = [{ dataField: 'x', name: 'row' }];
      const result = manipulateLinks(tableData);
      expect(result[0]).toMatchObject({ dataField: 'x', name: 'row' });
      expect(result[0].internalLink).toBeUndefined();
    });
  });

  describe('dateTimeStamp', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return a stamp matching mocked calendar and clock fields', () => {
      jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2026);
      jest.spyOn(Date.prototype, 'getMonth').mockReturnValue(2); // March
      jest.spyOn(Date.prototype, 'getDate').mockReturnValue(9);
      jest.spyOn(Date.prototype, 'getHours').mockReturnValue(8);
      jest.spyOn(Date.prototype, 'getMinutes').mockReturnValue(7);
      jest.spyOn(Date.prototype, 'getSeconds').mockReturnValue(6);

      expect(dateTimeStamp()).toBe('_2026-03-09_08-07-06');
    });
  });

  describe('formatBytes', () => {
    it('should return 0 Bytes for zero', () => {
      expect(formatBytes(0)).toBe('0 Bytes');
    });

    it('should format kilobytes with default decimals', () => {
      expect(formatBytes(1024)).toBe('1 KB');
    });

    it('should respect the decimals argument', () => {
      expect(formatBytes(1536, 1)).toBe('1.5 KB');
    });

    it('should treat negative decimals as zero decimals', () => {
      expect(formatBytes(1536, -1)).toBe('2 KB');
    });

    it('should format large values to the appropriate unit', () => {
      expect(formatBytes(1024 ** 3)).toBe('1 GB');
    });
  });
});
