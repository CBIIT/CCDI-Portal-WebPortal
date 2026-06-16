/**
 * BentoFacetFilter — legacy facet filter shell (FacetFilter + clear-all control).
 */

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ search: '?tab=0' }),
}));

jest.mock('@bento-core/facet-filter', () => ({
  FacetFilter: function MockFacetFilter(props) {
    const React = require('react');
    return (
      <div data-testid="facet-filter">
        {props.CustomFacetSection && (
          <props.CustomFacetSection section={{ name: 'DEMOGRAPHICS' }} expanded />
        )}
        {props.CustomFacetView && (
          <props.CustomFacetView facet={{ label: 'Race' }} facetClasses="demographicsSubjects" />
        )}
      </div>
    );
  },
  ClearAllFiltersBtn: function MockClearAllFiltersBtn({ Component, activeFilters }) {
  const React = require('react');
    return (
      <Component
        onClearAllFilters={jest.fn()}
        disable={!activeFilters || Object.keys(activeFilters).length === 0}
      />
    );
  },
}));

jest.mock('@bento-core/local-find', () => ({
  SearchView: () => {
    const React = require('react');
    return <div data-testid="search-view" />;
  },
  SearchBoxGenerator: () => ({ SearchBox: () => null }),
  UploadModalGenerator: () => ({ UploadModal: () => null }),
  resetAllData: jest.fn(),
  chunkSplit: (arr, size) => [arr],
}));

jest.mock('../../../../src/pages/inventory/sideBar/BentoFilterUtils', () => ({
  getAllIds: jest.fn(),
  getAllParticipantIds: jest.fn(),
}));

jest.mock('../../../../src/bento/dashTemplate', () => ({
  facetsConfig: [],
  facetSectionVariables: { DEMOGRAPHICS: { hasSearch: true } },
  resetIcon: {
    src: 'reset.svg',
    srcActive: 'reset-active.svg',
    srcActiveHover: 'reset-hover.svg',
    size: 16,
    alt: 'reset',
  },
  sectionLabel: {},
  queryParams: ['import_from', 'p_id', 'u', 'u_fc', 'u_um', 'tab'],
}));

jest.mock('../../../../src/store', () => ({
  __esModule: true,
  default: {
    dispatch: (...args) => mockDispatch(...args),
    getState: jest.fn(() => ({})),
  },
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { resetAllData } from '@bento-core/local-find';
import BentoFacetFilter from '../../../../src/pages/inventory/sideBar/BentoFacetFilter';

const theme = createMuiTheme();

const baseProps = {
  classes: {
    buttonContainer: 'buttonContainer',
    customButton: 'customButton',
    clearAllButtonRoot: 'clearAllButtonRoot',
    resetText: 'resetText',
    resetTextDisabled: 'resetTextDisabled',
    sectionSummaryTextContainer: 'sectionSummaryTextContainer',
    sectionSummaryText: 'sectionSummaryText',
    demographicsSubjects: 'demographicsSubjects',
    dropDownIconSubSection: 'dropDownIconSubSection',
    customExpansionPanelSummaryRoot: 'customExpansionPanelSummaryRoot',
  },
  searchData: [],
  activeFilters: { sex_at_birth: { Female: true } },
  unknownAgesState: {},
};

describe('BentoFacetFilter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render facet filter with search section and facet labels', () => {
      render(
        <ThemeProvider theme={theme}>
          <BentoFacetFilter {...baseProps} />
        </ThemeProvider>,
      );

      expect(screen.getByTestId('facet-filter')).toBeInTheDocument();
      expect(screen.getByTestId('search-view')).toBeInTheDocument();
      expect(screen.getByText('DEMOGRAPHICS')).toBeInTheDocument();
      expect(screen.getByText('Race')).toBeInTheDocument();
    });
  });

  describe('Clear all filters', () => {
    it('should disable clear-all when there are no active filters', () => {
      render(
        <ThemeProvider theme={theme}>
          <BentoFacetFilter {...baseProps} activeFilters={{}} />
        </ThemeProvider>,
      );

      const clearButton = document.getElementById('button_sidebar_clear_all_filters');
      expect(clearButton).toBeDisabled();
      expect(screen.getByText('Clear all filtered selections')).toHaveClass('resetTextDisabled');
    });

    it('should switch reset icon on hover when filters are active', () => {
      render(
        <ThemeProvider theme={theme}>
          <BentoFacetFilter {...baseProps} />
        </ThemeProvider>,
      );

      const clearButton = document.getElementById('button_sidebar_clear_all_filters');
      const resetImg = clearButton.querySelector('img');

      expect(resetImg).toHaveAttribute('src', 'reset-active.svg');
      fireEvent.mouseEnter(clearButton);
      expect(resetImg).toHaveAttribute('src', 'reset-hover.svg');
      fireEvent.mouseLeave(clearButton);
      expect(resetImg).toHaveAttribute('src', 'reset-active.svg');
    });

    it('should navigate to explore, reset local find, and dispatch unknown ages on clear', () => {
      render(
        <ThemeProvider theme={theme}>
          <BentoFacetFilter {...baseProps} />
        </ThemeProvider>,
      );

      fireEvent.click(document.getElementById('button_sidebar_clear_all_filters'));

      expect(mockNavigate).toHaveBeenCalledWith(expect.stringContaining('/explore'));
      expect(resetAllData).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'UNKNOWN_AGES_CHANGED',
          payload: expect.objectContaining({ unknownAges: 'include' }),
        }),
      );
      const unknownAgeDispatches = mockDispatch.mock.calls.filter(
        ([action]) => action && action.type === 'UNKNOWN_AGES_CHANGED',
      );
      expect(unknownAgeDispatches.length).toBe(5);
    });
  });

});
