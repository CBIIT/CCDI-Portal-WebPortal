import React, { useState, useRef, useEffect } from 'react';
import {
  Grid, Typography, Button, Tooltip
} from '@material-ui/core';
import useStyles from './style';
import { cn } from 'bento-components';
import { Link } from 'react-router-dom';
import { ReactComponent as DownArrowIcon } from '../../assets/Down_Arrow.svg';
import { ReactComponent as UpArrowIcon } from '../../assets/Up_Arrow.svg';
import ToastNotification from '../participant/ToastNotification';

const removeSquareBracketsFromString = (text) => {
  return text.replace(/\[|\]/g, '');
}

const formatListWithSemicolons = (text) => {
  if (!text) return text;
  // Remove square brackets and replace commas with semicolons
  return text.replace(/\[|\]/g, '').replace(/,/g, ';');
}

const formatParticipantIdForUrl = (participantId) => {
  if (!participantId) return '';
  
  // If it's already a string, remove brackets and spaces, then replace commas with |
  if (typeof participantId === 'string') {
    return participantId.replace(/\[|\]|\s/g, '').replace(/,/g, '|');
  }
  
  // If it's an array, join with |
  if (Array.isArray(participantId)) {
    return participantId.join('|');
  }
  
  return participantId;
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

const FilesCard = ({ data = {}, index, addFiles, cartFiles = [] }) => {
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
  const [participantExpanded, setParticipantExpanded] = useState(false);
  const [sampleExpanded, setSampleExpanded] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' });
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

  const showNotification = (message, type = 'success') => {
    setNotification({ open: true, message, type });
  };

  const handleNotificationClose = () => {
    setNotification({ open: false, message: '', type: 'success' });
  };

  const handleAddToCart = () => {
    if (!addFiles) {
      console.warn('Cart functionality not available: missing addFiles prop');
      return;
    }

    const upperLimit = 200000;
    const cartCount = cartFiles.length;

    if (cartCount >= upperLimit) {
      showNotification('Cart limit reached. Please remove some files first.', 'error');
      return;
    }

    // Check if file is already in cart
    if (cartFiles.includes(id)) {
      showNotification('File already in cart', 'error');
      return;
    }

    if (cartCount + 1 <= upperLimit) {
      addFiles([id]);
      showNotification('1 File successfully added to your cart', 'success');
    } else {
      showNotification('Cart limit reached. Please remove some files first.', 'error');
    }
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

  const renderParticipant = (label, value = '') => {
    // Simple, reliable character limits based on screen size
    // Reduced to account for the '...' we add manually
    const getMaxLength = () => {
      if (window.innerWidth <= 749) {
        return 85; // Mobile
      } else if (window.innerWidth <= 900) {
        return 47; // Tablet  
      } else if (window.innerWidth <= 1200) {
        return 67; // Small desktop
      } else {
        return 90; // Large desktop - conservative to prevent overflow
      }
    };

    const [maxLength, setMaxLength] = React.useState(getMaxLength());

    // Update character limit on window resize
    React.useEffect(() => {
      const handleResize = () => {
        setMaxLength(getMaxLength());
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const shouldTruncate = value && value.length > maxLength;
    const displayValue = shouldTruncate && !participantExpanded 
      ? value.substring(0, maxLength) 
      : value;

    const handleToggleExpand = () => {
      setParticipantExpanded(!participantExpanded);
    };

    return {
      content: (
        <div className={classes.keyAndValueRow}>
          <Typography variant="h6" className={classes.key}>
            {label}
          </Typography>
          <div className={classes.participantContainer}>
            <Typography 
              variant="body1" 
              className={`${classes.value} ${shouldTruncate ? classes.clickableText : ''}`}
              style={{ 
                paddingLeft: 0,
                wordBreak: participantExpanded ? 'break-word' : 'normal',
                whiteSpace: participantExpanded ? 'normal' : 'nowrap',
                overflowWrap: 'break-word',
              }}
              onClick={shouldTruncate ? handleToggleExpand : undefined}
            >
              {displayValue}
              {shouldTruncate && !participantExpanded && '...'}
            </Typography>
          </div>
        </div>
      ),
      arrow: shouldTruncate ? (
        <span 
          className={classes.expandToggle}
          onClick={handleToggleExpand}
        >
          {participantExpanded ? <UpArrowIcon className={classes.expandIcon} /> : <DownArrowIcon className={classes.expandIcon} />}
        </span>
      ) : null
    };
  };

  const renderSample = (label, value = '') => {
    // Simple, reliable character limits based on screen size
    // Reduced to account for the '...' we add manually
    const getMaxLength = () => {
      if (window.innerWidth <= 749) {
        return 85; // Mobile
      } else if (window.innerWidth <= 900) {
        return 47; // Tablet  
      } else if (window.innerWidth <= 1200) {
        return 67; // Small desktop
      } else {
        return 90; // Large desktop - conservative to prevent overflow
      }
    };

    const [maxLength, setMaxLength] = React.useState(getMaxLength());

    // Update character limit on window resize
    React.useEffect(() => {
      const handleResize = () => {
        setMaxLength(getMaxLength());
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const shouldTruncate = value && value.length > maxLength;
    const displayValue = shouldTruncate && !sampleExpanded 
      ? value.substring(0, maxLength) 
      : value;

    const handleToggleExpand = () => {
      setSampleExpanded(!sampleExpanded);
    };

    return {
      content: (
        <div className={classes.keyAndValueRow}>
          <Typography variant="h6" className={classes.key}>
            {label}
          </Typography>
          <div className={classes.sampleContainer}>
            <Typography 
              variant="body1" 
              className={`${classes.value} ${shouldTruncate ? classes.clickableText : ''}`}
              style={{ 
                paddingLeft: 0,
                wordBreak: sampleExpanded ? 'break-word' : 'normal',
                whiteSpace: sampleExpanded ? 'normal' : 'nowrap',
                overflowWrap: 'break-word',
              }}
              onClick={shouldTruncate ? handleToggleExpand : undefined}
            >
              {displayValue}
              {shouldTruncate && !sampleExpanded && '...'}
            </Typography>
          </div>
        </div>
      ),
      arrow: shouldTruncate ? (
        <span 
          className={classes.expandToggle}
          onClick={handleToggleExpand}
        >
          {sampleExpanded ? <UpArrowIcon className={classes.expandIcon} /> : <DownArrowIcon className={classes.expandIcon} />}
        </span>
      ) : null
    };
  };

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
                const formattedParticipantId = formatParticipantIdForUrl(participant_id);
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
                    <Button component={Link} to={`/explore?p_id=${formattedParticipantId}`} className={classes.titleLink}>
                      {truncated}
                    </Button>
                  </Tooltip>
                ) : (
                  <Button component={Link} to={`/explore?p_id=${formattedParticipantId}`} className={classes.titleLink}>
                    {file_name}
                  </Button>
                );
              })()}
            </div>
          </Grid>

          {/* Add to Cart button moved to top right */}
          <Grid item className={classes.buttonAlignWithTitle}>
            <Button
              variant="outlined"
              onClick={handleAddToCart}
              style={{
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
                textTransform: 'uppercase',
              }}
              className={classes.addToCartButton}
            >
              Add to Cart
            </Button>
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

        {/* Participant - Line 4 */}
        <div className={classes.propertyLine} style={{ position: 'relative' }}>
          {(() => {
            const participant = renderParticipant('Participant:', formatListWithSemicolons(participant_id));
            return (
              <>
                {participant.content}
                {participant.arrow}
              </>
            );
          })()}
        </div>

        {/* Study ID - Line 5 */}
        <div className={classes.propertyLine}>
          {renderInfo('Study ID:', study_id)}
        </div>

        {/* Sample - Line 6 */}
        <div className={classes.propertyLine} style={{ position: 'relative' }}>
          {(() => {
            const sample = renderSample('Sample:', formatListWithSemicolons(sample_id));
            return (
              <>
                {sample.content}
                {sample.arrow}
              </>
            );
          })()}
        </div>
      </div>
      
      <ToastNotification
        open={notification.open}
        message={notification.message}
        type={notification.type}
        onClose={handleNotificationClose}
      />
    </div>
  );
};

export default FilesCard;