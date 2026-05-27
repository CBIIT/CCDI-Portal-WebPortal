/**
 * Parses publicationsData.md into the shape previously produced from YAML
 * (Publications_Header, bannerText, publicationsList).
 */

const SPECIAL_TYPES = new Set(['Preprint', 'White Paper']);

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function proseToSummaryHtml(text) {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) return '<p></p>';
  return `<p>${escapeHtml(normalized)}</p>`;
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

function parseMetaLine(metaLine, category) {
  const clean = metaLine.replace(/^###\s+/, '').trim();
  const parts = clean.split(/\s*\|\s*/).map((p) => p.trim()).filter(Boolean);

  let date = '';
  let journal = '';
  let pmid = '';
  let conference = '';
  let type = '';

  if (parts.length >= 3) {
    [date, journal, pmid] = parts;
  } else if (parts.length === 2) {
    [date] = parts;
    const second = parts[1];
    if (category === 'Abstracts') {
      conference = second;
    } else if (SPECIAL_TYPES.has(second)) {
      type = second;
    } else {
      journal = second;
    }
  } else if (parts.length === 1) {
    [date] = parts;
  }

  return { date, journal, pmid, conference, type };
}

function parsePublicationBlock(block) {
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

  let tagsIdx = -1;
  for (let i = 2; i < lines.length; i += 1) {
    if (lines[i].trim().toLowerCase().startsWith('tags:')) {
      tagsIdx = i;
      break;
    }
  }

  const summaryLines = tagsIdx === -1 ? lines.slice(2) : lines.slice(2, tagsIdx);
  const summaryText = summaryLines
    .map((l) => l.trim())
    .filter(Boolean)
    .join(' ');

  let tagStr = '';
  let tableStart = tagsIdx;
  if (tagsIdx >= 0) {
    tagStr = lines[tagsIdx]
      .replace(/^tags:\s*/i, '')
      .replace(/\*\*/g, '')
      .trim();
    tableStart = tagsIdx + 1;
  }

  const tableLines = [];
  for (let j = tableStart; j < lines.length; j += 1) {
    const t = lines[j].trim();
    if (t.startsWith('|')) {
      tableLines.push(lines[j]);
    }
  }

  const meta = parseMarkdownTable(tableLines);
  const category = (meta.summary || 'Secondary').trim();
  const {
    date, journal, pmid, conference, type,
  } = parseMetaLine(metaLine, category);

  const item = {
    id: meta.id || '',
    title,
    link: meta.link || '#',
    date,
    summary: proseToSummaryHtml(summaryText),
    category,
    tag: tagStr,
  };

  const journalVal = meta.journal || journal;
  const pmidVal = meta.pmid || pmid;
  const conferenceVal = meta.conference || conference;
  const typeVal = meta.type || type;

  if (journalVal) item.journal = journalVal;
  if (pmidVal) item.pmid = pmidVal;
  if (conferenceVal) item.conference = conferenceVal;
  if (typeVal) item.type = typeVal;

  return item;
}

export function parsePublicationsMarkdown(markdown) {
  const text = String(markdown).replace(/^\uFEFF/, '');
  const allLines = text.split('\n').map((l) => l.replace(/\r$/, ''));

  let i = 0;
  let publicationsHeader = '';
  let bannerText = '';

  if (allLines[i]) {
    const imgMatch = allLines[i].trim().match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);
    if (imgMatch) {
      publicationsHeader = imgMatch[2].trim();
      i += 1;
    }
  }

  if (allLines[i] !== undefined) {
    bannerText = allLines[i].trim();
    i += 1;
  }

  while (i < allLines.length && !allLines[i].trim()) {
    i += 1;
  }

  const body = allLines.slice(i).join('\n').trim();
  if (!body) {
    return {
      Publications_Header: publicationsHeader,
      bannerText,
      publicationsList: [],
    };
  }

  const rawBlocks = body.split(/\n(?=# )/).map((b) => b.trim()).filter(Boolean);
  const publicationsList = rawBlocks
    .map(parsePublicationBlock)
    .filter(Boolean);

  return {
    Publications_Header: publicationsHeader,
    bannerText,
    publicationsList,
  };
}
