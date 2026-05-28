import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carousel from '../../../../src/pages/landing/component/carousel';

jest.mock('../../../../src/pages/landing/component/PageVisibility', () => ({
  __esModule: true,
  default: jest.fn(() => true),
}));

jest.mock('../../../../src/bento/landingPageData', () => ({
  carouselList: [
    { content: 'Internal One', link: '/about', img: 'img-1' },
    { content: 'External Two', link: 'https://example.test/two', img: 'img-2' },
    { content: 'Internal Three', link: '/news', img: 'img-3' },
    { content: 'External Four', link: 'https://example.test/four', img: 'img-4' },
  ],
}));

describe('Carousel', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should render carousel items and toggle pause/start state', () => {
    render(
      <MemoryRouter>
        <Carousel />
      </MemoryRouter>,
    );

    expect(screen.getByText('Internal One')).toBeInTheDocument();
    expect(screen.getByText('External Two')).toBeInTheDocument();
    expect(screen.getByText('PAUSE')).toBeInTheDocument();

    fireEvent.click(screen.getByText('PAUSE'));
    expect(screen.getByText('START')).toBeInTheDocument();
  });

  it('should support manual up/down slide controls', () => {
    const { container } = render(
      <MemoryRouter>
        <Carousel />
      </MemoryRouter>,
    );

    const upButton = container.querySelector('.upButton');
    const downButton = container.querySelector('.downButton');
    const list = container.querySelector('#carouselList');
    const initialCount = list.children.length;

    fireEvent.click(downButton);
    fireEvent.click(upButton);

    expect(list.children.length).toBe(initialCount);
  });
});
