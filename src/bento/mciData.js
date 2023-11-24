export const MCIContent = [
    {
        id: 'mciContent1',
        topic: 'Introduction',
        content: '<p>The CCDI Molecular Characterization Initiative (MCI) provides free, state-of-the-art molecular testing to newly diagnosed children, adolescents, and young adults (AYAs) with central nervous system (CNS) tumors, soft tissue sarcomas (STS), and certain rare (RAR) childhood cancers being treated at a Children’s Oncology Group (COG)-affiliated hospital. The goal of this initiative is to enhance the understanding of the genetic factors involved in pediatric cancers and to provide timely, clinically relevant findings to doctors and families. This project uses Project:EveryChild (APEC14B1) to enroll participants, collect specimens, and annotate clinical data. The results of genetic testing will be shared with the treating physician and participants or their family, aiding in treatment decisions. This will also determine eligibility for certain planned COG clinical trials.</p>'
                +'<p>For an overview of this initiative, access the <a class="link" href="https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative/data-ecosystem/molecular-characterization" target="_blank" rel="noopener noreferrer">MCI web page on cancer.gov</a>.</p>'
    },
    {
        id: 'mciContent2',
        topic: 'What does MCI participation involve?',
        content: '<p>Patients are required to enroll in APEC14B1 before participating in the MCI, and those eligible to participate need to enroll in MCI and consent to molecular characterization. Currently, only patients with newly diagnosed CNS, STS and RAR tumors will be eligible to participate. Patients enrolling in APEC14B1 with secondary or second malignancy are not eligible to participate in MCI.</p>',
    },
    {
        id: 'mciContent3',
        topic: '"What types of testing will be conducted on the specimens submitted for MCI?",',
        content: '<p>The Steve and Cindy Rasmussen Institute for Genomic Medicine (IGM) in Columbus, OH, will conduct:</p>'
                +'<ul><li>Enhanced whole exome sequencing (WES).</li>'
                +'<li>An RNA Archer Fusion-Plex assay.</li>'
                +'<li>An Illumina 850K Epic DNA methylation array.</li></ul>'
                +'<p>Abbreviations: WES, whole exome sequencing; AWS, Amazon Web Services; SNV, single-nucleotide variant; INDEL, insertion/deletion; CNV, copy number variation; LOH, loss of heterozygosity; ITD, internal tandem duplication; DKFZ, German Cancer Research Center.</p>',
    },
    {
        id: 'mciContent4',
        topic: 'When and how are MCI results provided?',
        content: '<p>Results from the molecular testing are returned within 21 days of receipt of all required materials at the Biopathology Center at Nationwide Children’s Hospital. When they are ready, an email will be sent to contacts listed on a contact form filled out by the participant’s care team. The email will include a link to the secure web portal where results can be accessed. Participants will receive results from their treating physician.</p>',
    },
    {
        id: 'mciContent5',
        topic: 'How can MCI data be accessed through the CCDI Data Ecosystem?',
        content: '<p>Separately, the molecular characterization data and deidentified clinical report are submitted to the CCDI Data Ecosystem, along with additional demographic, diagnosis, follow-up data, etc. directly from COG. Data is hosted in the Cancer Data Service (CDS), which is a data repository under the Cancer Research Data Commons infrastructure. Please see the instructions on how to access the data associated with this study using accession number phs002790. For the CCDI studies, the database of Genotypes and Phenotypes (dbGaP) maintains a list of the subject IDs, sample IDs, and consents. Authorization through dbGaP is required to access controlled-access data and clinical/phenotypic files.</p>'
                +'<p>Users can analyze CCDI data on the Cancer Genomics Cloud through the Cancer Data Service Explorer (CDS Explorer). The CDS Explorer provides a user-friendly interface for exploring the data in the CDS. Here is a tutorial on how to import CDS data. To see a preview of MCI data prior to going through the data authorization process, visit MCI’s page in the CCDI Childhood Cancer Data Catalog.</p>',
    },
    {
        id: 'mciContent6',
        topic: 'What type of results will be reported for whole exome sequencing (WES)?',
        content: '<p>Somatic disease-germline comparator sequencing is a paired tumor-normal exome analysis which incorporates an exome reagent assaying the coding regions of greater than 19,000 protein-coding genes. In the setting of both germline and somatic analysis, only cancer-related genomic variation is reported.</p>'
                +'<p>For germline analysis, the report is focused on pathogenic or likely pathogenic variation in cancer-associated genes; however, variants of uncertain significance in genes with clear association to the cancer type under study may be reported. Germline variants are classified using the ACMG/AMP guidelines (PMID: 25741868). Secondary or incidental findings are not reported. For somatic analysis, the report is focused on Tier I and Tier II variants (strong or potential significance, respectively) as classified according to the AMP/ASCO/CAP guidelines (PMID: 27993330). Cancer-associated copy number variation from either germline or somatic analysis is classified in accordance with ACMG/CGC guidelines with reporting of Tier 1 and Tier 2 variants (strong or some known clinical significance, respectively; PMID: 31138931).</p>'
                +'Due to the nature of exome sequencing, full gene coverage is not guaranteed. This assay does not detect exon-level deletions or duplications and may not be capable of detecting gene-level copy number variation below 105kb resolution. This testing is not intended for carrier screening. The report incorporates information curated from the medical literature, genetic databases, and variant knowledgebases which are subject to change over time due to new scientific discoveries. The report must be considered within the clinical context of the patient, in conjunction with other relevant findings and clinical history.</p>'
                +'Here is a list of genes that are reviewed for germline and somatic variation in the setting of this analysis (as of May 16, 2023). These cancer-associated genes have been curated from medical and scientific literature, databases, and professional guidelines.</p>',
    },
    {
        id: 'mciContent7',
        topic: 'What genes are included in the RNA Archer Fusion-Plex Assay?',
        content: '<p>The gene targets below are included on the v2 Solid Tumor fusion assay which utilizes anchored multiplex PCR followed by next-generation sequencing to identify gene fusions or intragenic structural rearrangements. Based on the methodology, if one fusion partner is encompassed in the assay there is a high sensitivity to detect the other partner. For example, the assay targets critical regions within BRAF known to be involved in gene fusion events which would allow this test to detect a fusion with a common partner such as KIAA1549. This assay would also enable detection of more rare or novel gene partners associated with a BRAF fusion if the tumor harbored such an event.</p>',
    },
    {
        id: 'mciContent8',
        topic: 'Will DNA methylation results be returned for all patients?',
        content: '<p>For CNS patients only, DNA methylation results will be returned to contacts indicated on the MCI Site Contact Form. For STS and RAR patients, DNA methylation array data will be banked without return of results to sites.</p>'
                +'<p>DNA methylation results will be returned for CNS patients with tissue submitted from a primary site or a metastatic site in the CNS only. Results from non-CNS metastatic tissue will be banked without return of results to sites.</p>',
    },
    {
        id: 'mciContent9',
        topic: 'What steps should be taken if germline findings are detected?',
        content: '<p>The participant’s physician should coordinate a referral for the participant and their family to do local genetic counseling. In this setting, familial cascade testing for the observed germline variant may be offered to the family where appropriate. Such testing typically takes the form of targeted Sanger or microarray analysis, performed in concert with pre and post-test genetic counseling on the significance of the genetic variant. Familial testing may be performed by the institutional molecular laboratory (if those services are available locally), or though typical send-out testing channels familiar to the clinician and counselor.</p>',
    },
    {
        id: 'mciContent10',
        topic: 'Who should I contact with questions about MCI results and data?',
        content: '<h4>MCI Results Contacts</h4>'
        +'<p>Technical questions about accessing results or result availability should be directed to IGM by phone at 614-722-5321 or email at <a href="mailto:IGMMCI@nationwidechildrens.org">IGMMCI@nationwidechildrens.org</a>.</p>'
        +'<p>Questions about results unrelated to a COG treatment trial should go to the following as appropriate:</p>'
        +'<ul><li>Central nervous system group: <a href="mailto:MCICNS@childrensoncologygroup.org">MCICNS@childrensoncologygroup.org</a></li>'
        +'<li>Soft tissue sarcoma group: <a href="mailto:MCISTS@childrensoncologygroup.org">MCISTS@childrensoncologygroup.org</a></li>'
        +'<li>Rare tumor group email: <a href="mailto:MCIRAR@childrensoncologygroup.org">MCIRAR@childrensoncologygroup.org</li></a></ul>'
        +'<p>Questions about results as they relate to a COG treatment trial should go to the treatment study Chair and Research Coordinator? See the [insert name of contact form] for these contacts.</p>'
        +'<h4>MCI Data Contact</h4>'
        +'<p>For questions related to MCI data or accessing the CCDI Data Ecosystem, contact <a href="mailto:ncichildhoodcancerdatainitiative@mail.nih.gov">ncichildhoodcancerdatainitiative@mail.nih.gov</a>.</p>',
    },
]
