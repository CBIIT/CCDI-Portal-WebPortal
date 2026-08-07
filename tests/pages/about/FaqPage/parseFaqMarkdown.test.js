/**
 * Unit tests for parseFaqMarkdown (faqData.md → view props).
 */

import parseFaqMarkdown from '../../../../src/pages/about/FaqPage/parseFaqMarkdown';
import { sampleFaqMarkdownRaw } from '../../../fixtures/about/faqMarkdownSamples';

describe('parseFaqMarkdown', () => {
  it('should parse title, headerImage, categories, and faqs from YAML front matter', () => {
    const data = parseFaqMarkdown(sampleFaqMarkdownRaw);

    expect(data.title).toBe('CCDI FAQs');
    expect(data.headerImage).toBe('https://example.com/faq-header.png');
    expect(data.categories).toHaveLength(3);
    expect(data.categories[0]).toEqual({
      id: 'data-exploration',
      name: 'Data Exploration and Data Access',
    });
    expect(data.faqs.length).toBe(14);
    expect(data.faqs[0].question).toContain('controlled data access');
    expect(data.faqs[0].answer).toContain('NIH eRA Commons');
  });

  it('should return null for empty or invalid markdown', () => {
    expect(parseFaqMarkdown('')).toBeNull();
    expect(parseFaqMarkdown(null)).toBeNull();
    expect(parseFaqMarkdown('not yaml')).toBeNull();
  });

  it('should return null when categories are missing', () => {
    expect(parseFaqMarkdown(`---
title: CCDI FAQs
faqs: []
---`)).toBeNull();
  });

  it('should return null when faqs key is not an array', () => {
    expect(parseFaqMarkdown(`---
title: CCDI FAQs
categories:
  - id: support
    name: Support
faqs: not-a-list
---`)).toBeNull();
  });

  it('should drop faqs with unknown categories or empty questions', () => {
    const data = parseFaqMarkdown(`---
title: CCDI FAQs
categories:
  - id: support
    name: Support
faqs:
  - id: ok
    category: support
    question: Valid question?
    answer: Yes.
  - id: bad-cat
    category: missing
    question: Orphan?
    answer: No.
  - id: no-q
    category: support
    question: ""
    answer: Empty question.
---`);

    expect(data.faqs).toHaveLength(1);
    expect(data.faqs[0].id).toBe('ok');
  });

  it('should allow empty faqs array when categories exist', () => {
    const data = parseFaqMarkdown(`---
title: CCDI FAQs
categories:
  - id: support
    name: Support
faqs: []
---`);

    expect(data.categories).toHaveLength(1);
    expect(data.faqs).toEqual([]);
  });
});
