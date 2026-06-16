/**
 * Apollo client bootstrap — env-backed links and dynamic fetch policy.
 */

var mockDynamicLinkRequestFns = [];
var mockSplitPredicates = [];

jest.mock('@apollo/client', () => {
  class MockApolloLink {
    constructor(request) {
      this.request = request;
      if (typeof request === 'function') {
        mockDynamicLinkRequestFns.push(request);
      }
    }

    static from(links) {
      return new MockApolloLink(null);
    }

    static split(predicate, interopLink, backendLink) {
      mockSplitPredicates.push(predicate);
      return { predicate, interopLink, backendLink };
    }
  }

  return {
    ApolloClient: jest.fn((config) => ({ link: config.link, cache: config.cache })),
    InMemoryCache: jest.fn(() => ({})),
    HttpLink: jest.fn((opts) => ({ uri: opts.uri })),
    ApolloLink: MockApolloLink,
  };
});

jest.mock('../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_BACKEND_API: 'https://backend.test/graphql',
    REACT_APP_INTEROP_SERVICE_API: 'https://interop.test/',
  },
}));

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = require('../../src/utils/graphqlClient').default;

describe('graphqlClient', () => {
  describe('Client construction', () => {
    it('should create HttpLinks from env URLs', () => {
      expect(HttpLink).toHaveBeenCalledWith({ uri: 'https://backend.test/graphql' });
      expect(HttpLink).toHaveBeenCalledWith({ uri: 'https://interop.test/graphql' });
    });

    it('should build ApolloClient with InMemoryCache and composed link', () => {
      expect(InMemoryCache).toHaveBeenCalled();
      expect(ApolloClient).toHaveBeenCalledWith(
        expect.objectContaining({
          cache: expect.anything(),
          link: expect.anything(),
        }),
      );
      expect(client).toEqual(expect.objectContaining({ link: expect.anything() }));
    });

    it('should compose dynamic fetch policy link with split routing', () => {
      expect(mockDynamicLinkRequestFns.length).toBeGreaterThan(0);
      expect(mockSplitPredicates.length).toBeGreaterThan(0);
    });
  });

  describe('dynamicFetchPolicyLink', () => {
    const runDynamicLink = (clientName) => {
      const requestFn = mockDynamicLinkRequestFns[0];
      const operation = {
        getContext: jest.fn(() => (clientName != null ? { clientName } : {})),
        setContext: jest.fn(),
      };
      const forward = jest.fn((op) => op);
      requestFn(operation, forward);
      return { operation, forward };
    };

    it('should set no-cache fetch policy for interopService operations', () => {
      const { operation, forward } = runDynamicLink('interopService');

      expect(operation.setContext).toHaveBeenCalled();
      const contextUpdater = operation.setContext.mock.calls[0][0];
      const nextContext = contextUpdater({ fetchOptions: { headers: { 'x-test': '1' } } });
      expect(nextContext.fetchOptions).toEqual(
        expect.objectContaining({
          headers: { 'x-test': '1' },
          fetchPolicy: 'no-cache',
        }),
      );
      expect(forward).toHaveBeenCalledWith(operation);
    });

    it('should set cache-first fetch policy for non-interop operations', () => {
      const { operation, forward } = runDynamicLink('backendService');

      const contextUpdater = operation.setContext.mock.calls[0][0];
      const nextContext = contextUpdater({ fetchOptions: {} });
      expect(nextContext.fetchOptions.fetchPolicy).toBe('cache-first');
      expect(forward).toHaveBeenCalledWith(operation);
    });
  });

  describe('ApolloLink.split', () => {
    it('should route interopService operations to the interop link', () => {
      const predicate = mockSplitPredicates[0];
      expect(predicate({ getContext: () => ({ clientName: 'interopService' }) })).toBe(true);
      expect(predicate({ getContext: () => ({ clientName: 'other' }) })).toBe(false);
    });
  });
});
