import React from 'react';
import { NavBar } from 'bento-components';
import {
    navBarData, navBarCartData, navBarstyling
  } from '../../bento/navigationBarData';

const BentoNavBar = () => {
  return (
    <>
      <NavBar
        navBarData={navBarData}
        navBarCartData={navBarCartData}
        navBarstyling={navBarstyling}
      />
    </>
  )
};

export default BentoNavBar;
