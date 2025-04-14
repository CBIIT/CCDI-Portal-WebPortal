import React from 'react';
import styled from 'styled-components';
import {aboutData} from '../../bento/aboutPageData';
import aboutImg from '../../assets/about/About_Img_Large.png';
import exportIcon from '../../assets/about/Export_Icon.svg';
import exportBlackIcon from '../../assets/landing/Export_Icon_Black.svg';
import ReactHtmlParser from 'html-react-parser';

const AboutContainer = styled.div`
  margin: 0 auto;

  p {
      font-weight: 500;
  }

  li {
      font-weight: 500;
  }

  .aboutHeader {
    font-family: poppins;
    font-weight: 600;
    font-size: 35px;
    color: #206165;
    margin: 48px 0 30px 0;
    text-align: center;
  }

  hr {
    max-width: 1265px;
    margin: 0 auto 48px auto;
    border: 0.5px solid #007A85;
  }

  .aboutBody {
    font-family: Inter;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    margin: 0 50px;
    margin-bottom: 30px;
    letter-spacing: 0.02em;
    line-height: 24px;
  }

  .upperContainer {
    display: flex;
  }

  .aboutSubtitle {
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 21px;
    color: #007A85;
  }

  .textParagraph {
    margin: 25px 0 50px 0;
    font-weight: 500;
  }

  .aboutContactUs {
    background: linear-gradient(180deg, rgba(17, 196, 212, 0.40) 0%, rgba(36, 203, 194, 0.40) 18.6%, rgba(55, 210, 176, 0.39) 37.67%, rgba(120, 233, 117, 0.38) 100%), linear-gradient(0deg, #56B0B8 0%, #56B0B8 100%), #2ADEC7;
    opacity: 0.7;
  }

  .aboutContactUsContainer {
    max-width: 1265px;
    margin: 0 50px;
    color: #000000;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.32px;
    padding: 36px 0 70px 0;
  }

  .aboutContactUsContent {
    max-width: 792px;
    font-family: Inter;
    line-height: 24px;
  }

  .aboutContactUsHeader {
    color: #000000;
    font-family: Poppins;
    font-size: 21px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
  }

  .upperImg {
    width: 432px;
    height: 416px;
    margin-left: 41px;
    border: 2.5px solid #4BBFC6;
    border-radius: 0 20px;
    object-fit: cover;
  }

  .aboutLink {
    color: #455299;
    font-family: poppins;
    font-weight: 700;
    padding-right: 20px;
    background: url(${exportIcon}) right center no-repeat;
    text-underline-offset: 4px;
  }

  .aboutContactLink {
    color: #000000;
    font-family: Inter;
    font-weight: 700;
    padding-right: 20px;
    background: url(${exportBlackIcon}) right center no-repeat;
    text-underline-offset: 4px;
  }

  @media (max-width: 1364px) {
    .upperImg {
      width: 300px;
      height: 353px;
      margin-left: 37px;
    }
    .aboutHeaderText {
      font-size: 50px;
      line-height: 45px;
      letter-spacing: 1px;
    }
    .secondParagraph {
      display: none;
    }
    hr {
      margin: 0 50px 48px 50px;
      border: 0.5px solid #007A85;
    }
    .aboutContactUsContent {
      max-width: 1364px;
    }
  }

  @media (max-width: 767px) {
    .aboutHeader {
      position: relative;
      background-image: url(${aboutImg});
      height: 406px;
      margin: 0 0 42px 0;
    }
    .aboutHeaderText {
      position: absolute;
      top: 34%;
      left: 0;
      width: 100%;
      color: #FFFFFF;
      background: rgba(0, 95, 103, 0.85);
      height: 141px;
      line-height: 141px;
      font-size: 50px;
      letter-spacing: 1px;
    }
    .upperImg {
      display: none;
    }
    .aboutBody {
      margin: 0 6.5% 0 6.5%;
    }

    .aboutContactUsContainer {
      margin: 0 6.5%;
    }

    hr {
      display: none;
    }
  }

  @media (min-width: 1365px) {
    .aboutBody {
      width: 1265px;
      margin: 0 auto 30px auto;
    }

    .aboutContactUsContainer {
      margin: 0 auto;
    }
    .lowerContainer {
      display: none;
    }
  }
`;

const AboutView = () => {
  return (
    <AboutContainer>
      <div className='aboutHeader'>
        <div className='aboutHeaderText'>About</div>
      </div>
      <hr/>
      <div className='aboutBody'>
        <div className='upperContainer'>
          <div className='upperContentContainer'>
            <div className='aboutSubtitle'>{aboutData.upperTitle}</div>
            <div className='textParagraph'>{ReactHtmlParser(aboutData.upperText)}</div>
            <div className='secondParagraph'>
              <div className='aboutSubtitle'>{aboutData.lowerTitle}</div>
              <div className='textParagraph'>{ReactHtmlParser(aboutData.lowerText)}</div>
            </div>
          </div>
          <img className='upperImg' src={aboutImg} alt="about_img" />
        </div>
        <div className='lowerContainer'>
          <div className='aboutSubtitle'>{aboutData.lowerTitle}</div>
          <div className='textParagraph'>{ReactHtmlParser(aboutData.lowerText)}</div>
        </div>
      </div>
      <div className='aboutContactUs'>
        <div className='aboutContactUsContainer'>
          <div className='aboutContactUsContent'>
            <div className='aboutContactUsHeader'>Contact Us</div>
            <div>{ReactHtmlParser(aboutData.aboutText)}</div>
          </div>
        </div>
      </div>
    </AboutContainer>
  )
};
export default AboutView;
