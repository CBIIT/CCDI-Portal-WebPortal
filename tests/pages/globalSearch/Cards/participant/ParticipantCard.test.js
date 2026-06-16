/**
 * Global Search — **Participant card** (presentational).
 *
 * Focused coverage for **truncation**, **Study ID** `Link`, **treatment agent** expand, **click-outside**
 * dropdown close, **cohort** toast branches via mocked `success` callbacks, and **cart** guard / limit paths.
 *
 * Mocks: **`CohortStateContext`**, **`CPIModal`**, **`useNavigate`**, **`studiesData`**.
 *
 * @see src/pages/globalSearch/Cards/participant/ParticipantCard.js
 */

jest.mock('../../../../../src/bento/studiesData', () => ({
  studyDownloadLinks: {},
  openDoubleLink: jest.fn(),
}));

jest.mock('../../../../../src/components/CohortSelectorState/CohortStateContext', () => {
  const React = require('react');
  const CohortStateContext = React.createContext({
    state: {},
    dispatch: jest.fn(),
  });
  return { CohortStateContext };
});

jest.mock('../../../../../src/pages/globalSearch/Cards/participant/CPIModal', () => {
  const React = require('react');
  const Mock = (props) =>
    props.open ? <div data-testid="cpi-modal-open">CPI modal (mock)</div> : null;
  return Mock;
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MemoryRouter } from 'react-router-dom';
import * as ReactRouterDOM from 'react-router-dom';
import { CohortStateContext } from '../../../../../src/components/CohortSelectorState/CohortStateContext';
import ParticipantCard from '../../../../../src/pages/globalSearch/Cards/participant/ParticipantCard';
import {
  participantCardRow,
  participantCardRowWithCpi,
} from '../../../../fixtures/globalSearch/cardPresentationFixtures';

const theme = createMuiTheme();
const mockNavigate = jest.fn();

function renderParticipantCard({
  data,
  mockClient,
  addFiles = jest.fn(),
  cohortState = {},
  cohortDispatch = jest.fn(),
  cartFiles = [],
  setAlterDisplay = jest.fn(),
  setOpenSnackbar = jest.fn(),
}) {
  ReactRouterDOM.useNavigate.mockReturnValue(mockNavigate);
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <CohortStateContext.Provider
          value={{
            state: cohortState,
            dispatch: cohortDispatch,
          }}
        >
          <ParticipantCard
            data={data}
            index={0}
            addFiles={addFiles}
            setAlterDisplay={setAlterDisplay}
            setOpenSnackbar={setOpenSnackbar}
            client={mockClient}
            cartFiles={cartFiles}
            alertMessage="Cart limit message"
          />
        </CohortStateContext.Provider>
      </ThemeProvider>
    </MemoryRouter>,
  );
}

