/**
 * Unit tests for parseMciJson2TsvMarkdown (MCI_JSON2TSV.md → view props).
 */

import parseMciJson2TsvMarkdown, {
  buildMciJson2TsvNavItems,
  topicToSectionId,
} from '../../../../src/pages/resource/MCIJson2TsvResourcePage/parseMciJson2TsvMarkdown';
import {
  sampleMciJson2TsvMarkdownRaw,
  sampleMciJson2TsvMarkdownNoNavTitles,
} from '../../../fixtures/resource/mciJson2TsvMarkdownSamples';

describe('parseMciJson2TsvMarkdown', () => {
  it('should parse front matter, intro, and ## sections with property-table ids', () => {
    const data = parseMciJson2TsvMarkdown(sampleMciJson2TsvMarkdownRaw);

    expect(data.title).toBe('CCDI MCI JSON2TSV');
    expect(data.introText).toContain('aggregates and reformats');
    expect(data.navTitles).toHaveLength(4);
    expect(data.mciJson2TsvContent).toHaveLength(4);

    const finding = data.mciJson2TsvContent[0];
    expect(finding.topic).toBe(
      'Finding and Exporting MCI Clinical JSON files in C3DC Explore Dashboard',
    );
    expect(finding.id).toBe('FINDING_AND_EXPORTING_MCI_CLINICAL_JSON');
    expect(finding.content).toContain('Explore Participants');
    expect(finding.content).not.toContain('| Property | Value |');
    expect(finding.content).toContain('FigureD1.png');
    expect(finding.segments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'markdown' }),
        expect.objectContaining({
          type: 'widget',
          widget: 'responsiveImg',
          data: expect.objectContaining({
            wide: 'https://example.com/json2tsv-wide.png',
            alt: 'JSON2TSV diagram',
          }),
        }),
      ]),
    );
    expect(finding.list).toEqual([]);
  });

  it('should parse ### headings as nested subtopics with segments', () => {
    const data = parseMciJson2TsvMarkdown(sampleMciJson2TsvMarkdownNoNavTitles);
    expect(data.mciJson2TsvContent).toHaveLength(1);
    const topic = data.mciJson2TsvContent[0];
    expect(topic.list).toHaveLength(1);
    expect(topic.list[0].subtopic).toBe('Sub Alpha');
    expect(topic.list[0].id).toBe('SUB_ALPHA');
    expect(topic.list[0].segments).toEqual([
      { type: 'markdown', markdown: 'Sub alpha body.' },
    ]);
  });

  it('should build side nav from navTitles in order using property-table ids', () => {
    const data = parseMciJson2TsvMarkdown(sampleMciJson2TsvMarkdownRaw);
    const navItems = buildMciJson2TsvNavItems(data.navTitles, data.mciJson2TsvContent);

    expect(navItems.map((item) => item.id)).toEqual([
      'FINDING_AND_EXPORTING_MCI_CLINICAL_JSON',
      'RUNNING_JSON2TSV_IN_CGC',
      'CGC_RESOURCES',
      'CONTACT_AND_SOURCE_CODE',
    ]);
    expect(navItems[0].label).toContain('Finding and Exporting');
  });

  it('should fall back to document order when navTitles is omitted', () => {
    const data = parseMciJson2TsvMarkdown(sampleMciJson2TsvMarkdownNoNavTitles);
    const navItems = buildMciJson2TsvNavItems(data.navTitles, data.mciJson2TsvContent);

    expect(navItems).toHaveLength(2);
    expect(navItems[0].id).toBe('TOPIC_ALPHA');
    expect(navItems[0].label).toBe('Topic Alpha');
    expect(navItems[0].isSubtitle).toBe(false);
    expect(navItems[1].id).toBe('SUB_ALPHA');
    expect(navItems[1].isSubtitle).toBe(true);
  });

  it('should handle empty input and strip BOM', () => {
    expect(parseMciJson2TsvMarkdown('')).toEqual({
      title: '',
      headerImage: '',
      introText: '',
      navTitles: undefined,
      mciJson2TsvContent: [],
    });

    const bom = `\uFEFF---\ntitle: BOM JSON2TSV\n---\n\nIntro.\n\n## Topic\n\nBody.\n`;
    const parsed = parseMciJson2TsvMarkdown(bom);
    expect(parsed.title).toBe('BOM JSON2TSV');
    expect(parsed.mciJson2TsvContent[0].content).toBe('Body.');
    expect(parsed.mciJson2TsvContent[0].id).toBe('Topic');
    expect(parsed.mciJson2TsvContent[0].list).toEqual([]);
    expect(parsed.mciJson2TsvContent[0].segments).toEqual([
      { type: 'markdown', markdown: 'Body.' },
    ]);
  });
});

describe('topicToSectionId', () => {
  it('should generate underscore ids from headings', () => {
    expect(topicToSectionId('CGC Resources')).toBe('CGC_Resources');
  });
});
