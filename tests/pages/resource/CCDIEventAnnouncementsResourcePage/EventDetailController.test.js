import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventDetailController from '../../../../src/pages/resource/CCDIEventAnnouncementsResourcePage/EventDetailController';
import { getAllEvents } from '../../../../src/pages/resource/CCDIEventAnnouncementsResourcePage/eventsUtils';

const renderAtRoute = (path) => render(
  <MemoryRouter initialEntries={[path]}>
    <Routes>
      <Route path="/ccdi-events-announcements" element={<div>List Page</div>} />
      <Route path="/ccdi-events-announcements/:slug" element={<EventDetailController />} />
    </Routes>
  </MemoryRouter>,
);

describe('EventDetailController', () => {
  it('renders the EventDetailView for a known slug', () => {
    const event = getAllEvents()[0];
    renderAtRoute(`/ccdi-events-announcements/${event.slug}`);

    expect(screen.getByRole('heading', { name: event.title })).toBeInTheDocument();
    expect(screen.getByText(event.displayDate)).toBeInTheDocument();
  });

  it('redirects to the root events page for an unknown slug', () => {
    renderAtRoute('/ccdi-events-announcements/no-such-slug');

    expect(screen.getByText('List Page')).toBeInTheDocument();
  });
});
