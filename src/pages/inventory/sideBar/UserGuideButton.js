import React, { useState } from 'react';
import styled from 'styled-components';
import {
    Modal, Box, Button, IconButton, withStyles
} from '@material-ui/core';
import styles from './UserGuideButtonStyle';
import userguideIcon from '../../../assets/icons/Explore_User_Guide_Icon.svg';
import userguideIconWhite from '../../../assets/icons/Explore_User_Guide_Icon_White.svg';
import CloseIcon from '@material-ui/icons/Close';
import figure1 from '../../../assets/explore/Figure1.png';
import figure2 from '../../../assets/explore/Figure2.png';
import figure3 from '../../../assets/explore/Figure3.png';
import figure4 from '../../../assets/explore/Figure4.png';
import figure5 from '../../../assets/explore/Figure5.png';
import figure6 from '../../../assets/explore/Figure6.png';
import figure7 from '../../../assets/explore/Figure7.png';
import figure8 from '../../../assets/explore/Figure8.png';
import figure9 from '../../../assets/explore/Figure9.png';
import figure10 from '../../../assets/explore/Figure10.png';
import figure11 from '../../../assets/explore/Figure11.png';
import figure12 from '../../../assets/explore/Figure12.png';
import figure13 from '../../../assets/explore/Figure13.png';
import figure14 from '../../../assets/explore/Figure14.png';
import figure15 from '../../../assets/explore/Figure15.png';
import figure16 from '../../../assets/explore/Figure16.png';
import figure17 from '../../../assets/explore/Figure17.png';

