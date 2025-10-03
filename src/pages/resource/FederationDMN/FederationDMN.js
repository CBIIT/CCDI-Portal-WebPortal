
import React from 'react';
import env from '../../../utils/env';

const FederationDataModelNavigator = () => {
  const dmnUrl = (env.REACT_APP_DMN_URL || "https://cbiit.github.io/crdc-data-model-navigator/?config=https://raw.githubusercontent.com/CBIIT/ccdi-model/refs/heads/dmn-dev/model-desc/").split('?config=')[0] + '?config=';

  const fedDmnUrl = dmnUrl + 'https://raw.githubusercontent.com/CBIIT/ccdi-federation-dmn/refs/heads/main/';
  
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
