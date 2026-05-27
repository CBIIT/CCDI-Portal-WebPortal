/**
 * Unit tests for CCDIEventAnnouncementsMarkdownView (parsed markdown shape as props).
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { clickTopicNav, triggerResourceScroll } from '../shared/resourceViewTestUtils';
import '@testing-library/jest-dom';
import CCDIEventAnnouncementsMarkdownView from '../../../../src/pages/resource/CCDIEventAnnouncementsResourcePage/CCDIEventAnnouncementsMarkdownView';
import { defaultCcdiEventsMarkdownViewData } from '../../../fixtures/resource/ccdiEventsMarkdownSamples';
import { multiTopicCcdiEventsData } from '../../../fixtures/resource/resourceInteractionData';

jest.mock('../../../../src/pages/resource/MCIResourcePage/MciMarkdown', () => {
  const React = require('react');
  return function MockMciMarkdown({ children }) {
    return <div data-testid="mci-markdown">{children}</div>;
  };
});

function renderCcdiMarkdownView(data = defaultCcdiEventsMarkdownViewData) {
  return render(
    <MemoryRouter initialEntries={['/ccdi-events-announcements']}>
      <CCDIEventAnnouncementsMarkdownView data={data} />
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

describe('CCDIEventAnnouncementsMarkdownView', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderCcdiMarkdownView();
      expect(container).toBeInTheDocument();
    });

    it('should render title, intro markdown, and section body', () => {
      renderCcdiMarkdownView();
      expect(screen.getByText('CCDI Events Announcements')).toBeInTheDocument();
      expect(screen.getByText('TOPICS')).toBeInTheDocument();
      expect(screen.getByText(/CCDI events intro for unit test/i)).toBeInTheDocument();
      expect(screen.getByText(/Announcements body from markdown/i)).toBeInTheDocument();
    });

    it('should render HTML intro when markdown intro is absent', () => {
      renderCcdiMarkdownView({
        title: 'Events Page',
        ccdiEventAnnouncementsIntroText: '<p>HTML intro block</p>',
        ccdiEventAnnouncementsContent: defaultCcdiEventsMarkdownViewData.ccdiEventAnnouncementsContent,
      });
      expect(screen.getByText('HTML intro block')).toBeInTheDocument();
    });
  });

  describe('Side effects', () => {
    it('should call window.scrollTo on mount', () => {
      const scrollToMock = jest.fn();
      window.scrollTo = scrollToMock;
      renderCcdiMarkdownView();
      expect(scrollToMock).toHaveBeenCalledWith(0, 0);
    });

    it('should apply sticky nav class when page is scrolled', () => {
      renderCcdiMarkdownView({
        ...defaultCcdiEventsMarkdownViewData,
        ccdiEventAnnouncementsContent: multiTopicCcdiEventsData.ccdiEventAnnouncementsContent.map(
          (item) => ({ ...item, content: 'Topic body' }),
        ),
      });
      triggerResourceScroll('CCDIEventArchiveBody');
      expect(document.getElementById('leftNav').className).toContain('navListSticky');
    });
  });

  describe('Navigation interactions', () => {
    it('should highlight topic when nav item is clicked', () => {
      const scrollTo = jest.fn();
      window.scrollTo = scrollTo;
      renderCcdiMarkdownView({
        ...defaultCcdiEventsMarkdownViewData,
        ccdiEventAnnouncementsContent: multiTopicCcdiEventsData.ccdiEventAnnouncementsContent.map(
          (item) => ({ ...item, content: 'Topic body' }),
        ),
      });
      clickTopicNav('Events B');
      expect(scrollTo).toHaveBeenCalled();
    });
  });
});
