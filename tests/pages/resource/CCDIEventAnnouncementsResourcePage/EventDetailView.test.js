import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventDetailView from '../../../../src/pages/resource/CCDIEventAnnouncementsResourcePage/EventDetailView';

const baseEvent = {
  slug: 'ccdi-march-2024-community-forum',
  title: 'CCDI March Community Forum',
  displayDate: 'March 18, 2024',
  tags: ['Presentation', 'Webinar'],
  image: 'ccdimarchcommunityforum-PIC.png',
  imageCaption: 'March forum caption text.',
  body: '<p>Hello world.</p><ul><li>Item one</li><li>Item two</li></ul>',
  disclaimer: false,
};

const renderView = (event = baseEvent) => render(
  <MemoryRouter>
    <EventDetailView event={event} />
  </MemoryRouter>,
);

describe('EventDetailView', () => {
  it('renders the breadcrumb with link back to root events page', () => {
    renderView();

    const breadcrumbLink = screen.getByRole('link', { name: /events announcements/i });
    expect(breadcrumbLink).toHaveAttribute('href', '/ccdi-events-announcements');
    expect(screen.getAllByText(baseEvent.title).length).toBeGreaterThan(0);
  });

  it('renders date, title, tags, image, and caption', () => {
    renderView();

    expect(screen.getByText('March 18, 2024')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'CCDI March Community Forum' })).toBeInTheDocument();
    expect(screen.getByText('Presentation')).toBeInTheDocument();
    expect(screen.getByText('Webinar')).toBeInTheDocument();
    expect(screen.getByAltText('CCDI March Community Forum')).toBeInTheDocument();
    expect(screen.getByText('March forum caption text.')).toBeInTheDocument();
  });

  it('renders the body HTML content', () => {
    renderView();

    expect(screen.getByText('Hello world.')).toBeInTheDocument();
    expect(screen.getByText('Item one')).toBeInTheDocument();
    expect(screen.getByText('Item two')).toBeInTheDocument();
  });

  it('does not render older or newer post navigation', () => {
    renderView();

    expect(screen.queryByText(/older post/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/newer post/i)).not.toBeInTheDocument();
  });

  it('only renders the disclaimer when event.disclaimer is true', () => {
    const { rerender } = renderView({ ...baseEvent, disclaimer: false });
    expect(screen.queryByText(/reuse of nci information/i)).not.toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <EventDetailView event={{ ...baseEvent, disclaimer: true }} />
      </MemoryRouter>,
    );
    expect(screen.getByText(/reuse of nci information/i)).toBeInTheDocument();
  });
});
