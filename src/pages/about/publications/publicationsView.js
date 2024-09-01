import React, { useState, useEffect, useRef }from 'react';
import {
  withStyles,
} from '@material-ui/core';
import ReactHtmlParser from 'html-react-parser';
import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components';
import exportIcon from '../../../assets/about/Export_Icon.svg';
import publicationsHeaderImg from '../../../assets/about/Publications_Header.png';
import { publicationsList } from '../../../bento/publicationsData';
import searchIcon from '../../../assets/header/Search_Small_Icon.svg';

const PublicationsContainer = styled.div`
  width: 100%;
  margin: 0 auto;

  .pageHeader {
    width: 1142px;
    height: 203px;
    margin: 0 auto;
    background-image: url(${publicationsHeaderImg});
    background-repeat: no-repeat;
    background-color: #87D7DCCC; 
    border-radius: 0px 0px 20px 20px;
    font-family: 'Poppins';
    font-weight: 600;
    font-size: 35px;
    line-height: 214px;
    text-align: center;
    letter-spacing: 0.02em;
    color: #FFFFFF;
  }

  .searchBoxFooter {
    width: 662px;
    margin: 0 auto 40px auto;
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    line-height: 19px;
    color: #05555C;
  }

  .tabList {
      display: grid;
      grid-column-gap: 5px;
      grid-template-columns: auto auto auto auto auto;
      justify-content: center;
      margin: 20px auto 35px auto;
  }

  .tabListItem {
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: #298085;
    margin-left: 60px;
  }

  .tabListItemActive {
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: #0A5E63;
    margin-left: 60px;
    padding-bottom: 5px;
    border-bottom: 3px solid #0A5E63;
  }

  .tabListItemActive:hover {
    cursor: default;
  }

  .tabListItem:hover {
    color: #0A5E63;
  }

  .tabListItem:hover {
    cursor: pointer;
  }

  .UpperContainer {
    display: flex;
  }

  .titleContainer {
    display: flex;
  }

  .titleIdx {
    font-family: Poppins;
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.02em;
    margin-right: 12px;
    color: #2E2E2E;
  }

  .totalNumContainer {
    width: 1047px;
    margin: 0 auto;
    font-family: Poppins;
    font-size: 18px;
    font-weight: 500;
    line-height: 16px;
    color: #13666A;
    padding: 15px;
  }

  .totalNum {
    font-weight: 700;
  }

  .publicationsList {
    width: 100%;
    margin: 0 auto;
  }

  .publicationsItem {
    width: 1047px;
    min-height: 248px;
    border: 1.5px solid transparent;
    border-radius: 0px 20px;
    margin: 0 auto;
    margin-bottom: 29px;
    padding: 23px 32px 0 38px;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
    text-decoration: none;
  }

  .publicationsItemTitle {
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 20px;
    line-height: 22px;
    color: #00838F;
    margin-bottom: 8px;
    text-decoration: none;
  }

  .publicationsItemDate {
    font-family: 'Inter';
    font-weight: 300;
    font-size: 13px;
    line-height: 24px;
    text-transform: uppercase;
    color: #000000;
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .publicationsItemContent {
    font-family: 'Inter';
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
    margin-bottom: 48px;
    a {
      color: #455299;
      font-family: 'Inter';
      font-weight: 600;
      padding-right: 20px;
      background: url(${exportIcon}) right center no-repeat;
    }
  }

  @media (min-width: 1420px) {
    width: 1420px;
  }

  @media (max-width: 1186px) {
    .pageHeader {
      width: auto;
      margin: 0 16px;
    }
  }

  @media (max-width: 1090px) {
    .publicationsList {
      width: auto;
      margin: 0 16px;
    }

    .publicationsItem {
      width: auto;
    }
  }

  @media (max-width: 1023px) {
    p {
      margin-top: 5px;
    }

    .pageHeaderText {
      line-height: 30px;
      width: 250px;
      padding-top: 70px;
      margin: 0 auto;
    }

    .UpperContainer {
      width: 100%;
    }
    .imgContainer {
      margin-left: auto;
    }
    .publicationsItem {
      padding: 18px 18px 0 18px;
    }
    .publicationsItemTitle {
      min-height: 50px;
    }
    .tabListItem {
      font-size: 12px;
      margin-left: 0;
    }
    .tabListItemActive {
      font-size: 12px;
      margin-left: 0;
    }
    .tabList {
      display: grid;
      grid-column-gap: 4%;
      grid-template-columns: auto auto auto auto auto;
      justify-content: center;
      margin: 20px auto 25px auto;
    }
  }

  @media (max-width: 767px) {
    .publicationsItemTitle {
      font-size: 18px;
    }
  }

  @media (max-width: 530px) {
    .tabList {
      display: grid;
      grid-column-gap: 2%;
      grid-template-columns: auto auto 50px 72px auto;
      justify-content: center;
      margin-left: 16px;
      margin-right: 12px;
    }
  }
`;

