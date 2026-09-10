/**
 * Unit tests for parseFederationMarkdown (federationData.md → view props).
 */

import parseFederationMarkdown, {
  buildFederationNavItems,
  topicToSectionId,
} from '../../../../src/pages/resource/FederationResourcePage/parseFederationMarkdown';
import {
  sampleFederationMarkdownRaw,
  sampleFederationMarkdownNoNavTitles,
} from '../../../fixtures/resource/federationMarkdownSamples';

describe('parseFederationMarkdown', () => {
  it('should parse front matter, intro paragraphs, and topic sections', () => {
    const data = parseFederationMarkdown(sampleFederationMarkdownRaw);

    expect(data.title).toBe('CCDI Data Federation Resource');
    expect(data.Federation_Header).toBe('https://example.com/federation-header.png');
    expect(data.CCDI_Federation_Data_Access).toBe('https://example.com/federation-diagram.png');
    expect(data.federationIntroText).toContain('pull data from across various resources');
    expect(data.federationIntroText).toContain('piloting data federation');
    expect(data.federationIntroText).toContain('will expand as more organizations');
    expect(data.navTitles).toHaveLength(6);
    expect(data.federationContent).toHaveLength(4);

    const dataAccess = data.federationContent[0];
    expect(dataAccess.topic).toBe('Data Access');
    expect(dataAccess.id).toBe('Data_Access');
    expect(dataAccess.content).toContain('deidentified individual-level data');
    expect(dataAccess.content).toContain('ccdi-federation-api-aggregation');
    expect(dataAccess.list).toEqual([]);
  });

  it('should parse ### headings as nested subtopics under a topic', () => {
    const data = parseFederationMarkdown(sampleFederationMarkdownRaw);
    const resources = data.federationContent[1];

    expect(resources.topic).toBe('Additional Available Resources');
    expect(resources.content).toContain('OpenAPI Specification');
    expect(resources.list).toHaveLength(2);
    expect(resources.list[0].subtopic).toBe(
      'Agent Skill to support streamlined discovery and analysis',
    );
    expect(resources.list[0].id).toBe(
      'Agent_Skill_to_support_streamlined_discovery_and_analysis',
    );
    expect(resources.list[0].content).toContain('Agent Skill');
    expect(resources.list[0].segments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'markdown' }),
        expect.objectContaining({
          type: 'widget',
          widget: 'responsiveImg',
          data: expect.objectContaining({
            wide: 'https://example.com/federation-agent-skill.png',
            alt: 'test',
            Caption: '',
          }),
        }),
      ]),
    );
    expect(resources.list[1].subtopic).toBe('Blog');
    expect(resources.list[1].id).toBe('Blog');
    expect(resources.list[1].content).toContain('blog');
  });

  it('should parse topic bodies into markdown/widget segments', () => {
    const data = parseFederationMarkdown(sampleFederationMarkdownRaw);
    const dataAccess = data.federationContent[0];
    expect(dataAccess.segments).toHaveLength(1);
    expect(dataAccess.segments[0].type).toBe('markdown');
    expect(dataAccess.segments[0].markdown).toContain('deidentified individual-level data');
  });

  it('should build side nav from navTitles including subtitle entries', () => {
    const data = parseFederationMarkdown(sampleFederationMarkdownRaw);
    const navItems = buildFederationNavItems(data.navTitles, data.federationContent);

    expect(navItems.map((item) => item.label)).toEqual([
      'Data Access',
      'Additional Available Resources',
      'Agent Skill to support streamlined discovery and analysis',
      'Blog',
      'Contribute to CCDI Data Federation Resource',
      'Contact',
    ]);
    expect(navItems[0].id).toBe('Data_Access');
    expect(navItems[0].isSubtitle).toBe(false);
    expect(navItems[2].isSubtitle).toBe(true);
    expect(navItems[3].isSubtitle).toBe(true);
  });

  it('should fall back to document order when navTitles is omitted', () => {
    const data = parseFederationMarkdown(sampleFederationMarkdownNoNavTitles);
    const navItems = buildFederationNavItems(data.navTitles, data.federationContent);

    expect(navItems).toHaveLength(2);
    expect(navItems[0].label).toBe('Topic Alpha');
    expect(navItems[0].isSubtitle).toBe(false);
    expect(navItems[1].label).toBe('Sub Alpha');
    expect(navItems[1].isSubtitle).toBe(true);
  });

  it('should split intro into paragraphs before first h2', () => {
    const data = parseFederationMarkdown(sampleFederationMarkdownNoNavTitles);
    const paragraphs = data.federationIntroText.split(/\n\n+/);
    expect(paragraphs).toHaveLength(3);
  });

  it('should handle empty input and strip BOM', () => {
    expect(parseFederationMarkdown('')).toEqual({
      title: '',
      Federation_Header: '',
      CCDI_Federation_Data_Access: '',
      federationIntroText: '',
      navTitles: undefined,
      federationContent: [],
    });

    const bom = `\uFEFF---\ntitle: BOM Federation\nFederation_Header: https://example.com/bom.png\n---\n\nIntro.\n\n## Topic\n\nBody.\n`;
    const parsed = parseFederationMarkdown(bom);
    expect(parsed.title).toBe('BOM Federation');
    expect(parsed.federationContent[0].content).toBe('Body.');
    expect(parsed.federationContent[0].list).toEqual([]);
  });
});

describe('topicToSectionId', () => {
  it('should generate legacy underscore ids from headings', () => {
    expect(topicToSectionId('Data Access')).toBe('Data_Access');
    expect(topicToSectionId('Contribute to CCDI Data Federation Resource')).toBe(
      'Contribute_to_CCDI_Data_Federation_Resource',
    );
  });
});
