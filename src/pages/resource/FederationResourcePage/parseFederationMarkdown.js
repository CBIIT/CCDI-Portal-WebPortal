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

/** Legacy-style section ids (e.g. Data_Access). */
export function topicToSectionId(topic) {
  return stripMarkdownHeadingBraceId(topic)
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '');
}

function parseHeadingLine(line) {
  const m = line.match(/^##\s+(.+)$/);
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
      const p = parseHeadingLine(line);
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

/**
 * Builds ordered side-nav entries from front matter navTitles.
 * Falls back to document order when navTitles is omitted.
 */
export function buildFederationNavItems(navTitles, federationContent) {
  const content = Array.isArray(federationContent) ? federationContent : [];
  if (!Array.isArray(navTitles) || navTitles.length === 0) {
    return content.map((topic) => ({
      id: topic.id,
      label: topic.topic,
      isSubtitle: false,
    }));
  }

  const topicByKey = new Map();
  content.forEach((topic) => {
    topicByKey.set(normalizeNavTitleKey(topic.topic), topic);
  });

  return navTitles
    .map((title) => {
      const topic = topicByKey.get(normalizeNavTitleKey(title));
      if (topic) {
        return { id: topic.id, label: topic.topic, isSubtitle: false };
      }
      return null;
    })
    .filter(Boolean);
}

export default function parseFederationMarkdown(rawMarkdown) {
  const source = String(rawMarkdown || '').replace(/^\uFEFF/, '');
  const { data: fm, content: body } = matter(source);
  const {
    title: fmTitle,
    Federation_Header: fmFederationHeader,
    CCDI_Federation_Data_Access: fmDataAccessImg,
    federationIntroText: legacyIntro,
    navTitles: fmNavTitles,
    federationNavTitles,
    nav_titles: fmNavTitlesSnake,
    ...restFm
  } = fm;

  const title = String(fmTitle || '').trim();
  const Federation_Header = String(fmFederationHeader || '').trim();
  const CCDI_Federation_Data_Access = String(fmDataAccessImg || '').trim();
  const rawNavTitles = firstDefined(fmNavTitles, federationNavTitles, fmNavTitlesSnake);
  const navTitleSet = buildNavTitleSet(rawNavTitles);
  const navTitles = Array.isArray(rawNavTitles) ? rawNavTitles : undefined;

  const { intro: introFromBody, rest } = extractIntroAndRest(body || '');
  const federationIntroText =
    String(introFromBody || '').trim() !== ''
      ? introFromBody
      : legacyIntro != null
        ? String(legacyIntro)
        : '';

  const topics = splitH2(rest);
  const federationContent = topics.map((t) => ({
    id: t.id,
    topic: t.topic,
    showInNav: resolveShowInNav(t.topic, navTitleSet),
    content: t.body,
  }));

  return {
    ...restFm,
    title,
    Federation_Header,
    CCDI_Federation_Data_Access,
    federationIntroText,
    navTitles,
    federationContent,
  };
}
