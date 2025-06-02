import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  const mdBreakpoint = '@media (min-width: 750px)';
  const lgBreakpoint = '@media (min-width: 1000px)';

  return {
    card: {
      '&:last-child $hrContainer': {
        display: 'none',
      },
      [lgBreakpoint]: {
        minWidth: '1047px',
        width: '1047px',
      },
      maxWidth: '800px',
      padding: '24px 32px 24px 20px',
      border: '0.25px solid #78AEB3',
      borderTopRightRadius: '20px',
      borderBottomLeftRadius: '20px',
      boxShadow: '0px 4px 20px 0px #00000040',
      marginBottom: '20px',
    },
    indexContainer: {
      marginTop: '6px',
      fontFamily: 'Poppins',
      fontSize: '20px',
      fontWeight: '500',
      lineHeight: '22px',
      letterSpacing: '2%',
      textAlign: 'left',
      color: '#2E2E2E',
      width: '25px',
      marginRight: '20px',
      [mdBreakpoint]: {
        width: '49px',
      }
    },
    infoContainer: {
      display: 'flex',
      flexDirection: 'column',
      margin: '0px',
      padding: '0px',
    },
    keyAndValueRow: {
      display: 'flex',
      margin: '0px',
      padding: '0px',
    },
    row: {
      display: 'flex',
      flexDirection: 'column', // For smaller screens, stack items vertically
      margin: '0px',
      padding: '0px',
      [lgBreakpoint]: {  // For larger screens, change to row layout
        flexDirection: 'row',
      },
    },
    column: {
      flex: 1,
      margin: '0px',
      padding: '0px',
      [lgBreakpoint]: {  // For larger screens, allow for two columns
        flexBasis: '50%',
      },
    },
    leftColumn: {
      width: '50%',
      wordBreak: 'break-all',
      [lgBreakpoint]: { 
        marginLeft: '20px',
      },
    },
    titleRow: {
      marginBottom: '5px',
    },
    titleKey: {
      margin: '0px',
      padding: '5px 15px 5px 15px',
      gap: '10px',
      fontFamily: 'Poppins',
      fontSize: '14px',
      fontWeight: '600',
      lineHeight: '19.31px',
      letterSpacing: '0px',
      color: 'white',
      height: '30px',
      display: 'flex',
      borderRadius: '20px',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00828E',
    },
    titleValue: {
      margin: '0px',
      padding: '0px',
      marginTop: '2px',
      marginLeft: '10px',
      fontFamily: 'Inter',
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '22px',
      letterSpacing: '0px',
      textAlign: 'left',
      color: '#00838F',
    },
    key: {
      fontFamily: 'Inter',
      fontSize: '14.25px',
      fontWeight: '600',
      lineHeight: '22px',
      letterSpacing: '2.25%',
      textAlign: 'left',
      margin: '0px 0px 0px 3px',
      padding: '0px',
      textTransform: 'uppercase',
      color: '#0F757E',
      whiteSpace: 'nowrap',
    },
    value: {
      fontFamily: 'Inter',
      fontSize: '16px',
      fontWeight: '400px',
      lineHeight: '22px',
      letterSpacing: '2%',
      textAlign: 'left',
      margin: '0px',
      paddingLeft: '15px',
    },
    hrContainer: {
      paddingTop: '10px',
      paddingBottom: '10px',
      maxWidth: '800px',
      marginLeft: '18px',
      [mdBreakpoint]: {
        marginLeft: '36px',
      },
      [lgBreakpoint]: {
        marginLeft: '36px',
        width: '925px',
        minWidth: '925px',
      },
    },
    hr: {
      width: '100%', 
      border: '1px solid #E7EEF5',
      margin: '10px 0px',
      padding: '0px',
    }
  }
});

export default useStyles;
