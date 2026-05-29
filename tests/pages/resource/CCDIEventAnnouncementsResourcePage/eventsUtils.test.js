import {
  slugify,
  getAllEvents,
  getEventBySlug,
  getNeighborEvents,
  getDetailPageSlugForLinkText,
  mergeDetailPageEventsIntoAnnouncementsContent,
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
  });

  describe('getDetailPageSlugForLinkText', () => {
    it('returns slug for known detail page event titles', () => {
      expect(getDetailPageSlugForLinkText('CCDI March Community Forum'))
        .toBe('ccdi-march-2024-community-forum');
      expect(getDetailPageSlugForLinkText('Developing Pediatric Data Standards'))
        .toBe('developing-pediatric-data-standards');
    });

    it('returns null for titles that are not detail page events', () => {
      expect(getDetailPageSlugForLinkText('Childhood Cancer Clinical Data Commons'))
        .toBeNull();
    });
  });

  describe('getAllEvents / getEventBySlug', () => {
    it('returns only the configured detail page events', () => {
      const events = getAllEvents();
      expect(events).toHaveLength(2);
      expect(events[0].slug).toBe('ccdi-march-2024-community-forum');
      expect(events[1].slug).toBe('developing-pediatric-data-standards');
    });

    it('finds an existing event by slug', () => {
      const event = getEventBySlug('developing-pediatric-data-standards');
      expect(event.title).toBe('Developing Pediatric Data Standards');
      expect(event.image).toBe('developingpediatricdatastandards-PIC.png');
    });

    it('returns undefined for unknown slug', () => {
      expect(getEventBySlug('non-existent-slug')).toBeUndefined();
    });
  });

  describe('getNeighborEvents', () => {
    it('returns null neighbors when slug is unknown', () => {
      expect(getNeighborEvents('does-not-exist')).toEqual({ older: null, newer: null });
    });

    it('links newer and older posts between the two detail page events', () => {
      const { newer, older } = getNeighborEvents('developing-pediatric-data-standards');
      expect(newer.slug).toBe('ccdi-march-2024-community-forum');
      expect(older).toBeNull();

      const marchNeighbors = getNeighborEvents('ccdi-march-2024-community-forum');
      expect(marchNeighbors.newer).toBeNull();
      expect(marchNeighbors.older.slug).toBe('developing-pediatric-data-standards');
    });
  });

  describe('mergeDetailPageEventsIntoAnnouncementsContent', () => {
    const yamlSections = [
      {
        id: 'CCDI_Event_Archive_1',
        topic: 'Past Events, Webinars, and Workshops',
        content: [
          '<p>',
          '<a class="link" href="https://example.com/a.pdf">Childhood Cancer Clinical Data Commons: A New Web Application for Your Data Needs</a><br>3/11/24<br><br>',
          '<a class="link" href="https://example.com/b.pdf">Childhood Cancer Data Initiative—Recent Activities and Next Steps</a><br>3/8/24<br><br>',
          '<a class="link" href="https://example.com/c.pdf">Navigating CCDI Hub\'s Explore Dashboard and Data Access</a><br>11/13/23',
          '</p>',
        ].join(''),
      },
      {
        id: 'CCDI_Event_Archive_2',
        topic: 'Contact',
        content: '<p>Contact us.</p>',
      },
    ];

    it('merges local detail page events into the past events section in date order', () => {
      const merged = mergeDetailPageEventsIntoAnnouncementsContent(yamlSections);
      const pastEventsHtml = merged[0].content;

      expect(pastEventsHtml.indexOf('CCDI March Community Forum')).toBeLessThan(
        pastEventsHtml.indexOf('Childhood Cancer Clinical Data Commons'),
      );
      expect(pastEventsHtml.indexOf('Childhood Cancer Data Initiative—Recent Activities')).toBeLessThan(
        pastEventsHtml.indexOf('Developing Pediatric Data Standards'),
      );
      expect(pastEventsHtml.indexOf('Developing Pediatric Data Standards')).toBeLessThan(
        pastEventsHtml.indexOf('Navigating CCDI Hub'),
      );
      expect(pastEventsHtml).toContain('/ccdi-events-announcements/ccdi-march-2024-community-forum');
      expect(pastEventsHtml).toContain('/ccdi-events-announcements/developing-pediatric-data-standards');
    });

    it('does not modify non-past-events sections', () => {
      const merged = mergeDetailPageEventsIntoAnnouncementsContent(yamlSections);
      expect(merged[1].content).toBe('<p>Contact us.</p>');
    });

    it('does not duplicate events already present in yaml content', () => {
      const withExisting = [
        {
          ...yamlSections[0],
          content: `<p><a class="link" href="#">CCDI March Community Forum</a><br>3/18/24<br><br>${yamlSections[0].content.replace(/^<p>/, '')}`,
        },
      ];
      const merged = mergeDetailPageEventsIntoAnnouncementsContent(withExisting);
      const matches = merged[0].content.match(/CCDI March Community Forum/g) || [];
      expect(matches).toHaveLength(1);
    });
  });

  describe('buildDisclaimerHtml', () => {
    it('embeds the provided title and a Reuse of NCI Information link', () => {
      const html = buildDisclaimerHtml('Sample Title');
      expect(html).toContain('Sample Title was originally published');
      expect(html).toContain('Reuse of NCI Information');
    });
  });

  it('exposes the route base constant', () => {
    expect(EVENT_ROUTE_BASE).toBe('/ccdi-events-announcements');
  });
});
