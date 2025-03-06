import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { withStyles, Collapse, Tooltip, ClickAwayListener } from '@material-ui/core';
import html2pdf from "html2pdf.js";
import ReactHtmlParser from "html-react-parser";
import { releaseNotesList } from '../../../bento/newsData';
import NCILogoExport from '../../../assets/about/NCI_Logo.png';
import ArrowDownIcon from '../../../assets/about/Arrow_Down_Black_Icon.svg';
import UploadIcon from '../../../assets/about/Upload-Icon.svg';
import ClinicalTrialsIcon from '../../../assets/about/Release_Clinical_Icon.svg';
import GenomicsIcon from '../../../assets/about/Release_Genomics_Icon.svg';
import ImagingIcon from '../../../assets/about/Release_Imaging_Icon.svg';
import XenograftIcon from '../../../assets/about/Release_Xenograft_Icon.svg';
import EpidemiologicIcon from '../../../assets/about/Release_Epidemiologic_Icon.svg';
import CellLinesIcon from '../../../assets/about/Release_CellLines_Icon.svg';

const SiteUpdateResultContainer = styled.div`
    margin: 0 16px;

    .titleContainer {
        width: 100%;
        padding: 48px 0;
        color: var(--Utility-Colors-Dark-Teal-Hover, #1A5255);
        text-align: center;
        font-family: Poppins;
        font-size: 35px;
        font-style: normal;
        font-weight: 600;
        line-height: 35px; /* 100% */
        letter-spacing: 0.7px;
        border-bottom: 1px solid #007A85;
        margin-bottom: 60px;
    }

    .siteUpdateContext {
      display: flex;
      margin: 0 100px;
    }

    @media (min-width: 1420px) {
      width: 1380px;
      margin: 0 auto;
    }

    @media (max-width: 767px) {
      .siteUpdateContext {
        display: block;
        margin: 0 10px;
      }
    }
`;

const SiteUpdateResultContext = styled.div`
  display: flex;
  padding: 0 20px 50px 0;

  @media (min-width: 1420px) {
    width: 1420px;
  }
`;

const NavContainer = styled.div`
  padding: 0 0 50px 0;
  margin-right: 30px;
  border-top: 7.6px solid #1F939D;

  .navListContainer {
    width: 262px;
    margin: 0;
    padding-left: 0;
  }

  .mobileBtn {
    display: none;
  }

  .navTitle {
    color: #000000;
    font-family: Poppins;
    font-size: 18.5px;
    font-style: normal;
    font-weight: 500;
    line-height: 106.523%; /* 19.707px */
    letter-spacing: -0.37px;
    text-transform: uppercase;
    background: #F4F4F4;
    padding: 15px 0 15px 20px;
    border-left: 0.5px solid #969696;
    border-right: 0.5px solid #969696;
  }

  .dateSubListContainer {
    list-style-type: none;
    border-left: 0.5px solid #969696;
    border-right: 0.5px solid #969696;
  }

  .yearTitle {
    display: flex;
    border-top: 0.5px solid #969696;
    color: #000000;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.32px;
    text-transform: lowercase;
    background: #FFFFFF;
    padding: 10px 20px;

    :hover {
      cursor: pointer;
    }
  }

  .arrowIcon {
    margin-right: 10px;
  }

  .dateSubList {
    padding: 0;
  }

  .dateListItem {
    list-style-type: none;
    padding: 4px 10px 4px 42px;
    background: #F4F4F4;
    margin-bottom: 4px;

    :last-child {
      margin-bottom: 0;
    }

    :hover {
      cursor: pointer;
    }
  }

  .dateListItemContainer {
    display: flex;
  }
  .dateListVersionText {
    color: #000000;
    font-family: Nunito;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    
  }
  .dateListItemText {
    margin-left: auto;
    margin-top: 4px;
    color: #000000;
    text-align: right;
    font-family: Nunito;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px; 
  }

  .bottomLine {
    border-top: 0.5px solid #969696;
  }

  @media (max-width: 1023px) {
    .dateListItemText {
      display: none;
    }

    .navListContainer {
      width: 182px;
      margin: 0;
      padding-left: 0;
    }
  }

  @media (max-width: 767px) {
    position: absolute;
    z-index: 999;

    .dateListItemText {
      display: block;
    }

    .mobileBtn {
      display: block;
    }

    .navTitle {
      display: none;
    }

    .navListContainer {
      width: 100%;
    }
  }
`;

