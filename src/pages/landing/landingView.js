import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LANDING_PAGE_DATA_QUERY,introData, titleData, statsData, latestUpdatesData } from '../../bento/landingPageData';

const LandingViewContainer = styled.div`
    width: 1440px;
    margin: 0 auto;
    font-family: Poppins;
`;

const FirstContainer = styled.div`
    display: flex;
`;

const IntroContainer = styled.div`
    width: 720px;
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
    background-position: -34px;
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
    width: 1119px;
    background: #05555C;
    border-radius: 0px 20px;
    top: 713px;
    margin-left: 161px;
    padding-top: 40px;
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
    }
`;

const LatestUpdatesContainer = styled.div`
    // background-color: pink;
    margin-top: 97px;
    .latestUpdatesTitle {
      display: flex;
      color: #05555C;
      margin: 0 151px 20px 0;
      justify-content: flex-end;
    }

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

    .latestUpdatesTitleText {
      font-family: Poppins;
      font-weight: bold;
      font-size: 35px;
    }

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
      height: 311px;
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

const ResourcesContainer = styled.div`
    margin-top: 131px;
    height: 100px;
    // background: yellow;

    .resourceTitle {
      margin-left: 162px;
      font-family: Poppins;
      font-weight: bold;
      font-size: 35px;
      color: #05555C;
    }

    .applicationsTitle {
      margin-left: 169px;
      font-family: Poppins;
      font-weight: bold;
      font-size: 17px;
      color: #7CCFD6;
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
        <div className='latestUpdatesTitle'>
          <div className='titleLine'>
            <div className='titleLineShort' />
            <div className='titleLineShort' />
            <div className='titleLineLong' />
          </div>
          <div className='latestUpdatesTitleText'>{titleData.latestUpdatesTitle}</div>
        </div>
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
        <div className='applicationsTitle'>{titleData.applicationsTitle}</div>
      </ResourcesContainer>
    </LandingViewContainer>
  )
};

export default LandingView;
