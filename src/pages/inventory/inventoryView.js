import React, { useState } from 'react';
import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { 
  Button,
  withStyles,
} from '@material-ui/core';
import styled from 'styled-components';
import { ClearAllFiltersBtn } from '@bento-core/facet-filter';
import {
  resetAllData,
} from '@bento-core/local-find';
import store from '../../store';
import { generateQueryStr } from '@bento-core/util';
import { resetIcon, queryParams, facetsConfig } from '../../bento/dashTemplate';
import styles from './inventoryStyle';
import NewBentoFacetFilter from './sideBar/NewBentoFacetFilter';
import WidgetView from './widget/WidgetView';
import StatsView from '../../components/Stats/StatsView';
import TabsView from './tabs/TabsView';
import QueryBarView from './filterQueryBar/QueryBarView';
import UseGuideButton from './sideBar/UserGuideButton.js';
import { CircularProgress } from '@material-ui/core';

const ULSection = styled.ul`
  li {
    cursor: pointer;
  }

  li:hover {
    opacity: 0.8;
  }

  .categoryItemSelected {
    background-color: #00546e;
  }
`;

const SideBarContentPanel = styled.div`
  width: ${(props) => (props.selected === -1 ? '180px' : '270px')};
  margin-left: ${(props) => (props.selected === -1 ? '-180px' : '0px')};
  padding: 16px 16px 0 16px;
  background-color: #f0f1f8;
  transition: all .5s;
`;

const RightContentPanel = styled.div`
  width: ${(props) => (props.selected === -1 ? 'calc(100% - 180px)' : 'calc(100% - 450px)')};
  position: relative;
  border-right: thin solid #8A7F7C;
  border-left: thin solid #8A7F7C;
  transition: all .5s;
`;

