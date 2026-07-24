/**
 * StudiesCard — actions menu and C3DC / cBioPortal links.
 */

jest.mock('../../../src/pages/globalSearch/Cards/participant/c3dcService', () => ({
  openC3dcStudy: jest.fn(),
}));

jest.mock('../../../src/bento/studiesData', () => ({
  studycBioPortalLinks: {
    phs002790: 'https://cbioportal.ccdi.cancer.gov/study/summary?id=phs002790',
  },
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MemoryRouter } from 'react-router-dom';
import StudiesCard from '../../../src/pages/globalSearch/Cards/studies/StudiesCard';
import { openC3dcStudy } from '../../../src/pages/globalSearch/Cards/participant/c3dcService';
import {
  studiesCardRow,
  longTitleStudiesCardRow,
} from '../../fixtures/globalSearch/cardPresentationFixtures';

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
  let originalOffsetWidth;

  beforeEach(() => {
    jest.clearAllMocks();
    openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
    originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      get() {
        return 200;
      },
    });
  });

  afterEach(() => {
    openSpy.mockRestore();
    if (originalOffsetWidth) {
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
    } else {
      delete HTMLElement.prototype.offsetWidth;
    }
  });

  const openActionsMenu = () => {
    fireEvent.click(screen.getByRole('button', { name: /available actions/i }));
  };

  it('should open the C3DC study page when VIEW STUDY is selected', () => {
    renderStudiesCard(studiesCardRow);
    openActionsMenu();
    fireEvent.click(screen.getByText('VIEW STUDY'));

    expect(openC3dcStudy).toHaveBeenCalledWith(studiesCardRow.study_id);
  });

  it('should not show DOWNLOAD MANIFEST', () => {
    renderStudiesCard(studiesCardRow);
    openActionsMenu();
    expect(screen.queryByText('DOWNLOAD MANIFEST')).not.toBeInTheDocument();
  });

  it('should hide cBioPortal when the study has no portal link', () => {
    renderStudiesCard(studiesCardRow);
    openActionsMenu();
    expect(screen.queryByText('CCDI CBioPortal')).not.toBeInTheDocument();
  });

  it('should open the study-specific cBioPortal URL when configured', () => {
    renderStudiesCard({
      ...studiesCardRow,
      study_id: 'phs002790',
    });
    openActionsMenu();
    fireEvent.click(screen.getByText('CCDI CBioPortal'));

    expect(openSpy).toHaveBeenCalledWith(
      'https://cbioportal.ccdi.cancer.gov/study/summary?id=phs002790',
      '_blank',
      'noopener,noreferrer',
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
