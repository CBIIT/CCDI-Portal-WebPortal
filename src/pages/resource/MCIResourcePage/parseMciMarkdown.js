import matter from 'gray-matter';
import yaml from 'js-yaml';

const WIDGET_LANG = '(mci-disease-table|mci-map|mci-search-table|mci-table|responsive-img)';

const WIDGET_KEY = {
  'mci-disease-table': 'diseaseTable',
  'mci-map': 'map',
  'mci-search-table': 'searchTable',
  'mci-table': 'table',
  'responsive-img': 'responsiveImg',
};

function slugify(text) {
  const s = String(text)
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  return (s || 'section').slice(0, 120);
}

function parseHeadingLine(line, level) {
  const re =
    level === 2
      ? /^##\s+(.+?)(?:\s*\{#([^}]+)\})?\s*$/
      : /^###\s+(.+?)(?:\s*\{#([^}]+)\})?\s*$/;
  const m = line.match(re);
  if (!m) return null;
  return { title: m[1].trim(), id: m[2] || slugify(m[1]) };
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
      cur = p
        ? { title: p.title, id: p.id, lines: [] }
        : { title: line.replace(/^##\s+/, '').trim(), id: slugify(line), lines: [] };
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

function splitH3InTopic(topicBody) {
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
      const p = parseHeadingLine(line, 3);
      cur = p
        ? { subtopic: p.title, id: p.id, lines: [] }
        : {
            subtopic: line.replace(/^###\s+/, '').trim(),
            id: slugify(line),
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
 * - ## / ### with markdown and fenced mci-* widgets; order is preserved via `list[].segments`
 * @param {string} raw - full file contents
 * @returns {object} Same general shape as mciData.yaml for MCIResourceView: introText, mciContent, plus FM keys
 */
export function parseMciMarkdown(raw) {
  const { data: fm, content: body } = matter(raw || '');
  const { intro: introFromBody, rest } = extractIntroAndRest(body || '');
  // ODS-style: intro lives in the markdown body before the first `##` (not in front matter)
  const { introText: _legacyFmIntro, ...restFm } = fm;
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
    mciContent,
  };
}

export default parseMciMarkdown;
