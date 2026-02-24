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

const SamplesCard = ({ data = {}, index }) => {
  const {
    sample_id,
    participant_id,
    study_id,
    sample_anatomic_site_str,
    sample_tumor_status,
    diagnosis_str,
    tumor_classification,
    diagnosis_category_str,
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
    navigate(`/explore?p_id=${participant_id}&tab=2`);
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
      {/* Header with sample title and view button */}
      <div className={classes.cardHeader}>
        <Grid container alignItems="flex-start">
          <Grid item xs className={classes.titleContainer}>
            <div className={cn(classes.keyAndValueRow, classes.titleRow)}>
              <span className={classes.titleKey}>SAMPLES</span>
              {(() => {
                const { truncated, needsTruncation } = truncateTitle(sample_id, containerWidth);
                return needsTruncation ? (
                  <Tooltip 
                    title={sample_id} 
                    placement="top"
                    classes={{
                      tooltip: classes.customTooltip,
                      arrow: classes.customTooltipArrow
                    }}
                    arrow
                  >
                    <Typography variant="h3" className={classes.titleValue}>
                      {truncated}
                    </Typography>
                  </Tooltip>
                ) : (
                  <Typography variant="h3" className={classes.titleValue}>
                    {sample_id}
                  </Typography>
                );
              })()}
            </div>
          </Grid>
          
          {/* View in Explore button moved to top right */}
          {participant_id && (
            <Grid item className={classes.buttonAlignWithTitle}>
              <Button className={classes.button} variant="outlined" onClick={() => handleClick()}>
                VIEW IN EXPLORE
              </Button>
            </Grid>
          )}
        </Grid>
      </div>
      
      {/* Content area */}
      <Grid item container>
        <Grid item xs={true}>
          <div className={classes.row}>
            <div className={classes.column}>
              {renderInfo('Participant ID:', participant_id)}
              {renderInfo('Sample Anatomic Site:', sample_anatomic_site_str)}
              {renderInfo('Sample Diagnosis:', diagnosis_str)}
              {renderInfo('Diagnosis Category:', diagnosis_category_str)}
            </div>

            <div className={cn(classes.column, classes.leftColumn)}>
              {renderInfo('Study ID:', study_id)}
              {renderInfo('Sample Tumor Status:', sample_tumor_status)}
              {renderInfo('Tumor Classification:', tumor_classification)}
            </div>
          </div>
        </Grid>


      </Grid>
    </div>
  );
};

export default SamplesCard;