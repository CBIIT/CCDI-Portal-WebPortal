/**
 * About page — controller loads markdown and renders AboutView.
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

jest.mock('../../../../src/pages/about/AboutPage/parseAboutMarkdown', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    title: 'Childhood Cancer Data Initiative Hub',
    About_Img: 'https://example.com/about.png',
    aboutData: {
      upperTitle: 'Childhood Cancer Data Initiative Hub',
      upperText: 'Upper markdown',
      lowerTitle: 'Childhood Cancer Data Initiative',
      lowerText: 'Lower markdown',
      aboutText: 'Contact markdown',
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
import parseAboutMarkdown from '../../../../src/pages/about/AboutPage/parseAboutMarkdown';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutController from '../../../../src/pages/about/AboutPage/AboutController';

describe('AboutController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.title = 'Initial Title';
    axios.get.mockResolvedValue({ data: 'about-markdown' });
    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
  });

  it('should fetch and parse markdown then pass data to AboutView', async () => {
    render(<AboutController />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('https://example.test/static/aboutData.md'),
      );
    });
    expect(parseAboutMarkdown).toHaveBeenCalledWith('about-markdown');

    await waitFor(() => {
      expect(screen.getByText('Childhood Cancer Data Initiative Hub')).toBeInTheDocument();
    });
  });

  it('should set document title from parsed front matter title', async () => {
    render(<AboutController />);

    await waitFor(() => {
      expect(document.title).toBe('Childhood Cancer Data Initiative Hub');
    });
  });

  it('should keep rendering when fetch fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('network-fail'));
    render(<AboutController />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
    expect(screen.getByText('no-data')).toBeInTheDocument();
    expect(document.title).toBe('Initial Title');
  });
});
