import React from 'react';

/**
 * TabPanel component displays the content of a single tab.
 * Renders its children only when the tab is active, based on the current value and index.
 * Provides accessibility via the "tabpanel" role and hides inactive panels.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The content to display within the tab panel.
 * @param {number} props.value - The currently selected tab index.
 * @param {number} props.index - The index of this tab panel.
 * @returns {JSX.Element} The rendered TabPanel component.
 */
const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {/* Render children if this tab is active */}
    <>{children}</>
  </div>
);

// Export TabPanel component
export default TabPanel;