const Inventory = ({
  classes,
  dashData,
  activeFilters,
}) => {
  const [selectedSection, setSelectedSection] = useState(-1);

  const sectionList = [...new Set(facetsConfig.map((item) => item.section))];
  
  /**
    * Clear All Filter Button
    * Custom button component
    * bento core params
    * 1. onClearAllFilters - dispatch clear all filters
    * 2. disable - true/ false
  */
  const CustomClearAllFiltersBtn = ({ onClearAllFilters, disable }) => {
    const [isHover, setIsHover] = useState(false);
    const query = new URLSearchParams(useLocation().search);
    const navigate = useNavigate();
    return (
      <div className={classes.floatRight}>
        <Button
          id="button_sidebar_clear_all_filters"
          variant="outlined"
          disabled={disable}
          onClick={() => {
            const paramValue = {
              'p_id': '', 'u': '', 'u_fc': '', 'u_um': '', 'sex_at_birth': '', 'race': '',
              'age_at_diagnosis': '', 'diagnosis': '', 'diagnosis_anatomic_site': '', 'diagnosis_classification_system': '', 'diagnosis_basis': '', 'disease_phase': '',
              'treatment_type': '', 'treatment_agent': '', 'age_at_treatment_start': '', 'response_category': '', 'age_at_response': '',
              'age_at_last_known_survival_status': '', 'first_event': '', 'last_known_survival_status': '',
              'participant_age_at_collection': '', 'sample_anatomic_site': '', 'sample_tumor_status': '', 'tumor_classification': '',
              'data_category': '', 'file_type': '', 'dbgap_accession': '', 'study_name': '', 'study_status': '',
              'library_selection': '', 'library_strategy': '', 'library_source_material': '', 'library_source_molecule': ''
            };
            const queryStr = generateQueryStr(query, queryParams, paramValue);
            navigate(`/explore${queryStr}`);
            onClearAllFilters();
            store.dispatch(resetAllData());
          }}
          className={classes.customButton}
          classes={{ root: classes.clearAllButtonRoot }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style={disable ? { border: '1px solid #627B7A' } : {}}
        >
          <img
            src={disable ? resetIcon.src : (isHover ? resetIcon.srcActiveHover : resetIcon.srcActive)}
            height={resetIcon.size}
            width={resetIcon.size}
            alt={resetIcon.alt}
          />
        </Button>
        <span className={disable
          ? classes.resetTextDisabled : classes.resetText}
        >
          Clear all filtered selections
        </span>
      </div>
    );
  };
  
  const handleCategoryClick = (categoryID) => {
    if(categoryID === selectedSection) {
      setSelectedSection(-1);
    } else {
      setSelectedSection(categoryID);
    }
  };

  const handleCloseContentPanelClick = () => {
    setSelectedSection(-1);
  };

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
            <div className={classes.sideBarCover} />
            <label for="local_find_input" style={{ display: 'none' }}>Participant ID Text Search box</label>
            <div className={classes.sideBarMenuSider}>
              <UseGuideButton />
              <ClearAllFiltersBtn
                Component={CustomClearAllFiltersBtn}
                activeFilters={activeFilters}
              />
              <ULSection className={classes.siderContent}>
                {
                  sectionList.map((category, idx) => {
                    return (
                      <li className={selectedSection === idx ? 'categoryItemSelected' : ''} onClick={() => handleCategoryClick(idx)}>
                        <span className={classes.categoryIcon}><svg viewBox="64 64 896 896" focusable="false" data-icon="read" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M928 161H699.2c-49.1 0-97.1 14.1-138.4 40.7L512 233l-48.8-31.3A255.2 255.2 0 00324.8 161H96c-17.7 0-32 14.3-32 32v568c0 17.7 14.3 32 32 32h228.8c49.1 0 97.1 14.1 138.4 40.7l44.4 28.6c1.3.8 2.8 1.3 4.3 1.3s3-.4 4.3-1.3l44.4-28.6C602 807.1 650.1 793 699.2 793H928c17.7 0 32-14.3 32-32V193c0-17.7-14.3-32-32-32zM324.8 721H136V233h188.8c35.4 0 69.8 10.1 99.5 29.2l48.8 31.3 6.9 4.5v462c-47.6-25.6-100.8-39-155.2-39zm563.2 0H699.2c-54.4 0-107.6 13.4-155.2 39V298l6.9-4.5 48.8-31.3c29.7-19.1 64.1-29.2 99.5-29.2H888v488zM396.9 361H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm223.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c0-4.1-3.2-7.5-7.1-7.5H627.1c-3.9 0-7.1 3.4-7.1 7.5zM396.9 501H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm416 0H627.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5z"></path></svg></span>
                        <span className={classes.categoryTitle}>{category}</span>
                      </li>
                    );
                  })
                }
                {/* <li className={selectedSection === 0 ? 'categoryItemSelected' : ''} onClick={() => handleCategoryClick(0)}>
                  <span className={classes.categoryIcon}><svg viewBox="64 64 896 896" focusable="false" data-icon="read" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M928 161H699.2c-49.1 0-97.1 14.1-138.4 40.7L512 233l-48.8-31.3A255.2 255.2 0 00324.8 161H96c-17.7 0-32 14.3-32 32v568c0 17.7 14.3 32 32 32h228.8c49.1 0 97.1 14.1 138.4 40.7l44.4 28.6c1.3.8 2.8 1.3 4.3 1.3s3-.4 4.3-1.3l44.4-28.6C602 807.1 650.1 793 699.2 793H928c17.7 0 32-14.3 32-32V193c0-17.7-14.3-32-32-32zM324.8 721H136V233h188.8c35.4 0 69.8 10.1 99.5 29.2l48.8 31.3 6.9 4.5v462c-47.6-25.6-100.8-39-155.2-39zm563.2 0H699.2c-54.4 0-107.6 13.4-155.2 39V298l6.9-4.5 48.8-31.3c29.7-19.1 64.1-29.2 99.5-29.2H888v488zM396.9 361H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm223.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c0-4.1-3.2-7.5-7.1-7.5H627.1c-3.9 0-7.1 3.4-7.1 7.5zM396.9 501H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm416 0H627.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5z"></path></svg></span>
                  <span className={classes.categoryTitle}>DIAGNOSIS</span>
                </li>
                <li className={selectedSection === 1 ? 'categoryItemSelected' : ''} onClick={() => handleCategoryClick(1)}>
                  <span className={classes.categoryIcon}><svg viewBox="64 64 896 896" focusable="false" data-icon="read" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M928 161H699.2c-49.1 0-97.1 14.1-138.4 40.7L512 233l-48.8-31.3A255.2 255.2 0 00324.8 161H96c-17.7 0-32 14.3-32 32v568c0 17.7 14.3 32 32 32h228.8c49.1 0 97.1 14.1 138.4 40.7l44.4 28.6c1.3.8 2.8 1.3 4.3 1.3s3-.4 4.3-1.3l44.4-28.6C602 807.1 650.1 793 699.2 793H928c17.7 0 32-14.3 32-32V193c0-17.7-14.3-32-32-32zM324.8 721H136V233h188.8c35.4 0 69.8 10.1 99.5 29.2l48.8 31.3 6.9 4.5v462c-47.6-25.6-100.8-39-155.2-39zm563.2 0H699.2c-54.4 0-107.6 13.4-155.2 39V298l6.9-4.5 48.8-31.3c29.7-19.1 64.1-29.2 99.5-29.2H888v488zM396.9 361H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm223.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c0-4.1-3.2-7.5-7.1-7.5H627.1c-3.9 0-7.1 3.4-7.1 7.5zM396.9 501H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm416 0H627.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5z"></path></svg></span>
                  <span className={classes.categoryTitle}>DEMOGRAPHICS</span>
                </li> */}
              </ULSection>
            </div>
          </div>
          {
            <SideBarContentPanel selected={selectedSection}>
              <div className={classes.contentPanelHeader}>
                <a onClick={() => handleCloseContentPanelClick()}>
                  <svg fill="currentColor" height="24" viewBox="0 0 16 16" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.80901 8L12.9106 3.11094C12.9793 3.02969 12.9215 2.90625 12.8153 2.90625H11.5684C11.4949 2.90625 11.4246 2.93906 11.3762 2.99531L7.99339 7.02813L4.61057 2.99531C4.5637 2.93906 4.49339 2.90625 4.41839 2.90625H3.17151C3.06526 2.90625 3.00745 3.02969 3.0762 3.11094L7.17776 8L3.0762 12.8891C3.0608 12.9072 3.05092 12.9293 3.04773 12.9529C3.04454 12.9764 3.04818 13.0004 3.05822 13.022C3.06826 13.0435 3.08426 13.0617 3.10435 13.0745C3.12443 13.0872 3.14774 13.0939 3.17151 13.0938H4.41839C4.49182 13.0938 4.56214 13.0609 4.61057 13.0047L7.99339 8.97188L11.3762 13.0047C11.4231 13.0609 11.4934 13.0938 11.5684 13.0938H12.8153C12.9215 13.0938 12.9793 12.9703 12.9106 12.8891L8.80901 8Z"></path>
                  </svg>
                </a>
              </div>
              <div className={classes.contentPanelBody}>
                <div className={classes.facetsWrapper}>
                  <NewBentoFacetFilter
                    searchData={dashData}
                    activeFilters={activeFilters}
                    selectedSection={selectedSection}
                  />
                </div>
              </div>
            </SideBarContentPanel>
          }
          <RightContentPanel selected={selectedSection}>
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
          </RightContentPanel>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Inventory);
