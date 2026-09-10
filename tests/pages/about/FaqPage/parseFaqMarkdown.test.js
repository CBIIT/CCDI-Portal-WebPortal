/**
 * Unit tests for parseFaqMarkdown (faqData.md → view props).
 */

import parseFaqMarkdown from '../../../../src/pages/about/FaqPage/parseFaqMarkdown';
import { sampleFaqMarkdownRaw } from '../../../fixtures/about/faqMarkdownSamples';

describe('parseFaqMarkdown', () => {
  it('should parse title, headerImage, categories, and news-style FAQ blocks', () => {
    const data = parseFaqMarkdown(sampleFaqMarkdownRaw);

    expect(data.title).toBe('CCDI FAQs');
    expect(data.headerImage).toBe('https://example.com/faq-header.png');
    expect(data.categories).toHaveLength(3);
    expect(data.categories[0]).toEqual({
      id: 'data-exploration',
      name: 'Data Exploration and Data Access',
    });
    expect(data.faqs.length).toBe(14);
    expect(data.faqs[0].id).toBe('controlled-access');
    expect(data.faqs[0].category).toBe('data-exploration');
    expect(data.faqs[0].question).toContain('controlled data access');
    expect(data.faqs[0].answer).toContain('NIH eRA Commons');
    expect(data.faqs[0].answer).not.toContain('| Property |');
  });

  it('should return null for empty or invalid markdown', () => {
    expect(parseFaqMarkdown('')).toBeNull();
    expect(parseFaqMarkdown(null)).toBeNull();
    expect(parseFaqMarkdown('not yaml')).toBeNull();
  });

  it('should return null when categories are missing', () => {
    expect(parseFaqMarkdown(`---
title: CCDI FAQs
---`)).toBeNull();
  });

  it('should return null when categories is not a list', () => {
    expect(parseFaqMarkdown(`---
title: CCDI FAQs
categories: not-a-list
---`)).toBeNull();
  });

  it('should drop faqs with unknown categories or empty questions', () => {
    const data = parseFaqMarkdown(`---
title: CCDI FAQs
categories:
  - id: support
    name: Support
---

# Valid question?

Yes.

| Property | Value |
| --- | --- |
| id | ok |
| category | support |

---

# Orphan?

No.

| Property | Value |
| --- | --- |
| id | bad-cat |
| category | missing |

---

#${' '}

Empty question.

| Property | Value |
| --- | --- |
| id | no-q |
| category | support |
`);

    expect(data.faqs).toHaveLength(1);
    expect(data.faqs[0].id).toBe('ok');
  });

  it('should allow empty faqs when categories exist and body has no # blocks', () => {
    const data = parseFaqMarkdown(`---
title: CCDI FAQs
categories:
  - id: support
    name: Support
---
`);

    expect(data.categories).toHaveLength(1);
    expect(data.faqs).toEqual([]);
  });
});
