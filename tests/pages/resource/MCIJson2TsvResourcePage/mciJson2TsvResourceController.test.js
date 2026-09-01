/**
 * MCIJson2TsvResourceController — fetches MCI_JSON2TSV.md and renders view.
 */

jest.mock('axios');
jest.mock('../../../../src/utils/env', () => ({
  REACT_APP_STATIC_CONTENT_URL: 'https://static.example.com',
}));

jest.mock('../../../../src/pages/resource/MCIJson2TsvResourcePage/parseMciJson2TsvMarkdown', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    title: 'CCDI MCI JSON2TSV',
    introText: 'JSON2TSV intro for unit test.',
    navTitles: ['Finding Section'],
    mciJson2TsvContent: [
      {
        id: 'FINDING_SECTION',
        topic: 'Finding Section',
        content: 'Finding body.',
      },
    ],
  })),
}));

jest.mock('../../../../src/pages/resource/MCIJson2TsvResourcePage/MCIJson2TsvResourceView', () => (
  function MockMCIJson2TsvResourceView({ data }) {
    return <div>{data?.mciJson2TsvContent?.[0]?.topic || 'no-content'}</div>;
  }
));

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import parseMciJson2TsvMarkdown from '../../../../src/pages/resource/MCIJson2TsvResourcePage/parseMciJson2TsvMarkdown';
import MCIJson2TsvResourceController from '../../../../src/pages/resource/MCIJson2TsvResourcePage/MCIJson2TsvResourceController';

beforeEach(() => {
  jest.clearAllMocks();
  document.title = 'Initial Title';
  axios.get.mockResolvedValue({ data: 'json2tsv-markdown' });
  global.MutationObserver = class {
    constructor() {
      this.observe = jest.fn();
      this.disconnect = jest.fn();
      this.takeRecords = jest.fn(() => []);
    }
  };
});

describe('MCIJson2TsvResourceController', () => {
  it('should fetch MCI_JSON2TSV.md and render content', async () => {
    render(
      <MemoryRouter initialEntries={['/MCI_JSON2TSV']}>
        <MCIJson2TsvResourceController />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/static\.example\.com\/MCI_JSON2TSV\.md\?ts=\d+$/),
      );
    });
    expect(parseMciJson2TsvMarkdown).toHaveBeenCalledWith('json2tsv-markdown');

    await waitFor(() => {
      expect(screen.getByText('Finding Section')).toBeInTheDocument();
    });
  });

  it('should set document title from parsed front matter title', async () => {
    render(
      <MemoryRouter initialEntries={['/MCI_JSON2TSV']}>
        <MCIJson2TsvResourceController />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(document.title).toBe('CCDI MCI JSON2TSV');
    });
  });

  it('should render an empty div when parsed data has no mciJson2TsvContent', async () => {
    parseMciJson2TsvMarkdown.mockReturnValueOnce({ title: 'JSON2TSV', mciJson2TsvContent: undefined });

    const { container } = render(
      <MemoryRouter initialEntries={['/MCI_JSON2TSV']}>
        <MCIJson2TsvResourceController />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
    expect(screen.queryByText('Finding Section')).not.toBeInTheDocument();
    expect(container.querySelector('div').textContent).toBe('');
  });
});
