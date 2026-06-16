/**
 * ToolsResourceController — mocked axios GET for `resourceData.yaml`; renders ToolsResourceView when
 * `toolsContent` is present.
 *
 * Follows tests/TEST_STRUCTURE.md: mock `env` and `axios`, `createDedicatedYamlAxiosMock` from
 * tests/helpers/resourceYamlApiMocks.js, `waitFor` + assert URL and fixture-derived text.
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ToolsResourceController from '../../../../src/pages/resource/ToolsResourcePage/ToolsResourceController';
import { minimalToolsResourceData } from '../../../fixtures/resource/resourceDataViewProps';
import { createDedicatedYamlAxiosMock } from '../../../helpers/resourceYamlApiMocks';

if (typeof global.MutationObserver === 'undefined') {
  global.MutationObserver = class MutationObserver {
    disconnect() {}
    observe() {}
    takeRecords() {
      return [];
    }
  };
}

jest.mock('axios');
jest.mock('../../../../src/utils/env', () => ({
  REACT_APP_STATIC_CONTENT_URL: 'https://static.example.com',
}));

beforeEach(() => {
  window.scrollTo = jest.fn();
  for (let i = 0; i < 3; i += 1) {
    document.body.appendChild(document.createElement('footer'));
  }
});

afterEach(() => {
  jest.clearAllMocks();
  document.querySelectorAll('footer').forEach((el) => el.remove());
});

describe('ToolsResourceController', () => {
  describe('Mocked axios (resourceData.yaml)', () => {
    it('should fetch resourceData.yaml and render tools content when toolsContent exists', async () => {
      axios.get.mockImplementation(
        createDedicatedYamlAxiosMock({
          '/resourceData.yaml': minimalToolsResourceData,
        }),
      );

      render(
        <MemoryRouter initialEntries={['/explore']}>
          <ToolsResourceController />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByText('Tools')).toBeInTheDocument();
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/static\.example\.com\/resourceData\.yaml\?ts=\d+$/),
      );
      expect(screen.getByText(/Tools intro for unit test/i)).toBeInTheDocument();
    });

    it('should render an empty div when YAML has no toolsContent', async () => {
      axios.get.mockImplementation(
        createDedicatedYamlAxiosMock({
          '/resourceData.yaml': {},
        }),
      );

      render(
        <MemoryRouter initialEntries={['/explore']}>
          <ToolsResourceController />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      expect(screen.queryByText('Tools')).not.toBeInTheDocument();
    });
  });
});
