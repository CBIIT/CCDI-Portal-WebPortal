import React, { useState } from 'react';
import styled from 'styled-components';
import {
    Modal, Box, IconButton
  } from '@material-ui/core';
import userguideIcon from '../../../assets/icons/Explore_User_Guide_Icon.svg';
import CloseIcon from '@material-ui/icons/Close';

const UseGuideButtonContainer = styled.div`
    .buttonContainer {
        display: flex;
        margin-left: 6px;
        margin-top: 7px;
    }

    .buttonText {
        color: #627B7A;
        font-weight: 400;
        font-size: 14px;
        line-height: 30px;
        margin-left: 8px;
    }

    .paperArea {
        display: flex;
    }
`;

const UseGuideButton = (classes) => {
    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const modalBody = {
        // position: 'absolute',
        // top: '5%',
        // left: '25%',
        position: 'relative',
        margin: '0 auto',
        marginTop: '50px',
        width: '90%',
        maxWidth: '1279px',
        height: '635px',
        background: '#FFFFFF',
        border: '1px solid #505050',
        borderRadius: '40px',
        overflow: 'hidden',
    };

    const closeButton = {
        // display: 'flex',
        // marginLeft: 'auto',
        // top: '40px',
        position: 'absolute',
        top: '15px',
        right: '24px',
        backgroundColor: 'transparent',
      };

    return (
        <UseGuideButtonContainer>
            <div className='buttonContainer'>
                <img src={userguideIcon} alt="user guide icon" onClick={handleClickOpen}/>
                <div className='buttonText'>Explore the CCDI User Guide</div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box style={modalBody}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        className="closeButton"
                        style={closeButton}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                    <div className='paperArea'>
                    </div>
                </Box>
            </Modal>
        </UseGuideButtonContainer>
    )
}

export default UseGuideButton;
