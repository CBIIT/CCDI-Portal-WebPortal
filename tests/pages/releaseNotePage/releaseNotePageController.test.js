/**
 * ReleaseNotePageController — loads release notes YAML via axios.
 */

jest.mock('axios');
jest.mock('js-yaml', () => ({
  safeLoad: jest.fn((data) => data),
}));

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
import yaml from 'js-yaml';
import ReleaseNotePageController from '../../../src/pages/releaseNotePage/releaseNotePageController';
import { minimalReleaseNotesPayload } from '../../fixtures/resource/releaseNoteFixtures';

describe('ReleaseNotePageController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    yaml.safeLoad.mockImplementation((data) => data);
  });

  it('should fetch YAML and render release notes view when data is valid', async () => {
    axios.get.mockResolvedValue({ data: minimalReleaseNotesPayload });

    render(<ReleaseNotePageController />);

    await waitFor(() => {
      expect(screen.getByTestId('release-notes-view')).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringMatching(/^https:\/\/static\.example\/newsData\.yaml\?ts=/),
    );
    expect(screen.getByText('Spring 2024 Release')).toBeInTheDocument();
    expect(screen.getByText('Winter 2023 Release')).toBeInTheDocument();
  });

  it('should render empty container when YAML has no releaseNotesList', async () => {
    axios.get.mockResolvedValue({ data: { contentTypeUrlList: {} } });

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
