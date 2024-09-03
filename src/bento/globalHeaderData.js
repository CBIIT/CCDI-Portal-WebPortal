import Logo from '../assets/header/Portal_Logo.svg';
import LogoSmall from '../assets/header/Portal_Logo_Small.svg';
import searchbarIcon from '../assets/header/Search_Icon.svg';
import cartLogo from '../assets/header/Cart_Logo.svg';
import usFlagSmall from "../assets/header/us_flag_small.png";
import dataAccessPDF from "../assets/about/CCDI-CGC-Data-Access-Instructions-2.0.pdf";

// globalHeaderLogo image 468x100
// globalHeaderImage: image 2200x100
export const headerData = {
  globalHeaderLogo: Logo,
  globalHeaderLogoSmall: LogoSmall,
  globalHeaderLogoLink: '/',
  globalHeaderLogoAltText: 'Portal Logo',
  globalHeaderSearchIcon: searchbarIcon,
  globalHeaderSearchIconAltText: 'search Icon',
};

export const USGovBannerData = {
  logo: usFlagSmall,
};

export const navMobileList = [
  {
      name: 'Home',
      link: '/home',
      className: 'navMobileItem',
  },
  {
    name: 'Explore',
    link: '/explore',
    className: 'navMobileItem',
  },
  {
      name: 'Applications',
      link: '',
      className: 'navMobileItem clickable',
  },
  {
      name: 'Other Resources',
      link: '',
      className: 'navMobileItem clickable',
  },
  {
      name: 'News',
      link: '/news',
      className: 'navMobileItem',
  },
  {
      name: 'About',
      link: '/about',
      className: 'navMobileItem clickable',
  },
  {
    name: 'My File',
    link: '/fileCentricCart',
    className: 'cart',
},
];

export const navbarSublists = {
Applications: [
  {
    name:'Applications',
    link: '',
    className: 'navMobileSubTitle',
  },
  {
    name: 'Childhood Cancer Clinical Data Commons',
    link: 'https://clinicalcommons.ccdi.cancer.gov/',
    className: 'navMobileSubItem'
  },
  {
    name:'Childhood Cancer Data Catalog',
    link: 'https://datacatalog.ccdi.cancer.gov',
    className: 'navMobileSubItem',
  },
  {
    name:'Clinical Interpretation of Variants in Cancer',
    link: 'https://civicdb.org',
    className: 'navMobileSubItem',
  },
  {
    name: 'Molecular Characterization Initiative',
    link: '/MCI',
    className: 'navMobileSubItem',
  },
  {
    name: 'Molecular Targets Platform',
    link: 'https://moleculartargets.ccdi.cancer.gov',
    className: 'navMobileSubItem',
  },
  {
    name:'National Childhood Cancer Registry Explorer',
    link: 'https://nccrexplorer.ccdi.cancer.gov',
    className: 'navMobileSubItem',
  },
  {
    name:'Data Federation Resource',
    link: '/data-federation-resource',
    className: 'navMobileSubItem',
  },
  {
    name:'CCDI Participant Index',
    link: '/ccdi-participant-index',
    className: 'navMobileSubItem',
  }],
"Other Resources": [
  {
    name:'Other Resources',
    link: '',
    className: 'navMobileSubTitle',
  },
  {
    name:'Cancer Genomics Cloud',
    link: 'https://www.cancergenomicscloud.org',
    className: 'navMobileSubItem',
  }, 
  {
    name:'Database of Genotypes and Phenotypes',
    link: 'https://www.ncbi.nlm.nih.gov/gap',
    className: 'navMobileSubItem',
  }],
  "About": [
    {
      name: 'About CCDI Hub',
      link: '/about',
      className: 'navMobileSubItem',
    },
    {
      name: 'Accessing CCDI Data (PDF)',
      link: dataAccessPDF,
      className: 'navMobileSubItem',
    },
    {
      name: 'CCDI Data Usage Policies & Terms',
      link: '/data-usage-policies',
      className: 'navMobileSubItem',
    }],
};

export const navBarCartData = {
  cartLabel: '',
  cartLink: '/fileCentricCart',
  cartIcon: cartLogo,
  cartIconAlt: 'cart_logo',
  cartLabelType: 'labelUnderCount',
};