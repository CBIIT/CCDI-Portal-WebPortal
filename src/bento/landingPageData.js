import gql from 'graphql-tag';
import landingImg from '../assets/landing/Hero_1.png'
import aboutImg from '../assets/landing/About_1.png';
import wheel1 from '../assets/landing/ccdc_carousel.svg';
import wheel2 from '../assets/landing/civic_carousel.svg';
import wheel3 from '../assets/landing/mci_carousel.svg';
import wheel4 from '../assets/landing/mtp_carousel.svg';
import wheel5 from '../assets/landing/nccr_carousel.svg';
import wheel6 from '../assets/landing/cgc_carousel.svg';
import wheel7 from '../assets/landing/dbgap_carousel.svg';
import ccdcMobile from '../assets/landing/ccdc_mobile.png';
import civicMobile from '../assets/landing/civic_mobile.png';
import mciMobile from '../assets/landing/mci_mobile.png';
import mtpMobile from '../assets/landing/mtp_mobile.png';
import nccrMobile from '../assets/landing/nccr_mobile.png';
import cgcMobile from '../assets/landing/cgc_mobile.png';
import dbgapMobile from '../assets/landing/dbgap_mobile.png';
import ccdcLogo from '../assets/landing/ccdc_logo.svg';
import civicLogo from '../assets/landing/civic_logo.svg';
import mciLogo from '../assets/landing/mci_logo.svg';
import mtpLogo from '../assets/landing/mtp_logo.svg';
import nccrLogo from '../assets/landing/nccr_logo.svg';
import cgcLogo from '../assets/landing/cgc_logo.svg';
import dbgapLogo from '../assets/landing/dbgap_logo.svg';

export const introData = {
  landingIntroPic: landingImg,
  introTitle1: 'Discover CCDI applications, data, resources, and other tools',
  introTitle2: 'Explore the CCDI Hub by selecting an available resource on the Hub Wheel',
  introTitle3: 'ABOUT CCDI HUB',
  introButtonTitle: 'ABOUT CCDI',
};

export const titleData = {
  latestUpdatesTitle: 'Latest Updates',
  resourceTitle: 'RESOURCES',
  applicationsTitle: 'CCDI-SUPPORTED RESOURCES',
  cloudResourcesTitle: 'OTHER RESOURCES',
  aboutTitle: 'About the CCDI Community',
};

export const statsData = [
  {
    num: 253,
    title: 'Cataloged Datasets',
    detail: 'Childhood Cancer Data Catalog',
  },
  {
    num: 1862,
    title: 'Participants',
    detail: 'Molecular Characterization Initiative for Childhood Cancer',
  },
  {
    num: 58867,
    title: 'Potential Pediatric Molecular Targets',
    detail: 'Molecular Targets Platform',
  },
  {
    num: 1700440,
    title: 'Reported Cases Under Age 40<br>(1995-2020)',
    detail: 'National Childhood Cancer Registry Explorer',
  },
];

export const resourcesAppliationsListData = [
  {
    id: 'ccdc',
    title: 'Childhood Cancer Data Catalog',
    subtitle: 'CCDC',
    content: 'A searchable inventory of childhood cancer resources.',
    link: 'https://datacatalog.ccdi.cancer.gov',
    img: ccdcLogo,
  },
  {
    id: 'civic',
    title: 'Clinical Interpretation of Variants in Cancer',
    subtitle: 'CIViC',
    content: 'An open access, open source, community-driven web resource for clinical interpretations of mutations related to cancer.',
    link: 'https://civicdb.org',
    img: civicLogo,
  },
  {
    id: 'mci',
    title: 'Molecular Characterization Initiative for Childhood Cancers',
    subtitle: 'MCI',
    content: 'A program providing molecular testing for children, adolescents, and young adults with certain cancer types.',
    link: '/MCI',
    img: mciLogo,
  },
  {
    id: 'mtp',
    title: 'Molecular Targets Platform',
    subtitle: 'MTP',
    content: 'An instance of the Open Targets Platform with a focus on childhood cancer data that allows users to browse and identify associations between molecular targets, diseases, and drugs.',
    link: 'https://moleculartargets.ccdi.cancer.gov',
    img: mtpLogo,
  },
  {
    id: 'nccr',
    title: 'National Childhood Cancer Registry Explorer',
    subtitle: 'NCCR Explorer',
    content: 'A tool to browse demographic, incidence, and survival statistics for cancers in children, adolescent, and young adults.',
    link: 'https://nccrexplorer.ccdi.cancer.gov',
    img: nccrLogo,
  },
];

export const resourcesCloudListData = [
  {
    id: 'cgc',
    title: 'Cancer Genomics Cloud',
    subtitle: 'CGC',
    content: 'A cloud-based platform to access and analyze cancer research data.',
    link: 'https://www.cancergenomicscloud.org',
    img: cgcLogo,
  },
  {
    id: 'dbgap',
    title: 'Database of Genotypes and Phenotypes',
    subtitle: 'dbGaP',
    content: 'A database to store and distribute data and results from studies examining the interaction of genotypes and phenotypes.',
    link: 'https://www.ncbi.nlm.nih.gov/gap',
    img: dbgapLogo,
  },
];

export const aboutContainerData = {
  img: aboutImg,
  aboutButtonlist: ['CCDI HUB', 'CCDI', 'MCI'],
  aboutList: {
      'CCDI HUB': 'CCDI HUB',
      'CCDI': 'HELL0',
      'MCI': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.',
  },
};

export const carouselList = [
  {
    img: wheel6,
    mobile: cgcMobile,
    content: 'Cancer Genomics Cloud',
    link: 'https://www.cancergenomicscloud.org',
  },
  {
    img: wheel1,
    mobile: ccdcMobile,
    content: 'Childhood Cancer Data Catalog',
    link: 'https://datacatalog.ccdi.cancer.gov',
  },
  {
    img: wheel2,
    mobile: civicMobile,
    content: 'Clinical Interpretation of Variants in Cancer',
    link: 'https://civicdb.org',
  },
  {
    img: wheel7,
    mobile: dbgapMobile,
    content: 'Database of Genotypes and Phenotypes',
    link: 'https://www.ncbi.nlm.nih.gov/gap'
  },
  {
    img: wheel3,
    mobile: mciMobile,
    content: 'Molecular Characterization Initiative for Childhood Cancer',
    link: 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002790.v2.p1',
  },
  {
    img: wheel4,
    mobile: mtpMobile,
    content: 'Molecular Targets Platform',
    link: 'https://moleculartargets.ccdi.cancer.gov',
  },
  {
    img: wheel5,
    mobile: nccrMobile,
    content: 'National Childhood Cancer Registry Explorer',
    link: 'https://nccrexplorer.ccdi.cancer.gov',
  },
];

export const LANDING_DATA_QUERY = gql`{
    numberOfMCICount
  }
`;