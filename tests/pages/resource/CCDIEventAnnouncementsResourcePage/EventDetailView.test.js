import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventDetailView from '../../../../src/pages/resource/CCDIEventAnnouncementsResourcePage/EventDetailView';

const baseEvent = {
  slug: 'sample-event',
  title: 'Sample Event Title',
  displayDate: 'March 11, 2024',
  pdfUrl: 'https://example.com/sample.pdf',
  tag: 'Announcement',
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

  it('renders date, title and tag', () => {
    renderView({ event: baseEvent, older: null, newer: null });

    expect(screen.getByText('March 11, 2024')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sample Event Title' })).toBeInTheDocument();
    expect(screen.getByText('Announcement')).toBeInTheDocument();
  });

  it('renders the body HTML content', () => {
    renderView({ event: baseEvent, older: null, newer: null });

    expect(screen.getByText('Hello world.')).toBeInTheDocument();
    expect(screen.getByText('Item one')).toBeInTheDocument();
    expect(screen.getByText('Item two')).toBeInTheDocument();
  });

  it('does not render a link to the original PDF', () => {
    renderView({ event: baseEvent, older: null, newer: null });

    expect(screen.queryByRole('link', { name: /view original pdf/i })).not.toBeInTheDocument();
  });

  it('does not render the legacy banner header', () => {
    renderView({ event: baseEvent, older: null, newer: null });

    expect(screen.queryByText(/^CCDI Events Announcements$/i)).not.toBeInTheDocument();
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
    expect(
      screen.getByText(/Sample Event Title was originally published/i),
    ).toBeInTheDocument();
  });

  it('renders older and newer post navigation when provided', () => {
    const older = { slug: 'older-slug', title: 'An Older Post' };
    const newer = { slug: 'newer-slug', title: 'A Newer Post' };
    renderView({ event: baseEvent, older, newer });

    const olderLink = screen.getByText('An Older Post').closest('a');
    const newerLink = screen.getByText('A Newer Post').closest('a');

    expect(olderLink).toHaveAttribute('href', '/ccdi-events-announcements/older-slug');
    expect(newerLink).toHaveAttribute('href', '/ccdi-events-announcements/newer-slug');
    expect(screen.getAllByText(/older post/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/newer post/i).length).toBeGreaterThan(0);
  });

  it('omits the missing post link when only one neighbor exists', () => {
    const newer = { slug: 'only-newer', title: 'Only Newer Post' };
    renderView({ event: baseEvent, older: null, newer });

    expect(screen.queryByText(/older post/i)).not.toBeInTheDocument();
    expect(screen.getByText('Only Newer Post')).toBeInTheDocument();
  });

  it('renders gracefully when body is empty', () => {
    renderView({ event: { ...baseEvent, body: '' }, older: null, newer: null });

    expect(screen.getByRole('heading', { name: 'Sample Event Title' })).toBeInTheDocument();
  });
});
