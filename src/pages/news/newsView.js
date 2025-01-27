import React, { useState, useEffect, useRef }from 'react';
import {
  withStyles, ClickAwayListener
} from '@material-ui/core';
// import { useNavigate } from 'react-router-dom';
import html2pdf from "html2pdf.js";
import ReactHtmlParser from 'html-react-parser';
import Pagination from '@material-ui/lab/Pagination';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import exportIcon from '../../assets/about/Export_Icon.svg';
import NCILogoExport from '../../assets/about/NCI_Logo.png';
import newsImg from '../../assets/news/News_Header.jpg';
import arrowDownIcon from '../../assets/about/arrowDownGreen.svg';
import arrowUpIcon from '../../assets/about/arrowUpGreen.svg';
import UploadIcon from '../../assets/about/Upload-Icon.svg';
import { altList, srcList, newsList, releaseNotesList } from '../../bento/newsData'

const fullList = (newsList.concat(releaseNotesList)).sort((a,b) => {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}).reverse();

const NewsContainer = styled.div`
  width: 100%;
  margin: 0 auto;

  .numResults {
    margin: 0 auto 10px auto;
    padding-left: 50px;
    width: 1047px;
    color: #13666A;
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 18px;
  }

  .newsHeader {
    width: 1142px;
    height: 140px;
    margin: 0 auto;
    background-image: url(${newsImg});
    background-repeat: no-repeat;
    background-color: #87D7DCCC; 
    border-radius: 0px 0px 20px 20px;
    font-family: 'Poppins';
    font-weight: 600;
    font-size: 35px;
    line-height: 140px;
    text-align: center;
    letter-spacing: 0.02em;
    color: #FFFFFF;
  }

  .tabList {
    display: flex;
    justify-content: center;
    margin: 20px 0 35px 0;
  }

  .tabListItem {
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: #298085;
    margin-left: 30px;
    margin-right: 30px;
  }

  .tabListItemActive {
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: #0A5E63;
    margin-left: 30px;
    margin-right: 30px;
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

  .tabDropdown {
    display: none;
  }

  .tabDropdown {
    padding: 0;
    margin: 25px auto 25px auto;
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

  .UpperContainer {
    display: flex;
    position: relative;
  }

  .newsList {
    width: 100%;
    margin: 0 auto;
  }

  .newsItem {
    width: 1047px;
    height: 230px;
    border: 1.5px solid transparent;
    border-radius: 0px 20px;
    margin: 0 auto;
    margin-bottom: 29px;
    padding: 23px 32px 0 38px;
    padding-right: 0px;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
    text-decoration: none;
  }

  .releaseNewsItem {
    width: 1047px;
    height: 350px;
    border: 1.5px solid transparent;
    border-radius: 0px 20px;
    margin: 0 auto;
    margin-bottom: 29px;
    padding: 23px 32px 0 38px;
    padding-right: 0px;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
    text-decoration: none;
  }

  .downloadPDF {
    width: 167px;
    height: 41px;
    border-radius: 5px;
    border: 1.25px #05555C solid;
    background-color: #05555C;
    font-family: 'Poppins';
    font-weight: 600;
    font-size: 12px;
    color: white;
    margin-left: 48px;
    margin-top: 12.5px;
    text-align: left;
    padding-left: 20px;

    img {
      position: absolute;
      margin-left: 10px;
    }
  }
  .downloadPDF:hover {
    background-color: #05555C;
  }

  .readMore {
    display: block;
    width: 167px;
    height: 41px;
    border-radius: 5px;
    border: 1.25px #455299 solid;
    font-family: 'Poppins';
    font-weight: 600;
    font-size: 12px;
    color: #455299;
    margin-left: 48px;
    margin-top: 12.5px;
    text-align: left;
    padding-left: 40px;

    img {
      position: absolute;
      margin-left: 10px;
      margin-top: 3px;
    }
  }
  .Desktop {
    display: block;
  }
  .Tablet {
    display: none;
  }
  .notMobile {
    display: block;
  }
  .Mobile {
    display: none;
  }

  .newsItemTextContainer {
    position: absolute;
    width: 75%;
    background-color: white;
  }

  .newsSubtitle {
    display: flex;
  }

  .newsItemTitle {
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 20px;
    line-height: 22px;
    color: #00838F;
    margin-bottom: 8px;
  }

  .newsItemTitleInner{
    margin-bottom: 40px;
  }

  .newsItemDate {
    font-family: 'Inter';
    font-weight: 300;
    font-size: 13px;
    line-height: 24px;
    text-transform: uppercase;
    color: #000000;
    margin-bottom: 8px;
  }

  .newsCategory {
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 12px;
    height: 24px;
    line-height: 20px;
    color: #05555C
    margin-left: 20px;
    border: 1.25px #78AC81 solid;
    border-radius: 20px;
    padding-right: 10px;
    padding-left: 10px;
  }

  .newsItemContent {
    font-family: 'Inter';
    padding-right: 25%;
    margin-top: 13px;
    height: 175px;
    overflow-y: auto;
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
    a {
      color: #455299;
      font-family: 'Inter';
      font-weight: 600;
      padding-right: 20px;
      background: url(${exportIcon}) right center no-repeat;
    }
    &::-webkit-scrollbar {
      width: 7px;
      background-color: #E2E2E2;
      border-left: 0.5px solid #1E1E1E;
    }
    &::-webkit-scrollbar-track {
      background-color: #F1F1F1;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #82BBE8;
    }
  }

  .releaseNewsItemContent {
    font-family: 'Inter';
    padding-right: 25%;
    margin-top: 13px;
    height: 300px;
    overflow-y: auto;
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
    margin-bottom: 24px;
    a {
      color: #455299;
      font-family: 'Inter';
      font-weight: 600;
      padding-right: 20px;
      background: url(${exportIcon}) right center no-repeat;
    }
    &::-webkit-scrollbar {
      width: 7px;
      background-color: #E2E2E2;
      border-left: 0.5px solid #1E1E1E;
    }
    &::-webkit-scrollbar-track {
      background-color: #F1F1F1;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #82BBE8;
    }
  }

  .newsItemBottom {
    position: absolute;
    top: 190px;
    height: 15px;
    background-color: white;
    display: block;
    width: 75%;
  }

  .imgContainer {
    display: grid;
    position: absolute;
    top: 0;
    right: 25px;
    // width: calc(25% - 30px);
  }

  .newsItemImgContainer {
    margin: 12px 0 0 33px;
    border-radius: 12px;
    border: 2px solid #848484;
    width: 197px;
    height: 172px;
  }

  @media (min-width: 1420px) {
    width: 1420px;
  }

  @media (max-width: 1186px) {
    .newsHeader {
      height: 140px;
      width: auto;
      margin: 0 16px;
    }
  }

  @media (max-width: 1090px) {
    .newsList {
      width: auto;
      margin: 0 16px;
    }

    .newsItem {
      width: auto;
    }
    .releaseNewsItem {
      width: auto;
    }
  }

  @media (max-width: 1023px) {
    .Desktop {
      display: none;
    }
    .Tablet {
      display: block;
    }
    .newsHeader {
      height: 140px;
      width: auto;
      margin: 0 16px;
    }

    .newsHeaderText {
      line-height: 30px;
      width: 250px;
      padding-top: 40px;
      margin: 0 auto;
    }

    .UpperContainer {
      width: 100%;
    }
    .imgContainer {
      margin-left: auto;
    }
    .newsItemImgContainer {
      width: 115px;
      height: 100px;
      margin-top: 5px;
    }
    .downloadPDF {
      width: 115px;
      margin-left: 33px;
      padding-left: 35px;
    }
    .readMore {
      width: 115px;
      margin-left: 33px;
      padding-left: 10px;
    }
  }

  @media (max-width: 649px) {
    .newsItemTextContainer {
      width: 100%;
      position: relative;
      .titleImgContainer {
        display: flex;
      }
      .newsSubtitle {
        margin-top: 8px;
      }
      .newsItemDate {
        margin-bottom: 0;
      }
      .imgContainer {
        position: relative;
      }
      .newsItemImgContainer {
        width: 100px;
        height: 85px;
        margin-top: 0px;
      }
    }
    .newsItemTitle {
      font-size: 18px;
      min-height: 50px;
    }
    .tabList {
      display: none;
    }

    .tabDropdown {
      display: block;
    }
    .notMobile {
      display: none;
    }
    .Mobile {
      display: block;
    }
    .newsItem {
      width: auto;
      height: 300px;
      overflow: hidden;
    }
    .releaseNewsItem {
      width: auto;
      height: 550px;
      overflow: hidden;
    }
    .newsItemContent {
      padding-right: 20px;
      margin-top: 0;
      height: 130px;
    }
    .releaseNewsItemContent {
      padding-right: 20px;
      margin-top: 0;
      height: 280px;
      margin-bottom: 10px;
    }
    .downloadPDF {
      display: block;
      width: 167px;
      margin-left: 0px;
      padding-left: 20px;
    }
    .readMore {
      display: block;
      width: 167px;
      margin-left: 0px;
      padding-left: 35px;
    }
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

const getResultList = (tabName) => {
  if (tabName === "All") {
    return fullList;
  } else if(tabName === "Release Notes"){
    return releaseNotesList;
  } else {
    return newsList.filter(item => item.type === tabName);
  }
};

const handleExport = (idx) => {
        const img = document.createElement("img");
        img.src = NCILogoExport;
        img.width = '1';
        const element = document.getElementById(`${idx}_desc`);
        const elementClone = element.cloneNode(true);
        const titleDiv = document.getElementById(`${idx}_title`);
        const dateDiv = document.getElementById(`${idx}_date`);
        const newDiv = document.createElement("div");
        const newDivTitle = document.createElement("div");
        newDivTitle.style = "display: flex;margin-bottom: 15px;";
        const titleSpan = document.createElement('span');
        titleSpan.style = "color: #004187;font-family: Inter;font-size: 28px;font-weight:600;";
        titleSpan.appendChild(document.createTextNode("Site Update Release Notes"));
        newDivTitle.appendChild(titleSpan);
        const newDivUpdate = document.createElement("div");
        newDivUpdate.style = "display: flex;";
        const updateSpan = document.createElement('span');
        updateSpan.style = "color: #567aac;font-family: Inter;font-size: 14px;line-height: 25px;";
        updateSpan.appendChild(document.createTextNode("UPDATE TITLE:"));
        const updateSpanValue = document.createElement('span');
        updateSpanValue.style = "margin-left: 45px;color: #004187;font-family: Inter;font-size: 16px;font-weight:600;line-height: 25px;";
        updateSpanValue.appendChild(document.createTextNode(titleDiv.innerText));
        newDivUpdate.appendChild(updateSpan);
        newDivUpdate.appendChild(updateSpanValue);
        const newDivDate = document.createElement("div");
        newDivDate.style = "display: flex;";
        const dateSpan = document.createElement('span');
        dateSpan.style = "color: #567aac;font-family: Inter;font-size: 14px;line-height: 25px;";
        dateSpan.appendChild(document.createTextNode("DATE OF RELEASE:"));
        const dateSpanValue = document.createElement('span');
        dateSpanValue.style = "margin-left: 20px;color: #004187;font-family: Inter;font-size: 16px;font-weight:600;line-height: 25px;";
        dateSpanValue.appendChild(document.createTextNode(dateDiv.innerText));
        newDivDate.appendChild(dateSpan);
        newDivDate.appendChild(dateSpanValue);
        const breakline = document.createElement("HR");
        breakline.style = "height: 1px; background-color: #3b6697; margin-bottom: 40px;";
        newDiv.appendChild(newDivTitle);
        newDiv.appendChild(newDivUpdate);
        newDiv.appendChild(newDivDate);
        newDiv.appendChild(breakline);
        newDiv.appendChild(elementClone);
        const opt = {
          margin: [35, 15, 20, 15],
          filename: "siteupdate_export.pdf",
          image: {type: 'jpeg', quality: 1},
          html2canvas: {dpi: 72, scale: 4, letterRendering: true},
          jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'}
        };
  
        html2pdf().from(newDiv).set(opt).toContainer()
        .toCanvas()
        .toPdf()
        .get('pdf')
        .then((pdf) => {
          const totalPages = pdf.internal.getNumberOfPages();
          for (let i = 1; i <= totalPages; i += 1) {
              pdf.setPage(i);
              pdf.addImage(img, 'PNG', 13, 7, 120, 15);
              pdf.setDrawColor("#606061");
              pdf.setLineWidth(1.0);
              pdf.line(15, 27, 195, 27);
              pdf.setDrawColor("#3b6697");
              pdf.setLineWidth(0.2);
              pdf.line(15, 280, 195, 280);
              pdf.setFontSize(8);
              pdf.setFont(pdf.getFont().fontName, "normal");
              pdf.setTextColor("#000000");
              pdf.text('U.S. Department of Health and Human Services | National Institutes of Health | National Cancer Institute', 35,
                  pdf.internal.pageSize.getHeight() / 1.04);
              pdf.setFont(pdf.getFont().fontName, "bold");
              pdf.text(`Page ${i} of ${totalPages}`, 180, pdf.internal.pageSize.getHeight() / 1.04);
          }
          })
          .save();
    };

const getPageResults = (selectedTab, pageInfo) => {
  const resultList = getResultList(selectedTab);
  const allids = [];
  const indexStart = pageInfo.pageSize*(pageInfo.page-1);
  const indexEnd = pageInfo.pageSize*pageInfo.page < pageInfo.pageTotal ? pageInfo.pageSize*pageInfo.page - 1 : pageInfo.pageTotal - 1;
  for (let i = indexStart; i<= indexEnd; i++) {
    allids.push(resultList[i]);
  }
  return allids;
}

const NewsView = ({classes}) => {
  // const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("All");
  const newsTabList = ['All', 'News', 'CCDI Application Updates', 'Release Notes'];
  const sizelist = [10,20,50,100];
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(sizelist[0]);
  const [pageTotal, setPageTotal] = useState(getResultList(selectedTab).length);
  const [data, setdata] = useState(getPageResults(selectedTab, {page: page, pageTotal: pageTotal, pageSize: pageSize}));
  const [pageListVisible, setPageListVisible] = useState(0);
  const perPageSelection = useRef(null);
  const anchorRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const announcementsArray = newsList.filter(item => item.type === 'Announcements');
  useOutsideAlerter(perPageSelection);

  const onNext = () => {
    if (page < Math.ceil(pageTotal / pageSize)) {
      let tmp = page + 1;
      setPage(tmp);
      setdata(getPageResults(selectedTab, {page: tmp, pageTotal: pageTotal, pageSize: pageSize}));
    }
  };

  const onPrevious = () => {
    if (page > 1) {
      let tmp = page - 1;
      setPage(tmp);
      setdata(getPageResults(selectedTab, {page: tmp, pageTotal: pageTotal, pageSize: pageSize}));
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
    setdata(getPageResults(selectedTab, {page: newPage, pageTotal: pageTotal, pageSize: pageSize}));
    scrollToTop();
  };

  const onPageSizeClick = (e) => {
    let newPageSize = Number(e.target.innerText);
    setPageSize(newPageSize);
    setPage(1);
    setdata(getPageResults(selectedTab, {page: 1, pageTotal: pageTotal, pageSize: newPageSize}));
    setPageListVisible(!pageListVisible)
  };

  const onClickTab = (newsTabItem) => {
    setSelectedTab(newsTabItem);
    const resultList = getResultList(newsTabItem);
    const total = resultList.length;
    const allids = [];
    const indexStart = 0;
    const indexEnd = pageSize < total ? pageSize - 1 : total - 1;
    for (let i = indexStart; i<= indexEnd; i++) {
      allids.push(resultList[i]);
    }
    setdata(allids);
    setPage(1);
    setPageTotal(total);
  };

  const onClickDropdownItem = (newsTabItem) => {
    setSelectedTab(newsTabItem);
    setDropdownOpen(false)
    const resultList = getResultList(newsTabItem);
    const total = resultList.length;
    const allids = [];
    const indexStart = 0;
    const indexEnd = pageSize < total ? pageSize - 1 : total - 1;
    for (let i = indexStart; i<= indexEnd; i++) {
      allids.push(resultList[i]);
    }
    setdata(allids);
    setPage(1);
    setPageTotal(total);
  };

  // const gotoNewsDetail = (e, newsID) => {
  //   if (e.target.tagName !== 'A') {
  //     navigate(`/newsdetail/${newsID.trim()}`);
  //   }
  // };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
    }
    setDropdownOpen(false);
  };

  const handleReadMore = (id) => { 
    const newWindow = window.open(`/release-notes#${id}`, '_self')
    if (newWindow) newWindow.opener = null
  }

  return (
    <NewsContainer>
      <div className='newsHeader'><div className='newsHeaderText'>Hub News and Updates</div></div>
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
      <div className='numResults'><b>{getResultList(selectedTab).length}</b> results</div>
      <div className='newsList'>
        {
          data.length > 0 ? data.map((newsItem, idx) => {
            const newskey = `news_${idx}`;
             return (
              newsItem.type !== 'Release Notes' ? <div id={newsItem.id} key={newskey} className='newsItem'>
                <div className="UpperContainer notMobile">
                  <div className='newsItemTextContainer'>
                    <div className='newsItemTitle'>{newsItem.title}</div>
                    <div className='newsSubtitle'>
                      <div className='newsItemDate'>{newsItem.date}</div>
                      <div className='newsCategory'>{newsItem.type}</div>
                    </div>
                  </div>
                  <div className='newsItemContent'>
                    <div className='newsItemTitle newsItemTitleInner'>{newsItem.title}</div>
                    {ReactHtmlParser(newsItem.highlight)}
                  </div>
                  {newsItem.img && <div className='imgContainer'><img className='newsItemImgContainer' src={srcList[newsItem.img]} alt={altList[newsItem.img]}/></div>}
                </div>
                <div className="UpperContainer Mobile">
                  <div className='newsItemTextContainer'>
                    <div className="titleImgContainer">
                      <div className='newsItemTitle'>{newsItem.title}</div>
                      {newsItem.img && <div className='imgContainer'><img className='newsItemImgContainer' src={srcList[newsItem.img]} alt={altList[newsItem.img]}/></div>}
                    </div>
                    <div className='newsSubtitle'>
                      <div className='newsItemDate'>{newsItem.date}</div>
                      <div className='newsCategory'>{newsItem.type}</div>
                    </div>
                  </div>
                  <div className='newsItemContent'>
                    {ReactHtmlParser(newsItem.highlight)}
                  </div>
                </div>
              </div> :
              <div id={`post${newsItem.id}`} key={newskey} className='releaseNewsItem'>
              <div className="UpperContainer notMobile">
                <div className='newsItemTextContainer'>
                  <div id={`${newsItem.id}_title`} className='newsItemTitle'>{newsItem.title}</div>
                  <div className='newsSubtitle'>
                    <div id={`${newsItem.id}_date`} className='newsItemDate'>{newsItem.date}</div>
                    <div className='newsCategory'>{newsItem.type}</div>
                  </div>
                </div>
                <div id={`${newsItem.id}_desc`} className='releaseNewsItemContent'>
                  <div className='newsItemTitle newsItemTitleInner'>{newsItem.title}</div>
                  {ReactHtmlParser(newsItem.fullText)}
                </div>
                {newsItem.img && <div className='imgContainer'>
                  <img className='newsItemImgContainer' src={srcList[newsItem.img]} alt={altList[newsItem.img]}/>
                  <Button className='downloadPDF Desktop' onClick={() => handleExport(newsItem.id)}>Download PDF<img src={UploadIcon} alt="download pdf icon" /></Button>
                  <Button className='downloadPDF Tablet' onClick={() => handleExport(newsItem.id)}>PDF<img src={UploadIcon} alt="download pdf icon" /></Button>
                  <Button className='readMore Desktop' onClick={() => handleReadMore(newsItem.id)}>Read More<img src={exportIcon} alt="outlink icon" /></Button>
                  <Button className='readMore Tablet' onClick={() => handleReadMore(newsItem.id)}>Read More<img src={exportIcon} alt="outlink icon" /></Button>
                </div>}
              </div>
              <div className="UpperContainer Mobile">
                <div className='newsItemTextContainer'>
                  <div className="titleImgContainer">
                    <div className='newsItemTitle'>{newsItem.title}</div>
                    {newsItem.img && <div className='imgContainer'>
                      <img className='newsItemImgContainer' src={srcList[newsItem.img]} alt={altList[newsItem.img]}/>
                      </div>}
                  </div>
                  <div className='newsSubtitle'>
                    <div className='newsItemDate'>{newsItem.date}</div>
                    <div className='newsCategory'>{newsItem.type}</div>
                  </div>
                </div>
                <div className='releaseNewsItemContent'>
                  {ReactHtmlParser(newsItem.fullText)}
                </div>
                <Button className='downloadPDF' onClick={() => handleExport(releaseNotesList.id)}>Download PDF<img src={UploadIcon} alt="download pdf icon" /></Button>
                <Button className='readMore'>Read More<img src={exportIcon} alt="outlink icon" /></Button>
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
    </NewsContainer>
    
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
    // '@media (max-width: 500px)': {
    //   justifyContent: 'left',
    //   paddingLeft: '30px',
    // }
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
      fontSize: '18px',
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

export default withStyles(styles)(NewsView);
