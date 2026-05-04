/**
 * Explore Phase 2 — `QueryBarView`: mapped filter chips, clear handlers, unknown-ages rows.
 *
 * `QueryBarGenerator` is mocked so we assert URL navigation + props passed to the query bar
 * without rendering the full `@bento-core/query-bar` UI.
 *
 * @see src/pages/inventory/filterQueryBar/QueryBarView.js
 * @see tests/TEST_STRUCTURE.md
 */

jest.mock('../../../../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: {
    query: jest.fn(() => Promise.resolve({ data: {} })),
    mutate: jest.fn(),
  },
}));

jest.mock('@bento-core/query-bar', () => {
  const React = require('react');
  return {
    QueryBarGenerator: jest.fn(({ functions }) => ({
      QueryBar: function MockQueryBar(props) {
        const statusRows = props.statusReducer || [];
        const hasUnknownAgesChip = Array.isArray(statusRows)
          && statusRows.some((row) => row.isUnknownAges === true);
        return React.createElement(
          'div',
          {
            'data-testid': 'mock-query-bar',
            'data-has-import-from': String(!!props.hasImportFrom),
            'data-has-unknown-ages-chip': String(hasUnknownAgesChip),
          },
          React.createElement('button', {
            type: 'button',
            'data-testid': 'qb-clear-all',
            onClick: () => functions.clearAll(),
          }, 'clear-all'),
          React.createElement('button', {
            type: 'button',
            'data-testid': 'qb-clear-import',
            onClick: () => functions.clearImportFrom(),
          }, 'clear-import'),
          React.createElement('button', {
            type: 'button',
            'data-testid': 'qb-clear-upload',
            onClick: () => functions.clearUpload(),
          }, 'clear-upload'),
          React.createElement('button', {
            type: 'button',
            'data-testid': 'qb-clear-autocomplete',
            onClick: () => functions.clearAutocomplete(),
          }, 'clear-autocomplete'),
          React.createElement('button', {
            type: 'button',
            'data-testid': 'qb-delete-autocomplete-item',
            onClick: () => functions.deleteAutocompleteItem('p1'),
          }, 'delete-autocomplete-item'),
          React.createElement('button', {
            type: 'button',
            'data-testid': 'qb-reset-facet-section',
            onClick: () => functions.resetFacetSection({ datafield: 'sex_at_birth' }),
          }, 'reset-facet-section'),
          React.createElement('button', {
            type: 'button',
            'data-testid': 'qb-reset-slider',
            onClick: () => functions.resetFacetSlider({ datafield: 'age_at_diagnosis', isUnknownAges: false }),
          }, 'reset-slider'),
          React.createElement('button', {
            type: 'button',
            'data-testid': 'qb-reset-slider-unknown',
            onClick: () => functions.resetFacetSlider({
              isUnknownAges: true,
              parentDatafield: 'age_at_diagnosis',
              datafield: 'age_at_diagnosis_unknownAges',
            }),
          }, 'reset-slider-unknown'),
          React.createElement('button', {
            type: 'button',
            'data-testid': 'qb-reset-unknown-ages',
            onClick: () => functions.resetUnknownAges({
              parentDatafield: 'age_at_diagnosis',
              datafield: 'age_at_diagnosis_unknownAges',
            }),
          }, 'reset-unknown-ages'),
          React.createElement('button', {
            type: 'button',
            'data-testid': 'qb-reset-checkbox',
            onClick: () => functions.resetFacetCheckbox(
              { datafield: 'sex_at_birth', items: ['Female', 'Male'] },
              'Female',
            ),
          }, 'reset-checkbox'),
        );
      },
    })),
  };
});

jest.mock('../../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_BACKEND_API: 'http://localhost:4000/graphql',
    REACT_APP_INTEROP_SERVICE_API: 'http://localhost:5000/',
  },
}));

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import '@testing-library/jest-dom';
import { clearAllFilters } from '@bento-core/facet-filter';
import { updateAutocompleteData } from '@bento-core/local-find';

import store from '../../../../src/store';
import QueryBarViewConnected from '../../../../src/pages/inventory/filterQueryBar/QueryBarView';
import { updateImportfrom } from '../../../../src/components/Inventory/InventoryState';
import { exploreDashboardWithSexAtBirthFacets } from '../../../fixtures/explore/apiResponses';
import { resetExploreSingletonStore } from '../../../helpers/exploreStoreReset';

const IMPORT_URL = 'https://example.com/import.json';

function LocationProbe() {
  const { search } = useLocation();
  return (
    <div data-testid="location-probe" data-search={search} />
  );
}

