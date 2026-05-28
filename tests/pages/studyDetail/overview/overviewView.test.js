/**
 * OverviewView — study metadata, publications, and access-data links.
 */

jest.mock('../../../../src/pages/studyDetail/overview/tabs/TabsView', () => ({
  __esModule: true,
  default: function MockTabsView({ data }) {
    const React = require('react');
    return React.createElement('div', { 'data-testid': 'tabs-view' }, data.study_id);
  },
}));

jest.mock('../../../../src/pages/studyDetail/overview/modal/ModalView', () => ({
  __esModule: true,
  default: function MockModalView() {
    const React = require('react');
    return React.createElement('div', { 'data-testid': 'modal-view' });
  },
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import OverviewView from '../../../../src/pages/studyDetail/overview/overviewView';
import {
  overviewViewDataFixture,
  overviewViewClinicalDataFixture,
  overviewViewCBioPortalFixture,
  overviewViewConsentFixture,
} from '../../../fixtures/studyDetail/overviewViewProps';
import {
  studyDownloadLinks,
  studyClinicalDataLinks,
  studycBioPortalLinks,
} from '../../../../src/bento/studiesData';

const theme = createMuiTheme();

function renderOverview(data) {
  return render(
    <ThemeProvider theme={theme}>
      <OverviewView data={data} />
    </ThemeProvider>,
  );
}

describe('OverviewView', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  describe('Rendering', () => {
    it('should render study fields and formatted counts', () => {
      renderOverview(overviewViewDataFixture);

      expect(screen.getByText('STUDY ID')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /phs002431/i })).toHaveAttribute(
        'href',
        expect.stringContaining('phs002431'),
      );
      expect(screen.getByText('CCD Study Row Assert')).toBeInTheDocument();
      expect(screen.getByText(/Synthetic study description/i)).toBeInTheDocument();
      expect(screen.getByText('1,200')).toBeInTheDocument();
      expect(screen.getByText('3,400')).toBeInTheDocument();
      expect(screen.getByTestId('tabs-view')).toBeInTheDocument();
      expect(screen.getByTestId('modal-view')).toBeInTheDocument();
    });

    it('should render PubMed links when pubmed_ids are present', () => {
      renderOverview(overviewViewDataFixture);

      expect(screen.getByRole('link', { name: /PMID:10000001/i })).toHaveAttribute(
        'href',
        'https://pubmed.ncbi.nlm.nih.gov/10000001',
      );
      expect(screen.getByRole('link', { name: /PMID:10000002/i })).toBeInTheDocument();
    });

    it('should show N/A when pubmed_ids is empty', () => {
      renderOverview({ ...overviewViewDataFixture, pubmed_ids: '' });
      expect(screen.getByText('N/A')).toBeInTheDocument();
    });

    it('should render formatted participant and sample counts', () => {
      renderOverview(overviewViewDataFixture);
      expect(screen.getByText('Participants Count')).toBeInTheDocument();
      expect(screen.getByText('Samples Count')).toBeInTheDocument();
      expect(screen.getByText('1,200')).toBeInTheDocument();
      expect(screen.getByText('3,400')).toBeInTheDocument();
    });
  });

  describe('Consent codes', () => {
    it('should render consent glossary links when codes are present', () => {
      renderOverview(overviewViewConsentFixture);

      expect(screen.getByText('Consent Codes:')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /GRU \(opens dbGaP consent glossary/i })).toHaveAttribute(
        'href',
        expect.stringContaining('consentgloss'),
      );
      expect(screen.getByRole('link', { name: /HMB-IRB \(opens dbGaP consent glossary/i })).toBeInTheDocument();
    });

    it('should show not available when consent codes are missing', () => {
      renderOverview({ ...overviewViewDataFixture, consent_codes: null });
      expect(screen.getByText('Not available')).toBeInTheDocument();
    });

    it('should render consent links when consent_codes is an array', () => {
      renderOverview({
        ...overviewViewDataFixture,
        consent_codes: ['[GRU]', '[HMB-IRB]'],
      });

      expect(screen.getByRole('link', { name: /GRU \(opens dbGaP consent glossary/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /HMB-IRB \(opens dbGaP consent glossary/i })).toBeInTheDocument();
    });

    it('should parse comma-separated consent codes without brackets', () => {
      renderOverview({
        ...overviewViewDataFixture,
        consent_codes: 'GRU, HMB-IRB',
      });

      expect(screen.getByRole('link', { name: /GRU \(opens dbGaP consent glossary/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /HMB-IRB \(opens dbGaP consent glossary/i })).toBeInTheDocument();
    });
  });

  describe('Access Data', () => {
    it('should render study manifest download link', () => {
      renderOverview(overviewViewDataFixture);

      const manifestLink = screen.getByRole('link', { name: /download study manifest/i });
      expect(manifestLink).toHaveAttribute(
        'href',
        studyDownloadLinks.phs002431,
      );
    });

    it('should render clinical data source file links when configured', () => {
      renderOverview(overviewViewClinicalDataFixture);

      const clinicalLinks = studyClinicalDataLinks.phs000463;
      const fileName = clinicalLinks[0].split('/').pop();
      expect(
        screen.getByRole('link', { name: new RegExp(`Source File - ${fileName}`, 'i') }),
      ).toHaveAttribute('href', clinicalLinks[0]);
    });

    it('should render cBioPortal link when configured', () => {
      renderOverview(overviewViewCBioPortalFixture);

      expect(
        screen.getByRole('link', { name: /view in ccdi cbioportal data explorer/i }),
      ).toHaveAttribute('href', studycBioPortalLinks.phs002790);
    });
  });
});
