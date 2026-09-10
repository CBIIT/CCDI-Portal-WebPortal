/**
 * Sample rareCancerData.md for parseRareCancerMarkdown tests.
 */

export const sampleRareCancerMarkdownRaw = `---
title: Pediatric, Adolescent, and Young Adult Rare Cancer Study
RCI_Header: "https://example.com/rare-cancer-header.png"
RCI_DOWNLOAD_CONFIG:
  url: "https://example.com/rare-cancer-study_contact.pdf"
  filename: rare-cancer-study_contact.pdf
navTitles:
  - Accessing Pediatric and AYA Rare Cancer Study Data
  - How to Access Study Data
  - Germline Findings
  - Contact Information
---

The Childhood Cancer Data Initiative (CCDI) Pediatric, Adolescent, and Young Adult Rare Cancer Study is a longitudinal study.

For an overview of this program, [access the study’s web page on cancer.gov](https://www.cancer.gov/research).

![RCI data flow chart](https://example.com/rci-flow-chart.png)

## Accessing Pediatric and AYA Rare Cancer Study Data

| Property | Value |
| --- | --- |
| id | Rare_Cancer_Study_Introduction |

### How to Access Study Data

#### How can Pediatric and AYA Rare Cancer Study data be accessed through the CCDI Data Ecosystem?

Study data can be accessed through the CCDI Data Ecosystem.

You can search by the study name. [This user guide](/user-guide.pdf) provides information.

| Property | Value |
| --- | --- |
| id | HOW_TO_ACCESS_STUDY_DATA |

### Germline Findings

#### What steps should be taken if germline findings are detected?

The participant’s physician should coordinate a referral for genetic counseling.

| Property | Value |
| --- | --- |
| id | GERMLINE_FINDINGS |

### Contact Information

#### Who should I contact with questions about CCDI Pediatric and AYA Rare Cancer Study results and data?

If you are interested in participating, download the contact form.

For questions related to study data, contact [NCIChildhoodCancerDataInitiative@mail.nih.gov](mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov).

| Property | Value |
| --- | --- |
| id | CONTACT_INFORMATION |
`;

export const sampleRareCancerMarkdownNoNavTitles = `---
title: Rare Cancer Without Nav
RCI_Header: https://example.com/header.png
---

Intro only before topics.

## Topic Alpha

### Sub One

Body for sub one.
`;

export const sampleRareCancerMarkdownFlowChartOnlyInBody = `---
title: Flow Chart From Body
---

Lead paragraph.

![RCI data flow chart](https://example.com/from-body-chart.png)

## Topic

### Sub

Body.
`;
