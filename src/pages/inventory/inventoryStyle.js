export default () => ({
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
  },
  sideBar: {
    width: '270px',
    maxHeight: '1300px',
    overflowX: 'hidden',
    backgroundColor: 'transparent',
    borderLeft: 'thin solid #B1B1B1',
    borderBottom: 'thin solid #B1B1B1',
    overflow: 'auto',
    zIndex: '99',
  },
  rightContent: {
    width: 'calc(100% - 270px)',
    position: 'relative',
    borderRight: 'thin solid #B1B1B1',
    borderLeft: 'thin solid #B1B1B1',
  },
});
