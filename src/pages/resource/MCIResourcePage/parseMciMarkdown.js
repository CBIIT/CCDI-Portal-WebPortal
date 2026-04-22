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

/* ODS-style GFM inside mci-disease-table fence: **title** (or ####) + pipe table -> { title, header, body } */
function splitGfmTableRow(line) {
  if (!/^\s*\|/.test(line)) return null;
  const parts = String(line)
    .trim()
    .split('|')
    .map((c) => c.trim());
  if (parts[0] === '' && parts[parts.length - 1] === '') {
    return parts.slice(1, -1);
  }
  if (parts[0] === '') {
    return parts.slice(1);
  }
  return parts;
}

function isGfmSeparatorRow(cells) {
  if (!cells || !cells.length) return false;
  return cells.every((c) => /^\s*:?-{2,}\s*:?\s*$/.test(String(c).trim()));
}

function gfmTableBlockToDisease(tableLines, title) {
  if (!tableLines || tableLines.length < 2) return null;
  const rows = tableLines.map((row) => splitGfmTableRow(row)).filter((r) => r && r.length);
  if (rows.length < 2) return null;
  const header = rows[0].map((c) => (c == null ? '' : String(c)));
  let dataRows = rows.slice(1);
  if (dataRows[0] && isGfmSeparatorRow(dataRows[0])) {
    dataRows = dataRows.slice(1);
  }
  const body = [];
  dataRows.forEach((r) => {
    if (r.length < 2) {
      return;
    }
    let name;
    let valRaw;
    if (r.length >= 3) {
      name = (r[1] != null ? r[1] : '').trim();
      valRaw = r[2];
    } else {
      name = (r[0] != null ? r[0] : '').trim();
      valRaw = r[1];
    }
    const n = String(valRaw)
      .replace(/,/g, '')
      .trim();
    const value = parseInt(n, 10);
    if (name && !Number.isNaN(value)) {
      body.push({ name, value });
    }
  });
  if (body.length === 0) {
    return null;
  }
  return { title, header, body };
}

/**
 * @returns {{ diseaseTable: object, endExclusive: number } | null} endExclusive = line index after last table row (for stripping)
 */
function findGfmDiseaseTableRange(lines, startLine) {
  for (let i = startLine; i < lines.length; i += 1) {
    const t = lines[i].trim();
    const boldTitle = t.match(/^\*\*(.+)\*\*$/);
    const h4 = t.match(/^####\s+(.+)$/);
    let title = null;
    if (boldTitle) {
      title = boldTitle[1].trim();
    } else if (h4) {
      title = h4[1].trim();
    }
    if (!title) {
      // eslint-disable-next-line no-continue
      continue;
    }
    let j = i + 1;
    while (j < lines.length && lines[j].trim() === '') {
      j += 1;
    }
    if (j >= lines.length || !lines[j].includes('|')) {
      // eslint-disable-next-line no-continue
      continue;
    }
    const tableBlock = [];
    while (j < lines.length && /^\s*\|/.test(lines[j])) {
      tableBlock.push(lines[j]);
      j += 1;
    }
    if (tableBlock.length < 2) {
      // eslint-disable-next-line no-continue
      continue;
    }
    const diseaseTable = gfmTableBlockToDisease(tableBlock, title);
    if (!diseaseTable) {
      // eslint-disable-next-line no-continue
      continue;
    }
    return { diseaseTable, endExclusive: j };
  }
  return null;
}

function parseGfmDiseaseFromFragment(text) {
  if (!text || !String(text).includes('|')) {
    return null;
  }
  const lines = text.split('\n');
  const r = findGfmDiseaseTableRange(lines, 0);
  return r ? r.diseaseTable : null;
}

/* <!-- mci-disease-table --> or <!-- mci-disease-table:keyword --> then ODS GFM (preview renders table) */
const HTML_MCI_DISEASE_COMMENT =
  /^\s*<!--\s*mci-disease-table(?::\s*([a-zA-Z0-9_-]+))?\s*-->\s*$/;

function parseAndStripHtmlCommentDiseaseTable(text) {
  if (!text || !text.includes('<!--') || !text.includes('mci-disease-table')) {
    return { md: text, diseaseTable: null };
  }
  const lines = text.split('\n');
  for (let c = 0; c < lines.length; c += 1) {
    if (!HTML_MCI_DISEASE_COMMENT.test(lines[c])) {
      // eslint-disable-next-line no-continue
      continue;
    }
    let s = c + 1;
    while (s < lines.length && lines[s].trim() === '') {
      s += 1;
    }
    const r = findGfmDiseaseTableRange(lines, s);
    if (!r) {
      console.warn(
        '[parseMciMarkdown] <!-- mci-disease-table --> not followed by **title** + GFM table',
      );
      // eslint-disable-next-line no-continue
      continue;
    }
    const newLines = [...lines.slice(0, c), ...lines.slice(r.endExclusive)];
    return {
      md: newLines.join('\n').replace(/\n{3,}/g, '\n\n').trim(),
      diseaseTable: r.diseaseTable,
    };
  }
  return { md: text, diseaseTable: null };
}

/**
 * mci-disease-table fence: YAML (title, header, body) OR ODS GFM **title** + 3-col pipe table.
 * Both load into the same object for MCIDiseaseTable.
 */
function parseDiseaseTableFenceContent(raw) {
  const t = String(raw).trim();
  if (!t) {
    return null;
  }
  try {
    const y = yaml.safeLoad(t);
    if (y && typeof y === 'object' && !Array.isArray(y) && Array.isArray(y.body) && y.body.length) {
      if (y.body[0] && (y.body[0].name !== undefined || y.body[0].value !== undefined)) {
        return y;
      }
    }
  } catch (_e) {
    /* try GFM */
  }
  return parseGfmDiseaseFromFragment(t);
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
      if (raw.trim()) {
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
    if (kind === 'mci-disease-table') {
      out.diseaseTable = parseDiseaseTableFenceContent(raw);
      if (!out.diseaseTable) {
        console.warn(
          '[parseMciMarkdown] mci-disease-table: use YAML (title, header, body) or ODS GFM (bold title + pipe table)',
        );
      }
      return;
    }
    const key = WIDGET_KEY[kind];
    if (!key) {
      return;
    }
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
  if (!out.diseaseTable) {
    const commentDt = parseAndStripHtmlCommentDiseaseTable(out.contentMarkdown);
    if (commentDt.diseaseTable) {
      out.diseaseTable = commentDt.diseaseTable;
      out.contentMarkdown = commentDt.md;
    }
  }
  return out;
}

/**
 * Parses a single .md file with YAML front matter and a body structured as:
 * - Optional lead prose (markdown) in the body before the first `##` (ODS style; legacy `introText` in front matter is still read if the body has no lead)
 * - Disease table: (1) `<!-- mci-disease-table -->` or `<!-- mci-disease-table:keyword -->` + GFM table in preview, or (2) legacy `mci-disease-table` fence with YAML/GFM. Other widgets: YAML fences
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
    ...restFm,
    introText,
    mciContent,
  };
}

export default parseMciMarkdown;
