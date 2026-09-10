/**
 * Parses eventAnnouncements.md into the shape previously produced from resourceData.yaml.
 *
 * Expected structure:
 * - YAML front matter banner: CCDI_Event_Announcements_Header or headerImage
 * - Legacy fallback: leading ![alt](url) in the body
 * - Intro prose before the first heading
 * - # or ## section headings (topic titles)
 * - Optional trailing markdown property table with `id`
 */

import matter from 'gray-matter';

const LEGACY_SECTION_IDS = {
  'upcoming events': 'CCDI_Event_Archive_0',
  'past events, webinars, and workshops': 'CCDI_Event_Archive_1',
  contact: 'CCDI_Event_Archive_2',
};

function stripMarkdownHeadingBraceId(rawHeadingInner) {
  return String(rawHeadingInner || '')
    .trim()
    .replace(/\s*\{#[^}]+\}\s*$/, '')
    .trim();
}

export function topicToSectionId(topic) {
  const cleaned = stripMarkdownHeadingBraceId(topic);
  const legacy = LEGACY_SECTION_IDS[cleaned.trim().toLowerCase()];
  if (legacy) {
    return legacy;
  }
  return cleaned
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '');
}

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
      meta[cells[0]] = cells[1];
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

function extractHeaderImage(lines) {
  for (let i = 0; i < Math.min(lines.length, 12); i += 1) {
    const m = lines[i].match(/^!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)\s*$/);
    if (m) {
      return { url: m[1], lineIndex: i };
    }
  }
  return { url: '', lineIndex: -1 };
}

function isSectionHeading(line) {
  return /^#{1,2}\s+.+/.test(line) && !/^###\s+/.test(line);
}

function parseHeadingTitle(line) {
  const m = line.match(/^#{1,2}\s+(.+)$/);
  if (!m) {
    return '';
  }
  return stripMarkdownHeadingBraceId(m[1]);
}

/**
 * @param {string} raw - full eventAnnouncements.md contents
 * @returns {{
 *   CCDI_Event_Announcements_Header: string,
 *   ccdiEventAnnouncementsIntroText: string,
 *   ccdiEventAnnouncementsContent: Array<{ id: string, topic: string, content: string }>
 * }}
 */
export function parseEventAnnouncementsMarkdown(raw) {
  const text = String(raw || '').replace(/^\uFEFF/, '');
  const { data: fm, content: body } = matter(text);
  const fmHeader = String(
    fm.CCDI_Event_Announcements_Header || fm.headerImage || '',
  ).trim();

  const allLines = String(body || '').split('\n');
  const { url: legacyHeaderUrl, lineIndex: headerLine } = extractHeaderImage(allLines);

  const lines = headerLine >= 0
    ? allLines.filter((_, idx) => idx !== headerLine)
    : allLines;

  let firstHeading = lines.length;
  for (let i = 0; i < lines.length; i += 1) {
    if (isSectionHeading(lines[i])) {
      firstHeading = i;
      break;
    }
  }

  const introText = lines.slice(0, firstHeading).join('\n').trim();
  const sectionLines = lines.slice(firstHeading);
  const sections = [];
  let cur = null;

  sectionLines.forEach((line) => {
    if (isSectionHeading(line)) {
      if (cur) {
        sections.push(cur);
      }
      const topic = parseHeadingTitle(line);
      cur = { topic, bodyLines: [] };
    } else if (cur) {
      cur.bodyLines.push(line);
    }
  });
  if (cur) {
    sections.push(cur);
  }

  const ccdiEventAnnouncementsContent = sections.map((section) => {
    const { content, meta } = splitTrailingPropertyTable(section.bodyLines.join('\n'));
    const id = (meta.id && String(meta.id).trim()) || topicToSectionId(section.topic);
    return {
      id,
      topic: section.topic,
      content,
    };
  });

  return {
    CCDI_Event_Announcements_Header: fmHeader || legacyHeaderUrl,
    ccdiEventAnnouncementsIntroText: introText,
    ccdiEventAnnouncementsContent,
  };
}

export default parseEventAnnouncementsMarkdown;
