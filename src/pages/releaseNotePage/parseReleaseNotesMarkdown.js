/**
 * Parses releaseNotesData.md into releaseNotesList entries for the release notes page,
 * news cards, and landing Latest Updates.
 */

import axios from 'axios';
import env from '../../utils/env';

export const RELEASE_NOTES_MD_URL = `${env.REACT_APP_STATIC_CONTENT_URL}/releaseNotesData.md`;

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

function releaseNotesBodyToHtml(markdown) {
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

function extractImgKey(lines) {
  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim();
    const altMatch = trimmed.match(/<img[^>]+alt=["']([^"']+)["']/i);
    if (altMatch) {
      return altMatch[1];
    }
  }
  return 'updateImgReleaseNotes';
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
  const datePart = metaLine.replace(/^###\s+/, '').split('|')[0].trim();

  let tableStart = -1;
  for (let i = 2; i < lines.length; i += 1) {
    if (lines[i].trim().startsWith('| Property')) {
      tableStart = i;
      break;
    }
  }

  const bodyEnd = tableStart === -1 ? lines.length : tableStart;
  const bodyLines = lines.slice(2, bodyEnd);
  const img = extractImgKey(bodyLines);
  const bodyMarkdown = bodyLines
    .filter((line) => !/^<img\s/i.test(line.trim()))
    .join('\n')
    .trim();

  const tableLines = tableStart === -1 ? [] : lines.slice(tableStart);
  const meta = parseMarkdownTable(tableLines);

  const item = {
    id: meta.id || '',
    title,
    date: datePart,
    version: meta.version || '',
    fullText: releaseNotesBodyToHtml(bodyMarkdown),
    type: 'Release Notes',
    img,
  };

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

export async function fetchReleaseNotesData() {
  try {
    const fileUrl = `${RELEASE_NOTES_MD_URL}?ts=${new Date().getTime()}`;
    const result = await axios.get(fileUrl);
    return parseReleaseNotesMarkdown(result.data);
  } catch (_error) {
    return { releaseNotesList: [] };
  }
}
