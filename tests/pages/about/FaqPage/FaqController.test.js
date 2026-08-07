/**
 * FAQ page — controller loads markdown and conditionally renders view.
 *
 * @see src/pages/about/FaqPage/FaqController.js
 */

jest.mock('../../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_STATIC_CONTENT_URL: 'https://example.test/static',
  },
}));

jest.mock('axios');

jest.mock('../../../../src/pages/about/FaqPage/parseFaqMarkdown', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    title: 'CCDI FAQs',
    headerImage: '',
    categories: [{ id: 'support', name: 'Support' }],
    faqs: [{
      id: 'help',
      category: 'support',
      question: 'How do I get help?',
      answer: 'Contact support.',
    }],
  })),
}));

jest.mock('../../../../src/pages/about/FaqPage/FaqView', () => (
  function MockFaqView({ data }) {
    return <div>{data?.faqs?.[0]?.question || 'no-content'}</div>;
  }
));

import React from 'react';
import axios from 'axios';
import parseFaqMarkdown from '../../../../src/pages/about/FaqPage/parseFaqMarkdown';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FaqController from '../../../../src/pages/about/FaqPage/FaqController';

describe('FaqController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValue({ data: 'faq-markdown' });
    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
  });

  it('should request faqData.md with cache-bust query and render FaqView', async () => {
    render(<FaqController />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/\/faqData\.md\?ts=/),
      );
    });
    expect(parseFaqMarkdown).toHaveBeenCalledWith('faq-markdown');

    await waitFor(() => {
      expect(screen.getByText('How do I get help?')).toBeInTheDocument();
    });
  });

  it('should render empty div when parse returns null', async () => {
    parseFaqMarkdown.mockReturnValueOnce(null);
    const { container } = render(<FaqController />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
    expect(screen.queryByText('How do I get help?')).not.toBeInTheDocument();
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render empty div when fetch fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('network'));
    const { container } = render(<FaqController />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
    expect(screen.queryByText('How do I get help?')).not.toBeInTheDocument();
    expect(container.firstChild).toBeInTheDocument();
  });
});
