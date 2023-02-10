import React from 'react';
import Subsection from '../searchResultSection';

const SearchViewTabs = ({
  classes, options, searchText, isPublic,
}) => {
  const { properties } = options;

  return properties.map((prop) => (
          <Subsection
            isPublic={isPublic}
            searchText={searchText}
            count={prop.count}
            datafield={prop.datafield}
          />
      ));
};

export default SearchViewTabs;
