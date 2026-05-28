/**
 * ReleaseNotesPageView — nav, version selection, PDF export, content types.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ReleaseNotesPageView from '../../../src/pages/releaseNotePage/releaseNotePageView';
import { minimalReleaseNotesPayload } from '../../fixtures/resource/releaseNoteFixtures';

if (typeof global.MutationObserver === 'undefined') {
  global.MutationObserver = class MutationObserver {
    disconnect() {}
    observe() {}
    takeRecords() { return []; }
  };
}

const theme = createMuiTheme();

function renderReleaseNotes(props = minimalReleaseNotesPayload) {
  return render(
    <ThemeProvider theme={theme}>
      <ReleaseNotesPageView {...props} />
    </ThemeProvider>,
  );
}

describe('ReleaseNotesPageView', () => {
  beforeEach(() => {
    window.open = jest.fn();
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('should render title and selected release note', () => {
      renderReleaseNotes();
      expect(screen.getByText('Release Notes')).toBeInTheDocument();
      expect(screen.getByText('Spring 2024 Release')).toBeInTheDocument();
      expect(screen.getByText(/Spring release highlights/i)).toBeInTheDocument();
    });
  });

  describe('Navigation interactions', () => {
    it('should switch release when another version is selected', () => {
      renderReleaseNotes();
      fireEvent.click(screen.getByText('Version: 2.0.0'));
      expect(screen.getByText('Winter 2023 Release')).toBeInTheDocument();
      expect(screen.getByText(/Winter release highlights/i)).toBeInTheDocument();
    });

    it('should toggle year group collapse in the nav', () => {
      renderReleaseNotes();
      const yearToggle = screen.getByText('2024');
      fireEvent.click(yearToggle);
      fireEvent.click(yearToggle);
      expect(screen.getAllByText('Version: 2.1.0').length).toBeGreaterThan(0);
      expect(screen.getByText(/Spring release highlights/i)).toBeInTheDocument();
    });

    it('should open PDF in a new window when VIEW PDF is clicked', () => {
      renderReleaseNotes();
      fireEvent.click(screen.getByText('VIEW PDF'));
      expect(window.open).toHaveBeenCalledWith('/CCDI_Hub_Release_Notes.pdf', '_blank');
    });
  });

  describe('Content type icons', () => {
    it('should render content type tooltips for the selected release', () => {
      renderReleaseNotes();
      expect(screen.getByAltText(/folder with plus sign/i)).toBeInTheDocument();
    });
  });
});
