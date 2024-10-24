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
import dataAccessPDF from "../assets/about/CCDI_CGC_Data_Access_Instructions_September2024.pdf";

export const newsList = [
    {
        id: 'hub_10102024',
        title: 'Just released: CCDI Hub version 2.4.0',
        date: 'October 10, 2024',
        slug: 'Substantial data updates and new and enhanced features mark CCDI Hub release',
        highlight: `<p>The latest update to the CCDI Hub includes three new data sets and updates to 13 others. Several updates were also made to the Explore Dashboard to improve filtered search functionality, with further revisions made to the dashboard’s widgets, study table, and sample and diagnosis tables. Additionally, the site now has a new page about the CCDI Participant Index.</p>`,
        fullText: '',
        type: 'Application Updates',
        img: updateImgHub,
        latestUpdate: true,
    },
    {
        id: 'cpi_10102024',
        title: 'Childhood Cancer Data Initiative (CCDI) Participant Index',
        date: 'October 10, 2024',
        slug: 'CPI API: Empowering Pediatric Cancer Research with Mapped Participant IDs',
        highlight: `<p>The Childhood Cancer Data Initiative (CCDI) announces the release of Version 1.0 of the Participant Index (CPI) API. The CPI maps participant IDs from different studies/research institutions, enabling researchers to explore complex questions, gain deeper insights into diseases, develop innovative therapies, and enhance existing treatments. With 32 domains and over 418,000 participant IDs, the CPI API is a significant step forward in pediatric cancer research. More information can be found at <a class="link" href="https://ccdi-dev.cancer.gov/ccdi-participant-index" target="_blank" rel="noopener noreferrer">https://ccdi-dev.cancer.gov/ccdi-participant-index</a>.</p>`,
        fullText: '',
        type: 'Announcements',
        img: updateImgCCDC2,
        latestUpdate: true,
    },
    { 
        id: 'ccdc_09252024',
        title: 'CCDC gets 5 new data sets and updates 8 resources',
        date: 'September 25, 2024',
        slug: 'Childhood Cancer Data Catalog (CCDC) continues to add data',
        highlight: `<p>Five new data sets are now available in the CCDC. Among them are the CCDI National Childhood Cancer Registry Data Platform data set and Correlative Studies for Protocol #14-C-0059: T Cells Expressing an Anti-GD2 Chimeric Antigen Receptor in Patients with GD2+ Solid Tumors, a Collaboration with CIMAC-CIDC. Eight existing resources were updated with new counts, clinical trial lists, and changes to repository links, resource URLs, and reference links. No new features were added in this release.</p>`,
        fullText: '',
        type: 'Application Updates',
        img: updateImgCCDC,
        latestUpdate: true,
    },
    {
        id: 'hub_08292024',
        title: 'Updates and minor enhancements to the Hub made',
        date: 'August 29, 2024',
        slug: 'Release 2.3.2 includes a fix and some small updates',
        highlight: `<p>The CCDI Hub 2.3.2 release features a query fix to the CCDI Hub Explore Dashboard. This fix will ensure the file counts are correct and match the number of files in the Hub’s database. Other updates include August Molecular Characterization Initiative (MCI) enrollment numbers and enhancements to the flow diagram on the MCI page, and corrections and updates to a few CCDI Hub News topics.</p>`,
        fullText: '',
        type: 'Site Updates',
        img: updateImgDashboard,
    },
    {
        id: 'ccdc_08212024',
        title: 'Several updates included in August CCDC release',
        date: 'August 21, 2024',
        slug: 'Changes to the CCDC include updates to existing resources and the addition of new data sets',
        highlight: `<p>This Childhood Cancer Data Catalog (CCDC) release includes six new data sets: CCDI’s Single-Cell Atlas of NF1 Nerve Sheath Tumors and Identification and Targeting of Treatment Resistant Progenitor Populations in T-cell Acute Lymphoblastic Leukemia, The Cancer Imaging Archive’s MR Imaging of Pediatric Subjects with High-Grade Gliomas (DFCI-BCH-BWH-PEDs-HGG), and three sets from the Single-cell Pediatric Cancer Atlas. Additionally, several resources now have updated counts as well as references and resource-level properties. Changes were made to other resources and a critical software update was performed for the entire catalog.</p>`
                +'<p>Note: new data set count was originally reported incorrectly; count and labels of new data sets were updated on 10/10/24</p>',
        fullText: '',
        type: 'Application Updates',
        img: updateImgCCDC,
    },
    {
        id: 'federation_08072024',
        title: 'Childhood Cancer Data Initiative (CCDI) Data Federation Resource',
        date: 'August 7, 2024',
        slug: 'API that facilitates data search from various resources eliminating the need for data consolidation into a single centralized repository.',
        highlight: `<p>The API provides an open-access subset of metadata including data set location. Data files are accessible according to the policies at each organization. Where possible, metadata have been harmonized to Common Data Elements provided by the Cancer Data Standards Registry and Repository (<a class="link" href="https://cadsr.cancer.gov" target="_blank" rel="noopener noreferrer">https://cadsr.cancer.gov</a>). Current data federation members are the Kids First Data Resource Center, Pediatric Cancer Data Commons, St. Jude Cloud, and Treehouse Childhood Cancer Data Initiative.</p>`,
        fullText: '',
        type: 'Announcements',
        img: updateImgCCDC2,
        latestUpdate: true,
    },
    {
        id: 'hub_08072024',
        title: 'A new resource page and enhanced user support text',
        date: 'August 7, 2024',
        slug: 'Release adds CCDI data federation resource page and enhanced user support text',
        highlight: `<p>In this release, the CCDI Hub added two key pages of interest: a CCDI data federation resource page and a description of data usage policies and terms. Clarifying text was also added to the “Stats at a Glance” summary, Explore Dashboard, and Molecular Characterization Initiative (MCI) enrollment page. Other improvements include hyperlinked dbGaP accessions and fixed column sorting in the Explore Dashboard grids and improved mobile responsiveness of the MCI resource page.</p>`,
        fullText: '',
        type: 'Site Updates',
        img: updateImgDashboard,
    },
    {
        id: 'hub_06272024',
        title: 'Latest Hub release includes new studies and enhanced functionality',
        date: 'June 27, 2024',
        slug: 'CCDI Hub adds two new studies, updated data sets, and enhanced features in June release',
        highlight: `<p>The CCDI Hub updated seven data sets and added two new: Pediatric AYA Cancer Touchstone (<a class="link" href="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002431.v1.p1" target="_blank" rel="noopener noreferrer">phs002431.v1</a>) and Pediatric Tumor Profiling (<a class="link" href="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002677.v1.p1" target="_blank" rel="noopener noreferrer">phs002677.v1</a>) data sets. These encompass 1,600 participants and 2,700 samples, totaling 20,760 new files. The <a href="/MCI" target="_blank">MCI page</a> now features updated visualizations and a streamlined navigation pane. The Files tab on the <a href="/Explore" target="_blank">Explore Dashboard</a> now includes Library Selection, Source, and Strategy. <a href=${dataAccessPDF} target="_blank"}>User Documentation</a> is available, providing instructions for accessing controlled data and navigating the Explore Dashboard.</p>`,
        fullText: '',
        type: 'Site Updates',
        img: updateImgHub,
    },
    {
        id: 'ccdc_06122024',
        title: 'Resource updates featured in this month’s CCDC release',
        date: 'June 12, 2024',
        slug: 'Six existing resources in the CCDC have been updated',
        highlight: '<p>The Childhood Cancer Data Catalog (CCDC) now includes 317 data sets from 60 resources. This release adds four new data sets to cBioPortal for Cancer Genomics, Childhood Cancer Data Initiative, and Gene Expression Omnibus. Also, data sets in the CancerModels.org and Patient-Derived Xenograft and Advanced In Vivo Models resources have updated counts, and the Childhood Cancer and Leukemia International Consortium data set is now part of the World Health Organization–International Agency for Research on Cancer resource.</p>',
        fullText: '',
        type: 'Application Updates',
        img: updateImgCCDC,
    },
    {
        id: 'ccdc_05172024',
        title: 'Two new resources and other updates featured in latest CCDC release',
        date: 'May 17, 2024',
        slug: 'Childhood Cancer Data Catalog (CCDC) adds two resources and 13 data sets',
        highlight: '<p>The CCDC now includes the South African National Cancer Registry (NCR) and the World Health Organization-International Agency for Research on Cancer (WHO-IARC) resources. The NCR has played a critical role in cancer prevention and control policy in South Africa and contains demographic, clinical, and reporting source data. The WHO-IARC resource includes epidemiological data. In addition to these resources, 13 new data sets were added, and several other updates were made.</p>',
        fullText: '',
        type: 'Application Updates',
        img: updateImgCCDC,
    },
    {
        id: 'c3dc_05032024',
        title: 'Significant updates made in latest C3DC release',
        date: 'May 3, 2024',
        slug: 'The new release represents the harmonization of all clinical data sets in the CCDI Data Ecosystem.',
        highlight: '<p>Building off its first release, the Childhood Cancer Clinical Data Commons (C3DC) now has nine additional CCDI data sets. These harmonized data sets represent all of the clinical data sets in the CCDI Data Ecosystem, providing a more comprehensive resource for childhood cancer research. The data sets include coverage of study, participant, diagnosis, sample, and survival data. The release also includes updated visuals and enhanced documentation.</p>',
        fullText: '',
        type: 'Application Updates',
        img: updateImgC3DC,
    },
    {
        id: 'ccdc_04102024',
        title: 'Explore new data sets, a resource, and other CCDC site updates this month',
        date: 'April 10, 2024',
        slug: 'Sixteen new data sets and a new registry added to the CCDC',
        highlight: '<p>The Genomics Evidence Neoplasia Information Exchange (GENIE) was added to the Childhood Cancer Data Catalog (CCDC) this month. This publicly accessible cancer registry includes real-world clinico-genomic data from 19 leading international cancer centers. Along with this new resource, the catalog also added 16 new data sets and a new <a href="https://datacatalog.ccdi.cancer.gov/contribute" target="_blank" rel="noopener noreferrer">Contribute to the CCDC</a> page that provides information about submitting data and getting your resource added to the CCDC.</p>',
        fullText: '',
        type: 'Application Updates',
        img: updateImgCCDC,
    },
    {
        id: 'hub2_03272024',
        title: 'Latest CCDI Hub release includes exciting new technical changes',
        date: 'March 27, 2024',
        slug: 'An updated data model, new visualizations, and additional updates come to the CCDI Hub',
        highlight: '<p>The CCDI Hub Explore Dashboard is using an updated model: CCDI Data Model version 1.7.2. This allowed for several updates to the dashboard, including the reconfiguration of diagnoses by classification and status. It also adds two new data visualizations to the Hub’s Molecular Characterization Initiative (MCI) page—a donut chart showing enrollment by diagnosis type, and a bubble chart map of the U.S. depicting the number of MCI participants by state. Also, many other improvements were made to enhance Hub and Explore Dashboard usability.</p>',
        fullText: '',
        type: 'Site Updates',
        img: updateImgDashboard,
    },
    {
        id: 'hub_03272024',
        title: 'CCDI Hub adds almost 30,000 new files in latest release',
        date: 'March 27, 2024',
        slug: 'New release includes four new data sets and updates to two existing data sets',
        highlight: '<p>The CCDI Hub has added four new data sets and updated two existing data sets (the CCDI Molecular Characterization Initiative and Pediatric Brain Tumor Atlas). In adding these, the Hub gains new data from over 1,600 participants and 3,100 samples, along with 30,000 new files.</p>',
        fullText: '',
        type: 'Site Updates',
        img: updateImgHub,
    },
    {
        id: 'ccdc_03132024',
        title: 'March CCDC release includes updates to five existing resources',
        date: 'March 13, 2024',
        slug: 'Latest CCDC release also adds 11 new data sets',
        highlight: '<p>The March Childhood Cancer Data Catalog (CCDC) release includes 11 new data sets in five existing resources, plus other data updates. Two of these additions were to the Childhood Cancer Data Initiative resource—a project data set, Genomic Analysis in Pediatric Malignancies, and an analytic tool set called Center for Computational Genomic Medicine Analytic Tools.</p>',
        fullText: '',
        type: 'Application Updates',
        img: updateImgCCDC2,
    },
    {
        id: 'c3dc_03082024',
        title: 'CCDI launches new open-access web application',
        date: 'March 08, 2024',
        slug: 'Access the Childhood Cancer Clinical Data Commons (C3DC) today',
        highlight: '<p>Find harmonized childhood cancer demographics and phenotypic clinical data in this new CCDI resource. <a href="https://clinicalcommons.ccdi.cancer.gov/" target="_blank" rel="noopener noreferrer">Use the C3DC</a> to search for participant-level data, create synthetic cohorts, and export data from the Molecular Characterization Initiative and TARGET Neuroblastoma. As the C3DC matures, new childhood cancer data and more functionalities will be added.</p>',
        fullText: '',
        type: 'Announcements',
        img: updateImgC3DC,
    },
    {
        id: 'ccdc_02142024',
        title: 'Childhood Cancer Data Catalog (CCDC) Release Provides More Resources for Users',
        date: 'February 14, 2024',
        slug: 'Find biospecimens or explore a new cohort study database in this recent CCDC update',
        highlight: '<p>Search for and request available biospecimens collected from cancer treatment trials in NCI’s National Clinical Trials Network (NCTN) with the NCTN Navigator, one of two resources added to the CCDC. The second, the Cancer Epidemiology Descriptive Cohort Database, is a searchable database with general, biospecimen, and other descriptive cohort study information. Along with these resource additions, nine existing resources were updated, including eight new data sets.</p>',
        fullText: '',
        type: 'Application Updates',
        img: updateImgCCDC,
    },
    {
        id: 'ccdc_01172024',
        title: 'Two new resources added to the Childhood Cancer Data Catalog (CCDC)',
        date: 'January 17, 2024',
        slug: 'This CCDC release includes a tool to explore genomics data and a platform to help accelerate pediatric drug development.',
        highlight: '<p>Now part of the CCDC: the cBioPortal for Cancer Genomics, a tool for interactive exploration of genomics data sets that aims to lower barriers to accessing complex genomic data. This release also includes the Innovative Therapies for Children with Cancer Paediatric Preclinical Proof-of-Concept Platform (ITCC-P4). The ITCC-P4 platform, developed through an academic-industry partnership, aims to establish new patient-derived preclinical models of high-risk pediatric tumors and help speed up drug development for childhood cancers.</p>',
        fullText: '',
        type: 'Application Updates',
        img: updateImgCCDC2,
    },
    {
        id: 'ehr_01112024',
        title: 'Respond to our latest RFI on automated EHR data entry and extraction capabilities',
        date: 'January 11, 2024',
        slug: 'Attention research, informatics, health care communities, vendors, and developers! The CCDI wants to hear from you.',
        highlight: '<p>Do you have capabilities in automated electronic health record (EHR) data entry and extraction? If so, please respond to our latest Request for Information and share your tools, clinical workflows, and approaches for entering and extracting EHR data in a structured format. Your input could help NCI plan a workshop on this topic. '
                  +'<a class="link" href="https://grants.nih.gov/grants/guide/notice-files/NOT-CA-24-021.html" target="_blank" rel="noopener noreferrer">Submit responses by February 29, 2024. https://grants.nih.gov/grants/guide/notice-files/NOT-CA-24-021.html</a></p>',
        fullText: '',
        type: 'Announcements',
        img: updateImgEHR,
    },
    {
        id: 'hub_12182023',
        title: 'Molecular Characterization Initiative (MCI) Page Added to CCDI Hub',
        date: 'December 18, 2023',
        slug: 'A new MCI page is among the latest updates to the CCDI Hub website.',
        highlight: 'The CCDI Hub’s new MCI page includes frequently asked questions about MCI, a dataflow diagram of the study, searchable tables, and contact information for results and data. In addition to the MCI page, updates have been made to the “My Files” shopping cart manifest, making it directly importable in the Cancer Genomics Cloud. Other enhancements to the site and Explore Dashboard further improve the user experience.',
        fullText: '',
        type: 'Site Updates',
        img: updateImgDashboard,
    },
    {
        id: 'ccdc_12132023',
        title: 'New to the Childhood Cancer Data Catalog (CCDC): Osteosarcoma Explorer',
        date: 'December 13, 2023',
        slug: 'The Osteosarcoma Explorer analytical tool is part of the latest CCDC release, which also includes updates to six existing resources.',
        highlight: 'The December Childhood Cancer Data Catalog (CCDC) release includes a new analytical tool, updates to six existing resources, and numerous other data updates. The new tool, Osteosarcoma Explorer, is a web portal that incorporates an array of clinical, genomic, proteomic, and pathological imaging data for use with patient query, online analysis, and digital pathology visualization tools.',
        fullText: '',
        type: 'Application Updates',
        img: updateImgCCDC,
    },
    {
        id: 'hub_10272023',
        title: 'CCDI Hub Explore Dashboard Release',
        date: 'October 27, 2023',
        slug: 'Navigate through detailed pediatric cancer data, create synthetic cohorts, and enable cross-study discoveries with the Hub’s new Explore Dashboard.',
        highlight: 'The CCDI Hub’s Explore Dashboard is a new tool for exploring individual-level participant, sample, and file information for CCDI-managed datasets.  This new tool enables users to explore data in novel ways and establish connections to create synthetic cohorts or cross-study discoveries.  The initial release includes eight studies and information on over 4,100 participants, 10,350 samples, and 132,000 files.',
        fullText: '',
        type: 'Site Updates',
        img: updateImgDashboard,
    },
    {
        id: 'ccdc_10192023',
        title: 'New resource added to Childhood Cancer Data Catalog (CCDC)',
        date: 'October 19, 2023',
        slug: 'The latest CCDC release includes the addition of the Imaging Data Commons, along with updates to several existing resources.',
        highlight: 'The Childhood Cancer Data Catalog now includes the Imaging Data Commons (IDC), a cloud-based repository of publicly available cancer imaging data, which also adds the Rhabdomyosarcoma Mutation Prediction data set. Updates to seven existing CCDC resources have also been performed, adding four data sets. Additionally, the Search Catalog export file has been updated to be more accessible and useful.',
        fullText: '',
        type: 'Application Updates',
        img: updateImgCCDC2,
    },
    {
        id: 'ccdc_09202023',
        title: 'CCDC release includes new tool to browse The Cancer Imaging Archive resource',
        date: 'September 20, 2023',
        slug: 'The Childhood Cancer Data Catalog adds the TCIABrowser and two new data sets, along with several resource updates.',
        highlight: 'The catalog has a new tool called TCIABrowser, which connects users to The Cancer Imaging Archive (TCIA) to browse different collections, patient subjects, studies, and series. Users can also download the images and visualize them in a 3D slicer. Two new database of Genotypes and Phenotypes data sets have also been added, and five other resources have been updated with new data set information.',
        fullText: '',
        type: 'Application Updates',
        img: updateImgCCDC,
    },
    {
        id: 'ccdc_08172023',
        title: 'August Childhood Cancer Data Catalog release goes live',
        date: 'August 17, 2023',
        slug: 'The catalog now includes four new resources, ten new data sets, and a new resource type.',
        highlight: '<p>Users of the Childhood Cancer Data Catalog can now filter by the resource type, “Biorepository.” As part of this resource type, four new resources have been added, including Norwegian Childhood Cancer Biobank, Swedish Childhood Tumor Biobank, The Biopathology Center, and VIVO Biobank. There are also ten additional data sets available and several updates to existing resources.</p>',
        fullText: '',
        type: 'Application Updates',
        img: updateImgCCDC2,
    },
    {
        id: 'mtp_07212023',
        title: 'Molecular Targets Platform (MTP) release allows interactive data visualizations',
        date: 'JULY 21, 2023',
        slug: 'New interactive plot displays and updates to the About page are part of the MTP 2.1 release.',
        highlight: '<p>The Molecular Targets Platform (MTP) is now live with interactive visualizations of data via the <a href="https://moleculartargets.ccdi.cancer.gov/pediatric-cancer-data-navigation" target="_blank" rel="noopener noreferrer">Pediatric Data Navigation page</a>. There is also improved plot generation for the OpenPedCan Gene Expression and Differential Expression widgets, along with updated descriptions in the “Pediatric Cancer Data Visualizations” section on the <a href="https://moleculartargets.ccdi.cancer.gov/about" target="_blank" rel="noopener noreferrer">About page</a> regarding the chart types added in the previous MTP release.</p>',
        fullText: '',
        type: 'Application Updates',
        img: updateImgMTP2,
    },
    {
        id: 'molecularcharacterization_07202023',
        title: 'Molecular Characterization and Clinical Data from Multiple Organizations Released',
        date: 'JULY 20, 2023',
        slug: 'Pediatric brain tumor data from several organizations are available pre-publication and without embargo. ',
        highlight: '<p>CCDI has facilitated the release of data from children and young adults diagnosed with pediatric brain tumors and other solid and hematologic malignancies. The data was collected from the Children’s Brain Tumor Network, the Pacific Pediatric Neuro-Oncology Consortium, and the Children’s Hospital of Philadelphia Division for Genomic Diagnostics. They include tumor and germline WGS, RNA-Seq, Clinical Panel Sequencing, and other omics and molecular data. <a href="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002517.v1.p1" rel="noreferrer noopener" target="_blank">Access these data through dbGaP</a>.</p>',
        fullText: '',
        type: 'News & Other',
        img: updateImgMolecularCharacterization,
    },
    {
        id: 'ccdc_07192023',
        title: 'Childhood Cancer Data Catalog (CCDC) updates include a guide for accessing CCDI data',
        date: 'JULY 19, 2023',
        slug: 'The latest CCDC update also provides updated data sets, a new registry, and new analytical tools.',
        highlight: '<p>The Childhood Cancer Data Catalog now has three new resources. One is the Childhood Cancer Registry, which banks and distributes cell lines and patient-derived xenografts. The other two are analytical tools—The Cancer Research Institute iAtlas, which includes tools for studying tumor and immune microenvironment interactions, and The Cancer Proteome Atlas, through which users can access proteomics data. Importantly, there is also a new guide on how to access, query, and process CCDI data stored at NCI’s Cancer Data Service.</p>',
        fullText: '',
        type: 'Application Updates',
        img: updateImgCCDC2,
    },
    {
        id: 'ccdc_06142023',
        title: 'Childhood Cancer Data Catalog updates with new resources and datasets',
        date: 'JUNE 14, 2023',
        slug: 'Cancermodels.org has over 7,000 patient-derived cancer models available to the community.',
        highlight: '<p>The Cancermodels.org resource has been added to the CCDI Childhood Cancer Data Catalog. This is a free, open-source platform that collects clinical, genomic, and functional data from patient-derived xenografts, organoids, and cell lines. The catalog update also includes 13 new datasets, eight of which are from the Single-cell Pediatric Cancer Atlas Portal (ScPCA).</p>',
        fullText: '',
        type: 'Application Updates',
        img: updateImgCCDC,
    },
    {
        id: 'mtp_06022023',
        title: 'Molecular Targets Platform releases data updates and enhanced features',
        date: 'JUNE 2, 2023',
        slug: 'The latest update to the Molecular Targets Platform includes new data and enhanced features. Learn about the recent release.',
        highlight: '<p>The <a href="https://moleculartargets.ccdi.cancer.gov/" target="_blank" rel="noopener noreferrer">Molecular Targets Platform</a> (MTP) expanded with new data and enhanced features. Researchers will find new and updated data from the Pediatric Brain Tumor Atlas and TARGET cohorts, including sequencing and methylation data. Improved features include enhanced gene expression graphs for childhood cancer data and a new widget to capture methylation data. Finally, the latest coding updates ensure that the data can be easily viewed and queried. <a href="https://moleculartargets.ccdi.cancer.gov/about" target="_blank" rel="noopener noreferrer">Learn more about how the MTP is helping advance childhood cancer research</a>.</p>',
        fullText: '',
        type: 'Application Updates',
        img: updateImgMTP,
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
        type: 'Application Updates',
        img: updateImgCCDC,
    },
    {
        id: 'ccdc_04192023',
        title: 'Childhood Cancer Data Catalog April Update',
        date: 'APRIL 19, 2023',
        slug: 'The update includes one new resource, eight new datasets, and many other changes.',
        highlight: '<p>The <a href="https://datacatalog.ccdi.cancer.gov/" target="_blank" rel="noopener noreferrer">Childhood Cancer Data Catalog</a> is pleased to announce the addition of the Xena Browser, a powerful online exploration tool that allows users to investigate functional genomic data sets for correlations between genomic and/or phenotypic variables. Also, seven new datasets have been incorporated into eight existing resources.</p><p><a href="https://datacatalog.ccdi.cancer.gov/" rel="noreferrer noopener" target="_blank">Explore the Catalog</a> to check out all the changes.</p>',
        fullText: '',
        type: 'Application Updates',
        img: updateImgCCDC,
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
        type: 'Application Updates',
        img: updateImgMolecular,
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
        type: 'News & Other',
        img: updateImgSymposium,
    },
]