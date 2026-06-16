/**
 * ReleaseNotePageController — loads release notes markdown via axios.
 */

jest.mock('axios');

jest.mock('../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_STATIC_CONTENT_URL: 'https://static.example',
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
import { sampleReleaseNotesMarkdownRaw } from '../../fixtures/resource/releaseNotesMarkdownSamples';

describe('ReleaseNotePageController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch markdown and render release notes view when data is valid', async () => {
    axios.get.mockResolvedValue({ data: sampleReleaseNotesMarkdownRaw });

    render(<ReleaseNotePageController />);

    await waitFor(() => {
      expect(screen.getByTestId('release-notes-view')).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringMatching(/^https:\/\/static\.example\/releaseNotesData\.md\?ts=/),
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(screen.getByText('CCDI Hub Release 2.10.0')).toBeInTheDocument();
    expect(screen.getByText('CCDI Hub Minor Release 2.5.1')).toBeInTheDocument();
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

  it('should handle fetch errors without throwing', async () => {
    axios.get.mockRejectedValue(new Error('network'));

    const { container } = render(<ReleaseNotePageController />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
