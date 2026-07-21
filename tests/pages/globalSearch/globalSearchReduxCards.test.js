/**
 * Global Search **Redux-connected cards** (`FilesCardRedux`, `ParticipantCardRedux`) — pass-through wrappers.
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

jest.mock('../../../src/pages/globalSearch/Cards/participant/c3dcService', () => ({
  openC3dcExplore: jest.fn(),
  openC3dcExploreFiles: jest.fn(),
  openC3dcStudy: jest.fn(),
}));

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useApolloClient: jest.fn(() => ({
    query: jest.fn(() => Promise.resolve({ data: {} })),
  })),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(() => jest.fn()),
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import FilesCardRedux from '../../../src/pages/globalSearch/Cards/files/FilesCardRedux';
import ParticipantCardRedux from '../../../src/pages/globalSearch/Cards/participant/ParticipantCardRedux';
import { CohortStateContext } from '../../../src/components/CohortSelectorState/CohortStateContext';

import {
  filesCardRow,
  participantCardRow,
} from '../../fixtures/globalSearch/cardPresentationFixtures';

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
    it('should render the files card shell with View in Explore', () => {
      render(
        <MemoryRouter>
          <FilesCardRedux data={filesCardRow} index={0} />
        </MemoryRouter>,
      );

      expect(screen.getByText('FILES')).toBeInTheDocument();
      expect(screen.getByText(filesCardRow.file_name)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /view in explore/i })).toBeInTheDocument();
    });
  });

  describe('ParticipantCardRedux', () => {
    it('should render participant metadata', () => {
      render(
        <CohortStateContext.Provider
          value={{
            state: {},
            dispatch: jest.fn(),
          }}
        >
          <MemoryRouter>
            <ParticipantCardRedux data={participantCardRow} index={0} />
          </MemoryRouter>
        </CohortStateContext.Provider>,
      );

      expect(screen.getByText('PARTICIPANT')).toBeInTheDocument();
      expect(screen.getByText(participantCardRow.participant_id)).toBeInTheDocument();
      expect(screen.getByText(participantCardRow.diagnosis_str)).toBeInTheDocument();
    });
  });
});
