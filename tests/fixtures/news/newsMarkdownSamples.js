/**
 * Sample newsData.md blocks for parseNewsMarkdown + NewsController tests.
 * Mirrors CCDI_Hub_Static_Contents/newsData.md shape.
 */

export const sampleNewsMarkdownRaw = `# April 2026 CCDI Hub updates
### April 15, 2026 | News

| | |
| --- | --- |
| The [CCDI Hub's Tools list](https://ccdi.cancer.gov/tools) now includes four DOE MOSSAIC tools. The [MCI page](https://ccdi.cancer.gov/MCI) has been updated with enrollment counts. | |

| Property | Value |
| --- | --- |
| id | hub_04152026 |
| slug | Updated tools, publications, and MCI enrollment |
| latestUpdate | true |
| latestUpdateOrder | 1 |

---

# CCDI Data now searchable in Data Federation API
### March 26, 2026 | CCDI Application Updates

| | |
| --- | --- |
| CCDI Data Federation API version 1.2.3 expands harmonized data coverage and now enables discovery of CCDI-managed data. | <img src="https://example.com/federation.png" width="220" alt="updateImgFederation"> |

| Property | Value |
| --- | --- |
| id | federation_03262026 |
| slug | CCDI data now searchable via Data Federation API v1.2.3 |
| latestUpdate | true |
| latestUpdateOrder | 2 |

---

# Latest CCDC release includes a new resource
### March 31, 2025 | CCDI Application Updates

| | |
| --- | --- |
| The first CCDC release of 2025 introduces a new resource and accompanying data set from NCTN Biobanks. | |

| Property | Value |
| --- | --- |
| id | ccdc_03312025 |
| slug | The Childhood Cancer Data Catalog (CCDC) has a new resource |
`;

/** Minimal single-item MD for NewsController integration tests */
export const newsMarkdownControllerFixture = `# Phase 4 controller MD headline
### April 1, 2026 | News

| | |
| --- | --- |
| Test highlight with a [link](https://example.com). | |

| Property | Value |
| --- | --- |
| id | news_controller_test |
| slug | Controller test slug |
`;
