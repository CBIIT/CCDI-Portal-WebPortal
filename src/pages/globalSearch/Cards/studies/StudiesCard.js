import React, { useState, useRef, useEffect } from 'react';
import {
  Grid, Typography, Button, Box, List, ListItem, ListItemText, Tooltip
} from '@material-ui/core';
import { cn } from 'bento-components';
import useStyles from './style';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { studyDownloadLinks, openDoubleLink } from '../../../../bento/studiesData';

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

const StudiesCard = ({ data = {}, index }) => {
  const {
    study_id,
    study_name,
    study_status,
    num_of_participants,
    num_of_files,
  } = data;

  const classes = useStyles();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const dropdownRef = useRef(null);
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

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleViewStudy = () => {
    navigate(`/studies/${study_id}`);
  };

  const handleCBioPortal = () => {
    window.open('https://cbioportal.ccdi.cancer.gov/', '_blank');
  };

  const handleDownloadManifest = () => {
    const downloadUrl = studyDownloadLinks[study_id];
    if (downloadUrl) {
      const fileName = `${study_id}_CCDI_Study_Manifest.xlsx`;
      openDoubleLink(downloadUrl, fileName);
    } else {
      console.warn(`No download link found for study: ${study_id}`);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
      {/* Header with study title and dropdown button */}
      <div className={classes.cardHeader}>
        <Grid container alignItems="flex-start">
          <Grid item xs className={classes.titleContainer}>
            <div className={cn(classes.keyAndValueRow, classes.titleRow)}>
              <span className={classes.titleKey}>STUDIES</span>
              {(() => {
                const { truncated, needsTruncation } = truncateTitle(study_id, containerWidth);
                const linkElement = (
                  <a href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${study_id}`} rel='noreferrer' target='_blank'>
                    {needsTruncation ? truncated : study_id}
                  </a>
                );
                return needsTruncation ? (
                  <Tooltip title={study_id} placement="top">
                    <Typography variant="h3" className={classes.titleValue}>
                      {linkElement}
                    </Typography>
                  </Tooltip>
                ) : (
                  <Typography variant="h3" className={classes.titleValue}>
                    {linkElement}
                  </Typography>
                );
              })()}
            </div>
          </Grid>
          
          {/* Dropdown button moved to top right */}
          <Grid item className={classes.buttonAlignWithTitle}>
            <Box className={classes.dropdownContainer} ref={dropdownRef}>
              <Button 
                className={`${classes.button} ${dropdownOpen ? classes.buttonOpen : ''}`}
                variant="outlined" 
                onClick={handleDropdownToggle}
              >
                <span>AVAILABLE ACTIONS</span>
                {dropdownOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Button>
              
              {dropdownOpen && (
                <Box className={classes.dropdown}>
                  <List className={classes.dropdownList}>
                    <ListItem 
                      button 
                      className={classes.dropdownItem}
                      onClick={handleViewStudy}
                    >
                      <ListItemText 
                        primary="VIEW STUDY" 
                        className={classes.dropdownItemText}
                      />
                    </ListItem>
                    
                    <ListItem 
                      button 
                      className={classes.dropdownItem}
                      onClick={handleDownloadManifest}
                    >
                      <ListItemText 
                        primary="DOWNLOAD MANIFEST" 
                        className={classes.dropdownItemText}
                      />
                    </ListItem>
                    
                    <ListItem 
                      button 
                      className={classes.dropdownItem}
                      onClick={handleCBioPortal}
                    >
                      <ListItemText 
                        primary="CCDI CBioPortal" 
                        className={classes.dropdownItemText}
                      />
                      <OpenInNewIcon style={{ color: '#07679C', fontSize: '16px' }} />
                    </ListItem>
                  </List>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </div>
      
      {/* Content area */}
      <div className={classes.contentArea}>
        {/* Study Name - Line 1 */}
        <div className={classes.propertyLine}>
          {renderInfo('Study Name:', study_name)}
        </div>
        
        {/* Number of participants, Study Status, Number of files - Line 2 */}
        <div className={classes.groupedProperties}>
          <div className={classes.propertyGroup}>
            {renderInfo('Number of Participants:', num_of_participants)}
          </div>
          <div className={classes.propertyGroup}>
            {renderInfo('Study Status:', study_status)}
          </div>
          <div className={classes.propertyGroup}>
            {renderInfo('Number of Files:', num_of_files)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudiesCard;