const SearchBar = styled.div`
  display: flex;
  margin: 40px auto 20px auto;
  width: 662px;
  height: 53px;
  border: 2px solid #08838D;
  // border-radius: 8px;
  background: white;
  border-radius: 4px;

  .searchButton {
    font-family: 'Open Sans';
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
    padding: 16px 20px;
    background: #05555C;
    color: #FFFFFF;
  }

  .searchButton:hover {
    cursor: pointer;
  }

  .deleteIcon {
    height: 18px;
    min-width: 15px;
    padding-top: 19px;
    margin-right: 13px;
  }

  .deleteIconImg:hover {
    cursor: pointer;
  }

  .searchButtonIcon {
    display: none;
  }

  @media (max-width: 1023px) {
    margin: 0 auto;
    maxWidth: 662px;
  }

  @media (max-width: 767px) {
    .searchButtonText {
      display: none;
    }
    .searchButtonIcon {
      display: block;
    }
  }

  @media (max-width: 732px) {
    margin: 0 15px;
    width: auto;
  }
`;

const SearchInput = styled.input`
  margin: 0 20px;
  border: none;
  font-family: 'Open Sans';
  font-weight: 400;
  font-size: 25px;
  line-height: 53px;
  color: #000000;
  width: 650px;
  min-width: 0;
  background: transparent;

  ::placeholder {
    color: #000000;
  }

  :focus {
    outline: none;
  }
`;

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

const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
  return [ htmlElRef, setFocus ] 
};

