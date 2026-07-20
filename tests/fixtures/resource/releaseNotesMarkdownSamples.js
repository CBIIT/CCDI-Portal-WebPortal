/**
 * Sample releaseNotesData.md for parseReleaseNotesMarkdown tests.
 */

export const sampleReleaseNotesMarkdownRaw = `# CCDI Hub Release 2.10.0
### March 26, 2026 | Release Notes

<img src="https://example.com/release-notes.png" align="right" width="220" alt="updateImgReleaseNotes">

The CCDI Hub 2026 Q1 release includes several updates.

Additional details are listed below:

### CCDI Hub Data Updates

#### Added Data Sets

- Metastatic Osteosarcoma Spatial Profiling (PHS003975)

| Property | Value |
| --- | --- |
| id | hub_release_03262026 |
| version | v2.10.0 |
| slug | Metastatic Osteosarcoma Spatial Profiling data now available |
| contentType | Clinical,Genomics/Omics,Imaging |
| latestUpdate | true |
| latestUpdateOrder | 3 |

# CCDI Hub Minor Release 2.5.1
### February 12, 2025 | Release Notes

Minor release with bug fixes.

| Property | Value |
| --- | --- |
| id | hub_release_02122025 |
| version | v2.5.1 |
| slug | Improved layout and bug fixes |
`;

export const sampleCcdiDataUpdatesMarkdownRaw = `# CCDI Data now searchable in Data Federation API
### March 26, 2026 | CCDI Data Updates

<img src="https://raw.githubusercontent.com/CBIIT/CCDI_Hub_Assets/main/Image/News/News_CCDC.png" width="220" alt="updateImgCCDC">

| | |
| --- | --- |
| CCDI Data Federation API version 1.2.3 expands harmonized data coverage and now enables discovery of CCDI-managed data. See the [Federation resource](https://ccdi.cancer.gov/data-federation-resource) for details. Study PHS003975 is included. | |

| Property | Value |
| --- | --- |
| id | federation_03262026 |
| slug | CCDI data now searchable via Data Federation API v1.2.3 |
| latestUpdate | true |
| latestUpdateOrder | 2 |

# CCDI Data Release — March 2026
### March 20, 2026 | CCDI Data Updates

<img src="https://example.com/data-updates.png" align="right" width="220" alt="updateImgReleaseNotes">

### Added Data Sets

- Metastatic Osteosarcoma Spatial Profiling (PHS003975)

| Property | Value |
| --- | --- |
| id | ccdi_data_03262026 |
| version | v2.10.0 |
| slug | New pediatric study data available |
| contentType | Clinical,Genomics/Omics |
| latestUpdate | true |
| latestUpdateOrder | 3 |
`;
