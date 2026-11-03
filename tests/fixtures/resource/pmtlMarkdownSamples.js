/**
 * Sample pmtlData.md for parsePmtlMarkdown tests.
 * Mirrors the static-contents shape: leading topic ids, and section body ids
 * either on a ### trailing table or on a trailing table when the topic has no ###.
 */

export const samplePmtlMarkdownRaw = `---
title: Pediatric Molecular Target Lists
navTitles:
  - FDA PMTL Lists
  - Contact
---

The development of safe and effective therapies for children with cancer requires early planning.

## FDA PMTL Lists

| Property | Value |
| --- | --- |
| id | FDA_PMTL_Lists |

The Pediatric Molecular Target Lists (PMTL) include two categories:

1. [Relevant Molecular Targets](https://www.fda.gov/media/161463/download?attachment) – Targets with scientific evidence.
2. [Non-Relevant Molecular Targets (Leading to Waiver)](https://www.fda.gov/media/161462/download?attachment) – Targets that may qualify for waiver.

These lists are posted on the [FDA Oncology Center of Excellence website](https://www.fda.gov/about-fda/oncology-center-excellence/pediatric-oncology).

| Property | Value |
| --- | --- |
| id | FDA_PMTL_Lists_Introduction |

## Contact

| Property | Value |
| --- | --- |
| id | Contact |

For questions, contact [OCEPeRC@fda.hhs.gov](mailto:OCEPeRC@fda.hhs.gov).

| Property | Value |
| --- | --- |
| id | Contact_Information_PMTL |
`;

export const samplePmtlMarkdownWithSubtopics = `---
title: Pediatric Molecular Target Lists
navTitles:
  - Overview Section
---

Unit test intro for PMTL resource page.

## Overview Section

| Property | Value |
| --- | --- |
| id | section_overview |

### First Subsection

PMTL subsection body for testing.

| Property | Value |
| --- | --- |
| id | sub_first |
`;
