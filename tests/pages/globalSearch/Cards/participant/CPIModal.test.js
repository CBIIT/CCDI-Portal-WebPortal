/**
 * Global Search **`CPIModal`** — alternative-identifier table modal.
 *
 * @see src/pages/globalSearch/Cards/participant/CPIModal.js
 */

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useApolloClient: jest.fn(() => ({ query: jest.fn() })),
}));

jest.mock('../../../../../src/pages/globalSearch/Cards/participant/c3dcService', () => ({
  fetchParticipantCpiData: jest.fn(),
  openC3dcExplore: jest.fn(),
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import CPIModal from '../../../../../src/pages/globalSearch/Cards/participant/CPIModal';
import {
  fetchParticipantCpiData,
  openC3dcExplore,
} from '../../../../../src/pages/globalSearch/Cards/participant/c3dcService';

const theme = createMuiTheme();

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

function renderModal(props = {}) {
  return render(
    <ThemeProvider theme={theme}>
      <CPIModal open onClose={jest.fn()} row={buildRow()} {...props} />
    </ThemeProvider>,
  );
}

function whenLoaded(assertions, done) {
  setTimeout(() => {
    try {
      assertions();
      done();
    } catch (err) {
      done.fail(err);
    }
  }, 100);
}

describe('Global Search — CPIModal', () => {
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
    } else {
      jest.spyOn(global.URL, 'createObjectURL').mockReturnValue('blob:mock-url');
    }
  });

  afterEach(() => {
    if (global.URL.createObjectURL && global.URL.createObjectURL.mockRestore) {
      global.URL.createObjectURL.mockRestore();
    }
  });

  it('should load CPI rows from the C3DC endpoint', (done) => {
    renderModal();
    whenLoaded(() => {
      // Avoid waitFor + expect.anything() — hangs under Jest 23 / jasmine.
      expect(fetchParticipantCpiData.mock.calls.length).toBeGreaterThan(0);
      expect(fetchParticipantCpiData.mock.calls[0][1].participantId).toBe('PART-001');
      expect(fetchParticipantCpiData.mock.calls[0][1].studyId).toBe('phsCPI001');
      expect(screen.getByText('ASSOC-1')).toBeTruthy();
      expect(screen.getByText('2 mapped identifiers')).toBeTruthy();
    }, done);
  });

  it('should call onClose when the close icon is clicked', (done) => {
    const onClose = jest.fn();
    renderModal({ onClose });
    whenLoaded(() => {
      fireEvent.click(screen.getByLabelText('close'));
      expect(onClose).toHaveBeenCalled();
    }, done);
  });

  it('should open C3DC Explore Participants with p_id only', (done) => {
    renderModal();
    whenLoaded(() => {
      fireEvent.click(screen.getByRole('button', { name: /VIEW IN EXPLORE/i }));
      expect(openC3dcExplore).toHaveBeenCalledWith('PART-001');
    }, done);
  });

  it('should not show cart actions', (done) => {
    renderModal();
    whenLoaded(() => {
      expect(screen.queryByText(/ADD TO OR GO TO CART/i)).toBeNull();
    }, done);
  });
});
