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
      fontWeight: '600',
      lineHeight: '19px',
      letterSpacing: '0.25px',
      marginRight: '10px',
      fontSize: '16px',
      textTransform: 'none',
      fontFamily: 'Poppins',
      '&.Mui-selected': {
        fontWeight: '700',
        borderBottom: '6px solid #0095A2',
      },
    },
  },
};

export default customTheme;
