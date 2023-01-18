import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LANDING_PAGE_DATA_QUERY } from '../../bento/landingPageData';
import img from '../../assets/landing/Landing_Intro_Pic.png'

const LandingViewContainer = styled.div`
    width: 1440px;
    margin: 0 auto;
`;

const FirstContainer = styled.div`
    display: flex;
    height: 900px;
    background: red;
`;

const IntroContainer = styled.div`
    width: 720px;
    background: yellow;
`;

const IntroTextContainer = styled.div`
    height: 372px;
    background: grey;
`;

const IntroPicContainer = styled.div`
    width: 664px;
    height: 434px;
    background-image: url(${img});
    background-repeat: no-repeat;
    background-position: -34px;
`;

const ListContainer = styled.div`
    width: 720px;
    background: green;
`;

const StatsContainer = styled.div`
    position: absolute;
    height: 187px
    width: 1119px;
    background: #05555C;
    border-radius: 0px 20px;
    top: 713px;
    margin-left: 161px;

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
          </IntroTextContainer>
          <IntroPicContainer>
          </IntroPicContainer>
        </IntroContainer>
        <ListContainer>
        </ListContainer>
      </FirstContainer>
      <StatsContainer>
        </StatsContainer>
      <div style={{marginTop: "140px", height: "250px", fontSize: "100px"}}>Hello World!</div>
    </LandingViewContainer>
  )
};

export default LandingView;
