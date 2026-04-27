/**
 * Explore milestone 2.5 — `inventoryCover` dashboard fetch lifecycle: Redux **`isDataloading`**
 * during an in-flight `client.query`, and the Explore body stays on the **loading** UI when the
 * GraphQL payload has no **`searchParticipants`** (so `syncUpDashboard` never runs).
 *
 * Does not rely on rejected promises (the app does not attach `.catch` to `getData`), avoiding
 * unhandled-rejection noise in Jest.
 *
 * @see src/pages/inventory/inventoryCover.js (`getData`, `inDataloading`, `syncUpDashboard`)
 */

jest.mock('../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_BACKEND_API: 'http://localhost:4000/graphql',
    REACT_APP_INTEROP_SERVICE_API: 'http://localhost:5000/',
  },
}));

jest.mock('../../../src/utils/graphqlClient', () => ({
  __esModule: true,
  default: {
    query: jest.fn(() => Promise.resolve({ data: {} })),
    mutate: jest.fn(),
  },
}));

jest.mock('@apollo/client', () => {
  const actual = jest.requireActual('@apollo/client');
  return {
    ...actual,
    useApolloClient: jest.fn(),
  };
});

jest.mock('../../../src/pages/inventory/widget/WidgetView', () => ({
  __esModule: true,
  default: function MockWidgetView() {
    return null;
  },
}));

jest.mock('../../../src/pages/inventory/tabs/TabPanel', () => ({
  __esModule: true,
  default: function TabPanel() {
    const React = require('react');
    return React.createElement('div', { 'data-testid': 'tab-panel' });
  },
}));

jest.mock('../../../src/components/CohortSelectorState/CohortStateContext', () => {
  const React = require('react');
  const { initialState } = require('../../../src/components/CohortSelectorState/store/reducer');
  const cohortDispatch = jest.fn();
  const CohortStateContext = React.createContext({ state: initialState, dispatch: cohortDispatch });
  return {
    CohortStateContext,
    CohortStateProvider: ({ children }) => (
      React.createElement(CohortStateContext.Provider, {
        value: { state: initialState, dispatch: cohortDispatch },
      }, children)
    ),
  };
});

jest.mock('../../../src/pages/inventory/cohortModal/cohortModalGenerator', () => ({
  __esModule: true,
  default: () => ({
    CohortModal: function CohortModal() {
      return null;
    },
  }),
}));

jest.mock('../../../src/pages/inventory/cohortModal/CohortModalContext', () => {
  const React = require('react');
  const CohortModalContext = React.createContext();
  const value = {
    showCohortModal: false,
    setShowCohortModal: jest.fn(),
    warningMessage: '',
    setWarningMessage: jest.fn(),
    currentCohortChanges: null,
    setCurrentCohortChanges: jest.fn(),
  };
  return {
    CohortModalContext,
    CohortModalProvider: ({ children }) => (
      React.createElement(CohortModalContext.Provider, { value }, children)
    ),
  };
});

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import { useApolloClient } from '@apollo/client';

import store from '../../../src/store';
import Inventory from '../../../src/pages/inventory/inventoryController';
import {
  exploreDashboardFemaleOnly,
  exploreDashboardWithSexAtBirthFacets,
} from '../../fixtures/explore/apiResponses';
import { resetExploreSingletonStore } from '../../helpers/exploreStoreReset';
import { syncUpDashboard } from '../../../src/components/Inventory/InventoryState';

function renderExplore() {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/explore']}>
        <Routes>
          <Route path="/explore" element={<Inventory />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

async function selectSexAtBirthFemale() {
  const demoHeading = screen.getByText('Demographics');
  fireEvent.click(demoHeading.closest('li') || demoHeading);

  await waitFor(() => {
    expect(screen.getByText('Sex at Birth')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText('Sex at Birth'));

  const facetsRoot = await waitFor(() => {
    const el = document.querySelector('[class*="contentPanelBody"]');
    expect(el).toBeTruthy();
    return el;
  });

  await waitFor(() => {
    expect(facetsRoot.querySelector('input[type="checkbox"], [role="checkbox"]')).toBeTruthy();
  });

  const femaleTarget = await waitFor(() => {
    const leaves = facetsRoot.querySelectorAll('*');
    const textNode = [...leaves].find(
      (n) => n.children.length === 0 && /\bFemale\b/i.test((n.textContent || '').trim()),
    );
    expect(textNode).toBeTruthy();
    const clickable = textNode.closest('.MuiFormControlLabel-root')
      || textNode.closest('button')
      || textNode.closest('li')
      || textNode.parentElement;
    expect(clickable).toBeTruthy();
    return clickable;
  });

  fireEvent.click(femaleTarget);
}

describe('Explore — dashboard query async behavior (inventoryCover)', () => {
  let mockQuery;

  beforeEach(() => {
    jest.clearAllMocks();
    resetExploreSingletonStore();

    mockQuery = jest.fn();
    useApolloClient.mockReturnValue({ query: mockQuery });

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
  });

  it('should set isDataloading until a delayed facet refetch resolves', async () => {
    let calls = 0;
    mockQuery.mockImplementation(() => {
      calls += 1;
      if (calls === 1) {
        return Promise.resolve({ data: { searchParticipants: exploreDashboardWithSexAtBirthFacets } });
      }
      return new Promise((resolve) => {
        setTimeout(
          () => resolve({ data: { searchParticipants: exploreDashboardFemaleOnly } }),
          200,
        );
      });
    });

    renderExplore();

    await waitFor(() => {
      expect(screen.getAllByRole('tab').some((el) => /Participants/i.test(el.textContent))).toBe(true);
    });

    await selectSexAtBirthFemale();

    await waitFor(() => {
      expect(store.getState().inventoryReducer.isDataloading).toBe(true);
    });

    await waitFor(
      () => {
        expect(store.getState().inventoryReducer.isDataloading).toBe(false);
      },
      { timeout: 4000 },
    );

    await waitFor(() => {
      expect(store.getState().inventoryReducer.dashData.numberOfParticipants).toBe(2);
    });
  });

  it('should keep Explore on the loading layout when searchParticipants is missing from the response', async () => {
    store.dispatch(syncUpDashboard(null, null));

    mockQuery.mockResolvedValue({ data: {} });

    renderExplore();

    await waitFor(() => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    expect(store.getState().inventoryReducer.dashData).toBeNull();
  });
});
