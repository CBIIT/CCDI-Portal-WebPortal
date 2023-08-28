import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { TableView } from '@bento-core/paginated-table';
import { configColumn } from './tableConfig/Column';
import { themeConfig } from './tableConfig/Theme';
import styles from './cartView.style';
import CartWrapper from './cartWrapper';

const CartView = (props) => {
  const {
    classes,
    config,
    filesId = [],
  } = props;

  /**
  * configure table state
  */
  const initTblState = (initailState) => ({
    ...initailState,
    title: 'myFiles',
    query: config.api,
    dataKey: config.dataKey,
    columns: configColumn({ columns: config.columns, ...props }),
    selectedRows: [],
    tableMsg: config.tableMsg,
    paginationAPIField: config.paginationAPIField,
    sortBy: config.defaultSortField,
    sortOrder: config.defaultSortDirection,
    rowsPerPage: 10,
    page: 0,
  });

  const variables = {};
  variables.file_ids = filesId;
  return (
    <Grid className={classes.backgroundContainer}>
      <Grid item xs={12}>
        <div className={classes.myFilesWrapper}>
          <div className={classes.textContainer}>
            To access and analyze files: select and remove unwanted files, click the “Download File Manifest” button, and upload the resulting Manifest file to your <a href="https://www.cancergenomicscloud.org/" target="_blank" rel="noopener noreferrer">Seven Bridges Genomics</a> account.
          </div>
          <CartWrapper
            classes={classes}
            queryVariables={variables}
          >
            <TableView
              initState={initTblState}
              themeConfig={themeConfig}
              queryVariables={variables}
              totalRowCount={filesId.length}
            />
          </CartWrapper>
        </div>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(CartView);
