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

const ModelsCard = ({ data = {}, index }) => {
  const {
    property,
    value,
    property_description,
    node,
  } = data;
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/data-model');
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
      <Grid item container >
        <Grid item className={classes.indexContainer}>
          {index + 1}
        </Grid>

        <Grid item xs={true}>
          <div className={cn(classes.keyAndValueRow, classes.titleRow)}>
            <span className={classes.titleKey}>DATA MODEL</span>
            <Typography variant="h3" className={classes.titleValue}>
              {value}
            </Typography>
          </div>
          <div className={classes.row}>
            <div className={classes.column}>
              {renderInfo('Data Model Node:', node)}
              {renderInfo('Property Name:', property)}
              {renderInfo('Property Description:', property_description)}
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Grid item offset={{ xs: 'auto' }}>
          {<Button className={classes.button} variant="outlined" onClick={() => handleClick()}>GO TO DATA MODEL NAVIGATOR</Button>}
        </Grid>
      </Grid>
    </div>
  );
};

export default ModelsCard;