import matter from 'gray-matter';
import {
  buildNavTitleSet,
  buildSegments,
  normalizeNavTitleKey,
  resolveShowInNav,
} from '../MCIResourcePage/parseMciMarkdown';

function stripMarkdownHeadingBraceId(rawHeadingInner) {
  return String(rawHeadingInner || '')
    .trim()
    .replace(/\s*\{#[^}]+\}\s*$/, '')
    .trim();
}

/** Stable underscore ids when property table is omitted (e.g. CGC_Resources). */
export function topicToSectionId(topic) {
  return stripMarkdownHeadingBraceId(topic)
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '');
}

function parseHeadingLine(line, level) {
  const re = level === 2 ? /^##\s+(.+)$/ : /^###\s+(.+)$/;
  const m = line.match(re);
  if (!m) return null;
  const rawInner = m[1];
  const title = stripMarkdownHeadingBraceId(rawInner);
  return { title, id: topicToSectionId(title) };
}

function firstDefined(...values) {
  for (let i = 0; i < values.length; i += 1) {
    const v = values[i];
    if (v !== undefined && v !== null) {
      return v;
    }
  }
  return undefined;
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

/** Peel leading `| Property | Value |` table (id for scroll/nav). */
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

function resolveSectionId(meta, fallbackId) {
  if (meta && meta.id != null && String(meta.id).trim() !== '') {
    return String(meta.id).trim();
  }
  return fallbackId;
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
          body: trimMd(cur.lines.join('\n')),
        });
      }
      const p = parseHeadingLine(line, 2);
      const rawH2 = line.replace(/^##\s+/, '').trim();
      cur = p
        ? { title: p.title, id: p.id, lines: [] }
        : {
            title: stripMarkdownHeadingBraceId(rawH2),
            id: topicToSectionId(rawH2),
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
      body: trimMd(cur.lines.join('\n')),
    });
  }
  return topics;
}

function pushH3Sub(subs, cur) {
  subs.push({
    subtopic: cur.subtopic,
    id: cur.id,
    body: cur.lines.join('\n'),
  });
}

/**
 * Split a topic body into optional leading content (before first ###) and H3 subs.
 */
function splitTopicBody(topicBody) {
  if (!topicBody || !topicBody.trim()) {
    return { content: '', subs: [] };
  }
  const lines = topicBody.split('\n');
  const leading = [];
  const subs = [];
  let cur = null;
  let seenH3 = false;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^###\s/.test(line)) {
      seenH3 = true;
      if (cur) {
        pushH3Sub(subs, cur);
      }
      const p = parseHeadingLine(line, 3);
      const rawH3 = line.replace(/^###\s+/, '').trim();
      cur = p
        ? { subtopic: p.title, id: p.id, lines: [] }
        : {
            subtopic: stripMarkdownHeadingBraceId(rawH3),
            id: topicToSectionId(rawH3),
            lines: [],
          };
    } else if (cur) {
      cur.lines.push(line);
    } else if (!seenH3) {
      leading.push(line);
    }
  }
  if (cur) {
    pushH3Sub(subs, cur);
  }

  return {
    content: trimMd(leading.join('\n')),
    subs,
  };
}

/**
 * Builds ordered side-nav entries from front matter navTitles (topics + subtopics).
 * Falls back to document order when navTitles is omitted.
 */
export function buildMciJson2TsvNavItems(navTitles, content) {
  const sections = Array.isArray(content) ? content : [];
  if (!Array.isArray(navTitles) || navTitles.length === 0) {
    const items = [];
    sections.forEach((topic) => {
      items.push({ id: topic.id, label: topic.topic, isSubtitle: false });
      (topic.list || []).forEach((sub) => {
        items.push({ id: sub.id, label: sub.subtopic, isSubtitle: true });
      });
    });
    return items;
  }

  const topicByKey = new Map();
  const subByKey = new Map();
  sections.forEach((topic) => {
    topicByKey.set(normalizeNavTitleKey(topic.topic), topic);
    (topic.list || []).forEach((sub) => {
      subByKey.set(normalizeNavTitleKey(sub.subtopic), { topic, sub });
    });
  });

  return navTitles
    .map((title) => {
      const key = normalizeNavTitleKey(title);
      const topic = topicByKey.get(key);
      if (topic) {
        return { id: topic.id, label: topic.topic, isSubtitle: false };
      }
      const subMatch = subByKey.get(key);
      if (subMatch) {
        return {
          id: subMatch.sub.id,
          label: subMatch.sub.subtopic,
          isSubtitle: true,
        };
      }
      return null;
    })
    .filter(Boolean);
}

export default function parseMciJson2TsvMarkdown(rawMarkdown) {
  const source = String(rawMarkdown || '').replace(/^\uFEFF/, '');
  const { data: fm, content: body } = matter(source);
  const {
    title: fmTitle,
    headerImage: fmHeaderImage,
    JSON2TSV_Header: fmJson2TsvHeader,
    introText: legacyIntro,
    navTitles: fmNavTitles,
    nav_titles: fmNavTitlesSnake,
    ...restFm
  } = fm;

  const title = String(fmTitle || '').trim();
  const headerImage = String(
    firstDefined(fmHeaderImage, fmJson2TsvHeader) || '',
  ).trim();
  const rawNavTitles = firstDefined(fmNavTitles, fmNavTitlesSnake);
  const navTitleSet = buildNavTitleSet(rawNavTitles);
  const navTitles = Array.isArray(rawNavTitles) ? rawNavTitles : undefined;

  const { intro: introFromBody, rest } = extractIntroAndRest(body || '');
  const introText =
    String(introFromBody || '').trim() !== ''
      ? introFromBody
      : legacyIntro != null
        ? String(legacyIntro)
        : '';

  const topics = splitH2(rest);
  const mciJson2TsvContent = topics.map((t) => {
    const { content: afterTopicTable, meta: topicMeta } = extractLeadingPropertyTable(t.body);
    const { content: leading, subs } = splitTopicBody(afterTopicTable);
    const list = subs.map((s) => {
      const { content: subBody, meta: subMeta } = extractLeadingPropertyTable(s.body);
      const bodyMd = trimMd(subBody);
      return {
        id: resolveSectionId(subMeta, s.id),
        subtopic: s.subtopic,
        showInNav: resolveShowInNav(s.subtopic, navTitleSet),
        content: bodyMd,
        segments: buildSegments(bodyMd),
      };
    });
    const leadingMd = trimMd(leading);
    return {
      id: resolveSectionId(topicMeta, t.id),
      topic: t.topic,
      showInNav: resolveShowInNav(t.topic, navTitleSet),
      content: leadingMd,
      segments: buildSegments(leadingMd),
      list,
    };
  });

  return {
    ...restFm,
    title,
    headerImage,
    introText,
    navTitles,
    mciJson2TsvContent,
  };
}
