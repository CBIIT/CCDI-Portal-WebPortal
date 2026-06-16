/**
 * Sample federationData.md for parseFederationMarkdown tests.
 */

export const sampleFederationMarkdownRaw = `---
title: CCDI Data Federation Resource
Federation_Header: https://example.com/federation-header.png
CCDI_Federation_Data_Access: https://example.com/federation-diagram.png
navTitles:
  - Data Access
  - Additional Available Resources
  - Contribute to CCDI Data Federation Resource
  - Contact
---

Data federation enables users to pull data from across various resources as if they were accessing a single virtual database.

The Childhood Cancer Data Initiative (CCDI) is piloting data federation with Kids First Data Resource Center, the Pediatric Cancer Data Commons, St. Jude Cloud, and the Treehouse Childhood Cancer Data Initiative.

This list will expand as more organizations implement CCDI's data federation API.

## Data Access

Researchers can search for deidentified individual-level data through the API.

To access the CCDI Data Federation Resource API, please click [here](https://cbiit.github.io/ccdi-federation-api-aggregation/).

To access participating nodes API, please click [here](https://cbiit.github.io/ccdi-federation-api-spec).

## Additional Available Resources

The CCDI Data Federation Resource offers a suite of resources including the [OpenAPI Specification](https://cbiit.github.io/ccdi-federation-api-aggregation/swagger-aggr.yml).

## Contribute to CCDI Data Federation Resource

If interested in becoming a member, please send an email to [ncichildhoodcancerdatainitiative@mail.nih.gov](mailto:ncichildhoodcancerdatainitiative@mail.nih.gov).

## Contact

[Email us](mailto:ncichildhoodcancerdatainitiative@mail.nih.gov) with questions related to CCDI federated data.
`;

export const sampleFederationMarkdownNoNavTitles = `---
title: Federation Without Nav
Federation_Header: https://example.com/federation-plain.png
---

Intro paragraph one.

Intro paragraph two.

Intro paragraph three.

## Topic Alpha

Section alpha body.
`;
