import React, { useEffect, useState } from 'react';
import usePageVisibility from "./PageVisibility";
import styled from 'styled-components';
import { carouselList } from '../../../bento/landingPageData'
import exportIcon from '../../../assets/landing/Export_Icon.svg';
import arrowIcon from '../../../assets/landing/arrow.svg';

let cardIdx = 0;
let timer = null;

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
        border: 1.5px solid #C2DEDB;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
        z-index: 9;
    }

    .upButton:hover {
        cursor: pointer;
        border: 1.5px solid #4BBFC6;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.45);
        .arrowUp {
            border-bottom: 17px solid #3D4551;
        }
    }

    .downButton {
        position: absolute;
        background: #FFFFFF;
        top: 598px;
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
        border: 1.5px solid #4BBFC6;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.45);
        .arrowDown {
            border-top: 17px solid #3D4551;
        }
    }

    .arrowUp {
        margin: 20px 0 0 18px;
        width: 0; 
        height: 0; 
        border-left: 13px solid transparent;
        border-right: 13px solid transparent;
        border-bottom: 17px solid #B8BBBE;
      }

    .arrowDown {
        margin: 23px 0 0 18px;
        width: 0; 
        height: 0; 
        border-left: 13px solid transparent;
        border-right: 13px solid transparent;
        border-top: 17px solid #B8BBBE;
    }
    .arrowLeft {
        position: absolute;
        left: 0;
        top: 300px;
        width: 30px;
        height: 40px;
        background-image: url(${arrowIcon});
        background-size: cover;
        z-index: 50;
    }
    .arrowRight {
        background-image: url(${arrowIcon});
        position: absolute;
        right: 0;
        top: 300px;
        width: 30px;
        height: 40px;
        transform: scaleX(-1);
        background-size: cover;
        z-index: 50;
    }
