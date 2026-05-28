/**
 * Federation Data Model Navigator — iframe URL from environment config.
 */

jest.mock('../../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_DMN_URL: 'https://cbiit.github.io/crdc-data-model-navigator/?config=https://raw.githubusercontent.com/CBIIT/ccdi-model/refs/heads/dmn-dev/model-desc/',
  },
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FederationDataModelNavigator from '../../../../src/pages/resource/FederationDMN/FederationDMN';

describe('FederationDataModelNavigator', () => {
  it('should render iframe with federation DMN config URL', () => {
    render(<FederationDataModelNavigator />);

    const iframe = screen.getByTitle('Federation Data Model Navigator');
    expect(iframe).toHaveAttribute('src', expect.stringContaining('crdc-data-model-navigator'));
    expect(iframe).toHaveAttribute('src', expect.stringContaining('ccdi-federation-dmn'));
    expect(iframe).toHaveAttribute('src', expect.stringContaining('fed-dev'));
    expect(iframe).toHaveAttribute('sandbox', expect.stringContaining('allow-scripts'));
  });

  it('should fall back to default DMN URL when env is unset', () => {
    const env = require('../../../../src/utils/env').default;
    env.REACT_APP_DMN_URL = '';

    render(<FederationDataModelNavigator />);

    expect(screen.getByTitle('Federation Data Model Navigator')).toHaveAttribute(
      'src',
      expect.stringContaining('crdc-data-model-navigator'),
    );
  });
});
