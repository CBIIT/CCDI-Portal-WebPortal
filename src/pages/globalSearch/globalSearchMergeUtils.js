/**
 * Merge Hub + C3DC Integrated globalSearch entity rows and counts.
 * Pattern mirrors CPI merge (Hub first, Integrated fills / wins on conflict).
 */

export const GLOBAL_SEARCH_ENTITY_FIELDS = [
  'participants',
  'studies',
  'samples',
  'files',
];

export const GLOBAL_SEARCH_COUNT_FIELDS = {
  participants: 'participant_count',
  studies: 'study_count',
  samples: 'sample_count',
  files: 'file_count',
};

const hasMeaningfulValue = (value) => value != null && value !== '';

/**
 * Normalize id-like fields that may be a string or array across Hub/C3DC indices.
 */
export const normalizeGlobalSearchId = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((entry) => String(entry == null ? '' : entry).trim())
      .filter(Boolean)
      .sort()
      .join(',');
  }
  return String(value == null ? '' : value).trim();
};

/**
 * Stable dedupe key per entity type for Hub ↔ C3DC global search rows.
 * Prefer business identifiers (not OpenSearch document `id`) so the same
 * logical record matches across Hub and C3DC clusters.
 */
export const getGlobalSearchDedupKey = (field, row) => {
  if (!row || typeof row !== 'object') {
    return '';
  }
  switch (field) {
    case 'participants': {
      const participantId = normalizeGlobalSearchId(row.participant_id);
      const studyId = normalizeGlobalSearchId(row.study_id);
      if (!participantId) {
        return '';
      }
      return `${participantId}||${studyId}`;
    }
    case 'studies': {
      return normalizeGlobalSearchId(row.study_id);
    }
    case 'samples': {
      const sampleId = normalizeGlobalSearchId(row.sample_id);
      const participantId = normalizeGlobalSearchId(row.participant_id);
      const studyId = normalizeGlobalSearchId(row.study_id);
      if (!sampleId) {
        return '';
      }
      return `${sampleId}||${participantId}||${studyId}`;
    }
    case 'files': {
      // Never key on document `id` — Hub and C3DC assign different ids to the
      // same file. file_id is stable when present; else name + context ids.
      const fileId = normalizeGlobalSearchId(row.file_id);
      if (fileId) {
        return fileId;
      }
      const fileName = normalizeGlobalSearchId(row.file_name);
      const studyId = normalizeGlobalSearchId(row.study_id);
      const participantId = normalizeGlobalSearchId(row.participant_id);
      const sampleId = normalizeGlobalSearchId(row.sample_id);
      if (!fileName) {
        return '';
      }
      return `${fileName}||${studyId}||${participantId}||${sampleId}`;
    }
    default:
      return '';
  }
};

/**
 * Map C3DC Integrated field names onto Hub card field names where they differ.
 */
export const normalizeC3dcGlobalSearchRow = (field, row) => {
  if (!row || typeof row !== 'object') {
    return row;
  }
  if (field === 'studies') {
    return {
      ...row,
      study_status: row.study_status || row.study_phase || '',
    };
  }
  if (field === 'samples') {
    return {
      ...row,
      tumor_classification: row.tumor_classification || row.tumor_spatial_extent || '',
    };
  }
  return { ...row };
};

/**
 * Combine Hub and C3DC rows for one globalSearch entity field.
 * Dedupes with getGlobalSearchDedupKey. On conflict, C3DC non-empty fields win;
 * Hub fills gaps. Optional cpiMerger merges nested cpi_data on participants.
 *
 * @param {string} field
 * @param {Array} hubRows
 * @param {Array} c3dcRows
 * @param {{ mergeCpiData?: Function }} [options]
 */
