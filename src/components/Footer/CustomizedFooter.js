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
  height: 100px;
  background: pink;
  display: flex;


`;

const Footer = () => {
  return (
    <FooterStyled role="contentinfo">
        <FooterContainer>
            <FooterUpperContainer>
                <div className='footerLogo'>
                  <a href="https://www.cancer.gov" target="_blank" rel="noopener noreferrer">
                    <h1>
                      National Cancer Institute
                      <span>at the National Institutes of Health</span>
                    </h1>
                  </a>
                </div>
            </FooterUpperContainer>
        </FooterContainer>
    </FooterStyled>
  )
};

export default Footer;
