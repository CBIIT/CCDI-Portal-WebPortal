/** GFM pipe-table row helpers (shared by mci-disease-table and mci-map) */

export function splitGfmTableRow(line) {
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

export function isGfmSeparatorRow(cells) {
  if (!cells || !cells.length) return false;
  return cells.every((c) => /^\s*:?-{2,}\s*:?\s*$/.test(String(c).trim()));
}
