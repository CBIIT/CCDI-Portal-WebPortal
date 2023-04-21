import React, { useState } from 'react';
import newsImg from '../../assets/news/News_Header.jpg';
import arrowIcon from '../../assets/news/News_Long_Arrow.svg';
import styled from 'styled-components';
import { newsList } from '../../bento/newsData'

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

const NewsContentContainer = styled.div`
    width: 775px;
    margin: 0 auto;

    .tabContainer {
        display: flex;
    }

    .tabItem {
        padding: 0 12px;
        height: 24px;
        background: #E6F2F5;
        border: 1.5px solid #7CCFD6;
        border-radius: 8px;
        font-family: 'Inter';
        font-weight: 300;
        font-size: 11px;
        line-height: 21px;
        color: #314E51;
    }

    .tabItem:hover {
        border: 1.5px solid #0095A2;
        cursor: pointer;
    }

    .splitLine {
        content:'';
        width: 100%;
        display:inline-block;
        border-bottom: 1px solid #7CCFD6;
        margin: 15px 0 26px 0;
    }
    
    .newsItemTitle {
        font-family: 'Poppins';
        font-weight: 600;
        font-size: 26px;
        line-height: 24px;
        color: #00727B;
    }

    .newsItemDate {
        font-family: 'Inter';
        font-weight: 300;
        font-size: 13px;
        line-height: 24px;
        text-transform: uppercase;
        color: #000000;
        margin: 15px 0;
    }
`;

const getNewsItem = (newsId) => {
    if (newsId == "") {
      return {};
    } else {
      return newsList.filter((item) => item.id == newsId);
    }
  };

const NewsDetailView = () => {
    const newsId = window.location.pathname.split('/')[2];
    const newsItem = getNewsItem(newsId)[0];
    return (
        <NewsDetailContainer>
            <div className='newsHeader'>Hub News and Updates</div>
            <div className='backButtonContainer'>
                <a className='backButton' href="/news">Back to News and Updates Page</a>
            </div>
            <NewsContentContainer>
                <div className='tabContainer'>
                    <div className='tabItem'>{newsItem.type}</div>
                </div>
                <div className='splitLine' />
                <div className='newsItemTitle'>{newsItem.title} </div>
                <div className='newsItemDate'>{newsItem.date}</div>
            </NewsContentContainer>
            <div style={{margin:"50px", fontSize:"30px"}}>{window.location.pathname.split('/')[2]}</div>
        </NewsDetailContainer>
    )
};

export default NewsDetailView;