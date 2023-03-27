import React, { useEffect, useState } from 'react';
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
        transform: translateY(-300%) scale(0.9);
        opacity: 0;
        visibility: hidden;
    }

    .carousel__item:nth-child(2) {
        transform: translateY(-200%) scale(0.9);
        opacity: 0.8;
        visibility: visible;
    }

    .carousel__item:nth-child(3) {
        transform: translateY(-100%) scale(0.9);
        opacity: 0.9;
        visibility: visible;
    }

    .carousel__item:nth-child(4) {
        transform: translateY(0) scale(1);
        opacity: 1;
        visibility: visible;
    }

    .carousel__item:nth-child(5) {
        transform: translateY(100%) scale(0.9);
        opacity: 0.9;
        visibility: visible;
    }

    .carousel__item:nth-child(6) {
        transform: translateY(200%) scale(0.9);
        opacity: 0.8;
        visibility: visible;
    }

    .carousel__item:last-child {
        transform: translateY(300%) scale(0.9);
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
    const isVisible = usePageVisibility();

    const startTimer = () => {
        timer = setInterval(() => {
            nextItem();
        }, 3000);
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
                <div className='activeFrame' onMouseEnter={() => clearInterval(timer)} onMouseLeave={()=>{resetTimer()}} />
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
                    </div>

            </HeroList>
        </HeroListContainer>
    );
};

export default Carousel;