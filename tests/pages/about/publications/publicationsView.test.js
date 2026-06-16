/**
 * Publications page — presentational view (tabs, search, pagination, modal).
 *
 * @see src/pages/about/publications/publicationsView.js
 */

import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import PublicationsView from '../../../../src/pages/about/publications/publicationsView';
import {
  publicationMinimal,
  publicationWithMetadata,
  publicationLongSummary,
  buildPublicationList,
} from '../../../fixtures/about/publicationsViewProps';

const theme = createTheme();

function renderPublicationsView(props = {}) {
  return render(
    <ThemeProvider theme={theme}>
      <PublicationsView
        headerImg=""
        bannerText="Test banner subtitle"
        publicationsList={[publicationMinimal]}
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

  describe('Rendering', () => {
    it('should render header, banner, and publication row', () => {
      const { container } = renderPublicationsView();
      expect(screen.getByText('CCDI-Supported Publications')).toBeInTheDocument();
      expect(screen.getByText('Test banner subtitle')).toBeInTheDocument();
      expect(screen.getByText('Example Publication Title')).toBeInTheDocument();
      expectTotalResults(container, '1 results');
    });

    it('should render journal, pmid, and type metadata when present', () => {
      renderPublicationsView({ publicationsList: [publicationWithMetadata] });
      expect(screen.getByText('Nature Medicine')).toBeInTheDocument();
      expect(screen.getByText('12345678')).toBeInTheDocument();
      expect(screen.getByText('Poster')).toBeInTheDocument();
    });

    it('should truncate summaries longer than 485 characters', () => {
      renderPublicationsView({ publicationsList: [publicationLongSummary] });
      expect(screen.getByText(/\.\.\.$/)).toBeInTheDocument();
    });
  });

  describe('Search', () => {
    it('should filter list when search keyword is applied', async () => {
      const { container } = renderPublicationsView({
        publicationsList: [
          publicationMinimal,
          {
            ...publicationMinimal,
            id: 'pub-2',
            title: 'Other Topic Paper',
            summary: 'Different content',
            tag: 'other',
          },
        ],
      });

      fireEvent.change(screen.getByPlaceholderText('Search Publications'), {
        target: { value: 'Other Topic' },
      });
      fireEvent.click(screen.getByText('Search'));

      await waitFor(() => {
        expect(screen.getByText('Other Topic Paper')).toBeInTheDocument();
      });
      expect(screen.queryByText('Example Publication Title')).not.toBeInTheDocument();
      expectTotalResults(container, '1 results');
    });

    it('should show clear icon on search bar hover', () => {
      renderPublicationsView();
      const searchBar = document.querySelector('.searchButton').parentElement;
      fireEvent.mouseOver(searchBar);
      expect(document.querySelector('.deleteIconImg').style.display).toBe('block');
      fireEvent.mouseOut(searchBar);
      expect(document.querySelector('.deleteIconImg').style.display).toBe('none');
    });

    it('should clear search input when clear icon is clicked', () => {
      renderPublicationsView();
      const input = screen.getByPlaceholderText('Search Publications');
      fireEvent.change(input, { target: { value: 'test' } });
      fireEvent.click(document.querySelector('.deleteIcon'));
      expect(input).toHaveValue('');
    });

    it('should show empty state when no publications match', async () => {
      const { container } = renderPublicationsView();
      fireEvent.change(screen.getByPlaceholderText('Search Publications'), {
        target: { value: 'no-match-xyz' },
      });
      fireEvent.click(screen.getByText('Search'));
      await waitFor(() => {
        expectTotalResults(container, '0 results');
      });
      expect(screen.queryByText('Example Publication Title')).not.toBeInTheDocument();
    });
  });

  describe('Tabs', () => {
    it('should switch to Primary tab and show only primary category items', async () => {
      renderPublicationsView({
        publicationsList: [
          publicationMinimal,
          {
            ...publicationMinimal,
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

    it('should switch category from mobile dropdown', async () => {
      renderPublicationsView({
        publicationsList: [
          publicationMinimal,
          {
            ...publicationMinimal,
            id: 'pub-abs',
            title: 'Abstract Paper',
            category: 'Abstracts',
            summary: 'Abstract summary',
          },
        ],
      });

      const dropdownToggle = document.querySelector('.tabDropdownItem.first');
      fireEvent.click(dropdownToggle);
      const abstractItem = screen.getAllByText('Abstracts')
        .find((el) => el.closest('.tabDropdownItem'));
      fireEvent.click(abstractItem);

      await waitFor(() => {
        expect(screen.getByText('Abstract Paper')).toBeInTheDocument();
      });
      expect(screen.queryByText('Example Publication Title')).not.toBeInTheDocument();
    });
  });

  describe('Pagination', () => {
    it('should paginate results and advance pages', async () => {
      renderPublicationsView({
        publicationsList: buildPublicationList(12),
      });

      expect(screen.getByText('Publication 1')).toBeInTheDocument();
      expect(screen.queryByText('Publication 11')).not.toBeInTheDocument();

      fireEvent.click(screen.getByLabelText('Go to page 2'));

      await waitFor(() => {
        expect(screen.getByText('Publication 11')).toBeInTheDocument();
      });
      expect(window.scrollTo).toHaveBeenCalled();
    });

    it('should toggle per-page size list visibility', () => {
      renderPublicationsView();
      const pagelist = document.getElementById('pagelist');
      expect(pagelist.style.visibility).toBe('hidden');
      fireEvent.click(document.getElementById('pageSizeBlock'));
      expect(pagelist.style.visibility).not.toBe('hidden');
    });

    it('should close per-page dropdown when clicking outside', () => {
      renderPublicationsView();
      fireEvent.click(document.getElementById('pageSizeBlock'));
      expect(document.getElementById('pagelist').style.visibility).not.toBe('hidden');
      fireEvent.mouseDown(document.body);
      expect(document.getElementById('pagelist').style.visibility).toBe('hidden');
    });

    it('should navigate with next and previous controls', async () => {
      renderPublicationsView({
        publicationsList: buildPublicationList(12),
      });

      const pagination = document.querySelector('[class*="paginationContainer"]');
      const nextButton = pagination.querySelector('[class*="nextButtonContainer"]:not([class*="Disabled"])');
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText('Publication 11')).toBeInTheDocument();
      });

      const prevButton = pagination.querySelector('[class*="prevButtonContainer"]:not([class*="Disabled"])');
      fireEvent.click(prevButton);

      await waitFor(() => {
        expect(screen.getByText('Publication 1')).toBeInTheDocument();
      });
    });
  });

  describe('Learn more modal', () => {
    it('should open and close category help modal', () => {
      renderPublicationsView();

      fireEvent.click(screen.getByText(/learn more about these categories/i));
      expect(screen.getByText(/Primary category:/i)).toBeInTheDocument();
      expect(screen.getByText(/Secondary category:/i)).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: '×' }));
      expect(screen.queryByText(/Primary category:/i)).not.toBeInTheDocument();
    });

    it('should close modal when backdrop is clicked', () => {
      renderPublicationsView();
      fireEvent.click(screen.getByText(/learn more about these categories/i));
      const modal = document.querySelector('.learnMoreModal');
      fireEvent.click(modal);
      expect(screen.queryByText(/Primary category:/i)).not.toBeInTheDocument();
    });

    it('should keep modal open when modal content is clicked', () => {
      renderPublicationsView();
      fireEvent.click(screen.getByText(/learn more about these categories/i));
      fireEvent.click(document.querySelector('.learnMoreModalContent'));
      expect(screen.getByText(/Primary category:/i)).toBeInTheDocument();
    });
  });
});
