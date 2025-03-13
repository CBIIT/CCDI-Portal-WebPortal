import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import { linkStyles } from './linkStyles';

const linkButtonView = (props) => {
    const { classes } = props;
    return (
        <a class="link" href="/user-guide.pdf" target="_blank" rel="noopener noreferrer">
            <Button className={classes.linkBtn}>User Guide</Button>
        </a>
    );

}
export default withStyles(linkStyles)(linkButtonView);