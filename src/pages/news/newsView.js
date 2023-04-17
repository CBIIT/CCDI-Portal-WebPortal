import React, {useState} from 'react';
import styled from 'styled-components';
import newsImg from '../../assets/news/News_Header.jpg';
import { newsList } from '../../bento/newsData'

const NewsContainer = styled.div`
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

  .tabList {
    display: flex;
    margin: 20px 0 40px 150px;
  }

  .tabListItem {
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: #298085;
    margin-left: 60px;
  }

  .tabListItemActive {
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: #0A5E63;
    margin-left: 60px;
    padding-bottom: 5px;
    border-bottom: 3px solid #0A5E63;
  }

  .tabListItemActive:hover {
    cursor: default;
  }

  .tabListItem:hover {
    color: #0A5E63;
  }

  .tabListItem:hover {
    cursor: pointer;
  }

  .newsList {
    width: 1440px;
    margin: 0 auto;
  }

  .newsItem {
    display: flex;
    width: 1047px;
    height: 248px;
    border: 1.5px solid transparent;
    border-radius: 0px 20px;
    margin: 0 auto;
    margin-bottom: 29px;
    padding: 23px 32px 0 38px;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  }

  .newsItem:hover {
    border: 1.5px solid #00BDCD;
  }

  .newsItemTextContainer {
    width: 76%;
  }

  .newsItemTitle {
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #0095A2;
    margin-bottom: 8px;
  }

  .newsItemDate {
    font-family: 'Inter';
    font-weight: 300;
    font-size: 13px;
    line-height: 24px;
    text-transform: uppercase;
    color: #000000;
    margin-bottom: 8px;
  }

  .newsItemContent {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
  }

  .newsItemImgContainer {
    margin: 12px 0 0 33px;
  }
`;

const NewsView = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const newsTabList = ['All', 'Announcements', 'News & Other', 'Application Updates', 'Site Updates'];
  return (
    <NewsContainer>
      <div className='newsHeader'>Hub News and Updates</div>
      <div className='tabList'>
        {
          newsTabList.map((newsTabItem, idx) => {
            const tabkey = `tabkey_${idx}`;
            return (
            <div key={tabkey} className={selectedTab === newsTabItem ? 'tabListItemActive' : 'tabListItem'} onClick={(() => setSelectedTab(newsTabItem))}>{newsTabItem}</div>
            )
          })
        }
      </div>
      <div className='newsList'>
        {
          newsList[selectedTab].map((newsItem, idx) => {
            const newskey = `news_${idx}`;
            return (
              <div key={newskey} className='newsItem'>
                <div className='newsItemTextContainer'>
                  <div className='newsItemTitle'>{newsItem.title}</div>
                  <div className='newsItemDate'>{newsItem.date}</div>
                  <div className='newsItemContent'>{newsItem.content}</div>
                </div>
                {newsItem.img && <div className='newsItemImgContainer'><img src={newsItem.img} /></div>}
              </div>
            )
          })
        }
      </div>
    </NewsContainer>
  )
};

export default NewsView;
