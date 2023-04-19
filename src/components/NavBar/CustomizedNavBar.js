import React, { useEffect, useState, useRef } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    background: #fafafa;
    box-shadow: -0.1px 6px 9px -6px rgba(0, 0, 0, 0.5);;
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
    letter-spacing: normal;
    text-decoration: none;
    margin: 0 45px 0 5px;
    padding: 0 15px;
    border-bottom: 4px solid transparent;
    user-select:none;
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
    border-bottom: 0;
    border-left: 0;
    margin: 0 0 0 8px
  }

  .directLink::after {
    display: none;
  }
`;

const Dropdown = styled.div`
    top: 150px;
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
          if (!event.target || (event.target.getAttribute("class") !== "dropdownList" && ref.current && !ref.current.contains(event.target))) {
            const toggle = document.getElementsByClassName("navTitle clicked");
            if (toggle[0] && event.target.getAttribute("class") !== "navTitle clicked") {
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
  const navbarLists = {
    Applications: [
      {id:"ccdc", name:'Childhood Cancer Data Catalog'},
      {id:"civic", name:'Clinical Interpretation of Variants in Cancer'},
      {id:'mci', name: 'Molecular Characterization Initiative for Childhood Cancers'},
      {id:'mtp', name: 'Molecular Targets Platform'},
      {id:'nccr', name:'National Childhood Cancer Registry Explorer'}],
    "Other Resources": [
      {id:"cgc", name:'Cancer Genomics Cloud'}, 
      {id:'dbgap', name:'Database of Genotypes and Phenotypes'}],
  };

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
          <LiSection onClick={handleMenuClick}>
            <NavLink to="/home"><div className='navTitle directLink' style={path === '/' || path === '/home' ? activeStyle : null}>Home</div></NavLink>
          </LiSection>
          <LiSection onClick={handleMenuClick}>
            <div className={clickedTitle === 'Applications' ? 'navTitle clicked' : 'navTitle'}>Applications</div>
          </LiSection>
          <LiSection onClick={handleMenuClick}>
            <div className={clickedTitle === 'Other Resources' ? 'navTitle clicked' : 'navTitle'}>Other Resources</div>
          </LiSection>
          <LiSection onClick={handleMenuClick}>
            <NavLink to="/news"><div className='navTitle directLink' style={path === '/news' ? activeStyle : null}>News</div></NavLink>
          </LiSection>
          <LiSection onClick={handleMenuClick}>
            <NavLink to="/about"><div className='navTitle directLink' style={path === '/about' ? activeStyle : null}>About</div></NavLink>
          </LiSection>
        </UlContainer>
      </NavContainer>
    </Nav>
    <Dropdown ref={dropdownSelection} style={clickedTitle === '' ? dropdownInvisibleStyle : null}>
      <DropdownContainer>
          <div className="dropdownList">
            {
              clickedTitle !== "" ? navbarLists[clickedTitle].map((dropItem, idx) => {
                const dropkey = `drop_${idx}`;
                return (
                  <a href={'/#' + dropItem.id} className="dropdownItem" key={dropkey} onClick={() => setClickedTitle("")}>{dropItem.name}</a>
                )
              })
              :null
            }
          </div>
      </DropdownContainer>
    </Dropdown>
    </>
  );
};

export default NavBar;
