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
      wordBreak: 'break-all',
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
      backgroundColor: '#4B5AA9',
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
    titleLink: {
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
    },
    cardHeader: {
      marginBottom: '4px',
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
      gap: '4px',
      marginTop: '0px',
    },
    propertyLine: {
      display: 'flex',
      flexDirection: 'column',
      margin: '0px',
      padding: '0px',
      position: 'relative', // For absolute positioning of arrow
      [mdBreakpoint]: {
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
    },
    groupedProperties: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      [mdBreakpoint]: {
        flexDirection: 'row',
        gap: '6px',
        alignItems: 'flex-start',
      },
    },
    propertyGroup: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      minWidth: '0',
      position: 'relative', // For absolute positioning of arrow
      '@media (max-width: 749px)': {
        width: '100%', // Full width on mobile
        maxWidth: '100%',
      },
      [mdBreakpoint]: {
        minWidth: '180px',
        maxWidth: 'none',
      },
      '& $keyAndValueRow': {
        '& $key': {
          whiteSpace: 'nowrap',
          flexShrink: 0,
        },
        '& $value': {
          minWidth: 0,
          flex: 1,
        },
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
    participantContainer: {
      paddingLeft: '15px',
      width: '100%',
      paddingRight: '45px', // Make space for the arrow
      lineHeight: '22px',
      boxSizing: 'border-box',
      [mdBreakpoint]: {
        paddingLeft: '15px',
        paddingRight: '45px',
      },
      '@media (max-width: 749px)': {
        paddingLeft: '8px',
        paddingRight: '40px',
        maxWidth: 'none', // Allow full width on mobile
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
    participantTextContainer: {
      width: '100%',
      minWidth: 0,
      maxWidth: '100%',
      overflow: 'hidden',
      boxSizing: 'border-box',
      '& .MuiTypography-root': {
        maxWidth: '100%',
        boxSizing: 'border-box',
      },
    },
    clickableText: {
      cursor: 'pointer',
      '&:hover': {
        opacity: '0.7',
      },
    },
    sampleContainer: {
      paddingLeft: '15px',
      width: '100%',
      paddingRight: '45px', // Make space for the arrow
      lineHeight: '22px',
      boxSizing: 'border-box',
      [mdBreakpoint]: {
        paddingLeft: '15px',
        paddingRight: '45px',
      },
      '@media (max-width: 749px)': {
        paddingLeft: '8px',
        paddingRight: '40px',
        maxWidth: 'none', // Allow full width on mobile
      },
    },
    sampleTextContainer: {
      width: '100%',
      minWidth: 0,
      maxWidth: '100%',
      overflow: 'hidden',
      boxSizing: 'border-box',
      '& .MuiTypography-root': {
        maxWidth: '100%',
        boxSizing: 'border-box',
      },
    },
  }
});

export default useStyles;
