/**
 * Unit tests for parseToolsMarkdown (toolsData.md → view props).
 */

import parseToolsMarkdown, {
  buildToolsNavItems,
  parseToolCardBody,
} from '../../../../src/pages/resource/ToolsResourcePage/parseToolsMarkdown';
import {
  sampleToolsMarkdownRaw,
  sampleToolsMarkdownNoNavTitles,
} from '../../../fixtures/resource/toolsMarkdownSamples';

describe('parseToolsMarkdown', () => {
  it('should parse front matter, intro, topics, and tool cards', () => {
    const data = parseToolsMarkdown(sampleToolsMarkdownRaw);

    expect(data.title).toBe('CCDI Hub Tools');
    expect(data.Tools_Header).toBe('https://example.com/tools-header.png');
    expect(data.toolsIntroText).toContain('explore, analyze, and access');
    expect(data.navTitles).toHaveLength(4);
    expect(data.toolsContent).toHaveLength(2);

    const exploration = data.toolsContent[0];
    expect(exploration.topic).toBe('Data Exploration');
    expect(exploration.list).toHaveLength(1);
    expect(exploration.list[0].subtopic).toBe('CCDI Hub Explore Dashboard');
    expect(exploration.list[0].content).toContain('participant-centric search tool');
    expect(exploration.list[0].content).toContain('**Link:**');
    expect(exploration.list[0].content).toContain('**Contact:**');

    const analysis = data.toolsContent[1];
    expect(analysis.list[0].content).toContain('**Link 1:**');
    expect(analysis.list[0].content).toContain('**Link 2:**');
  });

  it('should build side nav from navTitles in order', () => {
    const data = parseToolsMarkdown(sampleToolsMarkdownRaw);
    const navItems = buildToolsNavItems(data.navTitles, data.toolsContent);

    expect(navItems).toHaveLength(4);
    expect(navItems.map((item) => item.label)).toEqual([
      'Data Exploration',
      'CCDI Hub Explore Dashboard',
      'Analysis Tools',
      'Cohort Analyzer',
    ]);
    expect(navItems[0].isSubtitle).toBe(false);
    expect(navItems[1].isSubtitle).toBe(true);
  });

  it('should fall back to document order when navTitles is omitted', () => {
    const data = parseToolsMarkdown(sampleToolsMarkdownNoNavTitles);
    const navItems = buildToolsNavItems(data.navTitles, data.toolsContent);

    expect(navItems).toHaveLength(2);
    expect(navItems[0].label).toBe('Topic Alpha');
    expect(navItems[1].label).toBe('Tool One');
  });

  it('should handle empty input and strip BOM', () => {
    expect(parseToolsMarkdown('')).toEqual({
      title: '',
      Tools_Header: '',
      toolsIntroText: '',
      navTitles: undefined,
      toolsContent: [],
    });

    const bom = `\uFEFF---\ntitle: BOM Tools\nTools_Header: https://example.com/bom.png\n---\n\nIntro.\n\n## Topic\n\n### Tool\n\nBody.\n`;
    const parsed = parseToolsMarkdown(bom);
    expect(parsed.title).toBe('BOM Tools');
    expect(parsed.toolsContent[0].list[0].content).toBe('Body.');
  });
});

describe('parseToolCardBody', () => {
  it('should split description from Link and Contact lines', () => {
    const body = `First paragraph.

Second paragraph.

Link: [Example](https://example.com)

Contact: [Support](mailto:test@example.com)`;

    const content = parseToolCardBody(body);
    expect(content).toContain('First paragraph.');
    expect(content).toContain('Second paragraph.');
    expect(content).toContain('**Link:** [Example](https://example.com)');
    expect(content).toContain('**Contact:** [Support](mailto:test@example.com)');
  });
});
