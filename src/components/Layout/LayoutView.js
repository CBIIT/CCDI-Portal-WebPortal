import React from "react";
import { withStyles, CssBaseline } from '@material-ui/core';
import { Route, Routes, } from 'react-router-dom';
import Header from '../Header/CustomizedHeader';
import NavBar from '../NavBar/CustomizedNavBar';
import Footer from '../Footer/CustomizedFooter';
import Home from '../../pages/landing/landingView';
import About from '../../pages/about/aboutView';
import News from '../../pages/news/newsView';
import Error from '../../pages/error/Error';
import Search from '../../pages/search/searchView';
import ScrollButton from '../ScrollButton/ScrollButtonView';
// import NewsDetail from '../../pages/news/newsDetailView';

const Layout = () => {
    return (
    <>
      <CssBaseline />
        <Header />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/sitesearch" element={<Search />} />
          {/* <Route path="/newsdetail/:id" element={<NewsDetail />} /> */}
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
        <ScrollButton />
    </>
    )
}

const styles = (theme) => ({
  '@global': {
    body:{
      backgroundColor:"#ffffff"
    }
  },
});

export default withStyles(styles)(Layout);