/**
 * Cart **`ExportButtonView`** (export dropdown): MY_CART fetch, manifest `useQuery`, download + CGC redirect.
 *
 * Phase 4 — mocks **`graphqlClient`**, **`useQuery`**, **`downloadJson`**; real MUI + **`withStyles`** with **`ThemeProvider`**.
 *
 * @see src/pages/cart/customComponent/exportButton/exportButton.js
 */

jest.mock('../../../../../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
}));

jest.mock('../../../../../src/pages/cart/customComponent/exportButton/util/downloadJson', () => ({
  downloadJson: jest.fn(),
}));

jest.mock('@bento-core/tool-tip', () => ({
  __esModule: true,
  default: function MockToolTip({ children }) {
    return children;
  },
}));

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import client from '../../../../../src/utils/graphqlClient';
import { useQuery } from '@apollo/client';
import { downloadJson } from '../../../../../src/pages/cart/customComponent/exportButton/util/downloadJson';
import ExportButton from '../../../../../src/pages/cart/customComponent/exportButton/exportButton';

const theme = createMuiTheme();

const manifestRow = {
  guid: 'guid-1',
  file_name: 'sample.tsv',
  participant_id: 'PART-01',
  md5sum: 'abc123',
};

function setupUseQuery() {
  useQuery.mockImplementation((_doc, options) => {
    if (options && options.skip) {
      return { data: undefined, loading: false };
    }
    return {
      data: { storeManifest: 'https://interop.example/stored-manifest-token' },
      loading: false,
    };
  });
}

describe('ExportButtonView', () => {
  let windowOpenSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    setupUseQuery();

    client.query.mockResolvedValue({
      data: {
        filesManifestInList: [manifestRow],
      },
    });

    windowOpenSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };

    if (!document.createRange) {
      document.createRange = () => ({
        setStart: () => {},
        setEnd: () => {},
        commonAncestorContainer: document.body,
      });
    }

    if (!window.URL.createObjectURL) {
      window.URL.createObjectURL = jest.fn(() => 'blob:mock');
    }
  });

  afterEach(() => {
    windowOpenSpy.mockRestore();
  });

  function renderExportButton(props = {}) {
    const { filesId = ['file-1'] } = props;
    return render(
      <ThemeProvider theme={theme}>
        <ExportButton filesId={filesId} />
      </ThemeProvider>,
    );
  }

  describe('Rendering', () => {
    it('should disable the trigger when the cart has no file ids', async () => {
      renderExportButton({ filesId: [] });

      await waitFor(() => {
        expect(client.query).toHaveBeenCalledWith(
          expect.objectContaining({
            variables: { file_ids: [] },
          }),
        );
      });

      expect(screen.getByRole('button', { name: /available export options/i })).toBeDisabled();
    });

    it('should load MY_CART and show the label when files are present', async () => {
      renderExportButton();

      await waitFor(() => {
        expect(client.query).toHaveBeenCalled();
      });

      expect(screen.getByRole('button', { name: /available export options/i })).not.toBeDisabled();
      expect(screen.getByText('Available Export Options')).toBeInTheDocument();
    });
  });

  describe('Export actions', () => {
    it('should call downloadJson when Download Manifest is chosen', async () => {
      renderExportButton();

      await waitFor(() => {
        expect(client.query).toHaveBeenCalled();
      });

      fireEvent.click(screen.getByRole('button', { name: /available export options/i }));

      await waitFor(() => {
        expect(screen.getByText('Download Manifest')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Download Manifest'));

      await waitFor(() => {
        expect(downloadJson).toHaveBeenCalled();
      });

      expect(downloadJson).toHaveBeenCalledWith(
        expect.objectContaining({
          filesManifestInList: [manifestRow],
        }),
        '',
        'CCDI Hub File Manifest',
        expect.objectContaining({
          keysToInclude: expect.arrayContaining(['guid', 'file_name']),
        }),
      );
    });

    it('should open Cancer Genomics Cloud with encoded manifest URL when that option is chosen', async () => {
      renderExportButton();

      await waitFor(() => {
        expect(client.query).toHaveBeenCalled();
      });

      fireEvent.click(screen.getByRole('button', { name: /available export options/i }));

      await waitFor(() => {
        expect(screen.getByText('Export to Cancer Genomics Cloud')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Export to Cancer Genomics Cloud'));

      await waitFor(() => {
        expect(windowOpenSpy).toHaveBeenCalled();
      });

      const [url, target] = windowOpenSpy.mock.calls[0];
      expect(target).toBe('_blank');
      expect(url).toContain('https://cgc.sbgenomics.com/import-redirect/drs/csv?URL=');
      expect(url).toContain(encodeURIComponent('https://interop.example/stored-manifest-token'));
    });
  });
});
