import { Grid, withStyles, Tooltip } from '@material-ui/core';
import React, { useState, useRef, useEffect } from 'react';
import { prepareLinks } from '@bento-core/util';
import PropertyItem from './PropertyItem';

const CARD_PROPERTIES = [
  {
    label: 'Data Model Node',
    dataField: 'node_name',
  },
  {
    label: 'Property Name',
    dataField: 'property_name',
  },
  {
    label: 'Property Description',
    dataField: 'property_description',
    hasBreakLine: true,
  },
  // {
  //   label: 'Property Required',
  //   dataField: 'property_required',
  // },
  // {
  //   label: 'Property Type',
  //   dataField: 'property_type',
  // },
  // {
  //   label: 'Property Value',
  //   dataField: 'value',
  // },
  {
    label: 'Page Link',
    dataField: 'node_name',
    link: '/data-model',
    linkText: 'Data Model',
  },
];

// Utility function to truncate title with start...end format
const truncateTitle = (title, containerWidth) => {
  if (!title || !containerWidth) return { truncated: title, needsTruncation: false };
  
  const maxTitleWidth = containerWidth * 0.5; // 50% of container width
  
  // Create temporary element to measure text width
  const tempElement = document.createElement('span');
  tempElement.style.position = 'absolute';
  tempElement.style.visibility = 'hidden';
  tempElement.style.fontSize = '18px';
  tempElement.style.fontFamily = 'Inter';
  tempElement.style.fontWeight = '500';
  tempElement.textContent = title;
  
  document.body.appendChild(tempElement);
  const titleWidth = tempElement.offsetWidth;
  document.body.removeChild(tempElement);
  
  if (titleWidth <= maxTitleWidth) {
    return { truncated: title, needsTruncation: false };
  }
  
  const ellipsisWidth = 20;
  const availableWidth = maxTitleWidth - ellipsisWidth;
  const charWidth = titleWidth / title.length;
  const availableChars = Math.floor(availableWidth / charWidth);
  
  if (availableChars <= 6) {
    return { truncated: title.substring(0, Math.max(3, availableChars)) + '...', needsTruncation: true };
  }
  
  const startChars = Math.ceil(availableChars * 0.6);
  const endChars = Math.floor(availableChars * 0.4);
  
  const startText = title.substring(0, startChars);
  const endText = title.substring(title.length - endChars);
  
  return { 
    truncated: `${startText}...${endText}`, 
    needsTruncation: true 
  };
};

const ValueCard = ({ data, classes, index }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const cardRef = useRef(null);
  
  useEffect(() => {
    const measureWidth = () => {
      if (cardRef.current) {
        setContainerWidth(cardRef.current.offsetWidth);
      }
    };
    measureWidth();
    window.addEventListener('resize', measureWidth);
    return () => window.removeEventListener('resize', measureWidth);
  }, []);
  
  const propertiesWithLinks = prepareLinks(CARD_PROPERTIES, data);
  const { truncated, needsTruncation } = truncateTitle(data.value, containerWidth);
  
  return (
    <Grid item container className={classes.card} id={`global_search_card_${index}`} ref={cardRef}>
      <Grid item xs={true} className={classes.propertyContainer}>
        <div className={classes.titleRow}>
          {needsTruncation ? (
            <Tooltip title={data.value} placement="top">
              <span className={classes.detailContainerHeader}>MODEL: {truncated}</span>
            </Tooltip>
          ) : (
            <span className={classes.detailContainerHeader}>MODEL: {data.value}</span>
          )}
        </div>
        {propertiesWithLinks.map((prop, idx) => (
          <PropertyItem
            index={idx}
            value={data[prop.dataField]}
            {...prop}
          />
        ))}
      </Grid>
      <Grid item xs={12} className={classes.hrContainer}>
        <hr className={classes.hr}/>
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
        minWidth: '959px',
        width: '959px',
      },
      maxWidth: '800px',
      padding: '24px 16px 24px 20px',
    },
    indexContainer: {
      fontFamily: 'Roboto',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '16px',
      letterSpacing: '0px',
      textAlign: 'left',
      color: '#747474',
      width: '25px',
      marginRight: '20px',
      [mdBreakpoint]: {
        width: '49px',
      }
    },
    titleRow: {
      display: 'flex',
      margin: '0px',
      padding: '0px',
      marginBottom: '5px',
    },
    detailContainerHeader: {
      textTransform: 'uppercase',
      backgroundColor: '#F4D5D1',
      color: '#092630',
      verticalAlign: 'middle',

      fontFamily: 'Roboto',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '12px',
      letterSpacing: '0em',
      textAlign: 'left',
      height: '24px',
      padding: '6px 5px',
      borderRadius: '2px',
      gap: '10px',
    },
    cardTitle: {
      textDecoration: 'none',
      fontFamily: 'Inter',
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: '22px',
      color: '#004D73',
      paddingLeft: '10px',
      verticalAlign: 'middle',
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
};

export default withStyles(styles, { withTheme: true })(ValueCard);
