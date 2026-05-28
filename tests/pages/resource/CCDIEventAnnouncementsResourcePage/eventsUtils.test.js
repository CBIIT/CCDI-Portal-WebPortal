import {
  slugify,
  getAllEvents,
  getEventBySlug,
  getNeighborEvents,
  buildDisclaimerHtml,
  EVENT_ROUTE_BASE,
} from '../../../../src/pages/resource/CCDIEventAnnouncementsResourcePage/eventsUtils';

describe('eventsUtils', () => {
  describe('slugify', () => {
    it('returns empty string for empty/nullish input', () => {
      expect(slugify('')).toBe('');
      expect(slugify(undefined)).toBe('');
      expect(slugify(null)).toBe('');
    });

    it('lowercases and replaces whitespace with hyphens', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('strips smart quotes', () => {
      expect(slugify('CCDI Hub\u2019s Dashboard')).toBe('ccdi-hubs-dashboard');
    });

    it('converts em/en dashes to hyphens', () => {
      expect(slugify('Foo\u2014Bar\u2013Baz')).toBe('foo-bar-baz');
    });

    it('collapses runs of punctuation into a single hyphen', () => {
      expect(slugify('Foo!!!  Bar:::Baz??')).toBe('foo-bar-baz');
    });

    it('strips leading and trailing hyphens', () => {
      expect(slugify('---Hello---World---')).toBe('hello-world');
    });
  });

  describe('getAllEvents / getEventBySlug', () => {
    it('returns the full events list', () => {
      const events = getAllEvents();
      expect(Array.isArray(events)).toBe(true);
      expect(events.length).toBeGreaterThan(0);
      events.forEach((event) => {
        expect(typeof event.slug).toBe('string');
        expect(typeof event.title).toBe('string');
        expect(typeof event.displayDate).toBe('string');
        expect(typeof event.body).toBe('string');
        expect(['Announcement', 'Presentation']).toContain(event.tag);
      });
    });

    it('finds an existing event by slug', () => {
      const first = getAllEvents()[0];
      expect(getEventBySlug(first.slug)).toEqual(first);
    });

    it('returns undefined for unknown slug', () => {
      expect(getEventBySlug('non-existent-slug')).toBeUndefined();
    });
  });

  describe('getNeighborEvents', () => {
    it('returns null neighbors when slug is unknown', () => {
      expect(getNeighborEvents('does-not-exist')).toEqual({ older: null, newer: null });
    });

    it('has null newer for the first event', () => {
      const events = getAllEvents();
      const { newer, older } = getNeighborEvents(events[0].slug);
      expect(newer).toBeNull();
      expect(older).toEqual(events[1]);
    });

    it('has null older for the last event', () => {
      const events = getAllEvents();
      const last = events[events.length - 1];
      const { newer, older } = getNeighborEvents(last.slug);
      expect(older).toBeNull();
      expect(newer).toEqual(events[events.length - 2]);
    });

    it('returns both neighbors for middle items', () => {
      const events = getAllEvents();
      if (events.length < 3) return;
      const mid = events[1];
      const { newer, older } = getNeighborEvents(mid.slug);
      expect(newer).toEqual(events[0]);
      expect(older).toEqual(events[2]);
    });
  });

  describe('buildDisclaimerHtml', () => {
    it('embeds the provided title and a Reuse of NCI Information link', () => {
      const html = buildDisclaimerHtml('Sample Title');
      expect(html).toContain('Sample Title was originally published');
      expect(html).toContain('Reuse of NCI Information');
      expect(html).toMatch(/<a [^>]*href="https:\/\/www\.cancer\.gov[^"]*"/);
    });
  });

  it('exposes the route base constant', () => {
    expect(EVENT_ROUTE_BASE).toBe('/ccdi-events-announcements');
  });
});
