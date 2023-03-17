import React, { useEffect, useState } from 'react';
import usePageVisibility from "./PageVisibility";
import styled from 'styled-components';
import { carouselList } from '../../../bento/landingPageData'
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
        top: 257px;
        left: -1px;
        width: 0; 
        height: 0; 
        border-top: 68px solid transparent;
        border-bottom: 68px solid transparent;
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
        border-radius: 20px 0 0 20px;
        transition: transform .5s, opacity .5s;
    }

    .listItemImg {
        width: 264px;
        height: 121px;
        border-radius: 12px;
    }

    .listItemContent {
        color: #000000;
        font-family: poppins;
        font-weight: 400;
        font-size: 24px;
        line-height: 25px;
        width: 370px;
        padding-left: 14px;
        transition: color 1s;
        display: flex;
        justify-content: left;
        align-items: center;
        flex: 0 0 370px;
        text-decoration: none;
    }

    .activeCard .listItemContent {
        color: #298085;
        font-family: poppins;
        font-weight: 500;
        font-size: 28px;
        line-height: 30px;
        width: 370px;
        border-bottom: none;
        flex: 0 0 370px;
    }

    .exportIcon {
        margin-left: 15px;
    }

    .exportContainer {
        padding: 38px 0 0 10px;
        visibility: visible;
        opacity: 1;
        transition: visibility 1s, opacity 1s linear;
        text-decoration: none;
    }
    .exportContainerInactive {
        padding: 38px 0 0 10px;
        visibility: hidden;
        opacity: 0;
        transition: visibility 1s, opacity 1s linear;
        text-decoration: none;
    }
    .exportText {
        color: #298085;
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
        top: 254px;
        left: 8px;
        width: 100%;
        height: 145px;
        border: 3px solid #FFFFFF;
        border-radius: 20px 0 0 20px;
        box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.45);
        z-index: 60;
        pointer-events: none; 
    }

    .internalTriangle {
        position: absolute;
        top: 255px;
        left: -55px;
        width: 40px;
        height: 65px;
        z-index: 6;
    }

    .scene {
        position: relative;
        width: 798px;
        height: 145px;
        left: 5px;
        margin: 255px auto 255px auto;
        perspective: 10000px;
      }
      
      .carousel {
        width: 100%;
        height: 100%;
        position: absolute;
        transform: translateZ(-125px);
        transform-style: preserve-3d;
        transition: transform 1s;
      }

      .textBox {
        position: relative;
        display: flex;
        margin-left: 17px;
      }

      .separateLine {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: -11px;
        border-bottom: 1.5px solid #898989;
        visibility: visible;
        opacity: 1;
        transition: visibility 1s, opacity 1s linear;
      }

      .separateLineHide {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: -11px;
        border-bottom: 1.5px solid #898989;
        visibility: hidden;
        opacity: 0;
        transition: visibility 1s, opacity 1s linear;
      }
      
      .carousel__cell {
        position: absolute;
        display: flex;
        width: 780px;
        height: 149px;
        left: 21px;
        padding: 14px 0;
        transition: transform 1s, opacity 1s;
        background: #fff;
      }
