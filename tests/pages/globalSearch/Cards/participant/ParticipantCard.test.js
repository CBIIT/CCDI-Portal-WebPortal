/**
 * Global Search — **Participant card** (presentational).
 *
 * @see src/pages/globalSearch/Cards/participant/ParticipantCard.js
 */

jest.mock('../../../../../src/bento/studiesData', () => ({
  studyDownloadLinks: {},
  openDoubleLink: jest.fn(),
}));

jest.mock('../../../../../src/pages/globalSearch/Cards/participant/CPIModal', () => {
  const React = require('react');
  const Mock = (props) =>
    props.open ? <div data-testid="cpi-modal-open">CPI modal (mock)</div> : null;
  return Mock;
});

jest.mock('../../../../../src/pages/globalSearch/Cards/participant/c3dcService', () => ({
  openC3dcExplore: jest.fn(),
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MemoryRouter } from 'react-router-dom';
import ParticipantCard from '../../../../../src/pages/globalSearch/Cards/participant/ParticipantCard';
import { openC3dcExplore } from '../../../../../src/pages/globalSearch/Cards/participant/c3dcService';
import {
  participantCardRow,
  participantCardRowWithCpi,
} from '../../../../fixtures/globalSearch/cardPresentationFixtures';

const theme = createMuiTheme();

function renderParticipantCard({ data }) {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <ParticipantCard data={data} index={0} />
      </ThemeProvider>
    </MemoryRouter>,
  );
}

describe('ParticipantCard', () => {
  let offsetWidthSpy;

  beforeEach(() => {
    jest.clearAllMocks();
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
      renderParticipantCard({ data: participantCardRow });
      expect(screen.queryByText('AVAILABLE ACTIONS')).not.toBeInTheDocument();
    });

    it('should render Study ID as a link to the study route', () => {
      renderParticipantCard({ data: participantCardRow });
      const studyButton = screen.getByRole('button', { name: participantCardRow.study_id });
      expect(studyButton).toHaveAttribute('href', `/studies/${participantCardRow.study_id}`);
    });

    it('should not offer cohort or cart actions', () => {
      renderParticipantCard({ data: participantCardRowWithCpi });
      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      expect(screen.queryByText('ADD TO EXISTING COHORT')).not.toBeInTheDocument();
      expect(screen.queryByText('ADD TO CART')).not.toBeInTheDocument();
    });
  });

  describe('Side effects', () => {
    it('should open C3DC Explore when VIEW IN EXPLORE DASHBOARD is chosen', () => {
      renderParticipantCard({ data: participantCardRowWithCpi });
      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('VIEW IN EXPLORE DASHBOARD'));
      expect(openC3dcExplore).toHaveBeenCalledWith(
        participantCardRowWithCpi.participant_id,
      );
    });

    it('should expand and collapse long treatment agent text', () => {
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
      });

      const expandToggle = document.querySelector('span[class*="expandToggle"]');
      expect(expandToggle).toBeTruthy();
      fireEvent.click(expandToggle);
      expect(screen.getByText(longAgent)).toBeInTheDocument();
    });

    it('should close AVAILABLE ACTIONS menu on outside mousedown', () => {
      renderParticipantCard({ data: participantCardRowWithCpi });
      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      expect(screen.getByText('VIEW IN EXPLORE DASHBOARD')).toBeInTheDocument();
      fireEvent.mouseDown(document.body);
      expect(screen.queryByText('VIEW IN EXPLORE DASHBOARD')).not.toBeInTheDocument();
    });

    it('should open CPI mapping modal from AVAILABLE ACTIONS', () => {
      renderParticipantCard({ data: participantCardRowWithCpi });
      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('VIEW CPI MAPPING'));
      expect(screen.getByTestId('cpi-modal-open')).toBeInTheDocument();
    });
  });
});
