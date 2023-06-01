import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Logo from '../Header/components/Logo'
import SearchBar from '../Header/components/SearchBar'
import NavBar from '../Header/components/Navbar';

const HeaderBanner = styled.div`
  width: 100%;
  box-shadow: 10px 5px 5px red;

//   @media (max-width: 768px) {
//     .navBarArea {
//         display: none;
//     }
//   }
`;

const HeaderContainer = styled.div`
    margin: 0 auto;
    padding-left: 60px;

    .searchBarArea {
        padding: 5px 60px 0 0;
        margin-left: auto;
    }

    @media (min-width: 768px) {
        display: flex;

        .searchBarArea {
            margin-top: 23px;
        }
    }

    @media (min-width: 1420px) {
        width: 1420px;
    }
`;

const Header = () => {
  const path = useLocation().pathname;

  return (
    <>
      <HeaderBanner role="banner">
        <HeaderContainer>
          <Logo />
          { path !== "/sitesearch" && <div className='searchBarArea'><SearchBar /></div> }
        </HeaderContainer>
        <div className='navBarArea'><NavBar /></div>
      </HeaderBanner>
    </>
  );
};

export default Header;