import React, { useState, useEffect, useRef }from 'react';
import {
  withStyles, ClickAwayListener
} from '@material-ui/core';
import ReactHtmlParser from 'html-react-parser';
import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components';
import exportIcon from '../../../assets/about/Export_Icon.svg';
import publicationsHeaderImg from '../../../assets/about/Publications_Header.png';
import { publicationsList } from '../../../bento/publicationsData';
import searchIcon from '../../../assets/header/Search_Small_Icon.svg';
import arrowDownIcon from '../../../assets/about/arrowDownGreen.svg';
import arrowUpIcon from '../../../assets/about/arrowUpGreen.svg';

const PublicationsContainer = styled.div`
  // width: 1420px;
  width: 100%;
  margin: 0 auto;

  .pageHeader {
    width: 1142px;
    height: 140px;
    margin: 0 auto;
    background-image: url(${publicationsHeaderImg});
    background-repeat: no-repeat;
    background-color: #87D7DCCC; 
    border-radius: 0px 0px 20px 20px;
  }

  .pageHeaderText {
    font-family: 'Poppins';
    font-weight: 600;
    font-size: 35px;
    text-align: center;
    letter-spacing: 0.02em;
    color: #FFFFFF;
    padding: 40px 0 12px 0;
  }

  .pageHeaderSubtext {
    color: #AEECF0;
    text-align: center;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 160% */
    text-align: left;
    margin-left: 50px;
  }

  .tabList {
      display: grid;
      grid-column-gap: 5px;
      grid-template-columns: auto auto auto auto auto;
      justify-content: center;
      margin: 20px auto 35px auto;
      border-top: 1px solid #CECECE;
      padding-top: 20px;
  }

  .tabDropdown {
    display: none;
  }

  .tabDropdown {
    position: absolute;
    left: 15px;
    padding: 0;
    margin: 0 auto 52px auto;
    width: calc(100vw - 45px);;
    border: 2px solid #08838D;
    background: white;
    border-radius: 4px;
  }

  .tabDropdownItem {
    color: #0A5E63;
    height: 45px;
    padding: 15.5px 10px;
    list-style-type: none;
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px; /* 70% */
    text-transform: capitalize;
  }

  .tabDropdownItem:hover {
    cursor: pointer;
  }

  .tabDropdownItem:nth-child(odd) {
    background: #F4F5F5;
  }

  .tabDropIcon {
    float: right;
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
    border-bottom: 4px solid #0A5E63;
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
    min-height: 252px;
    border: 1.5px solid transparent;
    border-radius: 0px 20px;
    margin: 0 auto;
    margin-bottom: 29px;
    padding: 23px 32px 0 38px;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
    text-decoration: none;
  }

  .publicationsItem:hover {
    border: 1.5px solid #00BDCD;
  }

  .publicationsItemTitle {
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 20px;
    line-height: 22px;
    color: #00838F;
    margin-bottom: 15px;
    text-decoration: none;
  }

  .publicationsItemDate {
    font-family: 'Inter';
    font-weight: 300;
    font-size: 13px;
    line-height: 24px;
    text-transform: uppercase;
    color: #000000;
    margin-bottom: 12px;
  }

  .dateConferenceContainer {
    display: flex;
  }

  .publicationsText1 {
    color: #0095A2;
    padding: 0 10px;
  }

  .publicationsText2 {
    color: #00838F;
    font-family: Inter;
    font-size: 12px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0.05em;
    padding-right: 7px;
  }

  .publicationsItemConference {
    color: #000;
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 300;
    line-height: 22px;
    letter-spacing: 0.26px;
    text-transform: uppercase;
  }

  .publicationsItemConferenceLink {
    color: #000;
    font-family: Inter;
    font-size: 13px;
    font-weight: 300;
    line-height: 22px;
    letter-spacing: 0.02em;
  }

  .publicationsItemContent {
    font-family: 'Inter';
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: #000000;
    margin-bottom: 15px;
    a {
      color: #455299;
      font-family: 'Inter';
      font-weight: 600;
      padding-right: 20px;
      background: url(${exportIcon}) right center no-repeat;
    }
  }

  .footerContainer {
    display: flex;
    margin-bottom: 20px;
  }

  .publicationsItemTagContainer {
    margin-top: 7px;
  }

  .publicationsItemTag {
    color: #FFFFFF;
    border-radius: 20px;
    background: #2B8186;
    padding: 5px 10px;
    display: inline-block;
    font-family: Poppins;
    font-size: 13px;
    font-weight: 600;
    line-height: 19.31px;
  }

  .publicationsItemTag:hover {
    background: #0E595E;
  }

  .readMoreButtonContainer {
    text-decoration: none;
    width: 167px;
    display: block;
    margin-left: auto;
  }

  .readMoreButton {
    border-radius: 5px;
    border: 1.25px solid #455299;
    width: 167px;
    padding: 11px 0 11px 38px;
    color: #455299;
    font-family: Poppins;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 133.333% */
    letter-spacing: 0.24px;
    text-transform: uppercase;
  }

  .readMoreText {
    background: url(${exportIcon}) 79px center no-repeat;
  }

  .readMoreButton:hover {
    background-color: #E6F3F7;
  }

  p {
    margin-top: 5px;
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

    .dateConferenceContainer {
      display: block;
    }

    .publicationsText1 {
      display: none;
    }
  }

  @media (max-width: 1023px) {
    .pageHeaderSubtext {
      margin-left: 30px;
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
    .tabListItem {
      margin-left: 0;
    }
    .tabListItemActive {
      margin-left: 0;
    }
    .tabList {
      display: grid;
      grid-column-gap: 4%;
      grid-template-columns: auto auto auto auto auto;
      justify-content: center;
      margin: 20px auto 25px auto;
    }

    .publicationsItemDate {
      margin-bottom: 0;
    }
  }

  @media (max-width: 767px) {
    .publicationsItemTitle {
      font-size: 18px;
    }

    .publicationsItemTagContainer {
      margin-bottom: 15px;
    }

    .pageHeader {
      height: 165px;
    }

    .pageHeaderText {
      max-width: 308px;
      line-height: 35px;
      padding-top: 40px;
      margin: 0 auto;
    }

    .pageHeaderSubtext {
      margin-left: 0;
      text-align: center;
    }

    .tabList {
      display: none;
    }

    .tabDropdown {
      display: block;
    }

    .totalNumContainer {
      margin-top: 85px;
    }

    .publicationsItemContent {
      margin-top: 10px;
    }

    .footerContainer {
      display: block;
      margin-bottom: 25px;
    }

    .readMoreButtonContainer {
      margin-left: 0;
    }
  }
`;

