import React from 'react';
import {
  Grid, Typography, Button
} from '@material-ui/core';
import useStyles from './style';
import { cn } from 'bento-components';
import { useNavigate } from 'react-router-dom';

/* const removeSquareBracketsFromString = (text) => {
  return text.replace(/\[|\]/g, '');
};*/

const SamplesCard = ({ data = {}, index }) => {
  const {
    sample_id,
    participant_id,
    study_id,
    sample_anatomic_site_str,
    sample_tumor_status,
    diagnosis_str,
    tumor_classification,
  } = data;
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/explore?p_id=${participant_id}`);
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
    <div className={classes.card}>
      <Grid item container>
        <Grid item className={classes.indexContainer}>
          {index + 1}
        </Grid>

        <Grid item xs={true}>
          <div className={cn(classes.keyAndValueRow, classes.titleRow)}>
            <span className={classes.titleKey}>SAMPLES</span>
            <Typography variant="h3" className={classes.titleValue}>
              {sample_id}
            </Typography>
          </div>
          <div className={classes.row}>
            <div className={classes.column}>
              {renderInfo('Participant ID:', participant_id)}
              {renderInfo('Sample Anatomic Site:', sample_anatomic_site_str)}
              {renderInfo('Sample Diagnosis:', diagnosis_str)}
            </div>

            <div className={cn(classes.column, classes.leftColumn)}>
              {renderInfo('Study ID:', study_id)}
              {renderInfo('Sample Tumor Status:', sample_tumor_status)}
              {renderInfo('Tumor Classification:', tumor_classification)}
            </div>
          </div>
        </Grid>


      </Grid>
      {participant_id ? <Grid container justifyContent="flex-end">
         <Grid item offset={{ xs: 'auto' }}>
        {<Button className={classes.button} variant="outlined" onClick={() => handleClick()}>VIEW IN EXPLORE</Button>}
        </Grid>
      </Grid> : <></>}
    </div>
  );
};

export default SamplesCard;