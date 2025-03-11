import updateImgCCDC from '../assets/landing/Updates_CCDC.png';
import updateImgCCDC2 from '../assets/news/News_CCDC_2.png';
import updateImgMolecular from '../assets/landing/Updates_Molecular.png';
import updateImgSymposium from '../assets/landing/Updates_Symposium.png';
import updateImgMTP from '../assets/news/News_MTP.png';
import updateImgMTP2 from '../assets/news/News_MTP_2.png';
import updateImgMolecularCharacterization from '../assets/news/News_Molecular_Characterization.png';
import updateImgDashboard from '../assets/news/News_Dashboard.png';
import updateImgEHR from '../assets/news/News_EHR.png';
import updateImgC3DC from '../assets/news/News_C3DC.png';
import updateImgHub from '../assets/news/News_Hub.png';
import userGuidePDF from '../assets/about/CCDI_Usage_Instructions_Feb2025_2.5.1_Final.pdf';

export const altList = {
    updateImgCCDC: 'Young boy on a swing outdoors, symbolizing childhood health, linking to the CCDC site',
    updateImgCCDC2: 'A laptop screen showing a major new release of a resource, featuring a healthcare website with a child and a doctor interacting, set against a desk with stationary items',
    updateImgMolecular: 'Illustration of a person connected to a computer screen displaying a DNA sequence analysis, symbolizing the relationship between human genetics and data analysis.',
    updateImgSymposium: 'Simple icon of two human figures raising their arms together on a blue gradient background.',
    updateImgMTP: 'A medical professional using a tablet with digital interface graphics and abstract data connections, representing advanced healthcare technology.',
    updateImgMTP2: 'A laptop displaying a molecular targets platform with large arrows pointing upward, symbolizing growth and progress in the field.',
    updateImgMolecularCharacterization: 'updateImgMolecularCharacterization',
    updateImgDashboard: 'Magnifying glass focusing on a network of people icons, representing detailed analysis or review, linking to the site’s release notes',
    updateImgEHR: 'updateImgEHR',
    updateImgC3DC: 'A person using a laptop at a desk with the C3DC website displayed, focusing on access and visualization of data sets within the C3DC community.',
    updateImgHub: 'A hand holding digital human icons with abstract graphs and network data, symbolizing the CCDI Hub Site & Data Release, representing human resources and data analysis.',
}

export const srcList = {
    updateImgCCDC: updateImgCCDC,
    updateImgCCDC2: updateImgCCDC2,
    updateImgMolecular: updateImgMolecular,
    updateImgSymposium: updateImgSymposium,
    updateImgMTP: updateImgMTP,
    updateImgMTP2: updateImgMTP2,
    updateImgMolecularCharacterization: updateImgMolecularCharacterization,
    updateImgDashboard: updateImgDashboard,
    updateImgEHR: updateImgEHR,
    updateImgC3DC: updateImgC3DC,
    updateImgHub: updateImgHub,
}

