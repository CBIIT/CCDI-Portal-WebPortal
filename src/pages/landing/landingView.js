import React from 'react';
import styled from 'styled-components';
import { introData, titleData, statsData, latestUpdatesData, resourcesAppliationsListData, resourcesCloudListData } from '../../bento/landingPageData';
import Carousel from '../landing/component/carousel';
import exportIcon from '../../assets/landing/Export_Icon_Black.svg';
import bg1 from '../../assets/landing/bg_1.png';
import bg2 from '../../assets/landing/bg_2.png';
import bg3 from '../../assets/landing/bg_3.png';

const LandingViewContainer = styled.div`
    font-family: Poppins;
    position: relative;
    background: white;
    height: 2970px;
`;

const BackgroundFirst = styled.div`
  position: absolute;
  top: -1px;
  left: 0;
  margin-left: calc(50% - 720px);
  width: 1440px;
  height: 900px;
  background-image: url(${bg1});
  z-index: 3;
  background-repeat: no-repeat;
  background-size: cover;
`;

const BackgroundSecond = styled.div`
  position: absolute;
  top: 1085px;
  left: 0;
  margin-left: calc(50% - 720px);
  width: 1440px;
  height: 900px;
  background-image: url(${bg2});
  z-index: 2;
  background-repeat: no-repeat;
  background-size: cover;
`;

const BackgroundThird = styled.div`
  position: absolute;
  top: 1980px;
  left: 0;
  margin-left: calc(50% - 720px);
  width: 1440px;
  height: 1000px;
  background-image: url(${bg3});
  z-index: 1;
  background-repeat: no-repeat;
  background-size: cover;
`;

const HeroSection = styled.div`
  position: relative;
  height: 760px;
  z-index: 5;
`;

const Banner = styled.div`
  position: absolute;
  top: 120px;
  left: 0;
  height: 492px;
  width: 100%;

  background: linear-gradient(180deg, #1CA0A8 0%, rgba(69, 182, 189, 0.955183) 43.29%, rgba(82, 182, 152, 0.95) 100%),
              linear-gradient(180deg, rgba(17, 196, 212, 0.4) 0%, rgba(120, 233, 117, 0.38) 100%),
              linear-gradient(0deg, #56B0B8, #56B0B8), #2ADEC7;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.05);
  z-index: 8;
`;

const StatsSection = styled.div`
  position: relative;
  z-index: 5;
`;

const LatestUpdatesSection = styled.div`
  position: relative;
  z-index: 5;
  margin-top: 80px;
`;

const ResourcesSection = styled.div`
  position: relative;
  z-index: 5;
  margin-top: 120px;
  margin-bottom: 75px;
`;

const FirstContainer = styled.div`
    width: 1440px;
    margin: 0 auto;
    display: flex;
    z-index: 10;
    position: relative;
`;

const IntroContainer = styled.div`
    margin-top: 120px;
    width: 616px;
    height: 492px;
`;

const IntroTextContainer = styled.div`
    padding: 54px 0 85px 135px;
    
    .introTextTitle1 {
      text-align: left;
      color: #00444A;
      font-family: poppins;
      font-weight: 600;
      font-size: 35px;
      line-height: 35px;
    }

    .introTextTitle2 {
      width: 526px;
      text-align: left;
      color: #FFFFFF;
      font-family: Poppins;
      font-weight: 500;
      font-size: 16px;
      text-transform: uppercase;
      line-height: 20px;
    }

    .upperLine {
      content:'';
      display:inline-block;
      width: 421px;
      border-bottom: 0.5px solid #FFFFFF;
      margin: 43px 0 11px 0;
    }

    .lowerLine {
      content:'';
      display:inline-block;
      width: 421px;
      border-bottom: 0.5px solid #FFFFFF;
      margin: 18px 0 45px 0;
    }

`;

const ListContainer = styled.div`
    margin: 60px 33px;    
    width: 758px;
    height: 640px;
`;

