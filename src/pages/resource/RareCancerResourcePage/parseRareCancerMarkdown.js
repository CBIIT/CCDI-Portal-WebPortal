import matter from 'gray-matter';
import {
  buildNavTitleSet,
  normalizeNavTitleKey,
  resolveShowInNav,
} from '../MCIResourcePage/parseMciMarkdown';

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

function parseHeadingLine(line, level) {
  const re = level === 2 ? /^##\s+(.+)$/ : /^###\s+(.+)$/;
  const m = line.match(re);
  if (!m) return null;
  const rawInner = m[1];
  const title = stripMarkdownHeadingBraceId(rawInner);
  return { title, id: slugifyHeadingId(rawInner) };
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

/**
 * Removes the dedicated flow-chart image from intro markdown.
 * @deprecated Flow charts stay inline in the intro; prefer not calling this.
 */
export function stripIntroFlowChart(intro, fmUrl) {
  const imgRe = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let extractedUrl = '';
  const cleaned = String(intro || '').replace(imgRe, (full, url) => {
    const alt = (full.match(/^!\[([^\]]*)\]/) || [])[1] || '';
    if (/flow\s*chart/i.test(alt) || (fmUrl && url === fmUrl)) {
      extractedUrl = url;
      return '';
    }
    return full;
  });
  return { intro: trimMd(cleaned), extractedUrl };
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
      const p = parseHeadingLine(line, 2);
      const rawH2 = line.replace(/^##\s+/, '').trim();
      cur = p
        ? { title: p.title, id: p.id, lines: [] }
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

function pushH3Sub(subs, cur) {
  subs.push({
    subtopic: cur.subtopic,
    id: cur.id,
    body: cur.lines.join('\n'),
  });
}

function splitH3InTopic(topicBody) {
  if (!topicBody || !topicBody.trim()) return [];
  const lines = topicBody.split('\n');
  const subs = [];
  let cur = null;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^###\s/.test(line)) {
      if (cur) {
        pushH3Sub(subs, cur);
      }
      const p = parseHeadingLine(line, 3);
      const rawH3 = line.replace(/^###\s+/, '').trim();
      cur = p
        ? { subtopic: p.title, id: p.id, lines: [] }
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
    pushH3Sub(subs, cur);
  }
  return subs;
}

function resolveSectionId(meta, fallbackId) {
  const fromTable = meta && meta.id != null ? String(meta.id).trim() : '';
  return fromTable || fallbackId;
}

/**
 * Builds ordered side-nav entries from front matter navTitles (topic + subtopics).
 * Falls back to document order when navTitles is omitted.
 */
export function buildRareCancerNavItems(navTitles, rareCancerContent) {
  const content = Array.isArray(rareCancerContent) ? rareCancerContent : [];
  if (!Array.isArray(navTitles) || navTitles.length === 0) {
    const items = [];
    content.forEach((topic) => {
      items.push({ id: topic.id, label: topic.topic, isSubtitle: false });
      (topic.list || []).forEach((sub) => {
        items.push({ id: sub.id, label: sub.subtopic, isSubtitle: true });
      });
    });
    return items;
  }

  const topicByKey = new Map();
  const subByKey = new Map();
  content.forEach((topic) => {
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

function normalizeDownloadConfig(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return undefined;
  }
  const url = raw.url != null ? String(raw.url).trim() : '';
  const filename = raw.filename != null ? String(raw.filename).trim() : '';
  if (!url && !filename) {
    return undefined;
  }
  return {
    url,
    filename: filename || 'rare-cancer-study_contact.pdf',
  };
}

/**
 * Parses rareCancerData.md (YAML front matter + ## / ### / #### body + property-table ids).
 * @param {string} rawMarkdown
 * @returns {{
 *   title: string,
 *   RCI_Header: string,
 *   RCI_DOWNLOAD_CONFIG: { url: string, filename: string }|undefined,
 *   rareCancerIntroText: string,
 *   navTitles: string[]|undefined,
 *   rareCancerContent: Array<{ id: string, topic: string, list: Array<{ id: string, subtopic: string, content: string }> }>
 * }}
 */
export function parseRareCancerMarkdown(rawMarkdown) {
  const source = String(rawMarkdown || '').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const { data: fm, content: body } = matter(source);
  const {
    title: fmTitle,
    RCI_Header: fmHeader,
    RCI_Data_Flow_Chart_URL: _legacyFlowChart,
    RCI_DOWNLOAD_CONFIG: fmDownload,
    rareCancerIntroText: legacyIntro,
    navTitles: fmNavTitles,
    rareCancerNavTitles,
    nav_titles: fmNavTitlesSnake,
    ...restFm
  } = fm;

  const title = String(fmTitle || '').trim();
  const RCI_Header = String(fmHeader || '').trim();
  const rawNavTitles = firstDefined(fmNavTitles, rareCancerNavTitles, fmNavTitlesSnake);
  const navTitleSet = buildNavTitleSet(rawNavTitles);
  const navTitles = Array.isArray(rawNavTitles) ? rawNavTitles : undefined;

  const { intro: introFromBody, rest } = extractIntroAndRest(body || '');
  const rareCancerIntroText =
    String(introFromBody || '').trim() !== ''
      ? trimMd(introFromBody)
      : legacyIntro != null
        ? String(legacyIntro)
        : '';

  const topics = splitH2(rest);
  const rareCancerContent = topics.map((t) => {
    const { content: topicBody, meta: topicMeta } = extractLeadingPropertyTable(t.body);
    const subs = splitH3InTopic(topicBody);
    const list = subs.map((s) => {
      const { content, meta } = splitTrailingPropertyTable(s.body);
      return {
        id: resolveSectionId(meta, s.id),
        subtopic: s.subtopic,
        showInNav: resolveShowInNav(s.subtopic, navTitleSet),
        content,
      };
    });
    return {
      id: resolveSectionId(topicMeta, t.id),
      topic: t.topic,
      showInNav: resolveShowInNav(t.topic, navTitleSet),
      list,
    };
  });

  return {
    ...restFm,
    title,
    RCI_Header,
    RCI_DOWNLOAD_CONFIG: normalizeDownloadConfig(fmDownload),
    rareCancerIntroText,
    navTitles,
    rareCancerContent,
  };
}

export default parseRareCancerMarkdown;