export const mergeGlobalSearchRows = (field, hubRows = [], c3dcRows = [], options = {}) => {
  const merged = new Map();
  const { mergeCpiData } = options;

  const upsert = (rawRow, preferIncoming) => {
    if (!rawRow || typeof rawRow !== 'object') {
      return;
    }
    const row = preferIncoming ? normalizeC3dcGlobalSearchRow(field, rawRow) : { ...rawRow };
    const key = getGlobalSearchDedupKey(field, row);
    if (!key) {
      return;
    }
    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, {
        ...row,
        data_source: preferIncoming ? 'c3dc' : 'hub',
      });
      return;
    }

    const next = preferIncoming ? { ...existing } : { ...row, ...existing };
    if (preferIncoming) {
      Object.entries(row).forEach(([prop, value]) => {
        if (hasMeaningfulValue(value)) {
          next[prop] = value;
        }
      });
    } else {
      Object.entries(row).forEach(([prop, value]) => {
        if (!hasMeaningfulValue(existing[prop]) && hasMeaningfulValue(value)) {
          next[prop] = value;
        }
      });
    }

    if (field === 'participants' && typeof mergeCpiData === 'function') {
      next.cpi_data = mergeCpiData(
        preferIncoming ? (existing.cpi_data || []) : (row.cpi_data || []),
        preferIncoming ? (row.cpi_data || []) : (existing.cpi_data || []),
      );
    }

    const sources = new Set([
      existing.data_source,
      preferIncoming ? 'c3dc' : 'hub',
    ].filter(Boolean));
    next.data_source = sources.size > 1 ? 'both' : (preferIncoming ? 'c3dc' : 'hub');
    merged.set(key, next);
  };

  (Array.isArray(hubRows) ? hubRows : []).forEach((row) => upsert(row, false));
  (Array.isArray(c3dcRows) ? c3dcRows : []).forEach((row) => upsert(row, true));

  return Array.from(merged.values());
};

/**
 * Sum Hub + C3DC counts for federated entity tabs.
 * model_count is preserved from Hub when present.
 *
 * Prefer refineFederatedCounts when both sides have hits so overlap is
 * removed from the displayed totals for small result sets.
 * About is Fuse.js on WebPortal — not included in these federated sums.
 */
export const mergeGlobalSearchCounts = (hubCounts = {}, c3dcCounts = {}) => {
  const hub = hubCounts && typeof hubCounts === 'object' ? hubCounts : {};
  const c3dc = c3dcCounts && typeof c3dcCounts === 'object' ? c3dcCounts : {};
  const merged = { ...hub };

  Object.values(GLOBAL_SEARCH_COUNT_FIELDS).forEach((countField) => {
    const hubValue = Number(hub[countField]) || 0;
    const c3dcValue = Number(c3dc[countField]) || 0;
    merged[countField] = hubValue + c3dcValue;
  });

  return merged;
};

/**
 * Plan Hub-then-C3DC pagination so tab counts (hub+c3dc) stay aligned with
 * fetchable pages. Same-offset parallel fetches leave trailing pages empty.
 *
 * @param {{ hubCount: number, offset: number, pageSize: number }} args
 * @returns {{ mode: 'hub'|'straddle'|'c3dc', hub: {offset,first}|null, c3dc: {offset,first}|null }}
 */
export const planFederatedPage = ({ hubCount, offset, pageSize }) => {
  const hubCountN = Math.max(0, Number(hubCount) || 0);
  const offsetN = Math.max(0, Number(offset) || 0);
  const pageSizeN = Math.max(1, Number(pageSize) || 10);

  if (offsetN < hubCountN) {
    const hubTake = Math.min(pageSizeN, hubCountN - offsetN);
    const c3dcFill = Math.max(0, pageSizeN - hubTake);
    return {
      mode: c3dcFill > 0 ? 'straddle' : 'hub',
      hub: { offset: offsetN, first: hubTake },
      c3dc: c3dcFill > 0 ? { offset: 0, first: c3dcFill } : null,
    };
  }

  return {
    mode: 'c3dc',
    hub: null,
    c3dc: { offset: offsetN - hubCountN, first: pageSizeN },
  };
};

/**
 * Merge autocomplete buckets for federated entity fields.
 */
export const mergeGlobalSearchAutocomplete = (hubData = {}, c3dcData = {}, options = {}) => {
  const hub = hubData && typeof hubData === 'object' ? hubData : {};
  const c3dc = c3dcData && typeof c3dcData === 'object' ? c3dcData : {};
  const merged = { ...hub };

  GLOBAL_SEARCH_ENTITY_FIELDS.forEach((field) => {
    merged[field] = mergeGlobalSearchRows(field, hub[field], c3dc[field], options);
  });

  return merged;
};

export default {
  GLOBAL_SEARCH_ENTITY_FIELDS,
  GLOBAL_SEARCH_COUNT_FIELDS,
  normalizeGlobalSearchId,
  getGlobalSearchDedupKey,
  normalizeC3dcGlobalSearchRow,
  mergeGlobalSearchRows,
  mergeGlobalSearchCounts,
  planFederatedPage,
  mergeGlobalSearchAutocomplete,
};
