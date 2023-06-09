import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import menuClearIcon from '../../../assets/header/Menu_Cancel_Icon.svg';
import rightArrowIcon from '../../../assets/header/Right_Arrow.svg';
import { navMobileList, navbarSublists } from '../../../bento/navigationBarData'

const MenuArea = styled.div`
    height: 100%;
    width: 100%;
    display: flex;

    .menuContainer {
        background: #ffffff;
        width: 385px;
        height: 100%;
    }

    .greyContainer {
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.2);
    }

    .closeIcon {
        margin: 21px 21px 0 0;
        float: right;
    }

    .navMobileContainer {
        margin: 88px 16px 0 16px;

        a {
            text-decoration: none;
            color: #3D4551;
        }
    }

    .navMobileItem {
        padding: 8px 24px 8px 16px;
        font-family: Open Sans;
        font-weight: 400;
        font-size: 16px;
        line-height: 16px;
        border-top: 1px solid #F0F0F0;
        border-bottom: 1px solid #F0F0F0;
        color: #3D4551;
    }

    .clickable {
        background: url(${rightArrowIcon}) 90% no-repeat;
    }
`;

const NavbarMobile = () => {
    const [navbarMobileList, setNavbarMobileList] = useState(navMobileList);

    const clickNavItem = (e) => {
        console.log(e.target.innerText);
        const clickTitle = e.target.innerText;
        setNavbarMobileList(navbarSublists[clickTitle]);
    }

    return (
      <MenuArea>
        <div className='menuContainer'>
            <div className='closeIcon'><img src={menuClearIcon} alt="menuClearButton" /></div>
            <div className='navMobileContainer'>
                {
                    navbarMobileList.map((navMobileItem, idx) => {
                        const mobilekey = `mobile_${idx}`;
                        return (
                            <>
                                {navMobileItem.className === 'navMobileItem' && <NavLink to={navMobileItem.link} key={mobilekey}><div className='navMobileItem'>{navMobileItem.name}</div></NavLink>}
                                {navMobileItem.className === 'navMobileItem clickable' && <div key={mobilekey} className='navMobileItem clickable' onClick={clickNavItem}>{navMobileItem.name}</div>}
                                {navMobileItem.className === 'navMobileSubItem' && <a href={navMobileItem.link} key={mobilekey}><div className='navMobileItem'>{navMobileItem.name}</div></a>}
                            </>
                        )
                    })
                }
            </div>
        </div>
        <div className='greyContainer' />
      </MenuArea>
    );
  };
  
  export default NavbarMobile;