export const newsList = [
    {
        id: 'ccdc_03312025',
        title: 'Latest CCDC release includes a new resource and updated data sets',
        date: 'March 31, 2025',
        slug: 'The Childhood Cancer Data Catalog (CCDC) has a new resource, updated data sets, and an improved user guide',
        highlight: `<p>The first CCDC release of 2025 introduces a new resource and accompanying data set from NCI National Clinical Trials Network (NCTN) Biobanks. Explore the NCTN Biobanks data set along with a new dbGaP data set: Genomic Profiling of Pediatric B-Cell Acute Lymphoblastic Leukemia. Additionally, this release includes updated counts to data sets in six resources across the catalog. The user guide has also undergone extensive updates, with improved content and images to more accurately describe the application and its resources.</p>`,
        type: 'CCDI Application Updates',
        img: 'updateImgCCDC',
        latestUpdate: true,
    },
    {
        id: 'hub_federation_02142025',
        title: 'Childhood Cancer Data Initiative (CCDI) Data Federation Resource releases API V1.1',
        date: 'February 14, 2025',
        slug: 'We are excited to announce the release of API V1.1 which enhances search capabilities across various participating resources.',
        highlight: `<p>CCDI API V1.1 introduces new metadata fields — Anatomic Site, Specimen Molecular Analyte, Library Source Material, Library Selection Method — to enhance data search capabilities. These new metadata fields are harmonized to CDEs registered in the Cancer Data Standards Registry and Repository whenever possible. Current members include the Kids First Data Resource Center, Pediatric Cancer Data Commons, St. Jude Cloud, and Treehouse Childhood Cancer Data Initiative. Data access processes follow the policies of each contributing resource.</p>`,
        type: 'CCDI Application Updates',
        img: 'updateImgHub',
    },
    {
        id: 'ccdc_02142025',
        title: 'Explore two new resources in the December CCDC release',
        date: 'February 14, 2025',
        slug: 'The Childhood Cancer Data Catalog (CCDC) has two new resources and eight new data sets, plus other features',
        highlight: `<p>The Specimen Resource Locator and Pediatric Malignancies: Inventory of DCEG Research resources were added to the CCDC, along with eight new data sets for existing resources. Some descriptions, titles, and counts were updated across the catalog and there are two new features—users can now download all data set digests from the menu, in addition to being able to link to available TARGET data sets in dbGaP.</p>`,
        type: 'CCDI Application Updates',
        img: 'updateImgCCDC',
    },
    {
        id: 'hub_12062024',
        title: 'Just released: CCDI Hub version 2.5.0',
        date: 'December 6, 2024',
        slug: 'New Data Sets, Enhanced Search, CGC Export, Publications Page, & MCI Update',
        highlight: `<p>The latest update to the CCDI Hub includes six new data sets. Enhancements to the Explore Dashboard improve filtered search functionality, notably with a text search capability for the Diagnosis and Diagnosis Anatomic Site facets. A new Export button allows direct export from the Cart to the Velsera Cancer Genomics Cloud platform for further analysis. This release also introduces a new CCDI-Supported Publications page. Updates to existing pages include enhancements to the About Page, updated Hub User Guide, NCCR Data Platform links from the homepage, and the updated MCI enrollments report for November.</p>`,
        fullText: '',
        type: 'News',
        img: 'updateImgHub',
    },
    {
        id: 'hub_10102024',
        title: 'Just released: CCDI Hub version 2.4.0',
        date: 'October 10, 2024',
        slug: 'Substantial data updates and new and enhanced features mark CCDI Hub release',
        highlight: `<p>The latest update to the CCDI Hub includes three new data sets and updates to 13 others. Several updates were also made to the Explore Dashboard to improve filtered search functionality, with further revisions made to the dashboard’s widgets, study table, and sample and diagnosis tables. Additionally, the site now has a new page about the CCDI Participant Index.</p>`,
        fullText: '',
        type: 'News',
        img: 'updateImgHub',
    },
    {
        id: 'cpi_10102024',
        title: 'Childhood Cancer Data Initiative (CCDI) Participant Index',
        date: 'October 10, 2024',
        slug: 'CPI API: Empowering Pediatric Cancer Research with Mapped Participant IDs',
        highlight: `<p>The Childhood Cancer Data Initiative (CCDI) announces the release of Version 1.0 of the Participant Index (CPI) API. The CPI maps participant IDs from different studies/research institutions, enabling researchers to explore complex questions, gain deeper insights into diseases, develop innovative therapies, and enhance existing treatments. With 32 domains and over 418,000 participant IDs, the CPI API is a significant step forward in pediatric cancer research. More information can be found at <a class="link" href="https://ccdi.cancer.gov/ccdi-participant-index" target="_blank" rel="noopener noreferrer">https://ccdi.cancer.gov/ccdi-participant-index</a>.</p>`,
        fullText: '',
        type: 'CCDI Application Updates',
        img: 'updateImgCCDC2',
    },
    { 
        id: 'ccdc_09252024',
        title: 'CCDC gets 5 new data sets and updates 8 resources',
        date: 'September 25, 2024',
        slug: 'Childhood Cancer Data Catalog (CCDC) continues to add data',
        highlight: `<p>Five new data sets are now available in the CCDC. Among them are the CCDI National Childhood Cancer Registry Data Platform data set and Correlative Studies for Protocol #14-C-0059: T Cells Expressing an Anti-GD2 Chimeric Antigen Receptor in Patients with GD2+ Solid Tumors, a Collaboration with CIMAC-CIDC. Eight existing resources were updated with new counts, clinical trial lists, and changes to repository links, resource URLs, and reference links. No new features were added in this release.</p>`,
        fullText: '',
        type: 'CCDI Application Updates',
        img: 'updateImgCCDC',
    },
    {
        id: 'hub_08292024',
        title: 'Updates and minor enhancements to the Hub made',
        date: 'August 29, 2024',
        slug: 'Release 2.3.2 includes a fix and some small updates',
        highlight: `<p>The CCDI Hub 2.3.2 release features a query fix to the CCDI Hub Explore Dashboard. This fix will ensure the file counts are correct and match the number of files in the Hub’s database. Other updates include August Molecular Characterization Initiative (MCI) enrollment numbers and enhancements to the flow diagram on the MCI page, and corrections and updates to a few CCDI Hub News topics.</p>`,
        fullText: '',
        type: 'News',
        img: 'updateImgDashboard',
    },
    {
        id: 'ccdc_08212024',
        title: 'Several updates included in August CCDC release',
        date: 'August 21, 2024',
        slug: 'Changes to the CCDC include updates to existing resources and the addition of new data sets',
        highlight: `<p>This Childhood Cancer Data Catalog (CCDC) release includes six new data sets: CCDI’s Single-Cell Atlas of NF1 Nerve Sheath Tumors and Identification and Targeting of Treatment Resistant Progenitor Populations in T-cell Acute Lymphoblastic Leukemia, The Cancer Imaging Archive’s MR Imaging of Pediatric Subjects with High-Grade Gliomas (DFCI-BCH-BWH-PEDs-HGG), and three sets from the Single-cell Pediatric Cancer Atlas. Additionally, several resources now have updated counts as well as references and resource-level properties. Changes were made to other resources and a critical software update was performed for the entire catalog.</p>`
                +'<p>Note: new data set count was originally reported incorrectly; count and labels of new data sets were updated on 10/10/24</p>',
        fullText: '',
        type: 'CCDI Application Updates',
        img: 'updateImgCCDC',
    },
    {
        id: 'federation_08072024',
        title: 'Childhood Cancer Data Initiative (CCDI) Data Federation Resource',
        date: 'August 7, 2024',
        slug: 'API that facilitates data search from various resources eliminating the need for data consolidation into a single centralized repository.',
        highlight: `<p>The API provides an open-access subset of metadata including data set location. Data files are accessible according to the policies at each organization. Where possible, metadata have been harmonized to Common Data Elements provided by the Cancer Data Standards Registry and Repository (<a class="link" href="https://cadsr.cancer.gov" target="_blank" rel="noopener noreferrer">https://cadsr.cancer.gov</a>). Current data federation members are the Kids First Data Resource Center, Pediatric Cancer Data Commons, St. Jude Cloud, and Treehouse Childhood Cancer Data Initiative.</p>`,
        fullText: '',
        type: 'CCDI Application Updates',
        img: 'updateImgCCDC2',
    },
    {
        id: 'hub_08072024',
        title: 'A new resource page and enhanced user support text',
        date: 'August 7, 2024',
        slug: 'Release adds CCDI data federation resource page and enhanced user support text',
        highlight: `<p>In this release, the CCDI Hub added two key pages of interest: a CCDI data federation resource page and a description of data usage policies and terms. Clarifying text was also added to the “Stats at a Glance” summary, Explore Dashboard, and Molecular Characterization Initiative (MCI) enrollment page. Other improvements include hyperlinked dbGaP accessions and fixed column sorting in the Explore Dashboard grids and improved mobile responsiveness of the MCI resource page.</p>`,
        fullText: '',
        type: 'News',
        img: 'updateImgDashboard',
    },
    {
        id: 'hub_06272024',
        title: 'Latest Hub release includes new studies and enhanced functionality',
        date: 'June 27, 2024',
        slug: 'CCDI Hub adds two new studies, updated data sets, and enhanced features in June release',
        highlight: `<p>The CCDI Hub updated seven data sets and added two new: Pediatric AYA Cancer Touchstone (<a class="link" href="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002431.v1.p1" target="_blank" rel="noopener noreferrer">phs002431.v1</a>) and Pediatric Tumor Profiling (<a class="link" href="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002677.v1.p1" target="_blank" rel="noopener noreferrer">phs002677.v1</a>) data sets. These encompass 1,600 participants and 2,700 samples, totaling 20,760 new files. The <a href="/MCI" target="_blank">MCI page</a> now features updated visualizations and a streamlined navigation pane. The Files tab on the <a href="/Explore" target="_blank">Explore Dashboard</a> now includes Library Selection, Source, and Strategy. <a href=${userGuidePDF} target="_blank"}>User Documentation</a> is available, providing instructions for accessing controlled data and navigating the Explore Dashboard.</p>`,
        fullText: '',
        type: 'News',
        img: 'updateImgHub',
    },
    {
        id: 'ccdc_06122024',
        title: 'Resource updates featured in this month’s CCDC release',
        date: 'June 12, 2024',
        slug: 'Six existing resources in the CCDC have been updated',
        highlight: '<p>The Childhood Cancer Data Catalog (CCDC) now includes 317 data sets from 60 resources. This release adds four new data sets to cBioPortal for Cancer Genomics, Childhood Cancer Data Initiative, and Gene Expression Omnibus. Also, data sets in the CancerModels.org and Patient-Derived Xenograft and Advanced In Vivo Models resources have updated counts, and the Childhood Cancer and Leukemia International Consortium data set is now part of the World Health Organization–International Agency for Research on Cancer resource.</p>',
        fullText: '',
        type: 'CCDI Application Updates',
        img: 'updateImgCCDC',
    },
    {
        id: 'ccdc_05172024',
        title: 'Two new resources and other updates featured in latest CCDC release',
        date: 'May 17, 2024',
        slug: 'Childhood Cancer Data Catalog (CCDC) adds two resources and 13 data sets',
        highlight: '<p>The CCDC now includes the South African National Cancer Registry (NCR) and the World Health Organization-International Agency for Research on Cancer (WHO-IARC) resources. The NCR has played a critical role in cancer prevention and control policy in South Africa and contains demographic, clinical, and reporting source data. The WHO-IARC resource includes epidemiological data. In addition to these resources, 13 new data sets were added, and several other updates were made.</p>',
        fullText: '',
        type: 'CCDI Application Updates',
        img: 'updateImgCCDC',
    },
    {
        id: 'c3dc_05032024',
        title: 'Significant updates made in latest C3DC release',
        date: 'May 3, 2024',
        slug: 'The new release represents the harmonization of all clinical data sets in the CCDI Data Ecosystem.',
        highlight: '<p>Building off its first release, the Childhood Cancer Clinical Data Commons (C3DC) now has nine additional CCDI data sets. These harmonized data sets represent all of the clinical data sets in the CCDI Data Ecosystem, providing a more comprehensive resource for childhood cancer research. The data sets include coverage of study, participant, diagnosis, sample, and survival data. The release also includes updated visuals and enhanced documentation.</p>',
        fullText: '',
        type: 'CCDI Application Updates',
        img: 'updateImgC3DC',
    },
    {
        id: 'ccdc_04102024',
        title: 'Explore new data sets, a resource, and other CCDC site updates this month',
        date: 'April 10, 2024',
        slug: 'Sixteen new data sets and a new registry added to the CCDC',
        highlight: '<p>The Genomics Evidence Neoplasia Information Exchange (GENIE) was added to the Childhood Cancer Data Catalog (CCDC) this month. This publicly accessible cancer registry includes real-world clinico-genomic data from 19 leading international cancer centers. Along with this new resource, the catalog also added 16 new data sets and a new <a href="https://datacatalog.ccdi.cancer.gov/contribute" target="_blank" rel="noopener noreferrer">Contribute to the CCDC</a> page that provides information about submitting data and getting your resource added to the CCDC.</p>',
        fullText: '',
        type: 'CCDI Application Updates',
        img: 'updateImgCCDC',
    },
    {
        id: 'hub2_03272024',
        title: 'Latest CCDI Hub release includes exciting new technical changes',
        date: 'March 27, 2024',
        slug: 'An updated data model, new visualizations, and additional updates come to the CCDI Hub',
        highlight: '<p>The CCDI Hub Explore Dashboard is using an updated model: CCDI Data Model version 1.7.2. This allowed for several updates to the dashboard, including the reconfiguration of diagnoses by classification and status. It also adds two new data visualizations to the Hub’s Molecular Characterization Initiative (MCI) page—a donut chart showing enrollment by diagnosis type, and a bubble chart map of the U.S. depicting the number of MCI participants by state. Also, many other improvements were made to enhance Hub and Explore Dashboard usability.</p>',
        fullText: '',
        type: 'News',
        img: 'updateImgDashboard',
    },
    {
        id: 'hub_03272024',
        title: 'CCDI Hub adds almost 30,000 new files in latest release',
        date: 'March 27, 2024',
        slug: 'New release includes four new data sets and updates to two existing data sets',
        highlight: '<p>The CCDI Hub has added four new data sets and updated two existing data sets (the CCDI Molecular Characterization Initiative and Pediatric Brain Tumor Atlas). In adding these, the Hub gains new data from over 1,600 participants and 3,100 samples, along with 30,000 new files.</p>',
        fullText: '',
        type: 'News',
        img: 'updateImgHub',
    },
    {
        id: 'ccdc_03132024',
        title: 'March CCDC release includes updates to five existing resources',
        date: 'March 13, 2024',
        slug: 'Latest CCDC release also adds 11 new data sets',
        highlight: '<p>The March Childhood Cancer Data Catalog (CCDC) release includes 11 new data sets in five existing resources, plus other data updates. Two of these additions were to the Childhood Cancer Data Initiative resource—a project data set, Genomic Analysis in Pediatric Malignancies, and an analytic tool set called Center for Computational Genomic Medicine Analytic Tools.</p>',
        fullText: '',
        type: 'CCDI Application Updates',
        img: 'updateImgCCDC2',
    },
    {
        id: 'c3dc_03082024',
        title: 'CCDI launches new open-access web application',
        date: 'March 08, 2024',
        slug: 'Access the Childhood Cancer Clinical Data Commons (C3DC) today',
        highlight: '<p>Find harmonized childhood cancer demographics and phenotypic clinical data in this new CCDI resource. <a href="https://clinicalcommons.ccdi.cancer.gov/" target="_blank" rel="noopener noreferrer">Use the C3DC</a> to search for participant-level data, create synthetic cohorts, and export data from the Molecular Characterization Initiative and TARGET Neuroblastoma. As the C3DC matures, new childhood cancer data and more functionalities will be added.</p>',
        fullText: '',
        type: 'News',
        img: 'updateImgC3DC',
    },
    {
        id: 'ccdc_02142024',
        title: 'Childhood Cancer Data Catalog (CCDC) Release Provides More Resources for Users',
        date: 'February 14, 2024',
        slug: 'Find biospecimens or explore a new cohort study database in this recent CCDC update',
        highlight: '<p>Search for and request available biospecimens collected from cancer treatment trials in NCI’s National Clinical Trials Network (NCTN) with the NCTN Navigator, one of two resources added to the CCDC. The second, the Cancer Epidemiology Descriptive Cohort Database, is a searchable database with general, biospecimen, and other descriptive cohort study information. Along with these resource additions, nine existing resources were updated, including eight new data sets.</p>',
        fullText: '',
        type: 'CCDI Application Updates',
        img: 'updateImgCCDC',
    },
    {
        id: 'ccdc_01172024',
        title: 'Two new resources added to the Childhood Cancer Data Catalog (CCDC)',
        date: 'January 17, 2024',
        slug: 'This CCDC release includes a tool to explore genomics data and a platform to help accelerate pediatric drug development.',
        highlight: '<p>Now part of the CCDC: the cBioPortal for Cancer Genomics, a tool for interactive exploration of genomics data sets that aims to lower barriers to accessing complex genomic data. This release also includes the Innovative Therapies for Children with Cancer Paediatric Preclinical Proof-of-Concept Platform (ITCC-P4). The ITCC-P4 platform, developed through an academic-industry partnership, aims to establish new patient-derived preclinical models of high-risk pediatric tumors and help speed up drug development for childhood cancers.</p>',
        fullText: '',
        type: 'CCDI Application Updates',
        img: 'updateImgCCDC2',
    },
    {
        id: 'ehr_01112024',
        title: 'Respond to our latest RFI on automated EHR data entry and extraction capabilities',
        date: 'January 11, 2024',
        slug: 'Attention research, informatics, health care communities, vendors, and developers! The CCDI wants to hear from you.',
        highlight: '<p>Do you have capabilities in automated electronic health record (EHR) data entry and extraction? If so, please respond to our latest Request for Information and share your tools, clinical workflows, and approaches for entering and extracting EHR data in a structured format. Your input could help NCI plan a workshop on this topic. '
                  +'<a class="link" href="https://grants.nih.gov/grants/guide/notice-files/NOT-CA-24-021.html" target="_blank" rel="noopener noreferrer">Submit responses by February 29, 2024. https://grants.nih.gov/grants/guide/notice-files/NOT-CA-24-021.html</a></p>',
        fullText: '',
        type: 'News',
        img: 'updateImgEHR',
    },
    {
        id: 'hub_12182023',
        title: 'Molecular Characterization Initiative (MCI) Page Added to CCDI Hub',
        date: 'December 18, 2023',
        slug: 'A new MCI page is among the latest updates to the CCDI Hub website.',
        highlight: 'The CCDI Hub’s new MCI page includes frequently asked questions about MCI, a dataflow diagram of the study, searchable tables, and contact information for results and data. In addition to the MCI page, updates have been made to the “My Files” shopping cart manifest, making it directly importable in the Cancer Genomics Cloud. Other enhancements to the site and Explore Dashboard further improve the user experience.',
        fullText: '',
        type: 'News',
        img: 'updateImgDashboard',
    },
    {
        id: 'ccdc_12132023',
        title: 'New to the Childhood Cancer Data Catalog (CCDC): Osteosarcoma Explorer',
        date: 'December 13, 2023',
        slug: 'The Osteosarcoma Explorer analytical tool is part of the latest CCDC release, which also includes updates to six existing resources.',
        highlight: 'The December Childhood Cancer Data Catalog (CCDC) release includes a new analytical tool, updates to six existing resources, and numerous other data updates. The new tool, Osteosarcoma Explorer, is a web portal that incorporates an array of clinical, genomic, proteomic, and pathological imaging data for use with patient query, online analysis, and digital pathology visualization tools.',
        fullText: '',
        type: 'CCDI Application Updates',
        img: 'updateImgCCDC',
    },
    {
        id: 'hub_10272023',
        title: 'CCDI Hub Explore Dashboard Release',
        date: 'October 27, 2023',
        slug: 'Navigate through detailed pediatric cancer data, create synthetic cohorts, and enable cross-study discoveries with the Hub’s new Explore Dashboard.',
        highlight: 'The CCDI Hub’s Explore Dashboard is a new tool for exploring individual-level participant, sample, and file information for CCDI-managed datasets.  This new tool enables users to explore data in novel ways and establish connections to create synthetic cohorts or cross-study discoveries.  The initial release includes eight studies and information on over 4,100 participants, 10,350 samples, and 132,000 files.',
        fullText: '',
        type: 'News',
        img: 'updateImgDashboard',
    },
    {
        id: 'ccdc_10192023',
        title: 'New resource added to Childhood Cancer Data Catalog (CCDC)',
        date: 'October 19, 2023',
        slug: 'The latest CCDC release includes the addition of the Imaging Data Commons, along with updates to several existing resources.',
        highlight: 'The Childhood Cancer Data Catalog now includes the Imaging Data Commons (IDC), a cloud-based repository of publicly available cancer imaging data, which also adds the Rhabdomyosarcoma Mutation Prediction data set. Updates to seven existing CCDC resources have also been performed, adding four data sets. Additionally, the Search Catalog export file has been updated to be more accessible and useful.',
        fullText: '',
        type: 'CCDI Application Updates',
        img: 'updateImgCCDC2',
    },
    {
        id: 'ccdc_09202023',
        title: 'CCDC release includes new tool to browse The Cancer Imaging Archive resource',
        date: 'September 20, 2023',
        slug: 'The Childhood Cancer Data Catalog adds the TCIABrowser and two new data sets, along with several resource updates.',
        highlight: 'The catalog has a new tool called TCIABrowser, which connects users to The Cancer Imaging Archive (TCIA) to browse different collections, patient subjects, studies, and series. Users can also download the images and visualize them in a 3D slicer. Two new database of Genotypes and Phenotypes data sets have also been added, and five other resources have been updated with new data set information.',
        fullText: '',
        type: 'CCDI Application Updates',
        img: 'updateImgCCDC',
    },
    {
        id: 'ccdc_08172023',
        title: 'August Childhood Cancer Data Catalog release goes live',
        date: 'August 17, 2023',
        slug: 'The catalog now includes four new resources, ten new data sets, and a new resource type.',
        highlight: '<p>Users of the Childhood Cancer Data Catalog can now filter by the resource type, “Biorepository.” As part of this resource type, four new resources have been added, including Norwegian Childhood Cancer Biobank, Swedish Childhood Tumor Biobank, The Biopathology Center, and VIVO Biobank. There are also ten additional data sets available and several updates to existing resources.</p>',
        fullText: '',
        type: 'CCDI Application Updates',
        img: 'updateImgCCDC2',
    },
    {
        id: 'mtp_07212023',
        title: 'Molecular Targets Platform (MTP) release allows interactive data visualizations',
        date: 'JULY 21, 2023',
        slug: 'New interactive plot displays and updates to the About page are part of the MTP 2.1 release.',
        highlight: '<p>The Molecular Targets Platform (MTP) is now live with interactive visualizations of data via the <a href="https://moleculartargets.ccdi.cancer.gov/pediatric-cancer-data-navigation" target="_blank" rel="noopener noreferrer">Pediatric Data Navigation page</a>. There is also improved plot generation for the OpenPedCan Gene Expression and Differential Expression widgets, along with updated descriptions in the “Pediatric Cancer Data Visualizations” section on the <a href="https://moleculartargets.ccdi.cancer.gov/about" target="_blank" rel="noopener noreferrer">About page</a> regarding the chart types added in the previous MTP release.</p>',
        fullText: '',
        type: 'CCDI Application Updates',
        img: 'updateImgMTP2',
    },
    {
        id: 'molecularcharacterization_07202023',
        title: 'Molecular Characterization and Clinical Data from Multiple Organizations Released',
        date: 'JULY 20, 2023',
        slug: 'Pediatric brain tumor data from several organizations are available pre-publication and without embargo. ',
        highlight: '<p>CCDI has facilitated the release of data from children and young adults diagnosed with pediatric brain tumors and other solid and hematologic malignancies. The data was collected from the Children’s Brain Tumor Network, the Pacific Pediatric Neuro-Oncology Consortium, and the Children’s Hospital of Philadelphia Division for Genomic Diagnostics. They include tumor and germline WGS, RNA-Seq, Clinical Panel Sequencing, and other omics and molecular data. <a href="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002517.v1.p1" rel="noreferrer noopener" target="_blank">Access these data through dbGaP</a>.</p>',
        fullText: '',
        type: 'News',
        img: 'updateImgMolecularCharacterization',
    },
    {
        id: 'ccdc_07192023',
        title: 'Childhood Cancer Data Catalog (CCDC) updates include a guide for accessing CCDI data',
        date: 'JULY 19, 2023',
        slug: 'The latest CCDC update also provides updated data sets, a new registry, and new analytical tools.',
        highlight: '<p>The Childhood Cancer Data Catalog now has three new resources. One is the Childhood Cancer Registry, which banks and distributes cell lines and patient-derived xenografts. The other two are analytical tools—The Cancer Research Institute iAtlas, which includes tools for studying tumor and immune microenvironment interactions, and The Cancer Proteome Atlas, through which users can access proteomics data. Importantly, there is also a new guide on how to access, query, and process CCDI data stored at NCI’s Cancer Data Service.</p>',
        fullText: '',
        type: 'CCDI Application Updates',
        img: 'updateImgCCDC2',
    },
    {
        id: 'ccdc_06142023',
        title: 'Childhood Cancer Data Catalog updates with new resources and datasets',
        date: 'JUNE 14, 2023',
        slug: 'Cancermodels.org has over 7,000 patient-derived cancer models available to the community.',
        highlight: '<p>The Cancermodels.org resource has been added to the CCDI Childhood Cancer Data Catalog. This is a free, open-source platform that collects clinical, genomic, and functional data from patient-derived xenografts, organoids, and cell lines. The catalog update also includes 13 new datasets, eight of which are from the Single-cell Pediatric Cancer Atlas Portal (ScPCA).</p>',
        fullText: '',
        type: 'CCDI Application Updates',
        img: 'updateImgCCDC',
    },
    {
        id: 'mtp_06022023',
        title: 'Molecular Targets Platform releases data updates and enhanced features',
        date: 'JUNE 2, 2023',
        slug: 'The latest update to the Molecular Targets Platform includes new data and enhanced features. Learn about the recent release.',
        highlight: '<p>The <a href="https://moleculartargets.ccdi.cancer.gov/" target="_blank" rel="noopener noreferrer">Molecular Targets Platform</a> (MTP) expanded with new data and enhanced features. Researchers will find new and updated data from the Pediatric Brain Tumor Atlas and TARGET cohorts, including sequencing and methylation data. Improved features include enhanced gene expression graphs for childhood cancer data and a new widget to capture methylation data. Finally, the latest coding updates ensure that the data can be easily viewed and queried. <a href="https://moleculartargets.ccdi.cancer.gov/about" target="_blank" rel="noopener noreferrer">Learn more about how the MTP is helping advance childhood cancer research</a>.</p>',
        fullText: '',
        type: 'CCDI Application Updates',
        img: 'updateImgMTP',
    },
    {
        id: 'ccdc_05172023',
        title: 'Childhood Cancer Data Catalog update includes new resource',
        date: 'MAY 17, 2023',
        slug: 'The Cancer Dependency Map provides open access to tools that can aid drug target and biomarker discovery.',
        highlight: '<p>The CCDI Childhood Cancer Data Catalog (CCDC) now includes the Cancer Dependency Map, which provides open access to analytical and visualization tools related to key cancer dependencies. These tools can be used in the discovery of drug targets and biomarkers. In addition to this, six existing CCDC resources have been updated.</p><p><a href="https://datacatalog.ccdi.cancer.gov/" rel="noreferrer noopener" target="_blank">Access the catalog today</a>.</p>',
        fullText: '<p>The National Cancer Institute is pleased to announce an update to the Childhood Cancer Data Catalog website: <a href="https://datacatalog.ccdi.cancer.gov/" rel="noreferrer noopener" target="_blank">https://datacatalog.ccdi.cancer.gov/</a>.&nbsp;&nbsp;</p>'
        +'<p>&nbsp;</p>'
        +'<p>This update includes the addition of the Xena Browser as a new analytic tool resource.&nbsp; Xena Browser is an online exploration tool that allows users to investigate functional genomic data sets for correlations between genomic and/or phenotypic variables.&nbsp; Additionally, 7 new datasets have been incorporated into 8 existing resources, with 5 of these coming from The Cancer Imaging Archive (TCIA).&nbsp;</p>'
        +'<p>&nbsp;</p>'
        +'<p>Explore the data and site updates in more detail below.&nbsp;</p>'
        +'<p>&nbsp;&nbsp;</p>'
        +'<h1>Data Updates&nbsp;</h1>'
        +'<h2>New Participating Resource and Dataset&nbsp;</h2>'
        +'<p>The CCDC has added 1 new analytic tool resource.&nbsp;</p>'
        +'<ul><li><p>Xena Browser&nbsp;</p></li></ul>'
        +'<h2>Existing Participating Resources and Datasets&nbsp;</h2>'
        +'<p>8 existing resources have been updated with additional data and information, including 7 new datasets.&nbsp;&nbsp;</p>'
        +'<ul><li><p>Central Brain Tumor Registry of the United States (CBTRUS)&nbsp;</p><ul><li>New dataset - CBTRUS Fact Sheet 2022&nbsp;</li></ul></li></ul>'
        +'<ul><li><p>Clinical Interpretation of Variants in Cancer (CIViC)&nbsp;</p><ul><li>Added case disease diagnosis information&nbsp;</li></ul></li></ul>'
        +'<ul><li><p>The database of Genotypes and Phenotypes (dbGaP)&nbsp;</p><ul><li>New dataset - NSD2 E1099K Drives Relapse in Pediatric Acute Lymphoblastic Leukemia by Disrupting 3D Chromatin&nbsp;&nbsp;</li></ul></li></ul>'
        +'<ul><li><p>The Jackson Laboratory PDX Models&nbsp;&nbsp;</p><ul><li>Updated case counts&nbsp;&nbsp;</li></ul></li></ul>'
        +'<ul><li><p>Kids First Data Resource&nbsp;</p><ul><li>Updated case counts and case disease diagnosis information for Pediatric Brain Tumor Atlas&rsquo;s Children&#39;s Brain Tumor Network (CBTN) and Pacific Pediatric Neuro-Oncology Consortium (PNOC) datasets&nbsp;</li></ul></li></ul>'
        +'<ul><li><p>OncoKB&nbsp;</p><ul><li>Added case disease diagnosis information&nbsp;</li></ul></li></ul>'
        +'<ul><li><p>St. Jude Cloud&nbsp;</p><ul><li><p>New dataset - St. Jude LIFE Hematopoiesis&nbsp;</p></li><li><p>Removed Sickle Cell Genome Project&nbsp;&nbsp;</p></li><li><p>Updated case count, case disease diagnosis, and sample count information across multiple datasets&nbsp;</p></li></ul></li></ul>'
        +'<ul><li><p>The Cancer Imaging Archive&nbsp;</p><ul><li><p>New dataset - Annotations for Combination Chemotherapy and Radiation Therapy in Treating Young Patients With Newly Diagnosed Hodgkin Lymphoma (AHOD0831-Tumor-Annotations) - TCIA DOIs - Cancer Imaging Archive Wiki&nbsp;</p></li><li><p>New dataset - Annotations for Combination Chemotherapy and Surgery in Treating Young Patients With Wilms Tumor (AREN0534-Tumor-Annotations) - TCIA DOIs - Cancer Imaging Archive Wiki&nbsp;</p></li><li><p>New dataset - Annotations for Vincristine, Dactinomycin, and Doxorubicin With or Without Radiation Therapy or Observation Only in Treating Younger Patients Who Are Undergoing Surgery for Newly Diagnosed Stage I&nbsp;</p></li><li><p>New dataset - Annotations for Combination Chemotherapy With or Without Radiation Therapy in Treating Young Patients With Newly Diagnosed Stage III or Stage IV Wilms Tumor (AREN0533-Tumor-Annotations) - TCIA DOIs&nbsp;</p></li><li><p>New dataset - Radiation Therapy, Amifostine, and Chemotherapy in Treating Young Patients With Newly Diagnosed Nasopharyngeal Cancer (ARAR0331) - The Cancer Imaging Archive (TCIA) Public Access - Cancer Imaging A&nbsp;</p></li><li><p>Added Clinical Trial information to multiple datasets&nbsp;&nbsp;</p></li></ul></li></ul>'
        +'<p>&nbsp;&nbsp;</p>'
        +'<h1>General Site Updates&nbsp;</h1>'
        +'<ul><li><p>The Glossary has been updated with new acronyms and abbreviations.&nbsp;</p></li><li><p>The User Guide is updated to reflect new and updated resource information.&nbsp;</p></li></ul>'
        +'<p>&nbsp;</p>'
        +'<h2>Search Catalog&nbsp;</h2>'
        +'<ul><li><p>Search Catalog exports no longer include errant database characters&nbsp;</p></li></ul>'
        +'<h2>Participating Resources&nbsp;</h2>'
        +'<ul><li><p>Selecting an email point of contact for resource with multiple identified contacts will now only mail to the selected contact.&nbsp;</p></li><li><p>Selecting a point of contact that links to a website will now open in a new tab and not in an email.&nbsp;&nbsp;&nbsp;</p></li></ul>'
        ,
        type: 'CCDI Application Updates',
        img: 'updateImgCCDC',
    },
    {
        id: 'ccdc_04192023',
        title: 'Childhood Cancer Data Catalog April Update',
        date: 'APRIL 19, 2023',
        slug: 'The update includes one new resource, eight new datasets, and many other changes.',
        highlight: '<p>The <a href="https://datacatalog.ccdi.cancer.gov/" target="_blank" rel="noopener noreferrer">Childhood Cancer Data Catalog</a> is pleased to announce the addition of the Xena Browser, a powerful online exploration tool that allows users to investigate functional genomic data sets for correlations between genomic and/or phenotypic variables. Also, seven new datasets have been incorporated into eight existing resources.</p><p><a href="https://datacatalog.ccdi.cancer.gov/" rel="noreferrer noopener" target="_blank">Explore the Catalog</a> to check out all the changes.</p>',
        fullText: '',
        type: 'CCDI Application Updates',
        img: 'updateImgCCDC',
    },
    {
        id: 'molecular_04052023',
        title: 'Molecular Characterization Initiative releases initial data',
        date: 'APRIL 5, 2023',
        slug: 'Genomics and clinical data for MCI participants is housed in NCI’s Cancer Data Service and accessible through CGC.',
        highlight: '<p>De-identified molecular characterization data (T/N WES, methylation, and Archer fusion), clinical reports, and demographic and phenotypic data from <a href="https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative/data-ecosystem/molecular-characterization?cid=eb_govdel" rel="noreferrer noopener" target="_blank">CCDI Molecular Characterization Initiative</a> participants are released each month under accession number <a href="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002790.v2.p1" rel="noreferrer noopener" target="_blank">phs00290.v2.p1</a>. The data are accessible through Cancer Genomics Cloud, a secure workspace that allow users to upload their own data for aggregated analysis. Access can be requested through dbGaP’s <a href="https://www.youtube.com/watch?v=m0xp_cCO7kA" rel="noreferrer noopener" target="_blank">controlled-access process</a>. To date, there are data associated with 1,145 participants.</p>',
        fullText: '<p>The <a href="https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative/data-ecosystem/molecular-characterization?cid=eb_govdel" rel="noreferrer noopener" target="_blank">CCDI Molecular Characterization Initiative</a> (MCI) achieved a significant milestone in March, enrolling over 1,000 newly diagnosed children, adolescent, and young adults (AYAs) with certain types of cancer. This milestone means that over 1,000 eligible patients now have access to more precise diagnoses, which can aid healthcare providers in planning their treatment.&nbsp;</p>'
        +'<p>&nbsp;</p>'
        +'<p>Enrollment continues, free of charge, for children and AYAs newly diagnosed with central nervous system tumors, soft tissue sarcomas, and rare tumors who are receiving care from a Children&rsquo;s Oncology Group&ndash;affiliated hospital.&nbsp;</p>'
        +'<p>&nbsp;</p>'
        +'<p>MCI data&mdash;excluding personal details that identify participants&mdash;will continue to be released monthly, giving researchers an opportunity to '
        +'learn more about what drives various cancers, develop better clinical trials, and develop more effective treatments for childhood cancer.&nbsp;</p> <p>To join at this time, a child or AYA must:&nbsp;</p><ul><li><p>be newly diagnosed (have not had any treatments for their cancer yet)&nbsp;</p></li><li><p>be 25 years old or younger&nbsp;</p></li><li><p>be diagnosed with a central nervous system tumor (tumors of the brain and spine), soft tissue sarcoma, or rare tumor* (childhood cancers with a low number of patients, which have been hard to study and understand)&nbsp;</p></li><li><p>get cancer care from a hospital affiliated with the Children&rsquo;s Oncology Group&nbsp;</p></li></ul>'
        +'<p>&nbsp;</p>'
        +'<p>If a child or AYA meets the above criteria, they can get more information on how to participate by talking with their Children &#39;s Oncology Group&ndash;affiliated doctor. &nbsp</p>',
        type: 'CCDI Application Updates',
        img: 'updateImgMolecular',
    },
    {
        id: 'symposium_03242023',
        title: 'CCDI Symposium features Data Ecosystem progress',
        date: 'MARCH 24, 2023',
        slug: 'More than 800 people came together to discuss CCDI progress, including in the Data Ecosystem.',
        highlight: '<p>NCI hosted the CCDI Symposium on March 24, 2023, which brought together hundreds of members of the childhood cancer community. The event featured presentations on CCDI Data Ecosystem progress by Drs. Anthony Kerlavage and Subhashini Jagu.</p><p><a href="https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative/events-webinars/symposium-0" target="_blank" rel="noopener noreferrer">View the event presentation</a> and <a href="https://videocast.nih.gov/watch=49171" target="_blank" rel="noopener noreferrer">watch the recording</a>.</p>',
        fullText: '<p>On March 24, 2023, NCI hosted the <a href="https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative/events-webinars/past-symposiums" rel="noreferrer noopener" target="_blank">Childhood Cancer Data Initiative Annual Symposium</a>. Researchers, clinicians, survivors, and families from the community gathered to discuss how enhanced data connection and sharing can address current issues and possibilities in childhood cancer research. Dialogue between speakers and attendees, both virtual and in-person, celebrated CCDI&#39;s accomplishments to date and identified challenges and priorities that lie ahead.  Highlights included discussion of linking patients to disparate data sets, using tumor genomic data to create precision oncology clinical trials, extracting data from electronic health records, and other topics important for the pediatrics cancer community.&nbsp;</p>'
        +'<p>&nbsp;</p>'
        +'<p>Following the symposium, six breakout sessions were held to continue the symposium&rsquo;s discussion:&nbsp;</p><ol start="1"><li><p>Molecular Characterization Initiative and the potential for future cohort studies&nbsp;</p></li></ol><ol start="2"><li><p>Patient and family perspectives on computable consent and CCDI Participant Index&nbsp;</p></li></ol><ol start="3"><li><p>Electronic health record data extraction: current status and continuing challenges&nbsp;</p></li></ol><ol start="4"><li><p>External controls for pediatric cancer clinical trials&nbsp;</p></li></ol><ol start="5"><li><p>Collaborations and transformative research opportunities using data available through the CCDI ecosystem&nbsp;</p></li></ol><ol start="6"><li><p>Observational studies and novel interventional approaches for rare pediatric cancers&nbsp;</p></li></ol>'
        +'<p>&nbsp;</p>'
        +'<p><a href="https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative/events-webinars/symposium-0" rel="noreferrer noopener" target="_blank">View the event presentation</a> and <a href="https://videocast.nih.gov/watch=49171" rel="noreferrer noopener" target="_blank">watch the recording</a>.&nbsp;</p>',
        type: 'News',
        img: 'updateImgSymposium',
    },
]

