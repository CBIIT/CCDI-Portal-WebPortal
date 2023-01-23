import gql from 'graphql-tag';
import landingImg from '../assets/landing/Landing_Intro_Pic.png'
import updateImg1 from '../assets/landing/Updates-1.jpg';
import updateImg2 from '../assets/landing/Updates-2.jpg';
import updateImg3 from '../assets/landing/Updates-3.jpg';

export const introData = {
  landingIntroPic: landingImg,
  introTitle1: 'LOREM IPSUM DOLOR SIT AMET',
  introTitle2: 'Discover one access point for CCDI data resources and tools',
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
    num: '1.4M',
    title: 'MTP',
    detail: 'DISEASE/TARGET COMBINATIONS',
  },
  {
    num: '512',
    title: 'MTP',
    detail: 'PEDIATRIC MOLECULAR TARGETS',
  },
  {
    num: '158',
    title: 'CCDC',
    detail: 'PEDIATRIC CANCER SPECIFIC DATASETS',
  }
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

export const GET_LANDING_PAGE_DATA_QUERY = gql`{
  numberOfPrograms
  numberOfStudies
  numberOfSubjects
  numberOfSamples
  numberOfFiles
  }
  `;