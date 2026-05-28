/**
 * Default props for LandingView unit tests (no network).
 * Shape matches `statsData` / `newsData` from bento + landingController output.
 */

export const defaultLandingStatsData = [
  {
    num: 1000,
    title: 'Cataloged Datasets',
    detail: 'Childhood Cancer Data Catalog',
    link: 'https://datacatalog.ccdi.cancer.gov',
  },
  {
    num: 500,
    title: 'Participants with Available Genomic and Clinical Data',
    detail: 'Molecular Characterization Initiative',
    link: '/MCI',
  },
  {
    num: 58867,
    title: 'Potential Pediatric Molecular Targets',
    detail: 'Molecular Targets Platform',
    link: 'https://moleculartargets.ccdi.cancer.gov',
  },
  {
    num: 1700440,
    title: 'Reported Cases Under Age 40<br>(1995-2020)',
    detail: 'National Childhood Cancer Registry Explorer',
    link: 'https://nccrexplorer.ccdi.cancer.gov',
  },
];

export const defaultLandingNewsData = {
  newsList: [],
  newsImgUrlList: [],
  releaseNotesList: [],
  altList: [],
};
