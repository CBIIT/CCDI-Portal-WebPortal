import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  Grid, Typography, Button, Box, List, ListItem, ListItemText
} from '@material-ui/core';
import useStyles from './style';
import { cn } from 'bento-components';
import CPIModal from './CPIModal';
import cpiIcon from '../../../../assets/icons/Global_Cpi_Icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import gql from 'graphql-tag';
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

const ParticipantCard = ({ data = {}, index, addFiles, setAlterDisplay, setOpenSnackbar, client, cartFiles = [], alertMessage }) => {
  const {
    id,
    participant_id,
    diagnosis_str,
    study_id,
    age_at_diagnosis_str,
    diagnosis_category_str,
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
  const dropdownRef = useRef(null);

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
      () => {
        showNotification(`Participant added to ${cohortName}`, 'success');
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
                    // Directly add files to cart without confirmation dialog
                    addFiles(ids);

                    if (setOpenSnackbar) {
                      setOpenSnackbar(true);
                    }
                  } else {
                    const cartFilesDict = {};
                    cartFiles.forEach((file) => { cartFilesDict[file] = true; });
                    const newIds = checkDuplicate(cartFilesDict, ids);
                    if (cartCount + newIds.length <= upperLimit) {
                      // Directly add files to cart without confirmation dialog
                      addFiles(newIds);
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

  return (
    <div className={classes.card}>
      {data.cpi_data && data.cpi_data.length ? <CPIModal
        row={data}
        open={modalOpen}
        onClose={handleModalClose}
      /> : <></>}
      <Grid item container>
        <Grid item className={classes.indexContainer}>
          {index + 1}
        </Grid>

        <Grid item xs={true}>
          <div className={cn(classes.keyAndValueRow, classes.titleRow)}>
            <span className={classes.titleKey}>PARTICIPANT</span>
            <Typography variant="h3" className={classes.titleValue}>
              {participant_id}
            </Typography>
          </div>
          <div className={classes.row}>
            <div className={classes.column}>
              {renderInfo('Diagnosis:', diagnosis_str)}
              {renderInfo('Diagnosis Category:', diagnosis_category_str)}
              {renderInfo('Age at Diagnosis:', age_at_diagnosis_str + ' days')}
              {renderInfo('Sex at Birth:', sex_at_birth)}
              {renderInfo('Race:', race_str)}
              {renderInfo('Study ID:', study_id)}
            </div>

            <div className={cn(classes.column, classes.leftColumn)}>
              {renderInfo('Treatment Type:', treatment_type_str)}
              {renderInfo('Treatment Agent:', treatment_agent_str)}
              {renderInfo('Last Known Survival Status:', last_known_survival_status_str)}

            </div>
          </div>
        </Grid>
      </Grid>
      {cpi_data && cpi_data.length ? <Grid container justifyContent="flex-end">
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
              </Grid> : <></>}
              
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