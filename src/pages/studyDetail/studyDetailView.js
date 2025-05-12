import React from 'react';
import styled from 'styled-components';
import headerImg from '../../assets/studies/studyDetailBackground.png';
import breadcrumbIcon from '../../assets/icons/Breadcrumb_Icon.svg';
import bookIcon from '../../assets/studies/bookIcon.svg';

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
        // text-decoration-line: underline;
        // text-decoration-style: solid;
        // text-decoration-thickness: 2px;
    }

    .goToSiteButton {
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
        // text-decoration-line: underline;
        // text-decoration-style: solid;
        // text-decoration-thickness: 1px;
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

const StudiesDetail = ({studyId}) => {
    return(
        <StudiesDetailContainer>
            <div className='breadcrumb'>
                <a href='/'>Home</a>
                <img src={breadcrumbIcon} className='breadcrumbIcon' alt="breadcrumb icon" />
                <a href='/studies'>Studies</a>
                <img src={breadcrumbIcon} className='breadcrumbIcon' alt="breadcrumb icon" />
                <span>Study Code {studyId}</span>
            </div>
            <div className='resourceHeader'><div className='resourceHeaderBackground'><div className='resourceHeaderText'>CCDI Hub Studies</div></div></div>
            <div className='resourceTitleContainer'>
                <div className='resourceTitle'>
                    <div>Study Code:<span className='studyIdText'>{studyId}</span><img src={bookIcon} alt="bookIcon" /></div>
                    <div className='goToSiteButton'>Subjects in this Study: <span className='subjectNumber'>300</span></div>
                </div>
            </div>
        </StudiesDetailContainer>
    )
}

export default StudiesDetail;