import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = {
  overrides: {
    Mui: {
      '&$expanded': {
        margin: '0px 0px',
      },
      checked: {
        color: 'red',
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: '0px 1px 0px',
      },
    },
    MuiAccordion: {
      root: {
        '&$expanded': {
          margin: 'auto',
        },
      },
    },
    MuiAccordionSummary: {
      content: {
        margin: '0',
      },
    },
    MuiList: {
      padding: {
        paddingTop: '0',
        paddingBottom: '0',
      },
    },
    MuiCheckbox: {
      colorSecondary: {
        '&:first-child': {
          color: '#000000',
        },
      },
    },
    MuiListItem: {
      root: {
        '&.demographicCheckedEven': {
          backgroundColor: '#CBDFE0',
        },
        '&.demographicCheckedOdd': {
          backgroundColor: '#E4ECE9',
        },
        '&.diagnosisCheckedEven': {
          backgroundColor: '#C8A4C8',
        },
        '&.diagnosisCheckedOdd': {
          backgroundColor: '#E1C9E1',
        },
        '&.samplesCheckedEven': {
          backgroundColor: '#D9C5A0',
        },
        '&.samplesCheckedOdd': {
          backgroundColor: '#F0DFBD',
        },
        '&.assayCheckedEven': {
          backgroundColor: '#E1B4AD',
        },
        '&.assayCheckedOdd': {
          backgroundColor: '#F8D7D2',
        },
        '&.studyCheckedEven': {
          backgroundColor: '#9FBCDD',
        },
        '&.studyCheckedOdd': {
          backgroundColor: '#CEDEF0',
        },
        '&.libraryCheckedEven': {
          backgroundColor: '#95C6B3',
        },
        '&.libraryCheckedOdd': {
          backgroundColor: '#DDEAE5',
        },
      },
    },
    MuiSvgIcon: {
      root: {
        '&.casesCheckedIcon': {
          color: '#10a075',
        },
        '&.samplesCheckedIcon': {
          color: '#10beff',
        },
        '&.filesCheckedIcon': {
          color: '#e636e4',
        },
      },
    },
    MuiTypography: {
      root: {
        '&.demographicSubjects': {
          color: '#357288',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.diagnosisSubjects': {
          color: '#7D267E',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.samplesSubjects': {
          color: '#897E67',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.assaySubjects': {
          color: '#A85348',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.studySubjects': {
          color: '#24568E',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
        },
        '&.librarySubjects': {
          color: '#14835C',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
        },
      },
    },
    MuiDivider: {
      middle: {
        marginLeft: '0px',
        marginRight: '0px',
      },
      root: {
        height: '8px',
        '&.divider0': {
          backgroundColor: '#4D889E',
        },
        '&.divider1': {
          backgroundColor: '#974599',
        },
        '&.divider2': {
          backgroundColor: '#E9B34A',
        },
        '&.divider3': {
          backgroundColor: '#CD5C4E',
        },
        '&.divider4': {
          backgroundColor: '#1F6BBF',
        },
        '&.divider5': {
          backgroundColor: '#60C4A1',
        },
      },
    },
    checkboxRoot: {
      color: 'inherit',
      '&$checked': {
        color: '#8DCAFF',
      },
    },
  },
};

export default ({
  children,
}) => {
  const computedTheme = createTheme(theme);
  return (
    <ThemeProvider theme={computedTheme}>
      {children}
    </ThemeProvider>
  );
};
