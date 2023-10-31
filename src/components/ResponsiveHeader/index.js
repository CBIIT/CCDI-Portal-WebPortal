import React from 'react';
import styled from 'styled-components';
import HeaderDesktop from './HeaderDesktop';
import HeaderTablet from './HeaderTablet';
import HeaderMobile from './HeaderMobile';

const HeaderBanner = styled.div`
  width: 100%;
`;

const HeaderBannerContainer =styled.div`
    width: 100%;
    background: #bb0e3d;
    padding: 15px;

    .nci-shutdown-banner__body {
      max-width: 1334px;
      margin: 0 auto;
      color: white;
      font-size: 17px;
      line-height: 1.6;
      position: relative;
      padding: 0 15px 0 40px;
    }
  
    .nci-shutdown-banner__body:before {
      content: '';
      display: block;
      position: absolute;
      height: 26px;
      width: 26px;
      top: 0;
      left: 0;
      background: none;
      background-color: #fff;
      -webkit-mask: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMSAxNWgtMnYtMmgydjJ6bTAtNGgtMlY3aDJ2NnoiLz48L3N2Zz4=) no-repeat center/contain;
      mask: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMSAxNWgtMnYtMmgydjJ6bTAtNGgtMlY3aDJ2NnoiLz48L3N2Zz4=) no-repeat center/contain;
    }

    .nci-shutdown-banner__body h2 {
      font-size: 18px;
      margin: 0;
    }
    .nci-shutdown-banner__body a, 
    .nci-shutdown-banner__body a:visited {
      color: white;
    }
    .nci-shutdown-banner__body p {
      margin: 0;
    }
`;

const HeaderContainer = styled.div`
 @media (min-width: 1024px) {
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

  @media (min-width:768px) and (max-width: 1023px) {
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

  @media (max-width: 375px) {
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

const Header = () => {
  return (
    <HeaderBanner role="banner">
      <HeaderBannerContainer aria-label="Government Funding Lapse">
        <div class="nci-shutdown-banner__body">
          <h2>Government Funding Lapse</h2>
          <p>Because of a lapse in government funding, the information on this website may not be up to date, transactions submitted via the website may not be processed, and the agency may not be able to respond to inquiries until appropriations are enacted. The NIH Clinical Center (the research hospital of NIH) is open. For more details about its operating status, please visit  <a href="https://cc.nih.gov/">cc.nih.gov</a>. Updates regarding government operating status and resumption of normal operations can be found at <a href="https://opm.gov/">OPM.gov</a>.</p>
        </div>
      </HeaderBannerContainer>
      <HeaderContainer>
        <div className="desktop">
          <HeaderDesktop />
        </div>
        <div className="tablet">
          <HeaderTablet />
        </div>
        <div className="mobile">
          <HeaderMobile />
        </div>
      </HeaderContainer>
    </HeaderBanner>
  )
};

export default Header;
