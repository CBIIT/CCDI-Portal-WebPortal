import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import { linkStyles } from './linkStyles';
import userGuidePDF from '../../../../assets/about/CCDI_Usage_Instructions_Nov2024_v2.5.0.pdf';

const linkButtonView = (props) => {
    const { classes } = props;
    return (
        <a class="link" href={userGuidePDF} target="_blank" rel="noopener noreferrer">
            <Button className={classes.linkBtn}>User Guide</Button>
        </a>
    );

}
export default withStyles(linkStyles)(linkButtonView);