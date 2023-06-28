import React from 'react';
import styled from 'styled-components';
import { introData, titleData, statsData, resourcesAppliationsListData, resourcesCloudListData } from '../../bento/landingPageData';
import { newsList } from '../../bento/newsData';
import ReactHtmlParser from 'html-react-parser';
import Carousel from '../landing/component/carousel';
import exportIcon from '../../assets/landing/Export_Icon_Black.svg';
import exportIconText from '../../assets/landing/Export_Icon_White.svg';
import bg1 from '../../assets/landing/bg_1.png';
import bg2 from '../../assets/landing/bg_2.png';
import bg3 from '../../assets/landing/bg_3.png';

const LandingViewContainer = styled.div`
    font-family: Poppins;
    position: relative;
    background: white;
    height: 2980px;
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
  height: 730px;
  z-index: 5;
`;

const Banner = styled.div`
  position: absolute;
  top: 120px;
  left: 0;
  height: 489px;
  width: 100%;
  background: linear-gradient(180deg, rgba(17, 196, 212, 0.4) 0%, rgba(55, 210, 176, 0.392465) 37.67%, rgba(120, 233, 117, 0.38) 100%), linear-gradient(0deg, #56B0B8, #56B0B8), #2ADEC7;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.05);
  z-index: 8;
`;

const BannerDarker = styled.div`
  position: absolute;
  top: 332px;
  height: 98px;
  width: 50%
  background: #087D6F;
  z-index: 9;
`;

const StatsSection = styled.div`
  position: relative;
  z-index: 5;
`;

const LatestUpdatesSection = styled.div`
  position: relative;
  z-index: 5;
  margin-top: 23px;
`;

const ResourcesSection = styled.div`
  position: relative;
  z-index: 5;
  margin-top: 94px;
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
    padding: 51px 0 0 135px;
    
    .introTextTitle1 {
      text-align: left;
      color: #002A2E;
      font-family: poppins;
      font-weight: 600;
      font-size: 50px;
      letter-spacing: 0.02em;
      line-height: 45px;
    }

    .introTextTitle2 {
      width: 526px;
      text-align: left;
      color: #FFFFFF;
      font-family: Poppins;
      font-weight: 500;
      font-size: 16px;
      text-transform: uppercase;
      line-height: 24px;
      background: #087D6F;
      padding: 13px 0;
      margin: 26px 0 43px 0;
    }
`;

