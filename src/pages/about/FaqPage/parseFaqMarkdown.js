import matter from 'gray-matter';

/**
 * Parse faqData.md — YAML front matter only (markdown body ignored).
 * Returns null when categories/faqs are missing or invalid.
 */
export default function parseFaqMarkdown(rawMarkdown) {
  if (rawMarkdown == null || String(rawMarkdown).trim() === '') {
    return null;
  }

  let data;
  try {
    const source = String(rawMarkdown).replace(/^\uFEFF/, '');
    ({ data } = matter(source));
  } catch (_error) {
    return null;
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return null;
  }

  if (!Array.isArray(data.categories) || data.categories.length === 0) {
    return null;
  }

  if (!Array.isArray(data.faqs)) {
    return null;
  }

  const categories = data.categories.map((cat, idx) => ({
    id: cat.id != null ? String(cat.id) : `category-${idx}`,
    name: cat.name != null ? String(cat.name) : '',
  })).filter((cat) => cat.name);

  if (categories.length === 0) {
    return null;
  }

  const categoryIds = new Set(categories.map((c) => c.id));

  const faqs = data.faqs.map((item, idx) => ({
    id: item.id != null ? String(item.id) : `faq-${idx}`,
    category: item.category != null ? String(item.category) : '',
    question: item.question != null ? String(item.question) : '',
    answer: item.answer != null ? String(item.answer) : '',
  })).filter((item) => item.question && categoryIds.has(item.category));

  return {
    title: data.title != null ? String(data.title) : 'CCDI FAQs',
    headerImage: data.headerImage != null ? String(data.headerImage) : '',
    categories,
    faqs,
  };
}
