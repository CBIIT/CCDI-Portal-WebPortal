/**
 * Parses releaseNotesData.md and shared ccdiDataUpdates.md into releaseNotesList entries
 * for the release notes page, news cards, and landing Latest Updates.
 */

import axios from 'axios';
import env from '../../utils/env';

export const RELEASE_NOTES_MD_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/releaseNotesData.md`;
export const CCDI_DATA_UPDATES_MD_URL = env.REACT_APP_DATA_RELEASES_URL
  ? `${env.REACT_APP_DATA_RELEASES_URL}/ccdiDataUpdates.md`
  : '';

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatInline(text) {
  const escaped = escapeHtml(text);
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<i>$1</i>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => `<a href="${escapeHtml(href)}">${label}</a>`);
}

/** True when the blurb already contains HTML tags (newsData.md often ships &lt;p&gt;/&lt;a&gt;). */
function looksLikeHtml(text) {
  return /<\/?[a-z][\s\S]*>/i.test(String(text || ''));
}

function newsBlurbToHtml(markdown) {
  // Card images render in the right-side imgContainer, never inline in the blurb.
  // Also drop the table-cell pipe that precedes the image tag.
  const text = String(markdown || '')
    .replace(/\|?\s*<img\b[^>]*>/gi, '')
    .trim();
  if (!text) {
    return '';
  }
  // Preserve pre-authored HTML so ReactHtmlParser can render links/markup on cards.
  if (looksLikeHtml(text)) {
    return text;
  }
  return `<p>${formatInline(text)}</p>`;
}

/**
 * Ecosystem news cards often wrap the blurb in a markdown table:
 * | | |
 * | --- | --- |
 * | Paragraph with [links](url) | |
 * Returns the cell markdown, or null when the body is freeform release-notes style.
 */
export function extractNewsBlurbMarkdown(bodyMarkdown) {
  const lines = String(bodyMarkdown || '').split('\n');
  let sawTable = false;
  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim();
    if (!trimmed.startsWith('|')) {
      if (trimmed && sawTable) {
        break;
      }
      continue;
    }
    sawTable = true;
    if (trimmed.includes('---') || /^\|\s*-+/.test(trimmed)) {
      continue;
    }
    // Skip empty header rows like `| | |`
    if (/^\|(?:\s*\|)+\s*$/.test(trimmed)) {
      continue;
    }
    // Content row: `| blurb | |` or `| blurb |`
    let content = trimmed.replace(/^\|\s*/, '');
    content = content.replace(/\s*\|\s*\|\s*$/, '').replace(/\s*\|\s*$/, '');
    content = content.replace(/\\\|/g, '|').trim();
    if (content) {
      return content;
    }
  }
  return null;
}

function releaseNotesBodyToHtml(markdown) {
  const blurb = extractNewsBlurbMarkdown(markdown);
  if (blurb) {
    return newsBlurbToHtml(blurb);
  }

  const lines = String(markdown).split('\n');
  const parts = [];
  let listItems = null;

  const flushList = () => {
    if (listItems && listItems.length) {
      parts.push(`<ul style="margin: 0 0 8pt 0">${listItems.join('')}</ul>`);
    }
    listItems = null;
  };

  lines.forEach((rawLine) => {
    const trimmed = rawLine.trim();
    if (!trimmed) {
      flushList();
      return;
    }
    if (trimmed.startsWith('|')) {
      // Skip residual table markup when mixed with freeform body
      return;
    }
    if (trimmed.startsWith('### ')) {
      flushList();
      parts.push(
        `<h1 style="font-weight: normal; margin: 30pt 0 0 0"><span style="color: #2f5496; font-size: 16pt">${formatInline(trimmed.slice(4))}</span></h1>`,
      );
    } else if (trimmed.startsWith('#### ')) {
      flushList();
      parts.push(
        `<h2 style="font-weight: normal; margin: 2pt 0 0 0"><span style="color: #2f5496; font-size: 13pt">${formatInline(trimmed.slice(5))}</span></h2>`,
      );
    } else if (trimmed.startsWith('- ')) {
      if (!listItems) {
        listItems = [];
      }
      listItems.push(`<li>${formatInline(trimmed.slice(2))}</li>`);
    } else if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) {
      flushList();
      parts.push(`<p><i>${formatInline(trimmed.slice(1, -1))}</i></p>`);
    } else {
      flushList();
      parts.push(`<p>${formatInline(trimmed)}</p>`);
    }
  });

  flushList();
  return parts.join('');
}

function parseMarkdownTable(tableLines) {
  const meta = {};
  tableLines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|') || trimmed.includes('---')) {
      return;
    }
    const cells = trimmed.split('|').map((c) => c.trim()).filter(Boolean);
    if (cells.length >= 2) {
      const key = cells[0].toLowerCase();
      meta[key] = cells.slice(1).join(' | ').trim();
    }
  });
  return meta;
}

function extractImgFromLines(lines) {
  for (let i = 0; i < lines.length; i += 1) {
    // The <img> tag may be inline within a table cell, not on its own line.
    const imgMatch = lines[i].match(/<img\b[^>]*>/i);
    if (!imgMatch) {
      continue;
    }
    const tag = imgMatch[0];
    const srcMatch = tag.match(/\bsrc=["']([^"']+)["']/i);
    const altMatch = tag.match(/\balt=["']([^"']+)["']/i);
    return {
      img: altMatch ? altMatch[1] : 'updateImgReleaseNotes',
      imgSrc: srcMatch ? srcMatch[1] : undefined,
    };
  }
  return { img: 'updateImgReleaseNotes' };
}

function parseReleaseNoteBlock(block) {
  const lines = block.split('\n').map((l) => l.replace(/\r$/, ''));
  if (lines.length < 2) {
    return null;
  }

  const titleLine = lines[0].trim();
  if (!titleLine.startsWith('# ')) {
    return null;
  }
  const title = titleLine.replace(/^#\s+/, '').trim();

  const metaLine = lines[1].trim();
  if (!metaLine.startsWith('###')) {
    return null;
  }
  const metaParts = metaLine.replace(/^###\s+/, '').split('|').map((s) => s.trim());
  const datePart = metaParts[0];
  const type = metaParts[1] || 'Release Notes';

  let tableStart = -1;
  for (let i = 2; i < lines.length; i += 1) {
    if (lines[i].trim().startsWith('| Property')) {
      tableStart = i;
      break;
    }
  }

  const bodyEnd = tableStart === -1 ? lines.length : tableStart;
  const bodyLines = lines.slice(2, bodyEnd);
  const { img, imgSrc } = extractImgFromLines(bodyLines);
  const bodyMarkdown = bodyLines
    .filter((line) => !/^<img\s/i.test(line.trim()))
    .join('\n')
    .trim();

  const tableLines = tableStart === -1 ? [] : lines.slice(tableStart);
  const meta = parseMarkdownTable(tableLines);
  const fullText = releaseNotesBodyToHtml(bodyMarkdown);

  const item = {
    id: meta.id || '',
    title,
    date: datePart,
    version: meta.version || '',
    fullText,
    type,
    img,
  };

  if (imgSrc) {
    item.imgSrc = imgSrc;
  }

  // Standard Hub news cards expect `highlight` HTML (parsed from markdown body).
  if (type !== 'Release Notes' && fullText) {
    item.highlight = fullText;
  }

  if (meta.slug) {
    item.slug = meta.slug;
  }
  if (meta.contenttype) {
    item.contentType = meta.contenttype;
  }
  if (meta.latestupdate !== undefined && meta.latestupdate !== '') {
    item.latestUpdate = meta.latestupdate.toLowerCase() === 'true';
  }
  if (meta.latestupdateorder !== undefined && meta.latestupdateorder !== '') {
    const order = Number(meta.latestupdateorder);
    if (!Number.isNaN(order)) {
      item.latestUpdateOrder = order;
    }
  }

  return item.id ? item : null;
}

export function parseReleaseNotesMarkdown(markdown) {
  const text = String(markdown).replace(/^\uFEFF/, '');
  const normalized = text.split('\n').map((l) => l.replace(/\r$/, ''));

  let start = 0;
  while (start < normalized.length && !normalized[start].trim().startsWith('# ')) {
    start += 1;
  }

  const body = normalized.slice(start).join('\n').trim();
  if (!body) {
    return { releaseNotesList: [] };
  }

  const rawBlocks = body.split(/\n(?=# )/).map((b) => b.trim()).filter(Boolean);
  const releaseNotesList = rawBlocks
    .map(parseReleaseNoteBlock)
    .filter(Boolean);

  return { releaseNotesList };
}

/** Merges parsed lists from Hub and shared CCDI repos, newest date first. */
export function mergeReleaseNotesLists(...lists) {
  return lists
    .flat()
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function fetchReleaseNotesData() {
  const ts = Date.now();
  const fetches = [
    axios.get(`${RELEASE_NOTES_MD_URL}?ts=${ts}`),
  ];
  if (CCDI_DATA_UPDATES_MD_URL) {
    fetches.push(axios.get(`${CCDI_DATA_UPDATES_MD_URL}?ts=${ts}`));
  }
  const results = await Promise.allSettled(fetches);

  const hubList = results[0].status === 'fulfilled'
    ? parseReleaseNotesMarkdown(results[0].value.data).releaseNotesList
    : [];
  const dataUpdatesList = results[1] && results[1].status === 'fulfilled'
    ? parseReleaseNotesMarkdown(results[1].value.data).releaseNotesList
    : [];

  return {
    releaseNotesList: mergeReleaseNotesLists(hubList),
    ccdiDataUpdatesList: mergeReleaseNotesLists(dataUpdatesList),
  };
}
