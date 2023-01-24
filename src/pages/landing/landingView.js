import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LANDING_PAGE_DATA_QUERY,introData, titleData, statsData, latestUpdatesData, resourcesAppliationsListData, resourcesCloudListData, aboutContainerData } from '../../bento/landingPageData';
import resourcesItemLogo from '../../assets/landing/Resources_Logo.svg';

const LandingViewContainer = styled.div`
    width: 1440px;
    margin: 0 auto;
    font-family: Poppins;
`;

const FirstContainer = styled.div`
    display: flex;
`;

const IntroContainer = styled.div`
    width: 50%;
`;

const IntroTextContainer = styled.div`
    height: 372px;
    padding-left: 162px;
    padding-top: 80px;
    
    .introTextTitle1 {
      height: 38px;
      text-align: left;
      color: #939393;
      font-family: Poppins;
      font-weight: 500;
    }

    .introTextTitle2 {
      width: 526px;
      height: 141px;
      text-align: left;
      color: #05555C;
      font-family: Poppins;
      font-weight: bold;
      font-size: 37px;
    }

`;

const IntroPicContainer = styled.div`
    width: 664px;
    height: 434px;
    background-image: url(${introData.landingIntroPic});
    background-repeat: no-repeat;
`;

const ListContainer = styled.div`
    width: 720px;
    background: green;
`;

const IntroAboutButtonContainer = styled.div`
    display: flex;

    .introAboutTitle {
      width: 210px;
      color: #078893;
      font-family: Poppins;
      font-weight: bold;
      font-size: 16px;
      margin-top: 40px;
    }

    .introAboutButton {
      margin-top: 30px;
      background: #05555C;
      height: 41px;
      width: 164px;
      border-radius: 5px;
      color: #FFFFFF;
      font-family: Poppins;
      font-weight: bold;
      font-size: 16px;
      text-align: center;
      line-height: 41px;
    }
`;

const StatsContainer = styled.div`
    position: absolute;
    display: flex;
    height: 187px
    width: 1120px;
    background: #05555C;
    border-radius: 0px 20px;
    top: 713px;
    margin-left: 160px;
    padding-top: 50px;
    justify-content: center;

    .statItem {
      display: flex;
    }

    .statNum {
      text-align: right;
      color: #078893;
      font-family: Inter;
      font-weight: 800;
      font-size: 40px;
      width: 88px;
      margin-right: 10px;
    }

    .statText {
      margin-top: 17px;
      width: 171px;
    }

    .statTitle {
      color: #E6E6E6;
      font-family: Poppins;
      font-weight: 300;
      font-size: 19px;
    }

    .statDetail {
      color: #E6E6E6;
      font-family: Poppins;
      font-weight: bold;
      font-size: 19px;
      line-height: 23px;
    }
`;

const LatestUpdatesContainer = styled.div`
    margin-top: 97px;

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
      font-weight: bold;
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
      font-weight: bold;
      font-size: 35px;
    }
`;

const ResourcesContainer = styled.div`
    margin-top: 139px;

    .resourceTitle {
      margin-left: 160px;
      font-family: Poppins;
      font-weight: bold;
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
      align-items: center;
      justify-content: center;
      padding: 25px;
    }

    .resourceListItemText {
      margin: 5px 0 0 20px;
      width: 385px;
      height: 125px;
    }

    .resourceListItemTitle {
      color: #000000;
      font-family: Poppins;
      font-weight: 400;
      font-size: 20px;
      margin-bottom: 4px;
      line-height: 99%;
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
    }
`;

