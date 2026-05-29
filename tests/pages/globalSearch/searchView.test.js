/**
 * Global Search **`searchView`** — page shell with mocked Bento generators + **`queryCountAPI`** (fixtures).
 *
 * Phase 4: does not mount full **`SearchResultsGenerator`** tables; asserts hero + mocked results region + dashboard query on load.
 *
 * @see src/pages/globalSearch/searchView.js
 */

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));

jest.mock('../../../src/pages/globalSearch/Cards', () => ({
  __esModule: true,
  ParticipantCard: () => null,
  AboutCard: () => null,
  StudiesCard: () => null,
  SamplesCard: () => null,
  FilesCard: () => null,
  ModelsCard: () => null,
}));

let capturedSearchBarFunctions;
let capturedSearchResultsFunctions;

jest.mock('@bento-core/global-search', () => ({
  SearchBarGenerator: (opts) => {
    capturedSearchBarFunctions = opts.functions;
    return {
      SearchBar: function MockSearchBar() {
        return <div data-testid="mock-global-search-bar" />;
      },
    };
  },
  SearchResultsGenerator: (opts) => {
    capturedSearchResultsFunctions = opts.functions;
    return {
      SearchResults: function MockSearchResults({ searchText }) {
        return (
          <div data-testid="mock-global-search-results">
            {searchText || ''}
          </div>
        );
      },
    };
  },
  countValues: jest.fn(() => 0),
}));

jest.mock('../../../src/bento/sitesearch', () => ({
  SEARCH_PAGE_KEYS: {
    private: ['gs_list', 'model_search'],
    public: [],
  },
  SEARCH_PAGE_DATAFIELDS: {
    private: ['autocomplete_list', 'node'],
    public: [],
  },
  queryCountAPI: jest.fn(() => Promise.resolve(
    require('../../fixtures/globalSearch/globalSearchApiResponses').globalSearchCountsFixture,
  )),
  queryAutocompleteAPI: jest.fn(() => Promise.resolve({})),
  queryResultAPI: jest.fn(() => Promise.resolve([])),
}));

import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import SearchView from '../../../src/pages/globalSearch/searchView';
import { queryAutocompleteAPI, queryCountAPI } from '../../../src/bento/sitesearch';

const theme = createMuiTheme();

describe('Global Search — searchView page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
    capturedSearchBarFunctions = undefined;
    capturedSearchResultsFunctions = undefined;
    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
    if (!document.createRange) {
      document.createRange = () => ({
        setStart: () => {},
        setEnd: () => {},
        commonAncestorContainer: document.body,
      });
    }
  });

  it('should load tab counts from queryCountAPI using the keyword query param', async () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/sitesearch?keyword=tumor']}>
          <Routes>
            <Route
              path="/sitesearch"
              element={(
                <SearchView
                  isSignedIn={false}
                  isAuthorized={false}
                  publicAccessEnabled={false}
                />
              )}
            />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(screen.getByRole('heading', { name: /search results/i })).toBeInTheDocument();
    expect(screen.getByTestId('mock-global-search-bar')).toBeInTheDocument();

    await waitFor(() => {
      expect(queryCountAPI).toHaveBeenCalledWith('tumor', true);
    });

    await waitFor(() => {
      expect(screen.getByTestId('mock-global-search-results')).toHaveTextContent('tumor');
    });
  });

  it('should request counts on mount when keyword query param is empty', async () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/sitesearch']}>
          <Routes>
            <Route
              path="/sitesearch"
              element={(
                <SearchView
                  isSignedIn={false}
                  isAuthorized={false}
                  publicAccessEnabled={false}
                />
              )}
            />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(queryCountAPI).toHaveBeenCalledWith('', true);
    });
  });

  it('should call queryCountAPI and navigate when search bar onChange receives a new keyword', async () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/sitesearch?keyword=alpha']}>
          <Routes>
            <Route
              path="/sitesearch"
              element={(
                <SearchView
                  isSignedIn
                  isAuthorized
                  publicAccessEnabled={false}
                />
              )}
            />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>,
    );

    await waitFor(() => expect(capturedSearchBarFunctions?.onChange).toBeDefined());

    jest.clearAllMocks();

    await act(async () => {
      capturedSearchBarFunctions.onChange('beta');
    });

    await waitFor(() => {
      expect(queryCountAPI).toHaveBeenCalledWith('beta');
    });

    expect(mockNavigate).toHaveBeenCalledWith('/sitesearch?keyword=beta');
  });

  it('should assemble autocomplete suggestions when getSuggestions runs for an authorized user', async () => {
    queryAutocompleteAPI.mockResolvedValueOnce({
      gs_list: [{ autocomplete_list: 'PID1' }],
      model_search: [{ node: 'MODEL1' }],
    });

    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/sitesearch']}>
          <Routes>
            <Route
              path="/sitesearch"
              element={(
                <SearchView
                  isSignedIn
                  isAuthorized
                  publicAccessEnabled={false}
                />
              )}
            />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>,
    );

    await waitFor(() => expect(capturedSearchBarFunctions?.getSuggestions).toBeDefined());

    let suggestions;
    await act(async () => {
      suggestions = await capturedSearchBarFunctions.getSuggestions({}, 'gene', '');
    });

    expect(queryAutocompleteAPI).toHaveBeenCalledWith('gene', false);
    expect(suggestions).toEqual(['GENE', 'PID1', 'MODEL1']);
  });

  it('should return empty suggestions when keyword is whitespace only', async () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/sitesearch']}>
          <Routes>
            <Route
              path="/sitesearch"
              element={(
                <SearchView
                  isSignedIn
                  isAuthorized
                  publicAccessEnabled={false}
                />
              )}
            />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>,
    );

    await waitFor(() => expect(capturedSearchBarFunctions?.getSuggestions).toBeDefined());

    let suggestions;
    await act(async () => {
      suggestions = await capturedSearchBarFunctions.getSuggestions({}, '   ', '');
    });
    expect(suggestions).toEqual([]);
  });

  it('should no-op inactive tab change when signed in but not authorized', async () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/sitesearch?keyword=test']}>
          <Routes>
            <Route
              path="/sitesearch"
              element={(
                <SearchView
                  isSignedIn
                  isAuthorized={false}
                  publicAccessEnabled={false}
                />
              )}
            />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>,
    );

    await waitFor(() => expect(capturedSearchResultsFunctions?.onTabChange).toBeDefined());
    expect(() => {
      capturedSearchResultsFunctions.onTabChange({}, 'inactive-2');
    }).not.toThrow();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
