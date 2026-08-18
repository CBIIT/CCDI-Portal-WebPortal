/**
 * Extended resource page props for navigation / scroll interaction tests.
 */

import {
  minimalFederationResourceData,
  minimalCcdiEventAnnouncementsResourceData,
  minimalToolsResourceData,
  minimalRareCancerResourceData,
  minimalCBioPortalResourceData,
} from './resourceDataViewProps';

import { defaultMciViewData } from './mciViewProps';
import { defaultPmtlViewData } from './pmtlViewProps';

export const multiTopicFederationData = {
  ...minimalFederationResourceData,
  navTitles: ['Topic A', 'Data Access', 'Topic B'],
  federationContent: [
    { id: 'fed_a', topic: 'Topic A', content: 'Section A' },
    { id: 'Data_Access', topic: 'Data Access', content: 'Access details' },
    { id: 'fed_b', topic: 'Topic B', content: 'Section B' },
  ],
  CCDI_Federation_Data_Access: '/test-federation-infographic.png',
};

export const multiTopicCcdiEventsData = {
  ...minimalCcdiEventAnnouncementsResourceData,
  ccdiEventAnnouncementsContent: [
    { id: 'event_a', topic: 'Events A', content: 'Event A body' },
    { id: 'event_b', topic: 'Events B', content: 'Event B body' },
  ],
};

export const multiTopicToolsData = {
  ...minimalToolsResourceData,
  navTitles: ['Tools A', 'Sub A', 'Tools B', 'Sub B'],
  toolsContent: [
    {
      id: 'tools_a',
      topic: 'Tools A',
      list: [{ id: 'sub_a', subtopic: 'Sub A', content: 'Sub A body' }],
    },
    {
      id: 'tools_b',
      topic: 'Tools B',
      list: [{ id: 'sub_b', subtopic: 'Sub B', content: 'Sub B body' }],
    },
  ],
};

export const multiTopicMciData = {
  ...defaultMciViewData,
  mciContent: [
    {
      id: 'mci_a',
      topic: 'MCI Topic A',
      list: [{ id: 'mci_sub_a', subtopic: 'MCI Sub A', content: '<p>MCI A</p>' }],
    },
    {
      id: 'mci_b',
      topic: 'MCI Topic B',
      list: [{ id: 'mci_sub_b', subtopic: 'MCI Sub B', content: '<p>MCI B</p>' }],
    },
  ],
};

export const multiTopicPmtlData = {
  ...defaultPmtlViewData,
  pmtlContent: [
    {
      id: 'pmtl_a',
      topic: 'PMTL Topic A',
      list: [{ id: 'pmtl_sub_a', subtopic: 'PMTL Sub A', content: '<p>PMTL A</p>' }],
    },
    {
      id: 'pmtl_b',
      topic: 'PMTL Topic B',
      list: [{ id: 'pmtl_sub_b', subtopic: 'PMTL Sub B', content: '<p>PMTL B</p>' }],
    },
  ],
};

export const multiTopicRareCancerData = {
  ...minimalRareCancerResourceData,
  navTitles: ['Rare Topic A', 'Rare Sub A', 'Rare Topic B', 'Rare Sub B'],
  rareCancerContent: [
    {
      id: 'RC_SECTION',
      topic: 'Rare Topic A',
      list: [{ id: 'rc_sub_a', subtopic: 'Rare Sub A', content: 'Rare A' }],
    },
    {
      id: 'rc_b',
      topic: 'Rare Topic B',
      list: [{ id: 'rc_sub_b', subtopic: 'Rare Sub B', content: 'Rare B' }],
    },
  ],
};

/** Same-origin contact-form download + custom flow-chart URL. */
export const rareCancerWithDownloadData = {
  ...minimalRareCancerResourceData,
  rareCancerIntroText: 'Rare cancer intro with download.',
  RCI_DOWNLOAD_CONFIG: {
    url: '/local/rare-cancer-contact.pdf',
    filename: 'rare-cancer-contact.pdf',
  },
  RCI_Data_Flow_Chart_URL: 'https://example.com/custom-rci-flow-chart.png',
  navTitles: ['Rare Topic A', 'Contact Information', 'Rare Topic B', 'Rare Sub B'],
  rareCancerContent: [
    {
      id: 'RC_SECTION',
      topic: 'Rare Topic A',
      list: [{
        id: 'CONTACT_INFORMATION',
        subtopic: 'Contact Information',
        content: '#### Who should I contact?\n\nIf you are interested in participating, download the contact form.\n\nFor questions related to study data.',
      }],
    },
    {
      id: 'rc_b',
      topic: 'Rare Topic B',
      list: [{ id: 'rc_sub_b', subtopic: 'Rare Sub B', content: 'Rare B' }],
    },
  ],
};

/** Cross-origin PDF URL for fetch / fallback-to-window.open paths. */
export const rareCancerCrossOriginDownloadData = {
  ...rareCancerWithDownloadData,
  RCI_DOWNLOAD_CONFIG: {
    url: 'https://cdn.example.com/rare-cancer-contact.pdf',
    filename: 'rare-cancer-contact.pdf',
  },
};

export const multiTopicCBioData = {
  ...minimalCBioPortalResourceData,
  cbioportalContent: [
    { id: 'cbio_a', topic: 'cBio A', content: '<p>cBio A body</p>' },
    { id: 'cbio_b', topic: 'cBio B', content: '<p>cBio B body</p>' },
  ],
};
