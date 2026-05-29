/**
 * StudiesCard — actions menu, navigation, and manifest download.
 */

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../../src/bento/studiesData', () => ({
  studyDownloadLinks: {
    phsCARD_TEST_001: 'https://example.com/mock-study-manifest.xlsx',
  },
  openDoubleLink: jest.fn(),
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MemoryRouter } from 'react-router-dom';
import StudiesCard from '../../../src/pages/globalSearch/Cards/studies/StudiesCard';
import {
  studiesCardRow,
  studiesCardRowNoManifest,
  longTitleStudiesCardRow,
} from '../../fixtures/globalSearch/cardPresentationFixtures';
import { openDoubleLink } from '../../../src/bento/studiesData';

const theme = createMuiTheme();

function renderStudiesCard(data) {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <StudiesCard data={data} index={0} />
      </ThemeProvider>
    </MemoryRouter>,
  );
}

describe('StudiesCard actions', () => {
  let openSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
    openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get() {
        return 200;
      },
    });
  });

  afterEach(() => {
    openSpy.mockRestore();
  });

  const openActionsMenu = () => {
    fireEvent.click(screen.getByRole('button', { name: /available actions/i }));
  };

  it('should navigate to study detail when VIEW STUDY is selected', () => {
    renderStudiesCard(studiesCardRow);
    openActionsMenu();
    fireEvent.click(screen.getByText('VIEW STUDY'));

    expect(mockNavigate).toHaveBeenCalledWith(`/studies/${studiesCardRow.study_id}`);
  });

  it('should download manifest via openDoubleLink when configured', () => {
    renderStudiesCard(studiesCardRow);
    openActionsMenu();
    fireEvent.click(screen.getByText('DOWNLOAD MANIFEST'));

    expect(openDoubleLink).toHaveBeenCalledWith(
      'https://example.com/mock-study-manifest.xlsx',
      `${studiesCardRow.study_id}_CCDI_Study_Manifest.xlsx`,
    );
  });

  it('should warn when manifest link is missing', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    renderStudiesCard(studiesCardRowNoManifest);
    openActionsMenu();
    fireEvent.click(screen.getByText('DOWNLOAD MANIFEST'));

    expect(openDoubleLink).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(studiesCardRowNoManifest.study_id),
    );
    warnSpy.mockRestore();
  });

  it('should open cBioPortal in a new tab', () => {
    renderStudiesCard(studiesCardRow);
    openActionsMenu();
    fireEvent.click(screen.getByText('CCDI CBioPortal'));

    expect(openSpy).toHaveBeenCalledWith(
      'https://cbioportal.ccdi.cancer.gov/',
      '_blank',
    );
  });

  it('should close the actions menu when clicking outside', () => {
    renderStudiesCard(studiesCardRow);
    openActionsMenu();
    expect(screen.getByText('VIEW STUDY')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('VIEW STUDY')).not.toBeInTheDocument();
  });

  it('should truncate long study ids in the title link', () => {
    renderStudiesCard(longTitleStudiesCardRow);

    const studyLink = screen.getByRole('link', {
      name: new RegExp(longTitleStudiesCardRow.study_id.substring(0, 8)),
    });
    expect(studyLink.textContent).toMatch(/\.\.\./);
  });
});
