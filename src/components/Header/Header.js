import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Logo from '../Header/components/Logo'
import SearchBar from '../Header/components/SearchBar'

const HeaderBanner = styled.div`
  width: 100%;
`;

const HeaderContainer = styled.div`
    display: flex;
    width: 1440px;
    height: 90px;
    margin: 0 auto;
    padding-left: 60px;

    .searchBarArea {
        padding: 5px 60px 0 0;
        margin-left: auto;
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
      </HeaderBanner>
    </>
  );
};

export default Header;