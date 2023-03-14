import React from 'react';
import styled from 'styled-components';
import { introData, titleData, statsData, latestUpdatesData, resourcesAppliationsListData, resourcesCloudListData } from '../../bento/landingPageData';
import resourcesItemLogo from '../../assets/landing/Resources_Logo.svg';
import Carousel from '../landing/component/carousel1'

const LandingViewContainer = styled.div`
    width: 1440px;
    margin: 0 auto;
    font-family: Poppins;
`;

const FirstContainer = styled.div`
    display: flex;
`;

const IntroContainer = styled.div`
    width: 41%;
    margin-top: 115px;
`;

const IntroTextContainer = styled.div`
    padding: 54px 0 85px 135px;
    background: linear-gradient(#3cb8c3, 20%, #3fc0ac, 80%, #4bb48e);
    border-radius: 0 20px 20px 0;
    
    .introTextTitle1 {
      text-align: left;
      color: #05555C;
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
      margin: 18px 0 13px 0;
    }

`;

const ListContainer = styled.div`
    width: 59%;
`;

const IntroAboutButtonContainer = styled.div`
    display: flex;

    .introAboutButton {
      margin-top: 30px;
      margin-right: 20px;
      border: 1px solid #ffffff;
      height: 57px;
      width: 164px;
      border-radius: 5px;
      color: #033135;
      font-family: Poppins;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      line-height: 57px;
    }

    .hover {
      background: #078893;
      color: #FFFFFF;
      border: transparent;
    }
`;

const StatsContainer = styled.div`
    width: 1440px;
    margin: 80px auto;
    justify-content: center;
    position: relative;

    .leftbox {
      position: absolute;
      top: 0;
      left: 0;
      width: 270px;
      height: 400px;
      z-index: 9;
      background: linear-gradient(to right, #fafafa, 70%, transparent);
    }

    .rightbox {
      position: absolute;
      right: 0;
      top: 0;
      width: 270px;
      height: 400px;
      z-index: 9;
      background: linear-gradient(to left, #fafafa, 70%, transparent);
    }

    .borderTop {
      height: 72px;
      // border-bottom: 2px solid;
      // border-image: linear-gradient(
      //   90deg,
      //   rgba(255, 255, 255, 0) 0%,
      //   #7CCFD6 50%,
      //   rgba(255, 255, 255, 0) 99%
      // )
      // 2 2 2 2;

      background: linear-gradient(180deg, rgba(153, 153, 153, 0.2) 0%, rgba(255, 255, 255, 0) 94.44%);
      backdrop-filter: blur(2.5px);
      transform: matrix(1, 0, 0, -1, 0, 0);
      border-top: 1.4px solid #7CCFD6;
    }

    .borderBottom {
      height: 72px;
      background: linear-gradient(180deg, rgba(153, 153, 153, 0.2) 0%, rgba(255, 255, 255, 0) 94.44%);
      backdrop-filter: blur(2.5px);
      border-top: 1.4px solid #7CCFD6;
    }

    .statGlance {
      margin: 41px 0 39px 0;
      text-align: center;
      font-family: poppins;
      font-style: normal;
      font-weight: 600;
      font-size: 35px;
      color: #8CCCD0;
      line-height: 38px;
    }

    .statList {
      display: flex;
      justify-content: center;
      margin-bottom: 50px;
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

const LatestUpdatesContainer = styled.div`
    margin-top: 67px;
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

const ResourcesContainer = styled.div`
    margin: 139px 0 136px 0;

    .resourceTitle {
      margin-left: 160px;
      font-family: Poppins;
      font-weight: 600;
      font-size: 35px;
      color: #05555C;
    }

    .resourceItem {
      margin-bottom: 70px;
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
      width: 50%;
      padding: 17px;
      // background: blue;
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
              <div className='introAboutButton'>{introData.introTitle3}</div>
              <div className='introAboutButton hover'>{introData.introButtonTitle}</div>
            </IntroAboutButtonContainer>
          </IntroTextContainer>
        </IntroContainer>
        <ListContainer>
          <Carousel />
        </ListContainer>
      </FirstContainer>
      <StatsContainer>
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
      </StatsContainer>
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
                  <div id={appItem.id} className='resourceListItem' key={appkey}>
                    <div className='resourceListItemLogo' style={{background: '#0095A2'}}>{appItem.subtitle}</div>
                    <div className='resourceListItemText'>
                      <div className='resourceListItemTitle'>{appItem.title}<span className='resourceListItemTitleSmall'>{'(' + appItem.subtitle + ')'}</span></div>
                      <div className='resourceListItemContext'>{appItem.content}</div>
                    </div>
                  </div>
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
                  <div id={cloudItem.id} className='resourceListItem' key={cloudkey}>
                    <div className='resourceListItemLogo' style={{background: '#455299'}}>{cloudItem.subtitle}</div>
                    <div className='resourceListItemText'>
                      <div className='resourceListItemTitle'>{cloudItem.title}<span className='resourceListItemTitleSmall'>{'(' + cloudItem.subtitle + ')'}</span></div>
                      <div className='resourceListItemContext'>{cloudItem.content}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </ResourcesContainer>
    </LandingViewContainer>
  )
};

export default LandingView;
