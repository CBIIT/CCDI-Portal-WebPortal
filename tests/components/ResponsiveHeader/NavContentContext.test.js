/**
 * NavContentProvider — fetches navData.md and falls back to JS defaults.
 */

if (typeof global.MutationObserver === 'undefined') {
  global.MutationObserver = class MutationObserver {
    disconnect() {}
    observe() {}
    takeRecords() { return []; }
  };
}

jest.mock('../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_STATIC_CONTENT_URL: 'https://static.example.com',
    REACT_APP_C3DC: 'https://c3dc.test.example',
  },
}));

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { NavContentProvider, useNavContent } from '../../../src/components/ResponsiveHeader/NavContentContext';
import { sampleNavMarkdownRaw } from '../../fixtures/nav/navMarkdownSamples';

jest.mock('axios');

function NavProbe() {
  const { navMobileList, navbarSublists } = useNavContent();
  return (
    <div>
      <div data-testid="explore-link">{navMobileList.find((i) => i.name === 'Explore')?.link}</div>
      <div data-testid="about-sections">{navbarSublists.About.length}</div>
    </div>
  );
}

describe('NavContentProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load navData.md and expose resolved C3DC links', async () => {
    axios.get.mockResolvedValue({ data: sampleNavMarkdownRaw });
    render(
      <NavContentProvider>
        <NavProbe />
      </NavContentProvider>,
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/static\.example\.com\/navData\.md\?ts=/),
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('explore-link')).toHaveTextContent(
        'https://c3dc.test.example/explore',
      );
    });
    expect(Number(screen.getByTestId('about-sections').textContent)).toBeGreaterThan(0);
  });

  it('should keep JS defaults when navData.md fetch fails', async () => {
    axios.get.mockRejectedValue(new Error('network'));
    render(
      <NavContentProvider>
        <NavProbe />
      </NavContentProvider>,
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    expect(screen.getByTestId('explore-link').textContent).toContain('/explore');
  });
});
