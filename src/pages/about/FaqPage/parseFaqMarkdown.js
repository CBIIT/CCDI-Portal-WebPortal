import matter from 'gray-matter';

/**
 * Parse faqData.md — YAML front matter for title / headerImage / categories,
 * news-style `#` question blocks with a trailing property table for id / category.
 * Returns null when categories are missing or invalid.
 */

function parseMarkdownTable(tableLines) {
  const meta = {};
  tableLines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|') || /^\|\s*---/.test(trimmed) || /^\|\s*Property\s*\|/i.test(trimmed)) {
      return;
    }
    const cells = trimmed
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((c) => c.trim());
    if (cells.length >= 2 && cells[0]) {
      meta[String(cells[0]).toLowerCase()] = cells[1];
    }
  });
  return meta;
}

function splitTrailingPropertyTable(body) {
  const lines = String(body || '').split('\n');
  let tableStart = -1;
  for (let i = 0; i < lines.length; i += 1) {
    if (/^\|\s*Property\s*\|\s*Value\s*\|/i.test(lines[i].trim())) {
      tableStart = i;
      break;
    }
  }
  if (tableStart < 0) {
    return { content: String(body || '').trim(), meta: {} };
  }
  const content = lines.slice(0, tableStart).join('\n').trim();
  const meta = parseMarkdownTable(lines.slice(tableStart));
  return { content, meta };
}

function trimSeparatorNoise(text) {
  return String(text || '')
    .replace(/^\s*---\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function parseFaqBlock(block, idx) {
  const lines = String(block || '')
    .split('\n')
    .map((l) => l.replace(/\r$/, ''));
  if (!lines.length) {
    return null;
  }

  let titleLineIdx = -1;
  for (let i = 0; i < lines.length; i += 1) {
    if (/^#\s+/.test(lines[i].trim()) && !/^##\s+/.test(lines[i].trim())) {
      titleLineIdx = i;
      break;
    }
  }
  if (titleLineIdx < 0) {
    return null;
  }

  const question = lines[titleLineIdx].replace(/^#\s+/, '').trim();
  const { content, meta } = splitTrailingPropertyTable(lines.slice(titleLineIdx + 1).join('\n'));

  return {
    id: (meta.id && String(meta.id).trim()) || `faq-${idx}`,
    category: meta.category != null ? String(meta.category).trim() : '',
    question,
    answer: trimSeparatorNoise(content),
  };
}

export default function parseFaqMarkdown(rawMarkdown) {
  if (rawMarkdown == null || String(rawMarkdown).trim() === '') {
    return null;
  }

  let data;
  let body;
  try {
    const source = String(rawMarkdown).replace(/^\uFEFF/, '');
    ({ data, content: body } = matter(source));
  } catch (_error) {
    return null;
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return null;
  }

  if (!Array.isArray(data.categories) || data.categories.length === 0) {
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

  const sectionBody = String(body || '').trim();
  const rawBlocks = sectionBody
    ? sectionBody.split(/\n(?=# )/).map((b) => b.trim()).filter(Boolean)
    : [];

  const faqs = rawBlocks
    .map((block, idx) => parseFaqBlock(block, idx))
    .filter(Boolean)
    .filter((item) => item.question && categoryIds.has(item.category));

  return {
    title: data.title != null ? String(data.title) : 'CCDI FAQs',
    headerImage: data.headerImage != null ? String(data.headerImage) : '',
    categories,
    faqs,
  };
}
