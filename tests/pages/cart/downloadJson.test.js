/**
 * Cart export pipeline — `downloadJson.js`: CSV shaping, filenames, and download trigger (Phase 4).
 *
 * @see src/pages/cart/customComponent/exportButton/util/downloadJson.js
 * @see tests/TEST_STRUCTURE.md controller / utility patterns
 */

import {
  createFileName,
  convertToCSV,
  downloadJson,
} from '../../../src/pages/cart/customComponent/exportButton/util/downloadJson';

describe('downloadJson utilities', () => {
  describe('createFileName', () => {
    it('should include base name, date, time, and .csv suffix', () => {
      expect(createFileName('manifest')).toMatch(
        /^manifest \d{4}-\d{2}-\d{2} \d{2}-\d{2}-\d{2}\.csv$/,
      );
    });
  });

  describe('convertToCSV', () => {
    const manifestData = {
      keysToInclude: ['guid', 'label'],
      header: ['drs_id', 'name'],
    };
    const comment = 'Exported from unit test';

    it('should prefix guid column with drs URI', () => {
      const rows = [{ guid: 'abc123', label: 'myfile' }];
      const csv = convertToCSV(rows, comment, manifestData.keysToInclude, manifestData.header);
      expect(csv).toContain('drs://nci-crdc.datacommons.io/abc123');
      expect(csv).toContain('myfile');
      expect(csv).toContain(comment);
      expect(csv).toMatch(/^drs_id,name\r\n/);
    });

    it('should stringify a JSON array string input', () => {
      const jsonStr = JSON.stringify([{ guid: 'x', label: 'y' }]);
      const csv = convertToCSV(jsonStr, comment, manifestData.keysToInclude, manifestData.header);
      expect(csv).toContain('drs://nci-crdc.datacommons.io/x');
    });
  });

  describe('downloadJson', () => {
    it('should create an anchor, trigger download, and tear down', () => {
      const prevCreateObjectURL = window.URL.createObjectURL;
      window.URL.createObjectURL = jest.fn(() => 'blob:mock-url');

      const appendSpy = jest.spyOn(document.body, 'appendChild').mockImplementation(() => {});
      const removeSpy = jest.spyOn(document.body, 'removeChild').mockImplementation(() => {});

      const clickSpy = jest.fn();
      const mockLink = document.createElement('a');
      mockLink.click = clickSpy;
      jest.spyOn(document, 'createElement').mockReturnValue(mockLink);

      const manifestData = {
        keysToInclude: ['guid'],
        header: ['drs_id'],
      };
      const tableData = {
        filesManifestInList: [{ guid: 'g1' }],
      };

      downloadJson(tableData, 'comment line', 'cart-manifest', manifestData);

      expect(window.URL.createObjectURL).toHaveBeenCalled();
      expect(clickSpy).toHaveBeenCalled();
      expect(appendSpy).toHaveBeenCalledWith(mockLink);
      expect(removeSpy).toHaveBeenCalledWith(mockLink);

      window.URL.createObjectURL = prevCreateObjectURL;
      document.createElement.mockRestore();
      appendSpy.mockRestore();
      removeSpy.mockRestore();
    });
  });
});
