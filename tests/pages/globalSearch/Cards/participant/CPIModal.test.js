/**
 * Global Search **`CPIModal`** — alternative-identifier table modal.
 *
 * @see src/pages/globalSearch/Cards/participant/CPIModal.js
 */

const mockApolloClient = { query: jest.fn() };

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useApolloClient: jest.fn(() => mockApolloClient),
}));

jest.mock('../../../../../src/pages/globalSearch/Cards/participant/c3dcService', () => ({
  fetchParticipantCpiData: jest.fn(() => Promise.resolve([])),
  openC3dcExplore: jest.fn(),
}));

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import CPIModal from '../../../../../src/pages/globalSearch/Cards/participant/CPIModal';
import {
  fetchParticipantCpiData,
  openC3dcExplore,
} from '../../../../../src/pages/globalSearch/Cards/participant/c3dcService';

const cpiRows = [
  {
    data_type: 'external',
    associated_id: 'ASSOC-1',
    repository_of_synonym_id: 'Repo One',
    domain_description: 'Tumor synonym',
    domain_category: 'CategoryA',
    data_location: 'https://example.com/loc-1',
  },
  {
    data_type: 'external',
    associated_id: 'ASSOC-2',
    repository_of_synonym_id: 'Repo Two',
    domain_description: 'Other description',
    domain_category: 'CategoryB',
    data_location: 'https://example.com/loc-2',
  },
];

const buildRow = (overrides = {}) => ({
  id: 'cpi-row-1',
  participant_id: 'PART-001',
  study_id: 'phsCPI001',
  cpi_data: cpiRows,
  ...overrides,
});

async function renderModal(props = {}) {
  const theme = createMuiTheme();
  let utils;
  await act(async () => {
    utils = render(
      <ThemeProvider theme={theme}>
        <CPIModal open onClose={jest.fn()} row={buildRow()} {...props} />
      </ThemeProvider>,
    );
    await Promise.resolve();
    await Promise.resolve();
  });
  return utils;
}

describe('Global Search CPIModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchParticipantCpiData.mockResolvedValue(cpiRows);
    global.MutationObserver = class MutationObserver {
      disconnect() {}
      observe() {}
      takeRecords() { return []; }
    };
    if (!global.URL.createObjectURL) {
      global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
    }
  });

  it('should load CPI rows from the C3DC endpoint', async () => {
    await renderModal();
    expect(fetchParticipantCpiData.mock.calls.length).toBeGreaterThan(0);
    expect(fetchParticipantCpiData.mock.calls[0][1].participantId).toBe('PART-001');
    expect(fetchParticipantCpiData.mock.calls[0][1].studyId).toBe('phsCPI001');
    expect(screen.getByText('ASSOC-1')).toBeTruthy();
    expect(screen.getByText('2 mapped identifiers')).toBeTruthy();
  });

  it('should combine Hub and Integrated CPI rows without duplicating shared keys', async () => {
    fetchParticipantCpiData.mockResolvedValue([
      {
        associated_id: 'ASSOC-1',
        repository_of_synonym_id: 'Repo One',
        domain_description: 'Integrated description',
        domain_category: 'CategoryA',
        data_location: 'https://example.com/loc-1',
        data_type: 'internal',
        p_id: 'uuid-hub-overlap',
      },
      {
        associated_id: 'ASSOC-3',
        repository_of_synonym_id: 'Repo Three',
        domain_description: 'Integrated only',
        domain_category: 'CategoryC',
        data_location: 'https://example.com/loc-3',
        data_type: 'external',
        p_id: null,
      },
    ]);

    await renderModal();
    expect(screen.getByText('ASSOC-1')).toBeTruthy();
    expect(screen.getByText('ASSOC-2')).toBeTruthy();
    expect(screen.getByText('ASSOC-3')).toBeTruthy();
    expect(screen.getByText('Integrated description')).toBeTruthy();
    expect(screen.getByText('3 mapped identifiers')).toBeTruthy();
  });

  it('should still show Hub CPI rows when Integrated fetch fails', async () => {
    fetchParticipantCpiData.mockRejectedValue(new Error('network'));
    await renderModal();
    expect(screen.getByText('ASSOC-1')).toBeTruthy();
    expect(screen.getByText('ASSOC-2')).toBeTruthy();
    expect(screen.getByText(/Unable to load CPI mappings from Clinical Commons/i)).toBeTruthy();
    expect(screen.getByText('2 mapped identifiers')).toBeTruthy();
  });

  it('should call onClose when the close icon is clicked', async () => {
    const onClose = jest.fn();
    await renderModal({ onClose });
    fireEvent.click(screen.getByLabelText('close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('should open C3DC Explore Participants with p_id only', async () => {
    await renderModal();
    fireEvent.click(screen.getByRole('button', { name: /VIEW IN EXPLORE/i }));
    expect(openC3dcExplore).toHaveBeenCalledWith('PART-001');
  });

  it('should not show cart actions', async () => {
    await renderModal();
    expect(screen.queryByText(/ADD TO OR GO TO CART/i)).toBeNull();
  });
});