describe('ParticipantCard', () => {
  let offsetWidthSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    ReactRouterDOM.useNavigate.mockReturnValue(mockNavigate);
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

  afterEach(() => {
    offsetWidthSpy?.mockRestore();
  });

  describe('Rendering', () => {
    it('should not render AVAILABLE ACTIONS when cpi_data is empty', () => {
      const mockClient = {
        query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
      };
      renderParticipantCard({ data: participantCardRow, mockClient });
      expect(screen.queryByText('AVAILABLE ACTIONS')).not.toBeInTheDocument();
    });

    it('should render Study ID as a link to the study route', () => {
      const mockClient = {
        query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
      };
      renderParticipantCard({ data: participantCardRow, mockClient });
      const studyButton = screen.getByRole('button', { name: participantCardRow.study_id });
      expect(studyButton).toHaveAttribute('href', `/studies/${participantCardRow.study_id}`);
    });
  });

  describe('Side effects', () => {
    it('should navigate to Explore when VIEW IN EXPLORE DASHBOARD is chosen', () => {
      const mockClient = {
        query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
      };
      renderParticipantCard({ data: participantCardRowWithCpi, mockClient });
      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('VIEW IN EXPLORE DASHBOARD'));
      expect(mockNavigate).toHaveBeenCalledWith(
        `/explore?p_id=${participantCardRowWithCpi.participant_id}`,
      );
    });

    it('should expand and collapse long treatment agent text', () => {
      const mockClient = {
        query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
      };
      const longAgent = `${'Agent molecule '.repeat(10)}suffix`;

      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 900,
      });

      renderParticipantCard({
        data: {
          ...participantCardRowWithCpi,
          treatment_type_str: 'Short',
          treatment_agent_str: longAgent,
        },
        mockClient,
      });

      const expandToggle = document.querySelector('span[class*="expandToggle"]');
      expect(expandToggle).toBeTruthy();
      fireEvent.click(expandToggle);
      expect(screen.getByText(longAgent)).toBeInTheDocument();
    });

    it('should close AVAILABLE ACTIONS menu on outside mousedown', () => {
      const mockClient = {
        query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
      };
      renderParticipantCard({ data: participantCardRowWithCpi, mockClient });
      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      expect(screen.getByText('VIEW IN EXPLORE DASHBOARD')).toBeInTheDocument();
      fireEvent.mouseDown(document.body);
      expect(screen.queryByText('VIEW IN EXPLORE DASHBOARD')).not.toBeInTheDocument();
    });

    it('should open CPI mapping modal from AVAILABLE ACTIONS', () => {
      const mockClient = {
        query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
      };
      renderParticipantCard({ data: participantCardRowWithCpi, mockClient });
      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('VIEW CPI MAPPING'));
      expect(screen.getByTestId('cpi-modal-open')).toBeInTheDocument();
    });

    it('should show success toast when cohort add succeeds with count 1', async () => {
      const mockClient = {
        query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
      };
      const cohortDispatch = jest.fn((action) => {
        if (action.payload?.success) {
          action.payload.success(1);
        }
      });
      renderParticipantCard({
        data: participantCardRowWithCpi,
        mockClient,
        cohortDispatch,
        cohortState: {
          cohortA: {
            cohortName: 'Cohort Alpha',
            cohortDescription: 'd',
            participants: [],
          },
        },
      });
      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('ADD TO EXISTING COHORT'));
      fireEvent.click(screen.getByText('Cohort Alpha'));
      await waitFor(() => {
        expect(
          screen.getByText('Participant added to Cohort Alpha'),
        ).toBeInTheDocument();
      });
    });

    it('should show info toast when participant is already in cohort', async () => {
      const mockClient = {
        query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
      };
      const cohortDispatch = jest.fn((action) => {
        if (action.payload?.success) {
          action.payload.success(0);
        }
      });
      renderParticipantCard({
        data: participantCardRowWithCpi,
        mockClient,
        cohortDispatch,
        cohortState: {
          cohortA: {
            cohortName: 'Cohort Alpha',
            cohortDescription: 'd',
            participants: [],
          },
        },
      });
      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('ADD TO EXISTING COHORT'));
      fireEvent.click(screen.getByText('Cohort Alpha'));
      await waitFor(() => {
        expect(
          screen.getByText('Participant is already in Cohort Alpha'),
        ).toBeInTheDocument();
      });
    });

    it('should show error toast when cohort add fails', async () => {
      const mockClient = {
        query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
      };
      const cohortDispatch = jest.fn((action) => {
        if (action.payload?.error) {
          action.payload.error(new Error('boom'));
        }
      });
      renderParticipantCard({
        data: participantCardRowWithCpi,
        mockClient,
        cohortDispatch,
        cohortState: {
          cohortA: {
            cohortName: 'Cohort Alpha',
            cohortDescription: 'd',
            participants: [],
          },
        },
      });
      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('ADD TO EXISTING COHORT'));
      fireEvent.click(screen.getByText('Cohort Alpha'));
      await waitFor(() => {
        expect(
          screen.getByText('Failed to add participant to Cohort Alpha'),
        ).toBeInTheDocument();
      });
    });
  });

  describe('Edge cases', () => {
    it('should warn and skip cart when addFiles is missing', async () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const mockClient = {
        query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
      };
      renderParticipantCard({
        data: participantCardRowWithCpi,
        mockClient,
        addFiles: null,
      });
      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('ADD TO CART'));
      await waitFor(() => {
        expect(warnSpy).toHaveBeenCalledWith(
          'Cart functionality not available: missing required props',
        );
      });
      warnSpy.mockRestore();
    });

    it('should warn and skip cart when client is missing', async () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      renderParticipantCard({
        data: participantCardRowWithCpi,
        mockClient: undefined,
        addFiles: jest.fn(),
      });
      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('ADD TO CART'));
      await waitFor(() => {
        expect(warnSpy).toHaveBeenCalledWith(
          'Cart functionality not available: missing required props',
        );
      });
      warnSpy.mockRestore();
    });

    it('should show cart limit error when cart file count is already at upper bound', async () => {
      const mockClient = {
        query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
      };
      const cartFull = Array.from({ length: 200000 }, (_, i) => `cart-${i}`);
      renderParticipantCard({
        data: participantCardRowWithCpi,
        mockClient,
        addFiles: jest.fn(),
        cartFiles: cartFull,
      });
      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('ADD TO CART'));
      await waitFor(() => {
        expect(
          screen.getByText('Cart limit reached. Please remove some files first.'),
        ).toBeInTheDocument();
      });
    });

    it('should show cart limit error when resolved file count exceeds upper bound', async () => {
      const addFiles = jest.fn();
      const mockClient = {
        query: jest.fn(() =>
          Promise.resolve({
            data: {
              fileIDsFromList: Array.from({ length: 200001 }, (_, i) => `f-${i}`),
            },
          }),
        ),
      };
      renderParticipantCard({
        data: participantCardRowWithCpi,
        mockClient,
        addFiles,
        cartFiles: [],
      });
      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('ADD TO CART'));
      await waitFor(() => {
        expect(
          screen.getByText('Cart limit reached. Please remove some files first.'),
        ).toBeInTheDocument();
      });
      expect(addFiles).not.toHaveBeenCalled();
    });

    it('should show info notification when all resolved files are already in cart', async () => {
      const addFiles = jest.fn();
      const setOpenSnackbar = jest.fn();
      const mockClient = {
        query: jest.fn(() =>
          Promise.resolve({
            data: {
              fileIDsFromList: ['dup-1', 'dup-2', 'dup-1'],
            },
          }),
        ),
      };

      renderParticipantCard({
        data: participantCardRowWithCpi,
        mockClient,
        addFiles,
        cartFiles: ['dup-1', 'dup-2'],
        setOpenSnackbar,
      });

      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('ADD TO CART'));

      await waitFor(() => {
        expect(screen.getByText('Files already in cart')).toBeInTheDocument();
      });
      expect(addFiles).not.toHaveBeenCalled();
      expect(setOpenSnackbar).toHaveBeenCalledWith(true);
    });

    it('should add only non-duplicate files when response includes cart duplicates', async () => {
      const addFiles = jest.fn();
      const setOpenSnackbar = jest.fn();
      const mockClient = {
        query: jest.fn(() =>
          Promise.resolve({
            data: {
              fileIDsFromList: ['dup-1', 'new-1', 'new-2', 'new-2'],
            },
          }),
        ),
      };

      renderParticipantCard({
        data: participantCardRowWithCpi,
        mockClient,
        addFiles,
        cartFiles: ['dup-1'],
        setOpenSnackbar,
      });

      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('ADD TO CART'));

      await waitFor(() => {
        expect(addFiles).toHaveBeenCalledWith(['new-1', 'new-2']);
      });
      expect(setOpenSnackbar).toHaveBeenCalledWith(true);
      expect(
        screen.getByText('2 File(s) successfully added to your cart'),
      ).toBeInTheDocument();
    });

    it('should show Tooltip-truncated title when card width is constrained', async () => {
      const mockClient = {
        query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
      };
      const longId = `PART-${'X'.repeat(120)}-END`;
      offsetWidthSpy = jest
        .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
        .mockImplementation(function mockWidth() {
          if (this.style && this.style.visibility === 'hidden') {
            return 900;
          }
          return 160;
        });

      renderParticipantCard({
        data: { ...participantCardRow, participant_id: longId },
        mockClient,
      });

      await waitFor(() => {
        expect(
          screen.getByRole('heading', {
            level: 3,
            name: /^PART-.*\.\.\..*END$/,
          }),
        ).toBeInTheDocument();
      });
    });
  });
});
