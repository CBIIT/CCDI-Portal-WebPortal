import React from 'react';
import styled from 'styled-components';
import { carouselList } from '../../../bento/landingPageData';
import exportIconText from '../../../assets/landing/Export_Icon_White.svg';

const HeroMobileSection = styled.div`
  position: relative;
  z-index: 5;
  height: 650px;

  .backgroundContainer {
    padding: 60px calc(50vw - 405px);
    height: 476px;
    border-radius: 0 0 0 40px;
    background: linear-gradient(180deg, rgba(17, 196, 212, 0.4) 0%, rgba(55, 210, 176, 0.392465) 37.67%, rgba(120, 233, 117, 0.38) 100%), linear-gradient(0deg, #56B0B8, #56B0B8), #2ADEC7;
  }

  .introTitle1 {
    text-align: left;
    color: #002A2E;
    font-family: poppins;
    font-weight: 600;
    font-size: 35px;
    line-height: 30px;
    letter-spacing: 0.02em;
  }

  .introTitle2 {
    margin-top: 20px;
    text-align: left;
    color: #FFFFFF;
    font-family: poppins;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
  }

  .carouselMobileList {
    margin-top: 20px;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: left;
    flex-direction: row;
  }

  .carouselMobileItem {
    position: absolute;
    width: 210px;
    height: 390px;
    background: #1C2537;
    border-radius: 20px;
  }

  .itemImgContainer {
    width: 210px;
    height: 235px;
    border-radius: 20px 20px 0 0;
    object-fit: cover;
  }

  .itemTitleContainer {
    padding: 10px 15px;
    font-family: poppins;
    font-weight: 300;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.02em;
    color: #FFFFFF;
    height: 118px;
  }

  .exportIcon {
    padding: 0 20px;
  }

  .carouselMobileItem:nth-child(1) {
    transform: translateX(-115%);
    visibility: hidden;
  }
  .carouselMobileItem:nth-child(2) {
    transform: translateX(0);
  }
  .carouselMobileItem:nth-child(3) {
    transform: translateX(115%);
  }
  .carouselMobileItem:nth-child(4) {
    transform: translateX(230%);
  }
  .carouselMobileItem:nth-child(5) {
    transform: translateX(345%);
  }
  .carouselMobileItem:nth-child(6) {
    transform: translateX(460%);
  }
  .carouselMobileItem:nth-child(7) {
    transform: translateX(575%);
    visibility: hidden;
  }


  @media (min-width: 1200px) {
    display: none;
  }

  @media (max-width: 872px) {
    .backgroundContainer {
        padding: 60px 30px;
    }
  }
`;

const HeroMobile = () => {
    return (
        <HeroMobileSection>
            <div className='backgroundContainer'>
                <div className='introTitle1'>
                    <div>Discover</div>
                    <div>CCDI Resources</div>
                </div>
                <div className='introTitle2'>Explore the CCDI Hub </div>
                <div className='carouselMobileList'>
                    {
                        carouselList.map((mcarouselItem, idx) => {
                            const mcarouselkey = `mcarousel_${idx}`;
                            return (
                                <div key={mcarouselkey} className='carouselMobileItem'>
                                    <img className='itemImgContainer' src={mcarouselItem.img} alt="carousel_img"/>
                                    <div className="itemTitleContainer">{mcarouselItem.content}</div>
                                    <img className='exportIcon' src={exportIconText} alt="export_icon"/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </HeroMobileSection>
    );
};

export default HeroMobile;