const SiteUpdateItem = styled.div`
  scroll-margin: 200px;
  border-radius: 0px 20px;
  border: 1.5px solid #00BDCD;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;

  @media (max-width: 767px) {
    margin-top: 100px;
  }
`;

const SiteUpdateCard = styled.div`
    display: grid;
    padding: 33px 38px;
    // width: 850px;
    max-height: 1138px;
    overflow-y: auto;
    // position: relative;
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

    .cardHeaderContainer {
        display: flex;
        border-bottom: 0.5px solid #00838F;
        padding-bottom: 15px;
    }

    .cardTitleContainer {
        color: #00838F;
        font-family: Poppins;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 100% */
        letter-spacing: 0.4px;
        margin-bottom: 5px;
    }

    .cardDateContainer {
        color: #000000;
        font-family: Inter;
        font-size: 13px;
        font-style: normal;
        font-weight: 300;
        line-height: 24px; /* 184.615% */
        text-transform: uppercase;
    }
`;

const DataContentType = styled.div`
  font-size: 3rem;
  line-height: 23px;
  border-bottom: 0.5px solid #00838F;
  margin: 0px 0px 10px 0px;
  padding: 10px 0;

  .typeIcon {
    margin-right: 18px;
  }

  .typeIcon:hover {
    cursor: pointer;
  }
`;

const SiteUpdateExport = styled.div`
    width: 167px;
    height: 41px;
    background: #05555C;
    border-radius: 5px;
    margin-left: auto;

    .spanText {
        display: flex;
        padding: 10px 18px;
        color: #FFFFFF;
        font-family: Poppins;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: 16px; /* 133.333% */
        letter-spacing: 0.24px;
        text-transform: uppercase;
    }

    .spanText:hover {
      cursor: pointer;
    }

    .downloadPDFText {
      margin-right: 12px;
      padding-top: 3px;
    }
    .downloadPDFImg {
      // margin-top: 10px;
    }
`;

const SiteUpdateCardDescription = styled.div`
    color: #000000;
    font-family: Lato;
    font-size: 14px;
    line-height: 17px;
    padding: 0px 0px 20px 0px;

    a {
        // color: #00a272;
        // text-decoration: none;
        text-decoration-color: #0563C1;
        font-weight: 500;
    }

    a[target="_blank"]::after {
      content: " ";
      font-weight: bold;
      color: #004187;
      font-size: 14px;
      background-repeat: no-repeat;
      background-size: 100%;
      background-position-y: 4px;
      background-position-x: -2px;
      width: 17px;
      height: 17px;
      display: inline-table;
    }

    p {
      font-family: Lato;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
    }
`;

