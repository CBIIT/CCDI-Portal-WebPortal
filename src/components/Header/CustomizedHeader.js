import React, { useState } from 'react';
import styled from 'styled-components';
import {useLocation, NavLink, useHistory} from 'react-router-dom';
import headerData from '../../bento/globalHeaderData';

const HeaderBanner = styled.div`
  width: 100%;
`;

const HeaderContainer = styled.div`
    display: flex;
    width: 1440px;
    height: 90px;
    margin: 0 auto;
    padding-left: 60px;
    img {
      width: 455px;
      height: 56px;
    }

    .logoContainer {
      margin-top: 20px;
    }

    .searchBarContainer {
      padding-right: 60px;
      margin-left: auto;
    }

    .searchBar {
      display: flex;
      margin-top: 30px;
      margin-left: auto;
      width: 300px;
      height: 36px;
      border: 1px solid #004A8B;
      border-radius: 18px;
    }

    .searchIcon {
      margin-left: auto;
      margin-right: 13px;
      height: 20px;
      width: 20px;
      padding-top: 8px;
    }

    .searchIconImg {
      height: 18px;
      width: 18px;
    }

    .searchIconImg:hover {
      cursor: pointer;
    }
`;

const SearchInput = styled.input`
  margin-left: 20px;
  border: none;
  font-family: Inter;
  font-weight: 400;
  font-size: 10px;
  line-height: 36px;
  color: #004A8B;
  width: 225px;
  background: transparent;

  ::placeholder {
    color: #004A8B;
  }

  :focus {
    outline: none;
  }
`;

const Header = () => {
  const path = useLocation().pathname;
  const navigate = useHistory().push;
  const [localText, setLocalText] = useState("");

  const handleTextInputChange = (event) => {
    const text = event.target.value;
    setLocalText(text);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/sitesearch?keyword=${localText.trim()}`);
      setLocalText("");
    }
  };

  const handleSearch = () => {
    navigate(`/sitesearch?keyword=${localText.trim()}`);
    setLocalText("");
  };

  return (
    <>
      <HeaderBanner role="banner">
        <HeaderContainer>
          <a className='logoContainer' href={headerData.globalHeaderLogoLink}>
            <img src={headerData.globalHeaderLogo} alt={headerData.globalHeaderLogoAltText} />
          </a>
          {
            path !== "/sitesearch"
            && (
              <div className='searchBarContainer'>
                <div className='searchBar'>
                  <SearchInput type="text" value={localText} placeholder="SEARCH" onChange={handleTextInputChange} onKeyPress={handleKeyPress} />
                  <div className='searchIcon' onClick={handleSearch}>
                    <img className="searchIconImg" src={headerData.globalHeaderSearchIcon} alt={headerData.globalHeaderSearchIconAltText}/>
                  </div>
                </div>
              </div>
            )
          }
        </HeaderContainer>
      </HeaderBanner>
    </>
  );
};

export default Header;