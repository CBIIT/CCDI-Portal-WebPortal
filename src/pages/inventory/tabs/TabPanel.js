import React, { useState, useCallback } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { 
  TableContextProvider,
  TableView,
  Wrapper,
} from '@bento-core/paginated-table';
import { useNavigate } from 'react-router-dom';
import styles from './TabStyle';
import { themeConfig } from './tableConfig/Theme';
import { configColumn } from './tableConfig/Column';
import { configWrapper, wrapperConfig } from './wrapperConfig/Wrapper';
import { customTheme } from './wrapperConfig/Theme';
import { queryParams } from '../../../bento/dashTemplate';
import { GET_FILENAMES_QUERY } from '../../../bento/dashboardTabData';


const TabView = (props) => {
  /**
  * initialize state for useReducer
  * @param {*} initailState
  * @returns reducer state
  */
  const {
    config,
    dashboardStats,
    activeFilters,
    unknownAgesState,
    classes,
    activeTab,
    tab,
  } = props;

  // Helper function to merge unknownAges parameters into activeFilters
  const getFiltersWithUnknownAges = useCallback(() => {
    if (!activeFilters) return {};
    
    const mergedFilters = { ...activeFilters };
    
    // Add unknownAges parameters from unknownAgesState
    if (unknownAgesState) {
      const ageParams = [
        'age_at_diagnosis',
        'age_at_treatment_start',
        'age_at_response',
        'age_at_last_known_survival_status',
        'participant_age_at_collection'
      ];
      
      ageParams.forEach(param => {
        const unknownAgesKey = `${param}_unknownAges`;
        if (unknownAgesState[param] && unknownAgesState[param] !== 'include') {
          mergedFilters[unknownAgesKey] = [unknownAgesState[param]];
        }
      });
    }
    
    return mergedFilters;
  }, [activeFilters, unknownAgesState]);

  // State for file search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResultCount, setSearchResultCount] = useState(null);
  const [columnState, setColumnState] = useState(null);
  const isFilesTab = config.paginationAPIField === 'fileOverview';
  /*
  * useReducer table state
  * paginated table update data when state change
  */
  /**
  * Server Pagination Table Configuration
  * 1. title - (Required) table name (Case, Sample, Files), required for class name
  * 2. query/api - (Required) GraphQL Query for paginated Table (e.g. GET_CASES_OVERVIEW_QUERY)
  * 3. dataKey - (Required) Tracking selected rows (case - dataKey: 'subject_id')
  * 4. sortBy - (Required) default sort column
  * 5. columns - (Required) columns defined by dashboardTabData (tabContainers)
  * (see configColumn method for customRedering)
  * 6. tableMsg - (Required) Display noMatch Msg
  * 7. theme - (Optional) override style with themeprovider use ClassName provided by
  * bento-core table to apply style (refer to class name table)
  * 8. paginationAPIField - (Required) Access http response data - defined by
  * dashboardTabData (tabContainers)
  * eg. case tab paginationAPIField: 'subjectOverview' - {subjectOverview: [data]}
  * 9. extendedViewConfig - (Optional) table view config, set hide/diaply pagination above table header
  * 10. extendedViewConfig: (Optional) config to add (pagination on top of the table, manage Column view)
  * 11. selectedRows: (Optional) provides ids of the selected row (id defined by dataKey)
  * 12. themeConfig - (optional) configure table style
  */
  // Handler for file search
  const handleFileSearch = useCallback((term) => {
    setSearchTerm(term);
    // Reset count when search term changes
    if (!term) {
      setSearchResultCount(null);
    }
  }, []);

  // Handler for search result count update
  const handleSearchResultCount = useCallback((count) => {
    setSearchResultCount(count);
  }, []);

  // Handler for column state change
  const handleColumnStateChange = useCallback((columns) => {
    setColumnState(columns);
  }, []);

  // Determine which query to use based on search state
  const getQuery = () => {
    if (isFilesTab && searchTerm) {
      return GET_FILENAMES_QUERY;
    }
    return config.api;
  };

  // Determine pagination API field based on search state
  const getPaginationAPIField = () => {
    if (isFilesTab && searchTerm) {
      return 'getFilenames';
    }
    return config.paginationAPIField;
  };

  // Determine query variables based on search state
  const getQueryVariables = () => {
    const filtersWithUnknownAges = getFiltersWithUnknownAges();
    
    if (isFilesTab && searchTerm) {
      // Merge activeFilters with the filename search parameter
      return { 
        ...filtersWithUnknownAges,
        filename: searchTerm 
      };
    }
    return filtersWithUnknownAges;
  };

  const initTblState = (initailState) => ({
    ...initailState,
    title: config.name,
    query: getQuery(),
    paginationAPIField: getPaginationAPIField(),
    dataKey: config.dataKey,
    columns: columnState || configColumn(config.columns),
    count: dashboardStats[config.count],
    selectedRows: [],
    hiddenSelectedRows: [],
    hiddenDataKeys: ['id','participant_id', 'study_id'],
    enableRowSelection: config.enableRowSelection,
    tableMsg: config.tableMsg,
    sortBy: config.defaultSortField,
    sortOrder: config.defaultSortDirection,
    extendedViewConfig: config.extendedViewConfig,
    rowsPerPageOptions: [50, 100],
    rowsPerPage: 50,
    page: 0,
    downloadFileName: tab.downloadFileName,
  });

  const navigate = useNavigate();
  
  const handleNavigate = (url) => {
    navigate(url);
  };

  return (
    <TableContextProvider>
      <Wrapper
        wrapConfig={configWrapper(config, wrapperConfig)}
        customTheme={customTheme}
        classes={classes}
        section={config.name}
        activeFilters={getFiltersWithUnknownAges()}
        fileCount={dashboardStats['numberOfFiles']}
      >
        <Grid container>
          <Grid item xs={12} id={config.tableID}>
            <TableView
              key={`${config.tableID}-${searchTerm}`}
              initState={initTblState}
              themeConfig={themeConfig}
              queryVariables={getQueryVariables()}
              totalRowCount={searchResultCount !== null ? searchResultCount : dashboardStats[config.count]}
              activeTab={activeTab}
              queryParams={queryParams}
              navigation={handleNavigate}
              onSearch={isFilesTab ? handleFileSearch : undefined}
              searchValue={searchTerm}
              onSearchResultCount={isFilesTab ? handleSearchResultCount : undefined}
              onColumnStateChange={isFilesTab ? handleColumnStateChange : undefined}
            />
          </Grid>
        </Grid>
      </Wrapper>
    </TableContextProvider>
  );
};

export default withStyles(styles)(TabView);
