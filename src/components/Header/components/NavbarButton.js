import React from 'react';
import styled from 'styled-components';

const ButtonArea = styled.div`
    display: flex;

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

    @media (min-width: 1024px) {
        display: none;
    }
`;

const NavbarButton = () => {
    return (
      <ButtonArea>
        <div className='menuButton'>Menu</div>
      </ButtonArea>
    );
  };
  
  export default NavbarButton;