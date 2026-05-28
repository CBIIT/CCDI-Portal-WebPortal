/**
 * About page — controller loads YAML and renders AboutView.
 *
 * @see src/pages/about/AboutPage/AboutController.js
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
    About_Img: '',
    aboutData: {
      upperTitle: 'About Upper',
    },
  })),
}));

jest.mock('../../../../src/pages/about/AboutPage/AboutView', () => (
  function MockAboutView({ data }) {
    return <div>{data?.aboutData?.upperTitle || 'no-data'}</div>;
  }
));

import React from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutController from '../../../../src/pages/about/AboutPage/AboutController';

describe('AboutController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValue({ data: 'about-yaml' });
    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
  });

  it('should fetch and parse YAML then pass data to AboutView', async () => {
    render(<AboutController />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
    expect(yaml.safeLoad).toHaveBeenCalledWith('about-yaml');

    await waitFor(() => {
      expect(screen.getByText('About Upper')).toBeInTheDocument();
    });
  });

  it('should keep rendering when fetch fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('network-fail'));
    render(<AboutController />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
    expect(screen.getByText('no-data')).toBeInTheDocument();
  });
});