const PublicationsView = ({classes}) => {
  const [selectedTab, setSelectedTab] = useState("All");
  const newsTabList = ['All', 'Collaboration', 'Primary', 'Review', 'Book Chapter'];
  const sizelist = [10,20,50,100];
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(sizelist[0]);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setdata] = useState([]);
  const [pageTotal, setPageTotal] = useState(0);
  const [pageListVisible, setPageListVisible] = useState(0);
  const perPageSelection = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const [deleteIconShow, setDeleteIconShow] = React.useState('none');
  useOutsideAlerter(perPageSelection);

  const [inputRef, setInputFocus] = useFocus();

  useEffect(() => {
    let resultList=[];
    if (selectedTab === "All") {
      resultList = publicationsList.filter(item => (item.title.toUpperCase().includes(keyword.toUpperCase()) || item.date.toUpperCase().includes(keyword.toUpperCase()) || item.summary.toUpperCase().includes(keyword.toUpperCase())));
    } else {
      resultList = publicationsList.filter(item => item.type === selectedTab && (item.title.toUpperCase().includes(keyword.toUpperCase()) || item.date.toUpperCase().includes(keyword.toUpperCase()) || item.summary.toUpperCase().includes(keyword.toUpperCase())));
    }
    setFilteredData(resultList);
    setPageTotal(resultList.length);
  }, [selectedTab, keyword]);

  useEffect(() => {
    const allids = [];
    const indexStart = pageSize*(page-1);
    const indexEnd = pageSize*page < pageTotal ? pageSize*page - 1 : pageTotal - 1;
    for (let i = indexStart; i<= indexEnd; i++) {
      allids.push(filteredData[i]);
    }
    setdata(allids);
  }, [page, pageSize, filteredData, pageTotal]);

  const onNext = () => {
    if (page < Math.ceil(pageTotal / pageSize)) {
      let tmp = page + 1;
      setPage(tmp);
    }
  };

  const onPrevious = () => {
    if (page > 1) {
      let tmp = page - 1;
      setPage(tmp);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 54,
      behavior: 'smooth',
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    scrollToTop();
  };

  const onPageSizeClick = (e) => {
    let newPageSize = Number(e.target.innerText);
    setPageSize(newPageSize);
    setPage(1);
    setPageListVisible(!pageListVisible)
  };

  const onClickTab = (newsTabItem) => {
    setSelectedTab(newsTabItem);
    setPage(1);
  };

  const handleTextInputChange = (event) => {
    const text = event.target.value;
    setInputValue(text);
  };

  const handleClear = () => {
    setInputValue("");
    setInputFocus();
  };

  const handleSearchButtonClick = () => {
    setPage(1);
    setKeyword(inputValue);
  }

  return (
    <PublicationsContainer>
      <div className='pageHeader'><div className='pageHeaderText'>CCDI-Supported Publications</div></div>
      <SearchBar onMouseOver={() => setDeleteIconShow('block')} onMouseOut={() => setDeleteIconShow('none')}>
        <SearchInput ref={inputRef} type="text" value={inputValue} onChange={handleTextInputChange} />
        <div className='deleteIcon' onClick={handleClear} >
            <img className="deleteIconImg" style={{display:deleteIconShow}} src='https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/globalSearchDelete.svg' alt='clear icon' />
        </div>
        <div className='searchButton' onClick={handleSearchButtonClick}>
          <div className='searchButtonText'>Search</div>
          <img className='searchButtonIcon' src={searchIcon} alt="searchIcon" />
        </div>
      </SearchBar>
      <div className='searchBoxFooter'>The following list contains manuscripts published by the Childhood Cancer Data Initiative (CCDI) support as of [UPDATE DATE]. The list will be updated as new studies are published.</div>
      <div className='tabList'>
        {
          newsTabList.map((newsTabItem, idx) => {
            const tabkey = `tabkey_${idx}`;
            return (
            <div key={tabkey} className={selectedTab === newsTabItem ? 'tabListItemActive' : 'tabListItem'} onClick={() => onClickTab(newsTabItem)}>{newsTabItem}</div>
            )
          })
        }
      </div>
      <div className='totalNumContainer'><span className="totalNum">{filteredData.length}</span> results</div>
      <div className='publicationsList'>
        {
          data.length > 0 ? data.map((publicationsItem, idx) => {
            const publicationskey = `publications_${idx}`;
            return (
              <div id={publicationsItem.id} key={publicationskey} className='publicationsItem'>
                <div className="UpperContainer">
                  <div className='publicationsItemTextContainer'>
                    <div className='titleContainer'>
                      <div className='titleIdx'>{(page-1)*pageSize+idx+1}</div>
                      <a className='publicationsItemTitle' href={publicationsItem.link} target="_blank" rel="noopener noreferrer">{publicationsItem.title}</a>
                    </div>
                    <div className='publicationsItemDate'>{publicationsItem.date}</div>
                    <div className='publicationsItemContent'>{ReactHtmlParser(`${publicationsItem.summary.substring(0, 485)}...`)}</div>
                  </div>
                </div>
              </div>
            )
          }) :
          <div className={classes.noticeText}>Currently no {selectedTab}</div>
        }
      </div>
      { data.length > 0 &&
        <div className={classes.paginationContainer}>
          <div className={classes.perPageContainer}>
            <div className={classes.flexPageContainer}>
              Results per Page:
              <div id="pageSizeBlock" className={classes.pageSizeContainer} onClick={() => setPageListVisible(!pageListVisible)}>
                {pageSize}
                <span id="pageSizeArrow" className={pageListVisible? classes.pageSizeArrowUp : classes.pageSizeArrowDown}></span>
              </div>
              <div ref={perPageSelection} id="pagelist" className={classes.pageSizeList} style={pageListVisible ? null : {visibility: "hidden"}}>
                {
                  sizelist.map((sizeItem, idx) => {
                    const key = `size_${idx}`;
                    return (
                      sizeItem === pageSize ? null : <div key={key} className={classes.pageSizeItem} onClick={onPageSizeClick}>{sizeItem}</div>
                    )
                  })
                }
              </div>
            </div>
            <div className={classes.showingContainer}>
              Showing&nbsp;
              <div className={classes.showingRangeContainer}>
                {pageSize*(page-1)+1}
                -
                {pageSize*page < pageTotal ? pageSize*page : pageTotal}&nbsp;
              </div>
              of&nbsp;
              {pageTotal}
            </div>
          </div>
          <div className={classes.pageContainer}>
            <div className={ page === 1 ? classes.prevButtonDisabledContainer : classes.prevButtonContainer} onClick={onPrevious}><div className={ page === 1 ? classes.prevButtonDisabled : classes.prevButton } /></div>
            <Pagination
              disabletouchripple="true"
              classes={{ ul: classes.paginationUl }}
              className={classes.paginationRoot}
              count={Math.ceil(pageTotal / pageSize)}
              page={page}
              siblingCount={2}
              boundaryCount={1}
              shape="rounded"
              hideNextButton
              hidePrevButton
              onChange={handleChangePage}
            />
            <div className={page === Math.ceil(pageTotal / pageSize) ? classes.nextButtonDisabledContainer : classes.nextButtonContainer} onClick={onNext}><div className={ page === Math.ceil(pageTotal / pageSize) ? classes.nextButtonDisabled : classes.nextButton} /></div>
          </div>
        </div>
      }
    </PublicationsContainer>
    
  )
};

