/**
 * Sample landingData.md (YAML front matter only) for parser / controller tests.
 * Content managers can copy this shape into CCDI_Hub_Static_Contents/landingData.md.
 */

export const sampleLandingMarkdownRaw = `---
heroTitle: Discover CCDI Resources
heroSubtitle: |
  Explore the CCDI Hub, its applications, and analytic tools by selecting an available resource
introTitle3: ABOUT CCDI HUB
introButtonTitle: ABOUT CCDI
latestUpdatesTitle: Latest Updates
resourceTitle: Resources
applicationsTitle: CCDI-SUPPORTED RESOURCES
cloudResourcesTitle: Other Resources
statsNote: Counts for MCI participants in CCDI Hub and total MCI participants consented may differ.
stats:
  - title: Cataloged Datasets
    detail: Childhood Cancer Data Catalog
    link: https://datacatalog.ccdi.cancer.gov
  - title: Participants with Available Genomic and Clinical Data
    detail: Molecular Characterization Initiative
    link: /MCI
  - title: "Reported Cases Under Age 40<br>(1995-2020)"
    detail: National Childhood Cancer Registry Explorer
    link: https://nccrexplorer.ccdi.cancer.gov
    num: 1700440
resourcesApplications:
  - id: c3dc
    title: Childhood Cancer Clinical Data Commons
    subtitle: C3DC
    content: A searchable database of childhood cancer demographics and phenotypic clinical data.
    link: "{{C3DC}}/"
  - id: ccdc
    title: Childhood Cancer Data Catalog
    subtitle: CCDC
    content: A searchable inventory of childhood cancer resources.
    link: https://datacatalog.ccdi.cancer.gov
  - id: mci
    title: Molecular Characterization Initiative
    subtitle: MCI
    content: A program providing molecular testing for children, adolescents, and young adults with certain cancer types.
    link: /MCI
    noLink: true
resourcesCloud:
  - id: cgc
    title: Cancer Genomics Cloud
    subtitle: CGC
    content: A cloud-based platform to access and analyze cancer research data.
    link: https://www.cancergenomicscloud.org
  - id: dbgap
    title: Database of Genotypes and Phenotypes
    subtitle: dbGaP
    content: A database to store and distribute data and results from studies examining the interaction of genotypes and phenotypes.
    link: https://www.ncbi.nlm.nih.gov/gap
carousel:
  - content: Childhood Cancer Clinical Data Commons
    link: "{{C3DC}}"
  - content: Molecular Characterization Initiative
    link: /MCI
---
`;

export const sampleLandingMarkdownEmpty = `---
---
`;

export const sampleLandingMarkdownInvalid = `---
heroTitle: [unclosed
---
`;
