/**
 * Frontend About global search via Fuse.js (no Hub GraphQL / OpenSearch).
 * Corpus: src/content/aboutSearchContent.{yaml,json} — Hub static pages.
 */
// Import the CJS build explicitly. Webpack resolves fuse.js `module` (ESM),
// which older CRA/babel does not transpile under node_modules (e.g. `??`).
import FuseImport from 'fuse.js/dist/fuse.common';
import aboutSearchContent from '../../content/aboutSearchContent.json';

// Jest/Babel may expose the constructor on `.default`.
const Fuse = FuseImport && FuseImport.default ? FuseImport.default : FuseImport;

const FUSE_OPTIONS = {
  includeScore: true,
  ignoreLocation: true,
  threshold: 0.35,
  keys: [
    { name: 'title', weight: 0.45 },
    { name: 'page', weight: 0.15 },
    { name: 'paragraphs', weight: 0.4 },
  ],
};

/**
 * Normalize YAML/JSON corpus rows into Fuse documents.
 * @param {Array} corpus
 */
export const buildAboutSearchDocuments = (corpus = aboutSearchContent) => {
  const rows = Array.isArray(corpus) ? corpus : [];
  return rows
    .map((row) => {
      if (!row || typeof row !== 'object') {
        return null;
      }
      const paragraphs = (Array.isArray(row.content) ? row.content : [])
        .map((entry) => (entry && entry.paragraph != null ? String(entry.paragraph).trim() : ''))
        .filter(Boolean);
      const page = String(row.page || '').trim();
      const title = String(row.title || '').trim();
      if (!page && !title && paragraphs.length === 0) {
        return null;
      }
      return {
        page,
        title,
        paragraphs,
        searchBody: [title, page, ...paragraphs].join(' '),
      };
    })
    .filter(Boolean);
};

/**
 * Collect snippet paragraphs for AboutCard `text` array.
 * Prefer paragraphs containing the query; else first paragraph (BE fallback).
 * Snippet shape mirrors Hub OpenSearch highlights: up to 5 ~110-char fragments
 * that AboutCard joins with " ... " (~4 lines on the results page).
 */
export const ABOUT_SNIPPET_MAX = 5;
export const ABOUT_FRAGMENT_SIZE = 110;

/**
 * Extract a short fragment around the first query match (or start of text).
 * Mirrors OpenSearch highlight fragment_size behavior for About cards.
 */
export const extractMatchFragment = (paragraph, input, fragmentSize = ABOUT_FRAGMENT_SIZE) => {
  const text = String(paragraph || '').replace(/\s+/g, ' ').trim();
  if (!text) {
    return '';
  }
  const size = Math.max(40, Number(fragmentSize) || ABOUT_FRAGMENT_SIZE);
  const needle = String(input || '').trim().toLowerCase();
  if (!needle) {
    return text.length <= size ? text : `${text.slice(0, size).trim()}...`;
  }

  const lower = text.toLowerCase();
  const idx = lower.indexOf(needle);
  if (idx < 0) {
    return text.length <= size ? text : `${text.slice(0, size).trim()}...`;
  }

  const half = Math.floor(size / 2);
  let start = Math.max(0, idx - half);
  let end = Math.min(text.length, start + size);
  if (end - start < size) {
    start = Math.max(0, end - size);
  }

  // Prefer breaking on nearby spaces when truncating mid-word.
  if (start > 0) {
    const space = text.indexOf(' ', start);
    if (space !== -1 && space < start + 20) {
      start = space + 1;
    }
  }
  if (end < text.length) {
    const space = text.lastIndexOf(' ', end);
    if (space > end - 20 && space > start) {
      end = space;
    }
  }

  let fragment = text.slice(start, end).trim();
  if (start > 0) {
    fragment = `...${fragment}`;
  }
  if (end < text.length) {
    fragment = `${fragment}...`;
  }
  return fragment;
};

export const buildAboutSnippets = (doc, input) => {
  const paragraphs = (doc && doc.paragraphs) || [];
  const needle = String(input || '').trim().toLowerCase();
  if (!paragraphs.length) {
    return doc && doc.title ? [doc.title] : [];
  }
  if (!needle) {
    return paragraphs
      .slice(0, ABOUT_SNIPPET_MAX)
      .map((p) => extractMatchFragment(p, '', ABOUT_FRAGMENT_SIZE))
      .filter(Boolean);
  }
  const matched = paragraphs.filter((p) => p.toLowerCase().includes(needle));
  if (matched.length) {
    return matched
      .slice(0, ABOUT_SNIPPET_MAX)
      .map((p) => extractMatchFragment(p, needle, ABOUT_FRAGMENT_SIZE))
      .filter(Boolean);
  }
  // Title/page-only Fuse hit: still show a short first-paragraph window.
  const fallback = extractMatchFragment(paragraphs[0], needle, ABOUT_FRAGMENT_SIZE);
  return fallback ? [fallback] : [];
};

let fuseInstance = null;
let fuseDocuments = null;

export const getAboutSearchDocuments = () => {
  if (!fuseDocuments) {
    fuseDocuments = buildAboutSearchDocuments();
  }
  return fuseDocuments;
};

export const getAboutFuse = () => {
  if (!fuseInstance) {
    fuseInstance = new Fuse(getAboutSearchDocuments(), FUSE_OPTIONS);
  }
  return fuseInstance;
};

/** Test helper — reset singleton between suites. */
export const resetAboutFuseCache = () => {
  fuseInstance = null;
  fuseDocuments = null;
};

/**
 * Search About corpus and return GraphQL-shaped about results.
 *
 * @param {string} input
 * @param {{ first?: number, offset?: number }} [paging]
 * @returns {{ about_count: number, about_page: Array<{ title: string, page: string, text: string[] }> }}
 */
export const searchAboutPages = (input, paging = {}) => {
  const first = Math.max(0, Number(paging.first) || 10);
  const offset = Math.max(0, Number(paging.offset) || 0);
  const query = String(input || '').trim();
  const documents = getAboutSearchDocuments();

  let hits;
  if (!query) {
    hits = documents.map((item) => ({ item }));
  } else {
    hits = getAboutFuse().search(query);
  }

  const about_page = hits.map(({ item }) => ({
    title: item.title,
    page: item.page,
    text: buildAboutSnippets(item, query),
    type: 'about_page',
  }));

  return {
    about_count: about_page.length,
    about_page: about_page.slice(offset, offset + first),
  };
};

/**
 * Autocomplete bucket: title-only hits for SEARCH about_page.
 * @param {string} input
 * @param {number} [limit]
 */
export const searchAboutAutocomplete = (input, limit = 6) => {
  const { about_page } = searchAboutPages(input, { first: limit, offset: 0 });
  return about_page.map(({ title, page }) => ({ title, page }));
};

export default {
  buildAboutSearchDocuments,
  buildAboutSnippets,
  searchAboutPages,
  searchAboutAutocomplete,
  resetAboutFuseCache,
};
