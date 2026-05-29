/**
 * `src/bento/studiesData.js` — table config, study link maps, and `openDoubleLink`.
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  table,
  GET_STUDIES_DATA_QUERY,
  GET_NUMBER_OF_STUDIES,
  studyDownloadLinks,
  studycBioPortalLinks,
  studyClinicalDataLinks,
  openDoubleLink,
} from '../../src/bento/studiesData';

describe('studiesData', () => {
  describe('table configuration', () => {
    it('should define studies table metadata and columns', () => {
      expect(table.name).toBe('Studies');
      expect(table.dataField).toBe('study_id');
      expect(table.paginationAPIField).toBe('studiesListing');
      expect(table.api).toBe(GET_STUDIES_DATA_QUERY);
      expect(table.columns.length).toBeGreaterThanOrEqual(5);

      const studyIdCol = table.columns.find((c) => c.dataField === 'study_id');
      expect(studyIdCol.linkAttr.rootPath).toBe('/studies');

      const availabilityCol = table.columns.find((c) => c.dataField === 'data_availability');
      expect(typeof availabilityCol.customColHeaderRender).toBe('function');
      const { container } = render(availabilityCol.customColHeaderRender());
      expect(container.firstChild).toBeTruthy();
    });

    it('should expose count query', () => {
      expect(GET_NUMBER_OF_STUDIES).toBeDefined();
    });
  });

  describe('study link maps', () => {
    it('should map known dbGaP accessions to manifest URLs', () => {
      expect(studyDownloadLinks.phs000463).toContain('phs000463');
      expect(studyDownloadLinks.phs003975).toContain('metadata_files');
    });

    it('should map subset of studies to cBioPortal', () => {
      expect(studycBioPortalLinks.phs002790).toContain('phs002790');
    });

    it('should list clinical data URLs for TARGET studies', () => {
      expect(Array.isArray(studyClinicalDataLinks.phs000464)).toBe(true);
      expect(studyClinicalDataLinks.phs000464.length).toBeGreaterThan(1);
    });
  });

  describe('openDoubleLink', () => {
    const originalFetch = global.fetch;
    const originalCreateObjectURL = global.URL.createObjectURL;

    beforeEach(() => {
      global.fetch = jest.fn();
      global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
    });

    afterEach(() => {
      global.fetch = originalFetch;
      global.URL.createObjectURL = originalCreateObjectURL;
      jest.restoreAllMocks();
    });

    it('should download a blob when fetch succeeds', async () => {
      const blob = new Blob(['manifest']);
      global.fetch.mockResolvedValue({
        ok: true,
        blob: () => Promise.resolve(blob),
      });

      const click = jest.fn();
      const remove = jest.fn();
      const anchor = {
        href: '',
        download: '',
        style: { display: '' },
        click,
        remove,
      };
      jest.spyOn(document, 'createElement').mockReturnValue(anchor);
      const appendChild = jest.spyOn(document.body, 'appendChild').mockImplementation(() => {});

      await openDoubleLink('https://example.test/manifest.xlsx', 'phs001_manifest.xlsx');

      expect(global.fetch).toHaveBeenCalledWith('https://example.test/manifest.xlsx');
      expect(global.URL.createObjectURL).toHaveBeenCalledWith(blob);
      expect(anchor.download).toBe('phs001_manifest.xlsx');
      expect(appendChild).toHaveBeenCalledWith(anchor);
      expect(click).toHaveBeenCalled();
      expect(remove).toHaveBeenCalled();
    });

    it('should not trigger download when fetch fails', async () => {
      global.fetch.mockResolvedValue({ ok: false });
      const click = jest.fn();
      jest.spyOn(document, 'createElement').mockReturnValue({
        click,
        remove: jest.fn(),
        style: {},
      });

      await openDoubleLink('https://example.test/manifest.xlsx', 'file.xlsx');

      expect(click).not.toHaveBeenCalled();
    });
  });
});
