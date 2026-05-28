/**
 * Data Usage Policies page — controller loads YAML and conditionally renders view.
 *
 * @see src/pages/about/DataUsagePoliciesPage/DataUsagePoliciesController.js
 */

jest.mock('../../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_STATIC_CONTENT_URL: 'https://example.test/static',
  },
}));

jest.mock('axios');

jest.mock('js-yaml', () => ({
  safeLoad: jest.fn(() => ({
    Data_Usage_Policies_Header: '',
    dataUsagePoliciesIntroText: '<p>Intro</p>',
    dataUsagePoliciesContent: [
      { id: 'Policy_1', topic: 'Policy 1', content: '<p>Body</p>' },
    ],
  })),
}));

jest.mock('../../../../src/pages/about/DataUsagePoliciesPage/DataUsagePoliciesView', () => (
  function MockDataUsagePoliciesView({ data }) {
    return <div>{data?.dataUsagePoliciesContent?.[0]?.topic || 'no-content'}</div>;
  }
));

import React from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataUsagePoliciesController from '../../../../src/pages/about/DataUsagePoliciesPage/DataUsagePoliciesController';

describe('DataUsagePoliciesController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValue({ data: 'policies-yaml' });
    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
  });

  it('should fetch/parse YAML and render DataUsagePoliciesView when content exists', async () => {
    render(<DataUsagePoliciesController />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
    expect(yaml.safeLoad).toHaveBeenCalledWith('policies-yaml');

    await waitFor(() => {
      expect(screen.getByText('Policy 1')).toBeInTheDocument();
    });
  });

  it('should render empty div when content key is missing', async () => {
    yaml.safeLoad.mockReturnValueOnce({});
    const { container } = render(<DataUsagePoliciesController />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
    expect(screen.queryByText('Policy 1')).not.toBeInTheDocument();
    expect(container.firstChild).toBeInTheDocument();
  });
});
