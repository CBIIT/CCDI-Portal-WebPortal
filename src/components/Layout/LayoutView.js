import React from "react";
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../Header/CustomizedHeader';
import NavBar from '../NavBar/CustomizedNavBar';
import Footer from '../Footer/CustomizedFooter';
import Home from '../../pages/landing/landingView3';
import About from '../../pages/about/aboutView';
// import News from '../../pages/news/newsView';
import News from '../../pages/landing/landingView1';
import Ccdi from '../../pages/ccdi/ccdiView';
import Error from '../../pages/error/Error';
import Search from '../../pages/search/searchView';
import ScrollButton from '../ScrollButton/ScrollButtonView';

const Layout = () => {
    return (
    <>
      <CssBaseline />
      <Router>
        <Header />
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/news" component={News} />
          <Route exact path="/ccdi" component={Ccdi} />
          <Route path="/sitesearch" component={Search} />
          <Route component={Error} />
        </Switch>
        <Footer />
        <ScrollButton />
      </Router>
    </>
    )
}

export default Layout;