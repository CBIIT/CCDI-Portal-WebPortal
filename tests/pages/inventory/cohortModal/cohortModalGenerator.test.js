/**
 * Cohort modal generator — **`CohortModal`** with mocked **`graphqlClient`**, cohort + modal context,
 * and **`MemoryRouter`** (details use **`useNavigate`**).
 *
 * @see src/pages/inventory/cohortModal/cohortModalGenerator.js
 */

jest.mock('../../../../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: {
    query: jest.fn(() => Promise.resolve({ data: { cohortManifest: [], cohortMetadata: {} } })),
  },
}));

jest.mock('../../../../src/components/CohortSelectorState/CohortStateContext', () => {
  const React = require('react');
  return { CohortStateContext: React.createContext() };
});

jest.mock('@bento-core/tool-tip', () => ({
  __esModule: true,
  default: function MockTooltip({ children }) {
    return children;
  },
}));

import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MemoryRouter } from 'react-router-dom';

import { CohortStateContext } from '../../../../src/components/CohortSelectorState/CohortStateContext';
import { CohortModalProvider } from '../../../../src/pages/inventory/cohortModal/CohortModalContext';
import CohortModalGenerator from '../../../../src/pages/inventory/cohortModal/cohortModalGenerator';
import client from '../../../../src/utils/graphqlClient';

const theme = createMuiTheme();

const mockCohortState = {
  'my-cohort': {
    cohortId: 'my-cohort',
    cohortName: 'My Cohort',
    cohortDescription: 'Description for tests.',
    participants: [
      { id: 'n1', participant_id: 'P-001', study_id: 'phs002431' },
    ],
    lastUpdated: '2026-01-15T12:00:00.000Z',
  },
};

function CohortModalHarness({ open = true, onCloseModal = jest.fn() }) {
  const { CohortModal } = CohortModalGenerator();
  return (
    <CohortModal open={open} onCloseModal={onCloseModal} />
  );
}

function renderModalTree() {
  const dispatch = jest.fn();
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={['/explore']}>
        <CohortModalProvider>
          <CohortStateContext.Provider value={{ state: mockCohortState, dispatch }}>
            <CohortModalHarness open />
          </CohortStateContext.Provider>
        </CohortModalProvider>
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe('CohortModalGenerator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.URL.createObjectURL = jest.fn(() => 'blob:mock');
    Element.prototype.scrollIntoView = jest.fn();

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

  it('should render the modal title and cohort list from config', async () => {
    renderModalTree();

    await waitFor(() => {
      expect(screen.getByText('View of All Cohorts')).toBeInTheDocument();
    });

    expect(screen.getByText(/COHORTS \(1\)/i)).toBeInTheDocument();
    expect(screen.getByText('my-cohort')).toBeInTheDocument();
  });

  it('should render cohort details for the selected cohort', async () => {
    renderModalTree();

    await waitFor(() => {
      expect(screen.getByText('My Cohort')).toBeInTheDocument();
    });

    expect(screen.getByText('Description for tests.')).toBeInTheDocument();
  });

  it('should call client.query when choosing Manifest CSV from the download menu', async () => {
    renderModalTree();

    await waitFor(() => {
      expect(screen.getByText('View of All Cohorts')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /selected cohorts/i }));
    fireEvent.click(screen.getByText('Manifest CSV'));

    await waitFor(() => {
      expect(client.query).toHaveBeenCalled();
    });
  });

  it('should call client.query when choosing Metadata JSON from the download menu', async () => {
    renderModalTree();

    await waitFor(() => {
      expect(screen.getByText('View of All Cohorts')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /selected cohorts/i }));
    fireEvent.click(screen.getByText('Metadata JSON'));

    await waitFor(() => {
      expect(client.query).toHaveBeenCalled();
    });
  });

  it('should prompt before closing when there are unsaved cohort changes', async () => {
    const onCloseModal = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/explore']}>
          <CohortModalProvider>
            <CohortStateContext.Provider value={{ state: mockCohortState, dispatch: jest.fn() }}>
              <CohortModalHarness onCloseModal={onCloseModal} open />
            </CohortStateContext.Provider>
          </CohortModalProvider>
        </MemoryRouter>
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('My Cohort')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByAltText('edit cohort name icon'));
    const nameInput = screen.getByDisplayValue('My Cohort');
    fireEvent.change(nameInput, { target: { name: 'cohortName', value: 'Changed Name' } });
    fireEvent.blur(nameInput);

    fireEvent.click(screen.getByAltText('close icon'));
    expect(screen.getByText(/lose all unsaved changes/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(onCloseModal).toHaveBeenCalled();
  });

  it('should close modal when onCloseModal is invoked', async () => {
    const onCloseModal = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/explore']}>
          <CohortModalProvider>
            <CohortStateContext.Provider value={{ state: mockCohortState, dispatch: jest.fn() }}>
              <CohortModalHarness onCloseModal={onCloseModal} open />
            </CohortStateContext.Provider>
          </CohortModalProvider>
        </MemoryRouter>
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('View of All Cohorts')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByAltText('close icon'));
    expect(onCloseModal).toHaveBeenCalled();
  });
});
