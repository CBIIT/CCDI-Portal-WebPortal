export const MCIContent = [
    {
        id: 'MCI_Introduction',
        topic: 'Introduction',
        content: '<p>The CCDI Molecular Characterization Initiative (MCI) provides free, state-of-the-art molecular testing to newly diagnosed children, adolescents, and young adults (AYAs) with central nervous system (CNS) tumors, soft tissue sarcomas (STS), and certain rare (RAR) childhood cancers being treated at a Children’s Oncology Group (COG)–affiliated hospital. The goal of this initiative is to enhance the understanding of the genetic factors involved in pediatric cancers and to provide timely, clinically relevant findings to doctors and families. This project uses Project:EveryChild (APEC14B1) to enroll participants, collect specimens, and annotate clinical data. The results of genetic testing will be shared with the treating physician and participants or their family, aiding in treatment decisions. This will also determine eligibility for certain planned COG clinical trials.</p>'
                +'<p>For an overview of this initiative, <a class="link" href="https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative/data-ecosystem/molecular-characterization" target="_blank" rel="noopener noreferrer">access the MCI web page on cancer.gov</a>.</p>'
    },
    {
        id: 'What_does_MCI_participation_involve?',
        topic: 'What does MCI participation involve?',
        content: '<p>Patients are required to enroll in APEC14B1 before participating in MCI, and those eligible to participate need to enroll in MCI and consent to molecular characterization. Currently, only patients with newly diagnosed CNS, STS and RAR tumors will be eligible to participate. Patients enrolling in APEC14B1 with secondary or second malignancy are not eligible to participate in MCI.</p>',
    },
    {
        id: 'specimens_submitted_for_MCI',
        topic: 'What types of testing will be conducted on the specimens submitted for MCI?',
        content: '<p>The Steve and Cindy Rasmussen Institute for Genomic Medicine (IGM) at Nationwide Children’s Hospital in Columbus, OH, will conduct:</p>'
                +'<ul><li>Enhanced paired tumor–normal exome sequencing (ES)</li>'
                +'<li>A targeted RNA Solid Tumor Fusion assay</li>'
                +'<li>A DNA-based methylation array assay for CNS tumor classification</li></ul>',
    },
    {
        id: 'When_and_how_are_MCI_results_provided',
        topic: 'When and how are MCI results provided?',
        content: '<p>Results from molecular testing are returned within 21 days of receipt of all required materials at the COG Biobank hosted by the Biopathology Center (BPC) at Nationwide Children’s Hospital. Once nucleic acid has been received within IGM from the BPC, results will be issued into the portal within 14 days. As each test is resulted, an email will be sent to the clinician and clinical research associate contacts listed on a contact form filled out by the participant’s care team. The email will include a link to the secure web portal where results can be accessed. Participants will receive results from their treating physician.</p>',
    },
    {
        id: 'MCI_data_CCDI_Data_Ecosystem?',
        topic: 'How can MCI data be accessed through the CCDI Data Ecosystem?',
        content: '<p>Separately, molecular characterization data and deidentified clinical reports are submitted to the CCDI Data Ecosystem, along with additional data encompassing demographics, diagnosis, treatment, and follow-up directly from COG. Data are hosted in the '
                +'<a class="link" href="https://datacommons.cancer.gov/repository/cancer-data-service" target="_blank" rel="noopener noreferrer">Cancer Data Service (CDS)</a>'
                +', which is a data repository under the '
                +'<a class="link" href="https://datascience.cancer.gov/data-commons" target="_blank" rel="noopener noreferrer">Cancer Research Data Commons</a>'
                +' infrastructure. Please see the '
                +'<a class="link" href="https://datacatalog.ccdi.cancer.gov/CCDI_CGC_Data_Access_Instructions_1.0.pdf" target="_blank" rel="noopener noreferrer">instructions</a>'
                +' on how to access the data associated with this study, '
                +'<a class="link" href="https://www.ncbi.nlm.nih.gov/gap/" target="_blank" rel="noopener noreferrer">phs002790</a>'
                +'. For the CCDI studies, the database of Genotypes and Phenotypes (dbGaP) maintains a list of the subject IDs, sample IDs, and consents. Authorization through dbGaP is required to access controlled-access data and clinical/phenotypic files.</p>'
                +'<p>Users can analyze CCDI data on the '
                +'<a class="link" href="https://www.cancergenomicscloud.org/" target="_blank" rel="noopener noreferrer">Cancer Genomics Cloud</a>'
                +' through the '
                +'<a class="link" href="https://gcc02.safelinks.protection.outlook.com/?url=https%3A%2F%2Fcgc.sbgenomics.com%2Fdatasets%2Ffile-repository&data=05%7C01%7Ccarol.bastiani%40nih.gov%7C7708699b96a144ce602208db6d0ace70%7C14b77578977342d58507251ca2dc2b06%7C0%7C0%7C638223665394038536%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=SyqbQFpBXs7Iqo6Ji2bSpdE3wQBcfAql9Gkacq7%2FBoI%3D&reserved=0" target="_blank" rel="noopener noreferrer">Cancer Data Service Explorer</a>'
                +' (CDS Explorer). The CDS Explorer provides a user-friendly interface for exploring the data in the CDS. '
                +'<a class="link" href="https://docs.cancergenomicscloud.org/docs/import-cds-data" target="_blank" rel="noopener noreferrer">Here is a tutorial</a>'
                +' on how to import CDS data. To see a preview of MCI data prior to going through the data authorization process, '
                +'<a class="link" href="https://datacatalog.ccdi.cancer.gov/dataset/CCDI-MCI" target="_blank" rel="noopener noreferrer">visit MCI’s page</a>'
                +' in the CCDI Childhood Cancer Data Catalog.</p>',
    },
    {
        id: 'type_of_results_exome_sequencing',
        topic: 'What type of results will be reported for exome sequencing (ES)?',
        content: '<p>Somatic disease–germline comparator sequencing is a paired tumor–normal exome analysis which incorporates an exome reagent assaying the coding regions of more than 19,000 protein-coding genes. In the setting of both germline and somatic analysis, only cancer-related genomic variation is reported.</p>'
                +'<p>For germline analysis, the report is focused on pathogenic or likely pathogenic variation in cancer-associated genes; however, variants of uncertain significance in genes with clear association to the cancer type under study may be reported. Germline variants are classified using the ACMG/AMP guidelines (PMID: 25741868). Secondary or incidental findings are not reported. For somatic analysis, the report is focused on Tier I and Tier II variants (strong or potential significance, respectively) as classified according to the AMP/ASCO/CAP guidelines (PMID: 27993330). Cancer-associated copy number variation from either germline or somatic analysis is classified in accordance with ACMG/CGC guidelines with reporting of Tier 1 and Tier 2 variants (strong or some known clinical significance, respectively; PMID: 31138931).</p>'
                +'<p>Due to the nature of exome sequencing, full gene coverage is not guaranteed. This assay does not detect exon-level deletions or duplications and may not be capable of detecting gene-level copy number variation below 105kb resolution. This testing is not intended for carrier screening. The report incorporates information curated from the medical literature, genetic databases, and variant knowledgebases, which are subject to change over time due to new scientific discoveries. The report must be considered within the clinical context of the patient, in conjunction with other relevant findings and clinical history.</p>'
                +'<p>Here is a list of genes that are reviewed for germline and somatic variation in the setting of this analysis (as of August 3, 2023). These cancer-associated genes have been curated from medical and scientific literature, databases, and professional guidelines.</p>',
    },
    {
        id: 'targeted_RNA_Solid_Fusion_assay',
        topic: 'What genes are included in the targeted RNA Solid Fusion assay?',
        content: '<p>The gene targets below are included in the Solid Tumor fusion assay (v2), which utilizes anchored multiplex PCR (ArcherDx) followed by next-generation sequencing to identify gene fusions or intragenic structural rearrangements, such as internal tandem duplications. Based on the methodology, if one fusion partner is encompassed in the assay, there is a high sensitivity to detect the other partner. For example, the assay targets critical regions within BRAF known to be involved in gene fusion events, which would allow this test to detect a fusion with a common partner such as KIAA1549. This assay would also enable detection of more rare or novel gene partners associated with a BRAF fusion if the tumor harbored such an event.</p>'
                +'<p>Here are the gene targets included in this assay.</p>',
    },
    {
        id: 'DNA_methylation_results',
        topic: 'Will DNA methylation results be returned for all patients?',
        content: '<p>For CNS patients only, a tumor classification by DNA methylation will have a clinical result returned to contacts indicated on the MCI Site Contact Form. For STS and RAR patients, DNA methylation array data will be banked for research submission into CCDI without return of results to sites.</p>'
                +'<p>DNA methylation results will be returned for CNS patients with tissue submitted from a primary site or a metastatic site in the CNS only. Results from non-CNS metastatic tissue will be banked without return of results to sites.</p>',
    },
    {
        id: 'steps_germline_findings',
        topic: 'What steps should be taken if germline findings are detected?',
        content: '<p>The participant’s physician should coordinate a referral for the participant and their family to do local genetic counseling. In this setting, familial cascade testing for the observed germline variant may be offered to the family where appropriate. Such testing typically takes the form of targeted Sanger or microarray analysis, performed in concert with pre and post-test genetic counseling on the significance of the genetic variant. Familial testing may be performed by the institutional molecular laboratory (if those services are available locally) or through typical send-out testing channels familiar to the clinician and counselor.</p>',
    },
    {
        id: 'contact_about_MCI_results_an_data',
        topic: 'Who should I contact with questions about MCI results and data?',
        content: '<h4>MCI Results Contacts</h4>'
        +'<p>Technical questions about specimen submission should be directed to the Biopathology Center by email at <a href="mailto:BPCBank@nationwidechildrens.org">BPCBank@nationwidechildrens.org</a>.</p>'
        +'<p>Technical questions about accessing results or result availability should be directed to IGM by email at <a href="mailto:igmmci@nationwidechildrens.org">igmmci@nationwidechildrens.org</a>.</p>'
        +'<p>Questions about results unrelated to a COG treatment trial should go to the following as appropriate:</p>'
        +'<ul><li>Central nervous system group: <a href="mailto:MCICNS@childrensoncologygroup.org">MCICNS@childrensoncologygroup.org</a></li>'
        +'<li>Soft tissue sarcoma group: <a href="mailto:MCISTS@childrensoncologygroup.org">MCISTS@childrensoncologygroup.org</a></li>'
        +'<li>Rare tumor group: <a href="mailto:MCIRAR@childrensoncologygroup.org">MCIRAR@childrensoncologygroup.org</li></a></ul>'
        +'<h4>MCI Data Contact</h4>'
        +'<p>For questions related to MCI data or accessing the CCDI Data Ecosystem, contact <a href="mailto:ncichildhoodcancerdatainitiative@mail.nih.gov">ncichildhoodcancerdatainitiative@mail.nih.gov</a>.</p>'
        +'<h4>Project:EveryChild Contact</h4>'
        +'<p>For questions related to Project:EveryChild (APEC14B1), contact <a href="mailto:projecteverychild@childrensoncologygroup.org">projecteverychild@childrensoncologygroup.org</a>.</p>',
    },
]
