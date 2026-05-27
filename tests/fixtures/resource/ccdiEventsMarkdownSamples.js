/**
 * Sample ccdi-events-announcements.md for parser and markdown controller/view tests.
 */

export const sampleCcdiEventsMarkdownRaw = `---
title: CCDI Events Announcements
---
![Page hero](https://example.com/events-hero.png "Hero alt")

CCDI events intro for unit test.

## Announcements Topic

Announcements body from markdown.
`;

export const sampleCcdiEventsMarkdownFmIntro = `---
title: Custom Events Title
ccdiEventAnnouncementsIntroText: <p>CCDI events intro from front matter.</p>
CCDI_Event_Announcements_Header: https://example.com/fm-header.png
---
## Announcements Topic

Announcements body.
`;

export const sampleCcdiEventsMarkdownEmptyBody = `---
title: Empty Events
---
`;

/** Parsed-shaped props for CCDIEventAnnouncementsMarkdownView (no network). */
export const defaultCcdiEventsMarkdownViewData = {
  title: 'CCDI Events Announcements',
  ccdiEventAnnouncementsIntroMarkdown: 'CCDI events intro for unit test.',
  ccdiEventAnnouncementsContent: [
    {
      id: 'announcements-topic',
      topic: 'Announcements Topic',
      content: 'Announcements body from markdown.',
    },
  ],
};
