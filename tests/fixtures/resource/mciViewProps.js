/**
 * Minimal MCI YAML-shaped data for MCIResourceView / controller tests.
 * Matches the structure expected by MCIResourceView (mciContent, introText).
 */

export const defaultMciViewData = {
  introText: '<p>Unit test intro for MCI resource page.</p>',
  mciContent: [
    {
      id: 'section_overview',
      topic: 'Overview Section',
      list: [
        {
          id: 'sub_first',
          subtopic: 'First Subsection',
          content: '<p>Subsection body copy for testing.</p>',
        },
      ],
    },
  ],
};
