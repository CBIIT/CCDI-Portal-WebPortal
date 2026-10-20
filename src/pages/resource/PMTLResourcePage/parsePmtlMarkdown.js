import matter from 'gray-matter';

function stripMarkdownHeadingBraceId(rawHeadingInner) {
  return String(rawHeadingInner || '')
    .trim()
    .replace(/\s*\{#[^}]+\}\s*$/, '')
    .trim();
}

function slugifyHeadingId(text) {
  const s = stripMarkdownHeadingBraceId(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return (s || 'section').slice(0, 120);
}

function trimMd(s) {
  return String(s || '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
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

function extractLeadingPropertyTable(body) {
  const lines = String(body || '').split('\n');
  let i = 0;
  while (i < lines.length && !lines[i].trim()) {
    i += 1;
  }
  if (i >= lines.length || !/^\|\s*Property\s*\|\s*Value\s*\|/i.test(lines[i].trim())) {
    return { content: String(body || '').trim(), meta: {} };
  }
  const tableStart = i;
  let tableEnd = tableStart + 1;
  while (tableEnd < lines.length && lines[tableEnd].trim().startsWith('|')) {
    tableEnd += 1;
  }
  const meta = parseMarkdownTable(lines.slice(tableStart, tableEnd));
  const content = [...lines.slice(0, tableStart), ...lines.slice(tableEnd)].join('\n').trim();
  return { content, meta };
}

function splitTrailingPropertyTable(body) {
  const lines = String(body || '').split('\n');
  let tableStart = -1;
  for (let i = 0; i < lines.length; i += 1) {
    if (/^\|\s*Property\s*\|\s*Value\s*\|/i.test(lines[i].trim())) {
      tableStart = i;
    }
  }
  if (tableStart < 0) {
    return { content: String(body || '').trim(), meta: {} };
  }
  const content = lines.slice(0, tableStart).join('\n').trim();
  const meta = parseMarkdownTable(lines.slice(tableStart));
  return { content, meta };
}

function extractIntroAndRest(body) {
  if (!body || !String(body).trim()) {
    return { intro: '', rest: '' };
  }
  const lines = body.split('\n');
  let introEnd = -1;
  for (let i = 0; i < lines.length; i += 1) {
    if (/^##\s/.test(lines[i])) {
      introEnd = i;
      break;
    }
  }
  if (introEnd === -1) {
    return { intro: body.trim(), rest: '' };
  }
  return {
    intro: lines.slice(0, introEnd).join('\n').trim(),
    rest: lines.slice(introEnd).join('\n'),
  };
}

function parseHeadingLine(line, level) {
  const re = level === 2 ? /^##\s+(.+)$/ : /^###\s+(.+)$/;
  const m = line.match(re);
  if (!m) return null;
  const title = stripMarkdownHeadingBraceId(m[1]);
  return { title, id: slugifyHeadingId(m[1]) };
}

function splitH2(rest) {
  if (!rest || !rest.trim()) return [];
  const lines = rest.split('\n');
  const topics = [];
  let cur = null;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^##\s/.test(line)) {
      if (cur) {
        topics.push({
          topic: cur.title,
          id: cur.id,
          body: cur.lines.join('\n').trim(),
        });
      }
      const parsed = parseHeadingLine(line, 2);
      const rawH2 = line.replace(/^##\s+/, '').trim();
      cur = parsed
        ? { title: parsed.title, id: parsed.id, lines: [] }
        : {
            title: stripMarkdownHeadingBraceId(rawH2),
            id: slugifyHeadingId(rawH2),
            lines: [],
          };
    } else if (cur) {
      cur.lines.push(line);
    }
  }
  if (cur) {
    topics.push({
      topic: cur.title,
      id: cur.id,
      body: cur.lines.join('\n').trim(),
    });
  }
  return topics;
}

function splitH3(topicBody) {
  if (!topicBody || !topicBody.trim()) return [];
  const lines = topicBody.split('\n');
  const subs = [];
  let cur = null;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^###\s/.test(line)) {
      if (cur) {
        subs.push({
          subtopic: cur.subtopic,
          id: cur.id,
          body: cur.lines.join('\n'),
        });
      }
      const parsed = parseHeadingLine(line, 3);
      const rawH3 = line.replace(/^###\s+/, '').trim();
      cur = parsed
        ? { subtopic: parsed.title, id: parsed.id, lines: [] }
        : {
            subtopic: stripMarkdownHeadingBraceId(rawH3),
            id: slugifyHeadingId(rawH3),
            lines: [],
          };
    } else if (cur) {
      cur.lines.push(line);
    }
  }
  if (cur) {
    subs.push({
      subtopic: cur.subtopic,
      id: cur.id,
      body: cur.lines.join('\n'),
    });
  }
  return subs;
}

function sectionId(meta, fallbackId) {
  const fromTable = meta && meta.id != null ? String(meta.id).trim() : '';
  return fromTable || fallbackId;
}

function listFromTopicBody(topicBody, topicId) {
  const subs = splitH3(topicBody);
  if (subs.length > 0) {
    return subs.map((sub) => {
      const { content, meta } = splitTrailingPropertyTable(sub.body);
      return {
        id: sectionId(meta, sub.id),
        subtopic: sub.subtopic,
        content: trimMd(content),
      };
    });
  }

  const { content, meta } = splitTrailingPropertyTable(topicBody);
  const trimmed = trimMd(content);
  if (!trimmed) {
    return [];
  }
  const itemId = meta && meta.id != null ? String(meta.id).trim() : '';
  return [{
    id: itemId && itemId !== topicId ? itemId : undefined,
    subtopic: '',
    content: trimmed,
  }];
}

/**
 * Parses pmtlData.md (YAML front matter + ## / ### body + property-table ids).
 * A ## section with no ### children keeps its body as one list item.
 * That item's id comes from a trailing property table when it differs from the topic id.
 * @param {string} rawMarkdown
 * @returns {{
 *   title: string,
 *   introText: string,
 *   navTitles: string[]|undefined,
 *   pmtlContent: Array<{ id: string, topic: string, list: Array<{ id?: string, subtopic: string, content: string }> }>
 * }}
 */
export function parsePmtlMarkdown(rawMarkdown) {
  const source = String(rawMarkdown || '').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const { data: fm, content: body } = matter(source);
  const title = String(fm.title || '').trim();
  const navTitles = Array.isArray(fm.navTitles) ? fm.navTitles : undefined;
  const { intro, rest } = extractIntroAndRest(body || '');
  const pmtlContent = splitH2(rest).map((topic) => {
    const { content: topicBody, meta: topicMeta } = extractLeadingPropertyTable(topic.body);
    const id = sectionId(topicMeta, topic.id);
    return {
      id,
      topic: topic.topic,
      list: listFromTopicBody(topicBody, id),
    };
  });

  return {
    title,
    introText: trimMd(intro),
    navTitles,
    pmtlContent,
  };
}

export default parsePmtlMarkdown;
