/**
 * ToolsResourceController — fetches toolsData.md, parses markdown, renders ToolsResourceView.
 *
 * @see src/pages/resource/ToolsResourcePage/ToolsResourceController.js
 */

jest.mock('axios');
jest.mock('../../../../src/utils/env', () => ({
  REACT_APP_STATIC_CONTENT_URL: 'https://static.example.com',
}));

jest.mock('../../../../src/pages/resource/ToolsResourcePage/parseToolsMarkdown', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    title: 'CCDI Hub Tools',
    Tools_Header: 'https://example.com/tools.png',
    toolsIntroText: 'Tools intro for unit test.',
    navTitles: ['Tools Topic One', 'Tool Subsection A'],
    toolsContent: [
      {
        id: 'tools_section_one',
        topic: 'Tools Topic One',
        list: [
          {
            id: 'tools_sub_a',
            subtopic: 'Tool Subsection A',
            content: 'Tool section body for testing.',
          },
        ],
      },
    ],
  })),
}));

jest.mock('../../../../src/pages/resource/ToolsResourcePage/ToolsResourceView', () => (
  function MockToolsResourceView({ data }) {
    return <div>{data?.toolsContent?.[0]?.topic || 'no-content'}</div>;
  }
));

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import parseToolsMarkdown from '../../../../src/pages/resource/ToolsResourcePage/parseToolsMarkdown';
import ToolsResourceController from '../../../../src/pages/resource/ToolsResourcePage/ToolsResourceController';

beforeEach(() => {
  jest.clearAllMocks();
  document.title = 'Initial Title';
  axios.get.mockResolvedValue({ data: 'tools-markdown' });
  global.MutationObserver = class {
    constructor() {
      this.observe = jest.fn();
      this.disconnect = jest.fn();
      this.takeRecords = jest.fn(() => []);
    }
  };
});

describe('ToolsResourceController', () => {
  it('should fetch toolsData.md and render tools content when toolsContent exists', async () => {
    render(
      <MemoryRouter initialEntries={['/tools']}>
        <ToolsResourceController />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/static\.example\.com\/toolsData\.md\?ts=\d+$/),
      );
    });
    expect(parseToolsMarkdown).toHaveBeenCalledWith('tools-markdown');

    await waitFor(() => {
      expect(screen.getByText('Tools Topic One')).toBeInTheDocument();
    });
  });

  it('should set document title from parsed front matter title', async () => {
    render(
      <MemoryRouter initialEntries={['/tools']}>
        <ToolsResourceController />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(document.title).toBe('CCDI Hub Tools');
    });
  });

  it('should render an empty div when parsed data has no toolsContent', async () => {
    parseToolsMarkdown.mockReturnValueOnce({ title: 'Tools', toolsContent: undefined });

    const { container } = render(
      <MemoryRouter initialEntries={['/tools']}>
        <ToolsResourceController />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
    expect(screen.queryByText('Tools Topic One')).not.toBeInTheDocument();
    expect(container.querySelector('div').textContent).toBe('');
  });
});