const UseGuideButtonContainer = styled.div`
    .buttonContainer {
        position: absolute;
        top: -82px;
        display: flex;
        width: 100%;
        padding: 7px 6px 7px 6px;
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
    const [isHover, setIsHover] = useState(false);
    const [selectedNavTitle, setSelectedNavTitle] = useState('');
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const titleList = [
        'Overview',
        'Finding Participants, Studies, Samples, and Files',
        'Creating and Managing Cohorts',
        'Downloading Metadata from the Studies tab',
        'Creating an Exportable File Manifest from the Cart',
        "Accessing Help Documentation",
        'Additional Search Features',
        'Contact Information',
        'Full User Guide',
    ];

    const handleClickEvent = (event) => {
        const id = event.target.getAttribute('name');
        setSelectedNavTitle(id);
        const contentElement = document.getElementById('UserGuideContentSection');
        const element = document.getElementById(id);
        contentElement.scrollTo({ 
            top: element.offsetTop - 40,
            behavior: "smooth" 
        });
    }

    const modalBody = {
        position: 'relative',
        margin: '0 auto',
        marginTop: '6%',
        width: '90%',
        maxWidth: '1279px',
        height: '723px',
        background: '#FFFFFF',
        border: '1px solid #505050',
        borderRadius: '40px',
        overflow: 'hidden',
        outline: 0,
    };

    return (
        <UseGuideButtonContainer>
            <div className='buttonContainer'>
                <Button
                    variant="outlined"
                    onClick={handleClickOpen}
                    className={classes.customButton}
                    classes={{ root: classes.clearAllButtonRoot }}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    <img src={isHover?userguideIconWhite: userguideIcon} alt="user guide icon" />
                </Button>
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
                                            <div name={titleItem} className={selectedNavTitle === titleItem ? classes.navTopicItemSelected : classes.navTopicItem} key={topickey} onClick={handleClickEvent}>{titleItem}</div>
                                        )
                                    })
                                }
                            </div>
                        <div id='UserGuideContentSection' className={classes.contentSection}>
                            <div className={classes.contentList}>
                                <div className={classes.contentTitle}>CCDI Hub Explore Dashboard and Cart</div>
                                <div id='Overview' className={classes.sectionTitle}>
                                    <p>Overview</p>
                                </div>
                                <div className={classes.contentContainer}>
                                    <p>The <a href="/explore">CCDI Hub Explore Dashboard</a> is a tool that allows for the exploration of participant-level, diagnoses, studies, samples, and files information for CCDI-managed data sets. The Explore Dashboard enables researchers to find CCDI data within a single study or across multiple studies and create synthetic cohorts based on filtered search (i.e., demographics, diagnosis, samples, etc.). Upon interaction with these filters (Figure 1A), users can review the open-access information through visual summaries (Figure 1B) and browse the row level data in tabs organized by participants, diagnosis, studies, samples, and files (Figure 1C) to determine which data sets are applicable to their research questions. Users can then add desired files to the cart (Figure 1D), from which they can download a manifest for the selected data or take the manifest directly into the CGC. To access the controlled data, users must request them at the <a className={classes.link} href="https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?page=login" target="_blank" rel="noopener noreferrer">controlled-access login page on dbGaP</a>. Note that bulk downloads are only possible through Command Line Interface (CLI) client as described in Appendices B and C.</p>
                                    <div className={classes.figureContainer}><img src={figure1} style={{width: '40%'}} alt='Figure1'/></div>
                                    <div className={classes.figureText}>Figure 1: CCDI Hub Explore Dashboard and Cart features</div>
                                    <p>Step-by-step instructions for finding and exporting data are included below.</p>
                                </div>
                                <div>
                                    <div id='Finding Participants, Studies, Samples, and Files' className={classes.sectionTitle}>
                                        <p>Finding Participants, Studies, Samples, and Files</p>
                                    </div>
                                    <div className={classes.contentContainer}>
                                        <p>The CCDI Hub Explore Dashboard provides row-level metadata for CCDI study participants and their data objects for review with a filtered search, select visualizations, and an exportable table of results. Here’s how to find and filter information on the Explore Dashboard:</p>
                                        <ol>
                                            <li>
                                                The CCDI Hub is located at <a href="/">ccdi.cancer.gov</a>. From the CCDI Hub Home page, navigate to the Explore Dashboard by clicking “Explore” (Figure 2).
                                                <div className={classes.figureContainer}><img src={figure2} style={{width: '60%'}} alt='Figure2'/></div>
                                                <div className={classes.figureText}>Figure 2: CCDI homepage with red box highlighting the “Explore” menu bar link</div> 
                                            </li>
                                            <li>
                                                On the Explore Dashboard, you can filter row-level data and view them as visualizations (Figure 3). The Explore Dashboard is participant-centric, meaning that filtering criteria and results return de-identified information about a participant and their related studies, collected samples, or created files.
                                                <div className={classes.figureContainer}><img src={figure3} style={{width: '40%'}} alt='Figure3'/></div>
                                                <div className={classes.figureText}>Figure 3: Explore Dashboard page with red boxes highlighting the search filters and results</div> 
                                            </li>
                                            <li>
                                                Search criteria are displayed in the right panel (Figure 4A). Faceted filtering may be done by uploading a list of participant IDs (in “DEMOGRAPHICS” Figure 4B), text searches (“DIAGNOSIS,” “DIAGNOSIS ANATOMIC SITE,” and “SAMPLE ANATOMIC SITE” Figure 4C), numerical sliders (“AGE AT DIAGNOSIS” and “AGE AT COLLECTION” Figure 4D), or checkbox selections for the remaining properties. You can apply multiple filtering criteria at the same time in a search. You can view and clear your current selection(s) in the query summary at the top of the widgets (Figure 4E).
                                                <div className={classes.figureContainer}><img src={figure4} style={{width: '90%'}} alt='Figure4'/></div>
                                                <div className={classes.figureText}>Figure 4: Full facet list in Explore Dashboard with highlights of various facet types and query display/clear function</div> 
                                            </li>
                                            <li>Filtering your search will update the Explore Dashboard’s visualizations and the results tables (Figure 5). Each results table will be updated with information on the participants, samples, studies, or files that meet the filtered criteria. Information displayed by default on each table is described below:
                                                <ol className={classes.alphaList}>
                                                    <li>“Participants”: Characteristics of a participant in the Explore Dashboard. Participants belong to a study, and they may have one or more samples, diagnoses, or files associated with them. Participants with mappings through the <a href='/ccdi-participant-index'>CCDI Participant Index (CPI)</a> have a summary of these mappings available from this view.</li>
                                                    <li>“Studies”: Studies that are a part of the Explore Dashboard. Participants, diagnosis, samples, and files all belong to a CCDI study.</li>
                                                    <li>“Samples”: Samples available from participants within the Explore Dashboard. Samples belong to a participant and can be associated with one or more files.</li>
                                                    <li>
                                                        “Files”: Files available from studies, participants, and samples within the Explore Dashboard. Files may belong to a study and may be associated with one or more participants or samples. Files may also be of many types, including sequencing, proteomics, imaging files, etc. DICOM imaging files are currently available for the Genomic Sequencing of Pediatric Rhabdomyosarcoma (phs000720) and Molecular Characterization Initiative (phs002790) studies and can be accessed directly from the <a className={classes.link} href="https://portal.imaging.datacommons.cancer.gov" target="_blank" rel="noopener noreferrer">Imaging Data Commons (IDC) Data Portal</a> and file paths to images are provided in the downloadable study manifest within Hub, described in the following section.
                                                        <div className={classes.figureContainer}><img src={figure5} style={{width: '70%'}} alt='Figure5'/></div>
                                                        <div className={classes.figureText}>Figure 5: Explore Dashboard visualizations and results tables with arrows pointing to the available informational tables</div> 
                                                    </li>
                                                </ol>
                                            </li>
                                            <li>
                                                Visible columns in each table can be customized by clicking the “View columns” button in the upper righthand corner of the table and selecting or deselecting available columns (Figure 6). Note that Participant ID, Sample ID, and Study ID cannot be removed from any table, and File Name cannot be removed from the Files table.
                                                <div className={classes.figureContainer}><img src={figure6} style={{width: '70%'}} alt='Figure6'/></div>
                                                <div className={classes.figureText}>Figure 6: Interface for selecting and deselecting columns in table and downloads</div> 
                                            </li>
                                            <li>
                                                You can show, hide, and copy the URL used to construct your filtered view using the toggle and copy buttons at the top of the widgets (Figure 7).
                                                <div className={classes.figureContainer}><img src={figure7} style={{width: '70%'}} alt='Figure7'/></div>
                                                <div className={classes.figureText}>Figure 7: Query URL</div>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                                <div>
                                    <div id='Creating and Managing Cohorts' className={classes.sectionTitle}>
                                        <p>Creating and managing cohorts</p>
                                    </div>
                                    <div className={classes.contentContainer}>
                                        <p>From the CCDI Hub Explore Dashboard Participant table, or you can group participants into cohorts to find files of interest, or you can add files directly to the cart (read more in next section). To create a cohort:</p>
                                        <ol>
                                            <li>Using the process described above, apply any filters of interest from the lefthand facet menu.</li>
                                            <li>Navigate to the Participants table. On the results tables of the Explore Dashboard, you can select a row of metadata using the checkbox at the start of the row. Multiple rows can be selected within a table, even across pages of the table. Use the checkbox at the top of the checkbox column to select or deselect all rows.</li>
                                            <li>
                                                After selecting desired rows, select the “CREATE COHORT” button to add the selected participants to a cohort (Figure 8). A "View of All Cohorts” pop-up window will open in at least one participant row is selected.
                                                <div className={classes.figureContainer}><img src={figure8} style={{width: '70%'}} alt='Figure8'/></div>
                                                <div className={classes.figureText}>Figure 8: Cohort creation and management</div>
                                            </li>
                                            <li>From the "View of All Cohorts" window, you can view and delete all cohorts and see details about a selected cohort, which will be your newly created cohort, by default (Figure 9).</li>
                                            <li>In the selected cohort view, you can view current cohort attributes as well as change the name, add a description, search by participant ID, delete participants from the list (Figure 9).</li>
                                            <li>
                                                Click the “DOWNLOAD SELECTED COHORT” button to download a manifest json or csv file for the selected cohort (Figure 9).
                                                <div className={classes.figureContainer}><img src={figure9} style={{width: '40%'}} alt='Figure9'/></div>
                                                <div className={classes.figureText}>Figure 9: View of All Cohorts</div>
                                            </li>
                                            <li>Click the X button in the top right to return to the Participant table.</li>
                                        </ol>
                                        <p>Once a cohort exists, you can easily add more Participants to a cohort by selecting at least one new participant, clicking the “ADD PARTICIPANTS TO EXISTING COHORT” button, and selecting the preferred cohort from the dropdown menu (Figure 10). Clicking the “VIEW ALL COHORTS” button from the Participant table will re-open the “View of All Cohorts” pop-up window described above.</p>
                                        <div className={classes.figureContainer}><img src={figure10} style={{width: '80%'}} alt='Figure10'/></div>
                                        <div className={classes.figureText}>Figure 10: Add Participants to Existing Cohort button</div> 
                                        <p>A user can create up to 20 cohorts to exist at any time – cohorts will be stored until a user deletes their browser history. An individual cohort can contain a maximum of 5,000 participants.</p>
                                    </div>
                                </div>
                                <div>
                                    <div id='Downloading Metadata from the Studies tab' className={classes.sectionTitle}>
                                        <p>Downloading Metadata from the Studies tab</p>
                                    </div>
                                    <div className={classes.contentContainer}>
                                        <p>From the CCDI Hub Explore Dashboard, you can download all open metadata for each study from the “Studies” tab to further filter data and build cohorts. For instance, additional filtering by diagnosis of interest can generate a set of participants and the resulting manifest can be uploaded into the CGC. As an example, the following steps guide you on how to download the metadata for the CCDI Molecular Characterization Initiative:</p>
                                        <ol>
                                            <li>Using the process described above, open the “STUDY” set of filters from the lefthand menu, expand the “STUDY NAME” category, and scroll down to find “Molecular Characterization Initiative.”</li>
                                            <li>Select the checkbox corresponding to “Molecular Characterization Initiative” and see the Dashboard reload, filtered for this study’s details.</li>
                                            <li>Navigate to “Studies” in the results tables and locate the “Manifest” column.</li>
                                            <li>
                                                Click the “Download study manifest” icon in the “Manifest” column to download the metadata for this study (Figure 11).
                                                <div className={classes.figureContainer}><img src={figure11} style={{width: '90%'}} alt='Figure11'/></div>
                                                <div className={classes.figureText}>Figure 11: Download metadata manifest for a given study</div> 
                                            </li>
                                            <li>
                                                Open the resulting file on your local machine to browse the resulting metadata tables (Figure 12).
                                                <div className={classes.figureContainer}><img src={figure12} style={{width: '80%'}} alt='Figure12'/></div>
                                                <div className={classes.figureText}>Figure 12: Study metadata export file browsable on local machine</div> 
                                            </li>
                                        </ol>
                                        <p>Appendix A details the process for generating a DRS manifest from the downloaded study metadata tables to be compatible with the CGC.</p>
                                    </div>
                                </div>
                                <div>
                                    <div id='Creating an Exportable File Manifest from the Cart' className={classes.sectionTitle}>
                                        <p>Creating an Exportable File Manifest from the Cart</p>
                                    </div>
                                    <div className={classes.contentContainer}>
                                        <p>In addition to the study-specific downloads, you can also export each row-level metadata element for CCDI participants, diagnoses, samples, or files based on your selections within the Explore Dashboard. Here’s how to create a manifest file of filtered information on the Explore Dashboard:</p>
                                        <ol>
                                            <li>On the results tables of the Explore Dashboard, you can select a row of metadata using the checkbox at the start of the row. Multiple rows can be selected within a table, even across pages of the table. Use the checkbox at the top of the checkbox column to select or deselect all rows.</li>
                                            <li>
                                                After selecting desired rows, add files for that element to the My Files shopping cart (Figure 13) by clicking either the “ADD ALL FILTERED FILES” or “ADD SELECTED FILES” button. Note that selection of items in each tab depends on the specific content of that tab. For example, selecting an item in the “Participants” tab means every file associated with a participant will be added to the My Files shopping cart, whereas selecting an item in the “Files” tab will add that single selected file to the cart.
                                                <div className={classes.figureContainer}><img src={figure13} style={{width: '80%'}} alt='Figure13'/></div>
                                                <div className={classes.figureText}>Figure 13: Selection checkboxes and buttons to add files to the cart for the “Participants” table</div> 
                                            </li>
                                            <li>
                                                To navigate to the shopping cart, select “MY FILES” or the shopping cart icon on the menu bar (Figure 14).
                                                <div className={classes.figureContainer}><img src={figure14} style={{width: '80%'}} alt='Figure14'/></div>
                                                <div className={classes.figureText}>Figure 14: CCDI Hub menu bar with red box highlighting the My Files shopping cart</div> 
                                            </li>
                                            <li>
                                                The shopping cart feature enables you to select and manage files. It’s a simple way to keep track of data and files during your session. Selecting the “DOWNLOAD MANIFEST” button from the “AVAILABLE EXPORT OPTIONS” dropdown menu (Figure 15) will produce a comma-separated values (CSV) file manifest of the items within the cart.
                                                <div className={classes.figureContainer}><img src={figure15} style={{width: '90%'}} alt='Figure15'/></div>
                                                <div className={classes.figureText}>Figure 15: The Explore Dashboard Cart page with red box highlighting the “Available Export Options” button</div> 
                                            </li>
                                            <li>You can then download this manifest file locally or upload it in the CGC (Appendix C). Similarly, you can instead select the “EXPORT TO CANCER GENOMICS CLOUD” button from the “AVAILABLE EXPORT OPTIONS” dropdown menu to load the resulting manifest directly into your CGC account.</li>
                                        </ol>
                                        <p>Note that the Cart has a maximum capacity of 200,000 files, which may limit the ability to create very large manifests for use in the CGC. Should you need to create a manifest containing more than 100,000 files, you can either create manifests from the cart in batches (containing up to 100,000 files in each batch) or use the comprehensive metadata downloads from the Explore page “Studies” tab to create a manifest that can take all data for a given study into the CGC. Longer term solutions are being researched.</p>
                                    </div>
                                </div>
                                <div>
                                    <div id="Accessing Help Documentation" className={classes.sectionTitle}>
                                        <p>Accessing Help Documentation</p>
                                    </div>
                                    <div className={classes.contentContainer}>
                                        <p>The contents of this document are also available from a Help Browser, accessible from the top of the Explore Dashboard (Figure 16). From this browser, you can scroll or click through the available topics and readily navigate back to the main UI as needed.</p>
                                        <div className={classes.figureContainer}><img src={figure16} style={{width: '80%'}} alt='Figure16'/></div>
                                        <div className={classes.figureText}>Figure 16: In-page help text browser</div> 
                                    </div>
                                </div>
                                <div>
                                    <div id="Additional Search Features" className={classes.sectionTitle}>
                                        <p>Additional search features</p>
                                    </div>
                                    <div className={classes.contentContainer}>
                                        <p>For users who prefer text searching, the global search bar at the top of each page allows you enter a query and report all findings in metadata and page text throughout the CCDI Hub. Search results are categorized as Participant, Studies, Samples, Files, Data Model, or About (Figure 17). Where applicable, you can link from these findings back to the Explore Dashboard or other pages with information relevant to your search.</p>
                                        <div className={classes.figureContainer}><img src={figure17} style={{width: '80%'}} alt='Figure17'/></div>
                                        <div className={classes.figureText}>Figure 17: Global Search results</div>
                                        <p>For users interested in the data model, you can browse the model nodes and properties by selecting “CCDI Data Model” from the About dropdown menu.</p>
                                    </div>
                                </div>
                                <div>
                                    <div id='Contact Information' className={classes.sectionTitle}>
                                        <p>Contact Information</p>
                                    </div>
                                    <div className={classes.contentContainer}>
                                        <p>Please direct any questions or requests for further information to the <a href="mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov" target="_blank" rel="noopener noreferrer">CCDI mailbox</a>.</p>
                                    </div>
                                </div>
                                <div>
                                    <div id='Full User Guide' className={classes.sectionTitle}>
                                        <p>Full User Guide</p>
                                    </div>
                                    <div className={classes.contentContainer}>
                                        <p style={{paddingBottom: '100px'}}>To learn more about CCDI Hub, Explore Dashboard, and accessing data, see the complete <a href="/user-guide.pdf" className={classes.link} target="_blank" rel="noopener noreferrer">User Guide</a>.</p>
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
