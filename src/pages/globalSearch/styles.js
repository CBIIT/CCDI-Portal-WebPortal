
import searchBackground from './assets/globalSearchBackground.png';

// Spacing between tabs is set with a gap on the tab row so the row stays
// centered no matter how many tabs or how wide their counts are.
const buttonRoot = {
  // Height comes from the label so the filter bar's spacing can be set
  // directly, instead of being padded out by Material-UI's 48px tab minimum.
  height: 'auto',
  minHeight: '0px',
  minWidth: '0px',
  fontSize: '16px',
  textTransform: 'none',
  whiteSpace: 'nowrap',
  flexShrink: 0,
};

const styles = () => ({
  'global_search_tab_label_1': {
    border: '1px solid black'
  },
  allText: {
    marginLeft: '8px',
  },
  subjectTab: {
    color: '#142D64',
  },
  indicator: {
    backgroundColor: '#0A5E63',
    height: '4px',
  },
  tabContainter: {
    display: 'flex',
    boxSizing: 'border-box',
    maxWidth: '1200px',
    height: 'auto',
    minHeight: '0px',
    margin: '0 auto',
    padding: '0px 20px',
    // Centers the row on the same axis as the result cards, whatever the tab
    // labels and counts add up to. JSS comma-joins array values, so this has to
    // stay a single keyword.
    '& .MuiTabs-flexContainer': {
      justifyContent: 'center',
      gap: '16px',
    },
    // Keep every tab reachable if the labels are wider than the viewport.
    '& .MuiTabs-fixed': {
      overflowX: 'auto',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    '@media (min-width: 1300px)': {
      '& .MuiTabs-flexContainer': {
        gap: '30px',
      },
    },
    '& .MuiTab-root': {
      height: 'auto',
      minHeight: '0px',
      paddingTop: '0px',
      paddingRight: '0px',
      paddingLeft: '0px',
      // Sit the label 5px above the selected tab indicator.
      paddingBottom: '5px',
      alignItems: 'flex-end',
    },
    // Collapse the whitespace the global search library renders between its
    // label and count spans, so the label's own spacing is the only gap.
    '& .MuiTab-wrapper > span': {
      fontSize: '0px',
    },
    // The count is rendered inside the label instead, formatted with separators.
    '& span[id^="global_search_tab_count"]': {
      display: 'none',
    },
    '@media (max-width: 1023px)': {
      display: 'none',
    },
  },
  tabLabel: {
    display: 'inline-flex',
    alignItems: 'baseline',
    whiteSpace: 'nowrap',
  },
  tabCategory: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '16px',
    letterSpacing: '0px',
    color: '#0A5E63',
  },
  tabCount: {
    fontFamily: 'Poppins',
    fontWeight: '300',
    fontSize: '15px',
    lineHeight: '14px',
    letterSpacing: '0px',
    color: '#0B3556',
    marginLeft: '10px',
  },
  tabColor: { color: '#142D64' },
  allButton: {
    ...buttonRoot,
  },
  participantButton: {
    ...buttonRoot,
    whiteSpace: 'nowrap',
  },
  samplesButton: {
    ...buttonRoot,
    whiteSpace: 'nowrap',
  },
  studiesButton: {
    ...buttonRoot,
    whiteSpace: 'nowrap',
  },
  filesButton: {
    ...buttonRoot,
    whiteSpace: 'nowrap',
  },
  aboutButton: {
    ...buttonRoot,
    whiteSpace: 'nowrap',
  },
  modelButton: {
    ...buttonRoot,
  },
  input: {
    borderRadius: '8px',
    borderColor: '#616161',
    color: '#747474',
    fontFamily: 'Lato',
    fontSize: '25px',
  },
  heroArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '146px',
    // Square at the top so the banner sits flush against the header.
    borderRadius: '0px 0px 10px 10px',
    // Tint the molecule artwork so the white title stays legible across it.
    backgroundImage: `linear-gradient(90deg, rgba(12, 106, 126, 0.85) 0%, rgba(22, 120, 125, 0.85) 40%, rgba(44, 131, 95, 0.85) 100%), url(${searchBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    backgroundRepeat: 'no-repeat',
    '@media (max-width: 749px)': {
      height: '154px',
      borderRadius: '0px 0px 12px 12px',
    },
  },
  searchArea: {
    maxWidth: '1200px',
    margin: '0px auto',
    padding: '0px 20px',
    '@media (max-width: 1023px)': {
      padding: '0px 16px',
    },
  },
  searchTitle: {
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: '32px',
    lineHeight: '48px',
    margin: '0px',
    textAlign: 'center',
  },
  searchBarArea: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    // The gap down to the filter bar is owned by bodyContainer's top padding.
    marginBottom: '0px',
    '@media (max-width: 1023px)': {
      marginTop: '18px',
      marginBottom: '12px',
      width: '100%',
    },
  },
  searchContainer: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    alignItems: 'stretch',
    '@media (max-width: 1023px)': {
      gridTemplateColumns: 'minmax(0, 1fr) 84px',
      width: '100%',
    },
    '@media (max-width: 749px)': {
      gridTemplateColumns: 'minmax(0, 1fr) 48px',
    },
  },
  searchButton: {
    width: '84px',
    background: '#0A5E63',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0px 4px 4px 0px',
    '&:hover': {
      cursor: 'pointer',
      background: '#084B4F',
    },
    '@media (max-width: 749px)': {
      width: '48px',
      padding: '0px',
    },
  },
  searchButtonText: {
    '@media (max-width: 749px)': {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0px',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: '0px',
    },
  },
  mobileSearchIcon: {
    display: 'none',
    '@media (max-width: 749px)': {
      display: 'block',
      fontSize: '26px',
    },
  },
  autocomplete: {
    width: '492px',
    '& .MuiAutocomplete-inputRoot[class*="Mui-focused"]': {
      outline: '4px solid #3395CA',
    },
    '@media (max-width: 1023px)': {
      width: '100%',
      minWidth: '0px',
    }
  },
  mobileCategorySelector: {
    display: 'none',
    '@media (max-width: 1023px)': {
      display: 'block',
      position: 'relative',
      marginBottom: '20px',
    },
  },
  mobileCategoryLabel: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0px',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0px',
  },
  mobileCategorySelect: {
    width: '100%',
    height: '42px',
    padding: '0px 42px 0px 10px',
    appearance: 'none',
    WebkitAppearance: 'none',
    backgroundColor: '#FFFFFF',
    border: '2px solid #08838D',
    borderRadius: '4px',
    color: '#0A5E63',
    fontFamily: 'Poppins',
    // Semibold for the selected category, medium for the options.
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '24px',
    '& option': {
      fontWeight: '500',
    },
    '&:focus': {
      outline: '4px solid #3395CA',
      outlineOffset: '1px',
    },
  },
  mobileCategoryIcon: {
    position: 'absolute',
    right: '8px',
    top: '8px',
    color: '#0A5E63',
    pointerEvents: 'none',
  },
  chipSection: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: '10px',
    },
  },
  enterIcon: {
    height: '12px',
    margin: '0px 18px 0px 6px',
  },
  button: {
    borderRadius: '30px',
    width: '100px',
    lineHeight: '37px',
    fontSize: '16px',
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    color: '#000',
    backgroundColor: '#fff',
    marginTop: '32px',
    marginBottom: '32px',
    marginRight: '24px',
    borderWidth: '1px',
    borderColor: 'black',
  },
  bodyContainer: {
    background: '#FFFFFF',
    color: '#000000',
    fontSize: '15px',
    lineHeight: '22px',
    marginBottom: '108px',
    boxSizing: 'border-box',
    // 46px sets the distance from the search bar down to the filter bar.
    padding: '46px 20px 0px',
    '& .MuiTabPanel-root': {
      padding: '0px !important',
    },
    '@media (max-width: 1023px)': {
      padding: '0px 16px',
    },
  },
  searchResultsContainer: {
    '@media (max-width: 1023px)': {
      '& > .MuiBox-root:first-child': {
        borderBottom: 'none !important',
      },
    },
  },
  width1100: {
    maxWidth: '1100px',
    margin: '0px auto 0px auto',
  },
  searchItem: {
    minHeight: '100px',
    padding: '16px',
  },
  backdrop: {
    // position: 'absolute',
    zIndex: 99999,
    background: 'rgba(0, 0, 0, 0.1)',
  },
  filterIcon: {
    height: '0.86rem',
    margin: '0px 16px 0px 6px',
    display: 'inline-flex',
    verticalAlign: 'middle',
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-root': {
      background: '#fff',
      height: '46px',
      paddingLeft: '24px',
      paddingTop: '0px',
      paddingBottom: '0px',
      color: '#1B1B1B',
      fontFamily: 'Roboto, Lato',
      fontSize: '16px',
      borderRadius: '4px 0px 0px 4px',
      '& fieldset': {
        border: '2px solid #08838D',
      },
      '&.Mui-focused fieldset': {
        border: '2px solid #08838D',
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '0px',
      '&::placeholder': {
        fontFamily: 'Roboto, lato',
        color: '#0A5E63', // Placeholder text color
        opacity: 1,
      },
    },
  },
  // Popper
  root: {
    marginTop: '-5px',
    zIndex: 1100,
    '& .MuiPaper-root': {
      borderRadius: 0,
    },
    '& .MuiAutocomplete-listbox': {
      fontFamily: 'Roboto, Lato',
      fontSize: '16px',
      color: '#1B1B1B',
      fontWeight: 500,
      border: '.5px solid #1B1B1B',
      padding: '0px',
      '& li': {
        // list item specific styling
      },
      '& :hover': {
        color: 'white',
        backgroundColor: '#007BBD',
      },
    },
  },
  searchIcon: {
    height: '22px',
    margin: '0px 6px 0px 6px',
  },
  searchIconSpan: {
    cursor: 'pointer',
    zIndex: 40,
  },
  clearIcon: {
    height: '18px',
  },
  filterByIconContainer: {
    marginRight: '12px',
  },
  filterByIcon: {
    color: '#142D64',
    verticalAlign: 'middle',
  },
  filterByTextContainer: {
    marginRight: '60px',
    fontSize: '16px',
    lineHeight: '16px',
    color: '#142D64',
    '@media (max-width: 1000px)': {
      marginRight: '30px',
    }
  },
  totalResults: {
    color: '#13666A',
    fontFamily: 'Poppins',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '31px',
    letterSpacing: '0.02em',
    textAlign: 'left',
    paddingLeft: '35px',
    // Matches subsectionBody so the count stays aligned with the card edge.
    maxWidth: '1079px',
    // Sets the distance from the filter bar down to the results count. The 31px
    // line box carries ~9px of leading above the glyphs, so this renders as the
    // ~49px of visible space the design shows between the two.
    margin: '40px auto 2px auto',
    textTransform: 'lowercase',
    '@media (max-width: 1023px)': {
      paddingLeft: '16px',
      margin: '0px auto 8px auto',
      maxWidth: '100%',
    },
  },
  totalCount: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: '18px',
    lineHeight: '0%',
    color: '#13666A',
  },
  subsection: {
    borderBottom: '1px solid #8A8A8A',
    paddingBottom: '22px',
    paddingTop: '5px',
    '@media (max-width: 1023px)': {
      borderBottom: 'none',
      paddingTop: '0px',
      paddingBottom: '0px',
    },
  },
  subsectionBody: {
    boxSizing: 'border-box',
    padding: '0px 16px',
    // 1047px card + 32px padding, so cards keep their full width on wide
    // screens and shrink with the column on anything narrower.
    maxWidth: '1079px',
    minWidth: '0px',
    width: '100%',
    flexBasis: '100%',
    '@media (max-width: 1023px)': {
      boxSizing: 'border-box',
      maxWidth: '100%',
      minWidth: '0px',
      width: '100%',
      flexBasis: '100%',
      padding: '0px',
    },
  },
  paginationContainer: {
    paddingBottom: '0px',
  },
  perPageContainer: {
    display: 'flex',
    fontFamily: 'Poppins',
    fontWeight: '300',
    fontSize: '14px',
    color: '#045B80',
    marginTop: '15px',
    '@media (max-width: 767px)': {
      display: 'none',
    },
  },
  pageSizeContainer: {
    marginLeft: '10px',
    userSelect: 'none',
    height: '20px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  pageSizeList: {
    position: 'relative',
    top: '25px',
    left: '-40px',
    width: '45px',
    background: '#F5F5F5',
    border: '1px solid #99A1B7',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  pageSizeListHidden: {
    position: 'relative',
    top: '25px',
    left: '-30px',
    width: '45px',
    border: '1px solid #99A1B7',
    visibility: 'hidden',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  pageSizeItem: {
    padding: '2px 8px',
    '&:hover': {
      cursor: 'pointer',
      color: '#000000',
    },
  },
  showingContainer: {
    display: 'flex',
    position: 'relative',
    left: '-14px',
  },
  showingRangeContainer: {
    minWidth: '40px',
    textAlign: 'center',
  },
  pageSizeArrowUp: {
    content: "",
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderBottom: '1.5px solid #045B80',
    borderLeft: '1.5px solid #045B80',
    margin: '1px 3px 1px 10px',
    transform: 'rotate(135deg)',
  },
  pageSizeArrowDown: {
    content: "",
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderBottom: '1.5px solid #045B80',
    borderLeft: '1.5px solid #045B80',
    margin: '1px 3px 3px 10px',
    transform: 'rotate(-45deg)',
  },
  pageContainer: {
    display: 'flex',
    height: '32px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  prevButtonContainer: {
    marginLeft: '10px',
    border: '1px solid #99A1B7',
    height: '32px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  prevButtonDisabledContainer: {
    marginLeft: '10px',
    border: '1px solid #99A1B7',
    height: '32px',
    '&:hover': {
      cursor: 'default',
    },
  },
  prevButton: {
    content: "",
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderBottom: '1px solid #045B80',
    borderLeft: '1px solid #045B80',
    margin: '13px 9px 0 11px',
    transform: 'rotate(45deg)',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  prevButtonDisabled: {
    content: "",
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderBottom: '1px solid #99A1B7',
    borderLeft: '1px solid #99A1B7',
    margin: '13px 9px 0 11px',
    transform: 'rotate(45deg)',
  },
  nextButtonContainer: {
    borderTop: '1px solid #99A1B7',
    borderRight: '1px solid #99A1B7',
    borderBottom: '1px solid #99A1B7',
    height: '32px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  nextButtonDisabledContainer: {
    borderTop: '1px solid #99A1B7',
    borderRight: '1px solid #99A1B7',
    borderBottom: '1px solid #99A1B7',
    height: '32px',
    '&:hover': {
      cursor: 'default',
    },
  },
  nextButton: {
    content: "",
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderBottom: '1px solid #045B80',
      borderLeft: '1px solid #045B80',
    margin: '13px 11px 0 9px',
    transform: 'rotate(225deg)',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  nextButtonDisabled: {
    content: "",
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderBottom: '1px solid #99A1B7',
    borderLeft: '1px solid #99A1B7',
    margin: '13px 11px 0 9px',
    transform: 'rotate(225deg)',
  },
  noData: {
    margin: 'auto',
    textAlign: 'center',
  },
});

export default styles;