function renderQueryBarAt(path) {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route
            path="/explore"
            element={(
              <>
                <LocationProbe />
                <QueryBarViewConnected
                  data={exploreDashboardWithSexAtBirthFacets}
                  unknownAgesState={{}}
                />
              </>
            )}
          />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

function renderQueryBarWithUnknownAges(path, unknownAgesState) {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route
            path="/explore"
            element={(
              <>
                <LocationProbe />
                <QueryBarViewConnected
                  data={exploreDashboardWithSexAtBirthFacets}
                  unknownAgesState={unknownAgesState}
                />
              </>
            )}
          />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

describe('Explore — QueryBarView (mocked QueryBar)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetExploreSingletonStore();
    store.dispatch(clearAllFilters());

    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  describe('Rendering', () => {
    it('should render the mocked query bar', () => {
      renderQueryBarAt('/explore');
      expect(screen.getByTestId('mock-query-bar')).toBeInTheDocument();
    });

    it('should pass hasImportFrom when import payload exists in Redux', () => {
      store.dispatch(updateImportfrom(IMPORT_URL, [{ id: '1' }]));
      renderQueryBarAt('/explore');

      expect(screen.getByTestId('mock-query-bar')).toHaveAttribute('data-has-import-from', 'true');
    });
  });

  describe('Clear actions (URL + Redux)', () => {
    it('should navigate to a cleared explore URL when clear-all runs', async () => {
      renderQueryBarAt('/explore?sex_at_birth=Female');

      fireEvent.click(screen.getByTestId('qb-clear-all'));

      await waitFor(() => {
        const search = screen.getByTestId('location-probe').getAttribute('data-search');
        expect(search).not.toMatch(/sex_at_birth/i);
      });
    });

    it('should strip import_from from the URL when clear-import runs', async () => {
      store.dispatch(updateImportfrom(IMPORT_URL, [{ pid: 'p1' }]));
      renderQueryBarAt(`/explore?import_from=${encodeURIComponent(IMPORT_URL)}`);

      fireEvent.click(screen.getByTestId('qb-clear-import'));

      await waitFor(() => {
        expect(screen.getByTestId('location-probe').getAttribute('data-search')).not.toMatch(/import_from/i);
      });

      expect(store.getState().inventoryReducer.importFromURL).toBeNull();
      expect(store.getState().inventoryReducer.importFromData).toEqual([]);
    });

    it('should strip upload query params when clear-upload runs', async () => {
      renderQueryBarAt('/explore?u=a|b&u_fc=x&u_um=y');

      fireEvent.click(screen.getByTestId('qb-clear-upload'));

      await waitFor(() => {
        const search = screen.getByTestId('location-probe').getAttribute('data-search');
        expect(search).not.toMatch(/[?&]u=/);
        expect(search).not.toMatch(/u_fc/i);
        expect(search).not.toMatch(/u_um/i);
      });
    });

    it('should strip p_id from the URL when clear-autocomplete runs', async () => {
      renderQueryBarAt('/explore?p_id=p001|p002');

      fireEvent.click(screen.getByTestId('qb-clear-autocomplete'));

      await waitFor(() => {
        expect(screen.getByTestId('location-probe').getAttribute('data-search')).not.toMatch(/p_id/i);
      });
    });

    it('should remove one participant id from the URL via deleteAutocompleteItem', async () => {
      store.dispatch(updateAutocompleteData([
        { type: 'participantIds', title: 'p1' },
        { type: 'participantIds', title: 'p2' },
      ]));
      renderQueryBarAt('/explore?p_id=p1|p2');

      fireEvent.click(screen.getByTestId('qb-delete-autocomplete-item'));

      await waitFor(() => {
        const search = screen.getByTestId('location-probe').getAttribute('data-search');
        expect(search).toMatch(/p_id=p2\b|p_id=p2$/);
        expect(search).not.toMatch(/p1/);
      });
    });

    it('should clear a facet section param when resetFacetSection runs', async () => {
      renderQueryBarAt('/explore?sex_at_birth=Female');

      fireEvent.click(screen.getByTestId('qb-reset-facet-section'));

      await waitFor(() => {
        expect(screen.getByTestId('location-probe').getAttribute('data-search')).not.toMatch(/sex_at_birth/i);
      });
    });

    it('should clear age slider and unknown-ages query keys when resetFacetSlider runs on a slider section', async () => {
      renderQueryBarAt('/explore?age_at_diagnosis=0,18&age_at_diagnosis_unknownAges=exclude');

      fireEvent.click(screen.getByTestId('qb-reset-slider'));

      await waitFor(() => {
        const search = screen.getByTestId('location-probe').getAttribute('data-search');
        expect(search).not.toMatch(/age_at_diagnosis=/);
        expect(search).not.toMatch(/age_at_diagnosis_unknownAges/i);
      });
    });

    it('should clear unknown-ages-only param when resetFacetSlider runs on an unknown-ages chip section', async () => {
      renderQueryBarAt('/explore?age_at_diagnosis_unknownAges=exclude');

      fireEvent.click(screen.getByTestId('qb-reset-slider-unknown'));

      await waitFor(() => {
        expect(screen.getByTestId('location-probe').getAttribute('data-search')).not.toMatch(
          /age_at_diagnosis_unknownAges/i,
        );
      });
    });

    it('should clear unknown-ages param when resetUnknownAges runs', async () => {
      renderQueryBarAt('/explore?age_at_diagnosis_unknownAges=exclude');

      fireEvent.click(screen.getByTestId('qb-reset-unknown-ages'));

      await waitFor(() => {
        expect(screen.getByTestId('location-probe').getAttribute('data-search')).not.toMatch(
          /age_at_diagnosis_unknownAges/i,
        );
      });
    });

    it('should drop one checkbox facet value from the URL when resetFacetCheckbox runs', async () => {
      renderQueryBarAt('/explore?sex_at_birth=Female|Male');

      fireEvent.click(screen.getByTestId('qb-reset-checkbox'));

      await waitFor(() => {
        const search = screen.getByTestId('location-probe').getAttribute('data-search');
        expect(search).toMatch(/sex_at_birth=Male/i);
        expect(search).not.toMatch(/Female/);
      });
    });
  });

  describe('Unknown ages mapping', () => {
    it('should pass a synthetic unknown-ages chip when URL encodes exclude without a slider filter row', () => {
      renderQueryBarWithUnknownAges(
        '/explore?age_at_diagnosis=0,18&age_at_diagnosis_unknownAges=exclude',
        {},
      );

      expect(screen.getByTestId('mock-query-bar')).toHaveAttribute(
        'data-has-unknown-ages-chip',
        'true',
      );
    });
  });
});
