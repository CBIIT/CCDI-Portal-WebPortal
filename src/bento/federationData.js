export const introText =  '<p>Data federation enables users to pull data from across various resources as if they were accessing a single virtual database, rather than consolidating all data into a single centralized repository. The data remain at the original source but become searchable and findable to the research community through a standard application programming interface (API). This allows the creation of a virtual cohort and facilitates large-scale analytic research by making deidentified participant-level data (non-PHI/PII) findable across the sources.</p>'
                         +'<p>The Childhood Cancer Data Initiative (CCDI) is piloting data federation with Kids First Data Resource Center, the Pediatric Cancer Data Commons, St. Jude Cloud, and the Treehouse Childhood Cancer Data Initiative. These resources provide information about genomic, clinical, imaging, and biospecimen data in these data sets. This list will expand as more organizations implement CCDI’s data federation API.</p>'

export const federationContent = [
    {
        id: 'Data_Access',
        topic: 'Data Access',
        content: '<p>Researchers can search for deidentified individual-level data through the API, which provides metadata that aids in the creation of virtual cohorts across multiple data types from participating resources by accessing CCDI’s Data Federation Resource API.</p>'
                +'<p>To access the CCDI Data Federation Resource API, please click '
                +'<a class="link" href="https://cbiit.github.io/ccdi-federation-api-aggregation/" target="_blank" rel="noopener noreferrer">here</a>.</p>'
                +'<p>To access participating nodes API, please click '
                +'<a class="link" href="https://cbiit.github.io/ccdi-federation-api-spec" target="_blank" rel="noopener noreferrer">here</a>.</p>'
                +'<p>The API does not deliver files. Rather, it provides an open-access subset of the metadata (e.g., demographics) that match a user’s search criteria and provides the location of the complete data set. The data are accessible according to the policies at each contributing resource.</p>'
    },
    {
        id: 'Additional_Available_Resources',
        topic: 'Additional Available Resources',
        content: '<p>The CCDI Data Federation Resource offers a suite of resources including the '
                +'<a class="link" href="https://cbiit.github.io/ccdi-federation-api-aggregation/swagger-aggr.yml" target="_blank" rel="noopener noreferrer">OpenAPI Specification</a>, '
                +'<a class="link" href="https://github.com/CBIIT/ccdi-federation-api-spec/wiki" target="_blank" rel="noopener noreferrer">Data Federation Resource Wiki</a>, '
                +'and '
                +'<a class="link" href="https://github.com/CBIIT/ccdi-federation-api" target="_blank" rel="noopener noreferrer">GitHub Repository</a>'
                +' to support participating node development. You may also get assistance or report an '
                +'<a class="link" href="https://github.com/CBIIT/ccdi-federation-api-spec/issues/new/choose" target="_blank" rel="noopener noreferrer">issue</a>. Read more about CCDI Federation API in the '
                +'<a class="link" href="https://cbiit.github.io/ccdi-federation-api/blog/09-25-2024-introducing-the-federation-api.html" target="_blank" rel="noopener noreferrer">blog</a>.</p>'
    },
    {
        id: 'Contribute_Federation',
        topic: 'Contribute to CCDI Data Federation Resource',
        content: '<p>We invite the community to join us in empowering research through CCDI data federation. Organizations that implement CCDI’s data federation API harmonize data according to CCDI standards to ensure data are searchable.</p>'
                +'<p>If interested in becoming a member of the CCDI Data Federation Resource, please send an email to <a href="mailto:ncichildhoodcancerdatainitiative@mail.nih.gov" target="_blank" rel="noopener noreferrer">ncichildhoodcancerdatainitiative@mail.nih.gov</a>.</p>',

    },
    {
        id: 'Contact',
        topic: 'Contact',
        content: '<p><a href="mailto:ncichildhoodcancerdatainitiative@mail.nih.gov" target="_blank" rel="noopener noreferrer">Email us</a>'
                +' with questions related to CCDI federated data or accessing the CCDI Data Ecosystem.</p>',
    }
]