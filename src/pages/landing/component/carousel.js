import React from 'react';
import styled from 'styled-components';

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
        border: 1.5px solid #2ADEC7;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.45);
        z-index: 9;
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

    .arrowUp {
        margin: 20px 0 0 18px;
        width: 0; 
        height: 0; 
        border-left: 13px solid transparent;
        border-right: 13px solid transparent;
        border-bottom: 17px solid #A0A8A9;
      }

    .arrowDown {
        margin: 23px 0 0 18px;
        width: 0; 
        height: 0; 
        border-left: 13px solid transparent;
        border-right: 13px solid transparent;
        border-top: 17px solid #D6DDDD;
      }
`;
const HeroList = styled.div`
    margin-top: 57px;
    height: 640px;
    margin-left: 6%;
    border: 2.5px solid #00A8B3;
    border-right: 0;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.35);
    border-radius: 40px 0 0 40px;
`;

const Carousel = () => {
    return (
        <HeroListContainer>
            <div className='upButton'>
                <div class="arrowUp"></div>
            </div>
            <div className='downButton'>
                <div class="arrowDown"></div>
            </div>
            <HeroList>
            </HeroList>
        </HeroListContainer>
    )
  };
  export default Carousel;