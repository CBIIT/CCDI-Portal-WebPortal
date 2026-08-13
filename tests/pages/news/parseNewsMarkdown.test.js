/**
 * Unit tests for parseNewsMarkdown (newsData.md → newsList / newsImgUrlList).
 */

jest.mock('../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_STATIC_CONTENT_URL: 'https://static.example.com',
  },
}));

import { parseNewsMarkdown } from '../../../src/pages/news/parseNewsMarkdown';
import { sampleNewsMarkdownRaw } from '../../fixtures/news/newsMarkdownSamples';
import { altList as fallbackAltList } from '../../../src/bento/newsData';

describe('parseNewsMarkdown', () => {
  it('should parse news blocks into newsList with highlight HTML and metadata', () => {
    const data = parseNewsMarkdown(sampleNewsMarkdownRaw);

    expect(data.newsList).toHaveLength(4);

    const first = data.newsList[0];
    expect(first.id).toBe('hub_04152026');
    expect(first.title).toBe('April 2026 CCDI Hub updates');
    expect(first.date).toBe('April 15, 2026');
    expect(first.type).toBe('News');
    expect(first.slug).toBe('Updated tools, publications, and MCI enrollment');
    expect(first.latestUpdate).toBe(true);
    expect(first.latestUpdateOrder).toBe(1);
    expect(first.highlight).toContain('<p>');
    expect(first.highlight).toContain('href="https://ccdi.cancer.gov/tools"');
    expect(first.highlight).not.toContain('<img');
    // No <img> in MD → type-based default key
    expect(first.img).toBe('updateImgMiscNews');
  });

  it('should build newsImgUrlList from <img> alt/src and keep remote imgSrc on the item', () => {
    const data = parseNewsMarkdown(sampleNewsMarkdownRaw);
    const withImg = data.newsList.find((item) => item.id === 'federation_03262026');

    expect(withImg).toBeDefined();
    expect(withImg.img).toBe('updateImgFederation');
    expect(withImg.imgSrc).toBe('https://example.com/federation.png');
    expect(withImg.type).toBe('CCDI Application Updates');
    expect(data.newsImgUrlList.updateImgFederation).toBe('https://example.com/federation.png');
  });

  it('should preserve pre-authored HTML in highlight (not escape tags)', () => {
    const data = parseNewsMarkdown(sampleNewsMarkdownRaw);
    const htmlCard = data.newsList.find((item) => item.id === 'c3dc_08312026');

    expect(htmlCard).toBeDefined();
    expect(htmlCard.highlight).toContain('<p>');
    expect(htmlCard.highlight).toContain('<a href="https://clinicalcommons.ccdi.cancer.gov/explore">');
    expect(htmlCard.highlight).toContain('CCDI Explore in C3DC');
    expect(htmlCard.highlight).not.toContain('&lt;p&gt;');
    expect(htmlCard.highlight).not.toContain('&lt;a ');
    expect(htmlCard.img).toBe('updateImgC3DC');
    expect(htmlCard.imgSrc).toBe('https://example.com/c3dc.png');
  });

  it('should default Application Updates img key when no <img> is present', () => {
    const data = parseNewsMarkdown(sampleNewsMarkdownRaw);
    const ccdc = data.newsList.find((item) => item.id === 'ccdc_03312025');
    expect(ccdc.img).toBe('updateImgNewApplicationRelease');
    expect(ccdc.imgSrc).toBeUndefined();
  });

  it('should expose fallback altList from bento/newsData', () => {
    const data = parseNewsMarkdown(sampleNewsMarkdownRaw);
    expect(data.altList.updateImgMiscNews).toBe(fallbackAltList.updateImgMiscNews);
  });

  it('should return empty lists for empty input', () => {
    expect(parseNewsMarkdown('')).toEqual({
      newsList: [],
      newsImgUrlList: {},
      altList: expect.objectContaining({ updateImgMiscNews: expect.any(String) }),
    });
  });

  it('should skip Release Notes blocks if present in news MD', () => {
    const md = `${sampleNewsMarkdownRaw}

---

# Should not appear in newsList
### January 1, 2026 | Release Notes

Summary.

| Property | Value |
| --- | --- |
| id | release_skip |
| version | v1.0.0 |
`;
    const data = parseNewsMarkdown(md);
    expect(data.newsList.find((item) => item.id === 'release_skip')).toBeUndefined();
  });
});
