
import React from 'react';
import env from '../../../utils/env';

const FederationDataModelNavigator = () => {
  const fedDmnUrl = env.REACT_APP_FED_DMN_URL  || "https://cbiit.github.io/crdc-data-model-navigator/?config=https://raw.githubusercontent.com/CBIIT/ccdi-federation-dmn/refs/heads/main/";
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
