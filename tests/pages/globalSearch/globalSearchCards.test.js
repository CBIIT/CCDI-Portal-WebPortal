/**
 * Global Search — **result cards**: Studies, Samples, Models, About, **Participant**, **Files**.
 *
 * Participant: **`CohortStateContext`** mocked; **`CPIModal`** stubbed; **`useNavigate`** mocked for Explore;
 * **`participantCardRowWithCpi`** drives AVAILABLE ACTIONS (Explore, CPI modal toggle, cohort submenu,
 * **`WrapperService`** / **`client.query`** add-to-cart paths). **`ParticipantCardRedux`** stays untested here.
 *
 * Phase 4: MemoryRouter + MUI theme; **`studiesData`** mocked (Studies).
 *
 * @see src/pages/globalSearch/Cards/
 */

jest.mock('../../../src/bento/studiesData', () => ({
  studyDownloadLinks: {
    phsCARD_TEST_001: 'https://example.com/mock-study-manifest.xlsx',
  },
  openDoubleLink: jest.fn(),
}));

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

import StudiesCard from '../../../src/pages/globalSearch/Cards/studies/StudiesCard';
import SamplesCard from '../../../src/pages/globalSearch/Cards/samples/SamplesCard';
import ModelsCard from '../../../src/pages/globalSearch/Cards/models/ModelsCard';
import AboutCard from '../../../src/pages/globalSearch/Cards/AboutCard';
import ParticipantCard from '../../../src/pages/globalSearch/Cards/participant/ParticipantCard';
import FilesCard from '../../../src/pages/globalSearch/Cards/files/FilesCard';
import { CohortStateContext } from '../../../src/components/CohortSelectorState/CohortStateContext';
import * as ReactRouterDOM from 'react-router-dom';

import { openDoubleLink } from '../../../src/bento/studiesData';
import { enableTitleTruncationMocks } from '../../helpers/globalSearchCardTestUtils';
import {
  studiesCardRow,
  studiesCardRowNoManifest,
  longTitleStudiesCardRow,
  samplesCardRow,
  modelsCardRow,
  modelsCardNodeOnlyRow,
  aboutCardPayload,
  aboutCardExternalLinkPayload,
  aboutCardHighlightPayload,
  participantCardRow,
  participantCardRowWithCpi,
  filesCardRow,
  filesCardRowNoParticipant,
  filesCardRowLongIds,
  filesCardRowBracketedParticipant,
} from '../../fixtures/globalSearch/cardPresentationFixtures';

