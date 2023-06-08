import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Logo from '../Header/components/Logo'
import SearchBar from '../Header/components/SearchBar'
import NavBar from '../Header/components/Navbar';
import NavbarButton from './components/NavbarButton';
import NavbarMobile from './components/NavbarMobile';

const HeaderBanner = styled.div`
  width: 100%;
//   height: 1px;

  @media (max-width: 1023px) {
    box-shadow: -0.1px 6px 9px -6px rgba(0, 0, 0, 0.5);
    .navbarContainer {
        display: none;
    }
  }
`;

const HeaderContainer = styled.div`
    margin: 0 auto;
    padding-left: 60px;

    .searchBarArea {
        padding: 5px 60px 0 0;
    }

    .headerLowerContainer {
        display: flex;
        margin-left: auto;
    }

    @media (max-width: 1023px) {
        .searchBarArea {
            margin-left: auto;
        }
        padding-left: 16px;
    }

    @media (min-width: 1024px) {
        display: flex;

        .searchBarArea {
            margin-top: 23px;
        }
    }

    @media (min-width: 1420px) {
        width: 1420px;
    }
`;

const NavMobileContainer = styled.div`
    // display: none;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 1200;
`;

const Header = () => {
  const path = useLocation().pathname;

  return (
    <>
      <HeaderBanner role="banner">
        <HeaderContainer>
          <Logo />
          <div className='headerLowerContainer'>
            <NavbarButton />
            { path !== "/sitesearch" && <div className='searchBarArea'><SearchBar /></div> }
          </div>
        </HeaderContainer>
        <div className='navbarContainer'><NavBar /></div>
      </HeaderBanner>
      <NavMobileContainer>
        <NavbarMobile />
      </NavMobileContainer>
    </>
  );
};

export default Header;