import React from 'react';
import { Tooltip, makeStyles } from '@material-ui/core';
import questionIcon from '../../../assets/icons/Question_Icon.svg';
import participantFilesIcon from '../../../assets/icons/Participant_Files.svg';
import studyFilesIcon from '../../../assets/icons/Study_Files.svg';
import sampleFilesIcon from '../../../assets/icons/Sample_Files.svg';
import publicationsIcon from '../../../assets/icons/Publications.svg';

const DataAvailabilityHeader = () => {
  const useStyles = makeStyles(() => ({
    arrow: {
      '&:before': {
        border: '1px solid #598AC5',
      },
      color: 'white',
    },
    tooltip: {
      backgroundColor: 'white',
      border: '1px solid #598AC5',
      color: '#000000',
      fontFamily: 'Nunito',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '24px',
      padding: '24px',
      maxWidth: '400px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    },
  }));

  const classes = useStyles();

  const tooltipContent = (
    <div>
      <div style={{ 
        fontSize: '18px', 
        fontWeight: 600, 
        marginBottom: '16px',
        fontFamily: 'Nunito',
      }}>
        View available data counts:
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={participantFilesIcon} alt="Participant Files" width="32" height="32" />
          <span style={{ fontSize: '16px' }}>Participant Files</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={sampleFilesIcon} alt="Sample Files" width="32" height="32" />
          <span style={{ fontSize: '16px' }}>Sample Files</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={studyFilesIcon} alt="Study Files" width="32" height="32" />
          <span style={{ fontSize: '16px' }}>Study Files</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={publicationsIcon} alt="Publications" width="32" height="32" />
          <span style={{ fontSize: '16px' }}>Publications</span>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
      <span>Data Availability</span>
      <Tooltip
        title={tooltipContent}
        arrow
        placement="top"
        interactive
        classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
      >
        <img 
          src={questionIcon} 
          alt="Info" 
          width="13" 
          height="13" 
          style={{ cursor: 'pointer', position: 'relative', top: '-4px', right: '4px' }}
        />
      </Tooltip>
    </div>
  );
};

export default DataAvailabilityHeader;
