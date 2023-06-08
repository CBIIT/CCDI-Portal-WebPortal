import React, { useState } from 'react';
import styled from 'styled-components';
import {useLocation, useNavigate} from 'react-router-dom';
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
      padding: 5px 60px 0 0;
      margin-left: auto;
      display: flex;
    }

    .searchBar {
      margin-top: 23px;
      margin-left: auto;
      width: 224px;
      height: 32px;
      border: 1px solid #71767A;
    }

    .searchButton {
      height: 32px;
      font-family: Open Sans;
      font-weight: 700;
      font-size: 1rem;
      line-height: 33px;
      text-align: center;
      color: #FFFFFF;
      background: #007BBD;
      margin-top: 23px;
      padding: 0 13px;
      border-radius: 0px 5px 5px 0px;
    }

    .searchButton:hover {
      cursor: pointer;
      background: #004971;
    }
`;

const SearchInput = styled.input`
  margin: -1px 0 0 -1px;
  padding: 0 7px;
  border: none;
  font-family: Open Sans;
  font-weight: 400;
  font-size: 1rem;
  line-height: 42px;
  color: #1b1b1b;
  width: 224px;
  height: 32px;
  background: transparent;

  ::placeholder {
    color: #004A8B;
  }

  :focus {
    outline: 0.25rem solid #2491ff;
  }

  input[type="search"]::-webkit-search-cancel-button {
    position: relative;
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    background: url(${clearIcon}) right center no-repeat;
    background-image: url(${clearIcon}) red;
    background-size: 20px;
    cursor: pointer;
  }

  input[type="search"]:focus::-webkit-search-cancel-button {
    position: relative;
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    background: url(${clearIcon}) right center no-repeat;
    background-image: url(${clearIcon}) red;
    background-size: 20px;
    cursor: pointer;
  }
}
`;

const HeaderMobile = () => {
  const path = useLocation().pathname;
  const navigate = useNavigate();
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
                  <label>
                    <div style={{display:"none"}}>search</div>
                    <SearchInput type="search" value={localText} placeholder="" onChange={handleTextInputChange} onKeyPress={handleKeyPress} />
                  </label>
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

export default HeaderMobile;