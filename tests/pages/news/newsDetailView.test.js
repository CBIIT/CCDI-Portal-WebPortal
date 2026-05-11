import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsDetailView from '../../../src/pages/news/newsDetailView';

jest.mock('../../../src/bento/newsData', () => ({
  newsList: [
    {
      id: 'detail-1',
      type: 'News',
      title: 'Detail News Title',
      date: '2025-02-01',
      slug: 'Detail image caption',
      detailImg: 'detail-image-src',
      fullText: '<p>Detail full text body.</p>',
    },
  ],
}));

describe('NewsDetailView', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
    window.history.pushState({}, '', '/newsdetail/detail-1');
  });

  it('should render selected detail page content and back link', () => {
    render(<NewsDetailView />);

    expect(screen.getByText('Hub News and Updates')).toBeInTheDocument();
    expect(screen.getByText('Detail News Title')).toBeInTheDocument();
    expect(screen.getByText('2025-02-01')).toBeInTheDocument();
    expect(screen.getByText('Detail full text body.')).toBeInTheDocument();
    expect(screen.getByText('Detail image caption')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Back to News and Updates Page' }),
    ).toHaveAttribute('href', '/news');
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
