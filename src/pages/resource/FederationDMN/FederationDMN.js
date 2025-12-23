
import React from 'react';
import env from '../../../utils/env';

/**
 * FederationDataModelNavigator component
 * Renders an iframe displaying the CCDI Federation Data Model Navigator
 * with environment-specific configuration URLs.
 */
const FederationDataModelNavigator = () => {
  // Configuration constants
  const DEFAULT_DMN_URL = "https://cbiit.github.io/crdc-data-model-navigator/?config=https://raw.githubusercontent.com/CBIIT/ccdi-model/refs/heads/dmn-dev/model-desc/";
  const FED_DMN_BASE_URL = "https://raw.githubusercontent.com/CBIIT/ccdi-federation-dmn/refs/heads/";
  
  // Get the base DMN URL from environment variables or use default
  const baseUrl = env.REACT_APP_DMN_URL || DEFAULT_DMN_URL;
  
  // Extract environment from URL (e.g., "dev" from "dmn-dev")
  const match = baseUrl.match(/refs\/heads\/dmn-([^/]+)/);
  const baseEnv = (match && match[1]) || 'dev';
  
  // Remove any existing config parameter to get clean base URL
  const cleanBaseUrl = baseUrl.split('?config=')[0];

  /**
   * Constructs the Federation DMN URL with environment-specific configuration
   * @returns {string} Complete URL with config parameter pointing to the appropriate branch
   */
  const getFedDmnUrl = () => {
    // Construct the federation DMN config URL for the current environment
    const fedConfigUrl = `${FED_DMN_BASE_URL}fed-${baseEnv}/`;
    
    // Return the complete DMN URL with the config parameter
    return `${cleanBaseUrl}?config=${encodeURIComponent(fedConfigUrl)}`;
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
