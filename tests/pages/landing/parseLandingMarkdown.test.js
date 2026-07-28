/**
 * Unit tests for parseLandingMarkdown / mergeLandingContent.
 */

jest.mock('../../../src/utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_C3DC: 'https://c3dc.test.example',
  },
}));

import parseLandingMarkdown, {
  mergeLandingContent,
} from '../../../src/pages/landing/parseLandingMarkdown';
import {
  sampleLandingMarkdownRaw,
  sampleLandingMarkdownEmpty,
} from '../../fixtures/landing/landingMarkdownSamples';

const defaults = {
  introData: {
    introTitle1: 'fallback title',
    introTitle2: 'fallback subtitle',
    introTitle3: 'FALLBACK ABOUT',
    introButtonTitle: 'FALLBACK BTN',
  },
  titleData: {
    latestUpdatesTitle: 'Fallback Updates',
    resourceTitle: 'Fallback Resources',
    applicationsTitle: 'FALLBACK APPS',
    cloudResourcesTitle: 'Fallback Cloud',
  },
  statsData: [
    { num: '', title: 'Local Stat', detail: 'Local', link: '/local' },
  ],
  statsNote: 'local note',
  resourcesAppliationsListData: [
    {
      id: 'c3dc',
      title: 'Local C3DC',
      content: 'local',
      link: '/local-c3dc',
      img: 'local-img',
    },
  ],
  resourcesCloudListData: [],
  carouselList: [
    {
      content: 'Childhood Cancer Clinical Data Commons',
      link: '/local',
      img: 'local-wheel',
      mobile: 'local-mobile',
    },
  ],
};

describe('parseLandingMarkdown', () => {
  it('should parse YAML front matter and resolve {{C3DC}}', () => {
    const parsed = parseLandingMarkdown(sampleLandingMarkdownRaw);
    expect(parsed).not.toBeNull();
    expect(parsed.heroTitle).toBe('Discover CCDI Resources');
    expect(parsed.resourcesApplications[0].link).toBe('https://c3dc.test.example/');
    expect(parsed.carousel[0].link).toBe('https://c3dc.test.example');
  });

  it('should return null for empty front matter', () => {
    expect(parseLandingMarkdown(sampleLandingMarkdownEmpty)).toBeNull();
  });

  it('should return null for blank input', () => {
    expect(parseLandingMarkdown('')).toBeNull();
    expect(parseLandingMarkdown(null)).toBeNull();
  });
});

describe('mergeLandingContent', () => {
  it('should keep defaults when parsed is null', () => {
    expect(mergeLandingContent(null, defaults)).toBe(defaults);
  });

  it('should overlay remote fields and keep local images by id', () => {
    const parsed = parseLandingMarkdown(sampleLandingMarkdownRaw);
    const merged = mergeLandingContent(parsed, defaults);
    expect(merged.introData.introTitle1).toBe('Discover CCDI Resources');
    expect(merged.resourcesAppliationsListData[0].img).toBe('local-img');
    expect(merged.resourcesAppliationsListData[0].link).toBe(
      'https://c3dc.test.example/',
    );
    expect(merged.carouselList[0].img).toBe('local-wheel');
    expect(merged.carouselList[0].link).toBe('https://c3dc.test.example');
  });
});
