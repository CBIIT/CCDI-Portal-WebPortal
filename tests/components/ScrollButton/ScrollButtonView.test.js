/**
 * Unit tests for ScrollButton — scroll listener toggles visibility; click calls `window.scrollTo`.
 * Mocks `window.scrollTo` per tests/TEST_STRUCTURE.md (global/window).
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScrollButton from '../../../src/components/ScrollButton/ScrollButtonView';

describe('ScrollButton', () => {
  let scrollTopValue;

  beforeEach(() => {
    window.scrollTo = jest.fn();
    scrollTopValue = 0;
    Object.defineProperty(document.documentElement, 'scrollTop', {
      configurable: true,
      get() {
        return scrollTopValue;
      },
      set(v) {
        scrollTopValue = v;
      },
    });
  });

  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<ScrollButton />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should start hidden when scroll position is at the top', () => {
      const { container } = render(<ScrollButton />);
      const button = container.firstChild;
      expect(button).toHaveStyle({ visibility: 'hidden', opacity: '0' });
    });
  });

  describe('Scroll visibility', () => {
    it('should become visible when scrollTop exceeds 200', () => {
      const { container } = render(<ScrollButton />);
      scrollTopValue = 250;
      fireEvent.scroll(window);
      const button = container.firstChild;
      expect(button).toHaveStyle({ visibility: 'visible', opacity: '1' });
    });

    it('should hide again when scroll returns to 200 or below', () => {
      const { container } = render(<ScrollButton />);
      scrollTopValue = 300;
      fireEvent.scroll(window);
      scrollTopValue = 100;
      fireEvent.scroll(window);
      const button = container.firstChild;
      expect(button).toHaveStyle({ visibility: 'hidden', opacity: '0' });
    });
  });

  describe('Side effects', () => {
    it('should call window.scrollTo with smooth scroll to top on click', () => {
      const { container } = render(<ScrollButton />);
      scrollTopValue = 400;
      fireEvent.scroll(window);
      fireEvent.click(container.firstChild);
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });
  });
});
