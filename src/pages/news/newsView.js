import React, {useState} from 'react';
import styled from 'styled-components';
import newsImg from '../../assets/news/News_Header.jpg';

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
    margin: 17px 0 40px 150px;
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
    width: 1047px;
    margin: 0 auto;
  }

  .newsItem {
    display: flex;
    height: 248px;
    border: 0.25px solid #78AEB3;
    border-radius: 0px 20px;
    margin-bottom: 29px;
    padding: 23px 32px 0 38px;
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
        <div className='newsItem'>
          <div className='newsItemTextContainer'>
            <div className='newsItemTitle'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco</div>
            <div className='newsItemDate'>APRIL 4, 2023</div>
            <div className='newsItemContent'>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
          </div>
        </div>
      </div>
    </NewsContainer>
  )
};

export default NewsView;
