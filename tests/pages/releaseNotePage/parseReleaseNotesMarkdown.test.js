/**
 * Unit tests for parseReleaseNotesMarkdown (releaseNotesData.md → releaseNotesList).
 */

import { parseReleaseNotesMarkdown } from '../../../src/pages/releaseNotePage/parseReleaseNotesMarkdown';
import { sampleReleaseNotesMarkdownRaw } from '../../fixtures/resource/releaseNotesMarkdownSamples';

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
  });
});
