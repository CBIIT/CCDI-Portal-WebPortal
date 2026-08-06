/**
 * Unit tests for Fuse.js About global search (FE corpus, no OpenSearch).
 */

import {
  buildAboutSearchDocuments,
  buildAboutSnippets,
  resetAboutFuseCache,
  searchAboutAutocomplete,
  searchAboutPages,
} from '../../../src/pages/globalSearch/aboutFuseSearch';

describe('aboutFuseSearch', () => {
  beforeEach(() => {
    resetAboutFuseCache();
  });

  describe('buildAboutSearchDocuments', () => {
    it('flattens content.paragraph into paragraphs', () => {
      const docs = buildAboutSearchDocuments([
        {
          page: '/about',
          title: 'About',
          content: [
            { paragraph: 'Childhood Cancer Data Initiative' },
            { paragraph: '' },
            { paragraph: 'Hub resources' },
          ],
        },
      ]);
      expect(docs).toHaveLength(1);
      expect(docs[0].paragraphs).toEqual([
        'Childhood Cancer Data Initiative',
        'Hub resources',
      ]);
    });
  });

  describe('buildAboutSnippets', () => {
    it('returns short match fragments for the query (not full paragraphs)', () => {
      const long = `${'word '.repeat(40)}cancer research findings ${'more '.repeat(40)}`;
      const snippets = buildAboutSnippets({
        paragraphs: [
          'Unrelated text',
          long,
          'Another short cancer mention here',
        ],
      }, 'cancer');
      expect(snippets).toHaveLength(2);
      expect(snippets[0].toLowerCase()).toContain('cancer');
      expect(snippets[0].length).toBeLessThan(150);
      expect(snippets[0]).toMatch(/\.\.\./);
      expect(snippets[1]).toBe('Another short cancer mention here');
    });

    it('falls back to a truncated first paragraph when only title matched', () => {
      const first = `First paragraph ${'padding '.repeat(50)}`;
      const snippets = buildAboutSnippets({
        paragraphs: [first, 'Second'],
      }, 'zzzz-no-match');
      expect(snippets).toHaveLength(1);
      expect(snippets[0].length).toBeLessThan(150);
      expect(snippets[0]).toMatch(/^First paragraph/);
      expect(snippets[0]).toMatch(/\.\.\.$/);
    });

    it('limits snippets to OpenSearch-like highlight count so cards stay compact', () => {
      const paragraphs = Array.from({ length: 10 }, (_, i) => `cancer paragraph number ${i}`);
      const snippets = buildAboutSnippets({ paragraphs }, 'cancer');
      expect(snippets).toHaveLength(5);
    });
  });

  describe('searchAboutPages', () => {
    it('finds About hits for cancer', () => {
      const result = searchAboutPages('cancer', { first: 50, offset: 0 });
      expect(result.about_count).toBeGreaterThan(0);
      expect(result.about_page.some((row) => row.page === '/about')).toBe(true);
      expect(result.about_page[0]).toEqual(expect.objectContaining({
        title: expect.any(String),
        page: expect.any(String),
        text: expect.any(Array),
      }));
      expect(result.about_page[0].text.length).toBeGreaterThan(0);
    });

    it('finds CPI page for participant index queries', () => {
      const result = searchAboutPages('participant index', { first: 20, offset: 0 });
      expect(result.about_page.some((row) => row.page === '/ccdi-participant-index')).toBe(true);
    });

    it('finds data usage policies', () => {
      const result = searchAboutPages('policies', { first: 20, offset: 0 });
      expect(result.about_page.some((row) => row.page === '/data-usage-policies')).toBe(true);
    });

    it('paginates results with first and offset', () => {
      const all = searchAboutPages('cancer', { first: 100, offset: 0 });
      if (all.about_count < 2) {
        return;
      }
      const page = searchAboutPages('cancer', { first: 1, offset: 1 });
      expect(page.about_count).toBe(all.about_count);
      expect(page.about_page).toHaveLength(1);
      expect(page.about_page[0].page).toBe(all.about_page[1].page);
    });

    it('returns empty page for nonsense queries', () => {
      const result = searchAboutPages('xyzzy-no-such-about-content-qqq', {
        first: 10,
        offset: 0,
      });
      expect(result.about_count).toBe(0);
      expect(result.about_page).toEqual([]);
    });
  });

  describe('searchAboutAutocomplete', () => {
    it('returns title/page pairs', () => {
      const rows = searchAboutAutocomplete('cancer', 3);
      expect(rows.length).toBeGreaterThan(0);
      expect(rows.length).toBeLessThanOrEqual(3);
      expect(rows[0]).toEqual(expect.objectContaining({
        title: expect.any(String),
        page: expect.any(String),
      }));
    });
  });
});
