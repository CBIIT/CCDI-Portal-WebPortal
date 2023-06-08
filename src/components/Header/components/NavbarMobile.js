import React from 'react';
import styled from 'styled-components';

const MenuArea = styled.div`
    height: 100%;
    background: pink;
    width: 385px;
`;

const NavbarMobile = () => {
    return (
      <MenuArea>
        <div className='menuMobile'>Menu</div>
      </MenuArea>
    );
  };
  
  export default NavbarMobile;