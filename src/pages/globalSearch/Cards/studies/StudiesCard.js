import React, { useState, useRef, useEffect } from 'react';
import {
  Grid, Typography, Button, Box, List, ListItem, ListItemText
} from '@material-ui/core';
import { cn } from 'bento-components';
import useStyles from './style';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

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
  const dropdownRef = useRef(null);

  const handleClick = () => {
    navigate(`/studies/${study_id}`);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleViewStudy = () => {
    navigate(`/studies/${study_id}`);
  };

  const handleCBioPortal = () => {
    window.open('https://cbioportal.ccdi.cancer.gov/', '_blank');
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
    <Grid item container className={classes.card}>
      <Grid item className={classes.indexContainer}>
        {index+1}
      </Grid>

      <Grid item xs={true}>
        <div className={cn(classes.keyAndValueRow, classes.titleRow)}>
          <span className={classes.titleKey}>STUDIES</span>
          <Typography variant="h3" className={classes.titleValue}>
            <a href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${study_id}`} rel='noreferrer' target='_blank'>{study_id}</a>
          </Typography>
        </div>
        <div className={classes.row}>
          <div className={classes.column}>
            {renderInfo('Study Name:', study_name)}
            {renderInfo('Number of Participants:', num_of_participants)}
            {renderInfo('Study Status:', study_status)}
            {renderInfo('Number of Files:', num_of_files)}
          </div>
        </div>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Grid item offset={{ xs: 'auto' }}>
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
    </Grid>
  );
};

export default StudiesCard;
