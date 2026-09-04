/**
 * Unit tests for parseRareCancerMarkdown (rareCancerData.md → view props).
 */

import parseRareCancerMarkdown, {
  buildRareCancerNavItems,
  stripIntroFlowChart,
} from '../../../../src/pages/resource/RareCancerResourcePage/parseRareCancerMarkdown';
import {
  sampleRareCancerMarkdownRaw,
  sampleRareCancerMarkdownNoNavTitles,
  sampleRareCancerMarkdownFlowChartOnlyInBody,
} from '../../../fixtures/resource/rareCancerMarkdownSamples';

describe('parseRareCancerMarkdown', () => {
  it('should parse front matter, intro, topics, subtopics, and property-table ids', () => {
    const data = parseRareCancerMarkdown(sampleRareCancerMarkdownRaw);

    expect(data.title).toBe('Pediatric, Adolescent, and Young Adult Rare Cancer Study');
    expect(data.RCI_Header).toBe('https://example.com/rare-cancer-header.png');
    expect(data.RCI_DOWNLOAD_CONFIG).toEqual({
      url: 'https://example.com/rare-cancer-study_contact.pdf',
      filename: 'rare-cancer-study_contact.pdf',
    });
    expect(data.rareCancerIntroText).toContain('longitudinal study');
    expect(data.rareCancerIntroText).toContain('cancer.gov');
    expect(data.rareCancerIntroText).toContain('![RCI data flow chart](https://example.com/rci-flow-chart.png)');
    expect(data).not.toHaveProperty('RCI_Data_Flow_Chart_URL');
    expect(data.navTitles).toHaveLength(4);
    expect(data.rareCancerContent).toHaveLength(1);

    const topic = data.rareCancerContent[0];
    expect(topic.id).toBe('Rare_Cancer_Study_Introduction');
    expect(topic.topic).toBe('Accessing Pediatric and AYA Rare Cancer Study Data');
    expect(topic.list).toHaveLength(3);

    expect(topic.list[0].id).toBe('HOW_TO_ACCESS_STUDY_DATA');
    expect(topic.list[0].subtopic).toBe('How to Access Study Data');
    expect(topic.list[0].content).toContain('#### How can Pediatric and AYA Rare Cancer Study data');
    expect(topic.list[0].content).toContain('CCDI Data Ecosystem');
    expect(topic.list[0].content).not.toContain('| id |');

    expect(topic.list[1].id).toBe('GERMLINE_FINDINGS');
    expect(topic.list[1].subtopic).toBe('Germline Findings');

    expect(topic.list[2].id).toBe('CONTACT_INFORMATION');
    expect(topic.list[2].subtopic).toBe('Contact Information');
    expect(topic.list[2].content).toContain('mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov');
  });

  it('should build side nav from navTitles in order using property-table ids', () => {
    const data = parseRareCancerMarkdown(sampleRareCancerMarkdownRaw);
    const navItems = buildRareCancerNavItems(data.navTitles, data.rareCancerContent);

    expect(navItems).toHaveLength(4);
    expect(navItems.map((item) => item.label)).toEqual([
      'Accessing Pediatric and AYA Rare Cancer Study Data',
      'How to Access Study Data',
      'Germline Findings',
      'Contact Information',
    ]);
    expect(navItems.map((item) => item.id)).toEqual([
      'Rare_Cancer_Study_Introduction',
      'HOW_TO_ACCESS_STUDY_DATA',
      'GERMLINE_FINDINGS',
      'CONTACT_INFORMATION',
    ]);
    expect(navItems[0].isSubtitle).toBe(false);
    expect(navItems[1].isSubtitle).toBe(true);
  });

  it('should fall back to document order when navTitles is omitted', () => {
    const data = parseRareCancerMarkdown(sampleRareCancerMarkdownNoNavTitles);
    const navItems = buildRareCancerNavItems(data.navTitles, data.rareCancerContent);

    expect(navItems).toHaveLength(2);
    expect(navItems[0].label).toBe('Topic Alpha');
    expect(navItems[1].label).toBe('Sub One');
    expect(navItems[0].isSubtitle).toBe(false);
    expect(navItems[1].isSubtitle).toBe(true);
  });

  it('should keep flow-chart image inline in intro markdown', () => {
    const data = parseRareCancerMarkdown(sampleRareCancerMarkdownFlowChartOnlyInBody);
    expect(data.rareCancerIntroText).toContain('![RCI data flow chart](https://example.com/from-body-chart.png)');
    expect(data.rareCancerIntroText).toContain('Lead paragraph.');
    expect(data).not.toHaveProperty('RCI_Data_Flow_Chart_URL');
  });

  it('should handle empty input and strip BOM', () => {
    expect(parseRareCancerMarkdown('')).toEqual({
      title: '',
      RCI_Header: '',
      RCI_DOWNLOAD_CONFIG: undefined,
      rareCancerIntroText: '',
      navTitles: undefined,
      rareCancerContent: [],
    });

    const bom = `\uFEFF---\ntitle: BOM Rare Cancer\nRCI_Header: https://example.com/bom.png\n---\n\nIntro.\n\n## Topic\n\n### Sub\n\nBody.\n`;
    const parsed = parseRareCancerMarkdown(bom);
    expect(parsed.title).toBe('BOM Rare Cancer');
    expect(parsed.rareCancerContent[0].list[0].content).toBe('Body.');
  });
});

describe('stripIntroFlowChart', () => {
  it('should remove a flow-chart image and keep surrounding prose', () => {
    const { intro, extractedUrl } = stripIntroFlowChart(
      'Before.\n\n![RCI data flow chart](https://example.com/chart.png)\n\nAfter.',
      '',
    );
    expect(intro).toBe('Before.\n\nAfter.');
    expect(extractedUrl).toBe('https://example.com/chart.png');
  });
});
