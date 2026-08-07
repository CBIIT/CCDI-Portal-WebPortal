import matter from 'gray-matter';
import resolveContentTokens from '../utils/resolveContentTokens';

/**
 * Parse navData.md — YAML front matter only.
 * Returns null when primary nav is missing so callers keep JS fallbacks.
 */
export default function parseNavMarkdown(rawMarkdown) {
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

  const resolved = resolveContentTokens(data);
  if (!Array.isArray(resolved.primary) || resolved.primary.length === 0) {
    return null;
  }

  const navMobileList = resolved.primary.map((item) => ({
    name: item.name != null ? String(item.name) : '',
    link: item.link != null ? String(item.link) : '',
    className: item.className != null ? String(item.className) : 'navMobileItem',
  }));

  const resources = Array.isArray(resolved.resources)
    ? resolved.resources.map((item) => ({
      name: item.name != null ? String(item.name) : '',
      link: item.link != null ? String(item.link) : '',
      className: 'navMobileSubItem',
    }))
    : [];

  const about = Array.isArray(resolved.about)
    ? resolved.about.map((section) => {
      if (Array.isArray(section.children) && section.children.length > 0) {
        return {
          name: section.name != null ? String(section.name) : '',
          className: 'navMobileSubSection',
          children: section.children.map((child) => ({
            name: child.name != null ? String(child.name) : '',
            link: child.link != null ? String(child.link) : '',
            className: 'navMobileSubItem',
          })),
        };
      }
      return {
        name: section.name != null ? String(section.name) : '',
        link: section.link != null ? String(section.link) : '',
        className: 'navMobileSubItem',
      };
    })
    : [];

  return {
    navMobileList,
    navbarSublists: {
      Resources: resources,
      About: about,
    },
  };
}
