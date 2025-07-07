import React from 'react';
import {
  Grid, Typography, Button
} from '@material-ui/core';
import { cn } from 'bento-components';
import useStyles from './style';
import { useNavigate } from 'react-router-dom';

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

  const handleClick = () => {
    navigate(`/studies/${study_id}`);
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
      <Button className={classes.button} variant="outlined" onClick={() => handleClick()}>GO TO STUDY</Button>
    </Grid>
  );
};

export default StudiesCard;
