
export default () => ({
  customButton: {
    borderRadius: '9px',
    maxWidth: '30px',
    maxHeight: '30px',
    minWidth: '30px',
    minHeight: '30px',
    marginTop: '0px',
    fontSize: 9,
    textTransform: 'none',
    color: '#3d4241',
    marginLeft: '0px',
    border: '1px solid #ffffff',
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#337478',
    },
  },
  divider: {
    marginLeft: '0px',
    marginRight: '0px',
    height: '8px',
    // backgroundColor: '#4D889E',
    '&.divider0': {
      backgroundColor: '#4D889E',
    },
    '&.divider1': {
      backgroundColor: '#974599',
    },
    '&.divider2': {
      backgroundColor: '#4150A4',
    },
    '&.divider3': {
      backgroundColor: '#E9B34A',
    },
    '&.divider4': {
      backgroundColor: '#CD5C4E',
    },
    '&.divider5': {
      backgroundColor: '#1F6BBF',
    },
    '&.divider6': {
      backgroundColor: '#60C4A1',
    },
    '&.divider7': {
      backgroundColor: '#357288',
    },
    '&.divider8': {
      backgroundColor: '#974599',
    },
  },
  floatRight: {
    display: 'flex',
    backgroundColor: '#337478',
    padding: '7px 0px 10px 6px',
  },
  resetText: {
    marginTop: '0px',
    marginLeft: '8px',
    color: '#ffffff',
    fontSize: 14,
    lineHeight: '30px',
  },
  resetTextDisabled: {
    marginTop: '0px',
    marginLeft: '8px',
    color: '#ffffff',
    fontSize: 14,
    lineHeight: '30px',
  },
  backdrop: {
    width: '100%',
    zIndex: 99999,
    background: 'rgba(0, 0, 0, 0.1)',
  },
  dashboardContainer: {
    backgroundColor: '#FFFFFF',
  },
  contentBox: {
    paddingTop: '0px',
  },
  content: {
    display: 'flex',
    maxWidth: '1800px',
    margin: 'auto',
    borderLeft: 'thin solid #8A7F7C',
  },
  activeFiltersCount: {
    color: '#ffffff',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '8px 0',
    margin: '0 8px',
    borderTop: '#ADADAD 0.5px solid',
    '& span': {
      color: '#ffffff',
      fontSize: '11px',
      border: '0.5px solid #ffffff',
      padding: '0 4px',
    }
  },
  activeFilterLegend: {
    color: '#9CE1E5',
    margin: '0 16px',
    padding: '16px 0',
    fontStyle: 'italic',
    '& svg': {
      marginRight: '8px',
    }
  },
  sideBarCover: {
    marginLeft: '-100px',
    width: '100px',
    backgroundColor: 'red',
    position: 'absolute',
  },
  sideBar: {
    width: '262px',
    overflowX: 'hidden',
    borderBottom: 'thin solid #8A7F7C',
    overflow: 'auto',
    zIndex: '99',
    position: 'relative',
    backgroundColor: '#337478',
  },
  sideBarMenuSider: {
    width: '262px',
  },
  siderContent: {
    listStyle: 'none',
    padding: '0px',
    margin: '0px',
    backgroundColor: '#f4f4f4',
    '& li': {
      height: '50px',
      lineHeight: '50px',
      padding: '0 5px 0 13px',
      minHeight: '48px',
      paddingLeft: '14px',
      marginBottom: '-1px',
      paddingRight: '14px',
    }
  },
  categoryContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  categoryTitleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  facetCategory: {
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.8',
    }
  },
  facetCategoryActive: {
    cursor: 'pointer',
    backgroundColor: '#00546e',
  }, 
  categoryIcon: {
    lineHeight: '22px',
    fontSize: '22px',
    verticalAlign: '-5px',
  },
  categoryTitle: {
    color: '#000000',
    fontSize: '18.5px',
    fontFamily: 'Poppins',
    fontWeight: 500,
    marginLeft: '3px',
    marginRight: '6px',
    letterSpacing: '-0.02em',
    justifyContent: 'space-between',
    textTransform: 'uppercase',
  },
  sidebarMenuContentPanel: {
    width: '270px',
    padding: '16px 16px 0 16px',
  },
  contentPanelHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '14px',
    height: '22px',
    cursor: 'pointer',
    marginRight: '10px',
    '& a': {
      width: '16px',
      '& svg': {
        width: '16px',
        height: '16px',
      }
    }
  },
  contentPanelBody: {
    marginTop: '20px',
    backgroundColor: '#ffffff',
  },
  rightContent: {
    width: 'calc(100% - 540px)',
    position: 'relative',
    borderRight: 'thin solid #8A7F7C',
    borderLeft: 'thin solid #8A7F7C',
  },
  goToCartLink: {
    fontFamily: 'Lato',
    fontSize: '12px',
    textAlign: 'right',
    height: '65px',
    padding: '5px 100px 0 0',
    '& a': {
      color: '#3E6886',
      borderBottom: '1px solid #3E6886',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      }
    }
  },
});
