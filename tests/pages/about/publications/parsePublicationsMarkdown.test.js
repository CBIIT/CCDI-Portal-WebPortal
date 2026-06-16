/**
 * Unit tests for parsePublicationsMarkdown (publicationsData.md → view props).
 */

import { parsePublicationsMarkdown } from '../../../../src/pages/about/publications/parsePublicationsMarkdown';
import {
  samplePublicationsMarkdownRaw,
  samplePublicationAbstractMarkdown,
} from '../../../fixtures/about/publicationsMarkdownSamples';

describe('parsePublicationsMarkdown', () => {
  describe('Body structure', () => {
    it('should parse header image, banner, and publication blocks', () => {
      const data = parsePublicationsMarkdown(samplePublicationsMarkdownRaw);

      expect(data.Publications_Header).toBe('https://example.com/publications-header.png');
      expect(data.bannerText).toBe('Banner for publications page');
      expect(data.publicationsList).toHaveLength(2);

      const primary = data.publicationsList.find((p) => p.id === 'pub-1');
      expect(primary.title).toBe('Example Publication Title');
      expect(primary.summary).toContain('short summary');
      expect(primary.category).toBe('Primary');
      expect(primary.journal).toBe('Nature Medicine');
      expect(primary.pmid).toBe('12345678');
      expect(primary.tag).toBe('CCDI, Hub');

      const abstract = data.publicationsList.find((p) => p.id === 'pub-meta');
      expect(abstract.conference).toBe('Test Conference');
      expect(abstract.category).toBe('Abstracts');
    });

    it('should parse abstract category meta from two-part meta lines', () => {
      const data = parsePublicationsMarkdown(samplePublicationAbstractMarkdown);
      const item = data.publicationsList[0];
      expect(item.category).toBe('Abstracts');
      expect(item.conference).toBe('Annual Meeting');
    });

    it('should return empty list when body has no publications', () => {
      const data = parsePublicationsMarkdown('![img](https://x.com/h.png)\nOnly banner\n');
      expect(data.publicationsList).toEqual([]);
      expect(data.bannerText).toBe('Only banner');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty input and strip BOM', () => {
      expect(parsePublicationsMarkdown('')).toEqual({
        Publications_Header: '',
        bannerText: '',
        publicationsList: [],
      });
      const bom = `\uFEFFBanner line\n\n# Title\n### 2024 | Journal\nSummary text.\ntags: test\n| id | pub-bom |\n| link | https://example.test |\n| summary | Primary |`;
      const parsed = parsePublicationsMarkdown(bom);
      expect(parsed.bannerText).toBe('Banner line');
      expect(parsed.publicationsList[0].title).toBe('Title');
    });

    it('should skip invalid publication blocks', () => {
      const md = `Banner\n\n# Good\n### 2024 | Journal\nSummary.\ntags: test\n| id | a |\n| link | # |\n| summary | Primary |`;
      const data = parsePublicationsMarkdown(md);
      expect(data.publicationsList).toHaveLength(1);
    });
  });
});
