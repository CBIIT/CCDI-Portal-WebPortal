/**
 * Unit tests for parseReleaseNotesMarkdown (releaseNotesData.md → releaseNotesList).
 */

jest.mock('axios');

jest.mock('../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_STATIC_CONTENT_URL: 'https://static.example.com',
    REACT_APP_DATA_RELEASES_URL: 'https://data-releases.example.com',
  },
}));

import axios from 'axios';
import {
  parseReleaseNotesMarkdown,
  mergeReleaseNotesLists,
  fetchReleaseNotesData,
  extractNewsBlurbMarkdown,
} from '../../../src/pages/releaseNotePage/parseReleaseNotesMarkdown';
import {
  sampleReleaseNotesMarkdownRaw,
  sampleCcdiDataUpdatesMarkdownRaw,
} from '../../fixtures/resource/releaseNotesMarkdownSamples';

describe('parseReleaseNotesMarkdown', () => {
  describe('Body structure', () => {
    it('should parse release note blocks with metadata and HTML body', () => {
      const data = parseReleaseNotesMarkdown(sampleReleaseNotesMarkdownRaw);

      expect(data.releaseNotesList).toHaveLength(2);

      const latest = data.releaseNotesList[0];
      expect(latest.id).toBe('hub_release_03262026');
      expect(latest.title).toBe('CCDI Hub Release 2.10.0');
      expect(latest.date).toBe('March 26, 2026');
      expect(latest.version).toBe('v2.10.0');
      expect(latest.slug).toBe('Metastatic Osteosarcoma Spatial Profiling data now available');
      expect(latest.contentType).toBe('Clinical,Genomics/Omics,Imaging');
      expect(latest.latestUpdate).toBe(true);
      expect(latest.latestUpdateOrder).toBe(3);
      expect(latest.type).toBe('Release Notes');
      expect(latest.img).toBe('updateImgReleaseNotes');
      expect(latest.fullText).toContain('CCDI Hub 2026 Q1 release');
      expect(latest.fullText).toContain('CCDI Hub Data Updates');
      expect(latest.fullText).not.toContain('<img');

      const minor = data.releaseNotesList[1];
      expect(minor.id).toBe('hub_release_02122025');
      expect(minor.version).toBe('v2.5.1');
      expect(minor.slug).toBe('Improved layout and bug fixes');
      expect(minor.latestUpdate).toBeUndefined();
    });
  });

  describe('Edge cases', () => {
    it('should return empty list for empty input and strip BOM', () => {
      expect(parseReleaseNotesMarkdown('')).toEqual({ releaseNotesList: [] });
      const bom = `\uFEFF# Title\n### Jan 1, 2026 | Release Notes\nBody text.\n\n| Property | Value |\n| id | test_id |\n| version | v1.0.0 |`;
      const parsed = parseReleaseNotesMarkdown(bom);
      expect(parsed.releaseNotesList[0].title).toBe('Title');
    });

    it('should skip preamble lines before the first release entry', () => {
      const md = `Source URL: https://example.com\nTitle: Page title\n\n# Release A\n### Jan 1, 2026 | Release Notes\nSummary.\n| Property | Value |\n| id | a |\n| version | v1.0.0 |`;
      const data = parseReleaseNotesMarkdown(md);
      expect(data.releaseNotesList).toHaveLength(1);
      expect(data.releaseNotesList[0].title).toBe('Release A');
    });

    it('should skip invalid release blocks', () => {
      const md = `# Good\n### Jan 1, 2026 | Release Notes\nSummary.\n| Property | Value |\n| id | good |\n| version | v1.0.0 |\n\nNot a block`;
      const data = parseReleaseNotesMarkdown(md);
      expect(data.releaseNotesList).toHaveLength(1);
    });

    it('should parse type from meta line suffix', () => {
      const data = parseReleaseNotesMarkdown(sampleCcdiDataUpdatesMarkdownRaw);
      expect(data.releaseNotesList).toHaveLength(2);
      expect(data.releaseNotesList[0].type).toBe('CCDI Data Updates');
      expect(data.releaseNotesList[0].id).toBe('federation_03262026');
    });

    it('should parse ecosystem news-table blurbs into highlight HTML with markdown links', () => {
      const data = parseReleaseNotesMarkdown(sampleCcdiDataUpdatesMarkdownRaw);
      const card = data.releaseNotesList.find((item) => item.id === 'federation_03262026');
      expect(card.highlight).toContain('<p>');
      expect(card.highlight).toContain(
        '<a href="https://ccdi.cancer.gov/data-federation-resource">Federation resource</a>',
      );
      expect(card.highlight).not.toContain('| ---');
      expect(card.highlight).toBe(card.fullText);
      expect(card.highlight).not.toContain('<img');
      expect(card.img).toBe('updateImgCCDC');
      expect(card.imgSrc).toBe(
        'https://raw.githubusercontent.com/CBIIT/CCDI_Hub_Assets/main/Image/News/News_CCDC.png',
      );
    });

    it('should parse freeform CCDI Data Updates markdown bodies into highlight HTML', () => {
      const data = parseReleaseNotesMarkdown(sampleCcdiDataUpdatesMarkdownRaw);
      const card = data.releaseNotesList.find((item) => item.id === 'ccdi_data_03262026');
      expect(card.highlight).toContain('Added Data Sets');
      expect(card.highlight).toContain('Metastatic Osteosarcoma Spatial Profiling');
      expect(card.highlight).not.toContain('<img');
      expect(card.imgSrc).toBe('https://example.com/data-updates.png');
    });

    it('should extract blurb markdown from news-style body tables', () => {
      const body = '| | |\n| --- | --- |\n| Hello [world](https://example.com) and A \\| B | |\n';
      expect(extractNewsBlurbMarkdown(body)).toBe('Hello [world](https://example.com) and A | B');
      expect(extractNewsBlurbMarkdown('### Heading\n\n- item')).toBeNull();
    });

    it('should default type to Release Notes when meta suffix is omitted', () => {
      const md = `# Title\n### Jan 1, 2026\nBody.\n| Property | Value |\n| id | x |\n| version | v1.0.0 |`;
      const data = parseReleaseNotesMarkdown(md);
      expect(data.releaseNotesList[0].type).toBe('Release Notes');
    });
  });

  describe('mergeReleaseNotesLists', () => {
    it('should merge and sort by date descending', () => {
      const hub = parseReleaseNotesMarkdown(sampleReleaseNotesMarkdownRaw).releaseNotesList;
      const dataUpdates = parseReleaseNotesMarkdown(sampleCcdiDataUpdatesMarkdownRaw).releaseNotesList;
      const merged = mergeReleaseNotesLists(hub, dataUpdates);
      expect(merged).toHaveLength(4);
      expect(merged[0].date).toBe('March 26, 2026');
      expect(merged.map((item) => item.id)).toEqual(
        expect.arrayContaining([
          'hub_release_03262026',
          'federation_03262026',
          'ccdi_data_03262026',
          'hub_release_02122025',
        ]),
      );
    });
  });

  describe('fetchReleaseNotesData', () => {
    beforeEach(() => {
      axios.get.mockImplementation((url) => {
        const pathPart = String(url).split('?')[0];
        if (pathPart.endsWith('/releaseNotesData.md')) {
          return Promise.resolve({ data: sampleReleaseNotesMarkdownRaw });
        }
        if (pathPart.endsWith('/ccdiDataUpdates.md')) {
          return Promise.resolve({ data: sampleCcdiDataUpdatesMarkdownRaw });
        }
        return Promise.reject(new Error(`Unexpected URL: ${url}`));
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return separate hub and ecosystem lists', async () => {
      const result = await fetchReleaseNotesData();

      expect(result.releaseNotesList).toHaveLength(2);
      expect(result.ccdiDataUpdatesList).toHaveLength(2);
      expect(result.releaseNotesList[0].id).toBe('hub_release_03262026');
      expect(result.ccdiDataUpdatesList.map((item) => item.id)).toEqual(
        expect.arrayContaining(['federation_03262026', 'ccdi_data_03262026']),
      );
    });
  });
});
