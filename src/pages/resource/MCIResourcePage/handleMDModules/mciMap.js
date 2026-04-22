import yaml from 'js-yaml';
import { splitGfmTableRow, isGfmSeparatorRow } from './gfmTableUtils.js';

/* ODS GFM: **title** (or ####) + 4-col pipe (X, Y, State, Enrolled) -> { title, data } for MapView */
function gfmMapTableToMapObject(tableLines, title) {
  if (!tableLines || tableLines.length < 2) {
    return null;
  }
  const rows = tableLines.map((row) => splitGfmTableRow(row)).filter((r) => r && r.length);
  if (rows.length < 2) {
    return null;
  }
  let dataRows = rows.slice(1);
  if (dataRows[0] && isGfmSeparatorRow(dataRows[0])) {
    dataRows = dataRows.slice(1);
  }
  const data = [];
  dataRows.forEach((r) => {
    if (r.length < 4) {
      return;
    }
    const x = parseFloat(
      String(r[0] == null ? '' : r[0]).replace(/,/g, ''),
    );
    const y = parseFloat(
      String(r[1] == null ? '' : r[1]).replace(/,/g, ''),
    );
    const state = String(r[2] == null ? '' : r[2]).trim();
    const count = parseInt(
      String(r[3] == null ? '' : r[3]).replace(/,/g, ''),
      10,
    );
    if (state && !Number.isNaN(x) && !Number.isNaN(y) && !Number.isNaN(count)) {
      data.push([x, y, state, count]);
    }
  });
  if (data.length === 0) {
    return null;
  }
  return { title, data };
}

/**
 * @returns {{ map: object, endExclusive: number } | null}
 */
export function findGfmMapTableRange(lines, startLine) {
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
    const m = gfmMapTableToMapObject(tableBlock, title);
    if (!m) {
      // eslint-disable-next-line no-continue
      continue;
    }
    const { title: mapTitle, data } = m;
    return { map: { title: mapTitle, data }, endExclusive: j };
  }
  return null;
}

function parseGfmMapFromFragment(text) {
  if (!text || !String(text).includes('|')) {
    return null;
  }
  const lines = text.split('\n');
  const r = findGfmMapTableRange(lines, 0);
  return r ? r.map : null;
}

function isMciMapYamlShape(y) {
  if (!y || typeof y !== 'object' || y.title == null) {
    return false;
  }
  if (!Array.isArray(y.data) || y.data.length === 0) {
    return false;
  }
  const r0 = y.data[0];
  return (
    Array.isArray(r0) && r0.length === 4 && Number.isFinite(Number(r0[0])) && Number.isFinite(Number(r0[1]))
  );
}

/**
 * mci-map fence: YAML (title, data: [[x,y,State,count]...]) OR ODS GFM **title** + 4-col pipe table.
 */
export function parseMciMapFenceContent(raw) {
  const t = String(raw).trim();
  if (!t) {
    return null;
  }
  try {
    const y = yaml.safeLoad(t);
    if (isMciMapYamlShape(y)) {
      return y;
    }
  } catch (_e) {
    /* try GFM */
  }
  return parseGfmMapFromFragment(t);
}

/* <!-- mci-map --> or <!-- mci-map:keyword --> then ODS GFM (preview table) + MapView */
const HTML_MCI_MAP_COMMENT = /^\s*<!--\s*mci-map(?::\s*([a-zA-Z0-9_-]+))?\s*-->\s*$/;

export function parseAndStripHtmlCommentMciMap(text) {
  if (!text || !text.includes('<!--') || !text.includes('mci-map')) {
    return { md: text, map: null };
  }
  const lines = text.split('\n');
  for (let c = 0; c < lines.length; c += 1) {
    if (!HTML_MCI_MAP_COMMENT.test(lines[c])) {
      // eslint-disable-next-line no-continue
      continue;
    }
    let s = c + 1;
    while (s < lines.length && lines[s].trim() === '') {
      s += 1;
    }
    const r = findGfmMapTableRange(lines, s);
    if (!r) {
      console.warn(
        '[parseMciMarkdown] <!-- mci-map --> not followed by **title** + 4-column GFM table (X, Y, State, Enrolled)',
      );
      // eslint-disable-next-line no-continue
      continue;
    }
    const newLines = [...lines.slice(0, c), ...lines.slice(r.endExclusive)];
    return {
      md: newLines.join('\n').replace(/\n{3,}/g, '\n\n').trim(),
      map: r.map,
    };
  }
  return { md: text, map: null };
}
