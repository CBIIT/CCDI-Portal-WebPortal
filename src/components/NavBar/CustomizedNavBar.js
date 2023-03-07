import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 55px;
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
  line-height: 40px;
  letter-spacing: 1px;
  text-align: center;
  color: #252222;
  font-size: 17px;
  font-weight: 600;
  font-family: Poppins;
  text-decoration: none;
  cursor: pointer;
  transition:all 0.3s ease-in-out;

  a{
    display: block;
    color: #252222;
    text-decoration: none;
    padding: 0 30px;
  }

  &:hover {
    color: #252222;
  }

  .menuLabel {
    display: block;
    color: #252222;
    text-decoration: none;
    padding: 0 30px;
  }

  &:hover .dropdown-block {
    display: block;
  }
`;

const activeStyle = {
  color: '#252222',
  backgroundColor: '#E8EDF5',
};


const NavBar = () => {
  const path = useLocation().pathname;
  return (
    <Nav>
      <NavContainer>
        <UlContainer>
          <LiSection style={path === '/about' ? activeStyle : null}><NavLink to="/about">ABOUT</NavLink></LiSection>
          <LiSection style={path === '/' ? activeStyle : null}><NavLink to="/">APPLICATIONS</NavLink></LiSection>
          <LiSection style={path === '/' ? activeStyle : null}><NavLink to="/">CLOUD RESOURCES</NavLink></LiSection>
          <LiSection style={path === '/news' ? activeStyle : null}><NavLink to="/news">NEWS</NavLink></LiSection>
        </UlContainer>
      </NavContainer>
    </Nav>
  );
};

export default NavBar;
