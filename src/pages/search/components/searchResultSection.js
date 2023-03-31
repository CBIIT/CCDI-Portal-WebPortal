/* eslint-disable no-await-in-loop */
import React, { useState, useEffect } from 'react';
import {
  withStyles, Button, Grid, CircularProgress,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Components from './component';
import client from '../../../utils/graphqlClient';
import {
  SEARCH_PAGE_RESULT_ABOUT_PUBLIC,
} from '../../../bento/sitesearch';

function SearchPagination({
  datafield, classes, searchText, count, isPublic,
}) {
  const [page, setPage] = useState(1);

  const pageSize = 2;
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);

  function getPublicQuery(field) {
    switch (field) {
      case 'about_page':
        return { QUERY: SEARCH_PAGE_RESULT_ABOUT_PUBLIC, field: 'about_page' };
      default:
        return { QUERY: SEARCH_PAGE_RESULT_ABOUT_PUBLIC, field: 'about_page' };
    }
  }

  async function getPageResults(inputVlaue, newPage) {
    if (count > 0) { // no need network calls if count is zero
      console.log(datafield);
      const { QUERY, field } = getPublicQuery(datafield);
      const allids = await client
        .query({
          query: QUERY,
          variables: {
            input: inputVlaue,
            first: pageSize,
            offset: (newPage - 1) * pageSize,
          },
          context: {
            clientName: isPublic ? 'publicService' : '',
          },
        })
        .then((result) => result.data.globalSearch);
      return allids[field].slice(0, pageSize);
    }
    return [];
  }

  async function onChange(newValue = [], newPage = 1) {
    setLoading(true);
    const searchResp = await getPageResults(newValue, newPage);
    setLoading(false);
    setdata(searchResp);
  }

  useEffect(() => {
    setPage(1);
    setdata([]);
    onChange(searchText);
  }, [searchText, datafield]);

  const onNext = () => {
    if (page < Math.ceil(count / pageSize)) {
      onChange(searchText, page + 1);
      setPage(page + 1);
    }
  };

  const onPrevious = () => {
    if (page > 1) {
      onChange(searchText, page - 1);
      setPage(page - 1);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 54,
      behavior: 'smooth',
    });
  };

  const handleChangePage = (event, newPage) => {
    onChange(searchText, newPage);
    setPage(newPage);
    scrollToTop();
  };

  const renderCards = () => {
    if (loading) {
      return (
        <div className={classes.loadingMessageWrapper}>
          <CircularProgress />
          {/* <div className={classes.loadingMessage}>Loading...</div> */}
        </div>
      );
    }

    if (data && data.length <= 0) return <div>No data</div>;

    return data.map(
      // eslint-disable-next-line max-len
      (block, index) => <Components searchText={searchText} data={block} classes index={(page - 1) * pageSize + index} />,
    );
  };

  return (
    <>
      {Math.ceil(count / pageSize) !== 0 && (
      <div className={classes.totalResults}>
        <span className={classes.totalCount}>{count}</span>
        {' '}
        results
      </div>
      ) }
      <Grid className={classes.subsection}>
        <Grid item container direction="column" className={classes.subsectionBody} xs={9}>
          {renderCards()}
        </Grid>
      </Grid>
      {Math.ceil(count / pageSize) > 1 && (
      <div className={classes.paginationContainer}>
        <Button sx={{ borderRadius: 100 }} onClick={onPrevious} className={classes.prevButton}>
          <span>
            <img
              className={classes.prevIcon}
              src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/globalSearchPrevious.svg"
              alt="previous button"
            />

          </span>
          previous
        </Button>

        <Pagination
          classes={{ ul: classes.paginationUl }}
          className={classes.paginationRoot}
          count={Math.ceil(count / pageSize)}
          page={page}
          siblingCount={2}
          boundaryCount={1}
          shape="rounded"
          hideNextButton
          hidePrevButton
          onChange={handleChangePage}
        />
        <Button sx={{ borderRadius: 100 }} onClick={onNext} className={classes.nextButton}>
          next
          <span>
            <img
              className={classes.nextIcon}
              src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/globalSearchNext.svg"
              alt="previous button"
            />
          </span>
        </Button>

      </div>
      )}
    </>
  );
}

const styles = {
  prevButton: {
    marginRight: '44px',
    fontFamily: '"Open Sans", sans-serif',
    fontWeight: 'bold',
    fontSize: '12px',
  },
  iconSpan: {
    marginTop: '6px',
  },
  nextButton: {
    marginLeft: '44px',
    fontFamily: '"Open Sans", sans-serif',
    fontWeight: 'bold',

    fontSize: '12px',
  },
  nextIcon: {
    height: '12px',
    margin: '6px 6px 0px 12px',
  },
  prevIcon: {
    height: '12px',
    margin: '6px 12px 0px 12px',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '680px',
    margin: '0 auto',
    paddingBottom: '20px',
    '& > *': {
      marginTop: '8px',
    },
  },
  ul: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
  paginationUl: {
    padding: '2px',
    '& .MuiPaginationItem-root': {
      color: '#565656',
      fontFamily: '"Open Sans", sans-serif',
      fontSize: '11px',
      fontWeight: 'bold',
    },
  },
  paginationRoot: {
    '& .Mui-selected': {
      backgroundColor: '#D9E8F8',
    },
  },
  content: {
    fontSize: '12px',
  },
  subsectionBody: {
    margin: '0 180px 0 219px',
  },
  subsection: {
    '&:last-child $subsectionBody': {
      borderBottom: 'none',
    },
  },
  descriptionPart: {
    paddingBottom: '26px',
  },
  description: {
    fontWeight: 'bold',
  },
  link: {
    color: '#DD401C',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:visited': {
      color: '#9F3D26',
    },
  },
  totalResults: {
    maxWidth: '900px',
    fontFamily: 'Poppins',
    color: '#13666A',
    fontSize: '20px',
    fontWeight: '500',
    margin: '0 0 71px 220px',
    paddingLeft: '-50px',
  },
  totalCount: {
    fontFamily: 'Poppins',
  },
  loadingMessageWrapper: {
    textAlign: 'center',
  },
  loadingMessage: {
    paddingLeft: '10px',
    fontSize: '18px',
  },
};

export default withStyles(styles)(SearchPagination);
