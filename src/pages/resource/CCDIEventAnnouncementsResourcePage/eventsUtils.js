import events from './eventsData.json';

export const EVENT_ROUTE_BASE = '/ccdi-events-announcements';

export const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, '')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const getAllEvents = () => events;

export const getEventBySlug = (slug) => events.find((event) => event.slug === slug);

export const getNeighborEvents = (slug) => {
  const idx = events.findIndex((event) => event.slug === slug);
  if (idx === -1) {
    return { older: null, newer: null };
  }
  return {
    newer: idx > 0 ? events[idx - 1] : null,
    older: idx < events.length - 1 ? events[idx + 1] : null,
  };
};

export const REPRODUCTION_DISCLAIMER = (
  'If you would like to reproduce some or all of this content, see '
  + '<a class="link" href="https://www.cancer.gov/policies/copyright-reuse" '
  + 'target="_blank" rel="noopener noreferrer">Reuse of NCI Information</a> '
  + 'for guidance about copyright and permissions. In the case of permitted digital '
  + 'reproduction, please credit the National Cancer Institute as the source and link to '
  + 'the original NCI product using the original product\u2019s title; e.g., '
  + '\u201c{title} was originally published by the National Cancer Institute.\u201d'
);

export const buildDisclaimerHtml = (title) =>
  REPRODUCTION_DISCLAIMER.replace('{title}', title);

export default {
  EVENT_ROUTE_BASE,
  slugify,
  getAllEvents,
  getEventBySlug,
  getNeighborEvents,
  buildDisclaimerHtml,
};
