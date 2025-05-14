import React from 'react';
import {
  Grid, Typography,
} from '@material-ui/core';
import { cn } from 'bento-components';
import useStyles from './style';

const StudiesCard = ({ data = {}, index }) => {
  const {
    study_id,
    study_name,
    study_status,
    num_of_participants,
    num_of_files,
  } = data;

  const classes = useStyles();

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
            {study_id}
          </Typography>
        </div>
        <div className={classes.row}>
          <div className={classes.column}>
            {renderInfo('Study Name:', study_name)}
            {renderInfo('Number of Participants:', num_of_participants)}
          </div>

          <div className={cn(classes.column, classes.leftColumn)}>
            {renderInfo('Study Status:', study_status)}
            {renderInfo('Number of Files:', num_of_files)}
          </div>
        </div>
      </Grid>
      <Grid item xs={12} className={classes.hrContainer}>
        <hr className={classes.hr}/>
      </Grid>
    </Grid>
  );
};

export default StudiesCard;
