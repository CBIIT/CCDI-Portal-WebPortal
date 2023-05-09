import React from 'react';
import styled from 'styled-components';
import {aboutData} from '../../bento/aboutPageData';
import aboutImg from '../../assets/about/About_Img.png';
import exportIcon from '../../assets/about/Export_Icon.svg';
import ReactHtmlParser from 'html-react-parser';

const AboutContainer = styled.div`
  margin: 0 auto;

  .aboutHeader {
    font-family: poppins;
    font-weight: 600;
    font-size: 35px;
    color: #206165;
    margin: 48px 0;
    text-align: center;
  }
  .aboutBody {
    font-family: Inter;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    margin: 0 8%;
    margin-bottom: 150px;
    letter-spacing: 0.02em;
    line-height: 24px;
  }

  .aboutSubtitle {
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 21px;
    color: #007A85;
  }

  .textParagraph {
    margin: 25px 0 50px 0;
  }

  .upperImg {
    width: 40%;
    float: right;
    margin-left: 2%;
    border: 2.5px solid #4BBFC6;
    border-radius: 0 20px;
  }

  .aboutLink {
    color: #455299;
    font-family: poppins;
    font-weight: 600;
    padding-right: 20px;
    background: url(${exportIcon}) right center no-repeat;
  }

  @media (max-width: 890px) {
    .upperImg {
      width: 296px;
      margin-left: 37px;
    }
  }

  @media (max-width: 540px) {
    .aboutHeader {
      color: #FFFFFF;
      background: rgba(0, 95, 103, 0.85);
    }
    .upperImg {
      position: absolute;
      width: 100%;
      height: 406px;
      left: 0;
      top: 130px;
      margin: 0;
      z-index: -1;
      border: none;
      border-radius: 0;
      object-fit: fill;
      // display: none;
    }
    .aboutHeader {
      margin: 160px 0 190px 0;
    }
  }

  @media (min-width: 1300px) {
    .aboutBody {
      width: 1080px;
      margin: 0 auto 150px auto;
    }
  }
`;

const AboutView = () => {
  return (
    <AboutContainer>
      <div className='aboutHeader'>About</div>
      <div className='aboutBody'>
          <img className='upperImg' src={aboutImg} alt="about_img" />
          <div className='aboutSubtitle'>{aboutData.upperTitle}</div>
          <div className='textParagraph'>{ReactHtmlParser(aboutData.upperText)}</div>
          <div className='aboutSubtitle'>{aboutData.lowerTitle}</div>
          <div className='textParagraph'>{ReactHtmlParser(aboutData.lowerText)}</div>
      </div>
    </AboutContainer>
  )
};
export default AboutView;
