/**
 * Data Model Navigator — iframe URL from environment config.
 */

jest.mock('../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_DMN_URL: 'https://example.test/dmn?config=test',
  },
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataModelNavigator from '../../../src/pages/dmn/DataModelNavigator';

describe('DataModelNavigator', () => {
  it('should render iframe with DMN URL from env', () => {
    render(<DataModelNavigator />);

    const iframe = screen.getByTitle('Data Model Navigator');
    expect(iframe).toHaveAttribute('src', 'https://example.test/dmn?config=test');
    expect(iframe).toHaveAttribute('sandbox', expect.stringContaining('allow-scripts'));
  });

  it('should fall back to default DMN URL when env is unset', () => {
    const env = require('../../../src/utils/env').default;
    env.REACT_APP_DMN_URL = '';

    render(<DataModelNavigator />);

    expect(screen.getByTitle('Data Model Navigator')).toHaveAttribute(
      'src',
      expect.stringContaining('crdc-data-model-navigator'),
    );
  });
});
