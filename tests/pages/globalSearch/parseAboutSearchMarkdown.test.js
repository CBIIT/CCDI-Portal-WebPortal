/**
 * Unit tests for aboutSearchContent.md YAML front-matter parser.
 */

import parseAboutSearchMarkdown from '../../../src/pages/globalSearch/parseAboutSearchMarkdown';
import {
  sampleAboutSearchMarkdownRaw,
  sampleAboutSearchPages,
} from '../../fixtures/about/aboutSearchMarkdownSamples';

describe('parseAboutSearchMarkdown', () => {
  it('parses pages rows from YAML front matter', () => {
    expect(parseAboutSearchMarkdown(sampleAboutSearchMarkdownRaw)).toEqual(sampleAboutSearchPages);
  });

  it('returns null for empty or invalid input', () => {
    expect(parseAboutSearchMarkdown('')).toBeNull();
    expect(parseAboutSearchMarkdown(null)).toBeNull();
    expect(parseAboutSearchMarkdown('---\ntitle: only\n---\n')).toBeNull();
    expect(parseAboutSearchMarkdown('not yaml')).toBeNull();
  });

  it('drops empty content paragraphs and empty rows', () => {
    const raw = `---
pages:
  - page: "/about"
    title: "About"
    content:
      - paragraph: "Keep me"
      - paragraph: "  "
      - paragraph:
  - page: ""
    title: ""
    content: []
---
`;
    expect(parseAboutSearchMarkdown(raw)).toEqual([
      {
        page: '/about',
        title: 'About',
        content: [{ paragraph: 'Keep me' }],
      },
    ]);
  });
});
