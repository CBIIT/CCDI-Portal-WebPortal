import React, { useState } from "react";
import { Tabs as BentoTabs } from "@bento-core/tab";
import TabPanel from "./TabPanel";
import customTheme from "./DefaultTabTheme";
// import LargeViewButton from "../LargeViewButton/LargeViewButton";

// import WidgetView from "../widget/WidgetView";

import ChartView from "../chart/ChartView";

const Tabs = ({ data, isModalView = false }) => {
  const { anatomic_sites, data_categories, diagnoses } = data || {};

  const [currentTab, setCurrentTab] = useState(0);

  const createTab = (name, data) => {
    if (Array.isArray(data) && data.length > 20) {
      return { name: `Top 20 ${name}`, data: data.slice(0, 20) };
    }
    return { name, data };
  };

  const dataCategoriesTab = createTab("Data Categories", data_categories);
  const diagnosesTab = createTab("Diagnoses", diagnoses);
  const anatomicSitesTab = createTab("Anatomic Sites", anatomic_sites);

  const tabContainers = [
    dataCategoriesTab,
    diagnosesTab,
    anatomicSitesTab,
  ];

  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <div
        style={
          isModalView
            ? {
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "2px solid #71767A",
                padding: "0 8px",
                alignItems: "center",
              }
            : {
                borderBottom: "2px solid #71767A",
              }
        }
      >
        <BentoTabs
          tabItems={tabContainers}
          currentTab={currentTab}
          handleTabChange={handleTabChange}
          customTheme={customTheme}
        />

        {isModalView && (
          <h4
            style={{
              fontFamily: "Poppins",
              fontSize: 15,
              fontWeight: 400,
              margin: "15px 0",
              color: "#377E99"
            }}
          >
            Subjects in this Study:{" "}
            <span
              style={{
                fontWeight: "700",
              }}
            >
              {data.num_of_participants}
            </span>
          </h4>
        )}
      </div>

      {tabContainers.map((tab, index) => (
        <TabPanel value={currentTab} index={index} key={index}>
          {/* <WidgetView dataSet={tabContainers[currentTab]}/> */}
          <ChartView data={tabContainers[currentTab].data} isModalView={isModalView} />
        </TabPanel>
      ))}
    </>
  );
};

export default Tabs;