const IntroAboutButtonContainer = styled.div`
    display: flex;

    .introAboutButton {
        display: block;
        text-decoration: none;
        color: #ffffff;
        margin-right: 30px;
        width: 176px;
        height: 57px;
        border: 1px solid #ffffff;
        border-radius: 5px;
        font-family: poppins;
        font-weight: 600;
        font-size: 16px;
        text-align: center;
        line-height: 57px;
        background: #05555C;
    }

    .introAboutButton:hover {
      color: #05555C;
      background: #FFFFFF;
      cursor: pointer;
      border: 1px solid #05555C;
  }
`;

const StatsContainer = styled.div`
    width: 1440px;
    margin: 0 auto;
    justify-content: center;
    position: relative;

    .leftbox {
      position: absolute;
      top: -20px;
      left: calc(1440px - 100vw - 200px);
      width: calc(100vw - 1440px + 400px);
      height: 520px;
      z-index: 9;
      background: white;
      filter: blur(30px);

      @media (min-width: 1440px) {
        left: calc(1440px - 100vw - 270px);
        width: calc(100vw - 1440px + 400px);
      }
      
      @media (max-width: 1440px) {
        left: -270px;
        width: 400px;
      }
    }

    .rightbox {
      position: absolute;
      top: -20px;
      height: 520px;
      z-index: 9;
      background: white;
      filter: blur(30px);
    
      @media (min-width: 1440px) {
        right: calc(1440px - 100vw - 270px);
        width: calc(100vw - 1440px + 400px);
      }
      
      @media (max-width: 1440px) {
        right: -270px;
        width: 400px;
      }
    }

    .borderTop {
      height: 72px;
      transform: matrix(1, 0, 0, -1, 0, 0);
      border-top: 1.8px solid #4BBFC6;
      position: relative;
      background: linear-gradient(180deg, rgba(158, 158, 158, 0.1) 0%, rgba(255, 255, 255, 0) 34.44%);
    }

    .borderBottom {
      height: 72px;
      border-top: 1.8px solid #4BBFC6;
      background: linear-gradient(180deg, rgba(158, 158, 158, 0.1) 0%, rgba(255, 255, 255, 0) 34.44%);
    }

    .statGlance {
      position: relative;
      padding: 40px 0;
      text-align: center;
      font-family: poppins;
      font-style: normal;
      font-weight: 600;
      font-size: 35px;
      color: #298085;
      line-height: 38px;
      background-color: white;
    }

    .statList {
      display: flex;
      justify-content: center;
      padding-bottom: 50px;
      background-color: white;
    }

    .statItem {
      max-width: 280px;
      padding: 0 40px 0 45px;
    }

    .statNum {
      color: #078893;
      font-family: Inter;
      font-weight: 800;
      font-size: 32px;
      line-height: 40px;
      text-align: left;
    }

    .statTitle {
      color: #05555C;
      font-family: Poppins;
      font-weight: 300;
      font-size: 19px;
      line-height: 23px;
      text-align: left;
    }

    .statDetail {
      color: #05555C;
      font-family: Poppins;
      font-weight: 600;
      font-size: 19px;
      line-height: 23px;
      text-align: left;
    }
`;

const StatsBox = styled.div`
    margin: 0 55px;
    position: relative;
`;

const LatestUpdatesContainer = styled.div`
    width: 1440px;
    margin: 0 auto;
    position: relative;

    .latestUpdatesList {
      display: flex;
      justify-content: center;
    }

    .latestUpdatesListItem {
      margin: 16px;
      width: 367px;
      height: 476px;
      background-color: #05555C;
      box-shadow: 0px 0px 16px #1B1C1C80;
      border-radius: 0px 20px;
    }

    .latestUpdatesListItemPic {
      border-radius: 0px 20px 0 0;
      height: 310px;
    }

    .latestUpdatesListTitle {
      color: #63D6C7;
      padding: 14px 23px 0 23px;
      font-family: Poppins;
      font-weight: 600;
      font-size: 14px;
      height: 57px
    }

    .latestUpdatesListContent {
      color: #FFFFFF;
      padding: 0 23px 0 23px;
      font-family: Inter;
      font-weight: 400;
      font-size: 16px;
    }
`;

const TitleContainer = styled.div`
    display: flex;
    color: #05555C;
    margin: 0 149px 38px 0;
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
    }
`;

