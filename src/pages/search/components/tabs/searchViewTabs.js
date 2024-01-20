import React from 'react';
import Subsection from '../searchResultSection';
import SubsectionMobile from '../searchResultSectionMobile';

const SearchViewTabs = ({
  classes, options, searchText, isPublic, isDesktop,
}) => {
  const { properties } = options;

  if (isDesktop) {
    return properties.map((prop, index) => (
      <Subsection
        key = {`Subsection_${index}`}
        isPublic={isPublic}
        searchText={searchText}
        count={prop.count}
        datafield={prop.datafield}
      />
    ));
  } else {
    return properties.map((prop, index) => (
      <SubsectionMobile
        key = {`Subsection_${index}`}
        isPublic={isPublic}
        searchText={searchText}
        count={prop.count}
        datafield={prop.datafield}
      />
    ));
  }
};

export default SearchViewTabs;
