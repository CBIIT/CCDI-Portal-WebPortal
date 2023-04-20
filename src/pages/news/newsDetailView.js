import React from 'react';
import newsImg from '../../assets/news/News_Header.jpg';
import arrowIcon from '../../assets/news/News_Long_Arrow.svg';
import styled from 'styled-components';

const NewsDetailContainer = styled.div`
    width: 1440px;
    margin: 0 auto;

    .newsHeader {
        width: 1142px;
        height: 214px;
        margin: 0 auto;
        background-image: url(${newsImg});
        border-radius: 0px 0px 20px 20px;
        font-family: 'Poppins';
        font-weight: 600;
        font-size: 35px;
        line-height: 214px;
        text-align: center;
        letter-spacing: 0.02em;
        color: #FFFFFF;
    }

    .backButtonContainer {
        margin: 13px auto 58px 208px;
    }

    .backButton {
        font-family: 'Poppins';
        font-weight: 300;
        font-size: 14px;
        line-height: 16px;
        color: #0A5E63;
        padding-left: 32px;
        text-decoration: none;
        background: url(${arrowIcon}) left center no-repeat;
    }
`;

const NewsDetailView = () => {
    return (
        <NewsDetailContainer>
            <div className='newsHeader'>Hub News and Updates</div>
            <div className='backButtonContainer'>
                <a className='backButton' href="/news">Back to News and Updates Page</a>
            </div>
            <div style={{margin:"50px", fontSize:"30px"}}>{window.location.pathname.split('/')[2]}</div>
        </NewsDetailContainer>
    )
};

export default NewsDetailView;