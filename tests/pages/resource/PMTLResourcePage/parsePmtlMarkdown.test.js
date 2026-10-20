/**
 * Unit tests for parsePmtlMarkdown (pmtlData.md → view props).
 */

import parsePmtlMarkdown from '../../../../src/pages/resource/PMTLResourcePage/parsePmtlMarkdown';
import {
  samplePmtlMarkdownRaw,
  samplePmtlMarkdownWithSubtopics,
} from '../../../fixtures/resource/pmtlMarkdownSamples';

describe('parsePmtlMarkdown', () => {
  it('should parse front matter, intro, and trailing section ids from pmtlData.md', () => {
    const data = parsePmtlMarkdown(samplePmtlMarkdownRaw);

    expect(data.title).toBe('Pediatric Molecular Target Lists');
    expect(data.navTitles).toEqual(['FDA PMTL Lists', 'Contact']);
    expect(data.introText).toMatch(/early planning/);
    expect(data.pmtlContent).toHaveLength(2);

    expect(data.pmtlContent[0]).toMatchObject({
      id: 'FDA_PMTL_Lists',
      topic: 'FDA PMTL Lists',
    });
    expect(data.pmtlContent[0].list).toEqual([
      expect.objectContaining({
        id: 'FDA_PMTL_Lists_Introduction',
        subtopic: '',
      }),
    ]);
    expect(data.pmtlContent[0].list[0].content).toMatch(/Relevant Molecular Targets/);
    expect(data.pmtlContent[0].list[0].content).not.toMatch(/Property/);

    expect(data.pmtlContent[1]).toMatchObject({
      id: 'Contact',
      topic: 'Contact',
    });
    expect(data.pmtlContent[1].list[0].id).toBe('Contact_Information_PMTL');
    expect(data.pmtlContent[1].list[0].content).toMatch(/OCEPeRC@fda.hhs.gov/);
  });

  it('should parse ### subtopics with trailing property-table ids', () => {
    const data = parsePmtlMarkdown(samplePmtlMarkdownWithSubtopics);

    expect(data.introText).toBe('Unit test intro for PMTL resource page.');
    expect(data.pmtlContent[0]).toMatchObject({
      id: 'section_overview',
      topic: 'Overview Section',
    });
    expect(data.pmtlContent[0].list).toEqual([
      {
        id: 'sub_first',
        subtopic: 'First Subsection',
        content: 'PMTL subsection body for testing.',
      },
    ]);
  });

  it('should return an empty page model for blank markdown', () => {
    expect(parsePmtlMarkdown('')).toEqual({
      title: '',
      introText: '',
      navTitles: undefined,
      pmtlContent: [],
    });
  });
});