const theme = createMuiTheme();
const mockNavigate = jest.fn();

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('Explore — Global Search cards', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
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

  describe('StudiesCard', () => {
    it('should render study identifiers and open actions dropdown', () => {
      renderWithRouter(<StudiesCard data={studiesCardRow} index={0} />);

      expect(screen.getByText('STUDIES')).toBeInTheDocument();
      expect(screen.getByText(studiesCardRow.study_name)).toBeInTheDocument();
      expect(screen.getByText('AVAILABLE ACTIONS')).toBeInTheDocument();

      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      expect(screen.getByText('VIEW STUDY')).toBeInTheDocument();
      expect(screen.getByText('DOWNLOAD MANIFEST')).toBeInTheDocument();
      expect(screen.getByText('CCDI CBioPortal')).toBeInTheDocument();
    });

    it('should navigate to study page when VIEW STUDY is selected', () => {
      renderWithRouter(<StudiesCard data={studiesCardRow} index={0} />);
      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('VIEW STUDY'));
      expect(mockNavigate).toHaveBeenCalledWith(`/studies/${studiesCardRow.study_id}`);
    });

    it('should download manifest when link exists for study', () => {
      renderWithRouter(<StudiesCard data={studiesCardRow} index={0} />);
      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('DOWNLOAD MANIFEST'));
      expect(openDoubleLink).toHaveBeenCalledWith(
        'https://example.com/mock-study-manifest.xlsx',
        `${studiesCardRow.study_id}_CCDI_Study_Manifest.xlsx`,
      );
    });

    it('should warn when manifest link is missing for study', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      renderWithRouter(<StudiesCard data={studiesCardRowNoManifest} index={0} />);
      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('DOWNLOAD MANIFEST'));
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining(studiesCardRowNoManifest.study_id),
      );
      warnSpy.mockRestore();
    });

    it('should open cBioPortal in a new window', () => {
      window.open = jest.fn();
      renderWithRouter(<StudiesCard data={studiesCardRow} index={0} />);
      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('CCDI CBioPortal'));
      expect(window.open).toHaveBeenCalledWith('https://cbioportal.ccdi.cancer.gov/', '_blank');
    });

    it('should close dropdown when clicking outside', () => {
      renderWithRouter(<StudiesCard data={studiesCardRow} index={0} />);
      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      expect(screen.getByText('VIEW STUDY')).toBeInTheDocument();
      fireEvent.mouseDown(document.body);
      expect(screen.queryByText('VIEW STUDY')).not.toBeInTheDocument();
    });

    it('should truncate long study id title when card is narrow', () => {
      const truncation = enableTitleTruncationMocks();
      const { container } = renderWithRouter(
        <StudiesCard data={longTitleStudiesCardRow} index={0} />,
      );
      truncation.setCardWidth(container.firstChild);
      truncation.triggerResize();
      expect(container.textContent).toMatch(/\.\.\./);
      truncation.restore();
    });
  });

  describe('SamplesCard', () => {
    it('should render sample and participant identifiers', () => {
      renderWithRouter(<SamplesCard data={samplesCardRow} index={1} />);

      expect(screen.getByText('SAMPLES')).toBeInTheDocument();
      expect(screen.getByText(samplesCardRow.sample_id)).toBeInTheDocument();
      expect(screen.getByText(samplesCardRow.participant_id)).toBeInTheDocument();
    });

    it('should navigate to explore when VIEW IN EXPLORE is clicked', () => {
      renderWithRouter(<SamplesCard data={samplesCardRow} index={1} />);
      fireEvent.click(screen.getByText('VIEW IN EXPLORE'));
      expect(mockNavigate).toHaveBeenCalledWith(
        `/explore?p_id=${samplesCardRow.participant_id}&tab=2`,
      );
    });

    it('should truncate long sample id when card is narrow', () => {
      const truncation = enableTitleTruncationMocks();
      const longSample = {
        ...samplesCardRow,
        sample_id: `SMP-${'Y'.repeat(80)}-LONG`,
      };
      const { container } = renderWithRouter(<SamplesCard data={longSample} index={1} />);
      truncation.setCardWidth(container.firstChild);
      truncation.triggerResize();
      expect(container.textContent).toMatch(/\.\.\./);
      truncation.restore();
    });
  });

  describe('ModelsCard', () => {
    it('should render data model header and property rows', () => {
      renderWithRouter(<ModelsCard data={modelsCardRow} index={2} />);

      expect(screen.getByText('DATA MODEL')).toBeInTheDocument();
      expect(screen.getByText(modelsCardRow.node)).toBeInTheDocument();
      expect(screen.getByText(modelsCardRow.property)).toBeInTheDocument();
    });

    it('should navigate to data model when action button is clicked', () => {
      renderWithRouter(<ModelsCard data={modelsCardRow} index={2} />);
      fireEvent.click(screen.getByText('GO TO DATA MODEL NAVIGATOR'));
      expect(mockNavigate).toHaveBeenCalledWith('/data-model');
    });

    it('should hide property fields when category_type is node', () => {
      renderWithRouter(<ModelsCard data={modelsCardNodeOnlyRow} index={2} />);
      expect(screen.getByText('Data Model Node:')).toBeInTheDocument();
      expect(screen.queryByText('Property Name:')).not.toBeInTheDocument();
    });

    it('should truncate long model value when card is narrow', () => {
      const truncation = enableTitleTruncationMocks();
      const { container } = renderWithRouter(
        <ModelsCard data={modelsCardNodeOnlyRow} index={2} />,
      );
      truncation.setCardWidth(container.firstChild);
      truncation.triggerResize();
      expect(container.textContent).toMatch(/\.\.\./);
      truncation.restore();
    });
  });

  describe('AboutCard', () => {
    function renderAboutCard(data, searchText = 'search', index = 3) {
      return render(
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <AboutCard searchText={searchText} data={data} index={index} />
          </MemoryRouter>
        </ThemeProvider>,
      );
    }

    it('should render title and about snippet', () => {
      renderAboutCard(aboutCardPayload);

      expect(screen.getByText('ABOUT')).toBeInTheDocument();
      expect(screen.getByText(aboutCardPayload.title)).toBeInTheDocument();
    });

    it('should render external page link with https href', () => {
      renderAboutCard(aboutCardExternalLinkPayload);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', aboutCardExternalLinkPayload.page);
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('should highlight matching search text in the body', () => {
      renderAboutCard(aboutCardHighlightPayload, 'tumor');
      expect(screen.getByText('tumor', { selector: 'span' })).toBeInTheDocument();
    });

    it('should truncate long titles when card width is limited', () => {
      const truncation = enableTitleTruncationMocks();
      const { container } = renderAboutCard(aboutCardExternalLinkPayload);
      truncation.setCardWidth(container.querySelector('#global_search_card_3'));
      truncation.triggerResize();
      expect(container.textContent).toMatch(/\.\.\./);
      truncation.restore();
    });
  });

  describe('ParticipantCard', () => {
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
      return renderWithRouter(
        <CohortStateContext.Provider
          value={{
            state: cohortState,
            dispatch: cohortDispatch,
          }}
        >
          <ParticipantCard
            data={data}
            index={4}
            addFiles={addFiles}
            setAlterDisplay={setAlterDisplay}
            setOpenSnackbar={setOpenSnackbar}
            client={mockClient}
            cartFiles={cartFiles}
            alertMessage="Cart limit message"
          />
        </CohortStateContext.Provider>,
      );
    }

    it('should render participant header and diagnosis when cohort context is mocked', () => {
      const mockClient = {
        query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
      };

      renderParticipantCard({
        data: participantCardRow,
        mockClient,
      });

      expect(screen.getByText('PARTICIPANT')).toBeInTheDocument();
      expect(screen.getByText(participantCardRow.participant_id)).toBeInTheDocument();
      expect(screen.getByText(participantCardRow.diagnosis_str)).toBeInTheDocument();
    });

    it('should open CPI actions and navigate to Explore from the dropdown', () => {
      const mockClient = {
        query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
      };

      renderParticipantCard({
        data: participantCardRowWithCpi,
        mockClient,
      });

      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('VIEW IN EXPLORE DASHBOARD'));

      expect(mockNavigate).toHaveBeenCalledWith(
        `/explore?p_id=${participantCardRowWithCpi.participant_id}`,
      );
    });

    it('should open CPI mapping from the dropdown (modal mock)', () => {
      const mockClient = {
        query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
      };

      renderParticipantCard({
        data: participantCardRowWithCpi,
        mockClient,
      });

      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('VIEW CPI MAPPING'));

      expect(screen.getByTestId('cpi-modal-open')).toBeInTheDocument();
    });

    it('should dispatch add-to-cohort when a cohort is chosen from the submenu', () => {
      const mockClient = {
        query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
      };
      const cohortDispatch = jest.fn();

      renderParticipantCard({
        data: participantCardRowWithCpi,
        mockClient,
        cohortState: {
          cohortA: {
            cohortName: 'Cohort Alpha',
            cohortDescription: 'd',
            participants: [],
          },
        },
        cohortDispatch,
      });

      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('ADD TO EXISTING COHORT'));
      fireEvent.click(screen.getByText('Cohort Alpha'));

      expect(cohortDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'ADD_PARTICIPANTS_TO_COHORT',
        }),
      );
    });

    it('should add resolved file IDs to the cart when ADD TO CART is used', async () => {
      const addFiles = jest.fn();
      const mockClient = {
        query: jest.fn(() =>
          Promise.resolve({
            data: { fileIDsFromList: ['file-new-1', 'file-new-2'] },
          }),
        ),
      };

      renderParticipantCard({
        data: participantCardRowWithCpi,
        mockClient,
        addFiles,
      });

      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('ADD TO CART'));

      await waitFor(() => {
        expect(addFiles).toHaveBeenCalledWith(['file-new-1', 'file-new-2']);
      });
    });

    it('should show files-already-in-cart when GraphQL returns only IDs already in the cart', async () => {
      const addFiles = jest.fn();
      const mockClient = {
        query: jest.fn(() =>
          Promise.resolve({
            data: { fileIDsFromList: ['file-dup'] },
          }),
        ),
      };

      renderParticipantCard({
        data: participantCardRowWithCpi,
        mockClient,
        addFiles,
        cartFiles: ['file-dup'],
      });

      fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
      fireEvent.click(screen.getByText('ADD TO CART'));

      await waitFor(() => {
        expect(screen.getByText(/files already in cart/i)).toBeInTheDocument();
      });
      expect(addFiles).not.toHaveBeenCalled();
    });

    it(
      'should request cart-limit alert when near-full cart cannot accept new files',
      async () => {
        const setAlterDisplay = jest.fn();
        const cartNearFull = Array.from({ length: 199999 }, (_, i) => `cart-${i}`);
        const mockClient = {
          query: jest.fn(() =>
            Promise.resolve({
              data: { fileIDsFromList: ['new-a', 'new-b'] },
            }),
          ),
        };

        renderParticipantCard({
          data: participantCardRowWithCpi,
          mockClient,
          cartFiles: cartNearFull,
          setAlterDisplay,
        });

        fireEvent.click(screen.getByText('AVAILABLE ACTIONS'));
        fireEvent.click(screen.getByText('ADD TO CART'));

        await waitFor(
          () => {
            expect(setAlterDisplay).toHaveBeenCalledWith(true);
          },
          { timeout: 90000 },
        );
      },
      120000,
    );

    it('should expand long treatment type text when truncated', () => {
      const mockClient = {
        query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
      };
      const longTreatment = `${'Chemotherapy regimen '.repeat(10)}suffix`;

      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 900,
      });

      renderParticipantCard({
        data: { ...participantCardRow, treatment_type_str: longTreatment },
        mockClient,
      });

      const expandToggle = document.querySelector('span[class*="expandToggle"]');
      expect(expandToggle).toBeTruthy();
      fireEvent.click(expandToggle);

      expect(screen.getByText(longTreatment)).toBeInTheDocument();
    });

    it('should compute mobile max length when window.innerWidth <= 600', () => {
      const mockClient = {
        query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
      };
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 500,
      });
      const longAgent = `agent ${'X'.repeat(120)}`;

      renderParticipantCard({
        data: { ...participantCardRow, treatment_agent_str: longAgent },
        mockClient,
      });

      // Mobile branch: maxLength=35; the value is far longer so truncation shows.
      expect(document.querySelector('span[class*="expandToggle"]')).toBeTruthy();
    });

    it('should compute large-desktop max length when window.innerWidth > 1200', () => {
      const mockClient = {
        query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
      };
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 1500,
      });
      const longType = `type ${'Y'.repeat(200)}`;

      renderParticipantCard({
        data: { ...participantCardRow, treatment_type_str: longType },
        mockClient,
      });

      // Large-desktop branch: maxLength=95; the value is longer so truncation shows.
      expect(document.querySelector('span[class*="expandToggle"]')).toBeTruthy();
    });

    it('should re-evaluate treatment max length on window resize', () => {
      const mockClient = {
        query: jest.fn(() => Promise.resolve({ data: { fileIDsFromList: [] } })),
      };
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 900,
      });
      const longType = `type ${'Z'.repeat(100)}`;

      renderParticipantCard({
        data: {
          ...participantCardRow,
          treatment_type_str: longType,
          treatment_agent_str: longType,
        },
        mockClient,
      });

      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 1500,
      });
      fireEvent(window, new Event('resize'));

      // Resize handler ran; treatment row still rendered.
      expect(screen.getAllByText(/Treatment/i).length).toBeGreaterThan(0);
    });
  });

  describe('FilesCard', () => {
    it('should render file header, metadata, and add-to-cart control', () => {
      renderWithRouter(
        <FilesCard
          data={filesCardRow}
          index={5}
          addFiles={jest.fn()}
          cartFiles={[]}
        />,
      );

      expect(screen.getByText('FILES')).toBeInTheDocument();
      expect(screen.getByText(filesCardRow.file_name)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    });

    it('should add file to cart and show success notification', () => {
      const addFiles = jest.fn();
      renderWithRouter(
        <FilesCard data={filesCardRow} index={5} addFiles={addFiles} cartFiles={[]} />,
      );
      fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
      expect(addFiles).toHaveBeenCalledWith([filesCardRow.id]);
      expect(screen.getByText(/successfully added/i)).toBeInTheDocument();
    });

    it('should show error when file is already in cart', () => {
      renderWithRouter(
        <FilesCard
          data={filesCardRow}
          index={5}
          addFiles={jest.fn()}
          cartFiles={[filesCardRow.id]}
        />,
      );
      fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
      expect(screen.getByText(/already in cart/i)).toBeInTheDocument();
    });

    it('should show error when cart is at limit', () => {
      const nearFullCart = Array.from({ length: 200000 }, (_, i) => `f-${i}`);
      renderWithRouter(
        <FilesCard
          data={filesCardRow}
          index={5}
          addFiles={jest.fn()}
          cartFiles={nearFullCart}
        />,
      );
      fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
      expect(screen.getByText(/cart limit reached/i)).toBeInTheDocument();
    });

    it('should render plain file title when participant_id is absent', () => {
      renderWithRouter(
        <FilesCard
          data={filesCardRowNoParticipant}
          index={6}
          addFiles={jest.fn()}
          cartFiles={[]}
        />,
      );
      expect(screen.getByText(filesCardRowNoParticipant.file_name)).toBeInTheDocument();
    });

    it('should expand long participant id text when truncated', () => {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 800,
      });
      renderWithRouter(
        <FilesCard
          data={filesCardRowLongIds}
          index={7}
          addFiles={jest.fn()}
          cartFiles={[]}
        />,
      );
      const expandToggle = document.querySelector('span[class*="expandToggle"]');
      expect(expandToggle).toBeTruthy();
      fireEvent.click(expandToggle);
      expect(screen.getByText(/PART-LONG-/)).toBeInTheDocument();
    });

    it('should format bracketed data category and participant ids for display', () => {
      renderWithRouter(
        <FilesCard
          data={filesCardRowBracketedParticipant}
          index={8}
          addFiles={jest.fn()}
          cartFiles={[]}
        />,
      );
      expect(screen.getByText('PART-A; PART-B')).toBeInTheDocument();
      expect(screen.getByText(/Genomic.*Transcriptomic/)).toBeInTheDocument();
    });
  });
});
