import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Collapse } from '@material-ui/core';
import html2pdf from "html2pdf.js";
import ReactHtmlParser from "html-react-parser";
import { siteUpdateList } from '../../../bento/newsData'

const SiteUpdateResultContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 0 20px 50px 0;
`;

const NavContainer = styled.div`
  display: flex;
  padding: 0 0 50px 0;
  border-right: 1px solid #E0E4E7;
  border-top: 3px solid #C3D5E0;

  .navListContainer {
    width: 230px;
    margin: 5px;
    padding-left: 0;
  }

  .navTitle {
    color: #004187;
    font-family: Lato;
    font-size: 21px;
    font-style: normal;
    font-weight: 900;
    line-height: 150%; /* 31.5px */
    letter-spacing: 0.105px;
    padding: 7px 0 6px 10px;
    background: #F7F8FA;
  }

  .dateSubListContainer {
    list-style-type: none;
    margin-bottom: 2px;
  }

  .yearTitleContainer {
    background: #F7F8FA;  
    padding: 0 10px;
  }

  .yearTitle {
    width: 100%;
    padding: 7px 0;
    // margin-top: 2px;
    border: none;
    color: #8A9296;
    font-family: Lato;
    font-size: 12.8px;
    font-style: normal;
    font-weight: 600;
    line-height: 15.36px; /* 120% */
    text-align: left;
    border-top: 1px solid #4BA4E3;
    background: #F7F8FA;
  }

  .yearTitle:not(.collapsed)::after {
    background-image: none;
    transform: rotate(-180deg);
  }

  .yearTitle::after {
    flex-shrink: 0;
    width: 1rem;
    height: 0;
    display: inline-block;
    vertical-align: .5em;
    content: "";
    border-top: .6em solid;
    border-right: .5em solid transparent;
    border-bottom: 0;
    border-left: .5em solid transparent;
    font-size: 1rem;
    background-image: none;
    transition: transform .2s ease-in-out;
    color: #4ba4e3;
    text-align: right;
    float:right;
  }

  .dateSubList {
    padding: 0;
  }

  .dateListItem {
    list-style-type: none;
    padding: 5px 10px;

    a {
      text-decoration: none;
      color: #004187;
      font-family: Lato;
      font-size: 17px;
      font-style: normal;
      font-weight: 700;
      line-height: 150%; /* 25.5px */
    }

    :nth-child(6n+1) {
    background-color: #e9e9e9;
  }

    :nth-child(6n+3) {
      background-color: #d6e6f3;
    }

    :nth-child(6n+5) {
      background-color: #e9e2bc;
    }
  }

  .dateListItemText {
    width: 100%;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ResultInfo = styled.div`
  margin-left: 20px;
  font-weight: bold;
`;

const SiteUpdateItem = styled.div`
  scroll-margin: 200px;
`;

const SiteUpdateCard = styled.div`
  display: grid;
  border: 1px solid #b6dffd;
  box-shadow: 3px 3px 10px lightgray;
  // margin-top: 20px;
  // margin: -44px 30px 0px 370px;
  padding: 2px 29px 15px 29px;
  width: 918px;
  max-height: 1138px;
  overflow-y: auto;
  position: relative;
`;

const SiteUpdateCardTitle = styled.div`
    color: #00A272;
    font-family: Inter;
    font-size: 33px;
    font-weight: 300;
    line-height: 39.6px;
    letter-spacing: -0.165px;
    border-bottom: 2px solid #004187;
    margin: 5px 0px 5px 0px;
    padding-bottom: 10px;
`;

const DataContentType = styled.div`
  font-size: 3rem;
  line-height: 23px;
  border-bottom: 2px solid lightgray;
  margin: 0px 0px 10px 0px;
  padding-bottom: 6px;

  .typeIcon {
    height: 30px;
    margin: 0px 8px 0px 8px;
  }

  .typeIcon:hover {
    cursor: pointer;
  }

  .clinicalIcon {
    height: 35px;
    margin: 0px 8px 0px 8px;
  }

  .clinicalIcon:hover {
    cursor: pointer;
  }
`;

const SiteUpdateExport = styled.div`
    position: absolute;
    right: 29px;
    top: 10px;
    z-index: 9;

    .spanText {
      padding-right: 30px;
      display: flex;
    }
    
    .buttonStyle {
      width: 100px;
      position: relative;
      font-size: 14px;
      font-weight: bold;
      text-align: right;
      color: white;
      padding: 10px 0px 10px 200px;
      margin-top: -3px;
      text-transform: uppercase;
      display: flex;
      -webkit-box-pack: center;
      justify-content: right;
      -webkit-box-align: center;
      align-items: center;
      float: right;
      text-decoration: none;
    }
    
    .buttonStyle:hover {
      color: lightgray;
      text-decoration: none;
    }
    
    .buttonStyle::after {
      position: absolute;
      z-index: -1;
      content: "";
      border-bottom: 35px solid #004187;
      border-left: 35px solid transparent;
      height: 0;
      width: 159px;
    }    
`;

const SiteUpdateCardDescription = styled.div`
    color: #000000;
    font-family: Lato;
    font-size: 14px;
    line-height: 17px;
    padding: 0px 0px 20px 0px;

    .dateContainer {
      color: #707F8D;
      font-family: Lato;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 24px */
      margin-bottom: 10px;
    }

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
    const formatDate = (date) => {
        const dateData = `${date.substring(5, 7)}/${date.substring(8, 10)}/${date.substring(0, 4)}`;
        const newDate = new Date(dateData);
        const newDateArr = newDate.toDateString().split(' ');
        const month = newDate.toLocaleString('default', { month: 'long' });
        const newDateFormat = month.concat(' ', newDateArr[2], ', ', newDateArr[3]);
        return newDateFormat;
    };

    const handleExport = (idx) => {
        console.log("???", idx);
        const img = document.createElement("img");
        // img.src = NCILogoExport;
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
  
        console.log("!!!", newDiv);
        html2pdf().from(newDiv).set(opt).toContainer()
        .toCanvas()
        .toPdf()
        .get('pdf')
        .then((pdf) => {
            console.log("&&&", pdf);
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
    return (
        <>
        <SiteUpdateResultContainer>
            <SiteUpdateItem id={`post${siteUpdateList[selectedIdx].id}`}>
                <SiteUpdateCard>
                    <SiteUpdateCardTitle id={`${siteUpdateList[selectedIdx].id}_title`} title={siteUpdateList[selectedIdx].title}>
                        {siteUpdateList[selectedIdx].title}
                    </SiteUpdateCardTitle>
                    <SiteUpdateExport>
                        <a href="#" role="button" className="buttonStyle" onClick={() => handleExport(siteUpdateList[selectedIdx].id)}>
                        <span className="spanText">
                            <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="svg-inline--fa fa-arrow-from-bottom fa-w-12 fa-lg">
                            <path fill="currentColor" d="M360 480H24c-13.3 0-24-10.7-24-24v-24c0-13.3 10.7-24 24-24h336c13.3 0 24 10.7 24 24v24c0 13.3-10.7 24-24 24zM90.4 216.5l65.6-65.6V360c0 13.3 10.7 24 24 24h24c13.3 0 24-10.7 24-24V150.9l65.6 65.6c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L209 30.1c-9.4-9.4-24.6-9.4-33.9 0L39.5 165.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0z" className="" />
                            </svg>
                            &nbsp;&nbsp;export
                        </span>
                        </a>
                    </SiteUpdateExport>
                    <SiteUpdateCardDescription id={`${siteUpdateList[selectedIdx].id}_desc`}>
                        <div className="dateContainer" id={`${siteUpdateList[selectedIdx].id}_date`}>{formatDate(siteUpdateList[selectedIdx].date)}</div>
                        {ReactHtmlParser(siteUpdateList[selectedIdx].fullText)}
                    </SiteUpdateCardDescription>
                </SiteUpdateCard>
            </SiteUpdateItem>
        </SiteUpdateResultContainer>
        </>
    );
};

export default ReleaseNotesPageView;