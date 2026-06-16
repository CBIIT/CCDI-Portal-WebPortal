/**
 * StudiesCard — consent code parsing, truncation, and expand/collapse.
 */

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
import { studiesCardRow } from '../../fixtures/globalSearch/cardPresentationFixtures';

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

describe('StudiesCard consent codes', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1400,
    });
  });

  it('should render consent code links from bracket-delimited string', () => {
    renderStudiesCard({
      ...studiesCardRow,
      consent_codes: '[GRU],[HMB-IRB]',
    });

    expect(screen.getByText('CONSENT CODES:')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /GRU/i })).toHaveAttribute(
      'href',
      expect.stringContaining('consentgloss'),
    );
    expect(screen.getByRole('link', { name: /HMB-IRB/i })).toBeInTheDocument();
  });

  it('should parse nested bracket consent values', () => {
    renderStudiesCard({
      ...studiesCardRow,
      consent_codes: '[GRU, HMB]',
    });

    expect(screen.getByRole('link', { name: /GRU/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /HMB/i })).toBeInTheDocument();
  });

  it('should hide consent row when no codes are provided', () => {
    renderStudiesCard({ ...studiesCardRow, consent_codes: '' });
    expect(screen.queryByText('CONSENT CODES:')).not.toBeInTheDocument();
  });

  it('should expand truncated consent codes on click', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 700,
    });

    const manyCodes = Array.from({ length: 8 }, (_, i) => `CODE-${i}`).join(', ');
    renderStudiesCard({
      ...studiesCardRow,
      consent_codes: manyCodes,
    });

    const toggle = screen.getByRole('button', { name: /CODE-0/i });
    fireEvent.click(toggle);
    expect(screen.getByRole('link', { name: /CODE-7/i })).toBeInTheDocument();
  });

  it('should expand consent codes with keyboard Enter', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 700,
    });

    const manyCodes = Array.from({ length: 6 }, (_, i) => `KBD-${i}`).join(', ');
    renderStudiesCard({
      ...studiesCardRow,
      consent_codes: manyCodes,
    });

    const toggle = screen.getByRole('button');
    fireEvent.keyDown(toggle, { key: 'Enter' });
    expect(screen.getByRole('link', { name: /KBD-5/i })).toBeInTheDocument();
  });
});
