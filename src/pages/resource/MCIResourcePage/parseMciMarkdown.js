import matter from 'gray-matter';
import yaml from 'js-yaml';

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

/** Case-insensitive key for matching front matter navTitles to ### headings. */
export function normalizeNavTitleKey(title) {
  return stripMarkdownHeadingBraceId(String(title || ''))
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

/**
 * @param {string[]|undefined|null} raw - YAML navTitles from front matter
 * @returns {Set<string>|null} null when metadata omitted (show all ### in nav)
 */
export function buildNavTitleSet(raw) {
  if (raw === undefined || raw === null) {
    return null;
  }
  if (!Array.isArray(raw)) {
    return new Set();
  }
  return new Set(
    raw
      .map((entry) => normalizeNavTitleKey(entry))
      .filter((key) => key.length > 0),
  );
}

export function resolveShowInNav(subtopic, navTitleSet) {
  if (navTitleSet === null) {
    return true;
  }
  return navTitleSet.has(normalizeNavTitleKey(subtopic));
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

const WIDGET_LANG = '(mci-disease-table|mci-map|mci-search-table|mci-table|responsive-img)';

const WIDGET_KEY = {
  'mci-disease-table': 'diseaseTable',
  'mci-map': 'map',
  'mci-search-table': 'searchTable',
  'mci-table': 'table',
  'responsive-img': 'responsiveImg',
};

function parseHeadingLine(line, level) {
  const re = level === 2 ? /^##\s+(.+)$/ : /^###\s+(.+)$/;
  const m = line.match(re);
  if (!m) return null;
  const rawInner = m[1];
  const title = stripMarkdownHeadingBraceId(rawInner);
  return { title, id: slugifyHeadingId(rawInner) };
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

/** True when a ### section has no prose/widgets yet (only blanks or absorbed ### lines). */
function h3SectionHasSubstantiveContent(lines) {
  return lines.some((line) => {
    const t = line.trim();
    return t && !/^###\s/.test(t);
  });
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
        if (!h3SectionHasSubstantiveContent(cur.lines)) {
          cur.lines.push(line);
        } else {
          pushH3Sub(subs, cur);
          const p = parseHeadingLine(line, 3);
          const rawH3 = line.replace(/^###\s+/, '').trim();
          cur = p
            ? { subtopic: p.title, id: p.id, lines: [] }
            : {
                subtopic: stripMarkdownHeadingBraceId(rawH3),
                id: slugifyHeadingId(rawH3),
                lines: [],
              };
        }
      } else {
        const p = parseHeadingLine(line, 3);
        const rawH3 = line.replace(/^###\s+/, '').trim();
        cur = p
          ? { subtopic: p.title, id: p.id, lines: [] }
          : {
              subtopic: stripMarkdownHeadingBraceId(rawH3),
              id: slugifyHeadingId(rawH3),
              lines: [],
            };
      }
    } else if (cur) {
      cur.lines.push(line);
    }
  }
  if (cur) {
    pushH3Sub(subs, cur);
  }
  return subs;
}

function trimMd(s) {
  return String(s || '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Walks a ### subtopic body in source order: markdown runs and ` ```${lang}` widgets alternate.
 * @returns {Array<{ type: 'markdown', markdown: string }|{ type: 'widget', widget: string, data: * }>}
 */
function buildSegments(body) {
  const rawText = String(body || '');
  const re = new RegExp(
    '```' + WIDGET_LANG + '\\s*\\n([\\s\\S]*?)```',
    'gi',
  );
  const matches = [];
  let m;
  while ((m = re.exec(rawText)) !== null) {
    matches.push(m);
  }
  const segments = [];
  let lastIndex = 0;
  for (let j = 0; j < matches.length; j += 1) {
    m = matches[j];
    const full = m[0];
    const kind = m[1].toLowerCase();
    const fenceBody = m[2];
    const start = m.index;
    if (start > lastIndex) {
      const chunk = trimMd(rawText.slice(lastIndex, start));
      if (chunk) {
        segments.push({ type: 'markdown', markdown: chunk });
      }
    }
    const widget = WIDGET_KEY[kind];
    if (widget) {
      try {
        segments.push({ type: 'widget', widget, data: yaml.safeLoad(fenceBody) });
      } catch (e) {
        console.warn('[parseMciMarkdown] widget YAML failed:', kind, e);
      }
    }
    lastIndex = start + full.length;
  }
  if (lastIndex < rawText.length) {
    const chunk = trimMd(rawText.slice(lastIndex));
    if (chunk) {
      segments.push({ type: 'markdown', markdown: chunk });
    }
  }
  return segments;
}

/**
 * Caption for a `responsive-img` block: `Caption` (or `caption`) in YAML, then legacy
 * `MCI_Workflow_Diagram_Caption` in the block, else front matter `MCI_Workflow_Diagram_Caption`.
 * @param {object|undefined} responsiveImg
 * @param {object|undefined} data
 */
export function resolveResponsiveImgCaption(responsiveImg, data) {
  if (!responsiveImg) {
    return null;
  }
  if (responsiveImg.Caption != null) {
    return responsiveImg.Caption;
  }
  if (responsiveImg.caption != null) {
    return responsiveImg.caption;
  }
  if (responsiveImg.MCI_Workflow_Diagram_Caption != null) {
    return responsiveImg.MCI_Workflow_Diagram_Caption;
  }
  if (data && data.MCI_Workflow_Diagram_Caption != null) {
    return data.MCI_Workflow_Diagram_Caption;
  }
  return null;
}

/**
 * Parses a single .md file with YAML front matter and a body structured as:
 * - Optional lead prose (markdown) in the body before the first `##` (ODS style; legacy `introText` in front matter is still read if the body has no lead)
 * - ## / ### with markdown and fenced mci-* widgets; order is preserved via `list[].segments`.
 *   Topic/subtopic ids are generated from heading titles (hyphen-separated slugs); optional `{#…}` in source is ignored for ids.
 *   Front matter `navTitles` lists ### headings that appear in the left nav (`showInNav`). Consecutive ### with no body between are merged for content; only the first heading is used for nav matching.
 * @param {string} raw - full file contents
 * @returns {object} Same general shape as mciData.yaml for MCIResourceView: introText, mciContent, plus FM keys
 */
export function parseMciMarkdown(raw) {
  const { data: fm, content: body } = matter(raw || '');
  const { intro: introFromBody, rest } = extractIntroAndRest(body || '');
  // ODS-style: intro lives in the markdown body before the first `##` (not in front matter)
  const {
    introText: _legacyFmIntro,
    navTitles: fmNavTitles,
    mciNavTitles,
    nav_titles: fmNavTitlesSnake,
    ...restFm
  } = fm;
  const rawNavTitles = firstDefined(fmNavTitles, mciNavTitles, fmNavTitlesSnake);
  const navTitleSet = buildNavTitleSet(rawNavTitles);
  const navTitles = Array.isArray(rawNavTitles) ? rawNavTitles : undefined;
  const introText =
    String(introFromBody || '').trim() !== ''
      ? introFromBody
      : _legacyFmIntro != null
        ? _legacyFmIntro
        : '';

  const topics = splitH2(rest);
  const mciContent = topics.map((t) => {
    const subs = splitH3InTopic(t.body);
    const list = subs.map((s) => ({
      id: s.id,
      subtopic: s.subtopic,
      showInNav: resolveShowInNav(s.subtopic, navTitleSet),
      segments: buildSegments(s.body),
    }));
    return {
      id: t.id,
      topic: t.topic,
      list,
    };
  });

  return {
    ...restFm,
    introText,
    navTitles,
    mciContent,
  };
}

export default parseMciMarkdown;