const SearchBar = styled.div`
  display: flex;
  margin: 25px auto;
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
    maxWidth: 662px;

    .searchButtonText {
      display: none;
    }
    .searchButtonIcon {
      display: block;
    }
  }

  @media (max-width: 767px) {
    margin: 20px 15px 15px 15px;
    width: auto;
  }
`;

const SearchInput = styled.input`
  margin: 0 20px;
  border: none;
  font-family: Poppins;
  font-size: 20px;
  font-weight: 500;
  line-height: 16px;
  color: #0A5E63;
  width: 650px;
  min-width: 0;
  background: transparent;

  ::placeholder {
    color: #0A5E63;
  }

  :focus {
    outline: none;
  }

  @media (max-width: 767px) {
    margin: 0 10px;
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
  const newsTabList = ['All', 'Primary', 'Secondary', 'Abstract'];
  const sizelist = [10,20,50,100];
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(sizelist[0]);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setdata] = useState([]);
  const [pageTotal, setPageTotal] = useState(0);
  const [pageListVisible, setPageListVisible] = useState(0);
  const perPageSelection = useRef(null);
  const anchorRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const [deleteIconShow, setDeleteIconShow] = useState('none');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useOutsideAlerter(perPageSelection);

  const [inputRef, setInputFocus] = useFocus();

  useEffect(() => {
    let resultList=[];
    let keywordUpper = keyword.toUpperCase();
    if (selectedTab === "All") {
      resultList = publicationsList.filter(item => (item.title.toUpperCase().includes(keywordUpper) || item.date.toUpperCase().includes(keywordUpper) || item.summary.toUpperCase().includes(keywordUpper) || item.tag.toUpperCase().includes(keywordUpper) || (item.conference && item.conference.toUpperCase().includes(keywordUpper))));
    } else {
      resultList = publicationsList.filter(item => item.category === selectedTab && (item.title.toUpperCase().includes(keywordUpper) || item.date.toUpperCase().includes(keywordUpper) || item.summary.toUpperCase().includes(keywordUpper) || item.tag.toUpperCase().includes(keywordUpper) || (item.conference && item.conference.toUpperCase().includes(keywordUpper))));
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

  const onClickDropdownItem = (newsTabItem) => {
    setSelectedTab(newsTabItem);
    setDropdownOpen(false)
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

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
    }
    setDropdownOpen(false);
  };

  return (
    <PublicationsContainer>
      <div className='pageHeader'>
        <div className='pageHeaderText'>CCDI-Supported Publications</div>
        <div className='pageHeaderSubtext'>Publication list updated as of 3/31/25.</div>
      </div>
      <SearchBar onMouseOver={() => setDeleteIconShow('block')} onMouseOut={() => setDeleteIconShow('none')}>
        <SearchInput ref={inputRef} type="text" value={inputValue} placeholder="Search Publications" onChange={handleTextInputChange} />
        <div className='deleteIcon' onClick={handleClear} >
            <img className="deleteIconImg" style={{display:deleteIconShow}} src='https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/globalSearchDelete.svg' alt='clear icon' />
        </div>
        <div className='searchButton' onClick={handleSearchButtonClick}>
          <div className='searchButtonText'>Search</div>
          <img className='searchButtonIcon' src={searchIcon} alt="searchIcon" />
        </div>
      </SearchBar>
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
      <ul className='tabDropdown'>
        <div
          className='tabDropdownItem first'
          ref={anchorRef}
          style={dropdownOpen? {fontSize: '16px', background: '#FFFFFF'} : {background: '#FFFFFF'}}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {dropdownOpen ? "Select a category" : selectedTab}
          <img className='tabDropIcon' src={dropdownOpen? arrowUpIcon : arrowDownIcon} alt='arrow img' />
        </div>
        <ClickAwayListener onClickAway={handleClose}>
          <div>
          {
            dropdownOpen && newsTabList.map((newsTabItem, idx) => {
              const tabkey = `tabkey_${idx}`;
              return (
                <li key={tabkey} className='tabDropdownItem' onClick={() => onClickDropdownItem(newsTabItem)}>{newsTabItem}</li>
              )
            })
          }
          </div>
        </ClickAwayListener>
      </ul>
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
                      <div className='publicationsItemTitle'>{publicationsItem.title}</div>
                    </div>
                    <div className='dateConferenceContainer'>
                      <div className='publicationsItemDate'>{publicationsItem.date}</div>
                      {publicationsItem.conference && <div className='publicationsItemConference'>
                        <span className='publicationsText1'>|</span>
                        <span className='publicationsText2'>Conference</span>
                        <span className='publicationsItemConferenceLink'>{publicationsItem.conference}</span>
                      </div>}
                      {publicationsItem.journal && <div className='publicationsItemConference'>
                        <span className='publicationsText1'>|</span>
                        <span className='publicationsText2'>Journal</span>
                        <span className='publicationsItemConferenceLink'>{publicationsItem.journal}</span>
                      </div>}
                      {publicationsItem.pmid && <div className='publicationsItemConference'>
                        <span className='publicationsText1'>|</span>
                        <span className='publicationsText2'>PMID</span>
                        <span className='publicationsItemConferenceLink'>{publicationsItem.pmid}</span>
                      </div>}
                      {publicationsItem.type && <div className='publicationsItemConference'>
                        <span className='publicationsText1'>|</span>
                        <span className='publicationsText2'>{publicationsItem.type}</span>
                      </div>}
                    </div>
                    <div className='publicationsItemContent'>{ReactHtmlParser(`${publicationsItem.summary.substring(0, 485)}...`)}</div>
                    <div className='footerContainer'>
                      <div className='publicationsItemTagContainer'><div className='publicationsItemTag'>{publicationsItem.tag}</div></div>
                      <a className='readMoreButtonContainer' href={publicationsItem.link} target='_blank' rel='noopener noreferrer'><div className='readMoreButton'><div className='readMoreText'>Read More</div></div></a>
                    </div>
                  </div>
                </div>
              </div>
            )
          }) :
          <div className={classes.noResult} />
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
    '@media (max-width: 1023px)': {
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
  },
  noResult: {
    marginBottom: '100px',
  },
};

export default withStyles(styles)(PublicationsView);
