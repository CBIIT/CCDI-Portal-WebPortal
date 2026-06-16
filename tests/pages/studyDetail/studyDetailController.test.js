/**
 * Study details page — **`studyDetailController`**: **`useQuery`** + route **`studyId`**, loading/error/success.
 *
 * Uses **`studyDetails*`** fixtures (mock API shape). Mocks **`@apollo/client`** **`useQuery`** only.
 *
 * @see src/pages/studyDetail/studyDetailController.js
 */

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
}));

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import StudyDetailController from '../../../src/pages/studyDetail/studyDetailController';
import {
  studyDetailsMinimalFixture,
  studyDetailsWithSupportingDataFixture,
} from '../../fixtures/studyDetail/studyDetailApiResponse';

const theme = createMuiTheme();

function renderAtStudyPath(path = '/studies/phs002431') {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/studies/:studyId" element={<StudyDetailController />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe('Study detail page (controller)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
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
  });

  it('should request study details with route studyId', () => {
    useQuery.mockReturnValue({
      loading: true,
      error: undefined,
      data: undefined,
    });

    renderAtStudyPath('/studies/phs003111');

    expect(useQuery).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        variables: { study_id: 'phs003111' },
      }),
    );
  });

  it('should show loading indicator while query is loading', () => {
    useQuery.mockReturnValue({
      loading: true,
      error: undefined,
      data: undefined,
    });

    renderAtStudyPath();

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should show error message when the query fails', () => {
    useQuery.mockReturnValue({
      loading: false,
      error: new Error('network failed'),
      data: undefined,
    });

    renderAtStudyPath();

    expect(
      screen.getByText(/An error has occurred in loading stats component/i),
    ).toBeInTheDocument();
  });

  it('should show wrong-data message when studyDetails is missing', () => {
    useQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { studyDetails: null },
    });

    renderAtStudyPath();

    expect(screen.getByText(/Recieved wrong data/i)).toBeInTheDocument();
  });

  it('should render study header and overview from mocked studyDetails', async () => {
    useQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { studyDetails: studyDetailsMinimalFixture },
    });

    renderAtStudyPath();

    await waitFor(() => {
      expect(screen.getByText('CCD Study Row Assert')).toBeInTheDocument();
    });

    expect(screen.getByText(/Study Code phs002431/i)).toBeInTheDocument();
    expect(screen.getByText(/Participants in this Study:/i)).toBeInTheDocument();
    expect(screen.getAllByText('1,200').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('link', { name: '1,200' })).toHaveAttribute(
      'href',
      '/explore?dbgap_accession=phs002431',
    );
  });

  it('should show Supporting Data tab when supporting_data has rows', async () => {
    useQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { studyDetails: studyDetailsWithSupportingDataFixture },
    });

    renderAtStudyPath();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /supporting data/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /supporting data/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Imaging Data Commons \(IDC\)/i),
      ).toBeInTheDocument();
    });
  });
});
