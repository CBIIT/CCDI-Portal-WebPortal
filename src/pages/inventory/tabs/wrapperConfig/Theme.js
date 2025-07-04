export const customTheme = {
  MuiContainer: {
    root: {
      paddingTop: '5px',
      '& img': {
        position:'relative',
        top: '-10px',
      },
      '&.container_header': {
        textAlign: 'right',
      },
      '&.container_footer': {
        paddingTop: '3px',
        textAlign: 'right',
        display:  'flex',
        '& p': {
          minWidth: '300px',
          maxWidth: '700px',
          paddingRight: '24px',
          margin: '0',
          textAlign: 'left',
          fontWeight: '400',
            fontFamily: 'Roboto',
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0.005em',

          '& span': {
            fontWeight: '700',
            fontFamily: 'Roboto',
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0.005em',
          },
        },
        '& img': {
          position:'relative',
          top: '8px',
          width: '13px',
          height: '13px',
        },
      },
      '&.container_footer_last': {
        paddingTop: '15px',
        textAlign: 'right',
        display:  'flex',
        '& p': {
          minWidth: '300px',
          maxWidth: '700px',
          paddingRight: '24px',
          margin: '0',
          textAlign: 'left',
          fontWeight: '400',
            fontFamily: 'Roboto',
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0.005em',

          '& span': {
            fontWeight: '700',
            fontFamily: 'Roboto',
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0.005em',
          },
        },
        '& img': {
          position:'relative',
          top: '8px',
          width: '13px',
          height: '13px',
        },
      },
      '&.container_footer_link': {
        textAlign: 'right',
        paddingRight: '100px',
        height: '65px',
        color: '#3E6886',
        fontSize: '12px',
        fontFamily: 'Lato',
        borderBottom: '1px solid #3E6886',
        textDecoration: 'none',
      },
    },
  },
  MuiButton: {
    text: {
      padding: '10px 16px',
    },
    root: {
      color: '#fff',
      fontSize: '12px',
      marginTop: '6px',
      fontFamily: 'Poppins',
      fontWeight: '600',
      borderRadius: '5px',
      marginBottom: '10px',
      textTransform: 'uppercase',
      '&.add_all_button': {
        marginLeft: 'auto',
        marginRight: '6px',
        minWidth: '200px',
        height: '41px',
        backgroundColor: '#536D70',
      },
      '&.add_selected_button': {
        marginRight: '6px',
        marginLeft: '15px',
        minWidth: '200px',
        height: '41px',
      },
      '&.add_selected_button_Participants': {
        backgroundColor: '#2A6E93',
      },
      '&.add_selected_button_Samples': {
        backgroundColor: '#2A6E93',
      },
      '&.add_selected_button_Files': {
        backgroundColor: '#2A6E93',
      },
      '&.add_selected_button_Diagnosis': {
        backgroundColor: '#2A6E93',
      },
      '&.add_selected_button_Studies': {
        backgroundColor: '#2A6E93',
      },
      '&.Mui-disabled': {
        color: '#fff',
        '&.add_selected_button_Participants': {
          backgroundColor: '#B3D6EA',
        },
        '&.add_selected_button_Samples': {
          backgroundColor: '#B3D6EA',
        },
        '&.add_selected_button_Files': {
          backgroundColor: '#B3D6EA',
        },
        '&.add_selected_button_Diagnosis': {
          backgroundColor: '#B3D6EA',
        },
        '&.add_selected_button_Studies': {
          backgroundColor: '#B3D6EA',
        },
      },
      '&.yesBtn': {
        width: '133px',
        height: '45px',
        cursor: 'pointer',
        background: '#98a19e',
      },
      '&.noBtn': {
        width: '133px',
        height: '45px',
        cursor: 'pointer',
        background: '#42779a',
      },
    },
  },
  MuiLink: {
    root: {
      height: '65px',
      color: '#3E6886',
      fontSize: '12px',
      fontFamily: 'Lato',
      borderBottom: '1px solid #3E6886',
      textDecoration: 'none',
    },
  },
  MuiDialog: {
    paper: {
      width: '431px',
      height: '170px',
      borderRadius: '25px !important',
      textAlign: 'center',
      backgroundColor: '#E8DFDC !important',
      border: '2px solid #A61401',
    },
  },
  MuiDialogContent: {
    root: {
      padding: '40px 20px 0px 20px',
      '&.alter-content': {
        fontFamily: 'Lato',
        size: '16px',
      },
    },
  },
  MuiDialogActions: {
    root: {
      justifyContent: 'center',
      paddingBottom: '25px',
    },
  },
};

export const themeConfig = {
  customTheme,
};
