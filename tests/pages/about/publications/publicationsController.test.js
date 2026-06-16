/**
 * Publications page — **controller** loads markdown and renders **`PublicationsView`** when data is present.
 *
 * @see src/pages/about/publications/publicationsController.js
 */

jest.mock('../../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_STATIC_CONTENT_URL: 'https://example.test/static',
  },
}));

jest.mock('axios');

jest.mock('../../../../src/pages/about/publications/parsePublicationsMarkdown', () => ({
  parsePublicationsMarkdown: jest.fn(() => ({
    publicationsList: [
      {
        id: 'pub-1',
        title: 'Loaded From Markdown',
        date: '2024',
        summary: '<p>Summary content for testing.</p>',
        tag: 'test',
        category: 'Primary',
        link: 'https://example.test/pub',
      },
    ],
    Publications_Header: '',
    bannerText: 'Banner from markdown',
  })),
}));

import React from 'react';
import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import PublicationsController from '../../../../src/pages/about/publications/publicationsController';
import { parsePublicationsMarkdown } from '../../../../src/pages/about/publications/parsePublicationsMarkdown';

describe('PublicationsController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValue({ data: 'mock-markdown-bytes' });
    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
    window.scrollTo = jest.fn();
  });

  it('should fetch publications markdown and render the publications view', async () => {
    render(<PublicationsController />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
    expect(axios.get.mock.calls[0][0]).toMatch(/\/publicationsData\.md\?ts=/);
    expect(parsePublicationsMarkdown).toHaveBeenCalledWith('mock-markdown-bytes');

    await waitFor(() => {
      expect(screen.getByText('CCDI-Supported Publications')).toBeInTheDocument();
    });
    expect(screen.getByText('Banner from markdown')).toBeInTheDocument();
    expect(screen.getByText('Loaded From Markdown')).toBeInTheDocument();
  });

  it('should render empty shell when publicationsList is missing', async () => {
    parsePublicationsMarkdown.mockReturnValueOnce({});
    render(<PublicationsController />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    expect(screen.queryByText('CCDI-Supported Publications')).not.toBeInTheDocument();
    expect(document.body.firstChild).toBeTruthy();
  });
});
