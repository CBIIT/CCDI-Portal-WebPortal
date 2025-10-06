
import React from 'react';
import env from '../../../utils/env';

/**
 * FederationDataModelNavigator component
 * Renders an iframe displaying the CCDI Federation Data Model Navigator
 * with environment-specific configuration URLs.
 */
const FederationDataModelNavigator = () => {
  // Get the base DMN URL from environment variables or use default
  const BASE_URL = env.REACT_APP_DMN_URL || "https://cbiit.github.io/crdc-data-model-navigator/?config=https://raw.githubusercontent.com/CBIIT/ccdi-model/refs/heads/dmn-dev/model-desc/";
  
  // Remove any existing config parameter to get clean base URL
  const CLEAN_BASE_URL = BASE_URL.split('?config=')[0];

  /**
   * Constructs the Federation DMN URL with environment-specific configuration
   * @returns {string} Complete URL with config parameter pointing to the appropriate branch
   */
  const getFedDmnUrl = () => {
    // Map environment names to their corresponding GitHub branch names
    const envFedBranches = {
      development: 'fed-dev',
      qa: 'fed-qa',
      staging: 'fed-stage',
      production: 'fed-prod'
    };

    // Get the branch name for the current environment, default to development
    const branch = envFedBranches[env.NODE_ENV] || envFedBranches.development;
    
    // Construct the full GitHub raw content URL for the federation DMN config
    const configUrl = `https://raw.githubusercontent.com/CBIIT/ccdi-federation-dmn/refs/heads/${branch}/`;
    
    // Return the complete DMN URL with the config parameter
    return `${CLEAN_BASE_URL}?config=${configUrl}`;
  };

  // Get the complete DMN URL with the config parameter
  const fedDmnUrl = getFedDmnUrl();

  return (
    <div style={{ width: '100%', height: '1000px' }}>
      <iframe
        src={fedDmnUrl}
        scrolling="no"
        title="Federation Data Model Navigator"
        style={{ width: '100%', height: '1000px', border: 'none' }}
        sandbox="allow-popups allow-scripts allow-same-origin allow-downloads"
      />
    </div>
  );
};

export default FederationDataModelNavigator;
