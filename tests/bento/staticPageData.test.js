/**
 * Static page content exports under `src/bento/` — shape and required fields.
 */

import { aboutData } from '../../src/bento/aboutPageData';
import { errorData } from '../../src/bento/pageNotFoundData';
import { introText as cpiIntro, cpiResourceData } from '../../src/bento/cpiResourceData';
import {
  introText as policiesIntro,
  dataUsagePoliciesContent,
} from '../../src/bento/dataUsagePoliciesData';
import { introText as federationIntro, federationContent } from '../../src/bento/federationData';
import { introText as mciIntro, MCIContent } from '../../src/bento/mciData';
import { publicationsList } from '../../src/bento/publicationsData';
import { altList, srcList, newsList, releaseNotesList } from '../../src/bento/newsData';

function expectAccordionSections(sections, label) {
  expect(Array.isArray(sections)).toBe(true);
  expect(sections.length).toBeGreaterThan(0);
  sections.forEach((section) => {
    expect(section).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        topic: expect.any(String),
        content: expect.any(String),
      }),
    );
    expect(section.id.length).toBeGreaterThan(0);
    expect(section.content).toContain('<');
  });
}

describe('bento static page data', () => {
  describe('aboutPageData', () => {
    it('should expose about copy with expected keys', () => {
      expect(aboutData).toEqual(
        expect.objectContaining({
          upperTitle: expect.any(String),
          upperText: expect.any(String),
          lowerTitle: expect.any(String),
          lowerText: expect.any(String),
          aboutText: expect.any(String),
        }),
      );
      expect(aboutData.upperTitle).toContain('Childhood Cancer Data Initiative');
    });
  });

  describe('pageNotFoundData', () => {
    it('should expose 404 messaging', () => {
      expect(errorData).toEqual({
        titleFirst: 'Page not found.',
        titleSecond: 'Looks like you got a little turned around.',
        buttonTitle: 'RETURN HOME',
      });
    });
  });

  describe('cpiResourceData', () => {
    it('should include intro text and accordion sections', () => {
      expect(cpiIntro).toContain('Participant Index');
      expectAccordionSections(cpiResourceData, 'cpiResourceData');
      expect(cpiResourceData.map((s) => s.id)).toEqual(
        expect.arrayContaining([
          'CPI_Components',
          'Core_Functions_of_the_CPI',
          'CPI_Request_Access',
          'Contribute_to_the_CPI',
          'CPI_Contact',
        ]),
      );
    });
  });

  describe('dataUsagePoliciesData', () => {
    it('should include intro text and policy sections', () => {
      expect(policiesIntro).toContain('policies');
      expectAccordionSections(dataUsagePoliciesContent, 'dataUsagePoliciesContent');
    });
  });

  describe('federationData', () => {
    it('should include intro text and federation sections', () => {
      expect(federationIntro).toContain('federation');
      expectAccordionSections(federationContent, 'federationContent');
    });
  });

  describe('mciData', () => {
    it('should include intro text and nested MCI sections', () => {
      expect(mciIntro).toContain('Molecular Characterization Initiative');
      expect(Array.isArray(MCIContent)).toBe(true);
      expect(MCIContent.length).toBeGreaterThan(0);
      const enrollment = MCIContent.find((s) => s.id === 'MCI_Introduction');
      expect(enrollment).toBeDefined();
      expect(Array.isArray(enrollment.list)).toBe(true);
      const metrics = enrollment.list.find((item) => item.id === 'Enrollment_Metrics');
      expect(metrics.numberTable.header).toEqual(
        expect.arrayContaining(['Institution Name', 'CNS Diagnosis']),
      );
      expect(metrics.diseaseTable.body.length).toBeGreaterThan(0);
    });
  });

  describe('publicationsData', () => {
    it('should list publications with bibliographic fields', () => {
      expect(publicationsList.length).toBeGreaterThan(0);
      publicationsList.forEach((pub) => {
        expect(pub).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            link: expect.any(String),
            date: expect.any(String),
            category: expect.any(String),
          }),
        );
        expect(pub.link).toMatch(/^https?:\/\//);
      });
    });
  });

  describe('newsData', () => {
    it('should align alt and src image maps', () => {
      expect(Object.keys(altList).sort()).toEqual(Object.keys(srcList).sort());
    });

    it('should list news and release notes with required fields', () => {
      expect(newsList.length).toBeGreaterThan(0);
      expect(releaseNotesList.length).toBeGreaterThan(0);

      [...newsList, ...releaseNotesList].forEach((item) => {
        expect(item).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            date: expect.any(String),
          }),
        );
      });
    });
  });
});
