export const navBarstyling = {
    global: {
      backgroundColor: '#142D64',
      height: '39px',
      padding: '9px 20px 0px 20px',
    },
    dropDownIcon: {
      displayIcon: false,
      fontSize: '18px',
      margin: '0px 0px 0px 0px',
    },
    dropdownMenu: {
      paper: {
        background: '#309EC4',
        width: '200px',
        padding: '5px 18px 18px 18px',
        marginLeft: '15px',
        position: 'absolute',
        marginTop: '-1px',
        borderRadius: '0',
      },
      link: {
        overflowWrap: 'normal',
        textDecoration: 'none',
        color: 'black',
        fontSize: '14px',
        fontWeight: '600',
        lineSpacing: '1px',
        lineHeight: '18px',
        fontFamily: 'Raleway, sans-serif',
        display: 'block',
        marginTop: '10px',
        '&:hover': {
          cursor: 'pointer',
          color: 'white',
        },
      },
    },
    cart: {
      iconSize: '30px',
      padding: '6px 20px 0px 5px',
    },
  };
  
  export const navBarData = [
    // A maximum of 5 nav bar items are allowed
    // A maximum of 9 dropDownLinks items are allowed
    {
      labelText: 'about',
      type: 'link',
      link: '/about',
    },
    {
      labelText: 'applications',
      type: 'dropdown',
      dropDownLinks: [
        {
          labelText: 'Childhood Data Catalog',
          link: '/bento',
        },
        {
          labelText: 'Resources',
          link: '/resources',
        },
      ],
    },
    {
      labelText: 'news',
      type: 'link',
      link: '/news',
    },
    {
      labelText: 'ccdi',
      type: 'link',
      link: '/ccdi',
    },
  ];

  export const navBarCartData = {
    cartLabel: '',
    cartLink: '',
    cartIcon: '',
    cartIconAlt: ''
  };

  export const navMobileList = [
    {
        name: 'Home',
        link: '/home',
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
        className: 'navMobileItem',
    },
];

export const navbarSublists = {
  Applications: [
    {
      name:'Childhood Cancer Data Catalog',
      link: '/#ccdc',
      className: 'navMobileSubItem',
    },
    {
      name:'Clinical Interpretation of Variants in Cancer',
      link: '/#civic',
      className: 'navMobileSubItem',
    },
    {
      name: 'Molecular Characterization Initiative for Childhood Cancers',
      link: '/#mci',
      className: 'navMobileSubItem',
    },
    {
      name: 'Molecular Targets Platform',
      link: '/#mtp',
      className: 'navMobileSubItem',
    },
    {
      name:'National Childhood Cancer Registry Explorer',
      link: '/#nccr',
      className: 'navMobileSubItem',
    }],
  "Other Resources": [
    {
      name:'Cancer Genomics Cloud',
      link: '/#cgc',
      className: 'navMobileSubItem',
    }, 
    {
      name:'Database of Genotypes and Phenotypes',
      link: '/#dbgap',
      className: 'navMobileSubItem',
    }],
};