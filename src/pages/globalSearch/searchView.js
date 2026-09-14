import React, { useEffect, useRef, useState } from 'react';
import { withStyles, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useNavigate } from 'react-router-dom';
import {
  SearchBarGenerator, SearchResultsGenerator, countValues,
} from '@bento-core/global-search';
import styles from './styles';
import {
  SEARCH_PAGE_DATAFIELDS, SEARCH_PAGE_KEYS,
  queryCountAPI, queryResultAPI, queryAutocompleteAPI,
} from '../../bento/sitesearch';
import { ParticipantCard, AboutCard, StudiesCard, SamplesCard, FilesCard, ModelsCard } from './Cards';
import { useLocation } from 'react-router-dom';
import { queryAllAPI } from './globalSearchTabQuery';
import { createGetTabData } from './globalSearchGetTabData';
import {
  createOnSearchChange,
  createGetSearchSuggestions,
} from './globalSearchSearchBarLogic';

const SEARCH_PLACEHOLDER = 'Search CCDI Hub';

const TEXT_NODE = 3;

/** Thousands-separated count, shared by the tabs, the dropdown and the results total. */
const formatCount = (count) => Number(count).toLocaleString('en-US');

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function searchView(props) {
  const {
    classes,
    isSignedIn, isAuthorized, publicAccessEnabled,
  } = props;

  const query = useQuery();
  const searchparam = query.get("keyword") ? query.get("keyword").trim() : "";
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(searchparam);
  const [searchCounts, setSearchCounts] = useState({});
  // Counts start unknown; pass null tab counts so PaginatedPanel keeps its spinner up.
  const [countsLoading, setCountsLoading] = useState(Boolean(searchparam));
  const [selectedTab, setSelectedTab] = useState('1');
  const searchBarArea = useRef(null);
  const resultsArea = useRef(null);

  const authCheck = () => isAuthorized || publicAccessEnabled;

  // The global search library never forwards its placeholder config to the
  // input, and it remounts the search bar whenever this page re-renders, so the
  // placeholder is applied to the rendered input after every render.
  useEffect(() => {
    const input = searchBarArea.current && searchBarArea.current.querySelector('input');
    if (input && input.placeholder !== SEARCH_PLACEHOLDER) {
      input.placeholder = SEARCH_PLACEHOLDER;
    }
  });

  // The library prints the results total as a raw number, so it is rewritten in
  // the DOM to carry the same thousands separators as the tab counts.
  const formatResultsTotal = () => {
    const container = resultsArea.current;
    if (!container) {
      return;
    }

    const addSeparators = (node) => {
      // Surrounding whitespace is kept; the footer relies on it for spacing.
      const parts = node.textContent.match(/^(\s*)([\d,]+)(\s*)$/);
      if (!parts) {
        return;
      }

      const [, before, number, after] = parts;
      const formatted = `${before}${formatCount(number.replace(/,/g, ''))}${after}`;
      if (node.textContent !== formatted) {
        node.textContent = formatted;
      }
    };

    container.querySelectorAll('[id^="global_search_results_count"]').forEach(addSeparators);
    // The "Showing 1-10 of N" footer holds its numbers in bare text nodes.
    container.querySelectorAll(`.${classes.showingContainer}, .${classes.showingContainer} *`)
      .forEach((element) => {
        element.childNodes.forEach((node) => {
          if (node.nodeType === TEXT_NODE) {
            addSeparators(node);
          }
        });
      });
  };

  useEffect(formatResultsTotal);

  // The library also re-renders the total on its own, e.g. when paging, without
  // re-rendering this page.
  useEffect(() => {
    const container = resultsArea.current;
    if (!container || typeof MutationObserver !== 'function') {
      return undefined;
    }

    const observer = new MutationObserver(formatResultsTotal);
    observer.observe(container, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, []);

  /** Resolved count for tabs/panels; null while counts are still loading (not 0). */
  const resolvedCount = (value) => (countsLoading ? null : (value || 0));

  const tabCounts = {
    all: resolvedCount(countValues(searchCounts)),
    participants: resolvedCount(searchCounts.participant_count),
    studies: resolvedCount(searchCounts.study_count),
    samples: resolvedCount(searchCounts.sample_count),
    files: resolvedCount(searchCounts.file_count),
    model: resolvedCount(searchCounts.model_count),
    about: resolvedCount(searchCounts.about_count),
  };

  /**
   * Build the tab label so the category and the thousands-separated count are
   * styled and spaced here rather than by the global search library.
   *
   * @param {string} name category name
   * @param {number|null} count tab count, null while counts are loading
   * @returns {function} render function for the tab's name
   */
  const tabLabel = (name, count) => () => (
    <span className={classes.tabLabel}>
      <span className={classes.tabCategory}>{name}</span>
      {count != null && (
        <span className={classes.tabCount}>{formatCount(count)}</span>
      )}
    </span>
  );

  /**
   * Handle the tab selection change event, and redirect the user
   * to the login/request page if they are not authorized.
   *
   * @param {object} event change event
   * @param {*} newTab new tab value
   * @returns void
   */
  const onTabChange = (event, newTab) => {
    const activeVal = newTab.split('-')[0];
    setSelectedTab(newTab);

    if (activeVal === 'inactive') {
      if (isSignedIn && !isAuthorized) {
        //history.push(`/request?redirect=/search/${searchText}`);
        return;
      }
      //history.push(`/login?redirect=/search/${searchText}`);
    }
  };

  const onSearchChange = createOnSearchChange({
    getSearchParam: () => searchparam,
    setSearchText,
    setCountsLoading,
    navigate,
  });

  const getSearchSuggestions = createGetSearchSuggestions({
    authCheck,
    queryAutocompleteAPI,
    SEARCH_PAGE_KEYS,
    SEARCH_PAGE_DATAFIELDS,
    setSearchText,
    setSearchCounts,
    setCountsLoading,
  });

  const getTabData = createGetTabData({
    searchText,
    searchCounts,
    queryResultAPI,
    queryAllAPI,
    countValues,
  });

  const { SearchBar } = SearchBarGenerator({
    classes,
    config: {
      placeholder: SEARCH_PLACEHOLDER,
      maxSuggestions: 0,
      minimumInputLength: 0,
      displaySearchIcon: false,
      showSearchButton: true,
      showSearchButtonContent: (
        <>
          <span className={classes.searchButtonText}>Search</span>
          <SearchIcon className={classes.mobileSearchIcon} aria-hidden />
        </>
      ),
    },
    functions: {
      onChange: onSearchChange,
      getSuggestions: getSearchSuggestions,
    },
  });

  const { SearchResults } = SearchResultsGenerator({
    classes,
    config: {
      defaultTab: selectedTab,
      resultCardMap: {
        participants: ParticipantCard,
        studies: StudiesCard,
        samples: SamplesCard,
        files: FilesCard,
        model: ModelsCard,
        about_page: AboutCard,
      },
      showFilterBy: true,
    },
    functions: {
      onTabChange,
      getTabData,
    },
    tabs: [
      {
        name: tabLabel('All', tabCounts.all),
        field: 'all',
        classes: {
          root: classes.allButton,
          wrapper: classes.tabColor,
          totalResults: classes.totalResults,
          totalCount: classes.totalCount,
          subsection: classes.subsection,
          subsectionBody: classes.subsectionBody,
          paginationContainer: classes.paginationContainer,
          perPageContainer: classes.perPageContainer,
          pageSizeContainer: classes.pageSizeContainer,
          pageSizeList: classes.pageSizeList,
          pageSizeItem: classes.pageSizeItem,
          showingContainer: classes.showingContainer,
          showingRangeContainer: classes.showingRangeContainer,
          pageSizeArrowUp: classes.pageSizeArrowUp,
          pageSizeArrowDown: classes.pageSizeArrowDown,
          pageContainer: classes.pageContainer,
          prevButtonContainer: classes.prevButtonContainer,
          prevButtonDisabledContainer: classes.prevButtonDisabledContainer,
          prevButton: classes.prevButton,
          prevButtonDisabled: classes.prevButtonDisabled,
          nextButtonContainer: classes.nextButtonContainer,
          nextButtonDisabledContainer: classes.nextButtonDisabledContainer,
          nextButton: classes.nextButton,
          nextButtonDisabled: classes.nextButtonDisabled,
          noData: classes.noData,
        },
        count: tabCounts.all,
        value: '1',
      },
      {
        name: tabLabel('Participants', tabCounts.participants),
        field: 'participants',
        classes: {
          root: classes.participantButton,
          wrapper: classes.tabColor,
          totalResults: classes.totalResults,
          totalCount: classes.totalCount,
          subsection: classes.subsection,
          subsectionBody: classes.subsectionBody,
          paginationContainer: classes.paginationContainer,
          perPageContainer: classes.perPageContainer,
          pageSizeContainer: classes.pageSizeContainer,
          pageSizeList: classes.pageSizeList,
          showingContainer: classes.showingContainer,
          showingRangeContainer: classes.showingRangeContainer,
          pageSizeArrowUp: classes.pageSizeArrowUp,
          pageSizeArrowDown: classes.pageSizeArrowDown,
          pageContainer: classes.pageContainer,
          prevButtonContainer: classes.prevButtonContainer,
          prevButtonDisabledContainer: classes.prevButtonDisabledContainer,
          prevButton: classes.prevButton,
          prevButtonDisabled: classes.prevButtonDisabled,
          nextButtonContainer: classes.nextButtonContainer,
          nextButtonDisabledContainer: classes.nextButtonDisabledContainer,
          nextButton: classes.nextButton,
          nextButtonDisabled: classes.nextButtonDisabled,
          noData: classes.noData,
        },
        count: tabCounts.participants,
        value: `2`,
      },
      {
        name: tabLabel('Studies', tabCounts.studies),
        field: 'studies',
        classes: {
          root: classes.studiesButton,
          wrapper: classes.tabColor,
          totalResults: classes.totalResults,
          totalCount: classes.totalCount,
          subsection: classes.subsection,
          subsectionBody: classes.subsectionBody,
          paginationContainer: classes.paginationContainer,
          perPageContainer: classes.perPageContainer,
          pageSizeContainer: classes.pageSizeContainer,
          pageSizeList: classes.pageSizeList,
          showingContainer: classes.showingContainer,
          showingRangeContainer: classes.showingRangeContainer,
          pageSizeArrowUp: classes.pageSizeArrowUp,
          pageSizeArrowDown: classes.pageSizeArrowDown,
          pageContainer: classes.pageContainer,
          prevButtonContainer: classes.prevButtonContainer,
          prevButtonDisabledContainer: classes.prevButtonDisabledContainer,
          prevButton: classes.prevButton,
          prevButtonDisabled: classes.prevButtonDisabled,
          nextButtonContainer: classes.nextButtonContainer,
          nextButtonDisabledContainer: classes.nextButtonDisabledContainer,
          nextButton: classes.nextButton,
          nextButtonDisabled: classes.nextButtonDisabled,
          noData: classes.noData,
        },
        count: tabCounts.studies,
        value: `3`,
      },
      {
        name: tabLabel('Samples', tabCounts.samples),
        field: 'samples',
        classes: {
          root: classes.samplesButton,
          wrapper: classes.tabColor,
          totalResults: classes.totalResults,
          totalCount: classes.totalCount,
          subsection: classes.subsection,
          subsectionBody: classes.subsectionBody,
          paginationContainer: classes.paginationContainer,
          perPageContainer: classes.perPageContainer,
          pageSizeContainer: classes.pageSizeContainer,
          pageSizeList: classes.pageSizeList,
          showingContainer: classes.showingContainer,
          showingRangeContainer: classes.showingRangeContainer,
          pageSizeArrowUp: classes.pageSizeArrowUp,
          pageSizeArrowDown: classes.pageSizeArrowDown,
          pageContainer: classes.pageContainer,
          prevButtonContainer: classes.prevButtonContainer,
          prevButtonDisabledContainer: classes.prevButtonDisabledContainer,
          prevButton: classes.prevButton,
          prevButtonDisabled: classes.prevButtonDisabled,
          nextButtonContainer: classes.nextButtonContainer,
          nextButtonDisabledContainer: classes.nextButtonDisabledContainer,
          nextButton: classes.nextButton,
          nextButtonDisabled: classes.nextButtonDisabled,
          noData: classes.noData,
        },
        count: tabCounts.samples,
        value: '4',
      },
      {
        name: tabLabel('Files', tabCounts.files),
        field: 'files',
        classes: {
          root: classes.filesButton,
          wrapper: classes.tabColor,
          totalResults: classes.totalResults,
          totalCount: classes.totalCount,
          subsection: classes.subsection,
          subsectionBody: classes.subsectionBody,
          paginationContainer: classes.paginationContainer,
          perPageContainer: classes.perPageContainer,
          pageSizeContainer: classes.pageSizeContainer,
          pageSizeList: classes.pageSizeList,
          showingContainer: classes.showingContainer,
          showingRangeContainer: classes.showingRangeContainer,
          pageSizeArrowUp: classes.pageSizeArrowUp,
          pageSizeArrowDown: classes.pageSizeArrowDown,
          pageContainer: classes.pageContainer,
          prevButtonContainer: classes.prevButtonContainer,
          prevButtonDisabledContainer: classes.prevButtonDisabledContainer,
          prevButton: classes.prevButton,
          prevButtonDisabled: classes.prevButtonDisabled,
          nextButtonContainer: classes.nextButtonContainer,
          nextButtonDisabledContainer: classes.nextButtonDisabledContainer,
          nextButton: classes.nextButton,
          nextButtonDisabled: classes.nextButtonDisabled,
          noData: classes.noData,
        },
        count: tabCounts.files,
        value: '5',
      },
      {
        name: tabLabel('Data Model', tabCounts.model),
        field: 'model',
        classes: {
          root: classes.aboutButton,
          wrapper: classes.tabColor,
          totalResults: classes.totalResults,
          totalCount: classes.totalCount,
          subsection: classes.subsection,
          subsectionBody: classes.subsectionBody,
          paginationContainer: classes.paginationContainer,
          perPageContainer: classes.perPageContainer,
          pageSizeContainer: classes.pageSizeContainer,
          pageSizeList: classes.pageSizeList,
          showingContainer: classes.showingContainer,
          showingRangeContainer: classes.showingRangeContainer,
          pageSizeArrowUp: classes.pageSizeArrowUp,
          pageSizeArrowDown: classes.pageSizeArrowDown,
          pageContainer: classes.pageContainer,
          prevButtonContainer: classes.prevButtonContainer,
          prevButtonDisabledContainer: classes.prevButtonDisabledContainer,
          prevButton: classes.prevButton,
          prevButtonDisabled: classes.prevButtonDisabled,
          nextButtonContainer: classes.nextButtonContainer,
          nextButtonDisabledContainer: classes.nextButtonDisabledContainer,
          nextButton: classes.nextButton,
          nextButtonDisabled: classes.nextButtonDisabled,
          noData: classes.noData,
        },
        count: tabCounts.model,
        value: `6`,
      },
      {
        name: tabLabel('About', tabCounts.about),
        field: 'about_page',
        classes: {
          root: classes.modelButton,
          wrapper: classes.tabColor,
          totalResults: classes.totalResults,
          totalCount: classes.totalCount,
          subsection: classes.subsection,
          subsectionBody: classes.subsectionBody,
          paginationContainer: classes.paginationContainer,
          perPageContainer: classes.perPageContainer,
          pageSizeContainer: classes.pageSizeContainer,
          pageSizeList: classes.pageSizeList,
          showingContainer: classes.showingContainer,
          showingRangeContainer: classes.showingRangeContainer,
          pageSizeArrowUp: classes.pageSizeArrowUp,
          pageSizeArrowDown: classes.pageSizeArrowDown,
          pageContainer: classes.pageContainer,
          prevButtonContainer: classes.prevButtonContainer,
          prevButtonDisabledContainer: classes.prevButtonDisabledContainer,
          prevButton: classes.prevButton,
          prevButtonDisabled: classes.prevButtonDisabled,
          nextButtonContainer: classes.nextButtonContainer,
          nextButtonDisabledContainer: classes.nextButtonDisabledContainer,
          nextButton: classes.nextButton,
          nextButtonDisabled: classes.nextButtonDisabled,
          noData: classes.noData,
        },
        count: tabCounts.about,
        value: `7`,
      },
    ],
  });

  const categoryOptions = [
    { value: '1', label: 'All', count: tabCounts.all },
    { value: '2', label: 'Participants', count: tabCounts.participants },
    { value: '3', label: 'Studies', count: tabCounts.studies },
    { value: '4', label: 'Samples', count: tabCounts.samples },
    { value: '5', label: 'Files', count: tabCounts.files },
    { value: '6', label: 'Data Model', count: tabCounts.model },
    { value: '7', label: 'About', count: tabCounts.about },
  ];

  const onCategoryChange = (event) => {
    const newTab = event.target.value;
    onTabChange(event, newTab);
  };

  useEffect(() => {
    if (searchparam !== searchText) {
      setSearchText(searchparam);
    }

    if (!searchparam) {
      setSearchCounts({});
      setCountsLoading(false);
      return undefined;
    }

    let cancelled = false;
    setCountsLoading(true);
    queryCountAPI(searchparam, !authCheck()).then((d) => {
      if (cancelled) { return; }
      setSearchCounts(d || {});
      setCountsLoading(false);
    }).catch(() => {
      if (cancelled) { return; }
      setSearchCounts({});
      setCountsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [searchparam]);

  return (
    <>
      <div className={classes.searchArea}>
        <div className={classes.heroArea}>
          <h2 className={classes.searchTitle}>Search Results</h2>
        </div>
        <div className={classes.searchBarArea} ref={searchBarArea}>
          <SearchBar value={searchText} clearable={!false} />
        </div>
        <div className={classes.mobileCategorySelector}>
          <label className={classes.mobileCategoryLabel} htmlFor="global-search-category">
            Search result category
          </label>
          <select
            id="global-search-category"
            className={classes.mobileCategorySelect}
            value={selectedTab}
            onChange={onCategoryChange}
          >
            {categoryOptions.map(({ value, label, count }) => (
              <option value={value} key={value}>
                {count == null ? label : `${label} (${formatCount(count)})`}
              </option>
            ))}
          </select>
          <ExpandMoreIcon className={classes.mobileCategoryIcon} aria-hidden />
        </div>
      </div>


      <div className={classes.bodyContainer} ref={resultsArea}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <div className={classes.searchResultsContainer}>
            <SearchResults searchText={searchText} />
          </div>
        </Box>
      </div>
    </>
  );
}

export default withStyles(styles)(searchView);
