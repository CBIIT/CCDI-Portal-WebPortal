import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Anchor = ({ link, text, classes }) => {
  return link.match(/\w+:\/\//) ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className={classes.link}>
      {text}
    </a>
  ) : (
    <Link to={link} className={classes.link}>
      {text}
    </Link>
  );
};

const AboutCard = ({
  searchText, data, classes, index,
}) => {
  const results = data.text.map((result) => result.replaceAll('$', ''));

  function getHighlightedText(text, highlight, classes) {
    // Split on highlight term and include term into parts, ignore case
    const textString = text.reduce((searchResults, currentString) => {
      const punctuationRegex = /[.,:;!?]$/;
      let newResults = searchResults;

      if (punctuationRegex.test(currentString)) {
        newResults = `${`${newResults} ${currentString.slice(0, -1)}`} ...`;
      } else {
        newResults = `${`${newResults} ${currentString}`} ... `;
      }
      return newResults;
    }, '');
    const parts = textString.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {' '}
        {parts.map((part, i) => (
          <span id={i} className={part.toLowerCase() === highlight.toLowerCase() ? classes.highlightText : {}}>
            {part}
          </span>
        ))}
        {' '}
      </span>
    );
  }

  return (
    <Grid item container className={classes.card} id={`global_search_card_${index}`}>
      <Grid item className={classes.indexContainer}>
        {index + 1}
      </Grid>
      <Grid item xs={true} className={classes.propertyContainer}>
        <div className={classes.titleRow}>
          <span className={classes.detailContainerHeader}>ABOUT</span>
          <Typography variant="h3" className={classes.cardTitle}>
            {data.title}
          </Typography>
        </div>
        <div className={classes.cardBody}>
          <div className={classes.text}>{getHighlightedText(results, searchText, classes)}</div>
          <div className={classes.linkText}>
            <Anchor link={data.page} text={`${window.location.origin}${data.page}`} classes={classes} />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

const styles = (theme) => {
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
      [lgBreakpoint]: {
        marginLeft: '20px',
      },
    },
    titleRow: {
      marginBottom: '5px',
      display: 'flex',
    },
    detailContainerHeader: {
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
      backgroundColor: '#BC8924',
    },
    cardTitle: {
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
    cardBody: {
      fontFamily: 'Inter',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '22px',
      letterSpacing: '2%',
      textAlign: 'left',
      margin: '0px',
      marginTop: '-2px',
    },
  };
};

export default withStyles(styles, { withTheme: true })(AboutCard);
