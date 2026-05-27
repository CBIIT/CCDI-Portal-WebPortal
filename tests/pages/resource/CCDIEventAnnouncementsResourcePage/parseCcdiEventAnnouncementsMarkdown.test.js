/**
 * Unit tests for parseCcdiEventAnnouncementsMarkdown.
 */

import parseCcdiEventAnnouncementsMarkdown from '../../../../src/pages/resource/CCDIEventAnnouncementsResourcePage/parseCcdiEventAnnouncementsMarkdown';
import {
  sampleCcdiEventsMarkdownRaw,
  sampleCcdiEventsMarkdownFmIntro,
  sampleCcdiEventsMarkdownEmptyBody,
} from '../../../fixtures/resource/ccdiEventsMarkdownSamples';

describe('parseCcdiEventAnnouncementsMarkdown', () => {
  describe('Body structure', () => {
    it('should parse title, hero image, intro markdown, and h2 sections', () => {
      const data = parseCcdiEventAnnouncementsMarkdown(sampleCcdiEventsMarkdownRaw);

      expect(data.title).toBe('CCDI Events Announcements');
      expect(data.ccdiEventAnnouncementsHeaderImageUrl).toBe('https://example.com/events-hero.png');
      expect(data.ccdiEventAnnouncementsIntroMarkdown).toContain('CCDI events intro for unit test');
      expect(data.ccdiEventAnnouncementsIntroText).toBeUndefined();
      expect(data.ccdiEventAnnouncementsContent).toHaveLength(1);
      expect(data.ccdiEventAnnouncementsContent[0].topic).toBe('Announcements Topic');
      expect(data.ccdiEventAnnouncementsContent[0].id).toBe('announcements-topic');
      expect(data.ccdiEventAnnouncementsContent[0].content).toContain('Announcements body');
    });

    it('should use front matter intro HTML when body intro is empty', () => {
      const data = parseCcdiEventAnnouncementsMarkdown(sampleCcdiEventsMarkdownFmIntro);

      expect(data.title).toBe('Custom Events Title');
      expect(data.ccdiEventAnnouncementsIntroText).toContain('intro from front matter');
      expect(data.ccdiEventAnnouncementsIntroMarkdown).toBeUndefined();
      expect(data.CCDI_Event_Announcements_Header).toBe('https://example.com/fm-header.png');
    });

    it('should return empty content array when body has no h2 sections', () => {
      const data = parseCcdiEventAnnouncementsMarkdown(sampleCcdiEventsMarkdownEmptyBody);
      expect(data.ccdiEventAnnouncementsContent).toEqual([]);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty input', () => {
      const data = parseCcdiEventAnnouncementsMarkdown('');
      expect(data.ccdiEventAnnouncementsContent).toEqual([]);
    });
  });
});
