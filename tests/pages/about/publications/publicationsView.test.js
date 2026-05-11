/**
 * Publications page — **presentational view** (tabs, search, list shell).
 *
 * Uses **`ThemeProvider`** for `withStyles`; stubs **`window.scrollTo`** for pagination.
 *
 * @see src/pages/about/publications/publicationsView.js
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

import PublicationsView from '../../../../src/pages/about/publications/publicationsView';

const theme = createTheme();

const minimalPublication = {
  id: 'pub-1',
  title: 'Example Publication Title',
  date: 'January 2024',
  summary: 'This is a short summary used for search and display.',
  tag: 'CCDI, Hub',
  category: 'Primary',
  conference: 'Test Conference',
  link: 'https://example.test/article',
};

function renderPublicationsView(props = {}) {
  return render(
    <ThemeProvider theme={theme}>
      <PublicationsView
        headerImg=""
        bannerText="Test banner subtitle"
        publicationsList={[minimalPublication]}
        {...props}
      />
    </ThemeProvider>,
  );
}

function expectTotalResults(container, text) {
  expect(container.querySelector('.totalNumContainer')).toHaveTextContent(text);
}

describe('PublicationsView', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
  });

  it('should render header, banner, and publication row', () => {
    const { container } = renderPublicationsView();
    expect(screen.getByText('CCDI-Supported Publications')).toBeInTheDocument();
    expect(screen.getByText('Test banner subtitle')).toBeInTheDocument();
    expect(screen.getByText('Example Publication Title')).toBeInTheDocument();
    expectTotalResults(container, '1 results');
  });

  it('should filter list when search keyword is applied', async () => {
    const { container } = renderPublicationsView({
      publicationsList: [
        minimalPublication,
        {
          ...minimalPublication,
          id: 'pub-2',
          title: 'Other Topic Paper',
          summary: 'Different content',
          tag: 'other',
        },
      ],
    });

    const input = screen.getByPlaceholderText('Search Publications');
    fireEvent.change(input, { target: { value: 'Other Topic' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('Other Topic Paper')).toBeInTheDocument();
    });
    expect(screen.queryByText('Example Publication Title')).not.toBeInTheDocument();
    expectTotalResults(container, '1 results');
  });

  it('should switch to Primary tab and show only primary category items', async () => {
    renderPublicationsView({
      publicationsList: [
        minimalPublication,
        {
          ...minimalPublication,
          id: 'pub-sec',
          title: 'Secondary Only Paper',
          category: 'Secondary',
          summary: 'Secondary summary text here.',
        },
      ],
    });

    fireEvent.click(screen.getByText('Primary'));

    await waitFor(() => {
      expect(screen.getByText('Example Publication Title')).toBeInTheDocument();
    });
    expect(screen.queryByText('Secondary Only Paper')).not.toBeInTheDocument();
  });
});
