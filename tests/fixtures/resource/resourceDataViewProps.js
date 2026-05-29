/**
 * Minimal shapes for pages that load `resourceData.yaml` (Group B).
 * Keys match what each *ResourceView reads from YAML-loaded `data`.
 */

/** ToolsResourceController requires `toolsContent` to render the view. */
export const minimalToolsResourceData = {
  toolsIntroText: '<p>Tools intro for unit test.</p>',
  toolsContent: [
    {
      id: 'tools_section_one',
      topic: 'Tools Topic One',
      list: [
        {
          id: 'tools_sub_a',
          subtopic: 'Tool Subsection A',
          content: '<p>Tool section body for testing.</p>',
        },
      ],
    },
  ],
};

export const minimalFederationResourceData = {
  federationIntroText: '<p>Federation intro for unit test.</p>',
  federationContent: [
    {
      id: 'fed_overview',
      topic: 'Federation Overview',
      content: '<p>Federation body content.</p>',
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
