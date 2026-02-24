const customTheme = {
  MuiTabs: {
    flexContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  MuiTab: {
    root: {
      marginTop: '10px',
      color: '#6E6E6E',
      overflow: 'hidden',
      borderBottom: '6px solid transparent',
      fontWeight: '700',
      lineHeight: '19px',
      letterSpacing: '0.25px',
      marginRight: '10px',
      fontSize: '15px',
      textTransform: 'none',
      fontFamily: 'Open Sans',
      '@media (min-width: 600px)': {
        minWidth: '120px',
      },
      '&.Mui-selected': {
        borderBottom: '6px solid #0095A2',
      },
    },
  },
};

export default customTheme;
