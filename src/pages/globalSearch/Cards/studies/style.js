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
      padding: '24px 16px 24px 20px',
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
      alignItems: 'flex-start',
      '& $key': {
        whiteSpace: 'nowrap',
        flexShrink: 0,
      },
      '& $value': {
        wordBreak: 'break-word',
        minWidth: 0,
        flex: 1,
      },
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
      [lgBreakpoint]: { 
        marginLeft: '20px',
      },
    },
    titleRow: {
      marginBottom: '5px',
    },
    titleKey: {
      margin: '0px',
      padding: '2px 15px 2px 15px',
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
      backgroundColor: '#6E7879',
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
    },
    button: {
      width: '189px',
      height: '41px',
      alignSelf: 'end',
      color: '#07679C',
      borderColor: '#07679C',
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: '12px',
      marginTop: '20px',
      lineHeight: '13px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 12px',
      borderRadius: '8px',
      transition: 'border-radius 0.2s ease-in-out',
      '&:hover': {
        backgroundColor: '#DEE4EC',
      },
      '& .MuiButton-label': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      },
    },
    buttonOpen: {
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0',
    },
    dropdownContainer: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      right: 0,
      zIndex: 1000,
      marginTop: '-1px',
      backgroundColor: 'white',
      border: '1px solid #07679C',
      borderTop: 'none',
      borderRadius: '0 0 8px 8px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
      minWidth: '189px',
      width: '189px',
      transformOrigin: 'top',
      animation: '$slideDown 0.2s ease-out',
    },
    '@keyframes slideDown': {
      '0%': {
        opacity: 0,
        transform: 'translateY(-10px)',
      },
      '100%': {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
    dropdownList: {
      padding: 0,
      margin: 0,
    },
    dropdownItem: {
      borderBottom: '1px solid #07679C',
      padding: '12px 12px',
      height: '41px',
      minHeight: '41px',
      '&:first-child': {
        borderTop: '1px solid #07679C',
      },
      '&:last-child': {
        borderBottom: 'none',
      },
      '&:hover': {
        backgroundColor: '#DEE4EC',
      },
      '&:active': {
        backgroundColor: '#e9ecef',
      },
      '&:not(:last-child)': {
        borderBottom: '1px solid #07679C',
      },
    },
    dropdownItemText: {
      '& .MuiListItemText-primary': {
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: '12px',
        color: '#07679C',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      },
    },
    cardHeader: {
      marginBottom: '8px',
    },
    titleContainer: {
      flex: 1,
      width: '100%',
    },
    buttonAlignWithTitle: {
      marginTop: '-20px', // Move button up to align with title baseline
    },
    contentArea: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      marginTop: '0px',
    },
    propertyLine: {
      display: 'flex',
      flexDirection: 'column',
      margin: '0px',
      padding: '0px',
      [mdBreakpoint]: {
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
    },
    groupedProperties: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      [mdBreakpoint]: {
        flexDirection: 'row',
        gap: '20px',
        alignItems: 'flex-start',
      },
    },
    propertyGroup: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      minWidth: '0',
      [mdBreakpoint]: {
        minWidth: '200px',
      },
      '& $keyAndValueRow': {
        '& $key': {
          whiteSpace: 'nowrap',
          flexShrink: 0,
        },
        '& $value': {
          whiteSpace: 'nowrap',
          minWidth: 0,
          flex: 1,
        },
      },
    },
  }
});

export default useStyles;