const styles = {
  prevButtonContainer: {
    marginLeft: '10px',
    border: '1px solid #99A1B7',
    height: '32px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  prevButtonDisabledContainer: {
    marginLeft: '10px',
    border: '1px solid #99A1B7',
    height: '32px',
    '&:hover': {
      cursor: 'default',
    },
  },
  prevButton: {
    content: "",
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderBottom: '1px solid #045B80',
    borderLeft: '1px solid #045B80',
    margin: '13px 9px 0 11px',
    transform: 'rotate(45deg)',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  prevButtonDisabled: {
    content: "",
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderBottom: '1px solid #99A1B7',
    borderLeft: '1px solid #99A1B7',
    margin: '13px 9px 0 11px',
    transform: 'rotate(45deg)',
  },
  nextButtonContainer: {
    borderTop: '1px solid #99A1B7',
    borderRight: '1px solid #99A1B7',
    borderBottom: '1px solid #99A1B7',
    height: '32px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  nextButtonDisabledContainer: {
    borderTop: '1px solid #99A1B7',
    borderRight: '1px solid #99A1B7',
    borderBottom: '1px solid #99A1B7',
    height: '32px',
    '&:hover': {
      cursor: 'default',
    },
  },
  nextButton: {
    content: "",
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderBottom: '1px solid #045B80',
      borderLeft: '1px solid #045B80',
    margin: '13px 11px 0 9px',
    transform: 'rotate(225deg)',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  nextButtonDisabled: {
    content: "",
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderBottom: '1px solid #99A1B7',
    borderLeft: '1px solid #99A1B7',
    margin: '13px 11px 0 9px',
    transform: 'rotate(225deg)',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
    paddingBottom: '30px',
    '& > *': {
      marginTop: '10px',
    },
  },
  perPageContainer: {
    fontFamily: 'Poppins',
    fontWeight: '300',
    fontSize: '14px',
    color: '#045B80',
    marginTop: '15px',
    '@media (min-width: 500px)': {
      display: 'flex',
    },
    '@media (max-width: 767px)': {
      display: 'none',
    },
  },
  flexPageContainer: {
    display: 'flex',
  },
  pageSizeContainer: {
    marginLeft: '10px',
    userSelect: 'none',
    height: '20px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  pageSizeArrowUp: {
    content: "",
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderBottom: '1.5px solid #045B80',
    borderLeft: '1.5px solid #045B80',
    margin: '1px 3px 1px 10px',
    transform: 'rotate(135deg)',
  },
  pageSizeArrowDown: {
    content: "",
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderBottom: '1.5px solid #045B80',
    borderLeft: '1.5px solid #045B80',
    margin: '1px 3px 3px 10px',
    transform: 'rotate(-45deg)',
  },
  pageSizeList: {
    position: 'relative',
    top: '25px',
    left: '-40px',
    width: '45px',
    height: '76px',
    background: '#F5F5F5',
    border: '1px solid #99A1B7',
    zIndex: '2',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  pageSizeListHidden: {
    position: 'relative',
    top: '25px',
    left: '-30px',
    width: '45px',
    border: '1px solid #99A1B7',
    visibility: 'hidden',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  pageSizeItem: {
    padding: '2px 8px',
    '&:hover': {
      cursor: 'pointer',
      color: '#000000',
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
      color: '#045B80',
      fontFamily: 'Poppins',
      fontSize: '14px',
      fontWeight: '300',
      minWidth: '18px',
      margin: '0',
      padding: '0 7px',
    },
    '& .MuiPaginationItem-page': {
      transition: 'none',
    },
  },
  paginationRoot: {
    '& .Mui-selected': {
      backgroundColor: 'transparent',
      fontWeight: '600',
    },
    '& .Mui-selected:hover': {
      backgroundColor: 'transparent',
    },
    '& .MuiPagination-ul': {
      padding: '0',
    },
    '& .MuiPagination-ul:hover': {
      cursor: 'pointer',
    },
    '& .MuiPagination-ul > li': {
      height: '32px;',
      borderTop: '1px solid #99A1B7',
      borderRight: '1px solid #99A1B7',
      borderBottom: '1px solid #99A1B7',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    '& .MuiPaginationItem-page': {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    }
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
  noticeContainer: {
    fontFamily: 'Poppins',
    color: '#13666A',
    fontSize: '20px',
    marginBottom: '100px',
  },
  pageNumber: {
    margin: '0 5px',
  },
  showingContainer: {
    display: 'flex',
    position: 'relative',
    left: '-14px',
    '@media (max-width: 499px)': {
      left: '0',
      top: '-31px',
    }
  },
  showingRangeContainer: {
    minWidth: '40px',
    textAlign: 'center',
  },
  pageContainer: {
    display: 'flex',
    height: '32px',
    '&:hover': {
      cursor: 'pointer',
    },
    // '@media (max-width: 499px)': {
    //   marginTop: '56px',
    //   marginLeft: '-68px',
    // }
  },
  noticeText: {
    fontFamily: 'Poppins',
    color: '#13666A',
    fontSize: '20px',
    marginBottom: '100px',
    marginLeft: '205px',
  },
};

export default withStyles(styles)(PublicationsView);
