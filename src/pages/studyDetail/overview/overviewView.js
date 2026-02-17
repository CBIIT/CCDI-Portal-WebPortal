import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import exportIcon from '../../../assets/studies/exportIcon.svg';
import manifestIcon from '../../../assets/studies/manifestIcon.svg';
import { studyDownloadLinks, studycBioPortalLinks, studyClinicalDataLinks } from '../../../bento/studiesData';
import TabsView from './tabs/TabsView';
import ModalView from './modal/ModalView';
import { styles } from './overviewStyle';

const OverviewView = ({ data, classes }) => {
    console.log(data);
    return (
        <div className={classes.container}>
            {/* Left Container for Study Details */}
            <div className={classes.leftContainer}>
                <div className={classes.studyItem}>
                    <div className={classes.studyItemTitle}>STUDY ID</div>
                    <div className={classes.studyItemContent}>
                        <a href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${data.study_id}`} target="_blank" rel="noopener noreferrer">
                            {data.study_id}
                            <img className={classes.exportIcon} src={exportIcon} alt="exportIcon" />
                        </a>
                    </div>
                </div>
                <div className={classes.studyItem}>
                    <div className={classes.studyItemTitle}>STUDY NAME</div>
                    <div className={classes.studyItemContent}>{data.study_name}</div>
                </div>
                <div className={classes.studyItem}>
                    <div className={classes.studyItemTitle}>Study Description</div>
                    <div className={classes.studyItemContent}>{data.study_description}</div>
                </div>
                <div className={classes.studyItem}>
                    <div className={classes.studyItemTitle}>Publications</div>
                    <div className={classes.studyItemContent}>
                        {
                            data.pubmed_ids !== '' ?
                            data.pubmed_ids.split(";").map((publicationItem, idx) => {
                                const key = `publication_${idx}`;
                                return (
                                    <div key={key}>
                                        <a href={`https://pubmed.ncbi.nlm.nih.gov/${publicationItem}`} target="_blank" rel="noopener noreferrer">
                                            PMID:{publicationItem}
                                            <img className={classes.exportIcon} src={exportIcon} alt="exportIcon" />
                                        </a>
                                    </div>
                                )
                            })
                            : <div>N/A</div>
                        }
                    </div>
                </div>
                <div className={classes.studyItem}>
                    <div className={classes.studyItemTitle}>Access Data</div>
                    <div className={classes.studyItemContent}>
                        <a href={studyDownloadLinks[data.study_id]}>
                            Download Study Manifest
                            <img className={classes.studyManifestIcon} src={manifestIcon} alt="manifestIcon" />
                        </a>
                        {studyClinicalDataLinks[data.study_id] && <>
                            {studyClinicalDataLinks[data.study_id].map((clinicalDataLink, idx) => {
                                const fileName = clinicalDataLink.split('/').pop() || `File ${idx + 1}`;
                                return (
                                    <div key={idx}>
                                        <a href={clinicalDataLink}  style={{ whiteSpace: 'nowrap' }} target="_blank" rel="noopener noreferrer">
                                            Source File - {fileName}
                                            <img className={classes.studyManifestIcon} src={manifestIcon} alt="manifestIcon" />
                                        </a>
                                    </div>
                                )
                            })}
                        </>}
                        {studycBioPortalLinks[data.study_id] && <>
                            <br/>
                            <a href={studycBioPortalLinks[data.study_id]} target="_blank" rel="noopener noreferrer">
                                View in CCDI cBioPortal Data Explorer
                                <img className={classes.exportIcon} src={exportIcon} alt="exportIcon" />
                            </a>
                        </>}
                    </div>
                </div>
            </div>

            {/* Right Container for Study Details */}
            <div className={classes.rightContainer}>
                <div className={classes.studyItem}>
                    <div className={classes.studyItemTitle}>Participants Count</div>
                    <div className={classes.studyItemContent}>{data.num_of_participants.toLocaleString('en-US')}</div>
                </div>
                <div className={classes.studyItem}>
                    <div className={classes.studyItemTitle}>Samples Count</div>
                    <div className={classes.studyItemContent}>{data.num_of_samples.toLocaleString('en-US')}</div>
                </div>
                <div className={classes.studyItem}>
                    <div className={classes.studyItemTitle}>Study Profile</div>
                    <div className={classes.studyItemContent}>
                        <TabsView data={data}/>
                        <ModalView data={data}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withStyles(styles)(OverviewView);

