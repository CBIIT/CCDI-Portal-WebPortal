export default () => ({
  clearAllButtonRoot: {
    margin: 'auto',
  },
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
    border: '1px solid #60797B',
    '&:hover': {
      backgroundColor: '#60797B',
      color: 'white',
    },
  },
  floatRight: {
    display: 'flex',
    backgroundColor: '#ffffff',
    padding: '7px 0px 7px 6px',
  },
  resetText: {
    marginTop: '0px',
    marginLeft: '8px',
    color: '#60797B',
    fontSize: 14,
    lineHeight: '15px',
  },
  resetTextDisabled: {
    marginTop: '0px',
    marginLeft: '8px',
    color: '#627B7A',
    fontSize: 14,
    lineHeight: '15px',
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
  sideBar: {
    width: '180px',
    maxHeight: '1361px',
    overflowX: 'hidden',
    backgroundColor: '#007694',
    borderBottom: 'thin solid #8A7F7C',
    overflow: 'auto',
    zIndex: '99',
    color: '#ffffff',
  },
  sideBarMenuSider: {
    width: '180px',
  },
  siderContent: {
    listStyle: 'none',
    padding: '0px',
    margin: '0px',
    '& li': {
      height: '50px',
      lineHeight: '50px',
      padding: '0 5px 0 13px',
    }
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
    paddingLeft: '12px',
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
    '& a': {
      width: '16px',
      '& svg': {
        width: '16px',
        height: '16px',
      }
    }
  },
  contentPanelBody: {},
  rightContent: {
    width: 'calc(100% - 450px)',
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
