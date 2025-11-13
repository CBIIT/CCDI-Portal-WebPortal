import React, { useState } from 'react';
import styled from 'styled-components';
import {
    Modal, Box, Button, IconButton, withStyles
} from '@material-ui/core';
import styles from './UserNotesButtonStyles';
import userguideIcon from '../../../assets/icons/Notes_Icon.svg';
import userguideIconWhite from '../../../assets/icons/Notes_Icon_White.svg';
import CloseIcon from '@material-ui/icons/Close';

const UserNotesButtonContainer = styled.div`
    background-color: #337478;
    .buttonContainer {
        display: flex;
        margin-left: 6px;
        padding-top: 10px;
    }

    .buttonText {
        color: #ffffff;
        font-weight: 400;
        font-size: 14px;
        line-height: 30px;
        margin-left: 8px;
    }
`;

const UserNotesButton = ({classes}) => {
    const [open, setOpen] = useState(false);
    const [isHover, setIsHover] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <UserNotesButtonContainer>
            <div className='buttonContainer'>
                <Button
                    variant="outlined"
                    onClick={handleClickOpen}
                    className={classes.customButton}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    <img src={isHover ? userguideIcon : userguideIconWhite} alt="user guide icon" />
                </Button>
                <div className='buttonText'>Notes to User</div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className={classes.modalContainer}>
                    <div>   
                        {/* Modal header with title and close button */}
                        <div className={classes.modalHeader}>
                            <h2 className={classes.modalTitle}>Notes to User</h2>
                            <IconButton
                                    aria-label="close"
                                    onClick={handleClose}
                                    className={classes.closeButton}
                                >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </div>
                        {/* Modal body with tabbed study details */}
                        <div className={classes.modalBody}>
                            <ul>
                                <li>Users of any data provided by CCDI, whether open, registered, or controlled access, agree not to attempt to reidentify any individual participant in any study represented within the CCDI, for any purpose.</li>
                                <li>Some participants may be enrolled in more than one study; therefore, the cumulative counts might include duplicate representation of those participants.</li>
                                <li>The CCDI Hub Explore Dashboard is a participant-based file inventory and provides links to diverse data sets. The data may have been assessed for quality based on technology-relevant controls but have not been independently validated. The data are made available to accelerate the identification of targets and facilitate discoveries related to understanding cancer biology.</li>
                            </ul>
                        </div>
                    </div>
                </Box>
            </Modal>
        </UserNotesButtonContainer>
    )
}

export default withStyles(styles)(UserNotesButton);
