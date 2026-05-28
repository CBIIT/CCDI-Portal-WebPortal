/**
 * Sample publicationsData.md for parsePublicationsMarkdown tests.
 */

export const samplePublicationsMarkdownRaw = `![Publications header](https://example.com/publications-header.png)
Banner for publications page

# Example Publication Title
### 2024 | Nature Medicine | 12345678
This is a short summary used for search and display.
tags: **CCDI, Hub**
| id | pub-1 |
| link | https://example.test/article |
| summary | Primary |

# Publication With Metadata
### 2020 | Test Conference
Poster abstract body text.
tags: test
| id | pub-meta |
| link | https://example.test/meta |
| summary | Abstracts |
| conference | Test Conference |
`;

export const samplePublicationAbstractMarkdown = `Banner only

# Abstract Paper
### 2021 | Annual Meeting
Conference abstract summary.
tags:
| id | pub-abs |
| link | https://example.test/abs |
| summary | Abstracts |
`;
