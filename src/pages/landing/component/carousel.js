import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { carouselList } from '../../../bento/landingPageData'
import exportIcon from '../../../assets/landing/Export_Icon.svg'

const HeroListContainer = styled.div`
    position: relative;

    .upButton {
        position: absolute;
        background: #FFFFFF;
        top: -20px;
        right: 348px;
        height: 63px;
        width: 63px;
        border-radius: 50%;
        border: 1px solid #C2DEDB;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
        z-index: 9;
    }

    .upButton:hover {
        cursor: pointer;
        border: 1.5px solid #2ADEC7;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.45);
        .arrowUp {
            border-bottom: 17px solid #A0A8A9;
        }
    }

    .downButton {
        position: absolute;
        background: #FFFFFF;
        top: 618px;
        right: 348px;
        height: 63px;
        width: 63px;
        border-radius: 50%;
        border: 1px solid #C2DEDB;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
        z-index: 9;
    }

    .downButton:hover {
        cursor: pointer;
        border: 1.5px solid #2ADEC7;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.45);
        .arrowDown {
            border-top: 17px solid #A0A8A9;
        }
    }

    .arrowUp {
        margin: 20px 0 0 18px;
        width: 0; 
        height: 0; 
        border-left: 13px solid transparent;
        border-right: 13px solid transparent;
        border-bottom: 17px solid #D6DDDD;
    }

    .arrowDown {
        margin: 23px 0 0 18px;
        width: 0; 
        height: 0; 
        border-left: 13px solid transparent;
        border-right: 13px solid transparent;
        border-top: 17px solid #D6DDDD;
    }

    .triangleLarge {
        position: absolute;
        top: 250px;
        left: 0;
        width: 0; 
        height: 0; 
        border-top: 78px solid transparent;
        border-bottom: 78px solid transparent;
        border-left: 130px solid #3fc0ac;
    }
`;
const HeroList = styled.div`
    position: relative;
    margin-top: 57px;
    height: 660px;
    margin-left: 6%;
    border: 2.5px solid #00A8B3;
    border-right: 0;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.35);
    border-radius: 40px 0 0 40px;

    .listItemSide {
        margin-left: 38px;
        display: flex;
    }

    .listItemCenter {
        margin: 8px 0 8px 24px;
        display: flex;
        padding: 12px;
        border: 3px solid #FFFFFF;
        border-radius: 20px 0 0 20px;
        box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.35);
    }

    .listItemImgEdge {
        width: 266px;
        height: 112px;
        border-radius: 12px;
    }

    .listItemImg {
        width: 266px;
        height: 115px;
        border-radius: 12px;
    }

    .listItemContentEdge {
        color: #817979;
        font-family: Inter;
        font-weight: 600;
        font-size: 24px;
        line-height: 23px;
        width: 394px;
        margin-left: 31px;
        margin-top: 37px;
    }

    .listItemContent {
        color: #817979;
        font-family: Inter;
        font-weight: 600;
        font-size: 24px;
        line-height: 27px;
        width: 394px;
        margin-left: 31px;
        margin-top: 37px;
    }

    .listItemContentCenter {
        color: #009EAA;
        font-family: Inter;
        font-weight: 600;
        font-size: 28px;
        line-height: 28px;
        width: 334px;
        margin: 17px 0 0 31px;
    }

    .exportIcon {
        margin-left: 15px;
    }

    .exportContainer {
        padding: 38px 0 0 10px;
    }
    .exportText {
        color: #01828C;
        font-family: poppins;
        font-weight: 400;
        font-size: 14px;
        line-height: 14px;
        letter-spacing: -0.02em;
    }

    .separateLine {
        content:'';
        display:inline-block;
        width: 432px;
        border-bottom: 1px solid #898989;
        margin: 5px 0 5px 321px;
    }

    .blurTop {
        position: absolute;
        background: linear-gradient(to bottom, #FFFFFF, 70%, transparent);
        top: 0;
        left: 0;
        width: 100%;
        height: 100px;
        z-index: 6;
        border-radius: 40px 0 0 0;
    }

    .blurBottom {
        position: absolute;
        background: linear-gradient(to top, #FFFFFF, 70%, transparent);
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100px;
        z-index: 6;
        border-radius: 0 0 0 40px;
    }
`;

let timer = null;

const Carousel = () => {
    const heroList = carouselList;
    
    const [indexList, setIndexList] = useState([0,1,2,3,4]);

    const moveUp = () => {
        const newIndexList = [];
        indexList.forEach(item => {
            newIndexList.push((item + heroList.length -1) % heroList.length);
        })
        setIndexList(newIndexList);
    }

    const moveDown = () => {
        const newIndexList = [];
        indexList.forEach(item => {
            newIndexList.push((item + 1) % heroList.length);
        })
        setIndexList(newIndexList);
    }

    const startTimer = () => {
        timer = setInterval(() => {
            moveDown();
        }, 3000);
    };

    const resetTimer = () => {
        clearInterval(timer);
        startTimer();
    };

    useEffect(() => {
        const randomInt = Math.floor(Math.random() * heroList.length);
        const newIndexList = [];
        for (let i=0; i<5; i++) {
            newIndexList.push((randomInt + i) % heroList.length);
        }
        setIndexList(newIndexList);
    }, [])

    useEffect(() => {
        resetTimer();
        return () => clearInterval(timer);
    }, [indexList])
    
    return (
        <HeroListContainer>
            <div className='upButton' onClick={moveUp}>
                <div class="arrowUp"></div>
            </div>
            <div className='downButton' onClick={moveDown}>
                <div class="arrowDown"></div>
            </div>
            <div className='triangleLarge' />
            <HeroList>
                <div className='blurTop' />
                <div className='blurBottom' />
                <div className='listItemSide'>
                    <div className='listItemImgEdge'><img className='listItemImgEdge' src={heroList[indexList[0]].img} alt='img0' /></div>
                    <div className='listItemContentEdge'>{heroList[indexList[0]].content}</div>
                </div>
                <div className='separateLine' />
                <div className='listItemSide' onMouseOver={() => clearInterval(timer)} onMouseOut={() => startTimer()}>
                    <div className='listItemImg'><img className='listItemImg' src={heroList[indexList[1]].img} alt='img1' /></div>
                    <div className='listItemContent'>{heroList[indexList[1]].content}</div>
                </div>
                <div className='listItemCenter' onMouseOver={() => clearInterval(timer)} onMouseOut={() => startTimer()}>
                    <div className='listItemImg' ><img className='listItemImg' src={heroList[indexList[2]].img} alt='img2' /></div>
                    <div className='listItemContentCenter'>{heroList[indexList[2]].content}</div>
                    <div className='exportContainer'>
                        <img className='exportIcon' src={exportIcon} alt='exportIcon' />
                        <div className='exportText'>Go to site</div>
                    </div>
                </div>
                <div className='listItemSide' onMouseOver={() => clearInterval(timer)} onMouseOut={() => startTimer()}>
                    <div className='listItemImg'><img className='listItemImg' src={heroList[indexList[3]].img} alt='img3' /></div>
                    <div className='listItemContent'>{heroList[indexList[3]].content}</div>
                </div>
                <div className='separateLine' />
                <div className='listItemSide'>
                    <div className='listItemImgEdge'><img className='listItemImgEdge' src={heroList[indexList[4]].img} alt='img4' /></div>
                    <div className='listItemContentEdge'>{heroList[indexList[4]].content}</div>
                </div>
            </HeroList>
        </HeroListContainer>
    )
  };
  export default Carousel;