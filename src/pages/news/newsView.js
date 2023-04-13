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
    margin: 17px 0 40px 140px;
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
      <div>{selectedTab}</div>
    </NewsContainer>
  )
};

export default NewsView;
