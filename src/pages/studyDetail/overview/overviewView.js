import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Help from '@material-ui/icons/Help';
import exportIcon from '../../../assets/studies/exportIcon.svg';
import manifestIcon from '../../../assets/studies/manifestIcon.svg';
import { studyDownloadLinks, studycBioPortalLinks, studyClinicalDataLinks } from '../../../bento/studiesData';
import TabsView from './tabs/TabsView';
import ModalView from './modal/ModalView';
import { styles } from './overviewStyle';

const CONSENT_GLOSSARY_URL = 'https://www.ncbi.nlm.nih.gov/gap/docs/submissionguide/#consentgloss';

const CONSENT_CODES_TOOLTIP_TEXT = 'Consent codes describe the permitted uses and restrictions for this data. The codes below link to dbGaP and include details on General access (GRU) and different types of request-only access (e.g. HMB–IRB–NPU, MDS, etc...).';

const bareConsentSegment = (segment) => {
    const t = String(segment).trim();
    if (!t) return null;
    const m = t.match(/^\[(.*)\]$/);
    const inner = m ? m[1] : t;
    const v = inner.trim();
    return v || null;
};

const parseConsentCodes = (raw) => {
    if (raw == null) return [];
    if (Array.isArray(raw)) {
        return raw
            .filter((c) => c != null && String(c).trim() !== '')
            .flatMap((c) => parseConsentCodes(c));
    }
    const s = String(raw).trim();
    if (!s) return [];
    const oneBracketPair = /^\[([^\]]*)\]$/;
    const wrapped = s.match(oneBracketPair);
    if (wrapped) {
        return wrapped[1]
            .split(',')
            .map((part) => bareConsentSegment(part))
            .filter(Boolean);
    }
    const bracketMatches = [...s.matchAll(/\[([^\]]+)\]/g)];
    if (bracketMatches.length > 0) {
        return bracketMatches.flatMap((m) => m[1]
            .split(',')
            .map((part) => bareConsentSegment(part))
            .filter(Boolean));
    }
    return s.split(',').map((part) => bareConsentSegment(part)).filter(Boolean);
};

const OverviewView = ({ data, classes }) => {
    const consentCodes = parseConsentCodes(data.consent_codes);

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
                    <div className={classes.studyItemTitle}>ACCESS DATA</div>
                    <div className={classes.studyItemContent}>
                        <div className={classes.consentCodesBox}>
                            <div className={classes.consentCodesLabelRow}>
                                <span className={classes.consentCodesInnerLabel}>Consent Codes:</span>
                                <Tooltip
                                    interactive
                                    placement="top"
                                    enterTouchDelay={0}
                                    classes={{
                                        tooltip: classes.consentCodesTooltip,
                                        tooltipPlacementTop: classes.consentCodesTooltipPlacementTop,
                                        tooltipPlacementBottom: classes.consentCodesTooltipPlacementBottom,
                                    }}
                                    title={(
                                        <div className={classes.consentTooltipBody}>
                                            {CONSENT_CODES_TOOLTIP_TEXT}
                                            <span className={classes.consentTooltipCaret} aria-hidden />
                                        </div>
                                    )}
                                >
                                    <Help className={classes.consentHelpIcon} aria-label="About consent codes" />
                                </Tooltip>
                            </div>
                            {consentCodes.length === 0 ? (
                                <div>Not available</div>
                            ) : (
                                consentCodes.map((code, idx) => (
                                    <div key={`${code}-${idx}`} className={classes.consentCodeLine}>
                                        <a
                                            href={CONSENT_GLOSSARY_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={classes.consentCodeLink}
                                            aria-label={`${code} (opens dbGaP consent glossary in a new tab)`}
                                        >
                                            {code}
                                        </a>
                                        <OpenInNewIcon className={classes.consentExternalIcon} aria-hidden />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
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

