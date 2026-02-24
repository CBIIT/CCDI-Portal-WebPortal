import React from 'react';
import { CohortStateProvider } from '../../components/CohortSelectorState/CohortStateContext';
import SearchView from './searchView';

const SearchController = () => {
  return (
    <CohortStateProvider>
      <SearchView />
    </CohortStateProvider>
  );
};

export default SearchController;
