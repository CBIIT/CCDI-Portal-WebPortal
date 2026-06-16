import React, { useEffect, useState } from 'react';
import { withStyles, Box, Grid } from '@material-ui/core';
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
import searchBackground from './assets/globalSearchBackground.png';
import { queryAllAPI } from './globalSearchTabQuery';
import { createGetTabData } from './globalSearchGetTabData';
import {
  createOnSearchChange,
  createGetSearchSuggestions,
} from './globalSearchSearchBarLogic';

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
  const [searchCounts, setSearchCounts] = useState([]);


  const authCheck = () => isAuthorized || publicAccessEnabled;

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

    if (activeVal === 'inactive') {
      if (isSignedIn && !isAuthorized) {
        //history.push(`/request?redirect=/search/${searchText}`);
        return;
      }
      //history.push(`/login?redirect=/search/${searchText}`);
    }
  };

  const onSearchChange = createOnSearchChange({
    getSearchText: () => searchText,
    setSearchText,
    setSearchCounts,
    queryCountAPI,
    navigate,
  });

  const getSearchSuggestions = createGetSearchSuggestions({
    authCheck,
    queryAutocompleteAPI,
    SEARCH_PAGE_KEYS,
    SEARCH_PAGE_DATAFIELDS,
    setSearchText,
    setSearchCounts,
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
      placeholder: 'e.g. colon, MSB-01068, panitumimab, FFPE, CMB',
      iconType: 'image',
      maxSuggestions: 0,
      minimumInputLength: 0,
    },
    functions: {
      onChange: onSearchChange,
      getSuggestions: getSearchSuggestions,
    },
  });

  const { SearchResults } = SearchResultsGenerator({
    classes,
    config: {
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
        name: 'All',
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
        count: countValues(searchCounts) || 0,
        value: '1',
      },
      {
        name: 'Participants',
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
        count: searchCounts.participant_count || 0,
        value: `2`,
      },
      {
        name: 'Studies',
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
        count: searchCounts.study_count || 0,
        value: `3`,
      },
      {
        name: 'Samples',
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
        count: searchCounts.sample_count || 0,
        value: '4',
      },
      {
        name: 'Files',
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
        count: searchCounts.file_count || 0,
        value: '5',
      },
      {
        name: 'Data Model',
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
        count: searchCounts.model_count || 0,
        value: `6`,
      },
      {
        name: 'About',
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
        count: searchCounts.about_count || 0,
        value: `7`,
      },
    ],
  });

  useEffect(() => {
    queryCountAPI(searchparam, !authCheck()).then((d) => {
      setSearchCounts(d);
    });

  }, []);

  return (
    <>
      <div className={classes.searchArea}>
        <img src={searchBackground} alt="searchBackground" style={{ position: 'absolute', right: '0px', zIndex: -1 }} />
        <Grid container direction="column" alignItems="center" justifyContent="center" className={classes.heroArea}>
          <Grid item>
            <h2 className={classes.searchTitle}>Search Results</h2>
          </Grid>
          <Grid item>
            <SearchBar value={searchText} clearable={!false} />
          </Grid>
        </Grid>
      </div>


      <div className={classes.bodyContainer}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <SearchResults searchText={searchText} />
        </Box>
      </div>
    </>
  );
}

export default withStyles(styles)(searchView);
