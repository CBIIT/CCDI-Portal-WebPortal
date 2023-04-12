import React from 'react';
import styled from 'styled-components';
import newsImg from '../../assets/news/News_Header.jpg';

const NewsContainer = styled.div`
  width: 1440px;
  margin: 0 auto;

  .newsHeader{
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
`;

const NewsView = () => {
  return (
    <NewsContainer>
      <div className='newsHeader'>Hub News and Updates</div>
    </NewsContainer>
  )
};

export default NewsView;
