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
]

export const GET_LANDING_PAGE_DATA_QUERY = gql`{
  numberOfPrograms
  numberOfStudies
  numberOfSubjects
  numberOfSamples
  numberOfFiles
  }
  `;