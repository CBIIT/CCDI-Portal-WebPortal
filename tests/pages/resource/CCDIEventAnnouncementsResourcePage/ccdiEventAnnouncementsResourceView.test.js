/**
 * Unit tests for CCDIEventAnnouncementsResourceView (`resourceData.yaml` — announcements fields as props).
 *
 * Structure follows tests/TEST_STRUCTURE.md:
 * Rendering → feature sections → Side effects → Edge cases.
 * Fixtures: tests/fixtures/resource/resourceDataViewProps.js (no network).
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CCDIEventAnnouncementsResourceView from '../../../../src/pages/resource/CCDIEventAnnouncementsResourcePage/CCDIEventAnnouncementsResourceView';
import { minimalCcdiEventAnnouncementsResourceData } from '../../../fixtures/resource/resourceDataViewProps';

function renderCcdiView(data = minimalCcdiEventAnnouncementsResourceData) {
  return render(
    <MemoryRouter initialEntries={['/explore']}>
      <CCDIEventAnnouncementsResourceView data={data} />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  window.scrollTo = jest.fn();
  for (let i = 0; i < 3; i += 1) {
    document.body.appendChild(document.createElement('footer'));
  }
});

afterEach(() => {
  document.querySelectorAll('footer').forEach((el) => el.remove());
});

describe('CCDIEventAnnouncementsResourceView', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderCcdiView();
      expect(container).toBeInTheDocument();
    });

    it('should render with default fixture data', () => {
      renderCcdiView();
      expect(screen.getByText('CCDI Events Announcements')).toBeInTheDocument();
      expect(screen.getByText('TOPICS')).toBeInTheDocument();
    });
  });

  describe('Topics and intro content', () => {
    it('should show announcements topic and body from fixtures', () => {
      renderCcdiView();
      expect(screen.getAllByText('Announcements Topic').length).toBeGreaterThan(0);
      expect(screen.getByText(/CCDI events intro for unit test/i)).toBeInTheDocument();
      expect(screen.getByText(/Announcements body/i)).toBeInTheDocument();
    });
  });

  describe('Side effects', () => {
    it('should call window.scrollTo on mount', () => {
      const scrollToMock = jest.fn();
      window.scrollTo = scrollToMock;
      renderCcdiView();
      expect(scrollToMock).toHaveBeenCalledWith(0, 0);
    });
  });
});
