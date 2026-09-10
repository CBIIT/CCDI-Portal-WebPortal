/**
 * ReleaseNotePageController — loads release notes markdown via axios.
 */

jest.mock('axios');

jest.mock('../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_STATIC_CONTENT_URL: 'https://static.example',
    REACT_APP_DATA_RELEASES_URL: 'https://data-releases.example',
  },
}));

jest.mock('../../../src/pages/releaseNotePage/releaseNotePageView', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: function MockReleaseNotesPageView({ releaseNotesList }) {
      return (
        <div data-testid="release-notes-view">
          {releaseNotesList.map((item) => (
            <span key={item.id}>{item.title}</span>
          ))}
        </div>
      );
    },
  };
});

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

if (typeof global.MutationObserver === 'undefined') {
  global.MutationObserver = class MutationObserver {
    disconnect() {}
    observe() {}
    takeRecords() { return []; }
  };
}
import axios from 'axios';
import ReleaseNotePageController from '../../../src/pages/releaseNotePage/releaseNotePageController';
import { sampleReleaseNotesMarkdownRaw, sampleCcdiDataUpdatesMarkdownRaw } from '../../fixtures/resource/releaseNotesMarkdownSamples';

describe('ReleaseNotePageController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch markdown and render release notes view when data is valid', async () => {
    axios.get.mockImplementation((url) => {
      const pathPart = String(url).split('?')[0];
      if (pathPart.endsWith('/releaseNotesData.md')) {
        return Promise.resolve({ data: sampleReleaseNotesMarkdownRaw });
      }
      if (pathPart.endsWith('/ccdiDataUpdates.md')) {
        return Promise.resolve({ data: sampleCcdiDataUpdatesMarkdownRaw });
      }
      return Promise.reject(new Error(`Unexpected URL: ${url}`));
    });

    render(<ReleaseNotePageController />);

    await waitFor(() => {
      expect(screen.getByTestId('release-notes-view')).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringMatching(/^https:\/\/static\.example\/releaseNotesData\.md\?ts=/),
    );
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringMatching(/^https:\/\/data-releases\.example\/ccdiDataUpdates\.md\?ts=/),
    );
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(screen.getByText('CCDI Hub Release 2.10.0')).toBeInTheDocument();
    expect(screen.getByText('CCDI Hub Minor Release 2.5.1')).toBeInTheDocument();
    expect(screen.queryByText('CCDI Data Release — March 2026')).not.toBeInTheDocument();
    expect(screen.queryByText('CCDI Data now searchable in Data Federation API')).not.toBeInTheDocument();
  });

  it('should render hub release notes when shared data updates fetch fails', async () => {
    axios.get.mockImplementation((url) => {
      const pathPart = String(url).split('?')[0];
      if (pathPart.endsWith('/releaseNotesData.md')) {
        return Promise.resolve({ data: sampleReleaseNotesMarkdownRaw });
      }
      if (pathPart.endsWith('/ccdiDataUpdates.md')) {
        return Promise.reject(new Error('network'));
      }
      return Promise.reject(new Error(`Unexpected URL: ${url}`));
    });

    render(<ReleaseNotePageController />);

    await waitFor(() => {
      expect(screen.getByTestId('release-notes-view')).toBeInTheDocument();
    });

    expect(screen.getByText('CCDI Hub Release 2.10.0')).toBeInTheDocument();
    expect(screen.queryByText('CCDI Data Release — March 2026')).not.toBeInTheDocument();
  });

  it('should render empty container when markdown has no release entries', async () => {
    axios.get.mockResolvedValue({ data: '' });

    const { container } = render(<ReleaseNotePageController />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    expect(screen.queryByTestId('release-notes-view')).not.toBeInTheDocument();
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('should handle both fetch errors without throwing', async () => {
    axios.get.mockRejectedValue(new Error('network'));

    const { container } = render(<ReleaseNotePageController />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