const ListContainer = styled.div`
    margin: 60px 33px 30px 33px;    
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
      top: 8px;
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
      top: 8px;
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
      color: #00838F;
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
      line-height: 21px;
      text-align: left;
      margin-bottom: 2px;
    }

    .statDetail {
      color: #05555C;
      font-family: Poppins;
      font-weight: 600;
      font-size: 19px;
      line-height: 21px;
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
      background-color: #044249;
      box-shadow: 0px 0px 16px #1B1C1C80;
      border-radius: 0px 20px;
    }

    .latestUpdatesListItemPic {
      border-radius: 0px 20px 0 0;
      height: 310px;
    }

    .latestUpdatesListTitleContainer {
      text-decoration: none;
    }

    .latestUpdatesListTitle {
      color: #88DCDD;
      padding: 14px 23px 0 23px;
      margin-bottom: 7px;
      font-family: Poppins;
      font-weight: 500;
      font-size: 16px;
      line-height: 16px;
      height: 57px;
    }

    .latestUpdatesListTitle:hover{
      color: #72F9FB;
      cursor: pointer;
    }

    .latestUpdatesListContent {
      color: #FFFFFF;
      padding: 0 23px 0 23px;
      font-family: Inter;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      letter-spacing: -0.02em;
    }

    .latestUpdatesTextContent {
      a {
        color: #FFFFFF;
        padding-right: 20px;
        background: url(${exportIconText}) right center no-repeat;
        text-underline-offset: 5px;
      }
    }

    .readMoreContainer {
      font-size: 14px;
      color: #AFF1FF;
      border-bottom: 1px solid #AFF1FF;
      text-decoration: none;
      margin-left: 12px;
    }

    .readMoreContainer:hover{
      color: #5EF2FF;
      border-bottom: 1px solid #5EF2FF;
      cursor: pointer;
    }

    .readMoreContainer::after {
      content: '>';
      margin-left: 4px;
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
  top: -30px;

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
    margin: 0 auto;
    z-index: 10;
    position: relative;

    .resourceTitle {
      margin-left: 135px;
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
      margin: 10px 0 10px 135px;
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

    .resourceListItem {
      margin: 17px 0;
      text-decoration: none;
    }

    .resourceListItem:focus-visible {
      outline: none;
    }

    .resourceListItemLogo {
      width: 169px;
      height: 159px;
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

    @media (min-width: 1420px) {
      width: 1420px;

      .resourceListItem {
        display: flex;
        margin: 17px;
        text-decoration: none;
      }

      .resourceList {
        display: grid;
        grid-column-gap: 40px;
        grid-template-columns: 570px 570px;
        justify-content: center;
      }

      .resourceListItemText {
        margin: 5px 0 0 20px;
        width: 353px;
        height: 125px;
      }

      .upper {
        display: none;
      }

      .lower {
        display: block;
      }
    }

    @media (min-width: 1200px) and (max-width: 1419px) {
      .resourceTitle {
        margin-left: calc(50vw - 575px);
      }

      .resourceSubtitle {
        margin: 0 calc(50vw - 710px);
      }

      .resourceListItem {
        display: flex;
        margin: 17px;
        text-decoration: none;
      }

      .resourceList {
        display: grid;
        grid-column-gap: 40px;
        grid-template-columns: 570px 570px;
        justify-content: center;
      }

      .resourceListItemText {
        margin: 5px 0 0 20px;
        width: 353px;
        height: 125px;
      }

      .upper {
        display: none;
      }

      .lower {
        display: block;
      }
    }

    @media (max-width: 1199px) {
      .resourceList {
        display: grid;
        grid-column-gap: 55px;
        grid-template-columns: 371px 371px;
        justify-content: center;
      }

      .resourceListItemLogo {
        width: 78px;
        height: 73px;
        font-size: 18px;
        line-height: 20px;
      }

      .upper {
        display: block;
      }

      .resourceListItemTitleContainer {
        display: flex;
        align-items: center;
      }

      .resourceListItemTitle{
        font-size: 18px;
      }

      .resourceSubtitleText {
        margin: 10px 0 10px calc(50vw - 398px);
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.02em;
      }

      .resourceTitle {
        margin-left: calc(50vw - 398px);
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.02em;
      }

      .resourceListItem {
        margin: 12px 0;
      }

      .resourceListItemUpper {
        display: grid;
        grid-template-columns: 90px auto;
      }

      .resourceListItemContext {
        margin-top: 10px;
      }

      .resourceItem {
        padding-bottom: 40px;
      }

      .upper {
        display: block;
      }

      .lower {
        display: none;
      }
    }

    @media (max-width: 852px) {
      .resourceList {
        display: grid;
        grid-column-gap: 55px;
        grid-template-columns: auto auto;
        justify-content: center;
        margin: 0 28px;
      }

      .resourceSubtitleText {
        margin: 10px 0 10px 28px;
      }

      .resourceTitle {
        margin-left: 28px;
      }
    }

    @media (max-width: 600px) {
      .resourceList {
        display: grid;
        grid-template-columns: 100%;
        margin: 0 28px;
      }

      .resourceItem {
        padding-bottom: 40px;
      }

      .resourceListItem {
        // max-width: 344px;
        margin: 15px 0;
      }
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
        <BannerDarker />
        <FirstContainer>
          <IntroContainer>
            <IntroTextContainer>
              <div className='introTextTitle1'><div>Discover</div><div>CCDI</div><div>Resources</div></div>
              <div className='introTextTitle2'>
                <div>Explore the CCDI Hub, its applications,</div>
                <div>and analytic tools by selecting an</div>
                <div>available resource</div>
              </div>
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
                    <div className='statTitle'>{ReactHtmlParser(statItem.title)}</div>
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
              newsList.slice(0,3).map((updateItem, updateidx) => {
                const updatekey = `update_${updateidx}`;
                return (
                  <div className='latestUpdatesListItem' key={updatekey}>
                    <a href={`/news#${updateItem.id}`} ><div className='latestUpdatesListItemPic' style={{ backgroundImage: `url(${updateItem.img})` }} /><span style={{display:'none'}}>latestUpdates text</span></a>
                    <a className='latestUpdatesListTitleContainer' href={`/news#${updateItem.id}`}><div className='latestUpdatesListTitle'>{updateItem.title}</div></a>
                    <div className='latestUpdatesListContent'>
                      <span className='latestUpdatesTextContent'>{ReactHtmlParser(updateItem.slug)}</span>
                      { updateItem.slug.length > 100 && updateItem.slug.length < 110
                      ? <div><a className='readMoreContainer' href={`/news#${updateItem.id}`} style={{marginLeft: 0}}>Read More</a></div>
                      : <a className='readMoreContainer' href={`/news#${updateItem.id}`}>Read More</a>}
                    </div>
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
            <div className='resourceSubtitle' style={{color: '#00838F'}}>
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
                      <div className='resourceListItemUpper'>
                        <div className='resourceListItemLogo' style={{background: '#00838F'}}>{appItem.subtitle}</div>
                        <div className='resourceListItemTitleContainer'>
                          <div className='resourceListItemTitle upper'>{appItem.title}<span className='resourceListItemTitleSmall'>{'(' + appItem.subtitle + ')'}</span></div>
                        </div>
                      </div>
                      <div className='resourceListItemText'>
                        <div className='resourceListItemTitle lower'>{appItem.title}<span className='resourceListItemTitleSmall'>{'(' + appItem.subtitle + ')'}</span></div>
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
                      <div className='resourceListItemUpper'>
                        <div className='resourceListItemLogo' style={{background: '#455299'}}>{cloudItem.subtitle}</div>
                        <div className='resourceListItemTitleContainer'>
                          <div className='resourceListItemTitle upper'>{cloudItem.title}<span className='resourceListItemTitleSmall'>{'(' + cloudItem.subtitle + ')'}</span></div>
                        </div>
                      </div>
                      <div className='resourceListItemText'>
                        <div className='resourceListItemTitle lower'>{cloudItem.title}<span className='resourceListItemTitleSmall'>{'(' + cloudItem.subtitle + ')'}</span></div>
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
