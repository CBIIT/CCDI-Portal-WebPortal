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
    expect(data.navTitles).toHaveLength(4);
    expect(data.federationContent).toHaveLength(4);

    const dataAccess = data.federationContent[0];
    expect(dataAccess.topic).toBe('Data Access');
    expect(dataAccess.id).toBe('Data_Access');
    expect(dataAccess.content).toContain('deidentified individual-level data');
    expect(dataAccess.content).toContain('ccdi-federation-api-aggregation');
  });

  it('should build side nav from navTitles in order', () => {
    const data = parseFederationMarkdown(sampleFederationMarkdownRaw);
    const navItems = buildFederationNavItems(data.navTitles, data.federationContent);

    expect(navItems.map((item) => item.label)).toEqual([
      'Data Access',
      'Additional Available Resources',
      'Contribute to CCDI Data Federation Resource',
      'Contact',
    ]);
    expect(navItems[0].id).toBe('Data_Access');
  });

  it('should fall back to document order when navTitles is omitted', () => {
    const data = parseFederationMarkdown(sampleFederationMarkdownNoNavTitles);
    const navItems = buildFederationNavItems(data.navTitles, data.federationContent);

    expect(navItems).toHaveLength(1);
    expect(navItems[0].label).toBe('Topic Alpha');
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
