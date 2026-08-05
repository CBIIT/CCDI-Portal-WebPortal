/**
 * Unit tests for parseNavMarkdown.
 */

jest.mock('../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_C3DC: 'https://c3dc.test.example',
  },
}));

import parseNavMarkdown from '../../src/bento/parseNavMarkdown';
import {
  sampleNavMarkdownRaw,
  sampleNavMarkdownEmpty,
  sampleNavMarkdownNoPrimary,
} from '../fixtures/nav/navMarkdownSamples';

describe('parseNavMarkdown', () => {
  it('should parse primary/resources/about and resolve {{C3DC}}', () => {
    const parsed = parseNavMarkdown(sampleNavMarkdownRaw);
    expect(parsed).not.toBeNull();
    expect(parsed.navMobileList[1].link).toBe('https://c3dc.test.example/exploreParticipants');
    expect(parsed.navMobileList[2].link).toBe('https://c3dc.test.example/studies');
    expect(parsed.navbarSublists.Resources[0].link).toBe('https://c3dc.test.example/');
    expect(parsed.navbarSublists.Resources[0].className).toBe('navMobileSubItem');
    expect(parsed.navbarSublists.About[0].className).toBe('navMobileSubSection');
    expect(parsed.navbarSublists.About[0].children[0].link).toBe('/about');
    expect(parsed.navbarSublists.About[1].children[1].link).toBe(
      'https://c3dc.test.example/data_model',
    );
  });

  it('should return null when primary is missing', () => {
    expect(parseNavMarkdown(sampleNavMarkdownNoPrimary)).toBeNull();
  });

  it('should return null for empty front matter', () => {
    expect(parseNavMarkdown(sampleNavMarkdownEmpty)).toBeNull();
  });
});
