import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'html-react-parser';
import usePageVisibility from "./PageVisibility";
import { altList, srcList, newsList, releaseNotesList } from '../../../bento/newsData';
import { titleData } from '../../../bento/landingPageData';
import exportIconText from '../../../assets/landing/Export_Icon_White.svg';
import startIcon from '../../../assets/icons/Start_Icon.svg';
import pauseIcon from '../../../assets/icons/Pause_Icon.svg';

let timer = null;

const fullList = (newsList.concat(releaseNotesList)).sort((a,b) => {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}).reverse();

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

    .latestUpdatesListItem:nth-child(1) {
        display: none;
    }

    .latestUpdatesListItem:nth-child(5) {
        display: none;
    }

    .latestUpdatesListItem:nth-child(6) {
        display: none;
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

    .buttonContainer {
      display: none;
    }

    @media (min-width: 1200px) {
        .hoverTextContent {
            display: none;
        }

        .hover {
            display: none;
        }
    }

    @media (max-width: 1199px) {
        .latestUpdatesList {
            position: relative;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: left;
            flex-direction: row;
            margin-left: calc(50vw - 405px);
        }

        .latestUpdatesListItem {
            position: absolute;
            width: 214px;
            height: 284px;
            margin: 0;
            box-shadow: none;
        }

        .latestUpdatesListItem:nth-child(1) {
            transform: translateX(-115%);
            display: block;
            visibility: hidden;
          }

        .latestUpdatesListItem:nth-child(2) {
            transform: translateX(0);
          }
    
          .latestUpdatesListItem:nth-child(3) {
            transform: translateX(115%);
          }
    
          .latestUpdatesListItem:nth-child(4) {
            transform: translateX(230%);
          }

          .latestUpdatesListItem:nth-child(5) {
            transform: translateX(345%);
            display: block;
            visibility: hidden;
          }

          .latestUpdatesListItem:nth-child(6) {
            transform: translateX(345%);
            display: block;
            visibility: hidden;
          }

        .latestUpdatesListItemPic {
            width: 214px;
            height: 181px;
            object-fit: contain;
          }
    
          .latestUpdatesListTitle {
            padding: 6px 14px;
            font-size: 14px;
            text-transform: uppercase;
            font-weight: 600
          }
    
          .latestUpdatesListContent {
            display: none;
          }
    
          .hoverTextContentContainer {
            display: block;
            position: absolute;
            top: 0;
            width: 214px;
            height: 284px;
            background: rgb(25, 33, 39, .8);
            border-radius: 0px 20px;
            padding: 40px 16px;
            transition: all 0.25s ease-out;
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

    @media (max-width: 700px) {
      .latestUpdatesListItem {
        transition: 650ms;
      }

      .buttonContainer {
        position: absolute;
        top: 380px;
        right: 16px;
        display: flex;
      }

      .pauseButtonContainer {
        display: flex;
        justify-content: center;
        align-items: center
        background: #FFFFFF;
        height: 39px;
        width: 39px;
        border-radius: 50%;
        border: 0.6px solid #4BBFC6;
        box-shadow: 0px 2.49px 9.32px 0px #00000073;
        margin: 0 15px;
      }

      .pauseButtonContainer:hover {
        cursor: pointer;
        border: 1px solid #4BBFC6;
      }

      .pauseButtonIcon {
        height: 22px;
        width: 22px;
      }

      .arrowButtonContainer {
        background: #FFFFFF;
        height: 39px;
        width: 39px;
        border-radius: 50%;
        border: 0.6px solid #4BBFC6;
      }

      .arrowButtonContainer:hover {
        cursor: pointer;
        border: 1px solid #4BBFC6;
          .arrowLeft {
            border-bottom: 11px solid #8D9096;
          }
          .arrowRight {
            border-top: 11px solid #8D9096;
          }
      }

      .arrowLeft {
        margin: 14px 0 0 9px;
        width: 0; 
        height: 0; 
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 11px solid #C9C9C9;
        transform: rotate(-90deg);
        }

      .arrowRight {
          margin: 13px 0 0 13px;
          width: 0; 
          height: 0; 
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 11px solid #C9C9C9;
          transform: rotate(-90deg);
      }
    }

    @media (max-width: 872px) {
      .latestUpdatesList {
        margin-left: 30px;
      }

      .latestUpdatesListCover {
        position: absolute;
        background: #FFFFFF;
        width: 30px;
        height: 300px;
        z-index: 20;
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
      text-transform: uppercase;
      margin: 0;
      line-height: 38px;
      letter-spacing: 0.02em;
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
    const [pause, setPause] = useState(true);
    const [rLatestlList, setRLatestlList] = useState([]);
    const isVisible = usePageVisibility();

    const getFirstList = () => {
      const latestUpdateList = fullList.filter((item) => item.latestUpdate);
      let newItemList = [latestUpdateList[2]]
      newItemList = newItemList.concat(latestUpdateList.slice(0,3));
      newItemList = newItemList.concat(latestUpdateList.slice(0,2));
      return newItemList;
    }

    const mouseIn = (key) => {
        setHoverItem(key);
        clearInterval(timer);
    }

    const mouseOut = () => {
        setHoverItem("");
        if (!pause) {
            resetTimer();
        }
    }

    const resetTimer = () => {
        clearInterval(timer);
        startTimer();
    };

    const nextItem = () => {
        const list = document.getElementById("latestList");
        const firstitem = list.firstChild;
        list.removeChild(firstitem);
        list.appendChild(firstitem);
    };

    const nextSlide = () => {
      if (!pause) {
          resetTimer();
      }
      nextItem();
    };

    const prevItem = () => {
      const list = document.getElementById("latestList");
      const lastitem = list.lastChild;
      list.removeChild(lastitem);
      list.insertBefore(lastitem, list.firstChild);
    };

    const prevSlide = () => {
        if (!pause) {
            resetTimer();
        }
        prevItem();
    };

    const clickPause = () => {
      if (pause) {
          resetTimer();
      } else {
          clearInterval(timer);
      }
      setPause(!pause);
    }

    const startTimer = () => {
        timer = setInterval(() => {
            nextItem();
        }, 4000);
    };

    const carouselStart = () => {
        const scrolled = document.documentElement.clientWidth;
        if (scrolled < 700) {
            setPause(false);
            resetTimer();
        } else {
            setPause(true);
            clearInterval(timer);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', carouselStart);
        if (document.documentElement.clientWidth < 700) {
            resetTimer();
            setPause(false);
        }
        if (rLatestlList.length === 0) {
            setRLatestlList(getFirstList());
        }
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!isVisible || pause) {
            clearInterval(timer);
        }
        else if (isVisible && !pause){
            resetTimer();
        }
        return () => clearInterval(timer);
    }, [isVisible, pause]);

    return (
        <LatestUpdatesSection>
            <LatestUpdatesContainer>
            <TitleContainer>
                <div className='titleLine'>
                <div className='titleLineShort' />
                <div className='titleLineShort' />
                <div className='titleLineLong' />
                </div>
                <h2 className='titleText'>{titleData.latestUpdatesTitle}</h2>
            </TitleContainer>
            <div className='latestUpdatesListCover' />
            <div id="latestList" className='latestUpdatesList'>
                {
                    rLatestlList && rLatestlList.map((updateItem, updateidx) => {
                        const updatekey = `update_${updateidx}`;
                        return (
                        <div className='latestUpdatesListItem' key={updatekey} onMouseEnter={() => mouseIn(updatekey)} onMouseLeave={mouseOut}>
                            <a href={`/news#${updateItem.id}`}><img className='latestUpdatesListItemPic' src={srcList[updateItem.img]} alt={altList[updateItem.img]} aria-hidden='true' /><span style={{display:'none'}}>latestUpdates text</span></a>
                            <a className='latestUpdatesListTitleContainer' href={`/news#${updateItem.id}`}><div className='latestUpdatesListTitle'>{updateItem.title}</div></a>
                            <div className='latestUpdatesListContent'>
                                <span className='latestUpdatesTextContent'>{ReactHtmlParser(updateItem.slug)}</span>
                                { updateItem.slug.length > 100 && updateItem.slug.length < 110
                                ? <div><a className='readMoreContainer' href={`/news#${updateItem.id}`} style={{marginLeft: 0}}>Read More</a></div>
                                : <a className='readMoreContainer' href={`/news#${updateItem.id}`}>Read More</a>}
                            </div>
                            {
                                <div className='hoverTextContentContainer' style={hoverItem === updatekey ? {opacity: 1, visibility: "visible"} : {opacity: 0, visibility: "hidden"}}>
                                    <div className='hoverTextContent'>{ReactHtmlParser(updateItem.slug)}</div>
                                    <a className='readMoreContainer hover' href={`/news#${updateItem.id}`}>Read More</a>
                                </div>
                            }
                        </div>
                        )
                    })
                }
            </div>
            <div className='buttonContainer'>
              <div className='arrowButtonContainer' onClick={prevSlide}>
                  <div className="arrowLeft"></div>
              </div>
              <div className='pauseButtonContainer' onClick={clickPause} style={pause ? {paddingLeft:'5px'} : null}>
                  <img className='pauseButtonIcon' src={pause ? startIcon : pauseIcon} alt="pause button" style={pause ? null : {height:'18px', width:'18px'}}/>
              </div>
              <div className='arrowButtonContainer' onClick={nextSlide}>
                <div className="arrowRight"></div>
              </div>
            </div>
            </LatestUpdatesContainer>
        </LatestUpdatesSection>
    );
};

export default LatestUpdate;