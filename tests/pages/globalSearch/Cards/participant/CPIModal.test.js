/**
 * Global Search **`CPIModal`** — alternative-identifier table modal.
 *
 * Mocks:
 *   - `react-router-dom`'s **`useNavigate`** (Explore + cart routes).
 *   - **`ReduxAddFile`** so we don't drag in Apollo/redux for the dropdown buttons.
 *   - **`URL.createObjectURL`** + **`Blob`** so the CSV download path is exercisable.
 *
 * Coverage targets: rendering, select-all + individual checkbox toggling
 * (skipping `external` rows), Explore navigation, dropdown open/close,
 * Go-to-cart navigation, and the **DOWNLOAD ALTERNATIVE IDS** flow.
 *
 * @see src/pages/globalSearch/Cards/participant/CPIModal.js
 */

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  __esModule: true,
  useNavigate: () => mockNavigate,
}));

jest.mock(
  '../../../../../src/pages/globalSearch/Cards/participant/ReduxAddFile',
  () => {
    const ReactLib = require('react');
    return {
      __esModule: true,
      default: (props) => (
        ReactLib.createElement(
          'button',
          {
            type: 'button',
            'data-testid': `redux-add-file-${props.btnType || 'unknown'}`,
            disabled: !!props.disabled,
          },
          props.title || 'AddFileButton',
        )
      ),
    };
  },
);

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import CPIModal from '../../../../../src/pages/globalSearch/Cards/participant/CPIModal';

const buildRow = (overrides = {}) => ({
  id: 'cpi-row-1',
  participant_id: 'PART-001',
  study_id: 'phsCPI001',
  cpi_data: [
    {
      data_type: 'internal',
      p_id: 'p-1',
      associated_id: 'ASSOC-1',
      repository_of_synonym_id: 'Repo One',
      domain_description: 'Tumor synonym',
      domain_category: 'CategoryA',
      data_location: 'https://example.com/loc-1',
    },
    {
      data_type: 'internal',
      p_id: 'p-2',
      associated_id: 'ASSOC-2',
      repository_of_synonym_id: 'Repo Two',
      domain_description: 'Other description',
      domain_category: 'CategoryB',
      data_location: 'https://example.com/loc-2',
    },
    {
      data_type: 'external',
      p_id: 'p-3',
      associated_id: 'ASSOC-3',
      repository_of_synonym_id: 'External Repo',
      domain_description: 'External description',
      domain_category: 'CategoryC',
      data_location: 'https://example.com/loc-3',
    },
  ],
  ...overrides,
});

