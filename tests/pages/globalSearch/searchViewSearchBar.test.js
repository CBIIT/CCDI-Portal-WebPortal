/**
 * Global Search **`searchView`** hero search bar — mounts the real **`SearchBarGenerator`**.
 *
 * Covers the parts the library does not handle itself: the input placeholder
 * (re-applied on every render because the library remounts the search bar) and
 * the "Search" button submitting the keyword.
 *
 * @see src/pages/globalSearch/searchView.js
 */

import React from 'react';
import {
  act, render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import SearchView from '../../../src/pages/globalSearch/searchView';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: { query: jest.fn() },
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

jest.mock('../../../src/bento/sitesearch', () => ({
  SEARCH_PAGE_KEYS: { private: [], public: [] },
  SEARCH_PAGE_DATAFIELDS: { private: [], public: [] },
  queryCountAPI: jest.fn(() => Promise.resolve({ participant_count: 2925043 })),
  queryAutocompleteAPI: jest.fn(() => Promise.resolve({})),
  queryResultAPI: jest.fn(() => Promise.resolve([])),
}));

const theme = createMuiTheme();

const renderPage = (entry) => render(
  <ThemeProvider theme={theme}>
    <MemoryRouter initialEntries={[entry]}>
      <Routes>
        <Route
          path="/sitesearch"
          element={<SearchView isSignedIn isAuthorized publicAccessEnabled={false} />}
        />
      </Routes>
    </MemoryRouter>
  </ThemeProvider>,
);

describe('Global Search — hero search bar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
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

  it('should show the placeholder and use the responsive Search button icon', async () => {
    renderPage('/sitesearch');

    const input = await screen.findByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Search CCDI Hub');
    expect(document.getElementById('global_search_input_find')).toBeNull();
    expect(screen.getByRole('button', { name: 'Search' }).querySelector('svg')).toBeInTheDocument();
  });

  it('should keep the placeholder after counts re-render the page', async () => {
    renderPage('/sitesearch?keyword=alpha');

    await waitFor(() => {
      expect(screen.getAllByText('2,925,043').length).toBeGreaterThan(0);
    });

    expect(await screen.findByRole('textbox')).toHaveAttribute('placeholder', 'Search CCDI Hub');
  });

  it('should navigate with the typed keyword when the Search button is clicked', async () => {
    renderPage('/sitesearch');

    const input = await screen.findByRole('textbox');
    fireEvent.change(input, { target: { value: 'tumor' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    });

    expect(mockNavigate).toHaveBeenCalledWith('/sitesearch?keyword=tumor');
  });

  it('should select a results category from the mobile dropdown', async () => {
    renderPage('/sitesearch?keyword=alpha');

    const categorySelect = await screen.findByLabelText('Search result category');
    fireEvent.change(categorySelect, { target: { value: '2' } });

    expect(categorySelect).toHaveValue('2');
    expect(screen.getByRole('tab', { name: /participants/i })).toHaveAttribute('aria-selected', 'true');
  });

  it('should list the category counts in the mobile dropdown', async () => {
    renderPage('/sitesearch?keyword=alpha');

    const categorySelect = await screen.findByLabelText('Search result category');

    await waitFor(() => {
      expect(categorySelect).toHaveTextContent('All (2,925,043)');
    });
    expect(categorySelect).toHaveTextContent('Participants (2,925,043)');
    expect(categorySelect).toHaveTextContent('Studies (0)');
  });

  it('should show the results total with thousands separators', async () => {
    renderPage('/sitesearch?keyword=alpha');

    await waitFor(() => {
      expect(document.getElementById('global_search_results_count')).toHaveTextContent('2,925,043');
    });
  });
});
