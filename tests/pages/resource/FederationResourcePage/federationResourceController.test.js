/**
 * FederationResourceController — fetches federationData.md, parses markdown, renders view.
 *
 * @see src/pages/resource/FederationResourcePage/FederationResourceController.js
 */

jest.mock('axios');
jest.mock('../../../../src/utils/env', () => ({
  REACT_APP_STATIC_CONTENT_URL: 'https://static.example.com',
}));

jest.mock('../../../../src/pages/resource/FederationResourcePage/parseFederationMarkdown', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    title: 'CCDI Data Federation Resource',
    Federation_Header: 'https://example.com/federation-header.png',
    CCDI_Federation_Data_Access: 'https://example.com/federation-diagram.png',
    federationIntroText: 'Federation intro for unit test.',
    navTitles: ['Federation Overview'],
    federationContent: [
      {
        id: 'fed_overview',
        topic: 'Federation Overview',
        content: 'Federation body content.',
      },
    ],
  })),
}));

jest.mock('../../../../src/pages/resource/FederationResourcePage/FederationResourceView', () => (
  function MockFederationResourceView({ data }) {
    return <div>{data?.federationContent?.[0]?.topic || 'no-content'}</div>;
  }
));

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import parseFederationMarkdown from '../../../../src/pages/resource/FederationResourcePage/parseFederationMarkdown';
import FederationResourceController from '../../../../src/pages/resource/FederationResourcePage/FederationResourceController';

beforeEach(() => {
  jest.clearAllMocks();
  document.title = 'Initial Title';
  axios.get.mockResolvedValue({ data: 'federation-markdown' });
  global.MutationObserver = class {
    constructor() {
      this.observe = jest.fn();
      this.disconnect = jest.fn();
      this.takeRecords = jest.fn(() => []);
    }
  };
});

describe('FederationResourceController', () => {
  it('should fetch federationData.md and render federation content', async () => {
    render(
      <MemoryRouter initialEntries={['/federation']}>
        <FederationResourceController />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/static\.example\.com\/federationData\.md\?ts=\d+$/),
      );
    });
    expect(parseFederationMarkdown).toHaveBeenCalledWith('federation-markdown');

    await waitFor(() => {
      expect(screen.getByText('Federation Overview')).toBeInTheDocument();
    });
  });

  it('should set document title from parsed front matter title', async () => {
    render(
      <MemoryRouter initialEntries={['/federation']}>
        <FederationResourceController />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(document.title).toBe('CCDI Data Federation Resource');
    });
  });

  it('should render an empty div when parsed data has no federationContent', async () => {
    parseFederationMarkdown.mockReturnValueOnce({ title: 'Federation', federationContent: undefined });

    const { container } = render(
      <MemoryRouter initialEntries={['/federation']}>
        <FederationResourceController />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
    expect(screen.queryByText('Federation Overview')).not.toBeInTheDocument();
    expect(container.querySelector('div').textContent).toBe('');
  });
});
