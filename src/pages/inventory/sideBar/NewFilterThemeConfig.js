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
        '&.diagnosisCheckedEven': {
          backgroundColor: '#BBCFC840',
        },
        '&.diagnosisCheckedOdd': {
          backgroundColor: '#E4ECE940',
        },
        '&.demographicsCheckedEven': {
          backgroundColor: '#C8A4C840',
        },
        '&.demographicsCheckedOdd': {
          backgroundColor: '#E1C9E140',
        },
        '&.treatmentCheckedEven': {
          backgroundColor: '#D9DFFF40',
        },
        '&.treatmentCheckedOdd': {
          backgroundColor: '#DCDEED40',
        },
        '&.treatmentresponseCheckedEven': {
          backgroundColor: '#D9C5A040',
        },
        '&.treatmentresponseCheckedOdd': {
          backgroundColor: '#F0DFBD40',
        },
        '&.survivalCheckedEven': {
          backgroundColor: '#E1B4AD40',
        },
        '&.survivalCheckedOdd': {
          backgroundColor: '#F8D7D240',
        },
        '&.samplesCheckedEven': {
          backgroundColor: '#9FBCDD40',
        },
        '&.samplesCheckedOdd': {
          backgroundColor: '#CEDEF040',
        },
        '&.datacategoryCheckedEven': {
          backgroundColor: '#95C6B340',
        },
        '&.datacategoryCheckedOdd': {
          backgroundColor: '#DDEAE540',
        },
        '&.studyCheckedEven': {
          backgroundColor: '#BBCFC840',
        },
        '&.studyCheckedOdd': {
          backgroundColor: '#E4ECE940',
        },
        '&.sequencinglibraryCheckedEven': {
          backgroundColor: '#C8A4C840',
        },
        '&.sequencinglibraryCheckedOdd': {
          backgroundColor: '#E1C9E140',
        },
      },
    },
    MuiSvgIcon: {
      root: {
        '&.demographicsCheckedIcon': {
          color: '#6D5F5B',
        },
        '&.diagnosisCheckedIcon': {
          color: '#6D5F5B',
        },
        '&.samplesCheckedIcon': {
          color: '#6D5F5B',
        },
        '&.datacategoryCheckedIcon': {
          color: '#6D5F5B',
        },
        '&.studyCheckedIcon': {
          color: '#6D5F5B',
        },
        '&.sequencinglibraryCheckedIcon': {
          color: '#6D5F5B',
        },
      },
    },
    MuiTypography: {
      root: {
        '&.diagnosisSubjects': {
          color: '#357288',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.demographicsSubjects': {
          color: '#7D267E',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.treatmentSubjects': {
          color: '#1F6BBF',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.treatmentresponseSubjects': {
          color: '#E9B34A',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.survivalSubjects': {
          color: '#CD5C4E',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.samplesSubjects': {
          color: '#1F6BBF',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.datacategorySubjects': {
          color: '#60C4A1',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.studySubjects': {
          color: '#357288',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
        },
        '&.sequencinglibrarySubjects': {
          color: '#7D267E',
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          fontWeight: '600',
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
          backgroundColor: '#4150A4',
        },
        '&.divider3': {
          backgroundColor: '#E9B34A',
        },
        '&.divider4': {
          backgroundColor: '#CD5C4E',
        },
        '&.divider5': {
          backgroundColor: '#1F6BBF',
        },
        '&.divider6': {
          backgroundColor: '#60C4A1',
        },
        '&.divider7': {
          backgroundColor: '#357288',
        },
        '&.divider8': {
          backgroundColor: '#974599',
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
