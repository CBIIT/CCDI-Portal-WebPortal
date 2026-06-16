/**
 * Minimal shapes for pages that load `resourceData.yaml` (Group B).
 * Keys match what each *ResourceView reads from YAML-loaded `data`.
 */

/** ToolsResourceController requires `toolsContent` to render the view. */
export const minimalToolsResourceData = {
  title: 'CCDI Hub Tools',
  Tools_Header: 'https://example.com/tools-header.png',
  toolsIntroText: 'Tools intro for unit test.',
  navTitles: ['Tools Topic One', 'Tool Subsection A'],
  toolsContent: [
    {
      id: 'tools_section_one',
      topic: 'Tools Topic One',
      list: [
        {
          id: 'tools_sub_a',
          subtopic: 'Tool Subsection A',
          content: 'Tool section body for testing.',
        },
      ],
    },
  ],
};

export const minimalFederationResourceData = {
  title: 'CCDI Data Federation Resource',
  Federation_Header: 'https://example.com/federation-header.png',
  CCDI_Federation_Data_Access: 'https://example.com/federation-diagram.png',
  federationIntroText: 'Federation intro for unit test.',
  navTitles: ['Federation Overview'],
  federationContent: [
    {
      id: 'fed_overview',
      topic: 'Federation Overview',
      content: 'Federation body content.',
    },
  ],
};

/** CCDIEventAnnouncementsResourceController requires `ccdiEventAnnouncementsContent`. */
export const minimalCcdiEventAnnouncementsResourceData = {
  ccdiEventAnnouncementsIntroText: '<p>CCDI events intro for unit test.</p>',
  ccdiEventAnnouncementsContent: [
    {
      id: 'event_section',
      topic: 'Announcements Topic',
      content: '<p>Announcements body.</p>',
    },
  ],
};

export const minimalRareCancerResourceData = {
  rareCancerIntroText: '<p>Rare cancer intro for unit test.</p>',
  rareCancerContent: [
    {
      id: 'rc_section',
      topic: 'Rare Cancer Topic',
      list: [
        {
          id: 'rc_sub',
          subtopic: 'Rare Subsection',
          content: '<p>Rare cancer subsection body.</p>',
        },
      ],
    },
  ],
};

/** Intro block renders when `cpiIntroText` is truthy (see cBioPortalResourceView). */
export const minimalCBioPortalResourceData = {
  cpiIntroText: '<span>intro gate</span>',
  cbioportalIntroText: '<p>cBioPortal intro for unit test.</p>',
  cbioportalContent: [
    {
      id: 'cbio_section',
      topic: 'cBioPortal Topic',
      content: '<p>cBioPortal section body.</p>',
    },
  ],
};
