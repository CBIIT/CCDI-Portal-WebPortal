import React from 'react';
import styled from 'styled-components';
import {aboutData} from '../../bento/aboutPageData';
import aboutImg from '../../assets/about/About_Img.png';
import exportIcon from '../../assets/about/Export_Icon.svg';

const AboutContainer = styled.div`
  width: 1440px;
  margin: 0 auto;

  .aboutHeader {
    font-family: poppins;
    font-weight: 600;
    font-size: 35px;
    color: #298085;
    margin: 48px 0;
    text-align: center;
  }
  .aboutBody {
    font-family: Inter;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    margin: 0 251px 60px 318px;
  }

  .aboutSubtitle {
    font-family: Inter;
    font-weight: 600;
    font-size: 21px;
    color: #298085;
  }

  .aboutBodyUpperContainer {
    display: flex;
  }

  .upperText {
    width: 432px;
    margin-right: 70px;
    letter-spacing: 0.02em;
    line-height: 27px;
  }

  .textParagraph {
    margin-top: 25px;
  }

  .upperImg {
    background-image: url(${aboutImg});
    width: 367px;
    height: 438px;
  }

  .aboutBodyLowerContainer {
    margin: 64px 0 120px 0;
    letter-spacing: 0.02em;
    line-height: 27px;
  }

  .aboutLink {
    color: #455299;
    font-family: poppins;
    font-weight: 600;
    padding-right: 20px;
    background: url(${exportIcon}) right center no-repeat;
  }
`;

const AboutView = () => {
  return (
    <AboutContainer>
      <div className='aboutHeader'>About</div>
      <div className='aboutBody'>
        <div className='aboutBodyUpperContainer'>
          <div className='upperText'>
            <div className='aboutSubtitle'>Childhood Cancer Data Initiative Hub</div>
            <div className='textParagraph'>{aboutData.upperText1}</div>
            <div className='textParagraph'>{aboutData.upperText2}</div>
          </div>
          <div className='upperImg'></div>
        </div>
        <div className='aboutBodyLowerContainer'>
          <div className='aboutSubtitle'>Childhood Cancer Data Initiative</div>
          <div className='textParagraph'>The <a className='aboutLink' href='https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative' target="_blank" rel="noopener noreferrer">NCI's Childhood Cancer Data Initiative (CCDI)</a> is building a community centered around childhood cancer care and research data. By connecting, analyzing, and easily sharing data among researchers, we can increase our understanding of childhood cancers and improve treatment, quality of life, and survivorship for all children, adolescents, and young adults with cancer.</div>
        </div>
      </div>
    </AboutContainer>
  )
};
export default AboutView;
