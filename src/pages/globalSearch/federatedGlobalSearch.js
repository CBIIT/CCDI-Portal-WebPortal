/**
 * Hub + C3DC federation helpers: unique merge when result sets are small enough,
 * Hub-then-C3DC concatenation otherwise.
 */
import {
  GLOBAL_SEARCH_COUNT_FIELDS,
  GLOBAL_SEARCH_ENTITY_FIELDS,
  getGlobalSearchDedupKey,
  mergeGlobalSearchCounts,
  mergeGlobalSearchRows,
  planFederatedPage,
} from './globalSearchMergeUtils';

/**
 * When hubCount + c3dcCount is at or below this, fetch both full result sets,
 * dedupe, and use the unique length for counts + pagination.
 * Sized to cover study-scoped participant/sample/file tabs (often a few hundred
 * each side) without pulling whole-catalog searches into the browser.
 */
export const FEDERATED_UNIQUE_MERGE_MAX = 2500;

/** @type {Map<string, { rows: Array, ts: number }>} */
const uniqueMergeCache = new Map();

const cacheKey = (field, searchInput) => `${field}::${String(searchInput || '')}`;

export const clearFederatedUniqueMergeCache = () => {
  uniqueMergeCache.clear();
};

export const canUniqueMergeFederatedField = (hubCount, c3dcCount) => {
  const hub = Math.max(0, Number(hubCount) || 0);
  const c3dc = Math.max(0, Number(c3dcCount) || 0);
  // Only when both sides have hits can Hub↔C3DC overlap inflate counts.
  return hub > 0 && c3dc > 0 && (hub + c3dc) <= FEDERATED_UNIQUE_MERGE_MAX;
};

/**
 * Build (or reuse) the fully deduped Hub+C3DC row list for one entity field.
 */
export async function loadUniqueFederatedRows({
  field,
  searchInput,
  hubCount,
  c3dcCount,
  fetchHubRows,
  fetchC3dcRows,
  mergeOptions,
}) {
  if (!canUniqueMergeFederatedField(hubCount, c3dcCount)) {
    return null;
  }

  const key = cacheKey(field, searchInput);
  const cached = uniqueMergeCache.get(key);
  if (cached) {
    return cached.rows;
  }

  const hubFirst = Math.max(Number(hubCount) || 0, 1);
  const c3dcFirst = Math.max(Number(c3dcCount) || 0, 1);
  const [hubRows, c3dcRows] = await Promise.all([
    fetchHubRows({ input: searchInput, first: hubFirst, offset: 0 }),
    fetchC3dcRows({ input: searchInput, first: c3dcFirst, offset: 0 }),
  ]);
  const rows = mergeGlobalSearchRows(field, hubRows, c3dcRows, mergeOptions);
  uniqueMergeCache.set(key, { rows, ts: Date.now() });
  return rows;
}

/**
 * Refine summed counts to unique lengths for fields small enough to full-merge.
 */
export async function refineFederatedCounts({
  hubCounts,
  c3dcCounts,
  searchInput,
  fetchHubRows,
  fetchC3dcRows,
  mergeOptions,
}) {
  const merged = mergeGlobalSearchCounts(hubCounts, c3dcCounts);

  await Promise.all(GLOBAL_SEARCH_ENTITY_FIELDS.map(async (field) => {
    const countField = GLOBAL_SEARCH_COUNT_FIELDS[field];
    const hubCount = Number(hubCounts && hubCounts[countField]) || 0;
    const c3dcCount = Number(c3dcCounts && c3dcCounts[countField]) || 0;
    if (!canUniqueMergeFederatedField(hubCount, c3dcCount)) {
      return;
    }
    const rows = await loadUniqueFederatedRows({
      field,
      searchInput,
      hubCount,
      c3dcCount,
      fetchHubRows: (vars) => fetchHubRows(field, vars),
      fetchC3dcRows: (vars) => fetchC3dcRows(field, vars),
      mergeOptions,
    });
    if (rows) {
      merged[countField] = rows.length;
    }
  }));

  return merged;
}

/**
 * Page federated results with unique merge when possible; otherwise Hub-then-C3DC.
 */
export async function fetchFederatedPage({
  field,
  searchInput,
  pageSize,
  offset,
  hubCount,
  c3dcCount,
  fetchHubRows,
  fetchC3dcRows,
  mergeOptions,
}) {
  const uniqueRows = await loadUniqueFederatedRows({
    field,
    searchInput,
    hubCount,
    c3dcCount,
    fetchHubRows,
    fetchC3dcRows,
    mergeOptions,
  });

  if (uniqueRows) {
    return uniqueRows.slice(offset, offset + pageSize);
  }

  const plan = planFederatedPage({ hubCount, offset, pageSize });

  if (plan.mode === 'c3dc') {
    const c3dcRows = await fetchC3dcRows({
      input: searchInput,
      first: plan.c3dc.first,
      offset: plan.c3dc.offset,
    });
    return mergeGlobalSearchRows(field, [], c3dcRows, mergeOptions);
  }

  const hubRows = await fetchHubRows({
    input: searchInput,
    first: plan.hub.first,
    offset: plan.hub.offset,
  });

  if (plan.mode === 'hub') {
    return mergeGlobalSearchRows(field, hubRows, [], mergeOptions);
  }

  const c3dcRows = await fetchC3dcRows({
    input: searchInput,
    first: plan.c3dc.first,
    offset: plan.c3dc.offset,
  });
  const hubKeys = new Set(
    hubRows.map((row) => getGlobalSearchDedupKey(field, row)).filter(Boolean),
  );
  const c3dcOnly = mergeGlobalSearchRows(field, [], c3dcRows, mergeOptions)
    .filter((row) => !hubKeys.has(getGlobalSearchDedupKey(field, row)));

  return [
    ...mergeGlobalSearchRows(field, hubRows, [], mergeOptions),
    ...c3dcOnly,
  ].slice(0, pageSize);
}