describe('Global Search — CPIModal', () => {
  let logSpy;

  beforeEach(() => {
    mockNavigate.mockReset();
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
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
    if (!global.URL.revokeObjectURL) {
      global.URL.revokeObjectURL = jest.fn();
    }
  });

  afterEach(() => {
    logSpy.mockRestore();
    if (global.URL.createObjectURL.mockRestore) {
      global.URL.createObjectURL.mockRestore();
    }
  });

  describe('Rendering', () => {
    it('should render nothing when open is false', () => {
      render(<CPIModal open={false} onClose={jest.fn()} row={buildRow()} />);
      expect(screen.queryByText(/Alternative Identifiers/i)).not.toBeInTheDocument();
    });

    it('should render the modal title with participant and study ids', () => {
      render(<CPIModal open onClose={jest.fn()} row={buildRow()} />);
      expect(
        screen.getByText(/Alternative Identifiers for Participant PART-001 in phsCPI001/i),
      ).toBeInTheDocument();
    });

    it('should render the mapped identifier count', () => {
      render(<CPIModal open onClose={jest.fn()} row={buildRow()} />);
      expect(screen.getByText('3 mapped identifiers')).toBeInTheDocument();
    });

    it('should render rows with associated identifiers and external data link', () => {
      render(<CPIModal open onClose={jest.fn()} row={buildRow()} />);
      expect(screen.getByText('ASSOC-1')).toBeInTheDocument();
      expect(screen.getByText('ASSOC-2')).toBeInTheDocument();
      expect(screen.getByText('ASSOC-3')).toBeInTheDocument();
      const link = screen.getAllByRole('link').find(
        (a) => a.getAttribute('href') === 'https://example.com/loc-1',
      );
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('should render the More Info link in the footer', () => {
      render(<CPIModal open onClose={jest.fn()} row={buildRow()} />);
      const footerLink = screen.getByRole('link', { name: /here/i });
      expect(footerLink).toHaveAttribute(
        'href',
        'https://participantindex-docs.ccdi.cancer.gov/',
      );
    });

    it('should disable rows whose data_type is external', () => {
      render(<CPIModal open onClose={jest.fn()} row={buildRow()} />);
      const checkboxes = screen.getAllByRole('checkbox');
      // 1 select-all + 3 row checkboxes
      expect(checkboxes).toHaveLength(4);
      // External row (index 3 in DOM order) is disabled.
      expect(checkboxes[3]).toBeDisabled();
      // Internal rows are not disabled.
      expect(checkboxes[1]).not.toBeDisabled();
      expect(checkboxes[2]).not.toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('should toggle a single internal row checkbox', () => {
      render(<CPIModal open onClose={jest.fn()} row={buildRow()} />);
      const checkboxes = screen.getAllByRole('checkbox');
      // Toggle on
      fireEvent.click(checkboxes[1]);
      expect(checkboxes[1]).toBeChecked();
      // Toggle off
      fireEvent.click(checkboxes[1]);
      expect(checkboxes[1]).not.toBeChecked();
    });

    it('should select all internal rows when select-all is toggled on', () => {
      render(<CPIModal open onClose={jest.fn()} row={buildRow()} />);
      const checkboxes = screen.getAllByRole('checkbox');
      const [selectAll, internal1, internal2, external] = checkboxes;
      fireEvent.click(selectAll);
      expect(internal1).toBeChecked();
      expect(internal2).toBeChecked();
      expect(external).not.toBeChecked();
    });

    it('should clear all selections when select-all is toggled off', () => {
      render(<CPIModal open onClose={jest.fn()} row={buildRow()} />);
      const checkboxes = screen.getAllByRole('checkbox');
      const [selectAll, internal1] = checkboxes;
      fireEvent.click(selectAll);
      expect(internal1).toBeChecked();
      fireEvent.click(selectAll);
      expect(internal1).not.toBeChecked();
    });

    it('should call onClose when the close icon is clicked', () => {
      const onClose = jest.fn();
      render(<CPIModal open onClose={onClose} row={buildRow()} />);
      fireEvent.click(screen.getByLabelText('close'));
      expect(onClose).toHaveBeenCalled();
    });

    it('should navigate to Explore with participant and study filters', () => {
      render(<CPIModal open onClose={jest.fn()} row={buildRow()} />);
      fireEvent.click(screen.getByRole('button', { name: /VIEW IN EXPLORE/i }));
      expect(mockNavigate).toHaveBeenCalledWith(
        '/explore?p_id=PART-001&dbgap_accession=phsCPI001',
      );
    });

    it('should toggle the cart dropdown when the trigger is clicked', () => {
      render(<CPIModal open onClose={jest.fn()} row={buildRow()} />);
      // Closed initially
      expect(screen.queryByRole('button', { name: /^GO TO CART$/i })).not.toBeInTheDocument();
      // Open
      fireEvent.click(screen.getByRole('button', { name: /ADD TO OR GO TO CART/i }));
      expect(screen.getByRole('button', { name: /^GO TO CART$/i })).toBeInTheDocument();
      expect(screen.getByTestId('redux-add-file-ADD_ALL_FILES')).toBeInTheDocument();
      expect(screen.getByTestId('redux-add-file-ADD_SELECTED_FILES')).toBeInTheDocument();
    });

    it('should navigate to /fileCentricCart when GO TO CART is clicked', () => {
      render(<CPIModal open onClose={jest.fn()} row={buildRow()} />);
      fireEvent.click(screen.getByRole('button', { name: /ADD TO OR GO TO CART/i }));
      fireEvent.click(screen.getByRole('button', { name: /^GO TO CART$/i }));
      expect(mockNavigate).toHaveBeenCalledWith('/fileCentricCart');
    });

    it('should disable ADD_SELECTED_FILES when no rows are selected', () => {
      render(<CPIModal open onClose={jest.fn()} row={buildRow()} />);
      fireEvent.click(screen.getByRole('button', { name: /ADD TO OR GO TO CART/i }));
      expect(screen.getByTestId('redux-add-file-ADD_SELECTED_FILES')).toBeDisabled();
    });

    it('should enable ADD_SELECTED_FILES once an internal row is selected', () => {
      render(<CPIModal open onClose={jest.fn()} row={buildRow()} />);
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]);
      fireEvent.click(screen.getByRole('button', { name: /ADD TO OR GO TO CART/i }));
      expect(screen.getByTestId('redux-add-file-ADD_SELECTED_FILES')).not.toBeDisabled();
    });
  });

  describe('CSV download', () => {
    it('should trigger a CSV download when DOWNLOAD ALTERNATIVE IDS is clicked', () => {
      render(
        <CPIModal
          open
          onClose={jest.fn()}
          row={buildRow({
            cpi_data: [
              {
                data_type: 'internal',
                p_id: 'p-1',
                associated_id: 'ID, with comma',
                repository_of_synonym_id: 'Has "quote"',
                domain_description: 'Multi\nline',
                domain_category: 'Cat',
                data_location: 'https://example.com/loc-1',
              },
            ],
          })}
        />,
      );

      // Mock createElement('a') and link injection only after render so
      // testing-library can build its container normally.
      const clickSpy = jest.fn();
      const linkEl = {
        setAttribute: jest.fn(),
        click: clickSpy,
        style: {},
      };
      const createElementSpy = jest
        .spyOn(document, 'createElement')
        .mockImplementation((tag) => {
          if (tag === 'a') return linkEl;
          return Document.prototype.createElement.call(document, tag);
        });
      const appendSpy = jest.spyOn(document.body, 'appendChild').mockImplementation(() => linkEl);
      const removeSpy = jest.spyOn(document.body, 'removeChild').mockImplementation(() => linkEl);

      try {
        fireEvent.click(
          screen.getByRole('button', { name: /DOWNLOAD\s*ALTERNATIVE IDS/i }),
        );

        expect(linkEl.setAttribute).toHaveBeenCalledWith('href', 'blob:mock-url');
        expect(linkEl.setAttribute).toHaveBeenCalledWith(
          'download',
          'alternative_identifiers_PART-001_phsCPI001.csv',
        );
        expect(clickSpy).toHaveBeenCalled();
      } finally {
        createElementSpy.mockRestore();
        appendSpy.mockRestore();
        removeSpy.mockRestore();
      }
    });
  });
});
