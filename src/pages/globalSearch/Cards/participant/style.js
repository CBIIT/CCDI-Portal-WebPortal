import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  const mdBreakpoint = '@media (min-width: 750px)';
  const lgBreakpoint = '@media (min-width: 1000px)';

  return {
    card: {
      '&:last-child $hrContainer': {
        display: 'none',
      },
      width: '100%',
      maxWidth: '100%',
      padding: '16px 12px',
      border: '0.25px solid #78AEB3',
      borderTopRightRadius: '20px',
      borderBottomLeftRadius: '20px',
      boxShadow: '0px 4px 20px 0px #00000040',
      marginBottom: '20px',
      position: 'relative',
      [mdBreakpoint]: {
        padding: '20px 24px',
        maxWidth: '800px',
      },
      [lgBreakpoint]: {
        minWidth: '1047px',
        width: '1047px',
        padding: '24px 16px 24px 20px',
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
      marginTop: '-8px', // Move button up to align with title baseline
    },
    contentArea: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      marginTop: '0px',
    },
    propertyLine: {
      display: 'flex',
      flexDirection: 'column',
      margin: '0px',
      padding: '0px',
      position: 'relative',
      [mdBreakpoint]: {
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
    },
    groupedProperties: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      width: '100%',
      [mdBreakpoint]: {
        flexDirection: 'row',
        gap: '16px',
        flexWrap: 'wrap',
      },
      [lgBreakpoint]: {
        gap: '24px',
      },
    },
    propertyGroup: {
      flex: '1 1 auto',
      minWidth: '0',
      [mdBreakpoint]: {
        flex: '1 1 200px',
        maxWidth: '300px',
      },
      [lgBreakpoint]: {
        flex: '1 1 250px',
      },
    },
    indexContainer: {
      marginTop: '6px',
      fontFamily: 'Poppins',
      fontSize: '18px',
      fontWeight: '500',
      lineHeight: '22px',
      letterSpacing: '2%',
      textAlign: 'left',
      color: '#2E2E2E',
      width: '20px',
      marginRight: '12px',
      flexShrink: 0,
      [mdBreakpoint]: {
        fontSize: '20px',
        width: '25px',
        marginRight: '20px',
      },
      [lgBreakpoint]: {
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
      flexDirection: 'column',
      alignItems: 'flex-start',
      [mdBreakpoint]: {
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
      '@media (max-width: 600px)': {
        flexDirection: 'column',
        alignItems: 'flex-start',
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
      width: '50%',
      wordBreak: 'break-word',
      [lgBreakpoint]: {
        marginLeft: '20px',
      },
    },
    titleRow: {
      marginBottom: '2px',
    },
    titleKey: {
      margin: '0px',
      padding: '2px 12px',
      gap: '10px',
      fontFamily: 'Poppins',
      fontSize: '12px',
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
      [mdBreakpoint]: {
        fontSize: '14px',
        padding: '5px 15px',
      },
    },
    titleValue: {
      margin: '0px',
      padding: '0px',
      marginTop: '2px',
      marginLeft: '8px',
      fontFamily: 'Inter',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '22px',
      letterSpacing: '0px',
      textAlign: 'left',
      color: '#00838F',
      wordBreak: 'break-word',
      [mdBreakpoint]: {
        fontSize: '18px',
        marginLeft: '10px',
      },
    },
    titleLink: {
      fontFamily: 'Inter',
      fontSize: '14.25px',
      fontWeight: '600',
      lineHeight: '18px',
      letterSpacing: '2.25%',
      textAlign: 'left',
      margin: '-2px 0px 0px 3px',
      padding: '0px',
      textTransform: 'uppercase',
      color: 'blue',
      whiteSpace: 'nowrap',
      textDecoration: 'underline',
      backgroundColor: 'transparent',
      '&:hover': {
        textDecoration: 'underline',
        backgroundColor: 'transparent',
      }
    },
    key: {
      fontFamily: 'Inter',
      fontSize: '14.25px',
      fontWeight: '600',
      lineHeight: '18px',
      letterSpacing: '2.25%',
      textAlign: 'left',
      margin: '0px 0px 0px 3px',
      padding: '0px',
      textTransform: 'uppercase',
      color: '#0F757E',
      whiteSpace: 'nowrap',
      [mdBreakpoint]: {
        fontSize: '13px',
        lineHeight: '16px',
      },
      '@media (max-width: 600px)': {
        fontSize: '12px',
        lineHeight: '16px',
        whiteSpace: 'normal',
        wordBreak: 'break-word',
      },
    },
    value: {
      fontFamily: 'Inter',
      fontSize: '16px',
      fontWeight: '400px',
      lineHeight: '18px',
      letterSpacing: '2%',
      textAlign: 'left',
      margin: '0px',
      paddingLeft: '15px',
      wordBreak: 'break-word',
      [mdBreakpoint]: {
        fontSize: '15px',
        lineHeight: '16px',
      },
      '@media (max-width: 600px)': {
        fontSize: '14px',
        lineHeight: '16px',
        paddingLeft: '8px',
      },
    },
    treatmentTypeContainer: {
      paddingLeft: '15px',
      width: '100%',
      paddingRight: '30px', // Make space for the arrow
      lineHeight: '16px',
      [mdBreakpoint]: {
        paddingLeft: '15px',
        paddingRight: '35px',
      },
      '@media (max-width: 600px)': {
        paddingLeft: '8px',
        paddingRight: '28px',
      },
    },
    expandToggle: {
      cursor: 'pointer',
      position: 'absolute',
      top: '5px',
      right: '20px',
      display: 'flex',
      alignItems: 'flex-start',
      '&:hover': {
        opacity: '0.7',
      },
      '@media (max-width: 600px)': {
        top: '18px', // Position to align with value text on mobile
        right: '0px',
      },
    },
    expandIcon: {
      fontSize: '18px',
      color: '#000000',
      [mdBreakpoint]: {
        fontSize: '18px',
      },
      '@media (max-width: 600px)': {
        fontSize: '16px',
      },
    },
    treatmentTextContainer: {
      width: '100%',
      minWidth: 0,
    },
    clickableText: {
      cursor: 'pointer',
      '&:hover': {
        opacity: '0.7',
      },
    },
    customTooltip: {
      backgroundColor: '#ffffff',
      color: '#000000',
      border: '1px solid #000000',
      fontSize: '14px',
      fontFamily: 'Inter',
      padding: '12px 16px',
      borderRadius: '4px',
      maxWidth: '400px',
      wordWrap: 'break-word',
      lineHeight: '1.4',
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    },
    customTooltipArrow: {
      color: '#000000',
      '&:before': {
        backgroundColor: '#ffffff',
        border: '1px solid #000000',
      },
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
    topRightButton: {
      marginTop: '0px !important',
      width: '160px',
      [mdBreakpoint]: {
        width: '189px',
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
    '@keyframes slideInLeft': {
      '0%': {
        opacity: 0,
        transform: 'translateX(-10px)',
      },
      '100%': {
        opacity: 1,
        transform: 'translateX(0)',
      },
    },
    '@keyframes fadeIn': {
      '0%': {
        opacity: 0,
      },
      '100%': {
        opacity: 1,
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
    dropdownItemWithSubmenu: {
      padding: '12px 12px',
      borderBottom: '1px solid #07679C',
      height: '41px',
      minHeight: '41px',
      '&:first-child': {
        borderTop: '1px solid #07679C',
      },
      '&:hover': {
        backgroundColor: '#DEE4EC',
      },
      '&:active': {
        backgroundColor: '#e9ecef',
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
    cohortDropdown: {
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #07679C',
      animation: '$fadeIn 0.15s ease-out',
    },
    cohortList: {
      padding: 0,
      margin: 0,
      maxHeight: '250px',
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#07679C',
        borderRadius: '0px',
      },
    },
    cohortItem: {
      padding: '6px 12px 6px 24px',
      borderBottom: '1px solid #07679C',
      height: '27px',
      minHeight: '27px',
      '&:first-child': {
        borderTop: '1px solid #07679C',
      },
      '&:last-child': {
        borderBottom: 'none',
      },
      '&:hover': {
        backgroundColor: '#e9ecef',
      },
      '&:active': {
        backgroundColor: '#dee2e6',
      },
    },
    cohortItemText: {
      '& .MuiListItemText-primary': {
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: '12px',
        color: '#07679C',
        textTransform: 'capitalize',
      },
    }
  }
});

export default useStyles;
