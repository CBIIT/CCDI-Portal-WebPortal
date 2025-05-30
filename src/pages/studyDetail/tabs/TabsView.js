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

  // Helper to filter out items with group or subjects === 0
  const filterValidItems = (arr) => {
    if (Array.isArray(arr)) {
      return arr.filter((item) => item.group !== 0 && item.subjects !== 0);
    }
    return arr;
  };

  // Helper to create a tab object, limiting to top 20 if needed
  const createTab = (name, data) => {
    if (Array.isArray(data) && data.length > 20) {
      return { name: `Top 20 ${name}`, data: data.slice(0, 20) };
    }
    return { name, data };
  };

  // Prepare Tabs filtering data arrays
  const DataCategories = filterValidItems(data_categories);
  const Diagnoses = filterValidItems(diagnoses);
  const AnatomicSites = filterValidItems(anatomic_sites);

  // Build tab containers, only including non-empty arrays
  const tabContainers = [
    createTab('Data Categories', DataCategories),
    createTab('Diagnoses', Diagnoses),
    createTab('Anatomic Sites', AnatomicSites),
  ].filter((tab) => {
    return Array.isArray(tab.data) && tab.data.length > 0
  });

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
