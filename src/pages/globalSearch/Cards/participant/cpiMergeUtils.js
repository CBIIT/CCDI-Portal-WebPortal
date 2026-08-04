/**
 * Dedup key for a CPI synonym row: associated participant + repository/study domain.
 */
export const getCpiDedupKey = (row) => {
  if (!row || typeof row !== 'object') {
    return '';
  }
  const associatedId = String(row.associated_id || '').trim();
  const repository = String(row.repository_of_synonym_id || '').trim();
  if (!associatedId && !repository) {
    return '';
  }
  return `${associatedId}||${repository}`;
};

const hasMeaningfulValue = (value) => value != null && value !== '';

/**
 * Combine Hub globalSearch `cpi_data` with Integrated API `cpi_data`.
 * Dedupes on associated_id + repository_of_synonym_id.
 * When both sources have the same key, Integrated non-empty fields win
 * (they include enrichment like data_type / p_id); Hub fills gaps.
 */
export const mergeCpiData = (hubRows = [], integratedRows = []) => {
  const merged = new Map();

  const upsert = (row, preferIncoming) => {
    if (!row || typeof row !== 'object') {
      return;
    }
    const key = getCpiDedupKey(row);
    if (!key) {
      return;
    }
    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, { ...row });
      return;
    }
    if (preferIncoming) {
      const next = { ...existing };
      Object.entries(row).forEach(([field, value]) => {
        if (hasMeaningfulValue(value)) {
          next[field] = value;
        }
      });
      merged.set(key, next);
      return;
    }
    const next = { ...row, ...existing };
    Object.entries(row).forEach(([field, value]) => {
      if (!hasMeaningfulValue(existing[field]) && hasMeaningfulValue(value)) {
        next[field] = value;
      }
    });
    merged.set(key, next);
  };

  (Array.isArray(hubRows) ? hubRows : []).forEach((row) => upsert(row, false));
  (Array.isArray(integratedRows) ? integratedRows : []).forEach((row) => upsert(row, true));

  return Array.from(merged.values());
};

export default {
  getCpiDedupKey,
  mergeCpiData,
};
