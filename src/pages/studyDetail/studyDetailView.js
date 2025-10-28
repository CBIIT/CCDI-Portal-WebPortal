import React, { useState } from 'react';
import styled from 'styled-components';
import headerImg from '../../assets/studies/studyDetailBackground.png';
import breadcrumbIcon from '../../assets/icons/Breadcrumb_Icon.svg';
import bookIcon from '../../assets/studies/bookIcon.svg';
import OverviewView from './overview/overviewView';
import SupportingDataView from './supportingData/supportingDataView';
const StudiesDetailContainer = styled.div`
    .breadcrumb {
        font-family: Public Sans;
        font-weight: 400;
        font-size: 16px;
        line-height: 162%;
        padding-left: 30px;
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
        padding: 13px 0 13px 36px;
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
            width: 1420px;
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

const TabsContainer = styled.div`
    width: 100%;
    border-bottom: 1px solid #939393;
    
    @media (min-width: 1420px) {
        .tabsWrapper {
            width: 1420px;
            margin: 0 auto;
        }
    }
`;

const TabsList = styled.div`
    display: flex;
    padding: 0 40px;
    gap: 40px;
    padding-bottom: 1px;
`;

const Tab = styled.button`
    background: none;
    border: none;
    padding: 16px 0;
    font-family: Poppins;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.36px;
    cursor: pointer;
    position: relative;
    color: ${props => props.active ? '#0E546E' : '#757575'};
    transition: color 0.3s ease;

    &:hover {
        color: #0E546E;
    }

    ${props => props.active && `
        &::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            right: 0;
            height: 4px;
            background-color: #0E546E;
        }
    `}
`;

const StudiesDetailBodyContainer = styled.div`
    // width: 1420px;
    // margin: 0 auto;
    display: grid;
    grid-template-columns: 50% 50%;

     @media (min-width: 1420px) {
        width: 1420px;
        margin: 0 auto;
    }
`;


const TAB_LABELS = {
    OVERVIEW: 'Overview',
    SUPPORTING_DATA: 'Supporting Data',
};

const StudiesDetail = ({data}) => {
    const [activeTab, setActiveTab] = useState(TAB_LABELS.OVERVIEW);

    // Check if supporting_data exists and has items
    const hasSupportingData = data.supporting_data && Array.isArray(data.supporting_data) && data.supporting_data.length > 0;

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
        
            <TabsContainer>
                <div className='tabsWrapper'>
                    <TabsList>
                        {/* OVERVIEW Tab */}
                        <Tab 
                            active={activeTab === TAB_LABELS.OVERVIEW}
                            onClick={() => setActiveTab(TAB_LABELS.OVERVIEW)}
                        >
                            {TAB_LABELS.OVERVIEW}
                        </Tab>
                        {/* SUPPORTING DATA Tab render only if supporting data exists */}
                        {hasSupportingData && (
                        <Tab 
                            active={activeTab === TAB_LABELS.SUPPORTING_DATA}
                            onClick={() => setActiveTab(TAB_LABELS.SUPPORTING_DATA)}
                        >
                            {TAB_LABELS.SUPPORTING_DATA}
                        </Tab>
                        )}
                    </TabsList>
                </div>
            </TabsContainer>

            {/* Studies Detail Body Container */}
            <StudiesDetailBodyContainer>

                {/* show tab content based on active tab default */}
                {activeTab === TAB_LABELS.OVERVIEW && (
                    <OverviewView data={data} />
                )}

                {/* If supporting data exists, show tab content based on active tab */}
                {hasSupportingData && activeTab === TAB_LABELS.SUPPORTING_DATA && (
                    <SupportingDataView data={data} />
                )}
            </StudiesDetailBodyContainer>
        
        </StudiesDetailContainer>
    )
}

export default StudiesDetail;