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
    value_kw,
    property_type,
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
          <span className={classes.titleKey}>MODEL</span>
          <Typography variant="h3" className={classes.titleValue}>
            {property}
          </Typography>
        </div>
        <div className={classes.row}>
          <div className={classes.column}>
            {renderInfo('Data Model Node:', node)}
            {renderInfo('Age at Diagnosis:', value_kw)}
            {renderInfo('Property Description:', property_description)}
          </div>
        </div>
      </Grid>

      <Grid item xs={12} className={classes.hrContainer}>
        <hr className={classes.hr}/>
      </Grid>
    </Grid>
  );
};

export default ModelsCard;