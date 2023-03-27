import React, { useEffect } from 'react';
import usePageVisibility from "./PageVisibility";
import styled from 'styled-components';
import { carouselList } from '../../../bento/landingPageData'
import exportIcon from '../../../assets/landing/Export_Icon.svg';
import arrowIcon from '../../../assets/landing/arrow.svg';

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
        top: 244px;
        left: 25px;
        width: 700px;
        height: 144px;
        border: 3px solid #FFFFFF;
        border-radius: 22px;
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
        width: 652px;
        height: 102px;
        margin: 0 49px;
        background: #F7F7F7;
        box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.15);
        border-radius: 20px;
        opacity: 1;
        transition: 0.5s;
    }

    .itemImgBox {
        margin-left: 19px;
        margin-top: 6px;
        transition: 0.5s;
    }

    .itemImg {
        width: 243px;
        height: 102px;
    }

    .listItemContent {
        color: #000000;
        font-family: poppins;
        font-weight: 600;
        font-size: 22px;
        line-height: 25px;
        width: 300px;
        text-decoration: none;
        display: flex;
        align-items: center;
        letter-spacing: -0.01em;
        margin-left: 41px;
        transition: 0.5s;
    }

    .exportContainer {
        text-decoration: none;
        opacity: 0;
        visibility: hidden;
    }

    .exportIcon {
        position: absolute;
        top: 62px;
        right: 20px;
        width: 24px;
        height: 24px;
        transition: 0.5s;
    }

    .carousel__item:nth-child(1) {
        transform: translateY(-365%) scale(1);
        opacity: 0;
        visibility: hidden;
    }

    .carousel__item:nth-child(2) {
        transform: translateY(-250%) scale(1);
        opacity: 1;
        visibility: visible;
    }

    .carousel__item:nth-child(3) {
        transform: translateY(-135%) scale(1);
        opacity: 1;
        visibility: visible;
    }

    .carousel__item:nth-child(4) {
        transform: translateY(0) scale(1.07, 1.37);
        opacity: 1;
        visibility: visible;
        border-radius: 20px;

        .itemImgBox {
            transform: translateX(12px) translateY(0) scale(1.04, 1);
        }

        .listItemContent {
            color: #01828C;
            transform: translateY(0) scale(1, 0.82);
        }

        .exportIcon {
            transform: translateY(0) scale(1, 0.82);
        }

        .exportContainer {
            opacity: 1;
            visibility: visible;
        }
    }

    .carousel__item:nth-child(5) {
        transform: translateY(135%) scale(1);
        opacity: 1;
        visibility: visible;
    }

    .carousel__item:nth-child(6) {
        transform: translateY(250%) scale(1);
        opacity: 1;
        visibility: visible;
    }

    .carousel__item:last-child {
        transform: translateY(365%) scale(1);
        opacity: 0;
        visibility: hidden;
    }
`;

const Carousel = () => {
    const isVisible = usePageVisibility();

    const startTimer = () => {
        timer = setInterval(() => {
            nextItem();
        }, 30000000);
    };

    const resetTimer = () => {
        clearInterval(timer);
        startTimer();
    };

    const nextItem = () => {
        const list = document.getElementById("carouselList");
        const lastitem = list.lastChild;
        list.removeChild(lastitem);
        list.insertBefore(lastitem, list.firstChild);
    };

    const nextSlide = () => {
        resetTimer();
        nextItem();
    };

    const prevSlide = () => {
        resetTimer();
        const list = document.getElementById("carouselList");
        const firstitem = list.firstChild;
        list.removeChild(firstitem);
        list.appendChild(firstitem);
    };

    useEffect(() => {
        if (!isVisible) {
            clearInterval(timer);
        } else {
            startTimer();
        }
        return () => clearInterval(timer);
    }, [isVisible]);

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
            <HeroList>
                <div className='blurTop' />
                <div className='blurBottom' />
                <div className='activeFrame'/>
                    <div id="carouselList" class='carousel'>
                        {
                            carouselList.map((item, idx) => {
                                const key = `carousel_${idx}_last_clone`;
                                return (
                                    <div key={key} className='carousel__item' onMouseEnter={() => clearInterval(timer)} onMouseLeave={()=>{resetTimer()}}>
                                        <div className='itemImgBox'><img className='itemImg' src={item.img} alt="" width="243px" height="102px" /></div>
                                        <a className='listItemContent' href={item.link} target="_blank" rel="noopener noreferrer">{item.content}</a>
                                        <a className="exportContainer" href={item.link} target="_blank" rel="noopener noreferrer">
                                            <img className='exportIcon' src={exportIcon} alt=""/>
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>

            </HeroList>
        </HeroListContainer>
    );
};

export default Carousel;