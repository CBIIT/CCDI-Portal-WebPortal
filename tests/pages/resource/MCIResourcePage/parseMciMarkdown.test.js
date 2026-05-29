/**
 * Unit tests for parseMciMarkdown (mciData.md → view props).
 */

import parseMciMarkdown, {
  buildNavTitleSet,
  normalizeNavTitleKey,
  resolveResponsiveImgCaption,
  resolveShowInNav,
} from '../../../../src/pages/resource/MCIResourcePage/parseMciMarkdown';
import {
  sampleMciMarkdownRaw,
  sampleMciMarkdownWithFmIntro,
  sampleMciMarkdownBackToBackH3,
  sampleResponsiveImgYaml,
} from '../../../fixtures/resource/mciMarkdownSamples';

describe('parseMciMarkdown', () => {
  describe('Body structure', () => {
    it('should parse intro, topics, subtopics, and markdown segments', () => {
      const data = parseMciMarkdown(sampleMciMarkdownRaw);

      expect(data.introText).toContain('Unit test intro for MCI markdown page');
      expect(data.mciContent).toHaveLength(1);
      expect(data.mciContent[0].topic).toBe('Overview Section');
      expect(data.mciContent[0].id).toBe('overview-section');
      expect(data.mciContent[0].list).toHaveLength(2);

      const firstSub = data.mciContent[0].list[0];
      expect(firstSub.subtopic).toBe('First Subsection');
      expect(firstSub.showInNav).toBe(true);
      expect(data.navTitles).toEqual(['First Subsection']);

      const widgetSub = data.mciContent[0].list[1];
      expect(widgetSub.showInNav).toBe(false);

      expect(firstSub.segments[0]).toEqual({
        type: 'markdown',
        markdown: 'Subsection body copy for testing.',
      });

      expect(widgetSub.segments.some((s) => s.type === 'widget' && s.widget === 'table')).toBe(true);
      const tableSeg = widgetSub.segments.find((s) => s.widget === 'table');
      expect(tableSeg.data.title).toBe('Widget Table');
    });

    it('should use front matter introText when body has no lead prose', () => {
      const data = parseMciMarkdown(sampleMciMarkdownWithFmIntro);
      expect(data.introText).toBe('Legacy intro from front matter');
      expect(data.mciContent[0].topic).toBe('Only Topic');
    });

    it('should return empty mciContent when body has no h2 sections', () => {
      const data = parseMciMarkdown('---\n---\nIntro only, no sections.');
      expect(data.introText).toContain('Intro only');
      expect(data.mciContent).toEqual([]);
    });

    it('should set showInNav from navTitles and merge back-to-back ### sections', () => {
      const data = parseMciMarkdown(sampleMciMarkdownBackToBackH3);
      const list = data.mciContent[0].list;

      expect(list).toHaveLength(2);
      expect(list[0].subtopic).toBe('Testing Types');
      expect(list[0].showInNav).toBe(true);
      expect(list[1].subtopic).toBe('Not In Nav List');
      expect(list[1].showInNav).toBe(false);

      const mergedMarkdown = list[0].segments.find((s) => s.type === 'markdown');
      expect(mergedMarkdown.markdown).toContain('### What types of clinical testing are conducted?');
    });

    it('should show all ### in nav when navTitles is omitted', () => {
      const data = parseMciMarkdown(sampleMciMarkdownWithFmIntro);
      expect(data.navTitles).toBeUndefined();
      expect(data.mciContent[0].list[0].showInNav).toBe(true);
    });
  });

  describe('navTitles helpers', () => {
    it('should normalize titles for case-insensitive matching', () => {
      expect(normalizeNavTitleKey('  Testing Types  ')).toBe('testing types');
      const set = buildNavTitleSet(['Testing Types']);
      expect(resolveShowInNav('testing types', set)).toBe(true);
      expect(resolveShowInNav('Other', set)).toBe(false);
      expect(resolveShowInNav('Any', null)).toBe(true);
    });
  });

  describe('resolveResponsiveImgCaption', () => {
    it('should prefer Caption, then caption, then block and front matter keys', () => {
      expect(resolveResponsiveImgCaption({ Caption: 'A' }, {})).toBe('A');
      expect(resolveResponsiveImgCaption({ caption: 'B' }, {})).toBe('B');
      expect(resolveResponsiveImgCaption({ MCI_Workflow_Diagram_Caption: 'C' }, {})).toBe('C');
      expect(resolveResponsiveImgCaption({}, { MCI_Workflow_Diagram_Caption: 'D' })).toBe('D');
      expect(resolveResponsiveImgCaption({}, {})).toBeNull();
    });
  });

  describe('Widgets', () => {
    it('should parse responsive-img widget data', () => {
      const data = parseMciMarkdown(sampleResponsiveImgYaml);
      const segments = data.mciContent[0].list[0].segments;
      const imgSeg = segments.find((s) => s.widget === 'responsiveImg');
      expect(imgSeg.data.wide).toBe('https://example.com/wide.png');
      expect(resolveResponsiveImgCaption(imgSeg.data, data)).toBe('Block caption');
    });
  });
});
