import React, { useState } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'html-react-parser';
import { newsList } from '../../../bento/newsData';
import { titleData } from '../../../bento/landingPageData';
import exportIconText from '../../../assets/landing/Export_Icon_White.svg';

const LatestUpdatesSection = styled.div`
  position: relative;
  z-index: 5;
  margin-top: 23px;
`;

const LatestUpdatesContainer = styled.div`
    margin: 0 auto;
    position: relative;

    .latestUpdatesList {
      display: flex;
      justify-content: center;
    }

    .latestUpdatesListItem {
      margin: 16px;
      width: 367px;
      height: 476px;
      background-color: #044249;
      box-shadow: 0px 0px 16px #1B1C1C80;
      border-radius: 0px 20px;
    }

    .latestUpdatesListItemPic {
      border-radius: 0px 20px 0 0;
      width: 367px;
      height: 310px;
    }

    .latestUpdatesListTitleContainer {
      text-decoration: none;
    }

    .latestUpdatesListTitle {
      color: #88DCDD;
      padding: 14px 23px 0 23px;
      margin-bottom: 7px;
      font-family: Poppins;
      font-weight: 500;
      font-size: 16px;
      line-height: 16px;
      height: 57px;
    }

    .latestUpdatesListTitle:hover{
      color: #72F9FB;
      cursor: pointer;
    }

    .latestUpdatesListContent {
      color: #FFFFFF;
      padding: 0 23px 0 23px;
      font-family: Inter;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      letter-spacing: -0.02em;
    }

    .latestUpdatesTextContent {
      a {
        color: #FFFFFF;
        padding-right: 20px;
        background: url(${exportIconText}) right center no-repeat;
        text-underline-offset: 5px;
      }
    }

    .readMoreContainer {
      font-size: 14px;
      color: #AFF1FF;
      border-bottom: 1px solid #AFF1FF;
      text-decoration: none;
      margin-left: 12px;
    }

    .readMoreContainer:hover{
      color: #5EF2FF;
      border-bottom: 1px solid #5EF2FF;
      cursor: pointer;
    }

    .readMoreContainer::after {
      content: '>';
      margin-left: 4px;
    }

    .hoverTextContentContainer {
      display: none;
    }

    @media (max-width: 1199px) {
      .latestUpdatesList {
        display: grid;
        grid-column-gap: 30px;
        grid-template-columns: 214px 214px 214px;
        justify-content: left;
        margin-left: calc(50vw - 405px);
      }

      .latestUpdatesListItem {
        width: 214px;
        height: 279px;
        margin: 0;
      }

      .latestUpdatesListItemPic {
        width: 214px;
        height: 181px;
        object-fit: contain;
      }

      .latestUpdatesListTitle {
        padding: 6px 14px;
        font-size: 14px;
      }

      .latestUpdatesListContent {
        display: none;
      }

      .hoverTextContentContainer {
        // display: block;
        position: absolute;
        top: 40px;
        width: 214px;
        height: 279px;
        background: rgb(25, 33, 39, .8);
        border-radius: 0px 20px;
        padding: 40px 16px;
      }

      .hoverTextContent {
        color: #FFFFFF;
        font-family: Inter;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        letter-spacing: -0.02em;
        margin-bottom: 20px;
      }

      .hover {
        margin-left: 0;
      }
    }

    @media (max-width: 872px) {
      .latestUpdatesList {
        margin-left: 30px;
      }
    }
`;

const TitleContainer = styled.div`
    display: flex;
    color: #05555C;
    margin: 0 calc(50vw - 580px) 38px 0;
    justify-content: flex-end;

    .titleLine {
      margin-right: 15px;
      display: flex;
      height: 32px;
    }

    .titleLineLong {
      content:'';
      display:inline-block;
      width: 100px; 
      border-bottom: 3px solid #05555C;
      margin-left: 2px;
    }

    .titleLineShort {
      content:'';
      display:inline-block;
      width: 7px; 
      border-bottom: 3px solid #05555C;
      margin-right: 3px;
    }

    .titleText {
      font-family: Poppins;
      font-weight: 600;
      font-size: 35px;
    }

    @media (max-width: 1199px) {
      justify-content: left;
      margin: 0 0 20px calc(50vw - 405px);

      .titleLine {
        display: none;
      }

      .titleText {
        font-size: 14px;
        font-line: 17px;
      }
    }

    @media (max-width: 872px) {
      margin: 0 0 20px 30px;
    }
`;

const LatestUpdate = () => {
    const [hoverItem, setHoverItem] = useState(""); 
    return (
        <LatestUpdatesSection>
            <LatestUpdatesContainer>
            <TitleContainer>
                <div className='titleLine'>
                <div className='titleLineShort' />
                <div className='titleLineShort' />
                <div className='titleLineLong' />
                </div>
                <div className='titleText'>{titleData.latestUpdatesTitle}</div>
            </TitleContainer>
            <div className='latestUpdatesList'>
                {
                newsList.slice(0,3).map((updateItem, updateidx) => {
                    const updatekey = `update_${updateidx}`;
                    return (
                    <div className='latestUpdatesListItem' key={updatekey} onMouseEnter={() => setHoverItem(updateItem.id)} onMouseLeave={() => setHoverItem("")}>
                        <a href={`/news#${updateItem.id}`} ><img className='latestUpdatesListItemPic' src={updateItem.img} alt="updateItemImg"/><span style={{display:'none'}}>latestUpdates text</span></a>
                        <a className='latestUpdatesListTitleContainer' href={`/news#${updateItem.id}`}><div className='latestUpdatesListTitle'>{updateItem.title}</div></a>
                        <div className='latestUpdatesListContent'>
                        <span className='latestUpdatesTextContent'>{ReactHtmlParser(updateItem.slug)}</span>
                        { updateItem.slug.length > 100 && updateItem.slug.length < 110
                        ? <div><a className='readMoreContainer' href={`/news#${updateItem.id}`} style={{marginLeft: 0}}>Read More</a></div>
                        : <a className='readMoreContainer' href={`/news#${updateItem.id}`}>Read More</a>}
                        </div>
                        <div className='hoverTextContentContainer' style={hoverItem === updateItem.id ? {display: "block"} : {display: "none"}}>
                        <div className='hoverTextContent'>{ReactHtmlParser(updateItem.slug)}</div>
                        <a className='readMoreContainer hover' href={`/news#${updateItem.id}`}>Read More</a>
                        </div>
                    </div>
                    )
                })
                }
            </div>
            </LatestUpdatesContainer>
        </LatestUpdatesSection>
    );
};

export default LatestUpdate;