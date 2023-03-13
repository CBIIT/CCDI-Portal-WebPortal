import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import {useLocation, useHistory} from 'react-router-dom';
import headerData from '../../bento/globalHeaderData';
import clearIcon from '../../assets/header/Clear_Icon.svg'

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
      display: flex;
    }

    .searchBar {
      display: flex;
      margin-top: 23px;
      margin-left: auto;
      width: 300px;
      height: 46px;
      border: 1px solid #71767A;
    }

    .clearIcon {
      margin-left: auto;
      margin-right: 13px;
      padding-top: 13px;
    }

    .clearIconImg {
      height: 10px;
      width: 10px;
    }

    .clearIconImg:hover {
      cursor: pointer;
    }

    .searchButton {
      height: 46px;
      font-family: Open Sans;
      font-weight: 700;
      font-size: 22px;
      line-height: 46px;
      text-align: center;
      color: #FFFFFF;
      background: #007BBD;
      margin-top: 23px;
      padding: 0 17px;
      border-radius: 0px 5px 5px 0px;
    }

    .searchButton:hover {
      cursor: pointer;
      background: #004971;
    }
`;

const SearchInput = styled.input`
  margin-left: 7px;
  border: none;
  font-family: Open Sans;
  font-weight: 400;
  font-size: 25px;
  line-height: 42px;
  color: #1b1b1b;
  width: 265px;
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

  const handleClear = () => {
    setLocalText("");
    setInputFocus();
  };

  const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
    return [ htmlElRef, setFocus ] 
  };

  const [inputRef, setInputFocus] = useFocus();

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
                  <SearchInput ref={inputRef} type="text" value={localText} placeholder="" onChange={handleTextInputChange} onKeyPress={handleKeyPress} />
                  <div className='clearIcon' onClick={handleClear}>
                    {localText ? <img className="clearIconImg" src={clearIcon} alt="clearButton"/> : null}
                  </div>
                </div>
                <div className='searchButton'  onClick={handleSearch}>Search</div>
              </div>
            )
          }
        </HeaderContainer>
      </HeaderBanner>
    </>
  );
};

export default Header;