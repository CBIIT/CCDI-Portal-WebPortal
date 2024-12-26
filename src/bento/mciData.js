import userGuidePDF from '../assets/about/CCDI_Usage_Instructions_Nov2024_v2.5.0.pdf';

export const introText = '<p>The CCDI Molecular Characterization Initiative (MCI) provides state-of-the-art molecular testing at no cost to newly diagnosed children, adolescents, and young adults (AYAs) with central nervous system (CNS) tumors, soft tissue sarcomas (STS), certain rare (RAR) childhood cancers, and certain neuroblastomas (NBL) being treated at a Children’s Oncology Group (COG)–affiliated hospital. The goal of this initiative is to enhance the understanding of the genetic factors involved in pediatric cancers and to provide timely, clinically relevant findings to doctors and families. This project uses Project:EveryChild (APEC14B1) to enroll participants, collect specimens, and annotate clinical data. The results of genetic testing will be shared with the treating physician and participants or their family, aiding in treatment decisions. This will also determine eligibility for certain planned COG clinical trials.</p>'
                         +'<p>For an overview of this initiative, <a class="link" href="https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative/data-ecosystem/molecular-characterization" target="_blank" rel="noopener noreferrer">access the MCI web page on cancer.gov</a>.</p>'

export const MCIContent = [
    {
        id: 'MCI_Introduction',
        topic: 'Enrollment and Participation',
        list: [
            {
                id: 'Enrollment_Metrics',
                subtopic: 'APEC14B1-MCI Enrollment Metrics',
                content: '<p>The MCI enrollment metrics are based on counts of patients enrolled with MCI through Project:EveryChild (APEC14B1) and are based on monthly COG reporting.</p>',
                numberTable: {
                    title: 'List of Institutions for Enrollments in MCI (APEC14B1-MCI) by Diagnosis Type as of August 7, 2024',
                    header: ['Institution Name', 'CNS Diagnosis', 'Rare Tumor Diagnosis', 'STS Diagnosis'],
                    footer: 'Abbreviations: CNS, Central Nervous System; STS, Soft-tissue Sarcoma',
                    body: [["AdventHealth Orlando", 22, 4, 10, ], ["Advocate Children's Hospital-Oak Lawn", 30, 13, 81, ], ["Advocate Children's Hospital-Park Ridge", 26, 6, 96, ], ["Albany Medical Center", 27, 11, 91, ], ["Alberta Children's Hospital", 28, 5, 1, ], ["Alfred I duPont Hospital for Children", 24, 0, 11, ], ["Alliance for Childhood Diseases/Cure 4 the Kids Foundation", 18, 6, 70, ], ["Ann and Robert H Lurie Children's Hospital of Chicago", 22, 6, 21, ], ["Arkansas Children's Hospital", 26, 0, 30, ], ["Arnold Palmer Hospital for Children", 30, 3, 98, ], ["Ascension Saint Vincent Indianapolis Hospital", 25, 5, 29, ], ["Atrium Health Navicent", 29, 12, 28, ], ["Augusta University Medical Center", 18, 3, 40, ], ["Banner Children's at Desert", 18, 7, 26, ], ["Banner University Medical Center - Tucson", 30, 10, 1, ], ["Baylor College of Medicine/Dan L Duncan Comprehensive Cancer Center", 22, 8, 34, ], ["Baystate Medical Center", 23, 11, 20, ], ["Beaumont Children's Hospital-Royal Oak", 26, 2, 86, ], ["BI-LO Charities Children's Cancer Center", 24, 6, 68, ], ["Blank Children's Hospital", 26, 0, 83, ], ["British Columbia Children's Hospital", 20, 10, 2, ], ["Bronson Methodist Hospital", 28, 2, 42, ], ["Broward Health Medical Center", 27, 9, 58, ], ["C S Mott Children's Hospital", 29, 5, 28, ], ["CancerCare Manitoba", 19, 3, 89, ], ["Cardinal Glennon Children's Medical Center", 23, 3, 89, ], ["Carilion Children's", 25, 10, 0, ],
                    ["Carolinas Medical Center/Levine Cancer Institute", 25, 2, 72, ], ["Cedars-Sinai Medical Center", 21, 3, 32, ], ["Centre Hospitalier Universitaire de Sherbrooke-Fleurimont", 24, 1, 97, ], ["Centre Hospitalier Universitaire Sainte-Justine", 19, 4, 92, ], ["Children's Healthcare of Atlanta - Egleston", 24, 7, 89, ], ["Children's Hospital", 30, 7, 73, ], ["Children's Hospital and Medical Center of Omaha", 18, 0, 8, ], ["Children's Hospital Colorado", 25, 12, 45, ], ["Children's Hospital Los Angeles", 25, 2, 90, ], ["Children's Hospital Medical Center of Akron", 23, 1, 26, ], ["Children's Hospital New Orleans", 18, 2, 33, ], ["Children's Hospital of Alabama", 19, 6, 54, ], ["Children's Hospital of Eastern Ontario", 18, 3, 57, ], ["Children's Hospital of Michigan", 20, 7, 78, ], ["Children's Hospital of Orange County", 23, 7, 90, ], ["Children's Hospital of Philadelphia", 29, 9, 74, ], ["Children's Hospital of Pittsburgh of UPMC", 24, 7, 72, ], ["Children's Hospital of The King's Daughters", 27, 4, 40, ], ["Children's Hospital of Wisconsin", 30, 6, 56, ], ["Children's Hospitals and Clinics of Minnesota - Minneapolis", 26, 8, 73, ], ["Children's Mercy Hospitals and Clinics", 18, 5, 46, ], ["Children's National Medical Center", 25, 6, 99, ], ["Christchurch Hospital", 24, 10, 84, ], ["CHRISTUS Children's", 26, 12, 42, ], ["CHU de Quebec-Centre Hospitalier de l'Universite Laval (CHUL)", 24, 10, 43, ],
                    ["Cincinnati Children's Hospital Medical Center", 20, 1, 8, ], ["City of Hope Comprehensive Cancer Center", 28, 4, 92, ], ["Cleveland Clinic Foundation", 19, 8, 9, ], ["Connecticut Children's Medical Center", 25, 11, 46, ], ["Cook Children's Medical Center", 26, 7, 90, ], ["Covenant Children's Hospital", 29, 4, 94, ], ["Dana-Farber/Harvard Cancer Center", 20, 2, 89, ], ["Dartmouth Hitchcock Medical Center/Dartmouth Cancer Center", 28, 12, 52, ], ["Dayton Children's Hospital", 30, 15, 51, ], ["Dell Children's Medical Center of Central Texas", 29, 6, 15, ], ["Driscoll Children's Hospital", 24, 8, 1, ], ["Duke University Medical Center", 23, 9, 17, ], ["East Carolina University", 28, 9, 68, ], ["East Tennessee Childrens Hospital", 30, 11, 27, ], ["Eastern Maine Medical Center", 30, 3, 7, ], ["Edwards Comprehensive Cancer Center", 18, 8, 44, ], ["El Paso Children's Hospital", 26, 7, 16, ], ["Geisinger Medical Center", 24, 9, 39, ], ["Golisano Children's Hospital of Southwest Florida", 18, 8, 35, ], ["Hackensack University Medical Center", 30, 7, 81, ], ["Helen DeVos Children's Hospital at Spectrum Health", 22, 7, 2, ], ["HIMA San Pablo Oncologic Hospital", 22, 3, 61, ], ["Hospital for Sick Children", 19, 5, 56, ], ["Inova Fairfax Hospital", 30, 13, 80, ], ["IWK Health Centre", 27, 7, 87, ], ["Janeway Child Health Centre", 20, 8, 27, ], ["Jersey Shore University Medical Center", 30, 7, 69, ],
                    ["Jim Pattison Children's Hospital", 21, 9, 79, ], ["John Hunter Children's Hospital", 20, 2, 10, ], ["Johns Hopkins All Children's Hospital", 23, 5, 39, ], ["Johns Hopkins University/Sidney Kimmel Cancer Center", 18, 1, 45, ], ["Kaiser Permanente Downey Medical Center", 29, 9, 69, ], ["Kaiser Permanente-Oakland", 27, 13, 24, ], ["Kapiolani Medical Center for Women and Children", 25, 6, 80, ], ["King Faisal Specialist Hospital and Research Centre", 23, 11, 70, ], ["Kingston Health Sciences Centre", 22, 0, 49, ], ["Laura and Isaac Perlmutter Cancer Center at NYU Langone", 24, 6, 59, ], ["Lehigh Valley Hospital-Cedar Crest", 25, 1, 58, ], ["Loma Linda University Medical Center", 25, 1, 42, ], ["Loyola University Medical Center", 23, 5, 56, ], ["Lucile Packard Children's Hospital Stanford University", 22, 9, 66, ], ["M D Anderson Cancer Center", 19, 5, 87, ], ["Madigan Army Medical Center", 27, 0, 89, ], ["Maimonides Medical Center", 27, 3, 45, ], ["Maine Children's Cancer Program", 21, 10, 53, ], ["Marshfield Medical Center-Marshfield", 26, 4, 9, ], ["Mary Bridge Children's Hospital and Health Center", 25, 6, 65, ], ["Massachusetts General Hospital Cancer Center", 30, 14, 50, ], ["Mattel Children's Hospital UCLA", 18, 8, 17, ], ["Mayo Clinic", 29, 9, 93, ], ["McMaster Children's Hospital at Hamilton Health Sciences", 21, 5, 58, ], ["Medical City Dallas Hospital", 21, 2, 93, ],
                    ["Medical University of South Carolina", 30, 3, 3, ], ["MedStar Georgetown University Hospital", 21, 6, 12, ], ["Memorial Health University Medical Center", 18, 4, 64, ], ["Memorial Regional Hospital/Joe DiMaggio Children's Hospital", 25, 3, 47, ], ["Memorial Sloan Kettering Cancer Center", 24, 4, 7, ], ["Mercy Hospital Saint Louis", 21, 5, 41, ], ["Methodist Children's Hospital of South Texas", 25, 7, 61, ], ["Miami Cancer Institute", 25, 9, 94, ], ["Michigan State University Clinical Center", 26, 3, 13, ], ["Miller Children's and Women's Hospital Long Beach", 24, 12, 70, ], ["Mission Hospital", 23, 7, 58, ], ["Monash Medical Center-Clayton Campus", 21, 7, 84, ], ["Montefiore Medical Center - Moses Campus", 27, 1, 82, ], ["Morristown Medical Center", 28, 13, 47, ], ["Mount Sinai Hospital", 23, 2, 92, ], ["MUHC-Women's and Children's Hospital", 27, 2, 25, ], ["Natalie Warren Bryant Cancer Center at Saint Francis", 20, 0, 47, ], ["National Institutes of Health Clinical Center", 29, 6, 40, ], ["Nationwide Children's Hospital", 26, 7, 69, ], ["Naval Medical Center - Portsmouth", 25, 8, 79, ], ["Naval Medical Center -San Diego", 22, 9, 74, ], ["Nemours Children's Clinic-Jacksonville", 26, 10, 82, ], ["Nemours Children's Hospital", 22, 4, 84, ], ["New York Medical College", 23, 3, 39, ], ["Newark Beth Israel Medical Center", 20, 10, 80, ], ["Nicklaus Children's Hospital", 29, 10, 80, ],
                    ["Northwestern Medicine Central DuPage Hospital", 29, 11, 28, ], ["Norton Children's Hospital", 29, 9, 1, ], ["Novant Health Presbyterian Medical Center", 20, 5, 70, ], ["NYP/Columbia University Medical Center/Herbert Irving Comprehensive Cancer Center", 25, 3, 8, ], ["NYP/Weill Cornell Medical Center", 23, 11, 79, ], ["NYU Langone Hospital - Long Island", 26, 1, 20, ], ["Ochsner Medical Center Jefferson", 28, 4, 93, ], ["Oregon Health and Science University", 24, 8, 41, ], ["Penn State Children's Hospital", 23, 8, 19, ], ["Perth Children's Hospital", 22, 5, 22, ], ["Phoenix Childrens Hospital", 22, 1, 88, ], ["Presbyterian Hospital", 26, 0, 93, ], ["Primary Children's Hospital", 29, 7, 78, ], ["Prisma Health Richland Hospital", 28, 1, 32, ], ["ProMedica Toledo Hospital/Russell J Ebeid Children's Hospital", 20, 7, 55, ], ["Providence Alaska Medical Center", 20, 9, 97, ], ["Providence Sacred Heart Medical Center and Children's Hospital", 30, 5, 25, ], ["Queensland Children's Hospital", 27, 8, 57, ], ["Rady Children's Hospital - San Diego", 23, 0, 61, ], ["Rainbow Babies and Childrens Hospital", 29, 2, 17, ], ["Randall Children's Hospital at Legacy Emanuel", 18, 1, 69, ], ["Renown Regional Medical Center", 21, 9, 8, ], ["Rhode Island Hospital", 20, 3, 92, ], ["Riley Hospital for Children", 21, 2, 16, ], ["Rocky Mountain Hospital for Children-Presbyterian Saint Luke's Medical Center", 20, 9, 64, ],
                    ["Roswell Park Cancer Institute", 28, 11, 74, ], ["Royal Children's Hospital", 20, 4, 72, ], ["Rutgers Cancer Institute of New Jersey-Robert Wood Johnson University Hospital", 22, 9, 84, ], ["Sacred Heart Hospital", 21, 10, 71, ], ["Saint Christopher's Hospital for Children", 20, 3, 46, ], ["Saint Joseph's Hospital/Children's Hospital-Tampa", 19, 1, 35, ], ["Saint Joseph's Regional Medical Center", 22, 10, 57, ], ["Saint Jude Children's Research Hospital", 26, 5, 59, ], ["Saint Jude Midwest Affiliate", 23, 5, 80, ], ["Saint Luke's Cancer Institute - Boise", 28, 13, 33, ], ["Saint Mary's Hospital", 27, 8, 13, ], ["Saint Peter's University Hospital", 26, 12, 45, ], ["Saint Vincent Hospital Cancer Center Green Bay", 22, 8, 91, ], ["Sanford Broadway Medical Center", 22, 6, 11, ], ["Sanford USD Medical Center - Sioux Falls", 29, 4, 81, ], ["Santa Barbara Cottage Hospital", 28, 12, 93, ], ["Scott and White Memorial Hospital", 25, 1, 61, ], ["Seattle Children's Hospital", 20, 4, 1, ], ["Sinai Hospital of Baltimore", 28, 3, 94, ], ["Southern Illinois University School of Medicine", 27, 9, 23, ], ["Starship Children's Hospital", 26, 13, 65, ], ["State University of New York Upstate Medical University", 23, 8, 2, ], ["Stony Brook University Medical Center", 21, 4, 27, ], ["Sutter Medical Center Sacramento", 26, 3, 78, ], ["Sydney Children's Hospital", 18, 4, 44, ], ["T C Thompson Children's Hospital", 18, 0, 57, ],
                    ["Tampa General Hospital", 26, 8, 86, ], ["Texas Tech University Health Sciences Center-Amarillo", 19, 0, 72, ], ["The Children's Hospital at TriStar Centennial", 21, 7, 9, ], ["The Children's Hospital at Westmead", 20, 10, 2, ], ["The Montreal Children's Hospital of the MUHC", 24, 7, 11, ], ["The Steven and Alexandra Cohen Children's Medical Center of New York", 29, 1, 94, ], ["Tripler Army Medical Center", 21, 8, 25, ], ["UCSF Benioff Children's Hospital Oakland", 28, 3, 38, ], ["UCSF Medical Center-Mission Bay", 20, 10, 8, ], ["UMass Memorial Medical Center - University Campus", 23, 1, 27, ], ["UMC Cancer Center / UMC Health System", 23, 4, 78, ], ["UNC Lineberger Comprehensive Cancer Center", 26, 3, 78, ], ["University of Alberta Hospital", 23, 0, 42, ], ["University of California Davis Comprehensive Cancer Center", 23, 0, 75, ], ["University of Chicago Comprehensive Cancer Center", 29, 13, 1, ], ["University of Florida Health Science Center - Gainesville", 29, 4, 38, ], ["University of Illinois", 29, 6, 4, ], ["University of Iowa/Holden Comprehensive Cancer Center", 28, 4, 90, ], ["University of Kentucky/Markey Cancer Center", 30, 15, 34, ], ["University of Maryland/Greenebaum Cancer Center", 27, 2, 25, ], ["University of Miami Miller School of Medicine-Sylvester Cancer Center", 20, 0, 47, ], ["University of Minnesota/Masonic Cancer Center", 29, 6, 40, ], ["University of Mississippi Medical Center", 26, 7, 69, ],
                    ["University of Nebraska Medical Center", 25, 8, 79, ], ["University of New Mexico Cancer Center", 22, 9, 74, ], ["University of Oklahoma Health Sciences Center", 26, 10, 82, ], ["University of Rochester", 22, 4, 84, ], ["University of Texas Health Science Center at San Antonio", 23, 3, 39, ], ["University of Vermont and State Agricultural College", 20, 10, 80, ], ["University of Virginia Cancer Center", 29, 10, 80, ], ["University of Wisconsin Carbone Cancer Center", 29, 11, 28, ], ["University Pediatric Hospital", 29, 9, 1, ], ["USA Health Strada Patient Care Center", 20, 5, 70, ], ["UT Southwestern/Simmons Cancer Center-Dallas", 25, 3, 8, ], ["Valley Children's Hospital", 23, 11, 79, ], ["Vanderbilt University/Ingram Cancer Center", 26, 1, 20, ], ["Vannie Cook Children's Clinic", 28, 4, 93, ], ["Virginia Commonwealth University/Massey Cancer Center", 24, 8, 41, ], ["Wake Forest University Health Sciences", 23, 8, 19, ], ["Walter Reed National Military Medical Center", 22, 5, 22, ], ["Washington University School of Medicine", 22, 1, 88, ], ["Wesley Medical Center", 26, 0, 93, ], ["West Virginia University Charleston Division", 29, 7, 78, ], ["West Virginia University Healthcare", 28, 1, 32, ], ["Women's and Children's Hospital-Adelaide", 20, 7, 55, ], ["Yale University", 20, 9, 97, ], ],
                },
                diseaseTable: {
                    title: 'Enrollments in MCI (APEC14B1-MCI) by Diagnosis Type as of November 12, 2024',
                    header: ['', 'Primary Diagnosis Disease Group', 'Number of Participants'],
                    body: [{ name: 'Central Nervous System', value: 3503}, {name: 'Soft Tissue Sarcoma', value: 1061}, {name: 'Rare Tumors', value: 497}, {name: 'Neuroblastoma', value: 265}, {name: 'Ewing Sarcoma', value: 16}, {name: 'Osteosarcoma', value: 10}, {name: 'Germ Cell Tumor', value: 11}, {name: 'Myeloid Leukemia', value: 4}, {name: 'Renal', value: 8}, {name: 'Liver Tumor', value: 4}, {name: 'Non-Hodgkin Lymphoma', value: 3}, {name: 'Lymphoblastic Leukemia', value: 2}, {name: 'Langerhans Cell Histiocytosis', value: 1}, {name: 'Lymphoproliferative Disease', value: 1}],
                },
                diseaseDonut: {
                    title: 'Enrollment',
                    data: [{ name: 'Central Nervous System', value: 3503}, {name: 'Soft Tissue Sarcoma', value: 1061}, {name: 'Rare Tumors', value: 497}, {name: 'Neuroblastoma', value: 265}, {name: 'Ewing Sarcoma', value: 16}, {name: 'Osteosarcoma', value: 10}, {name: 'Germ Cell Tumor', value: 11}, {name: 'Myeloid Leukemia', value: 4}, {name: 'Renal', value: 8}, {name: 'Liver Tumor', value: 4}, {name: 'Non-Hodgkin Lymphoma', value: 3}, {name: 'Lymphoblastic Leukemia', value: 2}, {name: 'Langerhans Cell Histiocytosis', value: 1}, {name: 'Lymphoproliferative Disease', value: 1}]
                },
                donut: {
                    title: 'Enrollments in MCI (APEC14B1-MCI) by Diagnosis Type as of November 12, 2024',
                    data: [{name: 'Central Nervous System', value: 2704}, {name: 'Rare Tumors', value: 355}, {name: 'Soft Tissue Sarcoma', value: 815}, {name: 'Neuroblastoma', value: 98}],
                },
                map: {
                    data: [ 
                        [110, 540, "ALASKA", 2], //AK
                        [638, 420, "ALABAMA", 107], //AL
                        [550, 390, "ARKANSAS", 15], //AR
                        [240, 430, "ARIZONA", 75], //AZ
                        [100, 280, "CALIFORNIA", 415], //CA
                        [320, 290, "COLORADO", 22], //CO
                        [834, 228, "CONNECTICUT", 52], //CT
                        [790, 305, "DISTRICT OF COLUMBIA", 48], //DC
                        [810, 290, "DELEWARE", 52], //DE
                        [735, 500, "FLORIDA", 277], //FL
                        [720, 450, "GEORGIA", 159], //GA
                        [340, 630, "HAWAII", 15], //HI
                        [505, 250, "IOWA", 71], //IA
                        [240, 220, "IDAHO", 35], //ID
                        [600, 320, "ILLINOIS", 90], //IL
                        [638, 285, "INDIANA", 91], //IN
                        [490, 330, "KANSAS", 0], //KS
                        [670, 330, "KENTUCKY", 57], //KY
                        [550, 460, "LOUISIANA", 39], //LA
                        [840, 208, "MASSACHUSETTS", 46], //MA
                        [785, 288, "MARYLAND", 79], //MD
                        [860, 120, "MAINE", 19], //ME
                        [645, 210, "MICHIGAN", 117], //MI
                        [515, 150, "MINNESOTA", 143], //MN
                        [530, 310, "MISSOURI", 116], //MO
                        [600, 420, "MISSISSIPPI", 49], //MS
                        [785, 355, "NORTH CAROLINA", 144], //NC
                        [440, 135, "NORTH DAKOTA", 20], //ND
                        [460, 285, "NEBRASKA", 54], //NE
                        [843, 185, "NEW HAMPSHIRE", 11], //NH
                        [815, 265, "NEW JERSEY", 63], //NJ
                        [330, 430, "NEW MEXICO", 34], //NM
                        [160, 260, "NEVADA", 3], //NV
                        [795, 190, "NEW YORK", 296], //NY
                        [690, 300, "OHIO", 273], //OH
                        [490, 410, "OKLAHOMA", 73], //OK
                        [150, 200, "OREGON", 40], //OR
                        [780, 245, "PENNSYLVANIA", 184], //PA
                        [853, 222, "RHODE ISLAND", 37], //RI
                        [720, 395, "SOUTH CAROLINA", 70], //SC
                        [410, 195, "SOUTH DAKOTA", 11], //SD
                        [675, 370, "TENNESSEE", 97], //TN
                        [480, 490, "TEXAS", 520], //TX
                        [240, 275, "UTAH", 94], //UT
                        [765, 310, "VIRGINIA", 91], //VA
                        [825, 170, "VERMONT", 20], //VT
                        [150, 100, "WASHINGTON", 266], //WA
                        [570, 190, "WISCONSIN", 163], //WI
                        [720, 330, "WEST VIRGINIA", 7], //WV
                      ],
                }
            },
            {
                id: 'MCI_Participation',
                subtopic: 'MCI Participation',
                content: '<p>Patients are required to enroll in APEC14B1 before participating in MCI, and those eligible to participate need to enroll in MCI and consent to molecular characterization. Currently, only patients with newly diagnosed CNS, STS, RAR, and NBL tumors will be eligible to participate. Patients enrolling in APEC14B1 with secondary or second malignancy are not eligible to participate in MCI.</p>',
            },
        ]
    },
    {
        id: 'Testing_and_Results',
        topic: 'Testing and Results',
        list: [
            {
                id: 'Testing Types',
                subtopic: 'Testing Types',
                content:'<h3>What types of testing will be conducted on the specimens submitted for MCI?</h3>'
                        +'<p>The Steve and Cindy Rasmussen Institute for Genomic Medicine (IGM) at Nationwide Children’s Hospital in Columbus, OH, will conduct:</p>'
                        +'<ul><li>Enhanced paired tumor–normal exome sequencing (ES)</li>'
                        +'<li>A targeted RNA Solid Tumor Fusion assay*</li>'
                        +'<li>A DNA-based methylation array assay for CNS tumor classification</li></ul>',
                table: {
                    title: 'Clinical Molecular Characterization Initiative Assays and Analytics',
                    header: ['Sample', 'Assay', 'Result Type'],
                    body: ['Tumor + normal DNA', 'Enhanced ES', 'Germline + somatic SNVs, INDELs, CNV & LOH', 'Tumor RNA', 'Targeted RNA Solid Tumor Fusion assay', 'Fusion/ITD detection', 'Tumor DNA', 'DNA based methylation array for CNS tumor classification', 'Disease classification'],
                    footer: 'Abbreviations: ES, exome sequencing; AWS, Amazon Web Services; SNV, single-nucleotide variant; INDEL, insertion/deletion; CNV, copy number variation; LOH, loss of heterozygosity; ITD, internal tandem duplication [PMID: 29539639].',
                },
                annotation: '*The RNA Solid Tumor Fusion assay is not performed on NBL tumors.'
            },
            {
                id: 'MCI_Results_Reporting',
                subtopic: 'MCI Results Reporting',
                content: '<h3>When and how are MCI results provided?</h3>'
                        +'<p>Results from molecular testing are returned within 21 days of receipt of all required materials at the COG Biobank hosted by the Biopathology Center (BPC) at Nationwide Children’s Hospital. Once nucleic acid has been received within IGM from the BPC, results will be issued into the portal within 14 days. As each test is resulted, an email will be sent to the clinician and clinical research associate contacts listed on a contact form filled out by the participant’s care team. The email will include a link to the secure web portal where results can be accessed. Participants will receive results from their treating physician.</p>',
            },
            {
                content: '<h3>What type of results will be reported for exome sequencing (ES)?</h3>'
                        +'<p>Somatic disease–germline comparator sequencing is a paired tumor–normal exome analysis which incorporates an exome reagent assaying the coding regions of more than 19,000 protein-coding genes. In the setting of both germline and somatic analysis, only cancer-related genomic variation is reported.</p>'
                        +'<p>For germline analysis, the report is focused on pathogenic or likely pathogenic variation in cancer-associated genes; however, variants of uncertain significance in genes with clear association to the cancer type under study may be reported. Germline variants are classified using the ACMG/AMP guidelines (PMID: 25741868). Secondary or incidental findings are not reported. For somatic analysis, the report is focused on Tier I and Tier II variants (strong or potential significance, respectively) as classified according to the AMP/ASCO/CAP guidelines (PMID: 27993330). Cancer-associated copy number variation from either germline or somatic analysis is classified in accordance with ACMG/CGC guidelines with reporting of Tier 1 and Tier 2 variants (strong or some known clinical significance, respectively; PMID: 31138931).</p>'
                        +'<p>Due to the nature of exome sequencing, full gene coverage is not guaranteed. This assay does not detect exon-level deletions or duplications and may not be capable of detecting gene-level copy number variation below 105kb resolution. This testing is not intended for carrier screening. The report incorporates information curated from the medical literature, genetic databases, and variant knowledgebases, which are subject to change over time due to new scientific discoveries. The report must be considered within the clinical context of the patient, in conjunction with other relevant findings and clinical history.</p>'
                        +'<p>Here is a list of genes that are reviewed for germline and somatic variation in the setting of this analysis (as of August 30, 2024). These cancer-associated genes have been curated from medical and scientific literature, databases, and professional guidelines.</p>',
                searchTable: {
                    title: 'List of Genes Reviewed for Germline and Somatic Variation as of August 30, 2024',
                    body: 'A1CF, ABCA4, ABCD1, ABI1, ABL1, ABL2, ABRAXAS1, ACD, ACKR3, ACSL3, ACSL6, ACVR1, ACVR1B, ACVR2A, ADCY8, AFDN, AFF1, AFF3, AFF4, AIP, AKAP9, AKT1, AKT2, AKT3, ALDH2, ALK, AMER1, ANK1, ANKRD26, APC, APOBEC3B, AR, ARAF, ARHGAP26, ARHGAP35, ARHGAP5, ARHGEF10, ARHGEF10L, ARHGEF12, ARID1A, ARID1B, ARID2, ARID5B, ARMC5, ARNT, ASPM, ASPSCR1, ASXL1, ASXL2, ATE1, ATF1, ATG2B, ATIC, ATM, ATP1A1, ATP2B3, ATR, ATRX, AXIN1, AXIN2, B2M, BAP1, BARD1, BAX, BAZ1A, BCL10, BCL11A, BCL11B, BCL2, BCL2L12, BCL3, BCL6, BCL7A, BCL9, BCL9L, BCLAF1, BCOR, BCORL1, BCR, BEND2, BIRC3, BIRC6, BLM, BMP4, BMP5, BMPR1A, BRAF, BRCA1, BRCA2, BRD3, BRD4, BRIP1, BTG1, BTG2, BTK, BUB1B, CACNA1D, CALR, CAMTA1, CANT1, CARD11, CARS1, CASP10, CASP3, CASP8, CASP9, CAVIN1, CBFA2T3, CBFB, CBL, CBLB, CBLC, CCDC6, CCNB1IP1, CCNC, CCND1, CCND2, CCND3, CCNE1, CCR4, CCR7, CD209, CD274, CD28, CD74, CD79A, CD79B, CDC25A, CDC5L, CDC73, CDH1, CDH10, CDH11, CDH17, CDK12, CDK4, CDK6, CDKN1A, CDKN1B, CDKN1C, CDKN2A, CDKN2B, CDKN2C, CDX2, CEBPA, CEP43,'
                         +'CEP57, CEP89, CHCHD7, CHD2, CHD4, CHD7, CHEK2, CHIC2, CHN1, CHST11, CIC, CIITA, CLIP1, CLP1, CLTC, CLTCL1, CNBD1, CNBP, CNOT3, CNTNAP2, CNTRL, COL1A1, COL2A1, COL3A1, COPS3, COX6C, CPEB3, CREB1, CREB3L1, CREB3L2, CREBBP, CRLF2, CRNKL1, CRTC1, CRTC3, CSF1R, CSF3R, CSMD3, CSNK2B, CTC1, CTCF, CTDNEP1, CTNNA1, CTNNA2, CTNNA3, CTNNB1, CTNND1, CTNND2, CTR9, CTRC, CUL3, CUX1, CXCR4, CYLD, CYP2C8, CYSLTR2, DAXX, DCAF12L2, DCC, DCTN1, DDB2, DDIT3, DDR2, DDX10, DDX31, DDX3X, DDX41, DDX5, DDX6, DEK, DGCR8, DICER1, DIP2B, DIS3, DIS3L2, DKC1, DLG2, DNAJB1, DNAJC21, DNM2, DNMT3A, DROSHA, DUSP10, DUX4L1, E2F3, EBF1, ECT2L, EED, EFL1, EFR3A, EGFR, EIF1AX, EIF3E, EIF3H, EIF4A2, ELANE, ELF3, ELF4, ELK4, ELL, ELN, ELP1, EML4, EP300, EPAS1, EPCAM, EPHA3, EPHA7, EPS15, ERBB2, ERBB3, ERBB4, ERC1, ERCC1, ERCC2, ERCC3, ERCC4, ERCC5, ERCC6L, ERF, ERG, ESR1, ETNK1, ETV1, ETV4, ETV5, ETV6, EWSR1, EXO1, EXT1, EXT2, EZH2, EZHIP, EZR, FADD, FAM111B, FAM131B, FAM135B, FAM47C, FANCA, FANCB, FANCC, FANCD2, FANCE, FANCF, FANCG,'
                         +'FANCI, FANCL, FANCM, FAP, FAS, FAT1, FAT3, FAT4, FBLN2, FBXO11, FBXW7, FCGR2B, FCRL4, FEN1, FES, FEV, FGF19, FGFR1, FGFR2, FGFR3, FGFR4, FH, FHIT, FIP1L1, FKBP9, FLCN, FLG, FLI1, FLNA, FLT3, FLT4, FNBP1, FOXA1, FOXL2, FOXO1, FOXO3, FOXO4, FOXP1, FOXR1, FOXR2, FRG1, FRG2, FSTL3, FUBP1, FUS, G6PC3, GALNT1, GALNT12, GAR1, GAS7, GATA1, GATA2, GATA3, GFI1, GFI1B, GLI1, GLI2, GMPS, GNA11, GNAQ, GNAS, GOLGA5, GOLPH3, GOPC, GPC3, GPC4, GPC5, GPHN, GPR101, GPR161, GPS2, GREM1, GRIN2A, GRM3, GSE1, GSK3B, GSKIP, H3-3A, H3-3B, H3C1, H3C10, H3C11, H3C12, H3C13, H3C14, H3C15, H3C3, H3C4, H3C6, H3C7, H3C8, H4C9, HACE1, HAX1, HERPUD1, HEY1, HGF, HIF1A, HIP1, HLA-A, HLF, HMGA1, HMGA2, HMGN2P46, HNF1A, HNRNPA2B1, HOOK3, HOXA11, HOXA13, HOXA9, HOXB13, HOXC11, HOXC13, HOXD11, HOXD13, HRAS, HSP90AA1, HSP90AB1, HUNK, ID2, ID3, IDH1, IDH2, IGF1R, IGF2, IGF2BP2, IGF2R, IGH, IGK, IGL, IKBKB, IKZF1, IKZF3, IL2, IL21R, IL6ST, IL7R, IRF4, IRS2, IRS4, ISX, ITGAV, ITK, JAK1, JAK2, JAK3, JAZF1, JUN, KANK1, KAT6A, KAT6B, KAT7,'
                         +'KBTBD4, KCNJ5, KDM1A, KDM3A, KDM3B, KDM4C, KDM5A, KDM5C, KDM6A, KDM7A, KDR, KDSR, KEAP1, KIAA1549, KIF1B, KIF5B, KIT, KLF4, KLF6, KLHL1, KLK2, KMT2A, KMT2C, KMT2D, KNL1, KNSTRN, KRAS, KTN1, LAMA5, LAP3, LARP4B, LASP1, LATS1, LATS2, LCK, LCP1, LEF1, LEPROTL1, LHFPL6, LIFR, LIG1, LIG4, LMNA, LMO1, LMO2, LPP, LRIG3, LRP1B, LSAMP, LSM14A, LYL1, LYN, LZTR1, MACC1, MAD2L2, MAF, MAFB, MALAT1, MALT1, MAML2, MAMLD1, MAP2K1, MAP2K2, MAP2K4, MAP3K1, MAP3K13, MAPK1, MAX, MB21D2, MBD4, MC1R, MDH2, MDM2, MDM4, MDS2, MECOM, MED12, MEN1, MET, MFN2, MGMT, MITF, MLF1, MLH1, MLH3, MLLT1, MLLT10, MLLT11, MLLT3, MLLT6, MN1, MNX1, MPL, MRE11, MRTFA, MSH2, MSH3, MSH6, MSI2, MSN, MTAP, MTCP1, MTOR, MUC1, MUC16, MUC4, MUC6, MUTYH, MYB, MYC, MYCL, MYCN, MYD88, MYH11, MYH9, MYNN, MYO5A, MYOD1, MYOG, N4BP2, NAB2, NACA, NAF1, NBEA, NBN, NCKIPSD, NCOA1, NCOA2, NCOA4, NCOR1, NCOR2, NDRG1, NF1, NF2, NFATC2, NFE2L2, NFIA, NFIB, NFKB2, NFKBIE, NHP2, NIN, NKX2-1, NONO, NOP10, NOTCH1, NOTCH2, NPAT, NPM1, NR2F2, NR4A3, NRAS, NRG1,'
                         +'NSD1, NSD2, NSD3, NT5C2, NTHL1, NTRK1, NTRK2, NTRK3, NUMA1, NUP214, NUP98, NUTM1, NUTM2A, NUTM2B, NUTM2D, NXN, NYNRIN, OLIG2, OMD, OTX2, P2RY8, PABPC1, PAFAH1B2, PALB2, PALLD, PARN, PATZ1, PAX3, PAX5, PAX6, PAX7, PAX8, PBRM1, PBX1, PCBP1, PCM1, PCSK7, PDCD1LG2, PDE4DIP, PDGFB, PDGFRA, PDGFRB, PER1, PHF6, PHOX2B, PICALM, PIGA, PIK3C2B, PIK3CA, PIK3CB, PIK3R1, PIK3R3, PIM1, PINK1, PLAG1, PLAGL1, PLAGL2, PLCG1, PLEC, PMEL, PML, PMS1, PMS2, POLD1, POLD3, POLE, POLG, POLQ, POLR2A, POT1, POU2AF1, POU2AF3, POU5F1, POU6F2, PPARG, PPFIBP1, PPM1D, PPP2R1A, PPP6C, PRCC, PRDM1, PRDM16, PRDM2, PREX2, PRF1, PRKACA, PRKAR1A, PRKCB, PRKD1, PRPF40B, PRRX1, PRSS1, PSIP1, PTCH1, PTCH2, PTEN, PTK6, PTPN11, PTPN13, PTPN6, PTPRB, PTPRC, PTPRD, PTPRK, PTPRT, PWWP2A, QKI, RAB27A, RABEP1, RAC1, RAD17, RAD21, RAD50, RAD51B, RAD51C, RAD51D, RAF1, RAG1, RAG2, RALGDS, RANBP17, RANBP2, RAP1B, RAP1GDS1, RARA, RASA2, RB1, RBM10, RBM15, RBM8A, RECQL, RECQL4, REL, RELA, REST, RET, RFWD3, RGPD3, RGS7, RHBDF2, RHOA, RHOH, RHPN2,'
                         +'RIT1, RMI2, RNF213, RNF43, ROBO2, ROS1, RPL10, RPL11, RPL15, RPL22, RPL23, RPL26, RPL27, RPL31, RPL35A, RPL5, RPN1, RPS10, RPS17, RPS19, RPS20, RPS24, RPS26, RPS27, RPS28, RPS29, RPS7, RRAS2, RSPO2, RSPO3, RTEL1, RUNX1, RUNX1T1, RUNX2, RXRA, S100A7, SALL4, SAMD9, SAMD9L, SBDS, SCG5, SCN9A, SDC4, SDHA, SDHAF2, SDHB, SDHC, SDHD, SEPTIN5, SEPTIN6, SEPTIN9, SET, SETBP1, SETD1B, SETD2, SETDB1, SF3B1, SFPQ, SFRP4, SGK1, SH2B3, SH2D1A, SH3GL1, SHOC2, SHROOM2, SHTN1, SIRPA, SIX1, SIX2, SKI, SLC29A3, SLC34A2, SLC45A3, SLX4, SMAD2, SMAD3, SMAD4, SMAD7, SMARCA4, SMARCB1, SMARCD1, SMARCE1, SMC1A, SMO, SNCAIP, SND1, SNX29, SOCS1, SOS1, SOS2, SOX2, SOX21, SPECC1, SPEN, SPINK1, SPOP, SPRED1, SRC, SRGAP3, SRP72, SRSF2, SRSF3, SS18, SS18L1, SSX1, SSX2, SSX4, STAG1, STAG2, STAT3, STAT5B, STAT6, STIL, STK11, STRN, STX11, STXBP2, SUB1, SUFU, SUPT3H, SUZ12, SYK, SYNCRIP, TACC3, TAF15, TAL1, TAL2, TBL1XR1, TBR1, TBX3, TCEA1, TCF12, TCF3, TCF4, TCF7L1, TCF7L2, TCL1A, TCL6, TEC, TENT5C, TERC, TERT, TET1, TET2, TFE3,'
                         +'TFEB, TFG, TFPT, TFRC, TGFBR1, TGFBR2, THRAP3, TINF2, TLX1, TLX3, TMEM127, TMPRSS2, TMSB4X, TNC, TNFAIP3, TNFRSF14, TNFRSF17, TNRC18, TOP1, TOP3A, TP53, TP63, TPM3, TPM4, TPR, TPTE2, TRA, TRAF7, TRB, TRD, TRG, TRIM24, TRIM27, TRIM28, TRIM33, TRIM37, TRIP11, TRIP13, TRRAP, TSC1, TSC2, TSHR, TSR2, TTL, TYK2, U2AF1, UBE2T, UBR5, UNC13D, USP44, USP6, USP8, USP9X, VAV1, VEGFA, VHL, VPS53, VTI1A, WAS, WDCP, WIF1, WNK2, WRAP53, WRN, WT1, WWOX, WWTR1, XPA, XPC, XPO1, XPO5, XRCC2, YAP1, YWHAE, ZBTB16, ZCCHC8, ZEB1, ZFHX3, ZFTA, ZIC1, ZMYM2, ZMYM3, ZNF331, ZNF384, ZNF429, ZNF479, ZNF521, ZNRF3, ZRSR2'
                  
                },
            },
            {
                content: '<h3>What genes are included in the targeted RNA Solid Fusion assay?</h3>'
                        +'<p>The gene targets below are included in the Solid Tumor fusion assay (v2), which utilizes anchored multiplex PCR (ArcherDx) followed by next-generation sequencing to identify gene fusions or intragenic structural rearrangements, such as internal tandem duplications. Based on the methodology, if one fusion partner is encompassed in the assay, there is a high sensitivity to detect the other partner. For example, the assay targets critical regions within BRAF known to be involved in gene fusion events, which would allow this test to detect a fusion with a common partner such as KIAA1549. This assay would also enable detection of more rare or novel gene partners associated with a BRAF fusion if the tumor harbored such an event.</p>'
                        +'<p>Here are the gene targets included in this assay.</p>',
                searchTable: {
                    title: 'Gene Targets included in this Assay (as of June 29, 2023)',
                    body: 'ABL1, ABL2, ACVR2A, AKT1, AKT2, AKT3, ALK, AR, ARHGAP26, ARHGAP6, AXL, BCOR, BRAF, BRD3, BRD4, C11orf95, CAMTA1, CCNB3, CCND1, CD274, CIC, CREB3L2, CRTC1, CSF1, CSF1R, CTNNB1, DNAJB1, EGF, EGFR, EPC1, ERBB2, ERBB4, ERG, ESR1, ESRRA, ETV1, ETV4, ETV5, ETV6, EWSR1, FGF1, FGFR1, FGFR2, FGFR3, FGR, FOS, FOSB, FOXO1, FOXO4, FOXR2, FUS, GLI1, GRB7, HMGA2, HRAS, HTN3, IDH1, IDH2, IGF1R, INSR, JAK1, JAK2, JAK3, JAZF1, KIT, KRAS, MAML1, MAML2, MAML3, MAP2K1, MAST1, MAST2, MBTD1, MDM2, MEAF6, MET, MGEA5, MKL2, MN1, MSANTD3, MSMB, MUSK, MYB, MYBL1, MYC, MYOD1, NCOA1, NCOA2, NCOA3, NDRG1, NFATC2, NFE2L2, NFIB, NOTCH1, NOTCH2, NR4A3, NRAS, NRG1, NTRK1, NTRK2, NTRK3, NUMBL, NUTM1, PAX3, PAX7, PAX8, PDGFB, PDGFD, PDGFRA, PDGFRB, PHF1, PHKB, PIK3CA, PKN1, PLAG1, PPARG, PRDM10, PRKACA, PRKACB, PRKCA, PRKCB, PRKCD, PRKD1, PRKD2, PRKD3, QKI, RAD51B, RAF1, RELA, RET, ROS1, RSPO2, RSPO3, SETD2, SS18, SS18L1, STAT6, TAF15, TCF12, TERT, TFE3, TFEB, TFG, THADA, TMPRSS2, TTYH1, USP6, VGLL2, WWTR1, YAP1, YWHAE',
                },
            },
            {
                content: '<h3>Will DNA methylation results be returned for all patients?</h3>'
                        +'<p>For CNS patients only, a tumor classification by DNA methylation will have a clinical result returned to contacts indicated on the MCI Site Contact Form. For STS, RAR, and NBL patients, DNA methylation array data will be banked for research submission into the CCDI Data Ecosystem without return of results to sites.</p>'
                        +'<p>DNA methylation results will be returned for CNS patients with tissue submitted from a primary site or a metastatic site in the CNS only. Results from non-CNS metastatic tissue will be banked without return of results to sites.</p>',
            },
        ]
    },
    {
        id: 'Accessing_MCI_Data',
        topic: 'Accessing MCI Data',
        list: [
            {
                id: 'How_to_Access_MCI_Data',
                subtopic: 'How to Access MCI Data',
                content: '<h3>How can MCI data be accessed through the CCDI Data Ecosystem?</h3>'
                        +'<p>Separately, molecular characterization data and deidentified clinical reports are submitted to the CCDI Data Ecosystem, along with additional data encompassing demographics, diagnosis, treatment, and follow-up directly from COG. Data are hosted in the '
                        +'<a class="link" href="https://datacommons.cancer.gov/repository/cancer-data-service" target="_blank" rel="noopener noreferrer">Cancer Data Service (CDS)</a>'
                        +', which is a data repository under the '
                        +'<a class="link" href="https://datascience.cancer.gov/data-commons" target="_blank" rel="noopener noreferrer">Cancer Research Data Commons</a>'
                        +' infrastructure. Please see the '
                        +`<a class="link" href=${userGuidePDF} target="_blank" rel="noopener noreferrer">instructions</a>`
                        +' on how to access the data associated with this study, '
                        +'<a class="link" href="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002790" target="_blank" rel="noopener noreferrer">phs002790</a>'
                        +'. For the CCDI studies, the database of Genotypes and Phenotypes (dbGaP) maintains a list of the subject IDs, sample IDs, and consents. Authorization through dbGaP is required to access controlled-access data and clinical/phenotypic files.</p>'
                        +'<p>Users can analyze CCDI data on the '
                        +'<a class="link" href="https://www.cancergenomicscloud.org/" target="_blank" rel="noopener noreferrer">Cancer Genomics Cloud</a>'
                        +' through the '
                        +'<a class="link" href="https://gcc02.safelinks.protection.outlook.com/?url=https%3A%2F%2Fcgc.sbgenomics.com%2Fdatasets%2Ffile-repository&data=05%7C01%7Ccarol.bastiani%40nih.gov%7C7708699b96a144ce602208db6d0ace70%7C14b77578977342d58507251ca2dc2b06%7C0%7C0%7C638223665394038536%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=SyqbQFpBXs7Iqo6Ji2bSpdE3wQBcfAql9Gkacq7%2FBoI%3D&reserved=0" target="_blank" rel="noopener noreferrer">Cancer Data Service Explorer</a>'
                        +' (CDS Explorer). The CDS Explorer provides a user-friendly interface for exploring the data in the CDS. '
                        +'<a class="link" href="https://docs.cancergenomicscloud.org/docs/import-cds-data" target="_blank" rel="noopener noreferrer">Here is a tutorial</a>'
                        +' on how to import CDS data. To see a preview of MCI data prior to going through the data authorization process, '
                        +'<a class="link" href="https://datacatalog.ccdi.cancer.gov/dataset/CCDI-phs002790" target="_blank" rel="noopener noreferrer">visit MCI’s page</a>'
                        +' in the CCDI Childhood Cancer Data Catalog.</p>'
                        +'<p>For investigators planning to use data from different resources: If you intend to utilize data from institutions that enroll patients in the Molecular Characterization Initiative, please note that the data available on this site may be identical to the data collected from the submitting clinical sites.</p>',
            },
            {
                id: 'Germline_Findings',
                subtopic: 'Germline Findings',
                content: '<h3>What steps should be taken if germline findings are detected?</h3>'
                        +'<p>The participant’s physician should coordinate a referral for the participant and their family to do local genetic counseling. In this setting, familial cascade testing for the observed germline variant may be offered to the family where appropriate. Such testing typically takes the form of targeted Sanger or microarray analysis, performed in concert with pre and post-test genetic counseling on the significance of the genetic variant. Familial testing may be performed by the institutional molecular laboratory (if those services are available locally) or through typical send-out testing channels familiar to the clinician and counselor.</p>',
            },
            {
                id: 'Contact_Information',
                subtopic: 'Contact Information',
                content: '<h3>Who should I contact with questions about MCI results and data?</h3>'
                +'<h4>MCI Results Contacts</h4>'
                +'<p>Technical questions about specimen submission should be directed to the Biopathology Center by email at <a href="mailto:BPCBank@nationwidechildrens.org">BPCBank@nationwidechildrens.org</a>.</p>'
                +'<p>Technical questions about accessing results or result availability should be directed to IGM by email at <a href="mailto:igmmci@nationwidechildrens.org">igmmci@nationwidechildrens.org</a>.</p>'
                +'<p>Questions about results unrelated to a COG treatment trial should go to the following as appropriate:</p>'
                +'<ul><li>Central nervous system group: <a href="mailto:MCICNS@childrensoncologygroup.org">MCICNS@childrensoncologygroup.org</a></li>'
                +'<li>Soft tissue sarcoma group: <a href="mailto:MCISTS@childrensoncologygroup.org">MCISTS@childrensoncologygroup.org</a></li>'
                +'<li>Rare tumor group: <a href="mailto:MCIRAR@childrensoncologygroup.org">MCIRAR@childrensoncologygroup.org</li></a>'
                +'<li>Neuroblastoma group: <a href="mailto:MCINBL@childrensoncologygroup.org">MCINBL@childrensoncologygroup.org</li></a></ul>'
                +'<h4>MCI Data Contact</h4>'
                +'<p>For questions related to MCI data or accessing the CCDI Data Ecosystem, contact <a href="mailto:ncichildhoodcancerdatainitiative@mail.nih.gov">ncichildhoodcancerdatainitiative@mail.nih.gov</a>.</p>'
                +'<h4>Project:EveryChild Contact</h4>'
                +'<p>For questions related to Project:EveryChild (APEC14B1), contact <a href="mailto:projecteverychild@childrensoncologygroup.org">projecteverychild@childrensoncologygroup.org</a>.</p>',
            },
        ]
    },
]
