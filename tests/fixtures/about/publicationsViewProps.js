/**
 * Fixtures for PublicationsView unit tests.
 */

export const publicationMinimal = {
  id: 'pub-1',
  title: 'Example Publication Title',
  date: 'January 2024',
  summary: 'This is a short summary used for search and display.',
  tag: 'CCDI, Hub',
  category: 'Primary',
  conference: 'Test Conference',
  link: 'https://example.test/article',
};

export const publicationWithMetadata = {
  ...publicationMinimal,
  id: 'pub-meta',
  title: 'Publication With Metadata',
  journal: 'Nature Medicine',
  pmid: '12345678',
  type: 'Poster',
  category: 'Secondary',
};

export const publicationLongSummary = {
  ...publicationMinimal,
  id: 'pub-long',
  title: 'Long Summary Paper',
  summary: 'A'.repeat(500),
};

export function buildPublicationList(count, overrides = {}) {
  return Array.from({ length: count }, (_, index) => ({
    ...publicationMinimal,
    id: `pub-${index + 1}`,
    title: `Publication ${index + 1}`,
    summary: `Summary text for publication ${index + 1}`,
    ...overrides,
  }));
}