const ResourcesOverlayRight = styled.div`
  position: absolute;
  width: 50%;
  height: 100px;
  right: 60px;
  top: -100px;

  background: rgba(255, 255, 255, 0.85);
  filter: blur(20px);
  z-index: 5;
`;

const ResourcesOverlay = styled.div`
  position: absolute;
  width: calc(100% - 120px);
  height: calc(100% - 40px);
  left: 60px;
  top: 0;

  background: rgba(255, 255, 255, 0.85);
  filter: blur(50px);
  z-index: 5;
`;

const ResourcesContainer = styled.div`
    width: 1440px;
    margin: 0 auto;
    z-index: 10;
    position: relative;

    .resourceTitle {
      margin-left: 160px;
      font-family: Poppins;
      font-weight: 600;
      font-size: 35px;
      color: #05555C;
    }

    .resourceItem {
      padding-bottom: 70px;
    }

    .resourceSubtitle {
      display: flex;
    }

    .resourceSubtitleText {
      margin: 10px 0 10px 170px;
      font-family: Poppins;
      font-weight: bold;
      font-size: 17px;
    }

    .titleLine {
      margin-left: 10px;
      display: flex;
      height: 32px;
      padding-bottom: 5px;
    }
    
    .titleLineLong {
      content:'';
      display:inline-block;
      width: 120px; 
      border-bottom: 3px solid;
      margin-right: 2px;
    }

    .titleLineShort {
      content:'';
      display:inline-block;
      width: 8px; 
      border-bottom: 3px solid;
      margin-left: 3px;
    }

    .resourceList {
      display: flex;
      flex-wrap: wrap;
      justify-content: left;
      margin: 0 143px 0 143px;
    }

    .resourceListItem {
      display: flex;
      width: 47%;
      margin: 17px;
      text-decoration: none;
    }

    .resourceListItem:focus-visible {
      outline: none;
  }

    .resourceListItemLogo {
      width: 133px;
      height: 125px;
      border-radius: 20px;
      display: flex;
      color: #FFFFFF;
      font-family: Reem Kufi;
      font-style: normal;
      font-weight: 400;
      font-size: 25px;
      line-height: 28px;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .resourceListItemText {
      margin: 5px 0 0 20px;
      width: 396px;
      height: 125px;
    }

    .resourceListItemTitle {
      color: #000000;
      font-family: Poppins;
      font-weight: 400;
      font-size: 20px;
      margin-bottom: 4px;
      line-height: 20px;
    }

    .resourceListItemTitleSmall {
      font-family: Poppins;
      font-weight: 400;
      font-size: 14px;
      margin-left: 8px;
      padding-right: 23px;
      background: url(${exportIcon}) right center no-repeat;
    }

    .resourceListItemContext {
      color: #000000;
      font-family: Poppins;
      font-weight: 400;
      font-size: 16px;
      letter-spacing: 0.02em;
    }
`;

