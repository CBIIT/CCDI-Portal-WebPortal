import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import {
  EVENT_ROUTE_BASE,
  getEventBySlug,
} from './eventsUtils';
import EventDetailView from './EventDetailView';

const EventDetailController = () => {
  const { slug } = useParams();
  const event = getEventBySlug(slug);

  if (!event) {
    return <Navigate to={EVENT_ROUTE_BASE} replace />;
  }

  return <EventDetailView event={event} />;
};

export default EventDetailController;
