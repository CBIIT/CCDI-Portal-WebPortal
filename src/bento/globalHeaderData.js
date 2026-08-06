import Logo from '../assets/header/Portal_Logo.svg';
import LogoSmall from '../assets/header/Portal_Logo_Small.svg';
import searchbarIcon from '../assets/header/Search_Icon.svg';
import cartLogo from '../assets/header/Cart_Logo.svg';
import usFlagSmall from "../assets/header/us_flag_small.png";
import env from '../utils/env';

const C3DC_BASE_URL = String(env.REACT_APP_C3DC || '').replace(/\/$/, '');

function c3dcUrl(path = '') {
  if (!path) {
    return `${C3DC_BASE_URL}/`;
  }
  return `${C3DC_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

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
    link: c3dcUrl('/explore'),
    className: 'navMobileItem',
  },
  {
    name: 'Studies',
    link: c3dcUrl('/studies'),
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
    link: c3dcUrl(),
    className: 'navMobileSubItem'
  },
  {
    name:'Childhood Cancer Data Catalog',
    link: 'https://datacatalog.ccdi.cancer.gov',
    className: 'navMobileSubItem',
  },
  {
    name: 'Molecular Characterization Initiative',
    link: '/MCI',
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
    name: 'CCDI cBioPortal',
    link: 'https://cbioportal.ccdi.cancer.gov',
    className: 'navMobileSubItem',
  },
  {
    name:'NCCR Data Platform',
    link: 'https://nccrdataplatform.ccdi.cancer.gov/home',
    className: 'navMobileSubItem',
  },
  {
    name:'Pediatric Molecular Target Lists',
    link: '/pmtl',
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
    name:'Tools',
    link: '/tools',
    className: 'navMobileSubItem',
  },
  {
    name:'CCDI Pediatric, Adolescent, and Young Adult Rare Cancer Study',
    link: '/pediatric-adolescent-and-young-adult-rare-cancer-study',
    className: 'navMobileSubItem',
  },
  ],
  "About": [
    {
      name: 'About CCDI Hub',
      className: 'navMobileSubSection',
      children: [
        {
          name: 'About CCDI Hub',
          link: '/about',
          className: 'navMobileSubItem',
        },
        {
          name: 'Release Notes',
          link: '/release-notes',
          className: 'navMobileSubItem',
        },
      ],
    },
    {
      name: 'About CCDI Data',
      className: 'navMobileSubSection',
      children: [
        {
          name: 'CCDI Data Ecosystem & AI Readiness (PDF)',
          link: '/Ecosystem_AI_Readiness.pdf',
          className: 'navMobileSubItem',
        },
        {
          name: 'CCDI Data Model',
          link: c3dcUrl('/data_model'),
          className: 'navMobileSubItem',
        },
        {
          name: 'CCDI Data Submission Guide (PDF)',
          link: '/Submission_Guide.pdf',
          className: 'navMobileSubItem',
        },
        {
          name: 'CCDI Data Usage Policies & Terms',
          link: '/data-usage-policies',
          className: 'navMobileSubItem',
        },
      ],
    },
    {
      name: 'CCDI Knowledge and Training',
      className: 'navMobileSubSection',
      children: [
        {
          name: 'CCDI Events Announcements',
          link: '/ccdi-events-announcements',
          className: 'navMobileSubItem',
        },
        {
          name: 'CCDI-Supported Publications',
          link: '/publications',
          className: 'navMobileSubItem',
        },
      ],
    },
    {
      name: 'Help',
      className: 'navMobileSubSection',
      children: [
        {
          name: 'CCDI FAQs',
          link: '/faqs',
          className: 'navMobileSubItem',
        },
        {
          name: 'User Guide',
          link: '/user-guide.pdf',
          className: 'navMobileSubItem',
        },
      ],
    },
  ],
};

/** Flatten nested About (or similar) sections for mobile/tablet lists. */
export function flattenNavbarSublist(sublist) {
  if (!Array.isArray(sublist)) {
    return [];
  }
  return sublist.flatMap((item) => {
    if (item.className === 'navMobileSubSection' && Array.isArray(item.children)) {
      return [
        { name: item.name, className: 'navMobileSubSection' },
        ...item.children,
      ];
    }
    return [item];
  });
}

/** True when the current path matches a link under the About submenu (nested or flat). */
export function isAboutPathActive(pathname, aboutSublist = navbarSublists.About) {
  if (!Array.isArray(aboutSublist)) {
    return false;
  }
  return aboutSublist.some((item) => {
    if (item.link === pathname) {
      return true;
    }
    if (Array.isArray(item.children)) {
      return item.children.some((child) => child.link === pathname);
    }
    return false;
  });
}

export const navBarCartData = {
  cartLabel: '',
  cartLink: '/fileCentricCart',
  cartIcon: cartLogo,
  cartIconAlt: 'cart_logo',
  cartLabelType: 'labelUnderCount',
};