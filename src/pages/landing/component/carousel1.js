import React, { useEffect, useState } from 'react';
import usePageVisibility from "./PageVisibility";
import styled from 'styled-components';
import wheel1 from '../../../assets/landing/Wheel_1.png';
import wheel2 from '../../../assets/landing/Wheel_2.png';
import wheel3 from '../../../assets/landing/Wheel_3.png';
import wheel4 from '../../../assets/landing/Wheel_4.png';
import wheel5 from '../../../assets/landing/Wheel_5.png';
import exportIcon from '../../../assets/landing/Export_Icon.svg';

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
    overflow: hidden;

    .carouselList {
        width: 100%;
        height: 131px;
        -ms-overflow-style: none;
        scrollbar-width: none; 
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
        width: 100%;
        height: 131px;
        margin: 0 0 0 24px;
        padding: 6px 0 0 6px;
        transition: all 500ms ease-in-out;
    }

    .activeCard {
        // border: 3px solid #FFFFFF;
        border-radius: 20px 0 0 20px;
        // box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.35);
    }

    .listItemImg {
        width: 266px;
        height: 115px;
        border-radius: 12px;
    }

    .listItemContentNoLine {
        color: #817979;
        font-family: Inter;
        font-weight: 600;
        font-size: 24px;
        line-height: 27px;
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
        border-bottom: 1px solid #898989;
    }

    .activeCard .listItemContent {
        color: #009EAA;
        font-family: Inter;
        font-weight: 600;
        font-size: 28px;
        line-height: 28px;
        width: 334px;
        margin: 17px 0 0 31px;
        border-bottom: none;
    }

    .exportIcon {
        margin-left: 15px;
    }

    .exportContainer {
        padding: 38px 0 0 10px;
    }
    .exportContainerInactive {
        display: none;
    }
    .exportText {
        color: #01828C;
        font-family: poppins;
        font-weight: 400;
        font-size: 14px;
        line-height: 14px;
        letter-spacing: -0.02em;
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
        top: 259px;
        left: 19px;
        width: 783px;
        height: 133px;
        border: 3px solid #FFFFFF;
        border-radius: 20px 0 0 20px;
        box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.35);
        z-index: 60;
    }

    .smallTriangle {
        position: absolute;
        top: 293px;
        left: -3px;
        // width: 40px;
        // height: 65px;
        background: #3fc0ac;
        z-index: 6;
        display: block;
        height: 65px;
        width: 65px;
        clip-path: polygon(20% 20%, 80% 80%, 0% 100%);
        transform: rotate(225deg);
        // border-radius: 0 0 0 20px;
    }
