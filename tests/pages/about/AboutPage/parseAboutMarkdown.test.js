/**
 * Unit tests for parseAboutMarkdown (aboutData.md → view props).
 */

import parseAboutMarkdown from '../../../../src/pages/about/AboutPage/parseAboutMarkdown';
import {
  sampleAboutMarkdownRaw,
  sampleAboutMarkdownNoH2,
} from '../../../fixtures/about/aboutMarkdownSamples';

describe('parseAboutMarkdown', () => {
  it('should parse front matter, upper copy, and lower section', () => {
    const data = parseAboutMarkdown(sampleAboutMarkdownRaw);

    expect(data.title).toBe('Childhood Cancer Data Initiative Hub');
    expect(data.About_Img).toBe('https://example.com/about-img.png');
    expect(data.aboutData.upperTitle).toBe('Childhood Cancer Data Initiative Hub');
    expect(data.aboutData.upperText).toContain('entry point for researchers');
    expect(data.aboutData.upperText).toContain('direct links to resources');
    expect(data.aboutData.lowerTitle).toBe('Childhood Cancer Data Initiative');
    expect(data.aboutData.lowerText).toContain("NCI's Childhood Cancer Data Initiative (CCDI)");
    expect(data.aboutData.aboutText).toContain('The NCI is committed');
    expect(data.aboutData.aboutText).toContain('Our team is dedicated to:');
    expect(data.aboutData.aboutText).toContain('mailto:ncichildhoodcancerdatainitiative@mail.nih.gov');
    expect(data.aboutData.aboutText).toContain('We look forward to hearing from you');
  });

  it('should split upperText into paragraphs before first h2', () => {
    const data = parseAboutMarkdown(sampleAboutMarkdownRaw);
    const paragraphs = data.aboutData.upperText.split(/\n\n+/);
    expect(paragraphs).toHaveLength(3);
  });

  it('should return empty lower section when no h2 heading exists', () => {
    const data = parseAboutMarkdown(sampleAboutMarkdownNoH2);
    expect(data.aboutData.upperTitle).toBe('About Only');
    expect(data.aboutData.upperText).toContain('Intro paragraph one');
    expect(data.aboutData.lowerTitle).toBe('');
    expect(data.aboutData.lowerText).toBe('');
    expect(data.aboutData.aboutText).toBe('');
  });

  it('should handle empty input and strip BOM', () => {
    expect(parseAboutMarkdown('')).toEqual({
      title: '',
      About_Img: '',
      aboutData: {
        upperTitle: '',
        upperText: '',
        lowerTitle: '',
        lowerText: '',
        aboutText: '',
      },
    });

    const bom = `\uFEFF---\ntitle: BOM Title\nAbout_Img: https://example.com/bom.png\n---\n\nBody text.\n`;
    const parsed = parseAboutMarkdown(bom);
    expect(parsed.title).toBe('BOM Title');
    expect(parsed.aboutData.upperText).toBe('Body text.');
  });
});
