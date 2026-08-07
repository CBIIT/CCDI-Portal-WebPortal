/**
 * FAQ page — filter index and accordion interaction tests.
 *
 * @see src/pages/about/FaqPage/FaqView.js
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('../../../../src/pages/about/FaqPage/FaqMarkdown', () => {
  const React = require('react');
  return function MockFaqMarkdown({ children }) {
    return <div data-testid="faq-markdown">{children}</div>;
  };
});

import FaqView from '../../../../src/pages/about/FaqPage/FaqView';
import { defaultFaqViewData } from '../../../fixtures/about/faqMarkdownSamples';

describe('FaqView', () => {
  it('should render banner, All Categories by default, and all collapsed questions', () => {
    render(<FaqView data={defaultFaqViewData} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('CCDI FAQs');
    expect(screen.getByTestId('faq-category-title')).toHaveTextContent('All Categories');
    expect(screen.getByTestId('faq-count-all')).toHaveTextContent('4');
    expect(screen.getByTestId('faq-count-data-exploration')).toHaveTextContent('2');
    expect(screen.getByTestId('faq-count-mci')).toHaveTextContent('1');
    expect(screen.getByTestId('faq-count-support')).toHaveTextContent('1');

    expect(screen.getByText('How can I apply for controlled data access to a CCDI-indexed study?')).toBeInTheDocument();
    expect(screen.getByText('What is the Molecular Characterization Initiative (MCI)?')).toBeInTheDocument();
    expect(screen.queryByTestId('faq-answer-controlled-access')).not.toBeInTheDocument();
  });

  it('should expand and collapse a FAQ card when its toggle is clicked', () => {
    render(<FaqView data={defaultFaqViewData} />);

    const toggle = screen.getByTestId('faq-toggle-controlled-access');
    fireEvent.click(toggle);
    expect(screen.getByTestId('faq-answer-controlled-access')).toBeInTheDocument();
    expect(screen.getByTestId('faq-markdown')).toHaveTextContent('NIH eRA Commons');

    fireEvent.click(toggle);
    expect(screen.queryByTestId('faq-answer-controlled-access')).not.toBeInTheDocument();
  });

  it('should filter to a category when clicked in the index', () => {
    render(<FaqView data={defaultFaqViewData} />);

    fireEvent.click(screen.getByTestId('faq-category-mci'));
    expect(screen.getByTestId('faq-category-title')).toHaveTextContent(
      'Molecular Characterization Initiative (MCI)',
    );
    expect(screen.getByText('What is the Molecular Characterization Initiative (MCI)?')).toBeInTheDocument();
    expect(screen.queryByText('How do I get help using the CCDI Hub?')).not.toBeInTheDocument();
    expect(screen.getByTestId('faq-category-mci')).toHaveClass('selected');
  });

  it('should clear filter when the highlighted category is clicked again', () => {
    render(<FaqView data={defaultFaqViewData} />);

    fireEvent.click(screen.getByTestId('faq-category-support'));
    expect(screen.getByTestId('faq-category-title')).toHaveTextContent('Support');
    expect(screen.queryByText('What is the Molecular Characterization Initiative (MCI)?')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('faq-category-support'));
    expect(screen.getByTestId('faq-category-title')).toHaveTextContent('All Categories');
    expect(screen.getByText('What is the Molecular Characterization Initiative (MCI)?')).toBeInTheDocument();
    expect(screen.getByTestId('faq-category-all')).toHaveClass('selected');
  });

  it('should switch filter when another category is selected', () => {
    render(<FaqView data={defaultFaqViewData} />);

    fireEvent.click(screen.getByTestId('faq-category-mci'));
    fireEvent.click(screen.getByTestId('faq-category-support'));

    expect(screen.getByTestId('faq-category-title')).toHaveTextContent('Support');
    expect(screen.getByText('How do I get help using the CCDI Hub?')).toBeInTheDocument();
    expect(screen.queryByText('What is the Molecular Characterization Initiative (MCI)?')).not.toBeInTheDocument();
    expect(screen.getByTestId('faq-category-support')).toHaveClass('selected');
    expect(screen.getByTestId('faq-category-mci')).not.toHaveClass('selected');
  });

  it('should restore all categories when All Categories is clicked', () => {
    render(<FaqView data={defaultFaqViewData} />);

    fireEvent.click(screen.getByTestId('faq-category-data-exploration'));
    fireEvent.click(screen.getByTestId('faq-category-all'));

    expect(screen.getByTestId('faq-category-title')).toHaveTextContent('All Categories');
    expect(screen.getByTestId('faq-list').querySelectorAll('.faqItem')).toHaveLength(4);
  });
});
