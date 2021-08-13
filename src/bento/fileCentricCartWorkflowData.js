import gql from 'graphql-tag';
import { customMyFilesTabDownloadCSV } from './tableDownloadCSV';

export const navBarCartData = {
  cartLabel: 'Cart',
  cartLink: '/fileCentricCart',
  cartIcon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Icon-Cart-Navbar.svg',
  cartIconAlt: 'cart_logo',
};

// --------------- Files limit configuration --------------
export const alertMessage = 'The cart is limited to 1000 files. Please narrow the search criteria or remove some files from the cart to add more.';
export const maximumNumberOfFilesAllowedInTheCart = 1000;

export const myFilesPageData = {
  mainTitle: 'Cart >',
  subTitle: 'Selected Files',
  downButtonText: 'DOWNLOAD MANIFEST',
  headerIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Icon-Cart-Workflow.svg',
  headerIconAlt: 'CCDI Data Catalog MyFiles header logo',
  manifestFileName: 'CCDI Data Catalog File Manifest',
  tooltipIcon: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  tooltipAlt: 'tooltip icon',
  tooltipMessage: 'To access and analyze files: select and remove unwanted files,  click the “Download Manifest” button, and upload the resulting Manifest file to your Seven Bridges Genomics account.',
  textareaPlaceholder: 'Please add a description for the XML file you are about to download.',
  errorMessage: 'An error has occurred in loading CART',
  popUpWindow: {
    showNumberOfFileBeRemoved: true,
    messagePart1: 'Remove ',
    messagePart2: 'All files (',
    messagePart3: ') ',
    messagePart4: 'From Cart',
    okButtonText: 'Ok',
    cancelButtonText: 'Cancel',
  },
};

export const manifestData = {
  keysToInclude: ['file_id', 'file_ordinal', 'file_name', 'file_md5', 'file_content_format', 'file_deposit_location'],
  header: ['File UUID', 'File Ordinal', 'File Name', 'File Md5', 'File Content Format', 'File Deposit Location', 'User Comments'],
};

// --------------- File table configuration --------------

export const table = {
  dataField: 'filesInList',
  // Value must be one of the 'dataField's in "columns"
  defaultSortField: 'file_set_id',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  tableDownloadCSV: customMyFilesTabDownloadCSV,

  columns: [
    {
      dataField: 'file_set_id',
      header: 'File ID',
    },
    {
      dataField: 'file_ordinal',
      header: 'File Ordinal',
    },
    {
      dataField: 'file_id',
      header: 'File UUID',
    },
    {
      dataField: 'file_name',
      header: 'File Name',
    },
    {
      dataField: 'file_md5',
      header: 'File MD5',
    },
    {
      dataField: 'file_content_format',
      header: 'File Content Format',
    },
    {
      dataField: 'file_deposit_location',
      header: 'File Deposit Location',
    },
  ],
};

// --------------- GraphQL query - Retrieve selected cases info --------------
export const GET_MY_CART_DATA_QUERY = gql`
query filesInList($file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="") {
    filesInList(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
      file_set_id
      file_ordinal
      file_id
      file_name
      file_md5
      file_content_format
      file_deposit_location
    }
}`;

// --------------- GraphQL query - Retrieve selected files info Desc --------------
export const GET_MY_CART_DATA_QUERY_DESC = gql`
query filesInListDesc($file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="") {
  filesInListDesc(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
    file_set_id
    file_ordinal
    file_id
    file_name
    file_md5
    file_content_format
    }
}`;
