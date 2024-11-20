import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import { linkStyles } from './linkStyles';

const linkButtonView = (props) => {
    const { classes } = props;
    return (
        <a class="link" href="https://nih.sharepoint.com/:w:/r/sites/NCI-CBIIT-FNLCCDI/_layouts/15/Doc.aspx?sourcedoc=%7B5D16D4D0-5C0F-446A-9AA5-5E2AD325DA55%7D&file=CCDI_Usage_Instructions_October2024_restructured.docx&action=default&mobileredirect=true" target="_blank" rel="noopener noreferrer">
            <Button className={classes.linkBtn}>User Guide</Button>
        </a>
    );

}
export default withStyles(linkStyles)(linkButtonView);