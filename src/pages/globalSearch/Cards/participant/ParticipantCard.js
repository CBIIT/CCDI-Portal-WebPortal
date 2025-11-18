import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  Grid, Typography, Button, Box, List, ListItem, ListItemText, Tooltip
} from '@material-ui/core';
import useStyles from './style';
import { cn } from 'bento-components';
import CPIModal from './CPIModal';
import { Link, useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import gql from 'graphql-tag';
import { ReactComponent as DownArrowIcon } from '../../assets/Down_Arrow.svg';
import { ReactComponent as UpArrowIcon } from '../../assets/Up_Arrow.svg';
import { getFilesID } from './WrapperService';
import { CohortStateContext } from '../../../../components/CohortSelectorState/CohortStateContext';
import { onAddParticipantsToCohort } from '../../../../components/CohortSelectorState/store/action';
import ToastNotification from './ToastNotification';

/* const removeSquareBracketsFromString = (text) => {
  return text.replace(/\[|\]/g, '');
};*/

const addFileQuery = gql`
query search (          
  $participant_ids: [String],
){
  fileIDsFromList (          
      participant_ids: $participant_ids,
  ) 
}
`;

const checkDuplicate = (cartFiles, ids) => (ids.filter((id) => !cartFiles[id]));

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

const ParticipantCard = ({ data = {}, index, addFiles, setAlterDisplay, setOpenSnackbar, client, cartFiles = [], alertMessage }) => {
  const {
    id,
    participant_id,
    diagnosis_str,
    study_id,
    age_at_diagnosis_str,
    treatment_type_str,
    sex_at_birth,
    treatment_agent_str,
    race_str,
    last_known_survival_status_str,
    cpi_data,
  } = data;

  const classes = useStyles();
  const navigation = useNavigate();
  const { state: cohortState, dispatch: cohortDispatch } = useContext(CohortStateContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cohortDropdownOpen, setCohortDropdownOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' });
  const [treatmentTypeExpanded, setTreatmentTypeExpanded] = useState(false);
  const [treatmentAgentExpanded, setTreatmentAgentExpanded] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const dropdownRef = useRef(null);
  const cardRef = useRef(null);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCohortDropdownToggle = () => {
    setCohortDropdownOpen(!cohortDropdownOpen);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ open: true, message, type });
  };

  const handleNotificationClose = () => {
    setNotification({ open: false, message: '', type: 'success' });
  };

  const handleAddToCohort = (cohortId) => {
    const participantData = {
      id: id,
      participant_id: participant_id,
      study_id: study_id,
    };

    const cohortName = (cohortState[cohortId] && cohortState[cohortId].cohortName) || 'cohort';

    cohortDispatch(onAddParticipantsToCohort(
      cohortId,
      [participantData],
      (count) => {
        if (count === 0) {
          showNotification(`Participant is already in ${cohortName}`, 'info');
        } else {
          showNotification(`Participant added to ${cohortName}`, 'success');
        }
      },
      (error) => {
        showNotification(`Failed to add participant to ${cohortName}`, 'error');
      }
    ));
  };

  const handleExploreDashboard = () => {
    navigation(`/explore?p_id=${participant_id}`);
  };

  const handleAddToCart = () => {
    // Check if required props are available
    if (!addFiles || !client) {
      console.warn('Cart functionality not available: missing required props');
      return;
    }

    const toAdd = [id];
    const fileIds = getFilesID({
      client,
      variables: { participant_ids: toAdd },
      query: addFileQuery,
    });
    const upperLimit = 200000;
    const cartCount = cartFiles.length;
    const responseKeys = ['fileIDsFromList'];

    if (cartCount < upperLimit) {
      fileIds().then((response) => {
        const idsInitial = response[responseKeys[0]] || [];
        const ids = [...new Set(idsInitial)];
        const fileCount = ids.length;
        if (fileCount <= upperLimit && cartCount < upperLimit) {
                  if (cartCount + ids.length <= upperLimit) {
                    // Check for duplicates first
                    const cartFilesDict = {};
                    cartFiles.forEach((file) => { cartFilesDict[file] = true; });
                    const newIds = checkDuplicate(cartFilesDict, ids);
                    
                    if (newIds.length === 0) {
                      // All files are already in cart
                      showNotification('Files already in cart', 'info');
                    } else {
                      // Add new files to cart
                      addFiles(newIds);
                      showNotification(`${newIds.length} File(s) successfully added to your cart`, 'success');
                    }

                    if (setOpenSnackbar) {
                      setOpenSnackbar(true);
                    }
                  } else {
                    const cartFilesDict = {};
                    cartFiles.forEach((file) => { cartFilesDict[file] = true; });
                    const newIds = checkDuplicate(cartFilesDict, ids);
                    if (cartCount + newIds.length <= upperLimit) {
                      if (newIds.length === 0) {
                        // All files are already in cart
                        showNotification('Files already in cart', 'info');
                      } else {
                        // Add new files to cart
                        addFiles(newIds);
                        showNotification(`${newIds.length} File(s) successfully added to your cart`, 'success');
                      }
                      if (setOpenSnackbar) {
                        setOpenSnackbar(true);
                      }
                    } else {
                      if (setAlterDisplay) {
                        setAlterDisplay(true);
                      }
                    }
                  }
        } else {
          showNotification('Cart limit reached. Please remove some files first.', 'error');
          if (setAlterDisplay) {
            setAlterDisplay(true);
          }
        }
      });
    } else {
      showNotification('Cart limit reached. Please remove some files first.', 'error');
      if (setAlterDisplay) {
        setAlterDisplay(true);
      }
    }
  };


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setCohortDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  // Get cohort data from state
  const cohorts = Object.keys(cohortState).map(cohortId => ({
    id: cohortId,
    name: cohortState[cohortId].cohortName,
    description: cohortState[cohortId].cohortDescription
  }));

  const renderInfo = (label, value = '') => (
    <div className={classes.keyAndValueRow}>
      <Typography variant="h6" className={classes.key}>
        {label}
      </Typography>
      {label !== 'Study ID:' ?
        <Typography variant="body1" className={classes.value}>
          {value}
        </Typography> :
        <Button component={Link} to={`/studies/${study_id}`} className={classes.titleLink}>
          {study_id}
        </Button>}
    </div>
  );

  const renderTreatmentType = (label, value = '') => {
    // Simple, reliable character limits based on screen size
    const getMaxLength = () => {
      if (window.innerWidth <= 600) {
        return 35; // Mobile
      } else if (window.innerWidth <= 900) {
        return 55; // Tablet  
      } else if (window.innerWidth <= 1200) {
        return 75; // Small desktop
      } else {
        return 95; // Large desktop
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
    const displayValue = shouldTruncate && !treatmentTypeExpanded 
      ? value.substring(0, maxLength) 
      : value;

    const handleToggleExpand = () => {
      setTreatmentTypeExpanded(!treatmentTypeExpanded);
    };

    return {
      content: (
        <div className={classes.keyAndValueRow}>
          <Typography variant="h6" className={classes.key}>
            {label}
          </Typography>
          <div className={classes.treatmentTypeContainer}>
            <div className={classes.treatmentTextContainer}>
              <Typography 
                variant="body1" 
                className={`${classes.value} ${shouldTruncate ? classes.clickableText : ''}`}
                style={{ display: 'inline', paddingLeft: 0 }}
                onClick={shouldTruncate ? handleToggleExpand : undefined}
              >
                {displayValue}
                {shouldTruncate && !treatmentTypeExpanded && '...'}
              </Typography>
            </div>
          </div>
        </div>
      ),
      arrow: shouldTruncate ? (
        <span 
          className={classes.expandToggle}
          onClick={handleToggleExpand}
        >
          {treatmentTypeExpanded ? <UpArrowIcon className={classes.expandIcon} /> : <DownArrowIcon className={classes.expandIcon} />}
        </span>
      ) : null
    };
  };

  const renderTreatmentAgent = (label, value = '') => {
    // Simple, reliable character limits based on screen size
    const getMaxLength = () => {
      if (window.innerWidth <= 600) {
        return 35; // Mobile
      } else if (window.innerWidth <= 900) {
        return 55; // Tablet  
      } else if (window.innerWidth <= 1200) {
        return 75; // Small desktop
      } else {
        return 95; // Large desktop
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
    const displayValue = shouldTruncate && !treatmentAgentExpanded 
      ? value.substring(0, maxLength) 
      : value;

    const handleToggleExpand = () => {
      setTreatmentAgentExpanded(!treatmentAgentExpanded);
    };

    return {
      content: (
        <div className={classes.keyAndValueRow}>
          <Typography variant="h6" className={classes.key}>
            {label}
          </Typography>
          <div className={classes.treatmentTypeContainer}>
            <div className={classes.treatmentTextContainer}>
              <Typography 
                variant="body1" 
                className={`${classes.value} ${shouldTruncate ? classes.clickableText : ''}`}
                style={{ display: 'inline', paddingLeft: 0 }}
                onClick={shouldTruncate ? handleToggleExpand : undefined}
              >
                {displayValue}
                {shouldTruncate && !treatmentAgentExpanded && '...'}
              </Typography>
            </div>
          </div>
        </div>
      ),
      arrow: shouldTruncate ? (
        <span 
          className={classes.expandToggle}
          onClick={handleToggleExpand}
        >
          {treatmentAgentExpanded ? <UpArrowIcon className={classes.expandIcon} /> : <DownArrowIcon className={classes.expandIcon} />}
        </span>
      ) : null
    };
  };

  return (
    <div className={classes.card} ref={cardRef}>
      {data.cpi_data && data.cpi_data.length ? <CPIModal
        row={data}
        open={modalOpen}
        onClose={handleModalClose}
      /> : <></>}
      
      {/* Header with participant title and actions button */}
      <div className={classes.cardHeader}>
        <Grid container alignItems="flex-start">
          <Grid item xs className={classes.titleContainer}>
            <div className={cn(classes.keyAndValueRow, classes.titleRow)}>
              <span className={classes.titleKey}>PARTICIPANT</span>
              {(() => {
                const { truncated, needsTruncation } = truncateTitle(participant_id, containerWidth);
                return needsTruncation ? (
                  <Tooltip 
                    title={participant_id} 
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
                    {participant_id}
                  </Typography>
                );
              })()}
            </div>
          </Grid>
          
          {/* Available Actions button moved to top right */}
          {cpi_data && cpi_data.length && (
            <Grid item className={classes.buttonAlignWithTitle}>
              <Box className={classes.dropdownContainer} ref={dropdownRef}>
                <Button 
                  className={`${classes.button} ${classes.topRightButton} ${dropdownOpen ? classes.buttonOpen : ''}`}
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
                        onClick={handleModalOpen}
                      >
                        <ListItemText 
                          primary="VIEW CPI MAPPING" 
                          className={classes.dropdownItemText}
                        />
                      </ListItem>
                      
                      {cohorts.length > 0 && (
                        <ListItem 
                          button 
                          className={`${classes.dropdownItemWithSubmenu} ${cohortDropdownOpen ? '' : ''}`}
                          style={{ borderBottom: cohortDropdownOpen ? 'none' : '1px solid #07679C' }}
                          onClick={handleCohortDropdownToggle}
                        >
                          <ListItemText 
                            primary="ADD TO EXISTING COHORT" 
                            className={classes.dropdownItemText}
                          />
                          {cohortDropdownOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </ListItem>
                      )}
                      
                      {cohorts.length > 0 && cohortDropdownOpen && (
                        <Box className={classes.cohortDropdown}>
                          <List className={classes.cohortList}>
                            {cohorts.map((cohort, index) => (
                              <ListItem 
                                key={cohort.id}
                                button 
                                className={classes.cohortItem}
                                onClick={() => handleAddToCohort(cohort.id)}
                              >
                                <ListItemText 
                                  primary={cohort.name} 
                                  className={classes.cohortItemText}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}
                      
                      <ListItem 
                        button 
                        className={classes.dropdownItem}
                        onClick={handleExploreDashboard}
                      >
                        <ListItemText 
                          primary="VIEW IN EXPLORE DASHBOARD" 
                          className={classes.dropdownItemText}
                        />
                      </ListItem>
                      
                      <ListItem 
                        button 
                        className={classes.dropdownItem}
                        onClick={handleAddToCart}
                      >
                        <ListItemText 
                          primary="ADD TO CART" 
                          className={classes.dropdownItemText}
                        />
                      </ListItem>
                    </List>
                  </Box>
                )}
              </Box>
            </Grid>
          )}
        </Grid>
      </div>
      
      {/* Reorganized content area */}
      <div className={classes.contentArea}>
        {/* Diagnosis - single line */}
        <div className={classes.propertyLine}>
          {renderInfo('Diagnosis:', diagnosis_str)}
        </div>
        
        {/* Age at Diagnosis, Sex at Birth, Race - grouped on one line */}
        <div className={classes.propertyLine}>
          <div className={classes.groupedProperties}>
            <div className={classes.propertyGroup}>
              {renderInfo('Age at Diagnosis:', age_at_diagnosis_str + ' days')}
            </div>
            <div className={classes.propertyGroup}>
              {renderInfo('Sex at Birth:', sex_at_birth)}
            </div>
            <div className={classes.propertyGroup}>
              {renderInfo('Race:', race_str)}
            </div>
          </div>
        </div>
        
        {/* Study ID and CPI Mappings - grouped on one line */}
        <div className={classes.propertyLine}>
          <div className={classes.groupedProperties}>
            <div className={classes.propertyGroup}>
              {renderInfo('Study ID:', study_id)}
            </div>
            <div className={classes.propertyGroup}>
              {renderInfo('CPI Mappings:', cpi_data && cpi_data.length ? cpi_data.length : '0')}
            </div>
          </div>
        </div>
        
        {/* Treatment Type - with expand/collapse */}
        <div className={classes.propertyLine}>
          {(() => {
            const treatmentType = renderTreatmentType('Treatment Type:', treatment_type_str);
            return (
              <>
                {treatmentType.content}
                {treatmentType.arrow}
              </>
            );
          })()}
        </div>
        
        {/* Treatment Agent - with expand/collapse */}
        <div className={classes.propertyLine}>
          {(() => {
            const treatmentAgent = renderTreatmentAgent('Treatment Agent:', treatment_agent_str);
            return (
              <>
                {treatmentAgent.content}
                {treatmentAgent.arrow}
              </>
            );
          })()}
        </div>
        
        {/* Last Known Survival Status - single line */}
        <div className={classes.propertyLine}>
          {renderInfo('Last Known Survival Status:', last_known_survival_status_str)}
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

        export default ParticipantCard;