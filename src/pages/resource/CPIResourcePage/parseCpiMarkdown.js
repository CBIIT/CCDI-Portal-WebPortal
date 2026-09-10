/**
 * Parses cpiData.md into the shape previously produced from resourceData.yaml CPI keys.
 *
 * Shape mirrors newsData.md:
 * - YAML front matter for shared image URLs
 * - Intro prose before the first `#` heading
 * - `#` section blocks separated by `---`
 * - Trailing `| Property | Value |` table for `id`
 */

import matter from 'gray-matter';

function stripMarkdownHeadingBraceId(rawHeadingInner) {
  return String(rawHeadingInner || '')
    .trim()
    .replace(/\s*\{#[^}]+\}\s*$/, '')
    .trim();
}

/** Legacy-style section ids (e.g. CPI_Components). */
export function topicToSectionId(topic) {
  return stripMarkdownHeadingBraceId(topic)
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

function parseSectionBlock(block) {
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

  const topic = stripMarkdownHeadingBraceId(lines[titleLineIdx].replace(/^#\s+/, ''));
  const bodyMarkdown = lines.slice(titleLineIdx + 1).join('\n');
  const { content, meta } = splitTrailingPropertyTable(bodyMarkdown);
  const id = (meta.id && String(meta.id).trim()) || topicToSectionId(topic);

  return {
    id,
    topic,
    content: trimSeparatorNoise(content),
  };
}

function emptyCpiData() {
  return {
    cpiIntroText: '',
    cpiContent: [],
    CPI_Header_URL: '',
    CPI_Img_URL: '',
    CPI_Cross_Dataset_Linkages_Icon_URL: '',
    CPI_Domain_Coverage_Icon_URL: '',
    CPI_Total_Mapped_Participants_Ids_Icon_URL: '',
    CPI_Unique_Participants_Icon_URL: '',
  };
}

/**
 * @param {string} rawMarkdown
 * @returns {{
 *   cpiIntroText: string,
 *   cpiContent: Array<{ id: string, topic: string, content: string }>,
 *   CPI_Header_URL: string,
 *   CPI_Img_URL: string,
 *   CPI_Cross_Dataset_Linkages_Icon_URL: string,
 *   CPI_Domain_Coverage_Icon_URL: string,
 *   CPI_Total_Mapped_Participants_Ids_Icon_URL: string,
 *   CPI_Unique_Participants_Icon_URL: string,
 * }}
 */
export default function parseCpiMarkdown(rawMarkdown) {
  if (!rawMarkdown || !String(rawMarkdown).trim()) {
    return emptyCpiData();
  }

  const source = String(rawMarkdown).replace(/^\uFEFF/, '');
  const { data: fm, content: body } = matter(source);

  const lines = String(body || '').split('\n');
  let firstHeading = lines.length;
  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim();
    if (/^#\s+/.test(trimmed) && !/^##\s+/.test(trimmed)) {
      firstHeading = i;
      break;
    }
  }

  const cpiIntroText = trimSeparatorNoise(lines.slice(0, firstHeading).join('\n'));
  const sectionBody = lines.slice(firstHeading).join('\n').trim();
  const rawBlocks = sectionBody
    ? sectionBody.split(/\n(?=# )/).map((b) => b.trim()).filter(Boolean)
    : [];
  const cpiContent = rawBlocks.map(parseSectionBlock).filter(Boolean);

  return {
    cpiIntroText,
    cpiContent,
    CPI_Header_URL: String(fm.CPI_Header_URL || '').trim(),
    CPI_Img_URL: String(fm.CPI_Img_URL || '').trim(),
    CPI_Cross_Dataset_Linkages_Icon_URL: String(fm.CPI_Cross_Dataset_Linkages_Icon_URL || '').trim(),
    CPI_Domain_Coverage_Icon_URL: String(fm.CPI_Domain_Coverage_Icon_URL || '').trim(),
    CPI_Total_Mapped_Participants_Ids_Icon_URL: String(
      fm.CPI_Total_Mapped_Participants_Ids_Icon_URL || '',
    ).trim(),
    CPI_Unique_Participants_Icon_URL: String(fm.CPI_Unique_Participants_Icon_URL || '').trim(),
  };
}