`;

const Carousel = () => {
    const itemList = carouselList;

    const repeatList = [].concat(...new Array(Math.floor(15/itemList.length )).fill(itemList));

    const cardLen = repeatList.length;
    const rotateDeg = 360 / cardLen ;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [newTransform, setNewTransform] = useState({ transform: "translateZ(-125px) rotateX(0deg)" });
    const isVisible = usePageVisibility();

    const startTimer = () => {
        timer = setInterval(() => {
            const newTs =`translateZ(-125px) rotateX(${(cardIdx - 1) * rotateDeg}deg)`;
            cardIdx -= 1;
            setCurrentIndex(cardIdx);
            setNewTransform({transform: newTs});
        }, 3000);
    };

    const resetTimer = () => {
        clearInterval(timer);
        startTimer();
    };

    const nextSlide = () => {
        resetTimer();
        const newTs =`translateZ(-125px) rotateX(${(cardIdx - 1) * rotateDeg}deg)`;
        cardIdx -= 1;
        setCurrentIndex(cardIdx);
        setNewTransform({transform: newTs});
    };

    const prevSlide = () => {
        resetTimer();
        const newTs =`translateZ(-125px) rotateX(${(cardIdx + 1) * rotateDeg}deg)`;
        cardIdx += 1;
        setCurrentIndex(cardIdx);
        setNewTransform({transform: newTs});
    };

    useEffect(() => {
        if (!isVisible) {
            clearInterval(timer);
        }
        if (itemList.length !== 0 && isVisible) {
            cardIdx = Math.floor(Math.random() * (cardLen/2));
            const newinitialTs =`translateZ(-125px) rotateX(${cardIdx * rotateDeg}deg)`;
            setCurrentIndex(cardIdx);
            setNewTransform({transform: newinitialTs});
            startTimer();
        }
        return () => clearInterval(timer);
    }, []);

    return (
        <HeroListContainer>
            <div className='upButton' onClick={prevSlide}>
                <div class="arrowUp"></div>
            </div>
            <div className='downButton' onClick={nextSlide}>
                <div class="arrowDown"></div>
            </div>
            <div className='triangleLarge' />
            <HeroList>
                <div className='blurTop' />
                <div className='blurBottom' />
                <div className='activeFrame' onMouseEnter={() => clearInterval(timer)} onMouseLeave={()=>{resetTimer()}} />
                <div className='internalTriangle'>
                    <svg height="135" width="135">
                        <polygon points="120,75 120,60 0,0 0,135" fill="#fff" stroke="#fff" stroke-width="4"></polygon>
                        <circle cx="116.6" cy="67.5" r="9.1" fill="#3fc0ac" stroke="#fff" stroke-width="2"></circle>
                        <polygon points="120,75 120,60 0,0 0,135" fill="#3fc0ac"></polygon>
                    </svg>
                </div>
                <div class="scene">
                    <div class="carousel" style={newTransform}>
                        {repeatList.map((item, idx) => {
                            const key = `carousel_${idx}`;
                            const style = { transform: "rotateX( "+ idx * rotateDeg + "deg) translateZ(325px)" };
                            let trueIdx = 0;
                            if (currentIndex % 14 === 0) {
                                trueIdx = 0;
                            } else {
                                if (currentIndex > 14) {
                                    trueIdx = 14 - currentIndex % 14;
                                }
                                else if(currentIndex < 14 && currentIndex > 0) {
                                    trueIdx = 14 - currentIndex;
                                } else {
                                    trueIdx = Math.abs(currentIndex % 14);
                                }
                            }
                            const hideArr = [];
                            hideArr.push(trueIdx);
                            if (trueIdx + 1 === cardLen) {
                                hideArr.push(0);
                            } else {
                                hideArr.push(trueIdx + 1);
                            }
                            const isHided = hideArr.indexOf(idx) > -1;
                            const isActiveCard = trueIdx === idx;
                            return (
                                <div key={key} className={isActiveCard ? "carousel__cell activeCard" : "carousel__cell"} style={style} onMouseEnter={() => clearInterval(timer)} onMouseLeave={()=>{resetTimer()}}>
                                    <div className='listItemImg'><img src={item.img} alt="" /></div>
                                    <div className="textBox">
                                        <a className='listItemContent' href={item.link} target="_blank" rel="noopener noreferrer">{item.content}</a>
                                        <a className={isActiveCard ? "exportContainer" : "exportContainerInactive"} href={item.link} target="_blank" rel="noopener noreferrer">
                                            <img className='exportIcon' src={exportIcon} alt="" />
                                            <div className='exportText'>Go to site</div>
                                        </a>
                                        <div className={isHided ? "separateLineHide" : "separateLine"} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </HeroList>


        </HeroListContainer>
    );
};

export default Carousel;
