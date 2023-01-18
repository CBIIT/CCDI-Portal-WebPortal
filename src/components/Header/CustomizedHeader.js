import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/header/Portal_Logo.png';

const LogoBanner = styled.div`
  margin-top: 24px;
  width: 100%;
`;

const LogoContainer = styled.div`
    width: 1440px;
    margin: 0 auto;
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
            <a href="/"><img src={logo} alt="ccdc logo" /></a>
        </LogoContainer>
      </LogoBanner>
    </>
  );
};

export default Header;