`;
const HeroList = styled.div`
    position: relative;
    width: 758px;
    height: 640px;
    background: #ECECEC;
    border: 4px solid #05555C;
    filter: drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.35));
    border-radius: 40px;
    overflow: hidden;

    .carouselList {
        width: 100%;
        height: 131px;
        -ms-overflow-style: none;
        scrollbar-width: none; 
        display: grid;
    }

    .carouselList::-webkit-scrollbar {
        display: none;
    }

    .carouselList > * {
        width: 100%;
        flex-shrink: 0;
        flex-grow: 1;
      }

    .listItem  {
        display: flex;
        position: relative;
        width: 652px;
        height: 102px;
        margin: 9px 49px;
        background: #F7F7F7;
        box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.15);
        border-radius: 20px;
    }

    .activeCard {
        border-radius: 20px;
        width: 700px;
        height: 140px;
        margin: 9px 25px;
    }

    .itemImgBox {
        margin-left: 19px;
    }

    .itemImg {
        width: 243px;
        height: 102px;
    }

    .listItemContent {
        color: #000000;
        font-family: poppins;
        font-weight: 400;
        font-size: 22px;
        line-height: 25px;
        width: 329px;
        text-decoration: none;
        display: flex;
        align-items: center;
        letter-spacing: -0.01em;
        margin-left: 41px;
    }

    .activeCard .itemImgBox {
        margin-left: 30px;
    }

    .activeCard .itemImgBox .itemImg {
        width: 270px;
        height: 140px;
    }

    .activeCard .listItemContent {
        color: #01828C;
        font-family: poppins;
        font-weight: 600;
        font-size: 28px;
        line-height: 30px;
        width: 334px;
        letter-spacing: -0.002em;
        margin-left: 27px;
    }

    .exportIcon {
        margin-top: 100px;
        width: 24.8px;
        height: 24.8px;
    }

    .exportContainer {
        text-decoration: none;
    }
    .exportContainerInactive {
        display: none;
        text-decoration: none;
    }

    .blurTop {
        position: absolute;
        background: linear-gradient(to bottom, #FFFFFF, 70%, transparent);
        top: 0;
        left: 0;
        width: 100%;
        height: 120px;
        z-index: 6;
        border-radius: 40px 0 0 0;
    }

    .blurBottom {
        position: absolute;
        background: linear-gradient(to top, #FFFFFF, 70%, transparent);
        bottom: 0;
        left: 0;
        width: 100%;
        height: 120px;
        z-index: 6;
        border-radius: 0 0 0 40px;
    }

    .activeFrame {
        position: absolute;
        top: 248px;
        left: 25px;
        width: 700px;
        height: 144px;
        border: 3px solid #FFFFFF;
        border-radius: 20px;
        box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.35);
        z-index: 60;
        pointer-events: none; 
    }

    .carousel {
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .carousel__item {
        display: flex;
        align-items: center;
        position: absolute;
        width: 100%;
        padding: 0 12px;
        opacity: 1;
        filter: drop-shadow(0 2px 2px #555);
        will-change: transform, opacity;
        transition: 0.5s;
        // animation: carousel-animate-vertical 27s linear infinite;
    }

    .carousel__item:nth-child(1) {
        transform: translateY(-400%) scale(0.8);
        opacity: 0;
        visibility: hidden;
    }

    .carousel__item:nth-child(2) {
        transform: translateY(-300%) scale(0.8);
        opacity: 0;
        visibility: hidden;
    }

    .carousel__item:nth-child(3) {
        transform: translateY(-200%) scale(0.8);
        opacity: 0.8;
        visibility: visible;
    }

    .carousel__item:nth-child(4) {
        transform: translateY(-100%) scale(0.9);
        opacity: 0.9;
        visibility: visible;
    }

    .carousel__item:nth-child(5) {
        transform: translateY(0) scale(1);
        opacity: 1;
        visibility: visible;
        color: red;
        background: blue;
    }

    .carousel__item:nth-child(6) {
        transform: translateY(100%) scale(0.9);
        opacity: 0.9;
        visibility: visible;
    }

    .carousel__item:nth-child(7) {
        transform: translateY(200%) scale(0.8);
        opacity: 0.8;
        visibility: visible;
    }

    .carousel__item:nth-child(8) {
        transform: translateY(300%) scale(0.8);
        opacity: 0;
        visibility: hidden;
    }

    .carousel__item:last-child {
        transform: translateY(400%) scale(0.8);
        opacity: 0;
        visibility: hidden;
    }

    .carousel__item-head {
        border-radius: 50%;
        background-color: #d7f7fc;
        width: 90px;
        height: 90px;
        padding: 14px;
        position: relative;
        margin-right: -45px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 50px;
    }

    .carousel__item-body {
        width: 100%;
        background-color: #fff;
        border-radius: 8px;
        padding: 16px 20px 16px 70px;
    }

    .title {
        text-transform: uppercase;
        font-size: 20px;
        margin-top: 10px;
    }
`;

const Carousel = () => {
    const itemList = carouselList;
    const [currentIndex, setCurrentIndex] = useState(0);
    const showCount = 5;
    const distance = 120;
    const [touchPosition, setTouchPosition] = useState(null);
    const [transform, setTransform] = useState({ transform: "translateY(0%)" });
    const [btnDisabled, setBtnDisabled] = useState(false);
    const isVisible = usePageVisibility();

    const startTimer = () => {
        timer = setInterval(() => {
            const ts = `translateY(-${(cardIdx + 1) * distance}px)`;
            cardIdx += 1;
            setCurrentIndex(cardIdx);
            setTransform({transform: ts, transition: ".5s ease-out"});
        }, 300000000);
    };

    const resetTimer = () => {
        clearInterval(timer);
        startTimer();
    };

    const nextSlide = () => {
        const list = document.getElementById("carouselList");
        const lastitem = list.lastChild;
        console.log("lastitem:", lastitem);
        list.removeChild(lastitem);
        list.insertBefore(lastitem, list.firstChild);
    };

    const prevSlide = () => {
        if(btnDisabled) return;
        resetTimer();
        const ts = `translateY(-${(cardIdx - 1) * distance}px)`;
        cardIdx -= 1;
        if (cardIdx === 0) {
            setBtnDisabled(true);
            setTimeout(() => {
                setBtnDisabled(false);
            }, 500);
        }
        console.log("index at:"+cardIdx);
        setCurrentIndex(cardIdx);
        setTransform({transform: ts, transition: "0.5s ease-out"});
    };

    useEffect(() => {
        if (!isVisible) {
            clearInterval(timer);
        }
        const len = itemList.length;
        if (itemList.length !== 0 && isVisible) {
            cardIdx = Math.floor(Math.random() * len) + showCount;
            const initialTs = `translateY(-${cardIdx * distance}px)`;
            setCurrentIndex(cardIdx);
            setTransform({transform: initialTs, transition: "none"});
            startTimer();
        }
        return () => clearInterval(timer);
    }, [isVisible]);

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientY;
        setTouchPosition(touchDown);
    };

    const handleTouchMove = (e) => {
        const touchDown = touchPosition;

        if (touchDown === null) {
            return;
        }

        const currentTouch = e.touches[0].clientY;
        const diff = touchDown - currentTouch;

        if (diff > 5) {
            nextSlide();
        }

        if (diff < -5) {
            prevSlide();
        }

        setTouchPosition(null);
    };

    const handleTransitionEnd = () => {
        if (cardIdx === 0) {
            cardIdx = itemList.length;
            const initialTs = `translateY(-${cardIdx * distance}px)`;
            setCurrentIndex(cardIdx);
            setTransform({transform: initialTs, transition: "none"});
        }

        if (cardIdx === (itemList.length + showCount)) {
            cardIdx = showCount;
            const initialTs = `translateY(-${cardIdx * distance}px)`;
            setCurrentIndex(cardIdx);
            setTransform({transform: initialTs, transition: "none"});
        }
    };

    return (
        <HeroListContainer>
            <div className='upButton' onClick={prevSlide}>
                <div class="arrowUp"></div>
            </div>
            <div className='downButton' onClick={nextSlide}>
                <div class="arrowDown"></div>
            </div>
            <div className="arrowLeft" />
            <div className="arrowRight" />
            <HeroList onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                <div className='blurTop' />
                <div className='blurBottom' />
                <div className='activeFrame' onMouseEnter={() => clearInterval(timer)} onMouseLeave={()=>{resetTimer()}} />
                {/* <div className="carouselList" onTransitionEnd={handleTransitionEnd} style={transform}>
                    {itemList.slice(itemList.length - showCount).map((item, idx) => {
                        const key = `carousel_${idx}_last_clone`;
                        const isActiveCard = ( currentIndex + 2 ) === idx;
                        const noBorderLine = ( currentIndex + 1 ) === idx;
                        return (
                            <div key={key} className={isActiveCard ? "listItem activeCard" : "listItem"} onMouseEnter={() => clearInterval(timer)} onMouseLeave={()=>{resetTimer()}}>
                                <div className='itemImgBox'><img className='itemImg' src={item.img} alt="" width="243px" height="102px" /></div>
                                <a className='listItemContent' href={item.link} target="_blank" rel="noopener noreferrer">{item.content}</a>
                                <a className={isActiveCard ? "exportContainer" : "exportContainerInactive"} href={item.link} target="_blank" rel="noopener noreferrer">
                                    <img className='exportIcon' src={exportIcon} alt=""/>
                                </a>
                            </div>
                        );
                    })}
                    {itemList.map((item, idx) => {
                        const key = `carousel_${idx}`;
                        const isActiveCard = ( currentIndex + 2 ) === (idx + showCount);
                        const noBorderLine = ( currentIndex + 1 ) === (idx + showCount);
                        return (
                            <div key={key} className={isActiveCard ? "listItem activeCard" : "listItem"} onMouseEnter={() => clearInterval(timer)} onMouseLeave={()=>{resetTimer()}}>
                                <div className='itemImgBox'><img className='itemImg' src={item.img} alt="" /></div>
                                <a className='listItemContent' href={item.link} target="_blank" rel="noopener noreferrer">{item.content}</a>
                                <a className={isActiveCard ? "exportContainer" : "exportContainerInactive"} href={item.link} target="_blank" rel="noopener noreferrer">
                                    <img className='exportIcon' src={exportIcon} alt=""/>
                                </a>
                            </div>
                        );
                    })}
                    {itemList.slice(0, showCount).map((item, idx) => {
                        const key = `carousel_${idx}_first_clone`;
                        const isActiveCard = ( currentIndex + 2 ) === (idx + itemList.length + showCount);
                        const noBorderLine = ( currentIndex + 1 ) === (idx + itemList.length + showCount);
                        return (
                            <div key={key} className={isActiveCard ? "listItem activeCard" : "listItem"} onMouseEnter={() => clearInterval(timer)} onMouseLeave={()=>{resetTimer()}}>
                                <div className='itemImgBox'><img className='itemImg' src={item.img} alt="" width="243px" height="102px" /></div>
                                <a className='listItemContent' href={item.link} target="_blank" rel="noopener noreferrer">{item.content}</a>
                                <a className={isActiveCard ? "exportContainer" : "exportContainerInactive"} href={item.link} target="_blank" rel="noopener noreferrer">
                                    <img className='exportIcon' src={exportIcon} alt=""/>
                                </a>
                            </div>
                        );
                    })}
                </div> */}
                {/* <div class='wrapper'> */}
                    <div id="carouselList" class='carousel'>
                        <div class='carousel__item'>
                            <div class='carousel__item-head'>
                                🐳
                            </div>
                            <div class='carousel__item-body'>
                                <p class='title'>1</p>
                                <p>Unicode: U+1F433</p>
                            </div>
                        </div>
                        <div class='carousel__item'>
                            <div class='carousel__item-head'>
                                🐋
                            </div>
                            <div class='carousel__item-body'>
                                <p class='title'>2</p>
                                <p>Unicode: U+1F40B</p>
                            </div>
                        </div>
                        <div class='carousel__item'>
                            <div class='carousel__item-head'>
                                🐬
                            </div>
                            <div class='carousel__item-body'>
                                <p class='title'>3</p>
                                <p>Unicode: U+1F42C</p>
                            </div>
                        </div>
                        <div class='carousel__item'>
                            <div class='carousel__item-head'>
                                🐟
                            </div>
                            <div class='carousel__item-body'>
                                <p class='title'>4</p>
                                <p>Unicode: U+1F41F</p>
                            </div>
                        </div>
                        <div class='carousel__item'>
                            <div class='carousel__item-head'>
                                🐠
                            </div>
                            <div class='carousel__item-body'>
                                <p class='title'>5</p>
                                <p>Unicode: U+1F420</p>
                            </div>
                        </div>
                        <div class='carousel__item'>
                            <div class='carousel__item-head'>
                                🐡
                            </div>
                            <div class='carousel__item-body'>
                                <p class='title'>6</p>
                                <p>Unicode: U+1F421</p>
                            </div>
                        </div>
                        <div class='carousel__item'>
                            <div class='carousel__item-head'>
                                🦈
                            </div>
                            <div class='carousel__item-body'>
                                <p class='title'>7</p>
                                <p>Unicode: U+1F988</p>
                            </div>
                        </div>
                        <div class='carousel__item'>
                            <div class='carousel__item-head'>
                                🐙
                            </div>
                            <div class='carousel__item-body'>
                                <p class='title'>8</p>
                                <p>Unicode: U+1F419</p>
                            </div>
                        </div>
                        <div class='carousel__item'>
                            <div class='carousel__item-head'>
                                🐚
                            </div>
                            <div class='carousel__item-body'>
                                <p class='title'>9</p>
                                <p>Unicode: U+1F41A</p>
                            </div>
                        </div>
                    </div>
                {/* </div> */}

            </HeroList>
        </HeroListContainer>
    );
};

export default Carousel;