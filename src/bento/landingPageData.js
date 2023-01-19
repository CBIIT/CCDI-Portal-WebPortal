import gql from 'graphql-tag';
import landingImg from '../assets/landing/Landing_Intro_Pic.png'

export const introData = {
  landingIntroPic: landingImg,
  introTitle1: 'LOREM IPSUM DOLOR SIT AMET',
  introTitle2: 'Discover one access point for CCDI data resources and tools',
  introTitle3: 'ABOUT CCDI HUB',
  introButtonTitle: 'ABOUT CCDI',
};

export const GET_LANDING_PAGE_DATA_QUERY = gql`{
  numberOfPrograms
  numberOfStudies
  numberOfSubjects
  numberOfSamples
  numberOfFiles
  }
  `;