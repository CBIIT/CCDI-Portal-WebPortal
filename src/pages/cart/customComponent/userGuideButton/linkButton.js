import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import { linkStyles } from './linkStyles';
import userGuidePDF from '../../../../assets/about/CCDI_Usage_Instructions_Jan2025_2.5.1_Final.pdf';

const linkButtonView = (props) => {
    const { classes } = props;
    return (
        <a class="link" href={userGuidePDF} target="_blank" rel="noopener noreferrer">
            <Button className={classes.linkBtn}>User Guide</Button>
        </a>
    );

}
export default withStyles(linkStyles)(linkButtonView);