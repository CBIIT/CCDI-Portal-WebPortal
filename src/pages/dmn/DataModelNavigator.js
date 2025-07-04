
import React from 'react';
import env from '../../utils/env';

const DataModelNavigator = () => {
  const dmnUrl = env.REACT_APP_DMN_URL  || "https://cbiit.github.io/crdc-data-model-navigator/?config=https://raw.githubusercontent.com/CBIIT/ccdi-model/refs/heads/dmn-dev/model-desc/";
  return (
    <div style={{ width: '100%', height: '1000px' }}>
      <iframe
        src={dmnUrl}
        scrolling="no"
        title="Data Model Navigator"
        style={{ width: '100%', height: '1000px', border: 'none' }}
        sandbox="allow-popups allow-scripts allow-same-origin allow-downloads"
      />
    </div>
  );
};

export default DataModelNavigator;
