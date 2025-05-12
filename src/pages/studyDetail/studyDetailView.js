import React from 'react';
import styled from 'styled-components';
import breadcrumbIcon from '../../assets/icons/Breadcrumb_Icon.svg';

const StudiesDetailContainer = styled.div`
    .breadcrumb {
        font-family: Public Sans;
        font-weight: 400;
        font-size: 16px;
        line-height: 162%;
        margin-left: 50px;
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
        </StudiesDetailContainer>
    )
}

export default StudiesDetail;