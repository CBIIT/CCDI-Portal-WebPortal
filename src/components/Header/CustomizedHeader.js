import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/header/Portal_Logo.png';
import './CustomizedHeader.css';

const LogoBanner = styled.div`
  margin-top: 24px;
  @media (min-width: 1200px) {
    width: 100%;
  }
`;

const LogoContainer = styled.div`
  @media (min-width: 1200px) {
    width: 1200px;
    margin: 0 auto;
    img {
      width: 473px;
    }
  }

  @media (max-width: 1200px) {
    img {
        width: 473px;
      }
  }
`;

const Header = () => {
  return (
    <>
    <div className="sticky-nav">
      <LogoBanner role="banner">
        <LogoContainer>
            <a href="/"><img src={logo} alt="ccdc logo" /></a>
        </LogoContainer>
      </LogoBanner>
    </div>
    </>
  );
};

export default Header;