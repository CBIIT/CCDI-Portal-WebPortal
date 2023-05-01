import newsCCDC from '../assets/news/News_CCDC.png';
import newsMolecular from '../assets/news/News_Molecular.png';
import newsSymposium from '../assets/news/News_Symposium.png';
import newsMolecularDetail from '../assets/news/News_MCI_Detail.png';
import newsSymposiumDetail from '../assets/news/News_Symposium_Detail.png';
import updateImgCCDC from '../assets/landing/Updates_CCDC.png';
import updateImgMolecular from '../assets/landing/Updates_Molecular.png';
import updateImgSymposium from '../assets/landing/Updates_Symposium.png';

export const newsList = [
    {
        id: 'ccdc',
        title: 'Childhood Cancer Data Catalog April Update ',
        date: 'APRIL 19, 2023',
        slug: 'The update includes one new resource, eight new datasets, and many other changes.',
        highlight: '<p>The <a href="https://datacatalog.ccdi.cancer.gov/" target="_blank" rel="noopener noreferrer">Childhood Cancer Data Catalog</a> is pleased to announce the addition of the Xena Browser, a powerful online exploration tool that allows users to investigate functional genomic data sets for correlations between genomic and/or phenotypic variables. Also, seven new datasets have been incorporated into eight existing resources.</p><p><a href="https://datacatalog.ccdi.cancer.gov/" rel="noreferrer noopener" target="_blank">Explore the Catalog</a> to check out all the changes.</p>',
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
        img: newsCCDC,
        updateImg: updateImgCCDC,
        detailImg: '',
    },
    {
        id: 'molecular',
        title: 'Molecular Characterization Initiative releases initial data',
        date: 'APRIL 5, 2023',
        slug: 'Genomics and clinical data for MCI participants is housed in NCI’s Cancer Data Service and accessible through CGC.',
        highlight: '<p>De-identified molecular characterization data (T/N WES, methylation, and Archer fusion), clinical reports, and demographic and phenotypic data from <a href="https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative/data-ecosystem/molecular-characterization?cid=eb_govdel" rel="noreferrer noopener" target="_blank">CCDI Molecular Characterization Initiative</a> participants are released each month under accession number <a href="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002790.v2.p1" rel="noreferrer noopener" target="_blank">phs00290.v2.p1</a>. The data are accessible through Cancer Genomics Cloud a secure workspace which allow users to upload their own data for aggregated analysis. Access can be requested through dbGaP’s <a href="https://www.youtube.com/watch?v=m0xp_cCO7kA" rel="noreferrer noopener" target="_blank">controlled-access process</a>. To date, there are data associated with 1,145 participants.</p>',
        fullText: '<p>The <a href="https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative/data-ecosystem/molecular-characterization?cid=eb_govdel" rel="noreferrer noopener" target="_blank">CCDI Molecular Characterization Initiative</a> (MCI) achieved a significant milestone in March, enrolling over 1,000 newly diagnosed children, adolescent, and young adults (AYAs) with certain types of cancer. This milestone means that over 1,000 eligible patients now have access to more precise diagnoses, which can aid healthcare providers in planning their treatment.&nbsp;</p>'
        +'<p>&nbsp;</p>'
        +'<p>Enrollment continues, free of charge, for children and AYAs newly diagnosed with central nervous system tumors, soft tissue sarcomas, and rare tumors who are receiving care from a Children&rsquo;s Oncology Group&ndash;affiliated hospital.&nbsp;</p>'
        +'<p>&nbsp;</p>'
        +'<p>MCI data&mdash;excluding personal details that identify participants&mdash;will continue to be released monthly, giving researchers an opportunity to '
        +'learn more about what drives various cancers, develop better clinical trials, and develop more effective treatments for childhood cancer.&nbsp;</p> <p>To join at this time, a child or AYA must:&nbsp;</p><ul><li><p>be newly diagnosed (have not had any treatments for their cancer yet)&nbsp;</p></li><li><p>be 25 years old or younger&nbsp;</p></li><li><p>be diagnosed with a central nervous system tumor (tumors of the brain and spine), soft tissue sarcoma, or rare tumor* (childhood cancers with a low number of patients, which have been hard to study and understand)&nbsp;</p></li><li><p>get cancer care from a hospital affiliated with the Children&rsquo;s Oncology Group&nbsp;</p></li></ul>'
        +'<p>&nbsp;</p>'
        +'<p>If a child or AYA meets the above criteria, they can get more information on how to participate by talking with their Children &#39;s Oncology Group&ndash;affiliated doctor. &nbsp</p>',
        type: 'Application Updates',
        img: newsMolecular,
        updateImg: updateImgMolecular,
        detailImg: newsMolecularDetail,
    },
    {
        id: 'symposium',
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
        img: newsSymposium,
        updateImg: updateImgSymposium,
        detailImg: newsSymposiumDetail,
    },
]