const LandingView = () => {
  return (
    <LandingViewContainer>
      <BackgroundFirst />
      <BackgroundSecond />
      <BackgroundThird />
      <HeroSection>
        <Banner />
        <FirstContainer>
          <IntroContainer>
            <IntroTextContainer>
              <div className='introTextTitle1'>Discover CCDI</div>
              <div className='introTextTitle1'>applications, data,</div>
              <div className='introTextTitle1'>resources, and</div>
              <div className='introTextTitle1'>other tools</div>
              <div className='upperLine' />
              <div className='introTextTitle2'>Explore the CCDI Hub by selecting</div>
              <div className='introTextTitle2'>an available resource on the Hub Wheel</div>
              <div className='lowerLine' />
              <IntroAboutButtonContainer>
                <div><a className='introAboutButton' href="/about">{introData.introTitle3}</a></div>
                <div><a className='introAboutButton' href="https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative" target="_blank" rel="noopener noreferrer">{introData.introButtonTitle}</a></div>
              </IntroAboutButtonContainer>
            </IntroTextContainer>
          </IntroContainer>
          <ListContainer>
            <Carousel />
          </ListContainer>
        </FirstContainer>
      </HeroSection>
      <StatsSection>
        <StatsContainer>
          <StatsBox>
            <div className='leftbox' />
            <div className='rightbox' />
            <div className='borderTop' />
            <div className='statGlance'>CCDI Stats At a Glance</div>
            <div className='statList'>
            {
              statsData.map((statItem, statidx) => {
                const statkey = `stat_${statidx}`;
                return (
                  <div className='statItem' key={statkey}>
                    <div className='statNum'>{statItem.num}</div>
                    <div className='statTitle'>{statItem.title}</div>
                    <div className='statDetail'>{statItem.detail}</div>
                  </div>
                )
              })
            }
            </div>
            <div className='borderBottom' />
          </StatsBox>
        </StatsContainer>
      </StatsSection>
      <LatestUpdatesSection>
        <LatestUpdatesContainer>
          <TitleContainer>
            <div className='titleLine'>
              <div className='titleLineShort' />
              <div className='titleLineShort' />
              <div className='titleLineLong' />
            </div>
            <div className='titleText'>{titleData.latestUpdatesTitle}</div>
          </TitleContainer>
          <div className='latestUpdatesList'>
            {
              latestUpdatesData.map((updateItem, updateidx) => {
                const updatekey = `update_${updateidx}`;
                return (
                  <div className='latestUpdatesListItem' key={updatekey}>
                    <div className='latestUpdatesListItemPic' style={{ backgroundImage: `url(${updateItem.img})` }} />
                    <div className='latestUpdatesListTitle'>{updateItem.title}</div>
                    <div className='latestUpdatesListContent'>{updateItem.content}</div>
                  </div>
                )
              })
            }
          </div>
        </LatestUpdatesContainer>
      </LatestUpdatesSection>
      <ResourcesSection>
        <ResourcesOverlayRight />
        <ResourcesOverlay />
        <ResourcesContainer>
          <div className='resourceTitle'>{titleData.resourceTitle}</div>
          <div className='resourceItem'>
            <div className='resourceSubtitle' style={{color: '#2A8189'}}>
              <div className='resourceSubtitleText'>{titleData.applicationsTitle}</div>
              <div className='titleLine'>
                <div className='titleLineLong' />
                <div className='titleLineShort' />
                <div className='titleLineShort' />
              </div>
            </div>
            <div className='resourceList'>
              {
                resourcesAppliationsListData.map((appItem, appidx) => {
                  const appkey = `app_${appidx}`;
                  return (
                    <a id={appItem.id} className='resourceListItem' key={appkey} href={appItem.link} target="_blank" rel="noopener noreferrer">
                      <div className='resourceListItemLogo' style={{background: '#0095A2'}}>{appItem.subtitle}</div>
                      <div className='resourceListItemText'>
                        <div className='resourceListItemTitle'>{appItem.title}<span className='resourceListItemTitleSmall'>{'(' + appItem.subtitle + ')'}</span></div>
                        <div className='resourceListItemContext'>{appItem.content}</div>
                      </div>
                    </a>
                  )
                })
              }
            </div>
          </div>
          <div className='resourceItem'>
            <div className='resourceSubtitle' style={{color: '#5666BD'}}>
              <div className='resourceSubtitleText'>{titleData.cloudResourcesTitle}</div>
              <div className='titleLine'>
                <div className='titleLineLong' />
                <div className='titleLineShort' />
                <div className='titleLineShort' />
              </div>
            </div>
            <div className='resourceList'>
              {
                resourcesCloudListData.map((cloudItem, cloudidx) => {
                  const cloudkey = `cloud_${cloudidx}`;
                  return (
                    <a id={cloudItem.id} className='resourceListItem' key={cloudkey} href={cloudItem.link} target="_blank" rel="noopener noreferrer">
                      <div className='resourceListItemLogo' style={{background: '#455299'}}>{cloudItem.subtitle}</div>
                      <div className='resourceListItemText'>
                        <div className='resourceListItemTitle'>{cloudItem.title}<span className='resourceListItemTitleSmall'>{'(' + cloudItem.subtitle + ')'}</span></div>
                        <div className='resourceListItemContext'>{cloudItem.content}</div>
                      </div>
                    </a>
                  )
                })
              }
            </div>
          </div>
        </ResourcesContainer>
      </ResourcesSection>
    </LandingViewContainer>
  )
};

export default LandingView;
