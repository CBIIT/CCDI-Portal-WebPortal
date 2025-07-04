import React from 'react';
import styled from 'styled-components';
import headerImg from '../../assets/studies/studyDetailBackground.png';
import breadcrumbIcon from '../../assets/icons/Breadcrumb_Icon.svg';
import bookIcon from '../../assets/studies/bookIcon.svg';
import exportIcon from '../../assets/studies/exportIcon.svg';
import manifestIcon from '../../assets/studies/manifestIcon.svg';
import { studyDownloadLinks } from '../../bento/studiesData';
import TabsView from './tabs/TabsView';
import ModalView from "./modal/ModalView";

const StudiesDetailContainer = styled.div`
    .breadcrumb {
        font-family: Public Sans;
        font-weight: 400;
        font-size: 16px;
        line-height: 162%;
        margin-left: 32px;
        padding-top: 8px;
        padding-bottom: 8px;

        a {
            color: #005EA2;
        }

        span {
            color: #1B1B1B;
        }
    }
    .breadcrumbIcon {
        position: relative;
        top: 4px;
    }

    .resourceHeader {
        width: 100%;
    }

    .resourceHeaderBackground {
        width: 100%;
        background-image: url(${headerImg});
        background-repeat:no-repeat;
        background-position:center; 
    }

    .resourceHeaderText {
        width: 1420px;
        margin: 0 auto;
        padding: 34px 0 10px 36px;
        color: #0E546E;
        font-family: Poppins;
        font-size: 40px;
        font-weight: 400;
        line-height: 45px;
        letter-spacing: 0.8px;
    }

    .resourceTitleContainer {
        background: #0E546E;
    }

    .resourceTitle {
        // width: 1420px;
        margin: 0 auto;
        display: flex;
        color: #FFF;
        font-family: Poppins;
        font-size: 35px;
        font-weight: 300;
        line-height: 38px;
        letter-spacing: 0.7px;
        padding: 15px 0 15px 36px;
    }

    .studyIdText {
        margin: 0 20px;
        color: #FFFFFF;
        font-family: Poppins;
        font-size: 35px;
        font-style: normal;
        font-weight: 600;
        line-height: 38px;
        letter-spacing: 0.7px;
        text-decoration-line: underline;
        text-decoration-style: solid;
        text-decoration-thickness: 2px;
    }

    .participantContaniner {
        display: flex;
        margin-left: auto;
        padding: 0 25px;
        padding-top: 10px;
        color: #60D0F9;
        font-family: Poppins;
        font-size: 19px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0.38px;
    }

    .subjectNumber {
        margin-left: 8px;
        color: #FFFFFF;
        font-family: Poppins;
        font-size: 19px;
        font-style: normal;
        font-weight: 600;
        line-height: 21px; /* 110.526% */
        letter-spacing: 0.38px;
        text-decoration-line: underline;
        text-decoration-style: solid;
        text-decoration-thickness: 1px;
    }

    @media (min-width: 1420px) {
        .breadcrumb {
            width: 1350px;
            margin: 0 auto;
        }
        .resourceTitle {
            width: 1420px;
        }

        .resourceHeaderText {
            width: 1420px;
        }

        .resourceBreadcrumbContainer {
            width: 1420px;
        }
    }
`;

const StudiesDetailBodyContainer = styled.div`
    // width: 1420px;
    // margin: 0 auto;
    display: grid;
    grid-template-columns: 50% 50%;

    .leftContainer {
        border-right: 1px solid #939393;
        padding: 34px 40px 20px 70px;
    }

    .rightContainer {
        padding: 34px 70px 20px 40px;
    }

    .studyItem {
        margin-bottom: 33px;
    }

    .studyItemTitle {
        color: #0095A2;
        font-family: Poppins;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0.32px;
        text-transform: uppercase;
    }

    .studyItemContent {
        color: #000000;
        font-family: Inter;
        font-size: 16px;
        font-weight: 500;
        line-height: 22px;

        a {
            color: #455299;
            font-family: Inter;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: 22px;
        }
    }

    .exportIcon {
        margin-left: 8px;
    }

    .studyManifestIcon {
        margin-left: 10px;
    }

     @media (min-width: 1420px) {
        width: 1420px;
        margin: 0 auto;
    }
`;

