import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LatestUpdate from '../../../../src/pages/landing/component/latestUpdate';

jest.mock('../../../../src/pages/landing/component/PageVisibility', () => ({
  __esModule: true,
  default: jest.fn(() => true),
}));

jest.mock('../../../../src/bento/landingPageData', () => ({
  titleData: { latestUpdatesTitle: 'Latest Updates' },
}));

const newsList = [
  { id: 'n1', title: 'News 1', date: '2025-01-03', latestUpdate: true, slug: 'First slug', img: 'img1' },
  { id: 'n2', title: 'News 2', date: '2025-01-02', latestUpdate: true, slug: 'Second slug', img: 'img2' },
  { id: 'n3', title: 'News 3', date: '2025-01-01', latestUpdate: true, slug: 'Third slug', img: 'img3' },
];

const releaseNotesList = [
  { id: 'r1', title: 'Release 1', date: '2024-12-01', latestUpdate: true, slug: 'Release slug', img: 'img4' },
];

const srcList = { img1: 's1', img2: 's2', img3: 's3', img4: 's4' };
const altList = { img1: 'a1', img2: 'a2', img3: 'a3', img4: 'a4' };

describe('LatestUpdate', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    Object.defineProperty(document.documentElement, 'clientWidth', {
      configurable: true,
      value: 1200,
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should render title and latest update cards', async () => {
    const { container } = render(
      <LatestUpdate
        newsList={newsList}
        srcList={srcList}
        releaseNotesList={releaseNotesList}
        altList={altList}
      />,
    );

    expect(screen.getByText('Latest Updates')).toBeInTheDocument();
    await waitFor(() => {
      expect(container.querySelectorAll('.latestUpdatesListItem').length).toBeGreaterThan(0);
    });
  });

  it('should support carousel controls and pause toggle', async () => {
    const { container } = render(
      <LatestUpdate
        newsList={newsList}
        srcList={srcList}
        releaseNotesList={releaseNotesList}
        altList={altList}
      />,
    );
    await waitFor(() => {
      expect(container.querySelector('#latestList')).toBeInTheDocument();
    });

    const pauseButton = container.querySelector('.pauseButtonContainer');
    const arrows = container.querySelectorAll('.arrowButtonContainer');
    const list = container.querySelector('#latestList');
    const initialCount = list.children.length;

    fireEvent.click(pauseButton);
    fireEvent.click(arrows[0]);
    fireEvent.click(arrows[1]);

    expect(list.children.length).toBe(initialCount);
  });
});
