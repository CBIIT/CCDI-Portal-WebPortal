/**
 * Sample mciData.md for parseMciMarkdown and MCI markdown controller/view tests.
 */

export const sampleMciMarkdownRaw = `---
MCI_Workflow_Diagram_Caption: Workflow caption from front matter
navTitles:
  - First Subsection
---
Unit test intro for MCI markdown page.

## Overview Section {#legacy-id}

### First Subsection

Subsection body copy for testing.

### Widget Subsection

Intro before widget.

\`\`\`mci-table
title: Widget Table
footer: Table footer
\`\`\`
`;

export const sampleMciMarkdownWithFmIntro = `---
introText: Legacy intro from front matter
---
## Only Topic

### Sub A

Body A.
`;

export const sampleMciMarkdownBackToBackH3 = `---
navTitles:
  - Testing Types
---
## Results

### Testing Types

### What types of clinical testing are conducted?

Body under the second title.

### Not In Nav List

Standalone subsection body.

`;

export const sampleResponsiveImgYaml = `---
MCI_Workflow_Diagram_Caption: Global caption
---
## Diagram

### Flow

\`\`\`responsive-img
wide: https://example.com/wide.png
mobile: https://example.com/mobile.png
alt: Diagram alt
Caption: Block caption
\`\`\`
`;

/** Parsed-shaped props for MCIResourceMarkdownView (no network). */
export const defaultMciMarkdownViewData = {
  introText: 'Unit test intro for MCI markdown view.',
  mciContent: [
    {
      id: 'overview-section',
      topic: 'Overview Section',
      list: [
        {
          id: 'first-subsection',
          subtopic: 'First Subsection',
          segments: [
            { type: 'markdown', markdown: 'Subsection body copy for testing.' },
          ],
        },
      ],
    },
  ],
};
