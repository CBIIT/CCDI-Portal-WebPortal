/**
 * Unit tests for parseDataUsagePoliciesMarkdown (dataUsagePolicies.md → view props).
 */

import parseDataUsagePoliciesMarkdown, {
  resolveSectionBlockquoteVariant,
  topicToSectionId,
} from '../../../../src/pages/about/DataUsagePoliciesPage/parseDataUsagePoliciesMarkdown';
import { sampleDataUsagePoliciesMarkdownRaw } from '../../../fixtures/about/dataUsagePoliciesMarkdownSamples';

describe('parseDataUsagePoliciesMarkdown', () => {
  it('should parse front matter, intro, intro callout, and ## sections', () => {
    const data = parseDataUsagePoliciesMarkdown(sampleDataUsagePoliciesMarkdownRaw);

    expect(data.title).toBe('CCDI Data Usage Policies & Terms');
    expect(data.Data_Usage_Policies_Header).toBe('https://example.com/data-usage-policies-header.png');
    expect(data.introText).toContain('policies and terms');
    expect(data.introCallout).toMatch(/^>\s/);
    expect(data.dataUsagePoliciesContent).toHaveLength(3);

    const expectations = data.dataUsagePoliciesContent.find((s) => s.topic === 'Data Use Expectations');
    expect(expectations.id).toBe('Data_Use_Expectations');
    expect(expectations.blockquoteVariant).toBe('default');
    expect(expectations.markdown).toContain('CCDI Hub allows');

    const citing = data.dataUsagePoliciesContent.find((s) => s.topic === 'Citing the CCDI Hub');
    expect(citing.blockquoteVariant).toBe('citation');
    expect(citing.markdown).toContain('results published here');

    const contact = data.dataUsagePoliciesContent.find((s) => s.topic === 'Contact');
    expect(contact.blockquoteVariant).toBe('callout');
    expect(contact.markdown).toContain('official data sharing policy guidance');
  });

  it('should return empty sections when body has no ## headings', () => {
    const data = parseDataUsagePoliciesMarkdown(`---
title: Policies
---
Only intro text here.
`);
    expect(data.introText).toBe('Only intro text here.');
    expect(data.introCallout).toBe('');
    expect(data.dataUsagePoliciesContent).toEqual([]);
  });
});

describe('parseDataUsagePoliciesMarkdown helpers', () => {
  it('should map topics to legacy-style section ids', () => {
    expect(topicToSectionId('Data Use Expectations')).toBe('Data_Use_Expectations');
    expect(topicToSectionId('Citing the CCDI Hub')).toBe('Citing_the_CCDI_Hub');
  });

  it('should resolve blockquote variants for Contact and Citing sections', () => {
    expect(resolveSectionBlockquoteVariant('Contact')).toBe('callout');
    expect(resolveSectionBlockquoteVariant('Citing the CCDI Hub')).toBe('citation');
    expect(resolveSectionBlockquoteVariant('Data Disclaimers')).toBe('default');
  });
});
