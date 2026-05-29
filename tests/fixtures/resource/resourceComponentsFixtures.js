/**
 * Minimal table/map shapes for resource page presentational components (`src/pages/resource/components`).
 */

export const mciThreeColumnTableFixture = {
  title: 'Test MCI Table',
  header: ['Col A', 'Col B', 'Col C'],
  body: ['a1', 'b1', 'c1', 'a2', 'b2', 'c2', 'a3', 'b3', 'c3'],
};

export const pmtlFourColumnTableFixture = {
  title: 'Test PMTL Table',
  header: ['H1', 'H2', 'H3', 'H4'],
  body: [
    'r1c1', 'r1c2', 'r1c3', 'r1c4',
    'r2c1', 'r2c2', 'r2c3', 'r2c4',
  ],
};

export const mapMobileFixture = {
  title: 'Enrollment by State',
  data: [
    ['meta', 'meta', 'California', '120'],
    ['meta', 'meta', 'Texas', '45'],
  ],
};

export const mciNumberTableFixture = {
  title: 'Site counts',
  header: ['Site', 'Col2', 'Col3', 'Col4'],
  body: [
    ['Site A', '1', '2', '3'],
    ['Site B', '4', '5', '6'],
  ],
};

export const mciDiseaseTableFixture = {
  title: 'Disease breakdown',
  header: ['Category', 'Share', 'Notes'],
  body: [
    { name: 'Asthma', value: '10' },
    { name: 'Flu', value: '5' },
  ],
};

export const mciDiseaseTableMobileFixture = {
  title: 'Disease mobile',
  header: ['Disease', '', 'Value'],
  body: [
    { name: 'Asthma', value: '10' },
    { name: 'Flu', value: '5' },
  ],
};

export const mciSearchTableFixture = {
  title: 'Gene search',
  body: 'GENE_AA, GENE_BB, PIK3CA, TP53',
};
