/**
 * Global Search **Redux-connected cards** (`FilesCardRedux`, `ParticipantCardRedux`) — minimal store + Apollo stub.
 *
 * Phase 4: complements **`globalSearchCards.test.js`** (presentational **`ParticipantCard`** / **`FilesCard`**).
 *
 * @see src/pages/globalSearch/Cards/files/FilesCardRedux.js
 * @see src/pages/globalSearch/Cards/participant/ParticipantCardRedux.js
 */

jest.mock('../../../src/components/CohortSelectorState/CohortStateContext', () => {
  const React = require('react');
  const CohortStateContext = React.createContext({
    state: {},
    dispatch: jest.fn(),
  });
  return { CohortStateContext };
});

jest.mock('../../../src/pages/globalSearch/Cards/participant/CPIModal', () => {
  const React = require('react');
  return () => null;
});

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useApolloClient: jest.fn(() => ({
    query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
  })),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(() => jest.fn()),
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import FilesCardRedux from '../../../src/pages/globalSearch/Cards/files/FilesCardRedux';
import ParticipantCardRedux from '../../../src/pages/globalSearch/Cards/participant/ParticipantCardRedux';
import { CohortStateContext } from '../../../src/components/CohortSelectorState/CohortStateContext';

import {
  filesCardRow,
  participantCardRow,
} from '../../fixtures/globalSearch/cardPresentationFixtures';

function cartStore(filesId = [], count = 0) {
  return createStore(() => ({
    cartReducer: {
      count,
      filesId,
    },
  }));
}

describe('Global Search — Redux cards', () => {
  beforeEach(() => {
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

  describe('FilesCardRedux', () => {
    it('should inject cart state and render the files card shell', () => {
      render(
        <Provider store={cartStore(['existing-id'], 1)}>
          <MemoryRouter>
            <FilesCardRedux data={filesCardRow} index={0} />
          </MemoryRouter>
        </Provider>,
      );

      expect(screen.getByText('FILES')).toBeInTheDocument();
      expect(screen.getByText(filesCardRow.file_name)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    });
  });

  describe('ParticipantCardRedux', () => {
    it('should inject Apollo client + cart and render participant metadata', () => {
      render(
        <Provider store={cartStore([], 0)}>
          <CohortStateContext.Provider
            value={{
              state: {
                cohortA: {
                  cohortName: 'Alpha',
                  cohortDescription: '',
                  participants: [],
                },
              },
              dispatch: jest.fn(),
            }}
          >
            <MemoryRouter>
              <ParticipantCardRedux data={participantCardRow} index={0} />
            </MemoryRouter>
          </CohortStateContext.Provider>
        </Provider>,
      );

      expect(screen.getByText('PARTICIPANT')).toBeInTheDocument();
      expect(screen.getByText(participantCardRow.participant_id)).toBeInTheDocument();
      expect(screen.getByText(participantCardRow.diagnosis_str)).toBeInTheDocument();
    });
  });
});
