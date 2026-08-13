/**
 * Sample navData.md (YAML front matter only) for parser / header tests.
 * Content managers can copy this shape into CCDI_Hub_Static_Contents/navData.md.
 */

export const sampleNavMarkdownRaw = `---
primary:
  - name: Home
    link: /home
    className: navMobileItem
  - name: Explore
    link: "{{C3DC}}/exploreParticipants"
    className: navMobileItem
  - name: Studies
    link: "{{C3DC}}/studies"
    className: navMobileItem
  - name: Resources
    link: ""
    className: "navMobileItem clickable"
  - name: News
    link: /news
    className: navMobileItem
  - name: About
    link: /about
    className: "navMobileItem clickable"
resources:
  - name: Childhood Cancer Clinical Data Commons
    link: "{{C3DC}}/"
  - name: Childhood Cancer Data Catalog
    link: https://datacatalog.ccdi.cancer.gov
  - name: Molecular Characterization Initiative
    link: /MCI
  - name: National Childhood Cancer Registry Explorer
    link: https://nccrexplorer.ccdi.cancer.gov
  - name: CCDI Data Federation Resource
    link: /data-federation-resource
  - name: CCDI Participant Index
    link: /ccdi-participant-index
  - name: CCDI cBioPortal
    link: https://cbioportal.ccdi.cancer.gov
  - name: NCCR Data Platform
    link: https://nccrdataplatform.ccdi.cancer.gov/home
  - name: Pediatric Molecular Target Lists
    link: /pmtl
  - name: Tools
    link: /tools
  - name: CCDI Pediatric, Adolescent, and Young Adult Rare Cancer Study
    link: /pediatric-adolescent-and-young-adult-rare-cancer-study
about:
  - name: About CCDI Hub
    children:
      - name: About CCDI Hub
        link: /about
      - name: Release Notes
        link: /release-notes
  - name: About CCDI Data
    children:
      - name: CCDI Data Ecosystem & AI Readiness (PDF)
        link: /Ecosystem_AI_Readiness.pdf
      - name: CCDI Data Model
        link: "{{C3DC}}/data-model"
      - name: CCDI Data Submission Guide (PDF)
        link: /Submission_Guide.pdf
      - name: CCDI Data Usage Policies & Terms
        link: /data-usage-policies
  - name: CCDI Knowledge and Training
    children:
      - name: CCDI Events Announcements
        link: /ccdi-events-announcements
      - name: CCDI-Supported Publications
        link: /publications
  - name: Help
    children:
      - name: CCDI FAQs
        link: /faq
      - name: User Guide
        link: /user-guide.pdf
---
`;

export const sampleNavMarkdownEmpty = `---
---
`;

export const sampleNavMarkdownNoPrimary = `---
resources:
  - name: Tools
    link: /tools
---
`;
