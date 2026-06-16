/**
 * Shared DOM helpers for global search card truncation / measurement tests.
 */

import { fireEvent } from '@testing-library/react';

/**
 * Forces truncateTitle() to treat titles as wider than the card container.
 */
export function enableTitleTruncationMocks({
  containerWidth = 400,
  measuredTitleWidth = 5000,
} = {}) {
  const originalAppend = document.body.appendChild.bind(document.body);
  const appendSpy = jest.spyOn(document.body, 'appendChild').mockImplementation((el) => {
    if (
      el
      && el.nodeType === 1
      && el.nodeName === 'SPAN'
      && el.style
      && el.style.visibility === 'hidden'
    ) {
      Object.defineProperty(el, 'offsetWidth', {
        configurable: true,
        value: measuredTitleWidth,
      });
    }
    return originalAppend(el);
  });

  const setCardWidth = (cardEl) => {
    if (cardEl) {
      Object.defineProperty(cardEl, 'offsetWidth', {
        configurable: true,
        value: containerWidth,
      });
    }
  };

  const triggerResize = () => {
    fireEvent(window, new Event('resize'));
  };

  const restore = () => {
    appendSpy.mockRestore();
  };

  return { setCardWidth, triggerResize, restore };
}
