import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import NewsView from '../../../src/pages/news/newsView';

const theme = createTheme();

const newsList = [
  {
    id: 'news-1',
    type: 'News',
    title: 'Regular News Item',
    date: '2025-01-10',
    highlight: '<p>Regular highlight</p>',
    img: 'img1',
  },
  {
    id: 'app-1',
    type: 'CCDI Application Updates',
    title: 'Application Update Item',
    date: '2025-01-09',
    highlight: '<p>Application update highlight</p>',
    img: 'img2',
  },
];

const releaseNotesList = [
  {
    id: 'rn-1',
    type: 'Release Notes',
    title: 'Release Notes Item',
    date: '2025-01-08',
    version: 'v1.2.3',
    fullText: '<p>Release notes full text</p>',
    img: 'img3',
  },
];

const srcList = { img1: 'news1', img2: 'news2', img3: 'news3' };
const altList = { img1: 'alt1', img2: 'alt2', img3: 'alt3' };

function renderNewsView(props = {}) {
  return render(
    <ThemeProvider theme={theme}>
      <NewsView
        srcList={srcList}
        newsList={newsList}
        altList={altList}
        releaseNotesList={releaseNotesList}
        {...props}
      />
    </ThemeProvider>,
  );
}

describe('NewsView', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
    window.open = jest.fn(() => ({ opener: {} }));
    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
  });

  it('should render header and initial tab data', () => {
    const { container } = renderNewsView();

    expect(screen.getByText('Hub News and Updates')).toBeInTheDocument();
    expect(screen.getAllByText('Regular News Item').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Application Update Item').length).toBeGreaterThan(0);
    expect(container.querySelector('.numResults')).toHaveTextContent('3 results');
  });

  it('should switch to release notes tab and open pdf/read more links', async () => {
    const { container } = renderNewsView();
    const releaseTab = Array.from(container.querySelectorAll('.tabListItem')).find(
      (node) => node.textContent === 'Release Notes',
    );
    fireEvent.click(releaseTab);

    await waitFor(() => {
      expect(screen.getAllByText('Release Notes Item').length).toBeGreaterThan(0);
    });

    const pdfButton = container.querySelector('.downloadPDF');
    const readMoreButton = container.querySelector('.readMore');
    fireEvent.click(pdfButton);
    fireEvent.click(readMoreButton);

    expect(window.open).toHaveBeenCalledWith('/CCDI_Hub_Release_Notes.pdf', '_blank');
    expect(window.open).toHaveBeenCalledWith('/release-notes#rn-1', '_blank');
  });
});
