import React from "react";
import { CssBaseline } from '@material-ui/core';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Header from '../Header/CustomizedHeader';
import NavBar from '../NavBar/NavBarView';
import Footer from '../Footer/FooterView';
import Home from '../../pages/landing/landingView';
import About from '../../pages/about/aboutView';
import News from '../../pages/news/newsView';
import Ccdi from '../../pages/ccdi/ccdiView';
import Moonshot from '../../pages/moonshot/moonshotView';

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

const Layout = () => {
    return (
    <>
      <CssBaseline />
      <HashRouter>
        <>
          <Header />
          <NavBar />
          <div>
            <Route component={ScrollToTop} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/news" component={News} />
              <Route exact path="/ccdi" component={Ccdi} />
              <Route exact path="/moonshot" component={Moonshot} />
            </Switch>
          </div>
          <Footer />
        </>
      </HashRouter>
    </>
    )
}

export default Layout;