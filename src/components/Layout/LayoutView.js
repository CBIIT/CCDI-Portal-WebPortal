import React from "react";
import { withStyles, CssBaseline } from '@material-ui/core';
import { Route, Routes, } from 'react-router-dom';
import Footer from '../ResponsiveFooter/';
import Header from '../ResponsiveHeader/';
import Home from '../../pages/landing/landingController';
import About from '../../pages/about/aboutView';
import DataUsagePoliciesView from '../../pages/about/dataUsagePoliciesView';
// import PublicationsView from '../../pages/about/publications/publicationsView';
import News from '../../pages/news/newsView';
import Error from '../../pages/error/Error';
import Search from '../../pages/search/searchView';
import Inventory from '../../pages/inventory/inventoryController';
import Cart from '../../pages/cart/cartController';
import ScrollButton from '../ScrollButton/ScrollButtonView';
import MCIResourceView from '../../pages/resource/MCIResourceView'
import FederationResourceView from "../../pages/resource/FederationResourceView";
import CPIResourceView from "../../pages/resource/CPIResourcePage/CPIResourceView";
import OverlayWindow from '../OverlayWindow/OverlayWindow';
// import NewsDetail from '../../pages/news/newsDetailView';

const Layout = () => {
    return (
    <>
      <CssBaseline />
        <Header />
        <OverlayWindow />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/sitesearch" element={<Search />} />
          <Route path="/explore" element={<Inventory />} />
          <Route path="/fileCentricCart" element={<Cart />} />
          <Route path="/MCI" element={<MCIResourceView />} />
          <Route path="/data-federation-resource" element={<FederationResourceView/>} />
          <Route path="/data-usage-policies" element={<DataUsagePoliciesView />} />
          <Route path="/ccdi-participant-index" element={<CPIResourceView />} />
          {/* <Route path="/publications" element={<PublicationsView />} /> */}
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