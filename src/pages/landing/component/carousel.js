import React from 'react';
import styled from 'styled-components';
import wheel1 from '../../../assets/landing/Wheel_1.png';
import wheel2 from '../../../assets/landing/Wheel_2.png';
import wheel3 from '../../../assets/landing/Wheel_3.png';
import wheel4 from '../../../assets/landing/Wheel_4.png';
import wheel5 from '../../../assets/landing/Wheel_5.png';
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
        border: 1.5px solid #2ADEC7;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.45);
        z-index: 9;
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
        background: white;
        top: 0;
        width: 100%;
        height: 70px;
        z-index: 6;
        filter:blur(20px);
        border-radius: 40px 0 0 0;
    }
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
                <div className='blurTop' />
                <div className='listItemSide'>
                    <div className='listItemImgEdge'><img src={wheel1}/></div>
                    <div className='listItemContentEdge'>Resource A. Lorem ipsum dolor sit amet consectetur</div>
                </div>
                <div className='separateLine' />
                <div className='listItemSide'>
                    <div className='listItemImg'><img src={wheel2}/></div>
                    <div className='listItemContent'>Resource B. Lorem ipsum dolor sit amet consectetur</div>
                </div>
                <div className='listItemCenter'>
                    <div className='listItemImg'><img src={wheel3}/></div>
                    <div className='listItemContentCenter'>Resource C. Lorem ipsum dolor sit amet consectetur</div>
                    <div className='exportContainer'>
                        <img className='exportIcon' src={exportIcon} />
                        <div className='exportText'>Go to site</div>
                    </div>
                </div>
                <div className='listItemSide'>
                    <div className='listItemImg'><img src={wheel4}/></div>
                    <div className='listItemContent'>Resource D. Lorem ipsum dolor sit amet consectetur</div>
                </div>
                <div className='separateLine' />
                <div className='listItemSide'>
                    <div className='listItemImgEdge'><img src={wheel5}/></div>
                    <div className='listItemContentEdge'>Resource E. Lorem ipsum dolor sit amet consectetur</div>
                </div>
            </HeroList>
        </HeroListContainer>
    )
  };
  export default Carousel;