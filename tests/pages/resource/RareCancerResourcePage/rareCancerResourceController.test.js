/**
 * RareCancerResourceController — fetches rareCancerData.md, parses markdown, renders view.
 *
 * @see src/pages/resource/RareCancerResourcePage/RareCancerResourceController.js
 */

jest.mock('axios');
jest.mock('../../../../src/utils/env', () => ({
  REACT_APP_STATIC_CONTENT_URL: 'https://static.example.com',
}));

jest.mock('../../../../src/pages/resource/RareCancerResourcePage/parseRareCancerMarkdown', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    title: 'Pediatric, Adolescent, and Young Adult Rare Cancer Study',
    RCI_Header: 'https://example.com/rare-cancer-header.png',
    RCI_Data_Flow_Chart_URL: 'https://example.com/rci-flow-chart.png',
    rareCancerIntroText: 'Rare cancer intro for unit test.',
    navTitles: ['Rare Cancer Topic', 'Rare Subsection'],
    rareCancerContent: [
      {
        id: 'rc_section',
        topic: 'Rare Cancer Topic',
        list: [
          {
            id: 'rc_sub',
            subtopic: 'Rare Subsection',
            content: 'Rare cancer subsection body.',
          },
        ],
      },
    ],
  })),
}));

jest.mock('../../../../src/pages/resource/RareCancerResourcePage/RareCancerResourceView', () => (
  function MockRareCancerResourceView({ data }) {
    return <div>{data?.rareCancerContent?.[0]?.topic || 'no-content'}</div>;
  }
));

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import parseRareCancerMarkdown from '../../../../src/pages/resource/RareCancerResourcePage/parseRareCancerMarkdown';
import RareCancerResourceController from '../../../../src/pages/resource/RareCancerResourcePage/RareCancerResourceController';

beforeEach(() => {
  jest.clearAllMocks();
  document.title = 'Initial Title';
  axios.get.mockResolvedValue({ data: 'rare-cancer-markdown' });
  global.MutationObserver = class {
    constructor() {
      this.observe = jest.fn();
      this.disconnect = jest.fn();
      this.takeRecords = jest.fn(() => []);
    }
  };
});

describe('RareCancerResourceController', () => {
  it('should fetch rareCancerData.md and render rare cancer content', async () => {
    render(
      <MemoryRouter initialEntries={['/pediatric-adolescent-and-young-adult-rare-cancer-study']}>
        <RareCancerResourceController />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/static\.example\.com\/rareCancerData\.md\?ts=\d+$/),
      );
    });
    expect(parseRareCancerMarkdown).toHaveBeenCalledWith('rare-cancer-markdown');

    await waitFor(() => {
      expect(screen.getByText('Rare Cancer Topic')).toBeInTheDocument();
    });
  });

  it('should set document title from parsed front matter title', async () => {
    render(
      <MemoryRouter initialEntries={['/pediatric-adolescent-and-young-adult-rare-cancer-study']}>
        <RareCancerResourceController />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(document.title).toBe('Pediatric, Adolescent, and Young Adult Rare Cancer Study');
    });
  });

  it('should render an empty div when parsed data has no rareCancerContent', async () => {
    parseRareCancerMarkdown.mockReturnValueOnce({ title: 'Rare Cancer', rareCancerContent: undefined });

    const { container } = render(
      <MemoryRouter initialEntries={['/pediatric-adolescent-and-young-adult-rare-cancer-study']}>
        <RareCancerResourceController />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
    expect(screen.queryByText('Rare Cancer Topic')).not.toBeInTheDocument();
    expect(container.querySelector('div').textContent).toBe('');
  });
});
