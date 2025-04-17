export default () => ({
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
      padding: '0 13px',
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
    paddingLeft: '15px',
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
