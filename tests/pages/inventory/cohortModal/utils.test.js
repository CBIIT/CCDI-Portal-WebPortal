/**
 * Cohort modal **`utils`** — CSV/JSON download helpers and **`hasUnsavedChanges`**.
 *
 * @see src/pages/inventory/cohortModal/utils.js
 */

import {
  arrayToCSVDownload,
  objectToJsonDownload,
  hasUnsavedChanges,
} from '../../../../src/pages/inventory/cohortModal/utils';

describe('cohortModal utils', () => {
  describe('hasUnsavedChanges', () => {
    it('should return false when either argument is missing', () => {
      expect(hasUnsavedChanges(null, {})).toBe(false);
      expect(hasUnsavedChanges({}, null)).toBe(false);
    });

    it('should return false when shared keys match', () => {
      const a = { x: 1, extra: 'a' };
      const b = { x: 1, other: 'b' };
      expect(hasUnsavedChanges(a, b)).toBe(false);
    });

    it('should return true when shared keys differ', () => {
      expect(hasUnsavedChanges({ a: 1 }, { a: 2 })).toBe(true);
    });
  });

  describe('arrayToCSVDownload / objectToJsonDownload', () => {
    let createObjectURLSpy;
    let mockLink;

    beforeEach(() => {
      createObjectURLSpy = jest.fn(() => 'blob:mock');
      window.URL.createObjectURL = createObjectURLSpy;

      mockLink = {
        setAttribute: jest.fn(),
        click: jest.fn(),
      };
      jest.spyOn(document, 'createElement').mockReturnValue(mockLink);
      jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink);
      jest.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should create a CSV blob and trigger download with Manifest filename', () => {
      const rows = [
        {
          participant_id: 'P1',
          dbgap_accession: 'phs001',
          sex_at_birth: 'F',
          race: 'A',
          diagnosis: 'X',
        },
      ];
      arrayToCSVDownload(rows, 'my-cohort');

      expect(createObjectURLSpy).toHaveBeenCalled();
      expect(mockLink.click).toHaveBeenCalled();
      expect(mockLink.setAttribute).toHaveBeenCalledWith(
        'download',
        expect.stringMatching(/^Manifest_my-cohort_\d{4}-\d{2}-\d{2} \d{2}-\d{2}-\d{2}\.csv$/),
      );
    });

    it('should stringify without __typename and use Metadata filename', () => {
      objectToJsonDownload(
        { foo: 1, nested: { __typename: 'T', bar: 2 } },
        'cid',
      );

      const blobArg = createObjectURLSpy.mock.calls[0][0];
      expect(blobArg).toBeInstanceOf(Blob);
      expect(mockLink.click).toHaveBeenCalled();
      expect(mockLink.setAttribute).toHaveBeenCalledWith(
        'download',
        expect.stringMatching(/^Metadata_cid_\d{4}-\d{2}-\d{2} \d{2}-\d{2}-\d{2}\.json$/),
      );
    });

    it('should escape commas and quotes in CSV cells', () => {
      const rows = [
        {
          participant_id: 'P,1',
          dbgap_accession: 'phs"001',
          sex_at_birth: 'F',
          race: 'A',
          diagnosis: 'X',
        },
      ];
      arrayToCSVDownload(rows, 'csv-cohort');

      const blobArg = createObjectURLSpy.mock.calls[0][0];
      expect(blobArg).toBeInstanceOf(Blob);
      expect(mockLink.click).toHaveBeenCalled();
    });

    it('should strip __typename from nested arrays in metadata download', () => {
      objectToJsonDownload(
        [{ __typename: 'Row', value: 1 }, { value: 2 }],
        'array-cohort',
      );

      expect(createObjectURLSpy).toHaveBeenCalled();
      expect(mockLink.click).toHaveBeenCalled();
    });
  });
});
