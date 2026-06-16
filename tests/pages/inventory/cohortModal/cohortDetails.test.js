/**
 * CohortDetails — edit, search, sort, delete, and download actions.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import CohortDetails from '../../../../src/pages/inventory/cohortModal/components/cohortDetails';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const theme = createMuiTheme();

const participants = [
  { id: 'n1', participant_id: 'P-100', study_id: 'phs001' },
  { id: 'n2', participant_id: 'P-200', study_id: 'phs002' },
];

const activeCohort = {
  cohortId: 'test-cohort',
  cohortName: 'Test Cohort',
  cohortDescription: 'Test description',
  participants,
  lastUpdated: '2026-01-15T12:00:00.000Z',
};

function renderCohortDetails(overrides = {}) {
  const handleSaveCohort = jest.fn();
  const handleSetCurrentCohortChanges = jest.fn();
  const downloadCohortManifest = jest.fn();
  const downloadCohortMetadata = jest.fn();
  const closeModal = jest.fn();
  const setAlert = jest.fn();

  const props = {
    classes: {},
    config: {},
    activeCohort,
    temporaryCohort: null,
    closeModal,
    handleSaveCohort,
    handleSetCurrentCohortChanges,
    downloadCohortManifest,
    downloadCohortMetadata,
    deleteConfirmationClasses: {},
    setAlert,
    ...overrides,
  };

  const utils = render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <CohortDetails {...props} />
      </MemoryRouter>
    </ThemeProvider>,
  );

  return {
    ...utils,
    handleSaveCohort,
    handleSetCurrentCohortChanges,
    downloadCohortManifest,
    downloadCohortMetadata,
    closeModal,
    setAlert,
  };
}

describe('CohortDetails', () => {
  beforeEach(() => {
    useNavigate.mockReturnValue(jest.fn());
    Element.prototype.scrollIntoView = jest.fn();
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      get() { return 500; },
    });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      get() { return 200; },
    });
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  it('should render cohort header, description, and participants', () => {
    renderCohortDetails();
    expect(screen.getByText('Test Cohort')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('P-100')).toBeInTheDocument();
    expect(screen.getByText('P-200')).toBeInTheDocument();
  });

  it('should return null when activeCohort is missing', () => {
    renderCohortDetails({ activeCohort: null });
    expect(screen.queryByText('Test Cohort')).not.toBeInTheDocument();
  });

  it('should enter edit mode for cohort name and track changes on blur', () => {
    const { handleSetCurrentCohortChanges } = renderCohortDetails({
      temporaryCohort: { ...activeCohort, searchText: '' },
    });
    fireEvent.click(screen.getByAltText('edit cohort name icon'));
    const nameInput = screen.getByDisplayValue('Test Cohort');
    fireEvent.change(nameInput, { target: { name: 'cohortName', value: 'Renamed Cohort' } });
    fireEvent.blur(nameInput);
    expect(handleSetCurrentCohortChanges).toHaveBeenCalled();
  });

  it('should filter participants when search text is entered', () => {
    renderCohortDetails();
    const searchInput = screen.getByPlaceholderText('Search Participant ID here');
    fireEvent.change(searchInput, { target: { value: 'P-100' } });
    expect(screen.getByText('P-100')).toBeInTheDocument();
    expect(screen.queryByText('P-200')).not.toBeInTheDocument();
  });

  it('should remove a participant when delete icon is clicked', () => {
    const { handleSetCurrentCohortChanges } = renderCohortDetails({
      temporaryCohort: { ...activeCohort, searchText: '' },
    });
    const deleteIcons = screen.getAllByAltText('delete participant icon');
    fireEvent.click(deleteIcons[0]);
    expect(handleSetCurrentCohortChanges).toHaveBeenCalled();
    expect(screen.queryByText('P-100')).not.toBeInTheDocument();
  });

  it('should call handleSaveCohort when Save Changes is clicked', () => {
    const { handleSaveCohort } = renderCohortDetails();
    fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));
    expect(handleSaveCohort).toHaveBeenCalled();
  });

  it('should download metadata when Metadata JSON is selected', () => {
    const { downloadCohortMetadata } = renderCohortDetails();
    fireEvent.click(screen.getByRole('button', { name: /download/i }));
    fireEvent.click(screen.getByText('Metadata JSON'));
    expect(downloadCohortMetadata).toHaveBeenCalled();
  });

  it('should navigate to cohort analyzer when View button is clicked', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    renderCohortDetails();
    fireEvent.click(screen.getByRole('button', { name: /view in cohort analyzer/i }));
    expect(navigate).toHaveBeenCalledWith('/cohortAnalyzer', expect.objectContaining({
      state: expect.objectContaining({ cohort: expect.any(Object) }),
    }));
  });

  it('should edit cohort description and track changes on blur', () => {
    const { handleSetCurrentCohortChanges } = renderCohortDetails({
      temporaryCohort: { ...activeCohort, searchText: '' },
    });
    fireEvent.click(screen.getByAltText('edit cohort description icon'));
    const descriptionInput = screen.getByDisplayValue('Test description');
    fireEvent.change(descriptionInput, {
      target: { name: 'cohortDescription', value: 'Updated description' },
    });
    fireEvent.blur(descriptionInput);
    expect(handleSetCurrentCohortChanges).toHaveBeenCalled();
  });

  it('should save cohort when name blur targets Save Changes button', () => {
    const { handleSaveCohort } = renderCohortDetails({
      temporaryCohort: { ...activeCohort, searchText: '' },
    });
    fireEvent.click(screen.getByAltText('edit cohort name icon'));
    const nameInput = screen.getByDisplayValue('Test Cohort');
    const saveButton = screen.getByRole('button', { name: 'Save Changes' });
    fireEvent.change(nameInput, { target: { name: 'cohortName', value: 'Saved Via Blur' } });
    fireEvent.blur(nameInput, { relatedTarget: saveButton });
    expect(handleSaveCohort).toHaveBeenCalled();
  });

  it('should sort participants by study id when header is clicked', () => {
    renderCohortDetails();
    fireEvent.click(screen.getByText('Study ID'));
    expect(screen.getByText('P-100')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Study ID'));
    expect(screen.getByText('P-200')).toBeInTheDocument();
  });

  it('should download manifest CSV from the download menu', () => {
    const { downloadCohortManifest } = renderCohortDetails();
    fireEvent.click(screen.getByRole('button', { name: /download/i }));
    fireEvent.click(screen.getByText('Manifest CSV'));
    expect(downloadCohortManifest).toHaveBeenCalled();
  });

  it('should close download menu when clicking outside', () => {
    renderCohortDetails();
    fireEvent.click(screen.getByRole('button', { name: /download/i }));
    expect(screen.getByText('Manifest CSV')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Manifest CSV')).not.toBeInTheDocument();
  });

  it('should delete all participants after confirmation', () => {
    const { handleSetCurrentCohortChanges } = renderCohortDetails({
      temporaryCohort: { ...activeCohort, searchText: '' },
    });
    const deleteAllIcon = screen.getByAltText('delete cohort icon');
    fireEvent.click(deleteAllIcon);
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(handleSetCurrentCohortChanges).toHaveBeenCalled();
    expect(screen.getByText('No Data')).toBeInTheDocument();
  });

  it('should call closeModal when Cancel is clicked', () => {
    const { closeModal } = renderCohortDetails();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(closeModal).toHaveBeenCalled();
  });

  it('should show empty search message when filter matches nothing', () => {
    renderCohortDetails();
    fireEvent.change(screen.getByPlaceholderText('Search Participant ID here'), {
      target: { value: 'NO-MATCH' },
    });
    expect(screen.getByText('No matching Participant Id')).toBeInTheDocument();
  });

  it('should set error alert when navigation to cohort analyzer fails', () => {
    const navigate = jest.fn(() => {
      throw new Error('navigation blocked');
    });
    const setAlert = jest.fn();
    useNavigate.mockReturnValue(navigate);
    renderCohortDetails({ setAlert });
    fireEvent.click(screen.getByRole('button', { name: /view in cohort analyzer/i }));
    expect(setAlert).toHaveBeenCalledWith({
      type: 'error',
      message: 'Failed to navigate to Cohort Analyzer. Please try again.',
    });
  });
});
