import React, { useState, useRef, useEffect } from 'react';
import {
  Grid, Typography, Button, Tooltip
} from '@material-ui/core';
import useStyles from './style';
import { cn } from 'bento-components';
import { useNavigate } from 'react-router-dom';

/* const removeSquareBracketsFromString = (text) => {
  return text.replace(/\[|\]/g, '');
};*/

// Utility function to truncate title with start...end format
const truncateTitle = (title, containerWidth) => {
  if (!title || !containerWidth) return { truncated: title, needsTruncation: false };
  
  const maxTitleWidth = containerWidth * 0.5; // 50% of container width
  
  // Create temporary element to measure text width
  const tempElement = document.createElement('span');
  tempElement.style.position = 'absolute';
  tempElement.style.visibility = 'hidden';
  tempElement.style.fontSize = '18px'; // Default title font size
  tempElement.style.fontFamily = 'Inter';
  tempElement.style.fontWeight = '500';
  tempElement.textContent = title;
  
  document.body.appendChild(tempElement);
  const titleWidth = tempElement.offsetWidth;
  document.body.removeChild(tempElement);
  
  if (titleWidth <= maxTitleWidth) {
    return { truncated: title, needsTruncation: false };
  }
  
  // Calculate how many characters to show at start and end
  const ellipsisWidth = 20; // Approximate width of "..."
  const availableWidth = maxTitleWidth - ellipsisWidth;
  const charWidth = titleWidth / title.length;
  const availableChars = Math.floor(availableWidth / charWidth);
  
  if (availableChars <= 6) {
    // Too short, just truncate normally
    return { truncated: title.substring(0, Math.max(3, availableChars)) + '...', needsTruncation: true };
  }
  
  const startChars = Math.ceil(availableChars * 0.6); // 60% at start
  const endChars = Math.floor(availableChars * 0.4); // 40% at end
  
  const startText = title.substring(0, startChars);
  const endText = title.substring(title.length - endChars);
  
  return { 
    truncated: `${startText}...${endText}`, 
    needsTruncation: true 
  };
};

const ModelsCard = ({ data = {}, index }) => {
  const {
    property,
    value,
    property_description,
    node,
    category_type,
  } = data;
  const classes = useStyles();
  const navigate = useNavigate();
  const [containerWidth, setContainerWidth] = useState(0);
  const cardRef = useRef(null);

  // Measure container width for title truncation
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

  const handleClick = () => {
    navigate('/data-model');
  };

  const renderInfo = (label, value = '') => (
    <div className={classes.keyAndValueRow}>
      <Typography variant="h6" className={classes.key}>
        {label}
      </Typography>
      <Typography variant="body1" className={classes.value}>
        {value}
      </Typography>
    </div>
  );

  return (
    <div className={classes.card} ref={cardRef}>
      {/* Header with model title and button */}
      <div className={classes.cardHeader}>
        <Grid container alignItems="flex-start">
          <Grid item xs className={classes.titleContainer}>
            <div className={cn(classes.keyAndValueRow, classes.titleRow)}>
              <span className={classes.titleKey}>DATA MODEL</span>
              {(() => {
                const { truncated, needsTruncation } = truncateTitle(value, containerWidth);
                return needsTruncation ? (
                  <Tooltip title={value} placement="top">
                    <Typography variant="h3" className={classes.titleValue}>
                      {truncated}
                    </Typography>
                  </Tooltip>
                ) : (
                  <Typography variant="h3" className={classes.titleValue}>
                    {value}
                  </Typography>
                );
              })()}
            </div>
          </Grid>
          
          {/* Button moved to top right */}
          <Grid item className={classes.buttonAlignWithTitle}>
            <Button className={classes.button} variant="outlined" onClick={() => handleClick()}>
              GO TO DATA MODEL NAVIGATOR
            </Button>
          </Grid>
        </Grid>
      </div>
      
      {/* Content area */}
      <Grid item container >
        <Grid item xs={true}>
          <div className={classes.row}>
            <div className={classes.column}>
              {renderInfo('Data Model Node:', node)}
              {category_type !== 'node' && renderInfo('Property Name:', property)}
              {category_type !== 'node' && renderInfo('Property Description:', property_description)}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ModelsCard;