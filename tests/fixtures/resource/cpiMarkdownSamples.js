/**
 * Sample cpiData.md for parseCpiMarkdown tests.
 * Mirrors CCDI_Hub_Static_Contents/cpiData.md shape (newsData.md-style blocks).
 */

export const sampleCpiMarkdownRaw = `---
CPI_Header_URL: "https://example.com/cpi-header.png"
CPI_Img_URL: "https://example.com/cpi-diagram.png"
CPI_Cross_Dataset_Linkages_Icon_URL: "https://example.com/cpi-linkages.svg"
CPI_Domain_Coverage_Icon_URL: "https://example.com/cpi-domains.svg"
CPI_Total_Mapped_Participants_Ids_Icon_URL: "https://example.com/cpi-mapped.svg"
CPI_Unique_Participants_Icon_URL: "https://example.com/cpi-unique.svg"
---

The Childhood Cancer Data Initiative (CCDI) Participant Index (CPI) maps research participant identifiers across Domains.

---

# Components

Identifiers and Domains make up the structure of the CPI.

- **Identifier**: A public identifier in a research dataset.
  - **Domain ID Type**: participant, PDX, cell line, or organoid.

Further information is at [participantindex-docs.ccdi.cancer.gov](https://participantindex-docs.ccdi.cancer.gov).

| Property | Value |
| --- | --- |
| id | CPI_Components |

---

# Core Functions of the CPI

The CPI API functions as a reference service for authorized applications.

| Property | Value |
| --- | --- |
| id | Core_Functions_of_the_CPI |

---

# Request Access

Request access by emailing [NCIChildhoodCancerDataInitiative@mail.nih.gov](mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov).

| Property | Value |
| --- | --- |
| id | CPI_Request_Access |

---

# Contribute to the CPI

1. **Submit a Contribution Request**: Contact the CPI Support Team.
2. **Data Preparation**: Use the CPI Submission Template.
3. **Data Submission**: Follow the provided instructions.

| Property | Value |
| --- | --- |
| id | Contribute_to_the_CPI |

---

# Contact

Contact the CPI support team at [NCIChildhoodCancerDataInitiative@mail.nih.gov](mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov).

| Property | Value |
| --- | --- |
| id | CPI_Contact |
`;

export const sampleCpiMarkdownMinimal = `---
CPI_Header_URL: "https://example.com/cpi-plain.png"
---

Intro paragraph for CPI.

# Overview Topic

Overview body for testing.

| Property | Value |
| --- | --- |
| id | overview_section |
`;