const StudiesDetail = ({data}) => {
    return(
        <StudiesDetailContainer>
            <div className='breadcrumb'>
                <a href='/'>Home</a>
                <img src={breadcrumbIcon} className='breadcrumbIcon' alt="breadcrumb icon" />
                <a href='/studies'>Studies</a>
                <img src={breadcrumbIcon} className='breadcrumbIcon' alt="breadcrumb icon" />
                <span>Study Code {data.study_id}</span>
            </div>
            <div className='resourceHeader'><div className='resourceHeaderBackground'><div className='resourceHeaderText'>CCDI Hub Studies</div></div></div>
            <div className='resourceTitleContainer'>
                <div className='resourceTitle'>
                    <div>Study Code:<a href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${data.study_id}`} className='studyIdText' target="_blank" rel="noopener noreferrer">{data.study_id}</a><img src={bookIcon} alt="bookIcon" /></div>
                    <div className='participantContaniner'>Participants in this Study: <a href={`/explore?dbgap_accession=${data.study_id}`} className='subjectNumber'>{data.num_of_participants.toLocaleString('en-US')}</a></div>
                </div>
            </div>
            <StudiesDetailBodyContainer>
                <div className='leftContainer'>
                    <div className='studyItem'>
                        <div className='studyItemTitle'>STUDY ID</div>
                        <div className="studyItemContent"><a href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${data.study_id}`} target="_blank" rel="noopener noreferrer">{data.study_id}<img className='exportIcon' src={exportIcon} alt="exportIcon" /></a></div>
                    </div>
                    <div className='studyItem'>
                        <div className='studyItemTitle'>STUDY NAME</div>
                        <div className="studyItemContent">{data.study_name}</div>
                    </div>
                    <div className='studyItem'>
                        <div className='studyItemTitle'>Study Description</div>
                        <div className="studyItemContent">{data.study_description}</div>
                    </div>
                    <div className='studyItem'>
                        <div className='studyItemTitle'>Publications</div>
                        <div className="studyItemContent">
                            {
                                data.pubmed_ids !== '' ?
                                data.pubmed_ids.split(";").map((publicationItem, idx) => {
                                    const key = `publication_${idx}`;
                                    return (
                                        <div key={key}><a href={`https://pubmed.ncbi.nlm.nih.gov/${publicationItem}`} target="_blank" rel="noopener noreferrer">PMID:{publicationItem}<img className='exportIcon' src={exportIcon} alt="exportIcon" /></a></div>
                                    )
                                })
                                : <div>N/A</div>
                            }
                        </div>
                    </div>
                    <div className='studyItem'>
                        <div className='studyItemTitle'>Download</div>
                        <div className="studyItemContent"><a href={studyDownloadLinks[data.study_id]}>Study Manifest<img className='studyManifestIcon' src={manifestIcon} alt="manifestIcon" /></a></div>
                    </div>
                </div>
                <div className='rightContainer'>
                    <div className='studyItem'>
                        <div className='studyItemTitle'>Participants Count</div>
                        <div className="studyItemContent">{data.num_of_participants.toLocaleString('en-US')}</div>
                    </div>
                    <div className='studyItem'>
                        <div className='studyItemTitle'>Samples Count</div>
                        <div className="studyItemContent">{data.num_of_samples.toLocaleString('en-US')}</div>
                    </div>
                    <div className='studyItem'>
                        <div className='studyItemTitle'>Study Profile</div>
                        <div className="studyItemContent">
                            <TabsView data={data}/>
                            <ModalView data={data}/>
                        </div>
                    </div>
                </div>
            </StudiesDetailBodyContainer>
        </StudiesDetailContainer>
    )
}

export default StudiesDetail;