/**
 * Phase 3 — `src/utils/useVisitedPageSync.js`: hash → localStorage.
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { LAST_VISITED_HASH_KEY } from '../../src/bento/siteWideConfig';
import useVisitedPageSync from '../../src/utils/useVisitedPageSync';

function HookHost() {
  useVisitedPageSync();
  return null;
}

describe('useVisitedPageSync', () => {
  beforeEach(() => {
    localStorage.clear();
    window.location.hash = '';

    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
  });

  it('should persist location hash when it is not the login route', async () => {
    window.location.hash = '#/explore';
    render(<HookHost />);

    await waitFor(() => {
      expect(localStorage.getItem(LAST_VISITED_HASH_KEY)).toBe('#/explore');
    });
  });

  it('should not persist hash when current route is login', async () => {
    window.location.hash = '#/user/login';
    render(<HookHost />);

    await waitFor(() => {
      expect(localStorage.getItem(LAST_VISITED_HASH_KEY)).toBeNull();
    });
  });
});
