import React from 'react';
import styled from 'styled-components';
import FooterData from '../../bento/globalFooterData';

const FooterStyled = styled.footer`
  background-color: #CCCED1;
  border-top: 1px solid #6C727B;
  bottom: 0;
  width: 100%;
`;

const FooterContainer = styled.div`
  width: 1440px;
  height: 260px;
  margin: 0 auto;
`;

const FooterUpperContainer = styled.div`
  display: flex;
`;

const FooterLogo = styled.div`
  padding: 30px 0 0 66px;

  .logoText {
    text-decoration: none;
  }

  .logoUpperText {
    font-family: Inter;
    font-weight: 700;
    font-size: 19px;
    color: #393C3C;
  }

  .logoLowerText {
    font-family: Inter;
    font-weight: 700;
    font-size: 12px;
    color: #393C3C;
  }

`;

const Footer = () => {
  return (
    <FooterStyled role="contentinfo">
        <FooterContainer>
            <FooterUpperContainer>
                <FooterLogo>
                  <a className='logoText' href="https://www.cancer.gov" target="_blank" rel="noopener noreferrer">
                    <div className='logoUpperText'>National Cancer Institute</div>
                    <div className='logoLowerText'>at the National Institutes of Health</div>
                  </a>
                </FooterLogo>
            </FooterUpperContainer>
        </FooterContainer>
    </FooterStyled>
  )
};

export default Footer;
