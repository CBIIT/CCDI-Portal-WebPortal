import React, { useContext }  from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { generateQueryStr } from '@bento-core/util';
import {
  changeTab,
} from '../../../components/Inventory/InventoryState';
import { queryParams } from '../../../bento/dashTemplate';
import TabPanel from './TabPanel';
import { tabContainers } from '../../../bento/dashboardTabData';
import { Tabs as BentoTabs }  from '@bento-core/tab';
import { customTheme } from './DefaultTabTheme';
import CohortModalGenerator from '../cohortModal/cohortModalGenerator';
import { CohortModalContext } from '../cohortModal/CohortModalContext';

const Tabs = (props) => {
   
  const { currentTab } = props;
  const { showCohortModal, setShowCohortModal} = useContext(CohortModalContext);
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  const handleTabChange = (event, value) => {
    let paramValue = {};
    paramValue.tab = value;
    const queryStr = generateQueryStr(query, queryParams, paramValue);
    navigate(`/explore${queryStr}`, { replace: false });
    dispatch(changeTab(value, 'not-facet'));
  };

  const { CohortModal } = CohortModalGenerator();


  /**
  * 1. change <name> to <display> as array item
  * 2. <display> -> [tab.name, props.dashboardStats[tab.count]]
  */
  const getTabs = (tabs) => tabs.map((tab) => ({
    ...tab,
    name: tab.name,
    count: `(${props.dashboardStats[tab.count].toLocaleString()})`,
    display: [tab.name, props.dashboardStats[tab.count]],
    clsName: `${tab.name}`.toLowerCase().replace(' ', '_'),
  }));

  return (
    <>
      <CohortModal
        open={showCohortModal}
        onCloseModal={() => setShowCohortModal(false)}
      />
      <BentoTabs
        tabItems={getTabs(tabContainers)}
        currentTab={currentTab}
        handleTabChange={handleTabChange}
        customTheme={customTheme}
      />
      {
        tabContainers.map((tab, index) => (
          <>
            <div hidden={currentTab !== index}>
              <TabPanel
                {...props}
                tab={tab}
                config={tab}
                activeTab={index === currentTab}
              />
            </div>
          </>
        ))
      }
    </>
  );
};

const mapStateToProps = (state) => ({
  currentTab: state.inventoryReducer.tab
});
export default connect(mapStateToProps, null)(Tabs);
