/* eslint-disable no-await-in-loop */
import React, { useState, useEffect, useRef } from 'react';
import {
  withStyles, Grid,
} from '@material-ui/core';
import Components from './component';
import client from '../../../utils/graphqlClient';
import {
  SEARCH_PAGE_RESULT_ABOUT_PUBLIC,
} from '../../../bento/sitesearch';

const useOutsideAlerter = (ref) => {
  useEffect(() => {
      function handleClickOutside(event) {
          if (!event.target || (event.target.getAttribute("id") !== "pageSizeBlock" && event.target.getAttribute("id") !== "pageSizeArrow" && ref.current && !ref.current.contains(event.target))) {
            const toggle = document.getElementById("pageSizeBlock");
            if (document.getElementById("pagelist").style.visibility !== "hidden") {
              toggle.click();
            }
          }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [ref]);
};

function SearchPagination({
  datafield, classes, searchText, count, isPublic,
}) {
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const perPageSelection = useRef(null);
  const [fetchMore, setFetchMore] = useState(true);
  useOutsideAlerter(perPageSelection);

  function getPublicQuery(field) {
    switch (field) {
      case 'about_page':
        return { QUERY: SEARCH_PAGE_RESULT_ABOUT_PUBLIC, field: 'about_page' };
      default:
        return { QUERY: SEARCH_PAGE_RESULT_ABOUT_PUBLIC, field: 'about_page' };
    }
  }

  async function getPageResults(inputVlaue, newPage) {
    if (count > 0 && fetchMore) { // no need network calls if count is zero
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
      if (newPage * pageSize > count) {
        setFetchMore(false)
      }
      return allids[field].slice(0, pageSize);
    }
    return [];
  }

  async function onChange(newValue = [], newPage = 1) {
    // setLoading(true);
    const searchResp = await getPageResults(newValue, newPage);
    setLoading(false);
    setdata([...data, ...searchResp]);
  }

  useEffect(() => {
    setPage(1);
    setdata([]);
    onChange(searchText);
  }, [searchText, datafield]);

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 54,
  //     behavior: 'smooth',
  //   });
  // };

  const handleLoadMore = () => {
    onChange(searchText, page+1);
    setPage(page+1);
    
    // scrollToTop();
  };

  const renderCards = () => {
    // if (loading) {
    //   return (
    //     <div className={classes.loadingMessageWrapper}>
    //       <CircularProgress />
    //       {/* <div className={classes.loadingMessage}>Loading...</div> */}
    //     </div>
    //   );
    // }

    if (data && data.length <= 0) return <div className={classes.noticeContainer}>{searchText ? "No results" : "Please input keywords"}</div>;

    return data.map(
      // eslint-disable-next-line max-len
      (block, index) => <Components key={`data_${index}`}searchText={searchText} data={block} index={(page - 1) * pageSize + index} />,
    );
  };

  const handleScroll = () => {
    const footerList = document.getElementsByTagName('footer');
    let footer;
    if (window.innerWidth > 767) {
      footer = footerList[1];
    } else {
        footer = footerList[2];
    }
    const footerToTop = footer.getBoundingClientRect().top;
    if (window.innerHeight - 50 > footerToTop) {
      setLoading(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [])

  useEffect(() => {
    if (!loading) {
      return
    } else {
      handleLoadMore()
    }
  }, [loading]);

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
    </>
  );
}

const styles = {
  ul: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
  subsectionBody: {
    maxWidth: '1070px',
    margin: '0 auto',
    '@media (max-width: 1120px)': {
      width: 'auto',
      margin: '0 15px',
    }
  },
  subsection: {
    '&:last-child $subsectionBody': {
      borderBottom: 'none',
    },
  },
  totalResults: {
    maxWidth: '1040px',
    fontFamily: 'Poppins',
    color: '#13666A',
    fontSize: '20px',
    fontWeight: '500',
    margin: '0 auto',
    marginBottom: '60px',
    paddingLeft: '-50px',
    '@media (max-width: 1120px)': {
      width: 'auto',
      margin: '0 30px',
      marginBottom: '60px',
    },
    '@media (max-width: 1023px)': {
      marginBottom: '30px',
    },
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
  noticeContainer: {
    fontFamily: 'Poppins',
    color: '#13666A',
    fontSize: '20px',
    marginBottom: '100px',
  },
};

export default withStyles(styles)(SearchPagination);
