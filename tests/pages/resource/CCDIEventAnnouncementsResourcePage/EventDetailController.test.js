import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventDetailController from '../../../../src/pages/resource/CCDIEventAnnouncementsResourcePage/EventDetailController';

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
    renderAtRoute('/ccdi-events-announcements/ccdi-march-2024-community-forum');

    expect(screen.getByRole('heading', { name: 'CCDI March Community Forum' })).toBeInTheDocument();
    expect(screen.getByText('March 18, 2024')).toBeInTheDocument();
    expect(screen.getByAltText('CCDI March Community Forum')).toBeInTheDocument();
  });

  it('redirects to the root events page for an unknown slug', () => {
    renderAtRoute('/ccdi-events-announcements/no-such-slug');

    expect(screen.getByText('List Page')).toBeInTheDocument();
  });
});
