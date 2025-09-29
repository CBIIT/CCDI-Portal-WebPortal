import React, { useState, useRef, useEffect } from 'react';
import {
  Grid, Typography, Button, Tooltip
} from '@material-ui/core';
import useStyles from './style';
import { cn } from 'bento-components';
import { AddToCart } from '@bento-core/table';
import { Link } from 'react-router-dom';

const removeSquareBracketsFromString = (text) => {
  return text.replace(/\[|\]/g, '');
}

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1000
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

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

const FilesCard = ({ data = {}, index }) => {
  const {
    id,
    file_name,
    data_category,
    participant_id,
    file_description,
    study_id,
    file_type,
    sample_id,
    file_size,
  } = data;
  const classes = useStyles();
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
      {/* Header with file title and add to cart button */}
      <div className={classes.cardHeader}>
        <Grid container alignItems="flex-start">
          <Grid item xs className={classes.titleContainer}>
            <div className={cn(classes.keyAndValueRow, classes.titleRow)}>
              <span className={classes.titleKey}>FILES</span>
              {!participant_id ? (() => {
                const { truncated, needsTruncation } = truncateTitle(file_name, containerWidth);
                return needsTruncation ? (
                  <Tooltip 
                    title={file_name} 
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
                    {file_name}
                  </Typography>
                );
              })() : (() => {
                const { truncated, needsTruncation } = truncateTitle(file_name, containerWidth);
                return needsTruncation ? (
                  <Tooltip 
                    title={file_name} 
                    placement="top"
                    classes={{
                      tooltip: classes.customTooltip,
                      arrow: classes.customTooltipArrow
                    }}
                    arrow
                  >
                    <Button component={Link} to={`/explore?p_id=${participant_id}`} className={classes.titleLink}>
                      {truncated}
                    </Button>
                  </Tooltip>
                ) : (
                  <Button component={Link} to={`/explore?p_id=${participant_id}`} className={classes.titleLink}>
                    {file_name}
                  </Button>
                );
              })()}
            </div>
          </Grid>
          
          {/* Add to Cart button moved to top right */}
          <Grid item className={classes.buttonAlignWithTitle}>
            <AddToCart
              fileId={id}
              buttonStyle={{
                width: '189px',
                height: '41px',
                alignSelf: 'end',
                color: '#07679C',
                borderColor: '#07679C',
                fontFamily: 'Poppins',
                fontWeight: '600',
                fontSize: '12px',
                marginTop: '0px',
                lineHeight: '13px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 12px',
                borderRadius: '8px',
                transition: 'border-radius 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: '#DEE4EC !important',
                },
              }}
              className={classes.addToCartButton}
            />
          </Grid>
        </Grid>
      </div>
      
      {/* Content area */}
      <div className={classes.contentArea}>
        {/* Data Category - Line 1 */}
        <div className={classes.propertyLine}>
          {renderInfo('Data Category:', removeSquareBracketsFromString(data_category))}
        </div>
        
        {/* File Description - Line 2 */}
        <div className={classes.propertyLine}>
          {renderInfo('File Description:', file_description)}
        </div>
        
        {/* File Type, File Size - Line 3 */}
        <div className={classes.groupedProperties}>
          <div className={classes.propertyGroup}>
            {renderInfo('File Type:', file_type)}
          </div>
          <div className={classes.propertyGroup}>
            {renderInfo('File Size:', formatBytes(file_size))}
          </div>
          <div className={classes.propertyGroup}>
            {/* Empty space to align with Sample column */}
          </div>
        </div>
        
        {/* Participant, Study ID, Sample - Line 4 */}
        <div className={classes.groupedProperties}>
          <div className={classes.propertyGroup}>
            {renderInfo('Participant:', participant_id)}
          </div>
          <div className={classes.propertyGroup}>
            {renderInfo('Study ID:', study_id)}
          </div>
          <div className={classes.propertyGroup}>
            {renderInfo('Sample:', sample_id)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesCard;