import gql from 'graphql-tag';
import landingImg from '../assets/landing/Hero_1.png'
import updateImg1 from '../assets/landing/Updates_1.png';
import updateImg2 from '../assets/landing/Updates_2.png';
import updateImg3 from '../assets/landing/Updates_3.png';
import aboutImg from '../assets/landing/About_1.png';

export const introData = {
  landingIntroPic: landingImg,
  introTitle1: 'Discover CCDI applications, data, resources, and other tools',
  introTitle2: 'Explore the CCDI Hub by selecting an available resource on the Hub Wheel',
  introTitle3: 'ABOUT CCDI HUB',
  introButtonTitle: 'ABOUT CCDI',
};

export const titleData = {
  latestUpdatesTitle: 'Latest Updates',
  resourceTitle: 'Resources',
  applicationsTitle: 'APPLICATIONS',
  cloudResourcesTitle: 'CLOUD RESOURCES',
  aboutTitle: 'About the CCDI Community',
};

export const statsData = [
  {
    num: '33',
    title: 'CCDC',
    detail: 'RESOURCES',
  },
  {
    num: '33',
    title: 'CCDC',
    detail: 'RESOURCES',
  },
  {
    num: '33',
    title: 'CCDC',
    detail: 'RESOURCES',
  },
  {
    num: '33',
    title: 'CCDC',
    detail: 'RESOURCES',
  },
  {
    num: '33',
    title: 'CCDC',
    detail: 'RESOURCES',
  },
];

export const latestUpdatesData = [
  {
    img: updateImg1,
    title: 'NEW RELEASE FROM CCDC LOREM IPSUM DOLOR SIT AMET CON',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
  },
  {
    img: updateImg2,
    title: 'CCDI IS ON THE NEWS!',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
  },
  {
    img: updateImg3,
    title: 'LEARN MORE ABOUT LOREM IPSUM DOLOR SIT AMET CON',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
  },
];

export const resourcesAppliationsListData = [
  {
    title: 'Childhood Cancer Data Catalog',
    subtitle: '(CCDC)',
    content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Clinical Interpretation of Variants in Cancer (civicdb.org)',
    subtitle: '(CIViC)',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Molecular Characterization Initiative for Childhood Cancers - NCI',
    subtitle: '(MCI Data)',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Molecular Targets Platform',
    subtitle: '(MTP)',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'National Childhood Cancer Registry Explorer',
    subtitle: '(NCCR Explorer)',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

export const resourcesCloudListData = [
  {
    title: 'Seven Bridges Cancer Genomics Cloud',
    subtitle: '(SB–CGC)',
    content: 'Explore and analyze large datasets alongside secure and scalable analytical resources for large-scale computational research.',
  },
  {
    title: 'Database of Genotypes and Phenotypes',
    subtitle: '(dbGap)',
    content: 'Developed to archive and distribute the data and results from studies that have investigated the interaction of genotype and phenotype in Humans.',
  },
  {
    title: 'St. Jude Cloud',
    subtitle: '(St. Jude)',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
}

export const GET_LANDING_PAGE_DATA_QUERY = gql`{
  numberOfPrograms
  numberOfStudies
  numberOfSubjects
  numberOfSamples
  numberOfFiles
  }
  `;