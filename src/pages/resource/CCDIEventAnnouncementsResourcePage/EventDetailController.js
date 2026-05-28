import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import {
  EVENT_ROUTE_BASE,
  getEventBySlug,
  getNeighborEvents,
} from './eventsUtils';
import EventDetailView from './EventDetailView';

const EventDetailController = () => {
  const { slug } = useParams();
  const event = getEventBySlug(slug);

  if (!event) {
    return <Navigate to={EVENT_ROUTE_BASE} replace />;
  }

  const { older, newer } = getNeighborEvents(slug);

  return <EventDetailView event={event} older={older} newer={newer} />;
};

export default EventDetailController;
