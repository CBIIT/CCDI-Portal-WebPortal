import Logo from '../assets/header/Portal_Logo.svg';
import LogoSmall from '../assets/header/Portal_Logo_Small.svg';
import searchbarIcon from '../assets/header/Search_Icon.svg';
import cartLogo from '../assets/header/Cart_Logo.svg';
import usFlagSmall from "../assets/header/us_flag_small.png";

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
    name: 'Studies',
    link: '/studies',
    className: 'navMobileItem',
  },
  {
      name: 'Resources',
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
  Resources: [
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
    name:'CCDI Data Federation Resource',
    link: '/data-federation-resource',
    className: 'navMobileSubItem',
  },
  {
    name:'CCDI Participant Index',
    link: '/ccdi-participant-index',
    className: 'navMobileSubItem',
  },
  {
    name:'NCCR Data Platform',
    link: 'https://nccrdataplatform.ccdi.cancer.gov/home',
    className: 'navMobileSubItem',
  },
  // {
  //   name:'Cancer Genomics Cloud',
  //   link: 'https://www.cancergenomicscloud.org',
  //   className: 'navMobileSubItem',
  // }, 
  // {
  //   name:'Database of Genotypes and Phenotypes',
  //   link: 'https://www.ncbi.nlm.nih.gov/gap',
  //   className: 'navMobileSubItem',
  // },
  {
    name:'CCDI Extrachromosomal DNA (ecDNA)',
    link: 'https://ccdi-ecdna.org',
    className: 'navMobileSubItem',
  },
  {
    name:'Tools',
    link: '/tools',
    className: 'navMobileSubItem',
  },
  ],
  "About": [
    {
      name: 'About CCDI Hub',
      link: '/about',
      className: 'navMobileSubItem',
    },
    {
      name: 'CCDI Data Submission Guide (PDF)',
      link: '/Submission_Guide.pdf',
      className: 'navMobileSubItem',
    },
    {
      name: 'CCDI Data Model',
      link: '/data-model',
      className: 'navMobileSubItem',
    },
    {
      name: 'CCDI Data Usage Policies & Terms',
      link: '/data-usage-policies',
      className: 'navMobileSubItem',
    },
    {
      name: 'CCDI-Supported Publications',
      link: '/publications',
      className: 'navMobileSubItem',
    },
    {
      name: 'Release Notes',
      link: '/release-notes',
      className: 'navMobileSubItem',
    },
    {
      name: 'User Guide',
      link: '/user-guide.pdf',
      className: 'navMobileSubItem',
    },
  ],
};

export const navBarCartData = {
  cartLabel: '',
  cartLink: '/fileCentricCart',
  cartIcon: cartLogo,
  cartIconAlt: 'cart_logo',
  cartLabelType: 'labelUnderCount',
};