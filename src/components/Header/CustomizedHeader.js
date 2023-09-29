import React, { useState } from 'react';
import styled from 'styled-components';
import {useLocation, useNavigate} from 'react-router-dom';
import headerData from '../../bento/globalHeaderData';
import clearIcon from '../../assets/header/Clear_Icon.svg'

const HeaderBanner = styled.div`
  width: 100%;
`;

const HeaderBannerContainer =styled.div`
    width: 100%;
    background: #bb0e3d;
    padding: 15px;

    .nci-shutdown-banner__body {
      max-width: 1024px;
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

const Header = () => {
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
        <HeaderBannerContainer aria-label="Government Funding Lapse">
          <div class="nci-shutdown-banner__body">
            <h2>Government Funding Lapse</h2>
            <p>Because of a lapse in government funding, the information on this website may not be up to date, transactions submitted via the website may not be processed, and the agency may not be able to respond to inquiries until appropriations are enacted. The NIH Clinical Center (the research hospital of NIH) is open. For more details about its operating status, please visit  <a href="https://cc.nih.gov/">cc.nih.gov</a>. Updates regarding government operating status and resumption of normal operations can be found at <a href="https://opm.gov/">OPM.gov</a>.</p>
          </div>
        </HeaderBannerContainer>
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

export default Header;