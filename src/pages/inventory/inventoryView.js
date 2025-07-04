import React from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import styles from './inventoryStyle';
import BentoFacetFilter from './sideBar/BentoFacetFilter';
import WidgetView from './widget/WidgetView';
import StatsView from '../../components/Stats/StatsView';
import TabsView from './tabs/TabsView';
import QueryBarView from './filterQueryBar/QueryBarView';
import UseGuideButton from './sideBar/UserGuideButton.js';
import { CircularProgress } from '@material-ui/core';

const Inventory = ({
  classes,
  dashData,
  activeFilters,
}) => {
  if (!dashData) {
    return (<div style={{"height": "1200px","paddingTop": "10px"}}><div style={{"margin": "auto","display": "flex","maxWidth": "1800px"}}><CircularProgress /></div></div>);
  }

  return (
    <div className={classes.dashboardContainer}>
      <StatsView data={dashData} />
      <div className={classes.contentBox}>
        <div className={classes.content}>
          <div className={classes.sideBarContainer}>
            <div className={classes.sideBar}>
              <UseGuideButton />
              <label for="local_find_input" style={{ display: 'none' }}>Participant ID Text Search box</label>
              <BentoFacetFilter
                searchData={dashData}
                activeFilters={activeFilters}
              />
            </div>
          </div>
          <div className={classes.rightContent}>
            <div className={classes.widgetsContainer}>
              <QueryBarView data={dashData} />
              <WidgetView
                data={dashData}
                activeFilters={activeFilters}
              />
              <TabsView
                dashboardStats={dashData}
                activeFilters={activeFilters}
              />
              <div className={classes.goToCartLink}><NavLink to='/fileCentricCart'>Go to cart &#62;</NavLink></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Inventory);
