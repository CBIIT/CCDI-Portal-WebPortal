/**
 * Application entry — mounts App with Apollo and Redux providers.
 */

const mockRender = jest.fn();

jest.mock('react-dom', () => ({
  render: (...args) => mockRender(...args),
}));

jest.mock('../src/components/App', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'app-root' }) };
});

jest.mock('../src/store', () => ({
  __esModule: true,
  default: { dispatch: jest.fn(), getState: jest.fn(() => ({})) },
}));

const mockApolloClient = { query: jest.fn() };

jest.mock('../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: mockApolloClient,
}));

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import App from '../src/components/App';
import store from '../src/store';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

require('../src/index');

describe('index entry', () => {
  describe('Rendering', () => {
    it('should render App into the root element with providers', () => {
      expect(mockRender).toHaveBeenCalledTimes(1);

      const [element, container] = mockRender.mock.calls[0];
      expect(container).toBe(rootElement);
      expect(element.type).toBe(ApolloProvider);
      expect(element.props.client).toBe(mockApolloClient);

      const reduxTree = element.props.children;
      expect(reduxTree.type).toBe(Provider);
      expect(reduxTree.props.store).toBe(store);

      const appTree = reduxTree.props.children;
      expect(appTree.type).toBe(App);
    });
  });
});
