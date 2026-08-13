import matter from 'gray-matter';

/**
 * Parse aboutSearchContent.md — YAML front matter only (markdown body ignored).
 * Expected shape:
 *   pages:
 *     - page: "/about"
 *       title: "About"
 *       content:
 *         - paragraph: "..."
 *
 * Returns an array of page rows, or null when invalid/missing.
 */
export default function parseAboutSearchMarkdown(rawMarkdown) {
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

  if (!Array.isArray(data.pages)) {
    return null;
  }

  const pages = data.pages
    .map((row) => {
      if (!row || typeof row !== 'object') {
        return null;
      }
      const page = row.page != null ? String(row.page).trim() : '';
      const title = row.title != null ? String(row.title).trim() : '';
      const content = (Array.isArray(row.content) ? row.content : [])
        .map((entry) => {
          if (!entry || entry.paragraph == null) {
            return null;
          }
          const paragraph = String(entry.paragraph).trim();
          return paragraph ? { paragraph } : null;
        })
        .filter(Boolean);

      if (!page && !title && content.length === 0) {
        return null;
      }

      return { page, title, content };
    })
    .filter(Boolean);

  return pages;
}
