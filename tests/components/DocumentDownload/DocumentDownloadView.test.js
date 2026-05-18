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

jest.mock('../../../src/components/sessionTimeOutModal', () => function SessionTimeOutModalMock({ open }) {
  return open ? <div data-testid="session-modal" /> : null;
});

jest.mock('../../../src/components/CustomIcon/CustomIconView', () => function CustomIconMock({ imgSrc }) {
  return <img data-testid="custom-icon" alt="icon" src={imgSrc || ''} />;
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
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

    it('should open session modal when download returns 403', async () => {
      global.fetch = jest.fn(() => Promise.resolve({ status: 403 }));
      renderDownload();

      fireEvent.click(screen.getByRole('img', { name: /icon/i }).closest('div'));

      await waitFor(() => {
        expect(screen.getByTestId('session-modal')).toBeInTheDocument();
      });
    });
  });

  describe('Authentication enabled', () => {
    const siteWideConfig = require('../../../src/bento/siteWideConfig');

    beforeEach(() => {
      siteWideConfig.enableAuthentication = true;
    });

    afterEach(() => {
      siteWideConfig.enableAuthentication = false;
    });

    function renderWithLogin(loginState, props = {}) {
      const store = createStore(() => ({ login: loginState }));
      return render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={['/explore']}>
              <Routes>
                <Route
                  path="/explore"
                  element={(
                    <DocumentDownload
                      fileSize={100}
                      fileFormat="pdf"
                      fileLocation="/api/file/abc"
                      iconFileDownload="/dl.svg"
                      iconUnauthenticated="/lock.svg"
                      requiredACLs={['arm-1']}
                      {...props}
                    />
                  )}
                />
                <Route path="/login" element={<span>Login page</span>} />
                <Route path="/request" element={<span>Request page</span>} />
              </Routes>
            </MemoryRouter>
          </ThemeProvider>
        </Provider>,
      );
    }

    it('should prompt login when user is not signed in', () => {
      renderWithLogin({ isSignedIn: false, acl: [], role: '' });
      expect(screen.getByTestId('tooltip')).toHaveAttribute(
        'data-title',
        'Login to access this file',
      );
      fireEvent.click(screen.getByRole('img', { name: /icon/i }).closest('div'));
      expect(screen.getByText('Login page')).toBeInTheDocument();
    });

    it('should prompt access request when signed in without ACL', () => {
      renderWithLogin({
        isSignedIn: true,
        acl: [{ accessStatus: 'pending', armID: 'arm-2' }],
        role: 'user',
      });
      fireEvent.click(screen.getByRole('img', { name: /icon/i }).closest('div'));
      expect(screen.getByText('Request page')).toBeInTheDocument();
    });

    it('should allow download for admin without matching ACL', () => {
      renderWithLogin({
        isSignedIn: true,
        acl: [],
        role: 'admin',
      });
      expect(screen.getByTestId('tooltip')).toHaveAttribute(
        'data-title',
        'Download a copy of this file',
      );
    });
  });

  describe('JBrowse viewer branch', () => {
    it('should link to file viewer for bam files when jBrowse is enabled', () => {
      const { jBrowseOptions } = require('../../../src/bento/jbrowseDetailData');
      jBrowseOptions.jBrowse = true;

      renderDownload({
        fileFormat: 'bam',
        caseId: 'CASE-1',
        iconFileViewer: '/viewer.svg',
      });

      expect(screen.getByRole('link')).toHaveAttribute('href', '/fileViewer/CASE-1');
      jBrowseOptions.jBrowse = false;
    });
  });
});
