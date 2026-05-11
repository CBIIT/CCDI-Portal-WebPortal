import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroMobile from '../../../../src/pages/landing/component/heroMobile';

jest.mock('../../../../src/pages/landing/component/PageVisibility', () => ({
  __esModule: true,
  default: jest.fn(() => true),
}));

jest.mock('../../../../src/bento/landingPageData', () => ({
  carouselList: [
    { content: 'Card One', link: 'https://example.test/one', mobile: 'm1' },
    { content: 'Card Two', link: 'https://example.test/two', mobile: 'm2' },
    { content: 'Card Three', link: 'https://example.test/three', mobile: 'm3' },
  ],
}));

describe('HeroMobile', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 768,
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should render hero title and carousel cards', () => {
    render(<HeroMobile />);
    expect(screen.getByText(/Discover/)).toBeInTheDocument();
    expect(screen.getByText('Card One')).toBeInTheDocument();
    expect(screen.getByText('Card Two')).toBeInTheDocument();
  });

  it('should toggle pause button style and support arrows', () => {
    const { container } = render(<HeroMobile />);
    const pauseButton = container.querySelector('.pauseButtonContainer');
    const arrowButtons = container.querySelectorAll('.arrowButtonContainer');
    const list = container.querySelector('#mcarouselList');
    const initialCount = list.children.length;

    expect(pauseButton.getAttribute('style') || '').not.toContain('padding-left: 5px');
    fireEvent.click(pauseButton);
    expect(pauseButton.getAttribute('style') || '').toContain('padding-left: 5px');

    fireEvent.click(arrowButtons[0]);
    fireEvent.click(arrowButtons[1]);
    expect(list.children.length).toBe(initialCount);
  });
});
