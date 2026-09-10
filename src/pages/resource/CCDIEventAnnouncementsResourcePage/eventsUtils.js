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

const detailPageSlugByLinkText = events.reduce((map, event) => {
  map.set(slugify(event.title), event.slug);
  map.set(event.slug, event.slug);
  return map;
}, new Map());

export const getDetailPageSlugForLinkText = (text) =>
  detailPageSlugByLinkText.get(slugify(text)) || null;

export const buildDetailPageListEntryMarkdown = (event) => (
  `[${event.title}](${EVENT_ROUTE_BASE}/${event.slug})  \n${event.rawDate}`
);

/** @deprecated Prefer buildDetailPageListEntryMarkdown; kept for callers/tests during migration. */
export const buildDetailPageListEntryHtml = buildDetailPageListEntryMarkdown;

/**
 * Identity passthrough — Past Events are sourced from eventAnnouncements.md only.
 * Local eventsData.json is used for detail-page routes, not list injection.
 */
export const mergeDetailPageEventsIntoAnnouncementsContent = (sections) => sections;

export const getAllEvents = () => events;

export const getEventBySlug = (slug) => events.find((event) => event.slug === slug);

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
  getDetailPageSlugForLinkText,
  buildDetailPageListEntryMarkdown,
  buildDetailPageListEntryHtml,
  mergeDetailPageEventsIntoAnnouncementsContent,
  getAllEvents,
  getEventBySlug,
  buildDisclaimerHtml,
};
