/**
 * Unit tests for parseCpiMarkdown (cpiData.md → view props).
 */

import parseCpiMarkdown, {
  topicToSectionId,
} from '../../../../src/pages/resource/CPIResourcePage/parseCpiMarkdown';
import {
  sampleCpiMarkdownRaw,
  sampleCpiMarkdownMinimal,
} from '../../../fixtures/resource/cpiMarkdownSamples';

describe('parseCpiMarkdown', () => {
  it('should parse front matter, intro, and news-style section blocks', () => {
    const data = parseCpiMarkdown(sampleCpiMarkdownRaw);

    expect(data.CPI_Header_URL).toBe('https://example.com/cpi-header.png');
    expect(data.CPI_Img_URL).toBe('https://example.com/cpi-diagram.png');
    expect(data.CPI_Unique_Participants_Icon_URL).toBe('https://example.com/cpi-unique.svg');
    expect(data.cpiIntroText).toContain('Participant Index (CPI) maps research participant');
    expect(data.cpiContent).toHaveLength(5);

    const components = data.cpiContent[0];
    expect(components.topic).toBe('Components');
    expect(components.id).toBe('CPI_Components');
    expect(components.content).toContain('Identifiers and Domains');
    expect(components.content).toContain('participantindex-docs.ccdi.cancer.gov');
    expect(components.content).not.toContain('| Property |');

    expect(data.cpiContent.map((item) => item.id)).toEqual([
      'CPI_Components',
      'Core_Functions_of_the_CPI',
      'CPI_Request_Access',
      'Contribute_to_the_CPI',
      'CPI_Contact',
    ]);
  });

  it('should parse minimal markdown without --- separators between intro and first heading', () => {
    const data = parseCpiMarkdown(sampleCpiMarkdownMinimal);
    expect(data.cpiIntroText).toBe('Intro paragraph for CPI.');
    expect(data.cpiContent).toHaveLength(1);
    expect(data.cpiContent[0].id).toBe('overview_section');
    expect(data.cpiContent[0].topic).toBe('Overview Topic');
  });

  it('should handle empty input and strip BOM', () => {
    expect(parseCpiMarkdown('')).toEqual({
      cpiIntroText: '',
      cpiContent: [],
      CPI_Header_URL: '',
      CPI_Img_URL: '',
      CPI_Cross_Dataset_Linkages_Icon_URL: '',
      CPI_Domain_Coverage_Icon_URL: '',
      CPI_Total_Mapped_Participants_Ids_Icon_URL: '',
      CPI_Unique_Participants_Icon_URL: '',
    });

    const bom = `\uFEFF---\nCPI_Header_URL: https://example.com/bom.png\n---\n\nIntro.\n\n# Topic\n\nBody.\n\n| Property | Value |\n| --- | --- |\n| id | Topic_Id |\n`;
    const parsed = parseCpiMarkdown(bom);
    expect(parsed.CPI_Header_URL).toBe('https://example.com/bom.png');
    expect(parsed.cpiIntroText).toBe('Intro.');
    expect(parsed.cpiContent[0].id).toBe('Topic_Id');
    expect(parsed.cpiContent[0].content).toBe('Body.');
  });

  it('should derive id from topic when property table is omitted', () => {
    const raw = `---\nCPI_Header_URL: https://example.com/h.png\n---\n\n# Request Access\n\nBody only.\n`;
    const data = parseCpiMarkdown(raw);
    expect(data.cpiContent[0].id).toBe('Request_Access');
  });
});

describe('topicToSectionId', () => {
  it('should generate underscore ids from headings', () => {
    expect(topicToSectionId('Core Functions of the CPI')).toBe('Core_Functions_of_the_CPI');
    expect(topicToSectionId('Components')).toBe('Components');
  });
});