const ReleaseNotesPageView = () => {
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [siteUpdateNav, setSiteUpdateNav] = useState([]);
    const [open, setOpen] = useState([]);
    const [mobile, setMobile] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const iconSrc = {
      Clinical: ClinicalTrialsIcon,
      'Genomics/Omics': GenomicsIcon,
      Imaging: ImagingIcon,
      Xenograft: XenograftIcon,
      Epidemiologic: EpidemiologicIcon,
      'Cell Lines': CellLinesIcon,
    };

    const iconAlt = {
      Clinical: 'Icon of a folder with plus sign',
      'Genomics/Omics': 'DNA helix icon',
      Imaging: 'Outline icon of a person going through an MRI scan',
      Xenograft: 'Outline icon of a lab mouse with a syringe injecting into its back, representing medical or scientific research.',
      Epidemiologic: 'Globe icon with a plus sign, representing global data types',
      'Cell Lines': 'Outline icon of petri dish with bacteria',
    };
    // const formatDate = (date) => {
    //     const dateData = `${date.substring(5, 7)}/${date.substring(8, 10)}/${date.substring(0, 4)}`;
    //     const newDate = new Date(dateData);
    //     const newDateArr = newDate.toDateString().split(' ');
    //     const month = newDate.toLocaleString('default', { month: 'long' });
    //     const newDateFormat = month.concat(' ', newDateArr[2], ', ', newDateArr[3]);
    //     return newDateFormat;
    // };

    const createNav = () => {
        const NavList = [];
        let SubObj = null;
        let SubList = [];
        let prevYear = 0;
        for (let i = 0; i < releaseNotesList.length; i += 1) {
          const currYear = releaseNotesList[i].date.split(", ")[1];
          const yearObj = {};
          const fullMonth = releaseNotesList[i].date.split(" ")[0];
          const restDate = releaseNotesList[i].date.split(fullMonth)[1];
          const newDate = fullMonth.substring(0,3) + restDate;
          // const newDateFormat = formatDate(date);
          if (prevYear !== currYear) {
            if (SubObj) {
              SubObj.list = SubList;
              NavList.push(SubObj);
            }
            SubList = [];
            SubObj = {};
            SubObj.year = currYear;
            prevYear = currYear;
          }
          yearObj.version = releaseNotesList[i].version;
          yearObj.date = newDate;
          yearObj.index = i;
          SubList.push(yearObj);
          if (i === releaseNotesList.length - 1) {
            SubObj.list = SubList;
            NavList.push(SubObj);
          }
        }
        return NavList;
    };

    const resizeHandler = () => {
      if (window.innerWidth > 767) {
        setMobile(false);
      } else {
        setMobile(true);
      }
  };

    useEffect(() => {
            window.addEventListener('resize', resizeHandler);
            resizeHandler();
            return () => window.addEventListener('resize', resizeHandler);
        }, []);

    useEffect(() => {
      // if (releaseNotesList.length > 0) {
      //   if (hash !== '') {
      //     const id = hash.replace('#', '');
      //     const element = document.getElementById(id);
      //     if (element) element.scrollIntoView({ behavior: 'smooth'});
      //   }
      // }
      setSiteUpdateNav(createNav());
    }, [releaseNotesList]);

    useEffect(() => {
      if (siteUpdateNav.length > 0) {
        let openArr = [];
        const currentUrl = window.location.href;
        const urlArr = currentUrl.split("#");
        let openYear = siteUpdateNav[0].year;
        if (urlArr.length > 1) {
          openYear = urlArr[1].slice(-4);
          const ids = releaseNotesList.map( (item) => item.id);
          const urlIdx = ids.indexOf(urlArr[1]);
          setSelectedIdx(urlIdx);
        }
        for (let i = 0; i < siteUpdateNav.length; i += 1) {
          if (openYear === siteUpdateNav[i].year) {
            openArr[i] = true;
          } else {
            openArr[i] = false;
          }
        }
        setOpen(openArr);
      }
    }, [siteUpdateNav]);

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

    const handleClick = (idx) => {
      const newOpen = Object.assign([], open);
      newOpen[idx] = !newOpen[idx];
      setOpen(newOpen);
    };

    const onClickDropdownItem = (idx) => {
      setSelectedIdx(idx);
      setDropdownOpen(false);
    }

    const LightTooltip = withStyles(() => ({
      arrow: {
        color: 'white',
        "&:before": {
          border: "1px solid #676767"
        },
      },
      tooltip: {
        backgroundColor: 'white',
        border: '1px solid #676767',
        color: '#000000',
        fontFamily: 'Poppins',
        fontSize: 13,
        fontWeight: 400,
        letterSpacing: '-0.13px',
      },
    }))(Tooltip);
    

    return (
        <SiteUpdateResultContainer>
            <div className='titleContainer'>Release Notes</div>
            <div className='siteUpdateContext'>
              <NavContainer>
                <div className="mobileBtn" onClick={() => setDropdownOpen(!dropdownOpen)}>Release Version</div>
                <ul className="navListContainer">
                  <div className="navTitle">Release Note</div>
                {
                  siteUpdateNav.map((subObj, objidx) => {
                    const objkey = `obj_${objidx}`;
                    if (mobile && !dropdownOpen) {
                      return null;
                    }
                    return (
                      <li key={objkey} className="dateSubListContainer">
                        <div className="yearTitle" onClick={() => handleClick(objidx)}>
                          <img className='arrowIcon' src={ArrowDownIcon} alt="arrow down icon"/>
                          <span>{subObj.year}</span>
                        </div>
                        <Collapse in={open[objidx]}>
                          <ul className="dateSubList">
                          {
                            subObj.list.map((navItem, yearidx) => {
                              const yearkey = `obj_${yearidx}`;
                              return (
                                <li key={yearkey} className="dateListItem" style={selectedIdx === navItem.index ? {background: '#E7F1F5'} : null}>
                                  <div className='dateListItemContainer' onClick={() => onClickDropdownItem(navItem.index)}>
                                    <div className="dateListVersionText">Version: {navItem.version}</div>
                                    <div className="dateListItemText">{navItem.date}</div>
                                  </div>
                                </li>
                              );
                            })
                          }
                          </ul>
                        </Collapse>
                      </li>
                    );
                  })
                }
                  <div className='bottomLine' />
                </ul>
              </NavContainer>
              <SiteUpdateResultContext>
                  <SiteUpdateItem id={`post${releaseNotesList[selectedIdx].id}`}>
                      <SiteUpdateCard>
                          <div className='cardHeaderContainer'>
                              <div>
                                  <div className="cardTitleContainer" id={`${releaseNotesList[selectedIdx].id}_title`} title={releaseNotesList[selectedIdx].version}>{releaseNotesList[selectedIdx].title}</div>
                                  <div className="cardDateContainer" id={`${releaseNotesList[selectedIdx].id}_date`}>{releaseNotesList[selectedIdx].date}</div>
                              </div>
                              <SiteUpdateExport>
                                  <div className="spanText" onClick={() => handleExport(releaseNotesList[selectedIdx].id)}>
                                      <div className='downloadPDFText'>DOWNLOAD PDF</div>
                                      <div className='downloadPDFImg'><img src={UploadIcon} alt="download pdf icon" /></div>
                                  </div>
                              </SiteUpdateExport>
                          </div>
                          { releaseNotesList[selectedIdx].contentType
                          && (
                            <DataContentType>
                              {
                                releaseNotesList[selectedIdx].contentType.split(",").map((type, typeidx) => {
                                  const typekey = `update_${typeidx}`;
                                  const newType = type.trim();
                                  return (
                                    <LightTooltip
                                      key={typekey}
                                      title={newType}
                                      arrow
                                      PopperProps={{ style: { marginTop: -8 } }}
                                    >
                                      <img src={iconSrc[newType]} className= "typeIcon" alt={iconAlt[newType]} />
                                    </LightTooltip>
                                  );
                                })
                              }
                            </DataContentType>
                          )}
                          <SiteUpdateCardDescription id={`${releaseNotesList[selectedIdx].id}_desc`}>
                              {ReactHtmlParser(releaseNotesList[selectedIdx].fullText)}
                          </SiteUpdateCardDescription>
                      </SiteUpdateCard>
                  </SiteUpdateItem>
              </SiteUpdateResultContext>
            </div>
        </SiteUpdateResultContainer>
    );
};

export default ReleaseNotesPageView;