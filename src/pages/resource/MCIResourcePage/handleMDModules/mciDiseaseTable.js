import yaml from 'js-yaml';
import { splitGfmTableRow, isGfmSeparatorRow } from './gfmTableUtils.js';

/* ODS-style GFM: **title** (or ####) + pipe table -> { title, header, body } */
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
 * @returns {{ diseaseTable: object, endExclusive: number } | null}
 */
export function findGfmDiseaseTableRange(lines, startLine) {
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

export function parseAndStripHtmlCommentDiseaseTable(text) {
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
 * mci-disease-table fence: YAML (title, header, body) OR ODS GFM **title** + pipe table.
 * Both load into the same object for MCIDiseaseTable.
 */
export function parseDiseaseTableFenceContent(raw) {
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
