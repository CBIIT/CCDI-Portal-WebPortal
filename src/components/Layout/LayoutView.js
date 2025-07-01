import React from "react";
import { withStyles, CssBaseline } from '@material-ui/core';
import { Route, Routes, } from 'react-router-dom';
import Footer from '../ResponsiveFooter/';
import Header from '../ResponsiveHeader/';
import Home from '../../pages/landing/landingController';
import About from '../../pages/about/AboutPage/AboutController';
import DataUsagePoliciesView from '../../pages/about/DataUsagePoliciesPage/DataUsagePoliciesController';
import PublicationsView from '../../pages/about/publications/publicationsController';
import News from '../../pages/news/newsController';
import DataModelNavigator from '../../pages/dmn/DataModelNavigator';
import Error from '../../pages/error/Error';
import Search from '../../pages/globalSearch/searchView';
import Inventory from '../../pages/inventory/inventoryController';
import Cart from '../../pages/cart/cartController';
import ScrollButton from '../ScrollButton/ScrollButtonView';
import MCIResourceView from '../../pages/resource/MCIResourcePage/MCIResourceController'
import FederationResourceView from "../../pages/resource/FederationResourcePage/FederationResourceController";
import CPIResourceView from "../../pages/resource/CPIResourcePage/CPIResourceController";
import CBioPortalResourceView from "../../pages/resource/cBioPortalResourcePage/cBioPortalResourceController";
import ReleaseNotesPageView from '../../pages/releaseNotePage/releaseNotePageController';
import StudiesView from '../../pages/studies/studiesView';
import StudiesDetail from "../../pages/studyDetail/studyDetailController";
import OverlayWindow from '../OverlayWindow/OverlayWindow';
import CohortAnalyzerController  from "../../pages/CohortAnalyzer/CohortAnalyzerController";
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
          <Route path="/data-model" element={<DataModelNavigator />} />
          <Route path="/sitesearch" element={<Search />} />
          <Route path="/explore" element={<Inventory />} />
          <Route path="/fileCentricCart" element={<Cart />} />
          <Route path="/MCI" element={<MCIResourceView />} />
          <Route path="/data-federation-resource" element={<FederationResourceView/>} />
          <Route path="/data-usage-policies" element={<DataUsagePoliciesView />} />
          <Route path="/ccdi-participant-index" element={<CPIResourceView />} />
          <Route path="/cbioportal" element={<CBioPortalResourceView />} />
          <Route path="/publications" element={<PublicationsView />} />
          <Route path="/tools" element={<ToolsResourceView />} />
          <Route path="/release-notes" element={<ReleaseNotesPageView />} />
          <Route path="/cohortAnalyzer" element={<CohortAnalyzerController />} />
          <Route path="/studies" >
            <Route index={true} element={<StudiesView />}></Route>
            <Route path=":studyId" element={<StudiesDetail />} />
          </Route>
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