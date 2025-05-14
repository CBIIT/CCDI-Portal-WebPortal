import React from 'react';
import {
  Grid, Typography,
} from '@material-ui/core';
import useStyles from './style';
import { cn } from 'bento-components';

/* const removeSquareBracketsFromString = (text) => {
  return text.replace(/\[|\]/g, '');
};*/

const SamplesCard = ({ data = {}, index })=> {
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

  const renderInfo = (label, value='') => (
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

      <Grid item xs={12} className={classes.hrContainer}>
        <hr className={classes.hr}/>
      </Grid>
    </Grid>
  );
};

export default SamplesCard;