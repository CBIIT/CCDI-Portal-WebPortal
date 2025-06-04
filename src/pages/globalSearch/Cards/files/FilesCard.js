import React from 'react';
import {
  Grid, Typography,
} from '@material-ui/core';
import useStyles from './style';
import { cn } from 'bento-components';
import { AddToCart } from '@bento-core/table';

const removeSquareBracketsFromString = (text) => {
  return text.replace(/\[|\]/g, '');
}

const buttonStyle = {
  width: '167px',
  height: '41px',
  alignSelf: 'end',
  color: '#07679C',
  borderColor: '#07679C',
  fontFamily: 'Poppins',
  fontWeight: '600',
  fontSize: '12px',
  marginTop: '20px',
  lineHeight: '13px',
}

const FilesCard = ({ data = {}, index }) => {
  const {
    id,
    file_name,
    data_category,
    participant_id,
    file_description,
    study_id,
    file_type,
    sample_id,
    file_size,
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
    <div className={classes.card}>
      <Grid item container >
        <Grid item className={classes.indexContainer}>
          {index + 1}
        </Grid>

        <Grid item xs={true}>
          <div className={cn(classes.keyAndValueRow, classes.titleRow)}>
            <span className={classes.titleKey}>FILES</span>
            <Typography variant="h3" className={classes.titleValue}>
              {file_name}
            </Typography>
          </div>
          <div className={classes.row}>
            <div className={classes.column}>
              {renderInfo('Data Category:', removeSquareBracketsFromString(data_category))}
              {renderInfo('File Description:', file_description)}
              {renderInfo('File Type:', file_type)}
              {renderInfo('File Size:', file_size)}
            </div>

            <div className={cn(classes.column, classes.leftColumn)}>
              {renderInfo('Participant:', participant_id)}
              {renderInfo('Study ID:', study_id)}
              {renderInfo('Sample:', sample_id)}
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Grid item offset={{ xs: 'auto' }}>
          <AddToCart fileId={id} buttonStyle={buttonStyle} />
        </Grid>
      </Grid>
    </div>
  );
};

export default FilesCard;