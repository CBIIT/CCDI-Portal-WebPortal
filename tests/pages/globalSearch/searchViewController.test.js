/**
 * **`SearchViewController`** wires Redux login state into **`SearchView`** props (Phase 4).
 *
 * @see src/pages/globalSearch/searchViewController.js
 */

jest.mock('../../../src/pages/globalSearch/searchView', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-search-view-shell" />),
}));

jest.mock('../../../src/bento/siteWideConfig', () => ({
  PUBLIC_ACCESS: 'Metadata Only',
}));

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import SearchView from '../../../src/pages/globalSearch/searchView';
import SearchViewController from '../../../src/pages/globalSearch/searchViewController';

function buildLoginStore(partial) {
  return createStore(() => ({
    login: {
      isSignedIn: false,
      role: null,
      acl: [],
      ...partial,
    },
  }));
}

describe('Global Search — searchViewController', () => {
  beforeEach(() => {
    SearchView.mockClear();
  });

  it('should pass publicAccessEnabled when site matches metadata-only access', () => {
    const store = buildLoginStore({});

    render(
      <Provider store={store}>
        <SearchViewController match={{ params: { id: '' } }} />
      </Provider>,
    );

    expect(SearchView).toHaveBeenCalledWith(
      expect.objectContaining({
        publicAccessEnabled: true,
        isAuthorized: false,
        isSignedIn: false,
      }),
      {},
    );
  });

  it('should set isAuthorized for admin users', () => {
    const store = buildLoginStore({
      isSignedIn: true,
      role: 'admin',
    });

    render(
      <Provider store={store}>
        <SearchViewController match={{ params: { id: 'kw' } }} />
      </Provider>,
    );

    expect(SearchView).toHaveBeenCalledWith(
      expect.objectContaining({
        isAuthorized: true,
        isSignedIn: true,
      }),
      {},
    );
  });

  it('should set isAuthorized when user has an approved arm', () => {
    const store = buildLoginStore({
      isSignedIn: true,
      role: 'user',
      acl: [{ accessStatus: 'approved', arm: 'a' }],
    });

    render(
      <Provider store={store}>
        <SearchViewController match={{ params: {} }} />
      </Provider>,
    );

    expect(SearchView).toHaveBeenCalledWith(
      expect.objectContaining({
        isAuthorized: true,
      }),
      {},
    );
  });
});
