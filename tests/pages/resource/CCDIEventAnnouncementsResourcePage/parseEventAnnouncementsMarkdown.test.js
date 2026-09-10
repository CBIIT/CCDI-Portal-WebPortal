/**
 * Unit tests for parseEventAnnouncementsMarkdown (eventAnnouncements.md → view props).
 */

import parseEventAnnouncementsMarkdown, {
  topicToSectionId,
} from '../../../../src/pages/resource/CCDIEventAnnouncementsResourcePage/parseEventAnnouncementsMarkdown';

const sampleMarkdown = `![CCDI_Event_Announcements_Header](https://example.com/header.png)

The CCDI Events Announcements page brings together news announcements.

# Upcoming Events

[2026 CCDI Symposium](https://events.cancer.gov/nci/ccdisymposium)  
9/17/26 - 9/18/26

# Past Events, Webinars, and Workshops

[Childhood Cancer Clinical Data Commons](https://example.com/a.pdf)  
3/11/24

[Childhood Cancer Data Initiative—Recent Activities](https://example.com/b.pdf)  
3/8/24

# Contact

If you have questions, please contact [NCIChildhoodCancerDataInitiative@mail.nih.gov](mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov).
`;

describe('parseEventAnnouncementsMarkdown', () => {
  it('should parse header image, intro, and section topics with legacy ids', () => {
    const data = parseEventAnnouncementsMarkdown(sampleMarkdown);

    expect(data.CCDI_Event_Announcements_Header).toBe('https://example.com/header.png');
    expect(data.ccdiEventAnnouncementsIntroText).toContain('brings together news announcements');
    expect(data.ccdiEventAnnouncementsContent).toHaveLength(3);

    expect(data.ccdiEventAnnouncementsContent[0]).toMatchObject({
      id: 'CCDI_Event_Archive_0',
      topic: 'Upcoming Events',
    });
    expect(data.ccdiEventAnnouncementsContent[0].content).toContain('2026 CCDI Symposium');

    expect(data.ccdiEventAnnouncementsContent[1]).toMatchObject({
      id: 'CCDI_Event_Archive_1',
      topic: 'Past Events, Webinars, and Workshops',
    });
    expect(data.ccdiEventAnnouncementsContent[1].content).toContain('Childhood Cancer Clinical Data Commons');

    expect(data.ccdiEventAnnouncementsContent[2]).toMatchObject({
      id: 'CCDI_Event_Archive_2',
      topic: 'Contact',
    });
    expect(data.ccdiEventAnnouncementsContent[2].content).toContain('mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov');
  });

  it('should prefer property-table id when present', () => {
    const md = `# Custom Topic

Body text.

| Property | Value |
| --- | --- |
| id | Custom_Archive_Id |
`;
    const data = parseEventAnnouncementsMarkdown(md);
    expect(data.ccdiEventAnnouncementsContent[0].id).toBe('Custom_Archive_Id');
    expect(data.ccdiEventAnnouncementsContent[0].content).toBe('Body text.');
  });

  it('should support ## headings and strip BOM', () => {
    const md = `\uFEFFIntro line.

## Contact

Email us.
`;
    const data = parseEventAnnouncementsMarkdown(md);
    expect(data.ccdiEventAnnouncementsIntroText).toBe('Intro line.');
    expect(data.ccdiEventAnnouncementsContent[0].id).toBe('CCDI_Event_Archive_2');
    expect(data.ccdiEventAnnouncementsContent[0].content).toBe('Email us.');
  });

  it('should handle empty input', () => {
    expect(parseEventAnnouncementsMarkdown('')).toEqual({
      CCDI_Event_Announcements_Header: '',
      ccdiEventAnnouncementsIntroText: '',
      ccdiEventAnnouncementsContent: [],
    });
  });

  it('should prefer front-matter banner over leading body image', () => {
    const md = `---
CCDI_Event_Announcements_Header: https://example.com/fm-header.png
---
![legacy](https://example.com/legacy-header.png)

Intro from body.

# Contact

Email us.
`;
    const data = parseEventAnnouncementsMarkdown(md);
    expect(data.CCDI_Event_Announcements_Header).toBe('https://example.com/fm-header.png');
    expect(data.ccdiEventAnnouncementsIntroText).toBe('Intro from body.');
    expect(data.ccdiEventAnnouncementsContent[0].topic).toBe('Contact');
  });
});

describe('topicToSectionId', () => {
  it('should map known topics to legacy archive ids', () => {
    expect(topicToSectionId('Upcoming Events')).toBe('CCDI_Event_Archive_0');
    expect(topicToSectionId('Past Events, Webinars, and Workshops')).toBe('CCDI_Event_Archive_1');
    expect(topicToSectionId('Contact')).toBe('CCDI_Event_Archive_2');
  });

  it('should slugify unknown topics', () => {
    expect(topicToSectionId('New Topic Name')).toBe('New_Topic_Name');
  });
});
