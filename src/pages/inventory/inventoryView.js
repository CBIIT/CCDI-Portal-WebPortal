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
          {/* <div className={classes.sideBar}>
            <UseGuideButton />
            <label for="local_find_input" style={{ display: 'none' }}>Participant ID Text Search box</label>
            <BentoFacetFilter
              searchData={dashData}
              activeFilters={activeFilters}
            />
          </div> */}
          <div className={classes.sideBar}>
            <label for="local_find_input" style={{ display: 'none' }}>Participant ID Text Search box</label>
            <div className={classes.sideBarMenuSider}>
              <UseGuideButton />
              <ul className={classes.siderContent}>
                <li className={classes.facetCategory}>
                  <span className={classes.categoryIcon}><svg viewBox="64 64 896 896" focusable="false" data-icon="read" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M928 161H699.2c-49.1 0-97.1 14.1-138.4 40.7L512 233l-48.8-31.3A255.2 255.2 0 00324.8 161H96c-17.7 0-32 14.3-32 32v568c0 17.7 14.3 32 32 32h228.8c49.1 0 97.1 14.1 138.4 40.7l44.4 28.6c1.3.8 2.8 1.3 4.3 1.3s3-.4 4.3-1.3l44.4-28.6C602 807.1 650.1 793 699.2 793H928c17.7 0 32-14.3 32-32V193c0-17.7-14.3-32-32-32zM324.8 721H136V233h188.8c35.4 0 69.8 10.1 99.5 29.2l48.8 31.3 6.9 4.5v462c-47.6-25.6-100.8-39-155.2-39zm563.2 0H699.2c-54.4 0-107.6 13.4-155.2 39V298l6.9-4.5 48.8-31.3c29.7-19.1 64.1-29.2 99.5-29.2H888v488zM396.9 361H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm223.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c0-4.1-3.2-7.5-7.1-7.5H627.1c-3.9 0-7.1 3.4-7.1 7.5zM396.9 501H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm416 0H627.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5z"></path></svg></span>
                  <span className={classes.categoryTitle}>DIAGNOSIS</span>
                </li>
                <li className={classes.facetCategoryActive}>
                  <span className={classes.categoryIcon}><svg viewBox="64 64 896 896" focusable="false" data-icon="read" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M928 161H699.2c-49.1 0-97.1 14.1-138.4 40.7L512 233l-48.8-31.3A255.2 255.2 0 00324.8 161H96c-17.7 0-32 14.3-32 32v568c0 17.7 14.3 32 32 32h228.8c49.1 0 97.1 14.1 138.4 40.7l44.4 28.6c1.3.8 2.8 1.3 4.3 1.3s3-.4 4.3-1.3l44.4-28.6C602 807.1 650.1 793 699.2 793H928c17.7 0 32-14.3 32-32V193c0-17.7-14.3-32-32-32zM324.8 721H136V233h188.8c35.4 0 69.8 10.1 99.5 29.2l48.8 31.3 6.9 4.5v462c-47.6-25.6-100.8-39-155.2-39zm563.2 0H699.2c-54.4 0-107.6 13.4-155.2 39V298l6.9-4.5 48.8-31.3c29.7-19.1 64.1-29.2 99.5-29.2H888v488zM396.9 361H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm223.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c0-4.1-3.2-7.5-7.1-7.5H627.1c-3.9 0-7.1 3.4-7.1 7.5zM396.9 501H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm416 0H627.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5z"></path></svg></span>
                  <span className={classes.categoryTitle}>DEMOGRAPHICS</span>
                </li>
              </ul>
            </div>
          </div>
          <div className={classes.sidebarMenuContentPanel}>
            <div className={classes.contentPanelHeader}>
              <a>
                <svg class="SidebarMenuContentPanel_closeIcon__AWabD" fill="currentColor" height="24" viewBox="0 0 16 16" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.80901 8L12.9106 3.11094C12.9793 3.02969 12.9215 2.90625 12.8153 2.90625H11.5684C11.4949 2.90625 11.4246 2.93906 11.3762 2.99531L7.99339 7.02813L4.61057 2.99531C4.5637 2.93906 4.49339 2.90625 4.41839 2.90625H3.17151C3.06526 2.90625 3.00745 3.02969 3.0762 3.11094L7.17776 8L3.0762 12.8891C3.0608 12.9072 3.05092 12.9293 3.04773 12.9529C3.04454 12.9764 3.04818 13.0004 3.05822 13.022C3.06826 13.0435 3.08426 13.0617 3.10435 13.0745C3.12443 13.0872 3.14774 13.0939 3.17151 13.0938H4.41839C4.49182 13.0938 4.56214 13.0609 4.61057 13.0047L7.99339 8.97188L11.3762 13.0047C11.4231 13.0609 11.4934 13.0938 11.5684 13.0938H12.8153C12.9215 13.0938 12.9793 12.9703 12.9106 12.8891L8.80901 8Z"></path>
                </svg>
              </a>
            </div>
            <div className={classes.contentPanelBody}>
              <div className={classes.facetsWrapper}>
                <BentoFacetFilter
                  searchData={dashData}
                  activeFilters={activeFilters}
                />
              </div>
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
