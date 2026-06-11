import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventDetailView from '../../../../src/pages/resource/CCDIEventAnnouncementsResourcePage/EventDetailView';

const baseEvent = {
  slug: 'ccdi-march-2024-community-forum',
  title: 'CCDI March Community Forum',
  displayDate: 'March 18, 2024',
  image: 'ccdimarchcommunityforum-PIC.png',
  body: '<p>Hello world.</p><ul><li>Item one</li><li>Item two</li></ul>',
  disclaimer: false,
};

const renderView = (event = baseEvent) => render(
  <MemoryRouter>
    <EventDetailView event={event} />
  </MemoryRouter>,
);

describe('EventDetailView', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  it('renders the breadcrumb with link back to root events page', () => {
    renderView();

    const breadcrumbLink = screen.getByRole('link', { name: /events announcements/i });
    expect(breadcrumbLink).toHaveAttribute('href', '/ccdi-events-announcements');
    expect(screen.getAllByText(baseEvent.title).length).toBeGreaterThan(0);
  });

  it('renders date, title, and image', () => {
    renderView();

    expect(screen.getByText('March 18, 2024')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'CCDI March Community Forum' })).toBeInTheDocument();
    expect(screen.getByAltText('CCDI March Community Forum')).toBeInTheDocument();
  });

  it('scrolls to top when the event slug changes', () => {
    const { rerender } = renderView();

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);

    rerender(
      <MemoryRouter>
        <EventDetailView event={{ ...baseEvent, slug: 'developing-pediatric-data-standards' }} />
      </MemoryRouter>,
    );

    expect(window.scrollTo).toHaveBeenCalledTimes(2);
  });

  it('floats a 300x300 image beside the body content', () => {
    renderView();

    const wrapper = screen.getByTestId('event-body-with-image');
    const figure = screen.getByTestId('event-image-figure');
    const image = screen.getByAltText('CCDI March Community Forum');
    const bodyContent = screen.getByTestId('event-body-content');

    expect(wrapper).toContainElement(figure);
    expect(wrapper).toContainElement(bodyContent);
    expect(figure).toHaveStyle({
      float: 'left',
      width: '300px',
    });
    expect(image).toHaveStyle({
      width: '300px',
      height: '300px',
      objectFit: 'cover',
    });
  });

  it('renders the image without a caption', () => {
    renderView();

    const figure = screen.getByTestId('event-image-figure');
    const image = screen.getByAltText('CCDI March Community Forum');

    expect(figure).toContainElement(image);
    expect(figure.querySelector('figcaption')).not.toBeInTheDocument();
    expect(screen.queryByTestId('event-image-caption')).not.toBeInTheDocument();
  });

  it('does not render an image when event.image is missing', () => {
    renderView({ ...baseEvent, image: null });

    expect(screen.queryByTestId('event-image-figure')).not.toBeInTheDocument();
    expect(screen.getByTestId('event-body-content')).toBeInTheDocument();
  });

  it('indents the bullet list slightly to the right of paragraph text', () => {
    renderView();

    const list = screen.getByText('Item one').closest('ul');
    expect(list).toHaveStyle({
      marginLeft: '23em',
      paddingLeft: '1em',
      listStyleType: 'disc',
      listStylePosition: 'outside',
    });
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
