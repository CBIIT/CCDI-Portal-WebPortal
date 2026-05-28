/**
 * Factory for **`getTabData`** used by Global Search **`SearchResults`** (All tab stitching + per-tab queries).
 */

export function createGetTabData({
  searchText,
  searchCounts,
  queryResultAPI,
  queryAllAPI,
  countValues,
}) {
  return async function getTabData(field, pageSize, currentPage) {
    const isPublic = true;

    if (field === 'all') {
      const count = countValues(searchCounts);
      let data = await queryAllAPI(searchText, (currentPage - 1) * pageSize, pageSize, isPublic);

      if (data && (data.length !== pageSize)) {
        let apiQueries = 0;
        let calcOffset2 = (currentPage - 1) * pageSize + data.length;

        /* eslint-disable no-await-in-loop */
        while (apiQueries < 5 && data.length !== count && calcOffset2 < count && data.length !== pageSize) {
          const data2 = await queryAllAPI(searchText, calcOffset2, pageSize, isPublic);
          data = [...data, ...data2];
          calcOffset2 = (currentPage - 1) * pageSize + data.length;
          apiQueries += 1;
        }
        /* eslint-enable no-await-in-loop */
      }

      return (data || []).slice(0, pageSize);
    }

    const input = {
      input: searchText,
      first: pageSize,
      offset: (currentPage - 1) * pageSize,
    };
    const data = await queryResultAPI(field, input, isPublic);
    return (data || []).slice(0, pageSize);
  };
}
