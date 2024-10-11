export const introText =  '<p>The CCDI Participant Index (CPI) application programming interface (API) is part of the CCDI Data Ecosystem and serves as a backend reference service that can be leveraged by other software applications. The goal of the CPI is to manage, map, and share mapped research participant IDs (Identifiers) representing the same individual. This is achieved by collecting various IDs associated with a participant from different studies and research institutions, collectively referred to as “Domains”. These mappings will empower researchers to explore complex questions, gain deeper insights into diseases, develop innovative therapies, and enhance existing treatments.</p>'

export const cpiResourceData = [
    {
        id: 'CPI_Components',
        topic: 'Components',
        content: '<p>“Identifiers” and “Domains” make up the structure of the CPI. These elements are essential for organizing and mapping participant data across various studies and organizations. The key components include:</p>'
                +'<ul><li><b>Identifier</b>: A public identifier (Participant ID) appearing in a research dataset accessible to researchers (e.g., Kids First ID, GENIE ID).</li>'
                +'<li><b>Domain</b>: Groups of unique participant IDs categorized as follows:<ul><li><b>Organizational Identifier</b>: A project/network of unique participant identifiers (e.g. AACR GENIE, Pediatric Cancer Data Commons).</li>'
                +'<li><b>Data Set</b>: A single dataset for a particular study where data files for the participants can be found (e.g., dbGaP accession numbers).</li>'
                +'<li><b>Study</b>: Programmatic references to research initiatives (e.g., TARGET, Gabriella Miller Kids First).</li></ul></li></ul>'
                +'<p>Further information on CPI components and functions can be found at <a href="https://participantindex-docs.ccdi.cancer.gov" target="_blank" rel="noopener noreferrer">participantindex-docs.ccdi.cancer.gov</a>.</p>',
    },
    {
        id: 'Core_Functions_of_the_CPI',
        topic: 'Core Functions of the CPI',
        content: '<p>The CPI API functions as a reference service that allows software applications to communicate with each other, providing information on participants’ research IDs to authorized applications. Integration with the CPI is currently under development for applications like the CCDI Hub and Federation Data Resource.<p>'
                +'<p>The CPI addresses key questions such as:</p>'
                +'<ul><li><b>Which participants and domains are associated with mine?</b> Authorized applications can input participant ID(s) and retrieve all associated IDs along with their respective domains. This helps in mapping participants across different data sets and studies.</li>'
                +'<li><b>What are the current domains in the CPI and their participant statistics?</b> Authorized users can access comprehensive information about each domain within the CPI database. This includes the domain name, description, category, and a URL linking to additional data, offering context about where a participant’s data is present. Also available are participant statistics for each domain, including the number of participants mapped to various domains, along with the total counts of participants.</li></ul>',
    },
    {
        id: 'CPI_Request_Access',
        topic: 'Request Access',
        content: '<p>The CPI API will be made available to applications and services authorized by NCI. Interested system owners may initiate a request for access by emailing <a href="mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov" target="_blank" rel="noopener noreferrer">NCIChildhoodCancerDataInitiative@mail.nih.gov</a>.</p>',

    },
    {
        id: 'Contribute_to_the_CPI',
        topic: 'Contribute to the CPI',
        content: '<p>We invite the community to join us in empowering childhood cancer research. By contributing to the CPI, you can help expand the scope and depth of participant information available to researchers, which could facilitate more comprehensive studies and potentially leading to groundbreaking discoveries. To contribute:</p>'
                +'<ol><li><b>Submit a Contribution Request</b>: Contact the <a href="mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov" target="_blank" rel="noopener noreferrer">CPI Support Team</a> to express your interest.</li>'
                +'<li><b>Data Preparation</b>: Once a request is received, the CPI Support Team will provide the CPI Submission Template for participant ID and domain categorization.</li>'
                +'<li><b>Data Submission</b>: Follow the provided instructions to submit your data to the CPI.</li></ol>',

    },
    {
        id: 'CPI_Contact',
        topic: 'Contact',
        content: '<p>For more information or to request access to the CPI API, please contact the CPI support team at <a href="mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov" target="_blank" rel="noopener noreferrer">NCIChildhoodCancerDataInitiative@mail.nih.gov</a>.</p>',
    }
]