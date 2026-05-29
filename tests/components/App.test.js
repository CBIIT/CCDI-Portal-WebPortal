/**
 * App shell — theme, global provider, router, layout, and notifications.
 */

jest.mock('../../src/components/Layout/LayoutView', () => {
  const React = require('react');
  return { __esModule: true, default: () => <div data-testid="app-layout" /> };
});

jest.mock('../../src/components/Notifications/NotifactionView', () => {
  const React = require('react');
  return { __esModule: true, default: () => <div data-testid="app-notifications" /> };
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../src/components/App';

describe('App', () => {
  describe('Rendering', () => {
    it('should render layout and notification regions inside providers', () => {
      render(<App />);
      expect(screen.getByTestId('app-layout')).toBeInTheDocument();
      expect(screen.getByTestId('app-notifications')).toBeInTheDocument();
    });
  });
});
