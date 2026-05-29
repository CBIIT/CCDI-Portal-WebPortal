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

const renderView = (props) => render(
  <MemoryRouter>
    <EventDetailView {...props} />
  </MemoryRouter>,
);

describe('EventDetailView', () => {
  it('renders the breadcrumb with link back to root events page', () => {
    renderView({ event: baseEvent, older: null, newer: null });

    const breadcrumbLink = screen.getByRole('link', { name: /events announcements/i });
    expect(breadcrumbLink).toHaveAttribute('href', '/ccdi-events-announcements');
    expect(screen.getAllByText(baseEvent.title).length).toBeGreaterThan(0);
  });

  it('renders date, title, tags, image, and caption', () => {
    renderView({ event: baseEvent, older: null, newer: null });

    expect(screen.getByText('March 18, 2024')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'CCDI March Community Forum' })).toBeInTheDocument();
    expect(screen.getByText('Presentation')).toBeInTheDocument();
    expect(screen.getByText('Webinar')).toBeInTheDocument();
    expect(screen.getByAltText('CCDI March Community Forum')).toBeInTheDocument();
    expect(screen.getByText('March forum caption text.')).toBeInTheDocument();
  });

  it('renders the body HTML content', () => {
    renderView({ event: baseEvent, older: null, newer: null });

    expect(screen.getByText('Hello world.')).toBeInTheDocument();
    expect(screen.getByText('Item one')).toBeInTheDocument();
    expect(screen.getByText('Item two')).toBeInTheDocument();
  });

  it('only renders the disclaimer when event.disclaimer is true', () => {
    const { rerender } = renderView({
      event: { ...baseEvent, disclaimer: false },
      older: null,
      newer: null,
    });
    expect(screen.queryByText(/reuse of nci information/i)).not.toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <EventDetailView
          event={{ ...baseEvent, disclaimer: true }}
          older={null}
          newer={null}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText(/reuse of nci information/i)).toBeInTheDocument();
  });

  it('renders older and newer post navigation when provided', () => {
    const older = { slug: 'developing-pediatric-data-standards', title: 'Developing Pediatric Data Standards' };
    const newer = { slug: 'newer-slug', title: 'A Newer Post' };
    renderView({ event: baseEvent, older, newer });

    expect(screen.getByText('Developing Pediatric Data Standards').closest('a'))
      .toHaveAttribute('href', '/ccdi-events-announcements/developing-pediatric-data-standards');
    expect(screen.getByText('A Newer Post').closest('a'))
      .toHaveAttribute('href', '/ccdi-events-announcements/newer-slug');
  });
});
