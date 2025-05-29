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
      // height: '45px',
      overflow: 'hidden',
      // background: '#D7D7D7',
      borderBottom: '6px solid transparent',
      // borderLeft: '1px solid #8B8B8B',
      // borderRight: '1px solid #8B8B8B',
      fontWeight: '600',
      lineHeight: '19px',
      letterSpacing: '0.25px',
      marginRight: '10px',
      fontSize: '16px',
      // width: '203px',
      textTransform: 'none',
      fontFamily: 'Poppins',
      '& span': {
        color: '#000000',
      },
      '&.Mui-selected': {
        fontWeight: '700',
        borderBottom: '6px solid #0095A2',
        '&.participants': {
          background: '#B3D6EA',
          color: '#000000',
          borderTop: '6px solid #07679C',
        },
        '&.samples': {
          background: '#B3D6EA',
          color: '#000000',
          borderTop: '6px solid #07679C',
        },
        '&.files': {
          background: '#B3D6EA',
          color: '#000000',
          borderTop: '6px solid #07679C',
        },
        '&.diagnosis': {
          background: '#B3D6EA',
          color: '#000000',
          borderTop: '6px solid #07679C',
        },
        '&.studies': {
          background: '#B3D6EA',
          color: '#000000',
          borderTop: '6px solid #07679C',
        },
        '&.MuiTypography-body1': {
          color: 'red',
        },
      },
      '& span.participants_count': {
        marginLeft: '5px',
        fontSize: '16px',
        fontWeight: '300',
      },
      '& span.samples_count': {
        marginLeft: '5px',
        fontSize: '16px',
        fontWeight: '300',
      },
      '& span.files_count': {
        marginLeft: '5px',
        fontSize: '16px',
        fontWeight: '300',
      },
      '& span.diagnosis_count': {
        marginLeft: '5px',
        fontSize: '16px',
        fontWeight: '300',
      },
      '& span.studies_count': {
        marginLeft: '5px',
        fontSize: '16px',
        fontWeight: '300',
      },
    },
  },
};

export default customTheme;