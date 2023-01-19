import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LANDING_PAGE_DATA_QUERY,introData, statsData } from '../../bento/landingPageData';

const LandingViewContainer = styled.div`
    width: 1440px;
    margin: 0 auto;
    font-family: Poppins;
`;

const FirstContainer = styled.div`
    display: flex;
    height: 900px;
`;

const IntroContainer = styled.div`
    width: 720px;
    // background: yellow;
`;

const IntroTextContainer = styled.div`
    // background: pink;
    height: 372px;
    padding-left: 162px;
    padding-top: 80px;
    
    .introTextTitle1 {
      height: 38px;
      text-align: left;
      color: #939393;
    }

    .introTextTitle2 {
      width: 526px;
      height: 141px;
      text-align: left;
      color: #05555C;
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

    .IntroAboutTitle {
      width: 210px;
      color: #078893;
      font-weight: bold;
      font-size: 16px;
      margin-top: 40px;
    }

    .IntroAboutButton {
      margin-top: 30px;
      background: #05555C;
      height: 41px;
      width: 164px;
      border-radius: 5px;
      color: #FFFFFF;
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
    padding: 40px 0 0 10px;

    .statItem {
      display: flex;
    }

    .statNum {
      text-align: right;
      color: #078893;
      font-size: 40px;
      width: 90px;
      margin-right: 10px;
    }

    .statText {
      margin-top: 17px;
      width: 171px;
    }

    .statTitle {
      color: #E6E6E6;
      font-size: 19px;
      font-weight: 300;
    }

    .statDetail {
      color: #E6E6E6;
      font-size: 19px;
      font-weight: bold;
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
              <div className='IntroAboutTitle'>{introData.introTitle3}</div>
              <div className='IntroAboutButton'>{introData.introButtonTitle}</div>
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
              <div className='statItem'>
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
      <div style={{marginTop: "140px", height: "250px", fontSize: "100px"}}>Hello World!</div>
    </LandingViewContainer>
  )
};

export default LandingView;
