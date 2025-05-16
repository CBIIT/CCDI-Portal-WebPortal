import React from 'react';
import {
  Grid, Typography,
} from '@material-ui/core';
import useStyles from './style';
import { cn } from 'bento-components';

/* const removeSquareBracketsFromString = (text) => {
  return text.replace(/\[|\]/g, '');
};*/

const ModelsCard = ({ data = {}, index })=> {
  const {
    property,
    value,
    property_description,
    node,
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
  );
};

export default ModelsCard;