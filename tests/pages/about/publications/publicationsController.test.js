/**
 * Publications page — **controller** loads YAML and renders **`PublicationsView`** when data is present.
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

jest.mock('js-yaml', () => ({
  safeLoad: jest.fn(() => ({
    publicationsList: [
      {
        id: 'pub-1',
        title: 'Loaded From YAML',
        date: '2024',
        summary: 'Summary content for testing.',
        tag: 'test',
        category: 'Primary',
        link: 'https://example.test/pub',
      },
    ],
    Publications_Header: '',
    bannerText: 'Banner from YAML',
  })),
}));

import React from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import PublicationsController from '../../../../src/pages/about/publications/publicationsController';

describe('PublicationsController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValue({ data: 'mock-yaml-bytes' });
    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
    window.scrollTo = jest.fn();
  });

  it('should fetch publications YAML and render the publications view', async () => {
    render(<PublicationsController />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
    expect(yaml.safeLoad).toHaveBeenCalledWith('mock-yaml-bytes');

    await waitFor(() => {
      expect(screen.getByText('CCDI-Supported Publications')).toBeInTheDocument();
    });
    expect(screen.getByText('Banner from YAML')).toBeInTheDocument();
    expect(screen.getByText('Loaded From YAML')).toBeInTheDocument();
  });

  it('should render empty shell when publicationsList is missing', async () => {
    yaml.safeLoad.mockReturnValueOnce({});
    render(<PublicationsController />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    expect(screen.queryByText('CCDI-Supported Publications')).not.toBeInTheDocument();
    expect(document.body.firstChild).toBeTruthy();
  });
});