export const releaseNotesList = [
    {
        id: 'hub_release_03312025',
        title: 'CCDI Hub March 2025 Quarterly Release',
        version: 'v2.6.0',
        date: 'March 31, 2025',
        slug: '3 new TARGET studies, cohort selector, CPI mappings, and more',
        fullText: '<p>The 2.6.0 quarterly release (March 2025) of the CCDI Hub features a modified data model, new data, and new features for browsing and selecting cohorts. Three new data sets have been added from TARGET, Acute Lymphoblastic Leukemia (ALL) Pilot Phase 1 (PHS000463), Acute Lymphoblastic Leukemia (ALL) Expansion Phase 2 (PHS000464), and Acute Myeloid Leukemia (AML) (PHS000465), and a field has been added to capture study status. Explore Dashboard facet updates include a new facet for the study status property, propagation of facet text search to Sample Anatomic Site, and an increase of the participant set upload limit to allow for upload of 5,000 Participant IDs. Numerous updates have been made to the Explore Dashboard Participants table, including new fields, customizable columns, a feature for creating cohorts, and mapping of associated information from the CCDI Participant Index (CPI). The Molecular Characterization Initiative (MCI) page has been updated with February 2025 enrollment summaries and a new link to a COG transformation script in a GitHub repository. General updates include new links from the Home page and Resources menu, a dedicated Release Notes page, and more. </p><p>Additional details are listed below:</p> <h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Data Updates</span></h1> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Data Model Updates</span></h2> <ul style="margin:0in 0in 8pt;"><li>Added more properties to Treatment node</li>'
                 +'<liAdded slim_url property for IDC imaging data</li><li>Added study status</li><li>Renamed "COG Clinical Report" to "COG Clinical Data"</li><li>Updated synonym properties to include CPI mapping data</li></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Added Data Sets</span></h2> <ul style="margin:0in 0in 8pt;"><li>TARGET: Acute Lymphoblastic Leukemia (ALL) Pilot Phase 1 (PHS000463)</li><li>TARGET: Acute Lymphoblastic Leukemia (ALL) Expansion Phase 2 (PHS000464)</li><li>TARGET: Acute Myeloid Leukemia (AML) (PHS000465)</li></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Removed Data Sets</span></h2> <ul style="margin:0in 0in 8pt;"><li>Feasibility and Clinical Utility of Whole Genome Profiling in Pediatric and Young Adult Cancers (PHS002620)</li><li>Clonal evolution during metastatic spread in high-risk neuroblastoma (PHS003111)</li></ul> <h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Site Updates</span></h1> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">General Site</span></h2> <ul style="margin:0in 0in 8pt;"> <li>Added tab under News page for release note notifications</li> <li>Added ecDNA resource block on Home page and menu link from Resources menu</li> <li>Added dedicated page to display full release notes</li> <li>Made persistent link to user guide from About menu</li> <li>Updated user guide</li></ul>'
                 +'<h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Molecular Characterization Initiative (MCI) page</span></h2> <ul style="margin:0in 0in 8pt;"> <li>Added link to COG transformation script GitHub repository</li> <li>Increased text thickness to improve readability</li> <li>Fixed bug resulting in unintended outlines when interacting with donut chart</li> <li>Removed alt text unintentionally appearing in main page text under image</li> <li>Updated enrollment counts as of February 2025</li></ul> <h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Explore Dashboard</span></h1> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Facet updates</span></h2> <ul style="margin:0in 0in 8pt;"><li>Added facet for study status</li> <li>Added text search option to sample anatomic site facet</li> <li>Increased participant set upload limit to 5,000</li></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Tables</span></h2> <ul style="margin:0in 0in 8pt;"><li>Added cohort selector feature to Participants tab</li> <li>Added column to display study status</li> <li>Added commas to all numbers larger than 1,000 in table headers and pagination</li> <li>Added fields from Treatment, Treatment Response, and Survival nodes to Participants tab</li> <li>Added indicator, hover dialog, and popup table summary for participants with additional information mapped in the Cancer Participant Index (CPI)</li> <li>Changed column label "Sex" to "Sex at Birth" to match model</li> <li>Exposed properties under generic_file node</li> <li>Made visible columns customizable by checkbox selection</li> <li>Removed separate Diagnosis tab and moved relevant fields to Participants and Samples tabs</li></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Cart</span></h2> <ul style="margin:0in 0in 8pt;"><li>Added commas to all numbers larger than 1,000 in table headers and pagination and in cart icon</li></ul>',
        type: 'Release Notes',
        img: 'updateImgHub',
        contentType: 'Clinical,Genomics/Omics',
        latestUpdate: true,
    },
    {
        id: 'hub_release_02122025',
        title: 'CCDI Hub Minor Release 2.5.1',
        version: 'v2.5.1',
        date: 'February 12, 2025',
        slug: 'Improved layout, MCI Data Update, and Multiple Bug Fixes',
        fullText: '<p>CCDI Hub minor release 2.5.1 features numerous enhancements and fixes, plus the removal of file access to two recently redacted studies, Feasibility and Clinical Utility of Whole Genome Profiling in Pediatric and Young Adult Cancers (PHS002620) and Clonal evolution during metastatic spread in high-risk neuroblastoma (PHS003111). In the Explore Dashboard, the layout of the recently added facet text search feature has been updated to improve usability on the diagnosis and diagnosis anatomic site facets, and the “Access” column in the Files tab has been renamed “Manifest.” The top menu, available from all pages, was reorganized to merge two submenus. Recent news highlights for the Childhood Cancer Data Catalog and Data Federation, and a new publication record has been added to the Publications page. MCI page enrollment counts, supporting diagrams, and description have been updated. Bug fixes include restoring a broken link to an external resource on the Molecular Characterization Initiative (MCI) page, correcting an inconsistent experience in tablet mode, correcting a typo in a menu resource item, increasing the number of participant ID records that can be searched.</p><p>Additional details are listed below:</p>'
                +'<h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Data Updates</span></h1>'
                +'<h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Updated  Data Sets</span></h2>'
                +'<ul style="margin:0in 0in 8pt;"><li>Feasibility and Clinical Utility of Whole Genome Profiling in Pediatric and Young Adult Cancers (PHS002620)</li><li>Clonal evolution during metastatic spread in high-risk neuroblastoma (PHS003111)</li></ul>'
                +'<h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Site Updates</span></h1>'
                +'<h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">General Site</span></h2>'
                +'<ul style="margin:0in 0in 8pt;">'
                +'<li>Updated casing of NCCR Data resource link from menu</li>'
                +'<li>Merged Applications and Other Resources menu into single Resources menu</li>'
                +'<li>Added news card for Childhood Cancer Data Catalog December 2024 release</li>'
                +'<li>Added news card for CCDI Data Federation Resource API updated</li>'
                +'<li>Added new publication to Publications page</li>'
                +'<li>Updated layout of Publications page to include PubMed ID and Journal Title</li>'
                +'<li>Updated MCI Enrollments by Diagnosis table and Enrollment Counts by State chart</li>'
                +'<li>Updated MCI page description of how to access data</li>'
                +'<li>Restored obsolete link out from MCI page</li>'
                +'<li>Updated layout of Home page for mobile responsiveness</li>'
                +'<li>Updated User Guide</li></ul>'
                +'<h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Explore Dashboard</span></h1>'
                +'<h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Facet updates</span></h2>'
                +'<ul style="margin:0in 0in 8pt;"><li>Updated button layout for text search option for Diagnosis and Diagnosis Anatomic Site subfacets</li><li>Increased number of returnable records in Participant ID facet search</li></ul>'
                +'<h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Tables</span></h2>'
                +'<ul style="margin:0in 0in 8pt;"><li>Renamed Access column to Manifest in Studies table</li></ul>',
        type: 'Release Notes',
        img: 'updateImgHub',
        contentType: '',
        latestUpdate: true,
    },
    {
        id: 'hub_release_12182024',
        title: 'CCDI Hub Release (2.5.0)',
        version: 'v2.5.0',
        date: 'December 18, 2024',
        fullText: '<p>The 2.5.0 CCDI Hub release includes new data, enhancements to the Explore Dashboard, and new features in both the Explore Dashboard and My Files Cart. Multiple studies from TARGET are new to the Hub in this release. Explore Dashboard functionality has been improved with the addition of a text search capability for diagnosis and diagnosis anatomic site facets; new facets for treatment, treatment response, and survival, as well as new subfacets for data category; and reorganization of all facets for better usability. The My Files Cart now includes an option for direct export of a manifest to the Velsera Cancer Genomics Cloud for further analysis. Additional changes include a new CCDI-supported Publications page and updates to the About Page, Hub User Guide, Home page resources, and MCI enrollment.</p><p>Additional details are listed below:</p> <h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Data Updates</span></h1> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">New Data Sets</span></h2> <ul style="margin:0in 0in 8pt;"><li>TARGET: Cancer Model Systems (MDLS): Cell Lines and Xenografts (including PPTP) (PHS000469)</li><li>TARGET: Kidney, Clear Cell Sarcoma of the Kidney (PHS000466) </li>'
                 +'<li>TARGET: Kidney, Rhabdoid Tumor (PHS000470)</li><li>TARGET: Kidney, Wilms Tumor (PHS000471) </li><li>TARGET: Neuroblastoma (PHS000467)</li><li>TARGET: Osteosarcoma (PHS000468)</li></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Updated Data Sets</span></h2> <ul style="margin:0in 0in 8pt;"><li>Comprehensive Genomic Sequencing of Pediatric Cancer Cases (PHS002529) </li><li>Molecular Characterization across Pediatric Brain Tumors and Other Solid and Hematologic Malignancies for Research, Diagnostic, and Precision Medicine (PHS002517)</li><li>Molecular Characterization Initiative (PHS002790)</li></ul> <h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Site Updates</span></h1> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">General Site</span></h2> <ul style="margin:0in 0in 8pt;"> <li>Added NCCR Data Platform resource block, link on Home page, and link from menu</li> <li>Updated resource links on Home page to be in alphabetical order</li> <li>Updated Applications menu items to be in alphabetical order</li> <li>Updated Enrollments by Diagnosis table and Enrollment Counts by State chart </li> <li>Updated User Guide and added new link to About menu </li> <li>Added CCDI-Supported Publications page to About menu</li></ul> <h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Explore Dashboard</span></h1> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Facet updates</span></h2>'
                 +'<ul style="margin:0in 0in 8pt;"><li>Organized facet categories to match C3DC order, where possible </li> <li>Added text search option for Diagnosis and Diagnosis Anatomic Site subfacets </li> <li>Added facets for Treatment, Treatment Response, and Survival </li> <li>Added File Mapping subfacet for Data Category </li></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Widgets</span></h2> <ul style="margin:0in 0in 8pt;"><li>Improved x-axis label on Age at Diagnosis to have age range visible for all ranges </li></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Tables</span></h2> <ul style="margin:0in 0in 8pt;"><li>Removed Last Known Survival Status from Diagnosis table to match model update (this property is now in Survival node)</li> <li>Added File Access and File Mapping columns to Files table</li> </ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">My Files Cart</span></h2> <ul style="margin:0in 0in 8pt;"><li>Added option to export manifest directly to Cancer Genomics Cloud </li></ul> <p><i>Note: Release notes for version 2.5.0 were adapted from an email communication sent directly to stakeholders on 12-18-2024 and first linked in the Hub on 3-31-2025.</i></p>',
        type: 'Release Notes',
        img: 'updateImgHub',
        contentType: '',
    },
    {
        id: 'hub_release_10102024',
        title: 'CCDI Hub Release (2.4.0)',
        version: 'v2.4.0',
        date: 'October 10, 2024',
        fullText: '<p>CCDI Hub release 2.4.0 includes substantial data changes and both new and enhanced features. Notably, the data model has been modified to remove deprecated properties, add new properties, and improve organization of properties within nodes, and CCDI Inventory data have been updated and loaded conforming to the augmented model. In addition to model-related changes, data updates may include new synonyms, funding information, publication, sequencing files availability, enrollment, diagnoses, and other study-level changes. A new resource page has been added for the CCDI Participant Index (CPI), and an option to export all file metadata from the Explore dashboard has been added to the Studies tab. Enhanced features include an Assay Type widget to replace the deprecated Ethnicity widget in the Explore dashboard and other font and contrast updates throughout the site to improve 508 compliance.</p><p>Additional details are listed below:</p> <h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Data Updates</span></h1> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">New Data Sets</span></h2> <ul style="margin:0in 0in 8pt;"><li>CCDI Pediatric In Vivo Testing Program – Leukemia (PHS003164)</li><li>T-cell Acute Lymphoblastic Leukemia Single Cell RNA Sequencing and ATAC Sequencing (PHS003432)</li><li>Childhood Cancer Data Initiative (CCDI): Single-Cell Atlas of NF1 Nerve Sheath Tumors (PHS003519) </li></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Updated Data Sets</span></h2>'
                 +'<ul style="margin:0in 0in 8pt;"><li>Genomic Sequencing of Pediatric Rhabdomyosarcoma (PHS000720) </li><li>Pediatric Preclinical Testing Consortium (PPTC) PDX Data Models (PHS001437) </li><li>Human Tumor Atlas Network (HTAN) Primary Sequencing Data (PHS002371) </li><li>Childhood Cancer Data Initiative (CCDI): Genomic Analysis in Pediatric Malignancies (PHS002430) </li><li>Childhood Cancer Data Initiative (PHS002431) </li><li>UCSF Database for the Advancement of JMML - Integration of Metadata with "Omic" Data (PHS002504) </li><li>Childhood Cancer Data Initiative (CCDI): Integration of genomic and clinical data from unique rare cancer datasets to facilitate data sharing (PHS002517)</li><li>Childhood Cancer Data Initiative (CCDI): OncoKids - NGS Panel for Pediatric Malignancies (PHS002518)</li><li>Childhood Cancer Data Initiative (CCDI): Free the Data: Open Sharing of Comprehensive Genomic Childhood Cancer Datasets (Kansas) (PHS002529) </li><li>NCI CCSG CCDI Supplement Additional Genomic Submission (PHS002599) </li><li>Feasibility and Clinical Utility of Whole Genome Profiling in Pediatric and Young Adult Cancers (PHS002620) </li><li>Integrating Longitudinal Clinical, Sociodemographic and Genomic Data into the NCCR (PHS002677) </li><li>Childhood Cancer Data Initiative (CCDI): Molecular Characterization Initiative (PHS002790) </li></ul> <h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Site Updates</span></h1> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">General Site</span></h2> <ul style="margin:0in 0in 8pt;">'
                 +'<li>Added CCDI Participant Index (CPI) resource page</li> <li>Updated menu with link to new page </li> <li>Updated color contrast and other typographical elements throughout the application to adhere to 508 guidelines</li></ul> <h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Explore Dashboard</span></h1> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Facet updates</span></h2> <ul style="margin:0in 0in 8pt;"><li>Replaced “Vital Status” facet label with “Last Known Survival Status” (also in Diagnosis table) </li> <li>Split Library Source into Library Source Material and Library Source Molecule and added subfacets to the new molecule facet category</li> <li>Removed Ethnicity and updated Race with new subfacets</li> <li>Removed Diagnosis Verification Status </li></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Widgets</span></h2> <ul style="margin:0in 0in 8pt;"><li>Replaced Ethnicity with Assay Type</li></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;"> Study Table</span></h2> <ul style="margin:0in 0in 8pt;"><li>Replaced “Study Short Title” column label with “Study Name” </li> <li>Added function to download all metadata files</li> </ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Sample and Diagnosis Tables</span></h2> <ul style="margin:0in 0in 8pt;"><li>Removed Diagnosis, Diagnosis Verification Status, Diagnosis Basis, Diagnosis Comment columns from Sample table</li><li>Added Sample ID column to Diagnosis table </li></ul> <p><i>Note: Release notes for version 2.4.0 were adapted from an email communication sent directly to stakeholders on 10-10-2024 and first linked in the Hub on 3-31-2025.</i></p>',
        type: 'Release Notes',
        img: 'updateImgHub',
        contentType: '',
    },
    {
        id: 'hub_release_08302024',
        title: 'CCDI Hub Release (2.3.2)',
        version: 'v2.3.2',
        date: 'August 30, 2024',
        fullText: '<p>CCDI Hub minor release 2.3.2 features a fix to the query that will restore the file count in the <a href="https://ccdi.cancer.gov/explore"> Explore Dashboard</a> to the correct count matching the files in the database at any time. The <a href="https://ccdi.cancer.gov/MCI"> Molecular Characterization Initiative (MCI) page</a> was updated to reflect August MCI enrollment counts and minor enhancements to the flow diagram. News topics were also updated, including the announcement of the August Childhood Cancer Data Catalog release and correcting to the 2.3.1 release date to 8/7/2024.</p><p>Details are listed below:</p> <h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Site Updates</span></h1> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">General Site</span></h2> <ul style="margin:0in 0in 8pt;"><li>Added Application Update for the August Childhood Cancer Data Catalog release to News</li><li>Corrected date of CCDI Hub 2.3.1 release Site Update from August 5, 2024, to August 7, 2024, in News</li></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Molecular Characterization Initiative (MCI) page</span></h2> <ul style="margin:0in 0in 8pt;"> <li>Updated enrollment counts for August </li> <li>Updated language in the MCI CCDI Data Ecosystem flow diagram</li></ul> <h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Explore Dashboard</span></h1> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Statistics Bar and Results Tables</span></h2> <ul style="margin:0in 0in 8pt;"> <li>Updated query that was including non-file objects in the file counts displayed in both the Stats bar and the Files tab; updated count matches database file count</li></ul> <p><i>Note: Release notes for version 2.3.2 were adapted from an email communication sent directly to stakeholders on 08-30-2024 and first linked in the Hub on 3-31-2025.</i></p>',
        type: 'Release Notes',
        img: 'updateImgHub',
        contentType: '',
    },
    {
        id: 'hub_release_08062024',
        title: 'CCDI Hub Release (2.3.1)',
        version: 'v2.3.1',
        date: 'August 6, 2024',
        fullText: '<p>CCDI Hub minor release 2.3.1 includes multiple new and enhanced features with no new data updates. New features include a <a href="https://ccdi.cancer.gov/data-federation-resource">descriptive page</a> for and links to the recently launched CCDI data federation API, hyperlinked dbGaP study IDs and additional support text notes in the <a href="https://ccdi.cancer.gov/explore"> Explore Dashboard</a>, and a new <a href="https://ccdi.cancer.gov/data-usage-policies"> Data Usage Policies and Terms page</a>. Enhancements include modified labeling of the “Stats at a Glance” summary on the <a href="https://ccdi.cancer.gov/home"> Home page</a> and updated enrollment counts with corresponding dates in the <a href="https://ccdi.cancer.gov/MCI"> Molecular Characterization Initiative (MCI) page</a>, as well as improved mobile responsiveness for the MCI page.</p><p>More details on the latest updates are listed below:</p> <h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Site Updates</span></h1> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">General Site</span></h2> <ul style="margin:0in 0in 8pt;"><li>Updated Stats at a Glance in Home page with qualifying note to clarify potential discrepancy between counts of data currently in the Hub and total enrollment at a given time </li><li>Modified MCI menu label in navigation bar to remove “for Childhood Cancers”</li><li>Added Data Usage Policies & Terms page, accessible under the About menu in the navigation bar </li></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Molecular Characterization Initiative (MCI) page</span></h2> <ul style="margin:0in 0in 8pt;"> <li>Added “as of” dates in tables to indicate the date the counts were updated </li> <li>Updated the List of Genes Reviewed for Germline and Somatic Variation </li> <li>Updated Chart, Table, and Map with July enrollment numbers</li> <li>Implemented mobile responsiveness</li></ul> <h1 style="font-weight: normal; margin: 30pt 0in 0in;">' 
                 +'<span style="color: #2f5496; font-size: 16pt;">CCDI Hub Explore Dashboard</span></h1> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Results Tables</span></h2> <ul style="margin:0in 0in 8pt;"> <li>Hyperlinked dbGaP accessions in Study ID column in Explore Dashboard </li> <li>Fixed bug to restore sorting in Files Tab  </li> <li>Added note below tables to remind users that data have not been independently validated </li></ul> <p><i>Note: Release notes for version 2.3.1 were adapted from an email communication sent directly to stakeholders on 08-06-2024 and first linked in the Hub on 3-31-2025.</i></p>',
        type: 'Release Notes',
        img: 'updateImgHub',
        contentType: '',
    },
    {
        id: 'hub_release_06262024',
        title: 'CCDI Hub Release (2.3.0)',
        version: 'v2.3.0',
        date: 'June 26, 2024',
        fullText: '<p>In this release, the CCDI Hub updated several and added two new data sets. These changes encompass 1,600 participants and 2,700 samples, with 20,760 new files. The <a href="https://ccdi.cancer.gov/MCI">MCI page</a> now features updated visualizations and a streamlined navigation pane. The Files tab on the <a href="https://ccdi.cancer.gov/Explore">Explore Dashboard</a> has added new columns for Library Selection, Source, and Strategy. <a href="https://ccdi.cancer.gov/static/media/CCDI_CGC_Data_Access_Instructions_2.0.27a8dc93.pdf">User Documentation</a> is available, providing instructions for accessing controlled data and navigating the Explore Dashboard. </p><p>A detailed breakdown of the new features and other updates is listed below:</p> <h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Data Updates</span></h1> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">New Data Sets</span></h2> <ul style="margin:0in 0in 8pt;"><li>Pediatric AYA Cancer Touchstone (PHS002431) </li><li>Pediatric Tumor Profiling (PPTC) (PHS002677)</li></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Updated Data Sets</span></h2> <ul style="margin:0in 0in 8pt;"> <li>Pediatric Preclinical Testing Consortium (PPTC) (PHS001437)</li> <li>Genomic Analysis in Pediatric Malignancies (PHS002430)</li> <li>Genomic Characterization: Juvenile Myelo Monocytic Leukemia (PHS002504)</li> <li>OncoKids Cancer Panel: Pediatric Cancers (PHS002518)</li> <li>Comprehensive Genomic Sequencing: Pediatric Cancers (PHS002529)</li> <li>Whole Genome & Transcriptome Profiling: Pediatric and Young Adult Cancers (PHS002620) </li> <li>Childhood Cancer Data Initiative (CCDI): Molecular Characterization Initiative (PHS002790)</li> <li>Molecular Characterization during Clonal Evolution: High-risk Neuroblastoma (PHS003111)</li></ul> <h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Site Updates</span></h1>'
                 +'<h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">General Site</span></h2> <ul style="margin:0in 0in 8pt;"> <li>Added ’An official website of the United States government’ banner to the top of each page in the application</li> <li>Added standard federal warning banner before granting user access to the site </li> <li>Updated search engine optimization and indexing settings to promote better visibility from related queries in open search engines</li> <li>Added Data Use Guide to the About menu</li> <li>Added Childhood Cancer Clinical Data Commons to the Applications menu </li> <li>Updated site logo with newest image file</li> <li>Updated news items </li></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Molecular Characterization Initiative (MCI) page </span></h2> <ul style="margin:0in 0in 8pt;"> <li>Updated label and values in the Enrollments in MCI by Diagnosis Type chart and added the adjacent table to accompany it</li> <li>Consolidated topic index with three primary headings and shortened topic titles where possible </li> <li>Updated MCI workflow image to include COG Project: EveryChild </li></ul> <h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Explore Dashboard</span></h1> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Visualization Dashboard</span></h2> <ul style="margin:0in 0in 8pt;"><li>Added note to remind users not to attempt to reidentify individuals based on the information presented in the dashboard</li> <li>Updated faceted search values for Anatomic site and removed undesired elements from facet selection list</li> <li>Reordered chart positions for more intuitive layout </li></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Results Tables</span></h2> <ul style="margin:0in 0in 8pt;"> <li>Added a second horizontal scroll bar at the bottom of the tables for each tab using horizontal scrolling </li>'
                 +'<li>Added three new library-related data columns to the Files table: Library Selection, Library Source, and Library Strategy</li> <li>Added export option for JSON format</li> <li>Updated Diagnosis and Samples tabs with new values for Anatomic Site </li> <li>Added units to the Age at Sample Collection column on Samples tab </li></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Cart</span></h2> <ul style="margin:0in 0in 8pt;"> <li>Updated file name for manifest export </li></ul> <p><i>Note: Release notes for version 2.3.0 were adapted from an email communication sent directly to stakeholders on 06-26-2024 and first linked in the Hub on 3-31-2025.</i></p>',
        type: 'Release Notes',
        img: 'updateImgHub',
        contentType: '',
    },
    {
        id: 'hub_release_03282024',
        title: 'CCDI Hub Release (2.2.0)',
        version: 'v2.2.0',
        date: 'March 28, 2024',
        fullText: '<p>The Childhood Cancer Data Initiative (CCDI) Hub is excited to announce the Explore Dashboard has been updated to use <a href="https://github.com/CBIIT/ccdi-model/releases/tag/1.7.2">CCDI Data Model version 1.7.2</a>.  This new data model facilitated numerous updates to the Dashboard, notability greater precision for participant diagnoses.  This update also introduces two new visualizations to the CCDI Molecular Characterization Initiative (MCI) page, a Donut chart of enrollment by diagnosis type and a USA map Bubble chart of enrollment counts by state.<br><br> The CCDI Hub is also excited to announce the addition of 4 new datasets and updates to 2 existing datasets, the CCDI Molecular Characterization Initiative and Pediatric Brain Tumor Atlas.  These 6 datasets include the addition of over 1,600 new participants; 3,100 new samples; and almost 30,000 new files.<br><br> There are many other improvements that enhance the site and Explore Dashboard usability which are detailed below: </p> <h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Data Updates</span></h1> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">New Datasets</span></h2> <ul style="margin:0in 0in 8pt;"> <li>Genomic Sequencing of Pediatric Rhabdomyosarcoma (PHS000720)</li><li>Pediatric Preclinical Testing Consortium (PPTC) (PHS001437) </li><li>Human Tumor Atlas Network (HTAN) (PHS002371) </li><li>Childhood Cancer Data Initiative (CCDI): Genomic Analysis in Pediatric Malignancies (PHS002430) </li></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Updated Datasets</span></h2> <ul style="margin:0in 0in 8pt;"> <li>CCDI Molecular Characterization Initiative (PHS002790) </li><li>Pediatric Brain Tumor Atlas (PHS002517) </li></ul> <h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Site Updates</span></h1> <h2 style="font-weight: normal; margin: 2pt 0in 0in;">'
                 +'<span style="color: #2f5496; font-size: 13pt;">General Site</span></h2> <ul style="margin:0in 0in 8pt;"> <li>Updated Carousel and Menu bar links to navigate directly to the site or resource.</li><li>Update the ‘CCDI Stats at a Glance’ section so that the dataset counts for Childhood Cancer Data Catalog (CCDC) updates automatically when the CCDC site updates.</li><li>Updated the About page text. </li><li>Updated the design of the ‘Page not found’ page.</li><li>Improved visual response for tablet and mobile browsing of the Global Search and ‘Page not found’ pages. </li></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Molecular Characterization Initiative (MCI) page</span></h2> <ul style="margin:0in 0in 8pt;"><li>Two new Enrollment visualizations have been added to the MCI Page </li><ul><li>A Donut chart of Enrollment in MCI (APEC14B1-MCI) by Diagnosis Type</li><li>A USA map Bubble chart of Enrollment Counts by State</li></ul><li>The ‘Go to Site’ link renamed to ‘Request Access (dbGaP).” No change in linked location.</li><li>Updated the text of the ‘How can MCI data be accessed through the CCDI Data Ecosystem?’ section. </li></ul> <h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Explore Dashboard</span></h1> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Faceted Search &amp; Breadcrumb</span></h2> <ul style="margin:0in 0in 8pt;"> <li>The Faceted search and breadcrumb are now visually linked by category color. </li><li>Illogical faceted search queries, i.e. selecting Sex=male and searching for a female PID, will now properly display.</li><li>‘Sex’ replaced ‘Gender’ within the Demographics category.</li><li>‘Diagnosis Classification,’ ‘Diagnosis Classification System,’ ‘Diagnosis Verification Status,’ and ‘Diagnosis Basis’ have replaced ‘Diagnosis (ICD-O)’ in both the Diagnosis and Samples categories.</li>'
                 +'<li>‘Disease Phase’ now appears after at the diagnosis data elements in the Diagnosis category.</li><li>‘Age at collection (days)’ now appears as the first item in the Samples category.</li><li>The ‘Library’ category was renamed to ‘Sequencing Library.’</li></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Visualization Dashboard</span></h2> <ul style="margin:0in 0in 8pt;"><li>The ‘Diagnosis’ donut chart label was updated from ‘Diagnosis (ICD-O)’ and displayed responses are now derived from CCDI data model element <i>diagnosis_classification </i> and not the retired <i>element diagnosis_icd_o.</i></li><li>The Age at Diagnosis (years) Histogram label was updated to be Participant from Subject.</li><li>The ‘Sex’ donut chart label was updated from ‘Gender’ and displayed responses are now derived from CCDI data model element <i>sex_at_birth</i> and not the retired element <i>gender</i>.</li></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Results Table</span></h2> <ul style="margin:0in 0in 8pt;"><li>‘Sex’ replaced ‘Gender’ on the Participants tab. </li><li>‘Diagnosis Classification,’ ‘Diagnosis Classification System,’ ‘Diagnosis Verification Status,’ ‘Diagnosis Basis,’ and ‘Diagnosis Comment’ have replaced ‘Diagnosis (ICD-O)’ in both the Diagnosis and Samples tabs.</li><li>A disclaimer was added to the bottom of the results table to note that participants may have participated in one or more studies and may not be unique.</li></ul> <p><i>Note: Release notes for version 2.2.0 were adapted from an email communication sent directly to stakeholders on 03-28-2024 and first linked in the Hub on 3-31-2025.</i></p>',
        type: 'Release Notes',
        img: 'updateImgHub',
        contentType: '',
    },
    {
        id: 'hub_release_12122023',
        title: 'CCDI Hub Release (2.1.0)',
        version: 'v2.1.0',
        date: 'December 12, 2023',
        fullText: '<p>The Childhood Cancer Data Initiative (CCDI) Hub is excited to announce the addition the CCDI Hub’s Molecular Characterization Initiative (MCI) page and an update to the “My Files” shopping cart manifest to make it directly importable in the Cancer Genomics Cloud (CGC).<br><br>There are many other improvements that enhance the site and Explore Dashboard usability which are detailed below:</p> <h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Site Updates</span></h1> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Molecular Characterization Initiative (MCI) page</span></h2> <ul style="margin:0in 0in 8pt;"> <li>A new page was added the CCDI Hub to share information about the MCI study. The page includes:</li><ul><li>Frequently asked questions about MCI </li><li>A dataflow diagram of the MCI study </li><li>Searchable tables of <i> Genes Reviewed for Germline and Somatic Variation and Gene Targets included in this Assay </I> </li><li>Contact information for results &amp;data </li></ul></ul><h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">General Site</span></h2> <ul style="margin:0in 0in 8pt;"> <li>Improved visual response for tablet and mobile browsing of the Home and News pages.</li> <li>Improved color contrast, labeling, and structure across the site to enhance accessibility and consistency.</li></ul><h1 style="font-weight: normal; margin: 30pt 0in 0in;"><span style="color: #2f5496; font-size: 16pt;">CCDI Hub Explore Dashboard</span></h1> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">"My Files" Shopping Cart</span></h2> <ul style="margin:0in 0in 8pt;"><li>Reformatted the shopping cart downloadable manifest file to be importable in the Cancer Genomics Cloud (CGC)</li><ul><li>Manifest files are now compatible with CGC’s GA4GH Data Repository Service (DRS) with updated DRS URI formatting.</li></ul>'
                 +'<li>The ‘Download Manifest’ button is no longer available when the cart is empty.</li><li>Added external link indicator to linked text</li></ul></ul><h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Explore Page</span></h2> <ul style="margin:0in 0in 8pt;"><li>Faceted search query response times improved.</li><li>A spinner will now appear as a visual indicator when the tool is updated for a faceted selection. </li><li>Facet search will now display incompatible search combinations if they are created by selecting and deselecting multiple facets</li><li>The Participant and Diagnosis tabs were updated to use Study ID, replacing Study Accession.</li><li>Updated Participant tab column order updated to mirror the facet data element order.</li><li>Diagnosis information, on the Diagnosis tab, was renamed to be Diagnosis (ICD-O), formerly ICD-O Morphology.</li><li>Fix issue where the Anatomic Site column on Diagnosis tab was not sorting correctly.</li><li>On the Studies tab, the <i>Diagnosis (Top 5), Diagnosis Anatomic Site (Top 5), and File Type (Top 5)</i> can now be expanded to show the full list if items with a ‘Read more’ and ‘Read less’ link.</li><li>Updated pagination formatting for site consistency. </li></ul> <p><i>Note: Release notes for version 2.1.0 were adapted from an email communication sent directly to stakeholders on 12-12-2023 and first linked in the Hub on 3-31-2025.</i></p>',
        type: 'Release Notes',
        img: 'updateImgHub',
        contentType: '',
    },
    {
        id: 'hub_release_10312023',
        title: 'CCDI Hub Release (2.0.0)',
        version: 'v2.0.0',
        date: 'October 31, 2023',
        fullText: '<p>The Childhood Cancer Data Initiative (CCDI) Hub is excited to announce the addition of a new Participant &amp; File Explore Dashboard. This new tool allows users to explore CCDI supported data in new ways and make connections with participants, samples, and files available through the NCI&rsquo;s Cancer Genomics Cloud (CGC).</p><p>The initial release of the CCDI Hub Explore Dashboard includes 8 CCDI supported studies and information on over 4,100 participants, 10,350 samples, and 132,000 files.  The following Studies are included in this release:</p><ol><li>Genomic Characterization: Juvenile Myelo Monocytic Leukemia (PHS002504)</li><li>Molecular Characterization: Pediatric Brain Tumors & other Cancers (PHS002517) </li><li>OncoKids Cancer Panel: Pediatric Cancers (PHS002518) </li><li>Comprehensive Genomic Sequencing: Pediatric Cancers (PHS002529)</li><li>Genomic Landscape: Acute Myeloid Leukemia (PHS002599) </li><li>Whole Genome & Transcriptome Profiling: Pediatric and Young Adult Cancers (PHS002620)</li><li>CCDI‘s Molecular Characterization Initiative (PHS002790) </li><li>Molecular Characterization during Clonal Evolution: High-risk Neuroblastoma (PHS003111) </li></ol><br>The new Explore Dashboard allows for single-study and cross-study discovery, building information cohorts on filtered metrics of interest.<br><br>A participant-centric faceted search tool allows users to filter the available information based on six categories – Demographics, Diagnosis, Samples, Data Category, Study, and Library.  Each category includes unique data elements that allow for targeted filtering. <br><br> For both filtered and non-filtered data, the Explore Dashboard shares data in charts and on a data table.  The Explore Dashboard includes visualizations for six different data elements - Study, Diagnosis (ICD-O), Age at Diagnosis (years), Race, Gender, and Ethnicity.  Each visualization adjusts as filter selections are made.'
                 +'<br /><br /> The data table displays information on five unique tabs - Participants, Diagnosis, Studies, Samples, and Files.  Each tab includes different data elements and adjusts as filter selections are made.  The data table allows users to export the cohort results in two different ways for further exploration and analysis.  Each tab of the data table includes an ‘Export’ button that will download a CSV that includes the filtered or non-filtered information shown on the tab.   <br><br> Additionally, each row of the data table is selectable, and each selection can be used to populate the File-Centric Cart.  Selections can be made at the study level, the participant level, the sample level, or at the individual level.  Once populated, the file-centric cart can be used to create a CSV manifest file of the curated files found using the tool Explore Dashboard.  This curated manifest can then be used within CGC to facilitate easier selection of CCDI files with the Cancer Data Service Explorer. <p><i>Note: Release notes for version 2.0.0 were adapted from an email communication sent directly to stakeholders on 10-31-2023 and first linked in the Hub on 3-31-2025.</i></p>',
        type: 'Release Notes',
        img: 'updateImgHub',
        contentType: '',
    },
    {
        id: 'hub_release_08232023',
        title: 'CCDI Hub Release (1.2.0)',
        version: 'v1.2.0',
        date: 'August 23, 2023',
        fullText: '<p>The CCDI Hub has been updated with several data and news updates.<br><br> Detailed information on the update is included below:<br><br> </p> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">CCDI Stats at a Glance</span></h2> <p style="margin: 0"> <ul style="margin:0in 0in 8pt;"><li>Childhood Cancer Data Catalog </li><ul><li>Cataloged Datasets updates from 223 to <b><i>250</i></b></li></ul><li>Molecular Characterization Initiative for Childhood Cancer</li><ul><li>Participants Updated from 1,303 to <b><i>1,552 </i></b></li></ul></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Latest Updates/News</span></h2> <p style="margin: 0"> <ul style="margin:0in 0in 8pt;"><li>New Item: August Childhood Cancer Data Catalog release goes live</li><ul><li>Describing the August CCDC release</li></ul><li>New Item: Molecular Targets Platform (MTP) release allows interactive data visualizations</li><ul><li>Describing the new interactive plot displays and updates to the About page are part of the MTP 2.1</li></ul><li>New Item: Childhood Cancer Data Catalog (CCDC) updates include a guide for accessing CCDI data</li><ul><li>Describing the July CCDC release</li></ul><li>New Item: Childhood Cancer Data Catalog updates with new resources and datasets</li><ul><li>Describing the June CCDC release</li></ul></ul> <p><i>Note: Release notes for version 1.2.0 were adapted from an email communication sent directly to stakeholders on 08-23-2023 and first linked in the Hub on 3-31-2025.</i></p>',
        type: 'Release Notes',
        img: 'updateImgHub',
        contentType: '',
    },
    {
        id: 'hub_release_06062023',
        title: 'CCDI Hub Release (1.1.0)',
        version: 'v1.1.0',
        date: 'June 6, 2023',
        fullText: '<p>The CCDI Hub has been enhanced with several updates and improvements.<br><br> Detailed information about these updates is provided below:<br><br> </p> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">CCDI Stats at a Glance</span></h2> <p style="margin: 0"> <ul style="margin:0in 0in 8pt;"><li>Childhood Cancer Data Catalog </li><ul><li>Cataloged Datasets updates from 222 to <b><i>223</i></b></li></ul><li>Molecular Characterization Initiative for Childhood Cancer </li><ul><li>Participants Updated from 1,145 to <b><i>1,303 </i></b></li></ul><li>Molecular Targets Platform</li><ul><li>Potential Pediatric Molecular Targets updated from 51,618 to <b><i>58,867 </i></b></li></ul></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Latest Updates/News</span></h2> <p style="margin: 0"> <ul style="margin:0in 0in 8pt;"><li>New Item: Molecular Characterization and Clinical Data from Multiple Organizations Released</li><ul><li>Describing the data release from the Children’s Brain Tumor Network, the Pacific Pediatric Neuro-Oncology Consortium, and the Children’s Hospital of Philadelphia.</li></ul><li>New Item: Childhood Cancer Data Catalog update includes new resource </li><ul><li>Describing the May update to the CCDC </li></ul><li>New Item: Molecular Targets Platform releases data updates and enhanced features </li><ul><li>Describing the recent update to the MTP platform </li></ul></ul> <h2 style="font-weight: normal; margin: 2pt 0in 0in;">'
                 +'<span style="color: #2f5496; font-size: 13pt;">Site Improvements</span></h2> <p style="margin: 0"> <ul style="margin:0in 0in 8pt;"><li>Improved Section 508 Compliance</li><ul><li>Added alternative text to site images </li><li>Added form label text to search and email input fields</li><li> Added descriptive text to images with links</li><li> Increased color contract for selectin indicator on Navbar and on News page.</li></ul><li>Adjusted Home and News page elements to improve spacing and positional consistency.<li> Update the About page to include responsive design for phones, tablets, and desktops of different sizes.</li><ul><li>This update does not include responsive design to the Header, Navbar, and Footer.  These will be in the next update.  </li></ul></ul> <br> <p><i>Note: Release notes for version 1.1.0 were adapted from an email communication sent directly to stakeholders on 06-07-2023 and first linked in the Hub on 3-31-2025.</i></p>',
        type: 'Release Notes',
        img: 'updateImgHub',
        contentType: '',
    },
    {
        id: 'hub_release_05102023',
        title: 'CCDI Hub Release (1.0.0)',
        version: 'v1.0.0',
        date: 'May 10, 2023',
        fullText: '<p>We are excited to announce the Childhood Cancer Data Initiative (CCDI) Hub is now available!<br><br> This release features the four primary Hub pages – Home, Search, New, and About. Each section is described in greater detail below:<br><br> </p> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">Home Page</span></h2> <p style="margin: 0"> The Home page has 4 sections, (1) the Hero section with the carousel, (2) the “Stats at a Glance” section, (3) the Latest Updates section and (4) the Explore section.<br><br> The Hero Section includes </p> <ul style="margin:0in 0in 8pt;"><li>Brief introductory text</li><li>A link to the CCDI Hub About page (About CCDI Hub) and a link to the CCDI page on cancer.gov (About CCDI) </li><li>A carousel of resources available to link to from the site.</li><ul><li>The carousel will automatically scroll vertically (4 sec) and can be advanced by selecting to up or down arrows at the top and bottom of the carousel. </li><li>Selecting an arrow will change the direction the carousel moves </li><li>Any time you hover on the carousel it will pause and not advance. If you remove your cursor it will restart.</li><li>The resource name of the middle three slide on the carousel is a clickable link that will open a new window for that resource.</li></ul></ul> <p style="margin: 0;">The Stats at a Glance Section includes:</p> <ul style="margin:0in 0in 8pt;"><li>Selected counts from selected CCDI resources </li></ul> <p style="margin: 0;">The Latest Updates Section includes:</p>'
                 +'<ul style="margin:0in 0in 8pt;"><li>A very brief highlight of CCDI related information </li></ul> <p style="margin: 0;">The Explore Section includes:</p> <ul style="margin:0in 0in 8pt;"><li>Brief descriptions of CCDI Resource and Others Applications</li><ul><li>Selecting any part of the Resource – icon, name, description – will open a new window to the selected resource.</li></ul></ul> <br> <h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">General</span></h2> <p style="margin: 0"> From every page of the site, users can access the header/menu bar, document search, the footer, and a Back to Top button. <br><br>The Header/Menu bar includes<br><ul style="margin:0in 0in 8pt;"><li>A link to each site page – Home, News, About</li><li>Dropdown menu for both Applications and Other Resources.</li><ul><li>Selecting an item on the Dropdown menu will navigate the user to the Home page Explore section.  Users can review resources and navigate to the resource of interest from that section of the Home page as well.</li></ul><li>A link to the CCDI page as part of the incorporation of Adobe Analytics</li></ul> <p style="margin: 0;">The Document Search (within the Header) includes:</p> <ul style="margin:0in 0in 8pt;"><li>A search of site text elements from the Home, News, and About pages </li><ul><li>No restriction on character length</li></ul></ul> <p style="margin: 0;">The Footer includes:</p> <ul style="margin:0in 0in 8pt;"><li>An upper footer with</li><ul><li>Links to CCDI About information (Hub and CCDI)</li>'
                 +'<li>A contact email link for CCDI (<a href="mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov">NCIChildhoodCancerDataInitiative@mail.nih.gov</a>)</li><li>Links to NIH policy documents </li><li> A sign up for the CCDI newsletter</li></ul><li>A lower footer with</li><ul><li> Links to NCI and NCI affiliated social media </li><li>A contact us section with the CCDI email</li><li>Links to HHS, NIH, NCI, and USA.gov</li></ul></ul> <p style="margin: 0;">The Back to Top button includes:</p> <ul style="margin:0in 0in 8pt;"><li>A button that will appear on any page in the lower right-hand corner of the window once a user scrolls down.</li><li>Selecting the button will take the user back to the top of the page they are on. </li></ul><br> <p style="margin: 0"><h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">News</span></h2> <p style="margin: 0"> The News page shares news and information about the CCDI, its associated resources, and other CCDI or NCI programs where cross-promotion would be beneficial. <br><br>The News page includes <br><ul style="margin:0in 0in 8pt;"><li>A complete listing of news and updates posted to the Hub.</li><ul><li>Each item includes a Title, Date, and a brief description</li></ul><li>Filters across the top to further sort the available items.</li><ul><li>All – All items on the News page</li><ul><li>Default filter</li></ul><li>Announcements – Items that announce any new or important information</li><li>News & Other – Items that are related to CCDI, NCI, or other connections of importance</li><li>Application Update – Items that capture updates to CCDI Applications or linked resources </li><li> Site Update – Items that capture updates to the CCDI Hub site.</li></ul></ul> <p style="margin: 0"><h2 style="font-weight: normal; margin: 2pt 0in 0in;"><span style="color: #2f5496; font-size: 13pt;">About</span></h2> <p style="margin: 0"> The About page  contains a brief description of the CCDI Hub and the larger CCDI with links back to the cancer.gov CCDI page. <br><br> <p><i>Note: Release notes for version 1.0.0 were adapted from an email communication sent directly to stakeholders on 05-10-2023 and first linked in the Hub on 3-31-2025.</i></p>',
        type: 'Release Notes',
        img: 'updateImgHub',
        contentType: '',
    },
]
