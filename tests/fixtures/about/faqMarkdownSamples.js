/**
 * Sample faqData.md for parseFaqMarkdown / FaqPage tests and static-contents seeding.
 * Shape: YAML front matter for title / headerImage / categories; news-style `#` FAQ blocks.
 */

export const sampleFaqMarkdownRaw = `---
title: CCDI FAQs
headerImage: https://example.com/faq-header.png
categories:
  - id: data-exploration
    name: Data Exploration and Data Access
  - id: mci
    name: Molecular Characterization Initiative (MCI)
  - id: support
    name: Support
---

# How can I apply for controlled data access to a CCDI-indexed study?

To apply for controlled data access, you need an [NIH eRA Commons account](https://public.era.nih.gov/commons/).
Follow the [guide](https://datacatalog.ccdi.cancer.gov/) for requesting access through dbGaP.

| Property | Value |
| --- | --- |
| id | controlled-access |
| category | data-exploration |

---

# How do I explore CCDI data in the Hub?

Use the Explore page to filter participants, samples, and files by study and clinical attributes.

| Property | Value |
| --- | --- |
| id | explore-hub |
| category | data-exploration |

---

# How do I download files from the Hub?

Add files to My Files from Explore results, then download a manifest for use in analysis environments.

| Property | Value |
| --- | --- |
| id | download-files |
| category | data-exploration |

---

# Which CCDI data are open access?

Open-access data do not require dbGaP approval. Check each study record for access type.

| Property | Value |
| --- | --- |
| id | open-access |
| category | data-exploration |

---

# What is Cohort Analyzer?

Cohort Analyzer lets you compare saved cohorts and visualize overlapping participant sets.

| Property | Value |
| --- | --- |
| id | cohort-analyzer |
| category | data-exploration |

---

# Where can I find a list of CCDI studies?

The Studies page lists CCDI-indexed studies with metadata and data availability.

| Property | Value |
| --- | --- |
| id | studies-page |
| category | data-exploration |

---

# How is the Childhood Cancer Clinical Data Commons related to the Hub?

C3DC provides clinical common data elements that can be explored alongside Hub resources.

| Property | Value |
| --- | --- |
| id | c3dc-link |
| category | data-exploration |

---

# What is the Molecular Characterization Initiative (MCI)?

MCI provides molecular characterization for eligible pediatric cancer patients.

| Property | Value |
| --- | --- |
| id | mci-what |
| category | mci |

---

# Who is eligible for MCI?

Eligibility is determined by participating sites and clinical criteria for pediatric cancers.

| Property | Value |
| --- | --- |
| id | mci-eligibility |
| category | mci |

---

# How are MCI results returned to clinicians?

Results are returned through the clinical care pathway at the enrolling institution.

| Property | Value |
| --- | --- |
| id | mci-results |
| category | mci |

---

# Are MCI data available in the CCDI Hub?

Aggregated MCI statistics and resources are available on the MCI resource page in the Hub.

| Property | Value |
| --- | --- |
| id | mci-data-hub |
| category | mci |

---

# How do I get help using the CCDI Hub?

Contact the CCDI Help Desk or review the User Guide linked from the About menu.

| Property | Value |
| --- | --- |
| id | contact-support |
| category | support |

---

# How do I report a problem with Hub data or tools?

Email the CCDI support contact listed on the About page with a description of the issue.

| Property | Value |
| --- | --- |
| id | report-issue |
| category | support |

---

# Where can I find training or events?

See CCDI Events Announcements and CCDI-Supported Publications under About.

| Property | Value |
| --- | --- |
| id | training |
| category | support |
`;

export const defaultFaqViewData = {
  title: 'CCDI FAQs',
  headerImage: '',
  categories: [
    { id: 'data-exploration', name: 'Data Exploration and Data Access' },
    { id: 'mci', name: 'Molecular Characterization Initiative (MCI)' },
    { id: 'support', name: 'Support' },
  ],
  faqs: [
    {
      id: 'controlled-access',
      category: 'data-exploration',
      question: 'How can I apply for controlled data access to a CCDI-indexed study?',
      answer: 'To apply for controlled data access, you need an [NIH eRA Commons account](https://public.era.nih.gov/commons/).',
    },
    {
      id: 'explore-hub',
      category: 'data-exploration',
      question: 'How do I explore CCDI data in the Hub?',
      answer: 'Use the Explore page to filter participants, samples, and files.',
    },
    {
      id: 'mci-what',
      category: 'mci',
      question: 'What is the Molecular Characterization Initiative (MCI)?',
      answer: 'MCI provides molecular characterization for eligible pediatric cancer patients.',
    },
    {
      id: 'contact-support',
      category: 'support',
      question: 'How do I get help using the CCDI Hub?',
      answer: 'Contact the CCDI Help Desk or review the User Guide.',
    },
  ],
};
