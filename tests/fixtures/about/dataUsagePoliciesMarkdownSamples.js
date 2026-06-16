/**
 * Sample dataUsagePolicies.md for parseDataUsagePoliciesMarkdown tests.
 */

export const sampleDataUsagePoliciesMarkdownRaw = `---
title: CCDI Data Usage Policies & Terms
Data_Usage_Policies_Header: https://example.com/data-usage-policies-header.png
---

There are policies and terms to keep in mind when using CCDI-managed data.

> If you're looking for information on how to find, request, access, download, and analyze controlled-access data managed by CCDI, see our [data access instructions guide](https://datacatalog.ccdi.cancer.gov/CCDI_CGC_Data_Access_Instructions_2.0.pdf).

## Data Use Expectations

The CCDI Hub allows the public to view and analyze cancer data.

## Citing the CCDI Hub

NCI expects users to acknowledge CCDI data use as follows:

> The results published here are, in whole or in part, derived from the analysis of data listed in the CCDI Hub.

## Contact

For any questions or concerns related to CCDI-managed data, email CCDI.

> For information on sharing NCI-funded cancer research data, [NCI's official data sharing policy guidance](https://datascience.cancer.gov/data-sharing/policy-guidance) details the people, policies, requirements, and resources you need to start sharing your data.
`;

export const defaultDataUsagePoliciesViewData = {
  title: 'CCDI Data Usage Policies & Terms',
  Data_Usage_Policies_Header: '',
  introText: 'There are policies and terms to keep in mind when using CCDI-managed data.',
  introCallout: '> Intro callout with [guide](https://example.test/guide.pdf).',
  dataUsagePoliciesContent: [
    {
      id: 'Data_Use_Expectations',
      topic: 'Data Use Expectations',
      markdown: 'The CCDI Hub allows the public to view and analyze cancer data.',
      blockquoteVariant: 'default',
    },
    {
      id: 'Data_Disclaimers',
      topic: 'Data Disclaimers',
      markdown: 'Disclaimer content.',
      blockquoteVariant: 'default',
    },
  ],
};
