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

const LINK_LINE = /^Link(?:\s+\d+)?:\s*(.*)$/i;
const CONTACT_LINE = /^Contact:\s*(.*)$/i;

export function parseToolCardBody(body) {
  const lines = String(body || '').split('\n');
  const descriptionLines = [];
  const tailParts = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const linkMatch = line.match(LINK_LINE);
    if (linkMatch) {
      const prefix = line.slice(0, line.indexOf(':')).trim();
      tailParts.push(`**${prefix}:** ${linkMatch[1].trim()}`);
      continue;
    }
    const contactMatch = line.match(CONTACT_LINE);
    if (contactMatch) {
      tailParts.push(`**Contact:** ${contactMatch[1].trim()}`);
      continue;
    }
    descriptionLines.push(line);
  }

  const description = trimMd(descriptionLines.join('\n'));
  const tail = tailParts.join('\n\n');
  if (description && tail) {
    return `${description}\n\n${tail}`;
  }
  return description || tail;
}

/**
 * Builds ordered side-nav entries from front matter navTitles (topics + tools).
 * Falls back to document order when navTitles is omitted.
 */
export function buildToolsNavItems(navTitles, toolsContent) {
  const content = Array.isArray(toolsContent) ? toolsContent : [];
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

export default function parseToolsMarkdown(rawMarkdown) {
  const source = String(rawMarkdown || '').replace(/^\uFEFF/, '');
  const { data: fm, content: body } = matter(source);
  const {
    title: fmTitle,
    Tools_Header: fmToolsHeader,
    toolsIntroText: legacyIntro,
    navTitles: fmNavTitles,
    toolsNavTitles,
    nav_titles: fmNavTitlesSnake,
    ...restFm
  } = fm;

  const title = String(fmTitle || '').trim();
  const Tools_Header = String(fmToolsHeader || '').trim();
  const rawNavTitles = firstDefined(fmNavTitles, toolsNavTitles, fmNavTitlesSnake);
  const navTitleSet = buildNavTitleSet(rawNavTitles);
  const navTitles = Array.isArray(rawNavTitles) ? rawNavTitles : undefined;

  const { intro: introFromBody, rest } = extractIntroAndRest(body || '');
  const toolsIntroText =
    String(introFromBody || '').trim() !== ''
      ? introFromBody
      : legacyIntro != null
        ? String(legacyIntro)
        : '';

  const topics = splitH2(rest);
  const toolsContent = topics.map((t) => {
    const subs = splitH3InTopic(t.body);
    const list = subs.map((s) => ({
      id: s.id,
      subtopic: s.subtopic,
      showInNav: resolveShowInNav(s.subtopic, navTitleSet),
      content: parseToolCardBody(s.body),
    }));
    return {
      id: t.id,
      topic: t.topic,
      showInNav: resolveShowInNav(t.topic, navTitleSet),
      list,
    };
  });

  return {
    ...restFm,
    title,
    Tools_Header,
    toolsIntroText,
    navTitles,
    toolsContent,
  };
}
