import React, { useEffect, useState, useRef } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    background: #fafafa;
    box-shadow: -0.1px 6px 9px -6px #1B1C1C57;
    z-index: 1100;

    .dropdownContainer {
      // outline: none;
      // visibility: hidden;
      // opacity: 0;
      margin: 0 auto;
      position: relative;
      width: 1440px;
    }
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
    margin: 0 45px 0 5px;
    padding: 0 15px;
    border-bottom: 4px solid transparent;
  }

  .clicked {
    color: #FFFFFF;
    background: #1A5255;
    border-bottom: 4px solid #1A5255,
  }

  .navTitle:hover {
    cursor: pointer;
    border-bottom: 4px solid #298085;
  }

  .clicked:hover {
    border-bottom: 4px solid transparent;
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

  .clicked::after {
    border-top: 1px solid #FFFFFF;
    border-right: 1px solid #FFFFFF;
    margin: 0 0 0 8px
  }
`;

const Dropdown = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    background: #1A5255;
    z-index: 1100;
    position: absolute;
    top: 151px;
    // visibility: hidden;
    // outline: none;
    // opacity: 0;
`;

const DropdownContainer = styled.div`
    margin: 0 auto;
    width: 1440px;
    text-align: left;
    position: relative;

    .dropdownList {
      background: #1A5255;
      display: grid;
      grid-column-gap: 50px;
      grid-template-columns: auto auto auto;
      padding: 10px;
    }

    .dropdownItem {
      border: 1px solid rgba(0, 0, 0, 0.8);
      padding: 20px;
      font-size: 30px;
      text-align: center;
  }
`;


const activeStyle = {
  color: '#252222',
  // backgroundColor: '#E8EDF5',
  borderBottom: '4px solid #298085',
};

const dropdownInvisibleStyle = {
  visibility: 'hidden',
};

const useOutsideAlerter = (ref) => {
  useEffect(() => {
      function handleClickOutside(event) {
          if (!event.target || event.target.getAttribute("class") !== "dropdownList" && ref.current && !ref.current.contains(event.target)) {
            const toggle = document.getElementsByClassName("navTitle clicked");
            if (toggle[0]) {
              toggle[0].click();
            }
          }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [ref]);
};


const NavBar = () => {
  const path = useLocation().pathname;
  const [clickedTitle, setClickedTitle] = useState("");
  const dropdownSelection = useRef(null);
  useOutsideAlerter(dropdownSelection);

  const handleMenuClick = (e) => {
    if (e.target.innerText === clickedTitle || e.target.innerText === "About" || e.target.innerText === "News") {
      setClickedTitle("");
    } else {
      setClickedTitle(e.target.innerText);
    }
  };

  useEffect(() => {
    setClickedTitle("");
  }, []);

  return (
    <>
    <Nav>
      <NavContainer>
        <UlContainer>
          <LiSection onClick={handleMenuClick}>
            <NavLink to="/about"><div className='navTitle' style={path === '/about' ? activeStyle : null}>About</div></NavLink>
          </LiSection>
          <LiSection onClick={handleMenuClick}>
            <div className={clickedTitle === 'Applications' ? 'navTitle clicked' : 'navTitle'}>Applications</div>
          </LiSection>
          <LiSection onClick={handleMenuClick}>
            <div className={clickedTitle === 'Other Applications' ? 'navTitle clicked' : 'navTitle'}>Other Applications</div>
          </LiSection>
          <LiSection onClick={handleMenuClick}>
            <NavLink to="/news"><div className='navTitle' style={path === '/news' ? activeStyle : null}>News</div></NavLink>
          </LiSection>
        </UlContainer>
      </NavContainer>
    </Nav>
    <Dropdown ref={dropdownSelection} style={clickedTitle === '' ? dropdownInvisibleStyle : null}>
      <DropdownContainer>
          <div className='dropdownList'>
            <div class="dropdownItem">1</div>
            <div class="dropdownItem">2</div>
            <div class="dropdownItem">3</div>
            <div class="dropdownItem">4</div>
            <div class="dropdownItem">5</div>
          </div>
      </DropdownContainer>
    </Dropdown>
    </>
  );
};

export default NavBar;
