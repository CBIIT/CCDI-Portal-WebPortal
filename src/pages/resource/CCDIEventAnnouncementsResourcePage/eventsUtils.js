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

const parseUsShortDate = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.trim().split('/');
  if (parts.length !== 3) return '';
  const [month, day, year] = parts;
  const fullYear = year.length === 2 ? `20${year}` : year;
  return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const getEntrySortDate = (entryHtml) => {
  const match = entryHtml.match(/<br>\s*([\d/]+)/);
  return parseUsShortDate(match ? match[1] : '');
};

const LIST_ENTRY_PATTERN = /<a class="link"[\s\S]*?<\/a><br>\s*[\d/]+/g;

export const buildDetailPageListEntryHtml = (event) => (
  `<a class="link" href="${EVENT_ROUTE_BASE}/${event.slug}">${event.title}</a><br>${event.rawDate}`
);

export const mergeDetailPageEventsIntoAnnouncementsContent = (sections) => {
  if (!Array.isArray(sections)) return sections;

  return sections.map((section) => {
    if (!section.topic || !/past events/i.test(section.topic)) {
      return section;
    }

    const content = section.content || '';
    const detailEvents = getAllEvents().filter(
      (event) => !content.includes(event.title),
    );

    if (detailEvents.length === 0) {
      return section;
    }

    const existingEntries = (content.match(LIST_ENTRY_PATTERN) || []).map((entry) => entry.trim());
    const detailEntries = detailEvents.map(buildDetailPageListEntryHtml);
    const mergedEntries = [...detailEntries, ...existingEntries].sort(
      (a, b) => getEntrySortDate(b).localeCompare(getEntrySortDate(a)),
    );

    return {
      ...section,
      content: `<p>${mergedEntries.join('<br><br>')}</p>`,
    };
  });
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
  getDetailPageSlugForLinkText,
  buildDetailPageListEntryHtml,
  mergeDetailPageEventsIntoAnnouncementsContent,
  getAllEvents,
  getEventBySlug,
  getNeighborEvents,
  buildDisclaimerHtml,
};
