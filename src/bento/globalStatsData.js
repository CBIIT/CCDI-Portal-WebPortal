import gql from 'graphql-tag';

export const statsStyling = {
  global: {
    horizontalStyle: true,
    statTitleFirst: true,
    height: '47px',
    background: '#8DCAFF',
  },
};

export const globalStatsData = [
  // A maximum of 6 stats are allowed
  {
    statTitle: 'Programs',
    type: 'field',
    statAPI: 'numberOfPrograms',
  },
  {
    statTitle: 'Files',
    type: 'field',
    statAPI: 'numberOfFiles',
  },
  {
    statTitle: 'Participants',
    type: 'field',
    statAPI: 'numberOfParticipants',
  },
  {
    statTitle: 'Studies',
    type: 'field',
    statAPI: 'numberOfStudies',
  },
  {
    statTitle: 'Submitters',
    type: 'field',
    statAPI: 'numberOfSubmitters',
  },
];

// --------------- GraphQL query - Retrieve stats details --------------
export const GET_GLOBAL_STATS_DATA_QUERY = gql`{
  numberOfPrograms
  numberOfFiles
  numberOfStudies
  numberOfParticipants
  numberOfSubmitters
  }
  `;
