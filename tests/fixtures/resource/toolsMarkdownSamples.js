/**
 * Sample toolsData.md for parseToolsMarkdown tests.
 */

export const sampleToolsMarkdownRaw = `---
title: CCDI Hub Tools
Tools_Header: https://example.com/tools-header.png
navTitles:
  - Data Exploration
  - CCDI Hub Explore Dashboard
  - Analysis Tools
  - Cohort Analyzer
---

The CCDI Hub provides tools to explore, analyze, and access childhood cancer data.

## Data Exploration

### CCDI Hub Explore Dashboard

The Explore Dashboard is a participant-centric search tool for CCDI-managed data sets.

Link: [CCDI Hub Explore Dashboard](/explore)

Contact: [CCDI Hub Support](mailto:ncichildhoodcancerdatainitiative@mail.nih.gov)

## Analysis Tools

### Cohort Analyzer

The Cohort Analyzer compares up to three cohorts using an interactive Venn diagram.

Link 1: [Cohort Analyzer](/cohort-analyzer)

Link 2: [User Guide](/user-guide.pdf)

Contact: [CCDI Hub Support](mailto:ncichildhoodcancerdatainitiative@mail.nih.gov)
`;

export const sampleToolsMarkdownNoNavTitles = `---
title: Tools Without Nav
Tools_Header: https://example.com/tools-plain.png
---

Intro only before topics.

## Topic Alpha

### Tool One

Description for tool one.

Link: [Tool One](https://example.com/one)
`;
