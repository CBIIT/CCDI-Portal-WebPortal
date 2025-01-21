import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Collapse } from '@material-ui/core';
import html2pdf from "html2pdf.js";
import ReactHtmlParser from "html-react-parser";
import { siteUpdateList } from '../../../bento/newsData';
import NCILogoExport from '../../../assets/about/NCI_Logo.png'

const SiteUpdateResultContainer = styled.div`
    width: 1420px;
    margin: 0 auto;

    .titleContainer {
        width: 1338px;
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
`;

const SiteUpdateResultContext = styled.div`
  width: 1420px;
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
    border-radius: 0px 20px;
    border: 1.5px solid #00BDCD;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25);
    padding: 33px 38px;
    width: 918px;
    max-height: 1138px;
    overflow-y: auto;
    position: relative;

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
    width: 167px;
    height: 41px;
    background: #05555C;
    border-radius: 5px;

    .spanText {
        padding: 12px 10px;
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
        <SiteUpdateResultContainer>
            <div className='titleContainer'>Release Notes</div>
            <SiteUpdateResultContext>
                <SiteUpdateItem id={`post${siteUpdateList[selectedIdx].id}`}>
                    <SiteUpdateCard>
                        <div className='cardHeaderContainer'>
                            <div>
                                <div className="cardTitleContainer" id={`${siteUpdateList[selectedIdx].id}_title`} title={siteUpdateList[selectedIdx].title}>{siteUpdateList[selectedIdx].title}</div>
                                <div className="cardDateContainer" id={`${siteUpdateList[selectedIdx].id}_date`}>{formatDate(siteUpdateList[selectedIdx].date)}</div>
                            </div>
                            <SiteUpdateExport>
                                <div className="spanText" onClick={() => handleExport(siteUpdateList[selectedIdx].id)}>
                                    DOWNLOAD PDF
                                </div>
                            </SiteUpdateExport>
                        </div>
                        <SiteUpdateCardDescription id={`${siteUpdateList[selectedIdx].id}_desc`}>
                            {ReactHtmlParser(siteUpdateList[selectedIdx].fullText)}
                        </SiteUpdateCardDescription>
                    </SiteUpdateCard>
                </SiteUpdateItem>
            </SiteUpdateResultContext>
        </SiteUpdateResultContainer>
    );
};

export default ReleaseNotesPageView;