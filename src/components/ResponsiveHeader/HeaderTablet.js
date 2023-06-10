import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Logo from '../ResponsiveHeader/components/LogoTablet';
import SearchBar from '../ResponsiveHeader/components/SearchBarTablet';
import menuClearIcon from '../../assets/header/Menu_Cancel_Icon.svg';
import rightArrowIcon from '../../assets/header/Right_Arrow.svg';
import leftArrowIcon from '../../assets/header/Left_Arrow.svg';
import { navMobileList, navbarSublists } from '../../bento/navigationBarData'

const HeaderBanner = styled.div`
  width: 100%;
  box-shadow: -0.1px 6px 9px -6px rgba(0, 0, 0, 0.5);
`;

const HeaderContainer = styled.div`
    margin: 0 auto;
    padding-left: 32px;

    .searchBarArea {
        padding: 5px 32px 0 0;
        margin-left: auto;
    }

    .headerLowerContainer {
        display: flex;
        margin: 10px 0;
    }

    .menuButton {
        width: 89px;
        height: 45px;
        background: #14315C;
        border-radius: 5px;
        font-family: 'Open Sans';
        font-weight: 700;
        font-size: 20px;
        line-height: 45px;
        color: #FFFFFF;
        text-align: center;
    }

    .menuButton:hover {
        cursor: pointer;
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

const MenuArea = styled.div`
    height: 100%;
    width: 100%;
    display: flex;

    .menuContainer {
        background: #ffffff;
        width: 385px;
        height: 100%;
        padding: 21px 16px;
    }

    .greyContainer {
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.2);
    }

    .closeIcon {
        height: 14px;
        margin-bottom: 29px;
    }

    .closeIconImg {
        float: right;
    }

    .closeIconImg:hover {
        cursor: pointer;
    }

    .backButton {
        font-family: Open Sans;
        font-weight: 600;
        font-size: 16px;
        line-height: 16px;
        color: #007BBD;
        padding-left: 16px;
        background: url(${leftArrowIcon}) left no-repeat;
    }

    .backButton:hover {
        cursor: pointer;
    }

    .navMobileContainer {
        padding: 24px 0 0 0;

        a {
            text-decoration: none;
            color: #3D4551;
        }
    }

    .navMobileItem {
        width: 353px;
        padding: 8px 24px 8px 16px;
        font-family: Open Sans;
        font-weight: 400;
        font-size: 16px;
        line-height: 16px;
        border-top: 1px solid #F0F0F0;
        border-bottom: 1px solid #F0F0F0;
        color: #3D4551;
    }

    .navMobileItem:hover {
        background-color: #f9f9f7;
    }

    .clickable {
        background: url(${rightArrowIcon}) 90% no-repeat;
    }

    .clickable {
        cursor: pointer;
    }
`;

const Header = () => {
  const path = useLocation().pathname;
  const [navMobileDisplay, setNavMobileDisplay] = useState('none');
  const [navbarMobileList, setNavbarMobileList] = useState(navMobileList);
  
  const clickNavItem = (e) => {
    const clickTitle = e.target.innerText;
    setNavbarMobileList(navbarSublists[clickTitle]);
  }

  return (
    <>
      <HeaderBanner role="banner">
        <HeaderContainer>
          <Logo />
          <div className='headerLowerContainer'>
            <div className='menuButton' onClick={() => setNavMobileDisplay('block')}>Menu</div>
            { path !== "/sitesearch" && <div className='searchBarArea'><SearchBar /></div> }
          </div>
        </HeaderContainer>
      </HeaderBanner>
      <NavMobileContainer style={{display: navMobileDisplay}}>
        <MenuArea>
            <div className='menuContainer'>
                <div className='closeIcon' onClick={() => setNavMobileDisplay('none')}><img className='closeIconImg' src={menuClearIcon} alt="menuClearButton" /></div>
                { navbarMobileList !== navMobileList && <div className='backButton' onClick={() => setNavbarMobileList(navMobileList)}>Main Menu</div>}
                <div className='navMobileContainer'>
                    {
                        navbarMobileList.map((navMobileItem, idx) => {
                            const mobilekey = `mobile_${idx}`;
                            return (
                                <>
                                    {navMobileItem.className === 'navMobileItem' && <NavLink to={navMobileItem.link} key={mobilekey} onClick={() => setNavMobileDisplay('none')}><div className='navMobileItem'>{navMobileItem.name}</div></NavLink>}
                                    {navMobileItem.className === 'navMobileItem clickable' && <div key={mobilekey} className='navMobileItem clickable' onClick={clickNavItem}>{navMobileItem.name}</div>}
                                    {navMobileItem.className === 'navMobileSubItem' && <a href={navMobileItem.link} key={mobilekey}><div className='navMobileItem'>{navMobileItem.name}</div></a>}
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <div className='greyContainer' onClick={() => setNavMobileDisplay('none')}/>
        </MenuArea>
      </NavMobileContainer>
    </>
  );
};

export default Header;