import React from 'react';
import styled from 'styled-components';
import menuClearIcon from '../../../assets/header/Menu_Cancel_Icon.svg'
import rightArrowIcon from '../../../assets/header/Right_Arrow.svg'

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
    }

    .navMobileItem {
        padding: 8px 24px 8px 16px;
        font-family: Open Sans;
        font-weight: 400;
        font-size: 16px;
        line-height: 16px;
        border-top: 1px solid #F0F0F0;
        border-bottom: 1px solid #F0F0F0;
    }

    .clickable {
        background: url(${rightArrowIcon}) 90% no-repeat;
    }
`;

const NavbarMobile = () => {
    return (
      <MenuArea>
        <div className='menuContainer'>
            <div className='closeIcon'><img src={menuClearIcon} alt="menuClearButton" /></div>
            <div className='navMobileContainer'>
                <div className='navMobileItem'>Home</div>
                <div className='navMobileItem clickable'>Applications</div>
                <div className='navMobileItem clickable'>Other Resources</div>
                <div className='navMobileItem'>News</div>
                <div className='navMobileItem'>About</div>
            </div>
        </div>
        <div className='greyContainer' />
      </MenuArea>
    );
  };
  
  export default NavbarMobile;