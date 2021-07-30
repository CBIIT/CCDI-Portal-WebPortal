import gql from 'graphql-tag';

// --------------- Icons configuration --------------
// Ideal size for programListingIcon is 100x100 px
// Ideal size for externalLinkIcon is 16x16 px
const programListingIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programIcon.svg',
  alt: 'Bento program logo',
};

const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Table configuration --------------
const table = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  title: 'Programs',
  // Field name for table data, need to be updated only when using a different GraphQL query
  dataField: 'programInfo',
  // Value must be one of the 'field' in columns
  defaultSortField: 'program_acronym',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: false,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'program_id',
      header: 'Program Name',
      link: '/program/{program_id}',
      display: true,
    },
    {
      dataField: 'start_date',
      header: 'Start Date',
    },
    {
      dataField: 'end_date',
      header: 'End Date',
    },
    {
      dataField: 'num_files',
      header: 'Number of Submitted Files',
    },
    {
      dataField: 'num_studies',
      header: 'Number of Studies',
    },
  ],
};

// --------------- GraphQL query - Retrieve program info --------------
const GET_PROGRAMS_DATA_QUERY = gql`{
  programInfo {
 program_id
 start_date
 end_date
 num_files
 num_studies
 }
}
 `;

export {
  programListingIcon,
  externalLinkIcon,
  table,
  GET_PROGRAMS_DATA_QUERY,
};
