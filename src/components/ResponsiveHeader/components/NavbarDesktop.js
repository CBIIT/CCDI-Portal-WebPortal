import React, { useEffect, useState, useRef } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { navbarSublists } from '../../../bento/navigationBarData';

const Nav = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    background: #ffffff;
    box-shadow: -0.1px 6px 9px -6px rgba(0, 0, 0, 0.5);
    z-index: 1100;
    position: relative

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
  padding-top: 17px;
  padding-left: 11px;
`;

const LiSection = styled.li`
  display: inline-block;
  position: relative;
  line-height: 50px;
  letter-spacing: 1px;
  text-align: center;
  transition:all 0.3s ease-in-out;

  a {
    color: #585C65;
    text-decoration: none;
  }

  .navTitle {
    display: block;
    color: #585C65;
    font-family: poppins;
    font-size: 17px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: normal;
    text-decoration: none;
    margin: 0 45px 0 5px;
    padding: 0 15px;
    user-select:none;
  }

  .navTitle:hover {
    cursor: pointer;
  }

  .navText {
    border-bottom: 4px solid transparent;
  }

  .navText:hover {
    cursor: pointer;
    color: #298085;
    border-bottom: 4px solid #298085;

    ::after {
      content: "";
      display: inline-block;
      width: 6px;
      height: 6px;
      border-bottom: 1px solid #298085;
      border-left: 1px solid #298085;
      margin: 0 0 4px 8px
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }
  }

  .navText::after {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-bottom: 1px solid #585C65;
    border-left: 1px solid #585C65;
    margin: 0 0 4px 8px
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  .clicked {
    color: #FFFFFF;
    background: #1A5255;
  }

  .clicked::after {
    border-top: 1px solid #FFFFFF;
    border-right: 1px solid #FFFFFF;
    border-bottom: 0;
    border-left: 0;
    margin: 0 0 0 8px
  }

  .clicked:hover {
    border-bottom: 4px solid #1A5255;
    color: #FFFFFF;

    ::after {
      content: "";
      display: inline-block;
      width: 6px;
      height: 6px;
      border-top: 1px solid #FFFFFF;
      border-right: 1px solid #FFFFFF;
      border-bottom: 0;
      border-left: 0;
      margin: 0 0 0 8px
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }
  }

  .directLink::after {
    display: none;
  }

  .directLink:hover {
    ::after {
      display: none;
    }
  }

  .navTitleClicked {
    display: block;
    color: #FFFFFF;
    font-family: poppins;
    font-size: 17px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: normal;
    text-decoration: none;
    margin: 0 45px 0 5px;
    padding: 0 15px;
    user-select:none;
    background: #1A5255;
  }
`;

const Dropdown = styled.div`
    top: 60.5px;
    left: 0;
    width: 100%;
    background: #1A5255;
    z-index: 1100;
    position: absolute;
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
      grid-column-gap: 30px;
      grid-template-columns: 32% 32% 32%;
      padding: 32px 140px 0 140px;
    }

    .dropdownItem {
      // border: 1px solid rgba(0, 0, 0, 0.8);
      padding: 0 10px 32px 10px;
      font-size: 30px;
      text-align: left;
      font-family: poppins;
      font-weight: 600;
      font-size: 20px;
      line-height: 110%;
      color: #FFFFFF;
      text-decoration: none;
  }

  .dropdownItem:hover {
    text-decoration: underline;
  }
`;


const activeStyle = {
  color: '#298085',
  borderBottom: '4px solid #298085',
};

const dropdownInvisibleStyle = {
  visibility: 'hidden',
};

const useOutsideAlerter = (ref) => {
  useEffect(() => {
      function handleClickOutside(event) {
          if (!event.target || (event.target.getAttribute("class") !== "dropdownList" && ref.current && !ref.current.contains(event.target))) {
            const toggle = document.getElementsByClassName("navText clicked");
            if (toggle[0] && event.target.getAttribute("class") !== "navText clicked" && event.target.getAttribute("class") !== "navText clicked") {
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
    if (e.target.innerText === clickedTitle || e.target.innerText === "Home" || e.target.innerText === "About" || e.target.innerText === "News") {
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
          <LiSection>
            <div className='navTitle directLink'><NavLink to="/home"><div className='navText directLink' onClick={handleMenuClick} style={path === '/' || path === '/home' ? activeStyle : null}>Home</div></NavLink></div>
          </LiSection>
          <LiSection>
            <div className={clickedTitle === 'Applications' ? 'navTitleClicked' : 'navTitle'}><div className={clickedTitle === 'Applications' ? 'navText clicked' : 'navText'} onClick={handleMenuClick}>Applications</div></div>
          </LiSection>
          <LiSection>
            <div className={clickedTitle === 'Other Resources' ? 'navTitleClicked' : 'navTitle'}><div className={clickedTitle === 'Other Resources' ? 'navText clicked' : 'navText'} onClick={handleMenuClick}>Other Resources</div></div>
          </LiSection>
          <LiSection>
            <div className='navTitle directLink'><NavLink to="/news"><div className='navText directLink' style={path === '/news' ? activeStyle : null} onClick={handleMenuClick}>News</div></NavLink></div>
          </LiSection>
          <LiSection>
            <div className='navTitle directLink'><NavLink to="/about"><div className='navText directLink' style={path === '/about' ? activeStyle : null} onClick={handleMenuClick}>About</div></NavLink></div>
          </LiSection>
        </UlContainer>
      </NavContainer>
      <Dropdown ref={dropdownSelection} style={clickedTitle === '' ? dropdownInvisibleStyle : null}>
        <DropdownContainer>
            <div className="dropdownList">
              {
                clickedTitle !== "" ? navbarSublists[clickedTitle].map((dropItem, idx) => {
                  const dropkey = `drop_${idx}`;
                  return (
                    dropItem.link && <a href={dropItem.link} className="dropdownItem" key={dropkey} onClick={() => setClickedTitle("")}>{dropItem.name}</a>
                  )
                })
                :null
              }
            </div>
        </DropdownContainer>
      </Dropdown>
    </Nav>
    </>
  );
};

export default NavBar;