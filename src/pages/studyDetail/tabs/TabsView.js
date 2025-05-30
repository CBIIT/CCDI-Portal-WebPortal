import React, { useState } from 'react';
import { Tabs as BentoTabs } from '@bento-core/tab';
import { withStyles } from '@material-ui/core';
import TabPanel from './TabPanel';
import customTheme from './DefaultTabTheme';
import styles from './TabsStyle';
import ChartView from '../chart/ChartView';

/**
 * Tabs component displays tabbed chart views for study details
 * Renders a set of tabs displaying different data categories (Data Categories, Diagnoses, Anatomic Sites)
 * with optional modal view styling and participant count.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.data - Data object containing arrays for anatomic_sites, data_categories, diagnoses, and num_of_participants.
 * @param {Object} props.classes - CSS classes for styling the component.
 * @param {boolean} [props.isModalView=false] - Whether the component is rendered in a modal view.
 * @returns {JSX.Element} The rendered Tabs component.
 */
const Tabs = ({ data, classes, isModalView = false }) => {
  // Destructure relevant data arrays from the input data
  const { anatomic_sites, data_categories, diagnoses } = data || {};

  // State to track the currently selected tab
  const [currentTab, setCurrentTab] = useState(0);

  // Helper to create a tab object, limiting to top 20 if needed
  const createTab = (name, data) => {
    // Remove items with group === 0
    let filteredData = Array.isArray(data)
      ? data.filter(item => item.subjects !== 0)
      : data;

    if (Array.isArray(filteredData) && filteredData.length > 20) {
      return { name: `Top 20 ${name}`, data: filteredData.slice(0, 20) };
    }

    return { name, data: filteredData };
  };

  // Prepare tab data for each category
  const dataCategoriesTab = createTab('Data Categories', data_categories);
  const diagnosesTab = createTab('Diagnoses', diagnoses);
  const anatomicSitesTab = createTab('Anatomic Sites', anatomic_sites);

  // // Array of tab containers for rendering
  // const tabContainers = [dataCategoriesTab, diagnosesTab, anatomicSitesTab];

    // Array of tab containers for rendering, filter out tabs with empty data arrays
  const tabContainers = [dataCategoriesTab, diagnosesTab, anatomicSitesTab].filter(
    tab => Array.isArray(tab.data) && tab.data.length > 0
  );

  // Handle tab change event
  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      {/* Tab header with optional modal view title */}
      <div className={isModalView ? classes.modalHeader : classes.header}>
        <BentoTabs
          tabItems={tabContainers}
          currentTab={currentTab}
          handleTabChange={handleTabChange}
          customTheme={customTheme}
        />
        
        {/* Show the 'Subjects in this Study' section when the view is in Modal mode.  */}
        {isModalView && (
          <h4 className={classes.modalTitle}>
            Subjects in this Study:{' '}
            <span className={classes.modalTitleSpan}>
              {data.num_of_participants}
            </span>
          </h4>
        )}
      </div>

      {/* Render tab panels with corresponding chart views */}
      {tabContainers.map((tab, index) => (
        <TabPanel value={currentTab} index={index} key={index}>
          <ChartView
            data={tabContainers[currentTab].data}
            isModalView={isModalView}
          />
        </TabPanel>
      ))}
    </>
  );
};

// Export Tabs component
export default withStyles(styles)(Tabs);