`;

const Carousel = () => {
    const itemList = [{img: wheel3, content: 'Resource A. Lorem ipsum dolor sit amet consectetur'},
                      {img: wheel2, content: 'Resource B. Lorem ipsum dolor sit amet consectetur'},
                      {img: wheel3, content: 'Resource C. Lorem ipsum dolor sit amet consectetur'},
                      {img: wheel4, content: 'Resource D. Lorem ipsum dolor sit amet consectetur'},
                      {img: wheel2, content: 'Resource E. Lorem ipsum dolor sit amet consectetur'},
                      {img: wheel3, content: 'Resource F. Lorem ipsum dolor sit amet consectetur'},
                      {img: wheel3, content: 'Resource G. Lorem ipsum dolor sit amet consectetur'}];
    const [currentIndex, setCurrentIndex] = useState(0);
    const showCount = 5;
    const [touchPosition, setTouchPosition] = useState(null);
    const [transform, setTransform] = useState({ transform: "translateY(0%)" });
    const [btnDisabled, setBtnDisabled] = useState(false);
    const isVisible = usePageVisibility();

    const startTimer = () => {
        timer = setInterval(() => {
            const ts = `translateY(-${(cardIdx + 1) * 131}px)`;
            cardIdx += 1;
            setCurrentIndex(cardIdx);
            setTransform({transform: ts, transition: ".5s ease-out"});
        }, 3000);
    };

    const resetTimer = () => {
        clearInterval(timer);
        startTimer();
    };

    const nextSlide = () => {
        if(btnDisabled) return;
        resetTimer();
        const ts = `translateY(-${(cardIdx + 1) * 131}px)`;
        cardIdx += 1;
        if (cardIdx === (itemList.length + showCount)) {
            setBtnDisabled(true);
            setTimeout(() => {
                setBtnDisabled(false);
            }, 500);
        }
        setCurrentIndex(cardIdx);
        setTransform({transform: ts, transition: "0.5s ease-out"});
    };

    const prevSlide = () => {
        if(btnDisabled) return;
        resetTimer();
        const ts = `translateY(-${(cardIdx - 1) * 131}px)`;
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
            const initialTs = `translateY(-${cardIdx * 131}px)`;
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
            const initialTs = `translateY(-${cardIdx * 131}px)`;
            setCurrentIndex(cardIdx);
            setTransform({transform: initialTs, transition: "none"});
        }

        if (cardIdx === (itemList.length + showCount)) {
            cardIdx = showCount;
            const initialTs = `translateY(-${cardIdx * 131}px)`;
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
            <div className='triangleLarge' />
            <HeroList onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                <div className='blurTop' />
                <div className='blurBottom' />
                <div className='activeFrame' />
                <div className='smallTriangle' />
                <div className="carouselList" onTransitionEnd={handleTransitionEnd} style={transform}>
                    {itemList.slice(itemList.length - showCount).map((item, idx) => {
                        const key = `carousel_${idx}_last_clone`;
                        const isActiveCard = ( currentIndex + 2 ) === idx;
                        const noBorderLine = ( currentIndex + 1 ) === idx;
                        return (
                            <div key={key} className={isActiveCard ? "listItem activeCard" : "listItem"} title={key}>
                                <div className='listItemImg'><img src={item.img}/></div>
                                <div className={noBorderLine ? 'listItemContentNoLine' : 'listItemContent'}>{item.content}</div>
                                <div className={isActiveCard ? "exportContainer" : "exportContainerInactive"}>
                                    <img className='exportIcon' src={exportIcon} />
                                    <div className='exportText'>Go to site</div>
                                </div>
                            </div>
                        );
                    })}
                    {itemList.map((item, idx) => {
                        const key = `carousel_${idx}`;
                        const isActiveCard = ( currentIndex + 2 ) === (idx + showCount);
                        const noBorderLine = ( currentIndex + 1 ) === (idx + showCount);
                        return (
                            <div key={key} className={isActiveCard ? "listItem activeCard" : "listItem"} title={key}>
                                <div className='listItemImg'><img src={item.img}/></div>
                                <div className={noBorderLine ? 'listItemContentNoLine' : 'listItemContent'}>{item.content}</div>
                                <div className={isActiveCard ? "exportContainer" : "exportContainerInactive"}>
                                    <img className='exportIcon' src={exportIcon} />
                                    <div className='exportText'>Go to site</div>
                                </div>
                            </div>
                        );
                    })}
                    {itemList.slice(0, showCount).map((item, idx) => {
                        const key = `carousel_${idx}_first_clone`;
                        const isActiveCard = ( currentIndex + 2 ) === (idx + itemList.length + showCount);
                        const noBorderLine = ( currentIndex + 1 ) === (idx + itemList.length + showCount);
                        return (
                            <div key={key} className={isActiveCard ? "listItem activeCard" : "listItem"} title={key}>
                                <div className='listItemImg'><img src={item.img}/></div>
                                <div className={noBorderLine ? 'listItemContentNoLine' : 'listItemContent'}>{item.content}</div>
                                <div className={isActiveCard ? "exportContainer" : "exportContainerInactive"}>
                                    <img className='exportIcon' src={exportIcon} />
                                    <div className='exportText'>Go to site</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </HeroList>
        </HeroListContainer>
    );
};

export default Carousel;