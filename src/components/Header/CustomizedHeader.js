import React from 'react';
import styled from 'styled-components';
import headerData from '../../bento/globalHeaderData';

const LogoBanner = styled.div`
  margin-top: 24px;
  width: 100%;
`;

const LogoContainer = styled.div`
    width: 1440px;
    margin: 0 auto;
    padding-left: 61px;
    img {
      width: 455px;
      height: 56px;
    }
`;

const Header = () => {
  return (
    <>
      <LogoBanner role="banner">
        <LogoContainer>
          <a href={headerData.globalHeaderLogoLink}>
            <img src={headerData.globalHeaderLogo} alt={headerData.globalHeaderLogoAltText} />
          </a>
        </LogoContainer>
      </LogoBanner>
    </>
  );
};

export default Header;