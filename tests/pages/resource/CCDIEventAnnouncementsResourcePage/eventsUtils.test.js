import {
  slugify,
  getAllEvents,
  getEventBySlug,
  getDetailPageSlugForLinkText,
  buildDetailPageListEntryHtml,
  buildDetailPageListEntryMarkdown,
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

  describe('buildDetailPageListEntryMarkdown', () => {
    it('builds markdown list entries without the pdf export link class', () => {
      const event = getAllEvents()[0];
      const markdown = buildDetailPageListEntryMarkdown(event);

      expect(markdown).toContain(event.title);
      expect(markdown).toContain(`${EVENT_ROUTE_BASE}/${event.slug}`);
      expect(markdown).toContain(event.rawDate);
      expect(markdown).not.toContain('class="link"');
    });

    it('keeps buildDetailPageListEntryHtml as an alias', () => {
      const event = getAllEvents()[0];
      expect(buildDetailPageListEntryHtml(event)).toBe(buildDetailPageListEntryMarkdown(event));
    });
  });

  describe('mergeDetailPageEventsIntoAnnouncementsContent', () => {
    const markdownSections = [
      {
        id: 'CCDI_Event_Archive_1',
        topic: 'Past Events, Webinars, and Workshops',
        content: [
          '[Childhood Cancer Clinical Data Commons: A New Web Application for Your Data Needs](https://example.com/a.pdf)',
          '3/11/24',
          '',
          '[Childhood Cancer Data Initiative—Recent Activities and Next Steps](https://example.com/b.pdf)',
          '3/8/24',
          '',
          '[Navigating CCDI Hub\'s Explore Dashboard and Data Access](https://example.com/c.pdf)',
          '11/13/23',
        ].join('\n'),
      },
      {
        id: 'CCDI_Event_Archive_2',
        topic: 'Contact',
        content: 'Contact us.',
      },
    ];

    it('merges local detail page events into the past events section in date order', () => {
      const merged = mergeDetailPageEventsIntoAnnouncementsContent(markdownSections);
      const pastEventsMarkdown = merged[0].content;

      expect(pastEventsMarkdown.indexOf('CCDI March Community Forum')).toBeLessThan(
        pastEventsMarkdown.indexOf('Childhood Cancer Clinical Data Commons'),
      );
      expect(pastEventsMarkdown.indexOf('Childhood Cancer Data Initiative—Recent Activities')).toBeLessThan(
        pastEventsMarkdown.indexOf('Developing Pediatric Data Standards'),
      );
      expect(pastEventsMarkdown.indexOf('Developing Pediatric Data Standards')).toBeLessThan(
        pastEventsMarkdown.indexOf('Navigating CCDI Hub'),
      );
      expect(pastEventsMarkdown).toContain('/ccdi-events-announcements/ccdi-march-2024-community-forum');
      expect(pastEventsMarkdown).toContain('/ccdi-events-announcements/developing-pediatric-data-standards');
    });

    it('does not modify non-past-events sections', () => {
      const merged = mergeDetailPageEventsIntoAnnouncementsContent(markdownSections);
      expect(merged[1].content).toBe('Contact us.');
    });

    it('does not duplicate events already present in markdown content', () => {
      const withExisting = [
        {
          ...markdownSections[0],
          content: [
            '[CCDI March Community Forum](/ccdi-events-announcements/ccdi-march-2024-community-forum)',
            '3/18/24',
            '',
            markdownSections[0].content,
          ].join('\n'),
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
