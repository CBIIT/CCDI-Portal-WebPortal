import React from 'react';
import styled from 'styled-components';
import {aboutData} from '../../bento/aboutPageData';
import aboutImg from '../../assets/about/About_Img.png';

const AboutContainer = styled.div`
  width: 1440px;
  margin: 0 auto;

  .aboutHeader {
    font-family: poppins;
    font-weight: 600;
    font-size: 35px;
    color: #0095A2;
    margin: 78px 538px 85px 538px;
  }
  .aboutBody {
    font-family: Inter;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    margin: 0 251px 60px 318px;
  }

  .aboutBodyUpperContainer {
    display: flex;
  }

  .upperText {
    width: 432px;
    margin-right: 70px;
  }

  .upperImg {
    background-image: url(${aboutImg});
    width: 367px;
    height: 438px;
  }

  .aboutBodyLowerContainer {
    margin: 64px 0 120px 0;
  }
`;

const AboutView = () => {
  return (
    <AboutContainer>
      <div className='aboutHeader'>About the CCDI Hub</div>
      <div className='aboutBody'>
        <div className='aboutBodyUpperContainer'>
          <div className='upperText'>{aboutData.upperText}</div>
          <div className='upperImg'></div>
        </div>
        <div className='aboutBodyLowerContainer'>{aboutData.lowerText}</div>
      </div>
    </AboutContainer>
  )
};
export default AboutView;
