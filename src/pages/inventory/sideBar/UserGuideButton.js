import React, { useState } from 'react';
import styled from 'styled-components';
import {
    Modal, Box, IconButton, withStyles
} from '@material-ui/core';
import styles from './UserGuideButtonStyle';
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
`;

const UseGuideButton = ({classes}) => {
    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const titleList = [
        'Finding Participants, Studies, Samples, and Files',
        'Creating and managing cohorts',
        'Downloading Metadata from the Studies tab',
        'Creating an Exportable File Manifest from the Cart',
    ];

    const handleClickEvent = (event) => {
        const id = event.target.getAttribute('name');
        // setSelectedNavTitle(id);
        const contentElement = document.getElementById('UserGuideContentSection');
        const element = document.getElementById(id);
        contentElement.scrollTo({ 
            top: element.offsetTop - 15,
            behavior: "smooth" 
        });
    }

    const modalBody = {
        position: 'relative',
        margin: '0 auto',
        marginTop: '50px',
        width: '90%',
        maxWidth: '1279px',
        height: '635px',
        background: '#FFFFFF',
        border: '1px solid #505050',
        borderRadius: '40px',
        // overflow: 'hidden',
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
                        className={classes.closeButton}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                    <div className={classes.paperArea}>
                        <div className={classes.navSection}>
                            <div className={classes.navTitle}>USER GUIDE TOPICS</div>
                                {
                                    titleList.map((titleItem, topicid) => {
                                        const topickey = `topic_${topicid}`;
                                        return (
                                            <div name={titleItem} className={classes.navTopicItem} key={topickey} onClick={handleClickEvent}>{titleItem}</div>
                                        )
                                    })
                                }
                            </div>
                        <div id='UserGuideContentSection' className={classes.contentSection}>
                            <div className={classes.contentList}>
                                <div className={classes.contentTitle}>CCDI Hub Explore Dashboard and Cart</div>
                                <div className={classes.mciContentContainer}>
                                    <p>The CCDI Hub Explore Dashboard is a tool that allows for the exploration of participant-level, diagnoses, studies, samples, and files information for CCDI-managed data sets. The Explore Dashboard enables researchers to find CCDI data within a single study or across multiple studies and create synthetic cohorts based on filtered search (i.e., demographics, diagnosis, samples, etc.). Upon interaction with these filters (Figure 1A), users can review the open-access information through visual summaries (Figure 1B) and browse the row level data in tabs organized by participants, diagnosis, studies, samples, and files (Figure 1C) to determine which data sets are applicable to their research questions. Users can then add desired files to the cart (Figure 1D), from which they can download a manifest for the selected data or take the manifest directly into the CGC. To access the controlled data, users must request them at the controlled-access login page on dbGaP.</p>
                                    <p>Step-by-step instructions for finding and exporting data are included below.</p>
                                </div>
                                <div>
                                    <div id='Finding Participants, Studies, Samples, and Files' className={classes.sectionTitle}>
                                        <p>Finding Participants, Studies, Samples, and Files</p>
                                    </div>
                                    <div className={classes.mciContentContainer}>
                                        <p>The CCDI Hub Explore Dashboard provides row-level metadata for CCDI study participants and their data objects for review with a filtered search, select visualizations, and an exportable table of results. Here’s how to find and filter information on the Explore Dashboard:</p>
                                        <ul>
                                            <li>The CCDI Hub is located at ccdi.cancer.gov. From the CCDI Hub Home page, navigate to the Explore Dashboard by clicking “Explore” (Figure 2).</li>
                                            <li>On the Explore Dashboard, you can filter row-level data and view them as visualizations (Figure 3). The Explore Dashboard is participant-centric, meaning that filtering criteria and results return de-identified information about a participant and their related studies, collected samples, or created files.</li>
                                            <li>Search criteria are displayed in the right panel (Figure 4A). Faceted filtering may be done by uploading a list of participant IDs (in “DEMOGRAPHICS” Figure 4B), text searches (“DIAGNOSIS,” “DIAGNOSIS ATOMIC SITE,” and “SAMPLE ANATOMIC SITE” Figure 4C), numerical sliders (“AGE AT DIAGNOSIS” and “AGE AT COLLECTION” Figure 4D), or checkbox selections for the remaining properties. You can apply multiple filtering criteria at the same time in a search. You can view and clear your current selection(s) in the query summary at the top of the widgets (Figure 4E).</li>
                                            <li>Filtering your search will update the Explore Dashboard’s visualizations and the results tables (Figure 5). Each results table will be updated with information on the participants, samples, studies, or files that meet the filtered criteria. Information displayed by default on each table is described below:
                                                <ul>
                                                    <li>“Participants”: Characteristics of a participant in the Explore Dashboard. Participants belong to a study, and they may have one or more samples, diagnoses, or files associated with them. Participants with mappings through the CCDI Participant Index (CPI) have a summary of these mappings available from this view.</li>
                                                    <li>“Studies”: Studies that are a part of the Explore Dashboard. Participants, diagnosis, samples, and files all belong to a CCDI study.</li>
                                                    <li>“Samples”: Samples available from participants within the Explore Dashboard. Samples belong to a participant and can be associated with one or more files.</li>
                                                    <li>“Files”: Files available from studies, participants, and samples within the Explore Dashboard. Files may belong to a study and may be associated with one or more participants or samples. Files may also be of many types, including sequencing, proteomics, imaging files, etc. DICOM imaging files are currently available for the Genomic Sequencing of Pediatric Rhabdomyosarcoma (phs000720) and Molecular Characterization Initiative (phs002790) studies and can be accessed directly from the Imaging Data Commons (IDC) Data Portal and file paths to images are provided in the downloadable study manifest within Hub, described in the following section.</li>
                                                </ul>
                                            </li>
                                            <li>Visible columns in each table can be customized by clicking the “View columns” button in the upper righthand corner of the table and selecting or deselecting available columns (Figure 6). Note that Participant ID, Sample ID, and Study ID cannot be removed from any table, and File Name cannot be removed from the Files table.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <div id='Creating and managing cohorts' className={classes.sectionTitle}>
                                        <p>Creating and managing cohorts</p>
                                    </div>
                                    <div className={classes.mciContentContainer}>
                                        <p>From the CCDI Hub Explore Dashboard Participant table, or you can group participants into cohorts to find files of interest, or you can add files directly to the cart (read more in next section). To create a cohort:</p>
                                        <ul>
                                            <li>Using the process described above, apply any filters of interest from the lefthand facet menu.</li>
                                            <li>Navigate to the Participants table. On the results tables of the Explore Dashboard, you can select a row of metadata using the checkbox at the start of the row. Multiple rows can be selected within a table, even across pages of the table. Use the checkbox at the top of the checkbox column to select or deselect all rows.</li>
                                            <li>After selecting desired rows, select the “CREATE COHORT” button to add the selected participants to a cohort (Figure 7). A "View of All Cohorts” pop-up window will open in at least one participant row is selected.</li>
                                            <li>From the "View of All Cohorts" window, you can view and delete all cohorts and see details about a selected cohort, which will be your newly created cohort, by default (Figure 8).</li>
                                            <li>In the selected cohort view, you can view current cohort attributes as well as change the name, add a description, search by participant ID, delete participants from the list (Figure 8).</li>
                                            <li>Click the “DOWNLOAD SELECTED COHORT” button to download a manifest json or csv file for the selected cohort (Figure 8).</li>
                                            <li>Click the X button in the top right to return to the Participant table.</li>
                                        </ul>
                                        <p>Once a cohort exists, you can easily add more Participants to a cohort by selecting at least one new participant, clicking the “ADD PARTICIPANTS TO EXISTING COHORT” button, and selecting the preferred cohort from the dropdown menu (Figure 9). Clicking the “VIEW ALL COHORTS” button from the Participant table will re-open the “View of All Cohorts” pop-up window described above.</p>
                                        <p>A user can create up to 20 cohorts to exist at any time – cohorts will be stored until a user deletes their browser history. An individual cohort can contain a maximum of 5,000 participants.</p>
                                    </div>
                                </div>
                                <div>
                                    <div id='Downloading Metadata from the Studies tab' className={classes.sectionTitle}>
                                        <p>Downloading Metadata from the Studies tab</p>
                                    </div>
                                    <div className={classes.mciContentContainer}>
                                        <p>From the CCDI Hub Explore Dashboard, you can download all open metadata for each study from the “Studies” tab to further filter data and build cohorts. For instance, additional filtering by diagnosis of interest can generate a set of participants and the resulting manifest can be uploaded into the CGC. As an example, the following steps guide you on how to download the metadata for the CCDI Molecular Characterization Initiative:</p>
                                        <ul>
                                            <li>Using the process described above, open the “STUDY” set of filters from the lefthand menu, expand the “STUDY NAME” category, and scroll down to find “Molecular Characterization Initiative.”</li>
                                            <li>Select the checkbox corresponding to “Molecular Characterization Initiative” and see the Dashboard reload, filtered for this study’s details.</li>
                                            <li>Navigate to “Studies” in the results tables and locate the “Manifest” column.</li>
                                            <li>Click the “Download study manifest” icon in the “Manifest” column to download the metadata for this study (Figure 10).</li>
                                            <li>Open the resulting file on your local machine to browse the resulting metadata tables (Figure 11).</li>
                                        </ul>
                                        <p>Appendix A details the process for generating a DRS manifest from the downloaded study metadata tables to be compatible with the CGC.</p>
                                    </div>
                                </div>
                                <div>
                                    <div id='Creating an Exportable File Manifest from the Cart' className={classes.sectionTitle}>
                                        <p>Creating an Exportable File Manifest from the Cart</p>
                                    </div>
                                    <div className={classes.mciContentContainer}>
                                        <p>In addition to the study-specific downloads, you can also export each row-level metadata element for CCDI participants, diagnoses, samples, or files based on your selections within the Explore Dashboard. Here’s how to create a manifest file of filtered information on the Explore Dashboard:</p>
                                        <ul>
                                            <li>On the results tables of the Explore Dashboard, you can select a row of metadata using the checkbox at the start of the row. Multiple rows can be selected within a table, even across pages of the table. Use the checkbox at the top of the checkbox column to select or deselect all rows.</li>
                                            <li>After selecting desired rows, add files for that element to the My Files shopping cart (Figure 12 by clicking either the “ADD ALL FILTERED FILES” or “ADD SELECTED FILES” button. Note that selection of items in each tab depends on the specific content of that tab. For example, selecting an item in the “Participants” tab means every file associated with a participant will be added to the My Files shopping cart, whereas selecting an item in the “Files” tab will add that single selected file to the cart.</li>
                                            <li>To navigate to the shopping cart, select “MY FILES” or the shopping cart icon on the menu bar (Figure 13).</li>
                                            <li>The shopping cart feature enables you to select and manage files. It’s a simple way to keep track of data and files during your session. Selecting the “DOWNLOAD MANIFEST” button from the “AVAILABLE EXPORT OPTIONS” dropdown menu (Figure 14) will produce a comma-separated values (CSV) file manifest of the items within the cart.</li>
                                            <li>You can then download this manifest file locally or upload it in the CGC (Appendix C). Similarly, you can instead select the “EXPORT TO CANCER GENOMICS CLOUD” button from the “AVAILABLE EXPORT OPTIONS” dropdown menu to load the resulting manifest directly into your CGC account.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </UseGuideButtonContainer>
    )
}

export default withStyles(styles)(UseGuideButton);
