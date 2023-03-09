import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    background: #fafafa;
    box-shadow: -0.1px 6px 9px -6px #1B1C1C57;
    z-index: 1100;
`;

const NavContainer = styled.div`
    margin: 0 auto;
    width: 1440px;
    text-align: left;
    position: relative;
`;

const UlContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding-top: 7px;
`;

const LiSection = styled.li`
  display: inline-block;
  position: relative;
  line-height: 50px;
  letter-spacing: 1px;
  text-align: center;
  transition:all 0.3s ease-in-out;

  a {
    text-decoration: none;
  }

  .navTitle {
    display: block;
    color: #3D4551;
    font-family: poppins;
    font-size: 17px;
    font-weight: 600;
    line-height: 50px;
    letter-spacing: 1px;
    text-decoration: none;
    margin: 0 60px 0 20px;
    border-bottom: 4px solid transparent;
  }

  .navTitle:hover {
    cursor: pointer;
    border-bottom: 4px solid #298085;
  }

  .navTitle::after {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-bottom: 1px solid #3D4551;
    border-left: 1px solid #3D4551;
    margin: 0 0 4px 8px
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
`;

const activeStyle = {
  color: '#252222',
  // backgroundColor: '#E8EDF5',
  borderBottom: '4px solid #298085',
};


const NavBar = () => {
  const path = useLocation().pathname;
  return (
    <Nav>
      <NavContainer>
        <UlContainer>
          <LiSection>
            <NavLink to="/about"><div className='navTitle' style={path === '/about' ? activeStyle : null}>About</div></NavLink>
          </LiSection>
          <LiSection>
            <NavLink to="/"><div className='navTitle' style={path === '/' ? activeStyle : null}>Applications</div></NavLink>
          </LiSection>
          <LiSection>
            <NavLink to="/"><div className='navTitle'style={path === '/' ? activeStyle : null}>Other Applications</div></NavLink>
          </LiSection>
          <LiSection>
            <NavLink to="/news"><div className='navTitle' style={path === '/news' ? activeStyle : null}>News</div></NavLink>
          </LiSection>
        </UlContainer>
      </NavContainer>
    </Nav>
  );
};

export default NavBar;
