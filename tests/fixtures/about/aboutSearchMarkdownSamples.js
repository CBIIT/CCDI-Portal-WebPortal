/**
 * Sample aboutSearchContent.md for parseAboutSearchMarkdown tests
 * and static-contents seeding.
 */

export const sampleAboutSearchMarkdownRaw = `---
pages:
  - page: "/"
    title: "CCDI Home"
    content:
      - paragraph: "Childhood Cancer Data Catalog is a searchable inventory of childhood cancer resources."
      - paragraph: "Discover CCDI Resources on the Hub home page."
  - page: "/about"
    title: "About"
    content:
      - paragraph: "The Childhood Cancer Data Initiative (CCDI) Hub is an entry point for researchers."
      - paragraph: "The CCDI Hub’s mission is to support innovative research through increased accessibility of pediatric cancer research datasets."
  - page: "/data-usage-policies"
    title: "Data Usage Policies"
    content:
      - paragraph: "CCDI data usage policies describe how researchers may access and use Hub data."
---
`;

export const sampleAboutSearchPages = [
  {
    page: '/',
    title: 'CCDI Home',
    content: [
      { paragraph: 'Childhood Cancer Data Catalog is a searchable inventory of childhood cancer resources.' },
      { paragraph: 'Discover CCDI Resources on the Hub home page.' },
    ],
  },
  {
    page: '/about',
    title: 'About',
    content: [
      { paragraph: 'The Childhood Cancer Data Initiative (CCDI) Hub is an entry point for researchers.' },
      { paragraph: 'The CCDI Hub’s mission is to support innovative research through increased accessibility of pediatric cancer research datasets.' },
    ],
  },
  {
    page: '/data-usage-policies',
    title: 'Data Usage Policies',
    content: [
      { paragraph: 'CCDI data usage policies describe how researchers may access and use Hub data.' },
    ],
  },
];
