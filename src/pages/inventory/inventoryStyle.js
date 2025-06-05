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
  sideBarContainer: {
    position: 'relative',
    marginTop: '82px',
  },  
  sideBar: {
    width: '270px',
    paddingBottom: '1px',
    maxHeight: '1361px',
    overflowX: 'hidden',
    backgroundColor: 'transparent',
    borderBottom: 'thin solid #8A7F7C',
    overflow: 'auto',
    zIndex: '99',
    '&::-webkit-scrollbar': {
      width: '6px',
      borderWidth: '0px 1px 1px 1px',
      borderStyle: 'solid',
      borderColor: '#B0B0B0',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#CECECE',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#003F74',
    },
  },
  rightContent: {
    width: 'calc(100% - 270px)',
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
