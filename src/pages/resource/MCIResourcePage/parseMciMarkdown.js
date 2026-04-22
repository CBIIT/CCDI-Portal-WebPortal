import matter from 'gray-matter';
import yaml from 'js-yaml';

const WIDGET_LANG = '(mci-disease-table|mci-map|mci-search-table|mci-table|mci-ecosystem)';

const WIDGET_KEY = {
  'mci-disease-table': 'diseaseTable',
  'mci-map': 'map',
  'mci-search-table': 'searchTable',
  'mci-table': 'table',
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

function extractWidgets(text) {
  const re = new RegExp(
    '```' + WIDGET_LANG + '\\s*\\n([\\s\\S]*?)```',
    'gi',
  );
  const out = {
    contentMarkdown: text,
    showEcosystemDiagram: false,
  };
  const matches = [...text.matchAll(re)];
  matches.forEach((m) => {
    const kind = m[1].toLowerCase();
    const raw = m[2];
    if (kind === 'mci-ecosystem') {
      out.showEcosystemDiagram = true;
      const t = raw.trim();
      if (t) {
        try {
          const parsed = yaml.safeLoad(raw);
          if (parsed && typeof parsed === 'object' && parsed.showEcosystemDiagram === false) {
            out.showEcosystemDiagram = false;
          }
        } catch (_e) {
          /* keep true */
        }
      }
      return;
    }
    const key = WIDGET_KEY[kind];
    if (!key) return;
    try {
      out[key] = yaml.safeLoad(raw);
    } catch (e) {
      console.warn('[parseMciMarkdown] widget YAML failed:', kind, e);
    }
  });
  let md = text;
  matches.forEach((m) => {
    md = md.replace(m[0], '\n\n');
  });
  out.contentMarkdown = md.replace(/\n{3,}/g, '\n\n').trim();
  return out;
}

/**
 * Parses a single .md file with YAML front matter and a body structured as:
 * - Optional intro (markdown) before the first ## heading
 * - ## Topic {#optionalId} / ### Subtopic {#optionalId} with markdown + fenced ```mci-*``` widgets
 * @param {string} raw - full file contents
 * @returns {object} Same general shape as mciData.yaml for MCIResourceView: introText, mciContent, plus FM keys
 */
export function parseMciMarkdown(raw) {
  const { data: fm, content: body } = matter(raw || '');
  const { intro: introFromBody, rest } = extractIntroAndRest(body || '');
  const introText =
    fm.introText !== undefined && fm.introText !== null
      ? fm.introText
      : introFromBody;

  const topics = splitH2(rest);
  const mciContent = topics.map((t) => {
    const subs = splitH3InTopic(t.body);
    const list = subs.map((s) => {
      const w = extractWidgets(s.body);
      return {
        id: s.id,
        subtopic: s.subtopic,
        content: w.contentMarkdown,
        diseaseTable: w.diseaseTable,
        map: w.map,
        table: w.table,
        searchTable: w.searchTable,
        showEcosystemDiagram: w.showEcosystemDiagram,
      };
    });
    return {
      id: t.id,
      topic: t.topic,
      list,
    };
  });

  return {
    ...fm,
    introText,
    mciContent,
  };
}

export default parseMciMarkdown;
