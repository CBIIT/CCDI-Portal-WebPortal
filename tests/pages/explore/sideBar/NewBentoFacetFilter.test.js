/**
 * NewBentoFacetFilter — facet filter shell with custom section/view components.
 */

jest.mock('@bento-core/facet-filter', () => ({
  NewFacetFilter: function MockNewFacetFilter(props) {
    return (
      <div data-testid="new-facet-filter">
        {props.CustomFacetSection && (
          <props.CustomFacetSection section={{ name: 'DEMOGRAPHICS' }} expanded />
        )}
        {props.CustomFacetView && (
          <props.CustomFacetView facet={{ label: 'Sex at Birth' }} facetClasses="demographicsSubjects" />
        )}
      </div>
    );
  },
}));

jest.mock('@bento-core/local-find', () => ({
  SearchView: () => <div data-testid="search-view" />,
  SearchBoxGenerator: () => ({ SearchBox: () => null }),
  UploadModalGenerator: () => ({ UploadModal: () => null }),
  resetAllData: jest.fn(),
  chunkSplit: (arr, size) => [arr],
}));

jest.mock('../../../../src/pages/inventory/sideBar/BentoFilterUtils', () => ({
  getAllIds: jest.fn(() => Promise.resolve({ participantIds: ['P1'] })),
  getAllParticipantIds: jest.fn(() => Promise.resolve([])),
}));

jest.mock('../../../../src/bento/dashTemplate', () => ({
  facetsConfig: [],
  facetSectionVariables: { DEMOGRAPHICS: { hasSearch: true } },
  resetIcon: 'icon',
  sectionLabel: {},
  queryParams: {},
}));

jest.mock('../../../../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: {
    query: jest.fn(() => Promise.resolve({ data: {} })),
    mutate: jest.fn(),
  },
}));

jest.mock('../../../../src/store', () => ({
  __esModule: true,
  default: {
    dispatch: jest.fn(),
    getState: jest.fn(() => ({})),
  },
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NewBentoFacetFilter from '../../../../src/pages/inventory/sideBar/NewBentoFacetFilter';

const theme = createMuiTheme();

describe('NewBentoFacetFilter', () => {
  it('should not render facet filter when selectedSection is -1', () => {
    render(
      <ThemeProvider theme={theme}>
        <NewBentoFacetFilter
          classes={{}}
          searchData={[]}
          activeFilters={{}}
          selectedSection={-1}
          unknownAgesState={{}}
        />
      </ThemeProvider>,
    );
    expect(screen.queryByTestId('new-facet-filter')).not.toBeInTheDocument();
  });

  it('should render facet filter with search section when section is selected', () => {
    render(
      <ThemeProvider theme={theme}>
        <NewBentoFacetFilter
          classes={{}}
          searchData={[]}
          activeFilters={{}}
          selectedSection={0}
          unknownAgesState={{}}
        />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('new-facet-filter')).toBeInTheDocument();
    expect(screen.getByTestId('search-view')).toBeInTheDocument();
    expect(screen.getByText('Sex at Birth')).toBeInTheDocument();
  });
});
