import React from 'react';
import {
  Grid, Typography,
} from '@material-ui/core';
import useStyles from './style';
import { cn } from 'bento-components';

/* const removeSquareBracketsFromString = (text) => {
  return text.replace(/\[|\]/g, '');
};*/

const ParticipantCard = ({ data = {}, index })=> {
  const {
    participant_id,
    diagnosis_str,
    study_id,
    age_at_diagnosis_str,
    treatment_type_str,
    sex_at_birth,
    treatment_agent_str,
    race_str,
    last_known_survival_status_str
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
          <span className={classes.titleKey}>PARTICIPANT</span>
          <Typography variant="h3" className={classes.titleValue}>
            {participant_id}
          </Typography>
        </div>
        <div className={classes.row}>
          <div className={classes.column}>
            {renderInfo('Diagnosis:', diagnosis_str)}
            {renderInfo('Age at Diagnosis:', age_at_diagnosis_str + ' days')}
            {renderInfo('Sex at Birth:', sex_at_birth)}
            {renderInfo('Race:', race_str)}
            {renderInfo('Study ID:', study_id)}
          </div>

          <div className={cn(classes.column, classes.leftColumn)}>
            {renderInfo('Treatement Type:', treatment_type_str)}
            {renderInfo('Treatment Agent:', treatment_agent_str)}
            {renderInfo('Last Known Survival Status:', last_known_survival_status_str)}

          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default ParticipantCard;