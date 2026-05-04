/**
 * DocumentDownload view — download branch when authentication is off (no login / ACL UI).
 * Mocks env, site config, fetch, ToolTip, icons, and session modal per tests/TEST_STRUCTURE.md (no network).
 */

jest.mock('../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_FILE_SERVICE_API: 'https://files-api.example',
  },
}));

jest.mock('../../../src/bento/siteWideConfig', () => ({
  enableAuthentication: false,
}));

jest.mock('../../../src/bento/jbrowseDetailData', () => ({
  jBrowseOptions: { jBrowse: false },
}));

jest.mock('@bento-core/tool-tip', () => function ToolTipMock({ children, title }) {
  return (
    <div data-testid="tooltip" data-title={title}>
      {children}
    </div>
  );
});

jest.mock('../../../src/components/sessionTimeOutModal', () => function SessionTimeOutModalMock() {
  return null;
});

jest.mock('../../../src/components/CustomIcon/CustomIconView', () => function CustomIconMock({ imgSrc }) {
  return <img data-testid="custom-icon" alt="icon" src={imgSrc || ''} />;
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import DocumentDownload from '../../../src/components/DocumentDownload/DocumentDownloadView';

if (typeof global.MutationObserver === 'undefined') {
  global.MutationObserver = class MutationObserver {
    disconnect() {}
    observe() {}
    takeRecords() { return []; }
  };
}

const theme = createTheme();

function renderDownload(props = {}) {
  const store = createStore(() => ({
    login: {
      isSignedIn: false,
      acl: [],
      role: '',
    },
  }));

  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <DocumentDownload
            fileSize={100}
            fileFormat="pdf"
            fileLocation="/api/file/abc"
            iconFileDownload="/dl.svg"
            {...props}
          />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );
}

describe('DocumentDownload', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      status: 200,
      text: () => Promise.resolve('https://cdn.example/resolved.pdf'),
    }));
  });

  describe('Rendering', () => {
    it('should render the download tooltip when file is under max size', () => {
      renderDownload();
      expect(screen.getByTestId('tooltip')).toHaveAttribute(
        'data-title',
        'Download a copy of this file',
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('should render preview-only tooltip when file exceeds max size', () => {
      renderDownload({ fileSize: 999999999 });
      expect(screen.getByTestId('tooltip')).toHaveAttribute(
        'data-title',
        expect.stringContaining('unavailable for download'),
      );
    });
  });

  describe('Side effects', () => {
    it('should fetch file URL when the download control is clicked', async () => {
      renderDownload();

      const downloadIcon = screen.getByRole('img', { name: /icon/i });
      fireEvent.click(downloadIcon.closest('div'));

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          'https://files-api.example/api/file/abc',
          expect.objectContaining({ method: 'GET' }),
        );
      });
    });
  });
});
