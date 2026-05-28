import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CCDIEventAnnouncementsResourceView from '../../../../src/pages/resource/CCDIEventAnnouncementsResourcePage/CCDIEventAnnouncementsResourceView';

const yamlContent = {
  ccdiEventAnnouncementsIntroText: '<p>Intro text content.</p>',
  ccdiEventAnnouncementsContent: [
    {
      id: 'CCDI_Event_Archive_1',
      topic: 'Past Events',
      content:
        '<p><a class="link" href="https://d2xnga7irezzit.cloudfront.net/ccdi_hub_files/ccdi_events_announcements/Sample%20Event.pdf" target="_blank" rel="noopener noreferrer">Sample Event Title</a><br>3/11/24</p>',
    },
    {
      id: 'CCDI_Event_Archive_2',
      topic: 'Contact',
      content:
        '<p>Email us at <a class="link" href="mailto:test@example.com">test@example.com</a>.</p>',
    },
  ],
};

const renderView = () => render(
  <MemoryRouter>
    <CCDIEventAnnouncementsResourceView data={yamlContent} />
  </MemoryRouter>,
);

describe('CCDIEventAnnouncementsResourceView', () => {
  beforeAll(() => {
    Object.defineProperty(window.HTMLElement.prototype, 'offsetTop', {
      configurable: true,
      value: 0,
    });
    Object.defineProperty(window.HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 0,
    });
  });

  it('replaces PDF anchors with React Router links to the detail page', () => {
    renderView();

    const link = screen.getByText('Sample Event Title').closest('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/ccdi-events-announcements/sample-event-title');
  });

  it('leaves non-PDF anchors untouched', () => {
    renderView();

    const mailLink = screen.getByText('test@example.com').closest('a');
    expect(mailLink).toHaveAttribute('href', 'mailto:test@example.com');
  });

  it('renders the topics navigation entries', () => {
    renderView();
    expect(screen.getAllByText('Past Events').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
  });
});