const AboutContainer = styled.div`
    margin-top: 149px;

    .aboutContentContainer {
      display: flex;
      margin: 88px 0 131px 0;
    }

    .aboutLeftContainer {
      width: 50%;
      height:378px;
      background-image: url(${aboutContainerData.img});
      background-repeat: no-repeat;
    }

    .aboutButtonList {
      margin: 40px 0 0 332px;
    }

    .aboutButton {
      height: 88px;
      width: 218px;
      border: 1px solid #078893;
      background: #FFFFFF;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
      border-radius: 5px;
      margin-bottom: 17px;
      font-family: Poppins;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      color: #05555C;
      text-align: center;
      line-height: 88px;
    }

    .aboutButton:hover {
      cursor: pointer;
    }

    .active {
      background: #078893;
      color: #FFFFFF;
    }

    .aboutRightContainer {
      width: 50%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
    }

    .aboutTextContainer {
      width: 526px;
      margin-left: 63px;
      font-family: Inter;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
    }
`;

const LandingView = () => {
  const { loading, error, data } = useQuery(GET_LANDING_PAGE_DATA_QUERY);

  useEffect(() => {
    console.log(data);
  },[data]);

  return (
    <LandingViewContainer>
      <FirstContainer>
        <IntroContainer>
          <IntroTextContainer>
            <div className='introTextTitle1'>{introData.introTitle1}</div>
            <div className='introTextTitle2'>{introData.introTitle2}</div>
            <IntroAboutButtonContainer>
              <div className='introAboutTitle'>{introData.introTitle3}</div>
              <div className='introAboutButton'>{introData.introButtonTitle}</div>
            </IntroAboutButtonContainer>
          </IntroTextContainer>
          <IntroPicContainer>
          </IntroPicContainer>
        </IntroContainer>
        <ListContainer>
        </ListContainer>
      </FirstContainer>
      <StatsContainer>
        {
          statsData.map((statItem, statidx) => {
            const statkey = `stat_${statidx}`;
            return (
              <div className='statItem' key={statkey}>
                <div className='statNum'>{statItem.num}</div>
                <div className='statText'>
                  <div className='statTitle'>{statItem.title}</div>
                  <div className='statDetail'>{statItem.detail}</div>
                </div>
              </div>
            )
          })
        }
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
          <div className='resourceSubtitle' style={{color: '#7CCFD6'}}>
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
                  <div className='resourceListItem' key={appkey}>
                    <div className='resourceListItemLogo' style={{background: '#0095A2'}}><img src={resourcesItemLogo} alt='resourcesItemLogo' /></div>
                    <div className='resourceListItemText'>
                      <div className='resourceListItemTitle'>{appItem.title}<span className='resourceListItemTitleSmall'>{appItem.subtitle}</span></div>
                      <div className='resourceListItemContext'>{appItem.content}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className='resourceItem'>
          <div className='resourceSubtitle' style={{color: '#7884CA'}}>
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
                  <div className='resourceListItem' key={cloudkey}>
                    <div className='resourceListItemLogo' style={{background: '#455299'}}><img src={resourcesItemLogo} alt='resourcesItemLogo' /></div>
                    <div className='resourceListItemText'>
                      <div className='resourceListItemTitle'>{cloudItem.title}<span className='resourceListItemTitleSmall'>{cloudItem.subtitle}</span></div>
                      <div className='resourceListItemContext'>{cloudItem.content}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </ResourcesContainer>
      <AboutContainer>
        <TitleContainer>
          <div className='titleLine'>
            <div className='titleLineShort' />
            <div className='titleLineShort' />
            <div className='titleLineLong' />
          </div>
          <div className='titleText'>{titleData.aboutTitle}</div>
        </TitleContainer>
        <div className='aboutContentContainer'>
          <div className="aboutLeftContainer">
            <div className='aboutButtonList'>
              {
                aboutContainerData.aboutButtonlist.map((aboutButtonItem, idx) => {
                  const key = `abt_${idx}`;
                  return (
                    <div className='aboutButton' key={key}>{aboutButtonItem}</div>
                  )
                })
              }
            </div>
          </div>
          <div className='aboutRightContainer'>
            <div className='aboutTextContainer'>{aboutContainerData.aboutList['MCI']}</div>
          </div>
        </div>
      </AboutContainer>
    </LandingViewContainer>
  )
};

export default LandingView;
