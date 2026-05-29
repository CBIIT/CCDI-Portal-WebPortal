/**
 * Search bar callbacks for Global Search — extracted for unit tests and **`searchView`** wiring.
 */

export function createOnSearchChange({
  getSearchText,
  setSearchText,
  setSearchCounts,
  queryCountAPI,
  navigate,
}) {
  return (value) => {
    if (!value || typeof value !== 'string') {
      return;
    }
    if (value === getSearchText()) {
      return;
    }
    if (value.trim() === '') {
      return;
    }

    queryCountAPI(value).then((d) => {
      setSearchText(value);
      setSearchCounts(d);
      navigate(`/sitesearch?keyword=${value}`);
    });
  };
}

export function createGetSearchSuggestions({
  authCheck,
  queryAutocompleteAPI,
  SEARCH_PAGE_KEYS,
  SEARCH_PAGE_DATAFIELDS,
  setSearchText,
  setSearchCounts,
}) {
  return async (_config, value, _reason) => {
    if (!value || typeof value !== 'string') {
      setSearchText('');
      setSearchCounts([]);
      return [];
    }
    if (value.trim() === '') {
      return [];
    }

    const authed = authCheck();
    const res = await queryAutocompleteAPI(value, !authed);
    const mapOption = (authed ? SEARCH_PAGE_KEYS.private : SEARCH_PAGE_KEYS.public).map(
      (key, index) => res[key].map(
        (id) => (id[authed
          ? SEARCH_PAGE_DATAFIELDS.private[index]
          : SEARCH_PAGE_DATAFIELDS.public[index]]),
      ),
    );
    const option = mapOption.length > 0
      ? mapOption.reduce((acc = [], iterator) => [...acc, ...iterator]) : [];

    return [...[value.toUpperCase()], ...option];
  };
}
