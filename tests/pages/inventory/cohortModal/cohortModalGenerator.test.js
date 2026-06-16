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

jest.mock('../../../../src/pages/inventory/cohortModal/utils.js', () => ({
  ...jest.requireActual('../../../../src/pages/inventory/cohortModal/utils.js'),
  arrayToCSVDownload: jest.fn(),
  objectToJsonDownload: jest.fn(),
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
import {
  arrayToCSVDownload,
  objectToJsonDownload,
} from '../../../../src/pages/inventory/cohortModal/utils';

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

function createDispatchMock({ invokeSuccess = true, invokeError = false } = {}) {
  return jest.fn((action) => {
    if (invokeError && typeof action?.payload?.error === 'function') {
      action.payload.error(new Error('cohort action failed'));
      return;
    }
    if (invokeSuccess && typeof action?.payload?.success === 'function') {
      action.payload.success();
    }
  });
}

function renderModalTree({
  dispatch = createDispatchMock(),
  cohortState = mockCohortState,
  open = true,
  onCloseModal = jest.fn(),
} = {}) {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={['/explore']}>
        <CohortModalProvider>
          <CohortStateContext.Provider value={{ state: cohortState, dispatch }}>
            <CohortModalHarness open={open} onCloseModal={onCloseModal} />
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

  it('should show success alert after saving cohort changes', async () => {
    const dispatch = createDispatchMock();
    renderModalTree({ dispatch });

    await waitFor(() => {
      expect(screen.getByText('My Cohort')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

    await waitFor(() => {
      expect(screen.getByText('Cohort updated successfully!')).toBeInTheDocument();
    });
    expect(dispatch).toHaveBeenCalled();
  });

  it('should show error alert when cohort save fails', async () => {
    const dispatch = createDispatchMock({ invokeSuccess: false, invokeError: true });
    renderModalTree({ dispatch });

    await waitFor(() => {
      expect(screen.getByText('My Cohort')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

    await waitFor(() => {
      expect(screen.getByText(/failed to update cohort/i)).toBeInTheDocument();
    });
  });

  it('should duplicate cohort and show success alert', async () => {
    const dispatch = createDispatchMock();
    renderModalTree({ dispatch });

    await waitFor(() => {
      expect(screen.getByText('View of All Cohorts')).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByAltText('duplicate cohort icon')[0]);

    await waitFor(() => {
      expect(screen.getByText('Cohort duplicated successfully!')).toBeInTheDocument();
    });
    expect(dispatch).toHaveBeenCalled();
  });

  it('should show error alert when cohort duplication fails', async () => {
    const dispatch = createDispatchMock({ invokeSuccess: false, invokeError: true });
    renderModalTree({ dispatch });

    await waitFor(() => {
      expect(screen.getByText('View of All Cohorts')).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByAltText('duplicate cohort icon')[0]);

    await waitFor(() => {
      expect(screen.getByText(/failed to duplicate cohort/i)).toBeInTheDocument();
    });
  });

  it('should invoke download helpers with GraphQL results', async () => {
    client.query
      .mockResolvedValueOnce({
        data: {
          cohortManifest: [{ participant_id: 'P-001', dbgap_accession: 'phs002431' }],
        },
      })
      .mockResolvedValueOnce({
        data: { cohortMetadata: { count: 1 } },
      });

    renderModalTree();

    await waitFor(() => {
      expect(screen.getByText('View of All Cohorts')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /selected cohorts/i }));
    fireEvent.click(screen.getByText('Manifest CSV'));
    await waitFor(() => {
      expect(arrayToCSVDownload).toHaveBeenCalledWith(
        [{ participant_id: 'P-001', dbgap_accession: 'phs002431' }],
        'my-cohort',
      );
    });

    fireEvent.click(screen.getByRole('button', { name: /selected cohorts/i }));
    fireEvent.click(screen.getByText('Metadata JSON'));
    await waitFor(() => {
      expect(objectToJsonDownload).toHaveBeenCalledWith({ count: 1 }, 'my-cohort');
    });
  });

  it('should clear alert after timeout', async () => {
    jest.useFakeTimers();
    renderModalTree();

    await waitFor(() => {
      expect(screen.getByText('My Cohort')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

    await waitFor(() => {
      expect(screen.getByText('Cohort updated successfully!')).toBeInTheDocument();
    });

    jest.advanceTimersByTime(2600);

    await waitFor(() => {
      expect(screen.queryByText('Cohort updated successfully!')).not.toBeInTheDocument();
    });
    jest.useRealTimers();
  });

  it('should dismiss alert when close control is clicked', async () => {
    renderModalTree();

    await waitFor(() => {
      expect(screen.getByText('My Cohort')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

    await waitFor(() => {
      expect(screen.getByText('Cohort updated successfully!')).toBeInTheDocument();
    });

    const alertClose = screen.getByText('Cohort updated successfully!').closest('[role="alert"]');
    fireEvent.click(alertClose.querySelector('button'));
    expect(screen.queryByText('Cohort updated successfully!')).not.toBeInTheDocument();
  });

  it('should delete a cohort from the list', async () => {
    const dispatch = createDispatchMock({ invokeSuccess: false });
    renderModalTree({ dispatch });

    await waitFor(() => {
      expect(screen.getByText('my-cohort')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByAltText('delete cohort icon');
    fireEvent.click(deleteButtons[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    expect(dispatch).toHaveBeenCalled();
  });

  it('should cancel closing when unsaved changes prompt is dismissed', async () => {
    const onCloseModal = jest.fn();
    renderModalTree({ onCloseModal });

    await waitFor(() => {
      expect(screen.getByText('My Cohort')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByAltText('edit cohort name icon'));
    fireEvent.change(screen.getByDisplayValue('My Cohort'), {
      target: { name: 'cohortName', value: 'Draft Name' },
    });
    fireEvent.blur(screen.getByDisplayValue('Draft Name'));

    fireEvent.click(screen.getByAltText('close icon'));
    expect(screen.getByText(/lose all unsaved changes/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCloseModal).not.toHaveBeenCalled();
  });
});
