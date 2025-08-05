import React, { useState } from 'react';
import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { 
  Button,
  Divider,
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
import vectorIcon from '../../assets/icons/Vector_icon.svg';
import closeIcon from '../../assets/icons/Window_Close_Icon.svg';

const ULSection = styled.ul`
  li {
    cursor: pointer;
  }

  li:hover {
    opacity: 0.8;
  }

  .categoryItemSelected {
    background-color: #DDEDEE;
  }
`;

const SideBarContentPanel = styled.div`
  width: ${(props) => (props.selected === -1 ? '262px' : '270px')};
  margin-left: ${(props) => (props.selected === -1 ? '-262px' : '0px')};
  padding: 16px 0 0 0;
  background-color: transparent;
  transition: all .5s;
  background-color: #DDEDEE;
`;

const RightContentPanel = styled.div`
  width: ${(props) => (props.selected === -1 ? 'calc(100% - 270px)' : 'calc(100% - 540px)')};
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
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style={disable ? { border: '1px solid #ffffff' } : {}}
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
                      <>
                      <Divider className={`${classes.divider} divider${idx}`}/>
                      <li onClick={() => handleCategoryClick(idx)}>
                        <div className={classes.categoryContainer}>
                          <span className={classes.categoryTitle}>{category}</span>
                          {selectedSection === idx && <img src={vectorIcon} alt="vector" className={classes.categoryIcon} />}
                        </div>
                      </li>
                      </>
                    );
                  })
                }
              </ULSection>
            </div>
          </div>
          {
            <SideBarContentPanel selected={selectedSection}>
              <div className={classes.contentPanelHeader}>
                <a onClick={() => handleCloseContentPanelClick()}>
                  <img src={closeIcon} alt="close" className={classes.closeIcon} />
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
