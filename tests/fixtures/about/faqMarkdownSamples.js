/**
 * Sample faqData.md for parseFaqMarkdown / FaqPage tests and static-contents seeding.
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
faqs:
  - id: controlled-access
    category: data-exploration
    question: How can I apply for controlled data access to a CCDI-indexed study?
    answer: |
      To apply for controlled data access, you need an [NIH eRA Commons account](https://public.era.nih.gov/commons/).
      Follow the [guide](https://datacatalog.ccdi.cancer.gov/) for requesting access through dbGaP.
  - id: explore-hub
    category: data-exploration
    question: How do I explore CCDI data in the Hub?
    answer: |
      Use the Explore page to filter participants, samples, and files by study and clinical attributes.
  - id: download-files
    category: data-exploration
    question: How do I download files from the Hub?
    answer: |
      Add files to My Files from Explore results, then download a manifest for use in analysis environments.
  - id: open-access
    category: data-exploration
    question: Which CCDI data are open access?
    answer: |
      Open-access data do not require dbGaP approval. Check each study record for access type.
  - id: cohort-analyzer
    category: data-exploration
    question: What is Cohort Analyzer?
    answer: |
      Cohort Analyzer lets you compare saved cohorts and visualize overlapping participant sets.
  - id: studies-page
    category: data-exploration
    question: Where can I find a list of CCDI studies?
    answer: |
      The Studies page lists CCDI-indexed studies with metadata and data availability.
  - id: c3dc-link
    category: data-exploration
    question: How is the Childhood Cancer Clinical Data Commons related to the Hub?
    answer: |
      C3DC provides clinical common data elements that can be explored alongside Hub resources.
  - id: mci-what
    category: mci
    question: What is the Molecular Characterization Initiative (MCI)?
    answer: |
      MCI provides molecular characterization for eligible pediatric cancer patients.
  - id: mci-eligibility
    category: mci
    question: Who is eligible for MCI?
    answer: |
      Eligibility is determined by participating sites and clinical criteria for pediatric cancers.
  - id: mci-results
    category: mci
    question: How are MCI results returned to clinicians?
    answer: |
      Results are returned through the clinical care pathway at the enrolling institution.
  - id: mci-data-hub
    category: mci
    question: Are MCI data available in the CCDI Hub?
    answer: |
      Aggregated MCI statistics and resources are available on the MCI resource page in the Hub.
  - id: contact-support
    category: support
    question: How do I get help using the CCDI Hub?
    answer: |
      Contact the CCDI Help Desk or review the User Guide linked from the About menu.
  - id: report-issue
    category: support
    question: How do I report a problem with Hub data or tools?
    answer: |
      Email the CCDI support contact listed on the About page with a description of the issue.
  - id: training
    category: support
    question: Where can I find training or events?
    answer: |
      See CCDI Events Announcements and CCDI-Supported Publications under About.
---
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
