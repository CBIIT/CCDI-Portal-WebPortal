/**
 * Parsed pmtlData.md shape for PMTLResourceView tests.
 */

export const defaultPmtlViewData = {
  title: 'Pediatric Molecular Target Lists',
  introText: 'Unit test intro for PMTL resource page.',
  pmtlContent: [
    {
      id: 'section_overview',
      topic: 'Overview Section',
      list: [
        {
          id: 'sub_first',
          subtopic: 'First Subsection',
          content: 'PMTL subsection body for testing.',
        },
      ],
    },
  ],
};
