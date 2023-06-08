import React from 'react';
import styled from 'styled-components';
import FooterDesktop from './FooterDesktop';
import FooterTablet from './FooterTablet';
import FooterMobile from './FooterMobile';

const FooterContainer = styled.div`
 @media (min-width: 1204px) {
    .desktop {
      display: block;
    }
    .tablet {
      display: none;
    }
    .mobile {
      display: none;
    }
  }

  @media (min-width:768px) and (max-width: 1203px) {
    .desktop {
      display: none;
    }
    .tablet {
      display: block;
    }
    .mobile {
      display: none;
    }
  }

  @media (min-width: 375px) and (max-width: 767px) {
    .desktop {
      display: none;
    }
    .tablet {
      display: none;
    }
    .mobile {
      display: block;
    }
  }
`;

const Footer = () => {

  return (
    <FooterContainer>
      <div class="desktop">
        <FooterDesktop />
      </div>
      <div class="tablet">
        <FooterTablet />
      </div>
      <div class="mobile">
        <FooterMobile />
      </div>
    </FooterContainer>
  )
};

export default Footer;
