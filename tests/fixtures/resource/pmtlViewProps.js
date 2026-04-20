/**
 * Minimal PMTL YAML-shaped data for PMTLResourceView / controller tests.
 */

export const defaultPmtlViewData = {
  introText: '<p>Unit test intro for PMTL resource page.</p>',
  pmtlContent: [
    {
      id: 'section_overview',
      topic: 'Overview Section',
      list: [
        {
          id: 'sub_first',
          subtopic: 'First Subsection',
          content: '<p>PMTL subsection body for testing.</p>',
        },
      ],
    },
  ],
};
