import React, { useState, useEffect, useRef, createRef } from 'react';
import styled from 'styled-components';
import MCIJson2TsvMarkdown from './MCIJson2TsvMarkdown';
import { buildMciJson2TsvNavItems } from './parseMciJson2TsvMarkdown';
import headerImg from '../../../assets/resources/MCI_header_white.png';
import exportIcon from '../../../assets/resources/Explore_Icon.svg';
import closeIcon from '../../../assets/icons/Close_Icon.svg';
import arrowDownIcon from '../../../assets/icons/Arrow_Down.svg';
import exportIconBlue from '../../../assets/icons/Export_Icon.svg';

const CGC_APP_URL = 'https://cgc.sbgenomics.com/u/rowan_letter_era/ccdi-mci-json2tsv-commit';

function headerBackgroundUrl(url) {
  return `url(${JSON.stringify(url || headerImg)})`;
}

const PageContainer = styled.div`
    width: 100%;

    .resourceHeader {
        width: 100%;
        height: 214px;
        background: #e6ebee;
    }

    .resourceHeaderBackground {
        width: 100%;
        height: 214px;
        background-image: ${props => headerBackgroundUrl(props.headerImg)};
        background-repeat: no-repeat;
        background-position: center;
    }

    .resourceHeaderText {
        margin: 0 auto;
        padding: 150px 0 0 75px;
        color: #19676D;
        font-family: Poppins;
        font-size: 40px;
        font-weight: 400;
    }

    .resourceTitleContainer {
        background: #087D6F;
    }

    .resourceTitle {
        margin: 0 auto;
        display: flex;
        line-height: 38px;
        background: #087D6F;
        font-family: Poppins;
        font-weight: 600;
        color: #ffffff;
        font-size: 35px;
    }

    .resourceTitleText {
        padding: 15px 0;
        padding-left: 75px;
    }

    .goToSiteButton {
        display: flex;
        margin-left: auto;
        background: #035D63;
        font-weight: 400;
        font-size: 19px;
        line-height: 21px;
        padding: 0 25px;
    }

    .goToSiteText {
        color: #FFFFFF;
        text-decoration: none;
        padding: 23px 0;
        padding-right: 34px;
        letter-spacing: 0.02em;
        background: url(${exportIcon}) right center no-repeat;
    }

    @media (min-width: 1420px) {
        .resourceTitle {
            width: 1420px;
        }

        .resourceHeaderText {
            width: 1420px;
        }
    }

    @media (max-width: 1140px) {
        .resourceTitleText {
            padding-left: calc(50vw - 500px);
        }

        .resourceHeaderText {
            padding-left: calc(50vw - 500px);
        }
    }

    @media (max-width: 1023px) {
        .resourceTitle {
            display: block;
        }

        .resourceHeaderText {
            padding-left: 16px;
        }

        .resourceTitleText {
            padding-left: 16px;
        }

        .goToSiteButton {
            padding-left: 16px;
        }

        .goToSiteText {
            padding: 15px 34px 15px 0;
        }
    }

    @media (max-width: 900px) {
        .resourceHeaderBackground {
            width: 900px;
        }
    }
`;

const PageBody = styled.div`
    @media (min-width: 1420px) {
        width: 1420px;
    }

    margin: 0 auto;
    display: flex;
    padding: 55px 32px 0 32px;

    p {
        font-weight: 500;
    }

    li {
        font-weight: 500;
    }

    .navSection {
        width: 240px;
        color: #477C90;
        position: relative;
    }

    .introContainer {
        font-family: Inter;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        margin-bottom: 50px;

        a {
            color: #455299;
            font-weight: 700;
            text-decoration: underline;
            text-underline-position: under;
            line-break: anywhere;
        }

        img {
            max-width: 100%;
            height: auto;
            margin: 16px 0;
        }

        blockquote {
            margin: 16px 0;
            padding: 12px 16px;
            border-left: 4px solid #087D6F;
            background: #f5fafa;
        }
    }

    .navList {
        position: static;
    }

    .navListSticky {
        position: fixed;
        top: 55px;
        width: 240px;
    }

    .navListAbsolute {
        position: absolute;
        bottom: 0;
        width: 240px;
    }

    .navTitle {
        font-family: Poppins;
        font-weight: 600;
        font-size: 17px;
        letter-spacing: 0.02em;
        margin-bottom: 29px;
    }

    .navTopicItem {
        margin-bottom: 20px;
        color: #477C90;
        text-decoration: none;
        font-family: Inter;
        font-weight: 400;
        font-size: 16px;
        letter-spacing: 0.01em;
        line-height: 19px;
    }

    .selected {
        font-family: Inter;
        font-weight: 600;
        color: #05555C;
    }

    .navTopicItem:hover {
        cursor: pointer;
        font-family: Inter;
        font-weight: 600;
        color: #05555C;
    }

    .contentSection {
        display: flex;
        width: calc(100% - 240px);
        padding: 0 32px 0 50px;
        margin-bottom: 100px;
    }

    .mciTitle {
        font-family: Poppins;
        font-weight: 600;
        font-size: 25px;
        line-height: 26px;
        letter-spacing: -0.02em;
        margin-bottom: 20px;
        color: #05555C;

        @media (max-width: 767px) {
            display: none;
        }
    }

    .mciTitleMobile {
        width: 100%;
        padding: 12px 10px;
        margin-bottom: 20px;
        font-family: Open Sans;
        font-size: 18px;
        font-weight: 700;
        line-height: 20px;
        text-align: left;
        color: #FFFFFF;
        background: url(${closeIcon}) right 10px center no-repeat;
        background-color: #187C85;
        display: none;

        @media (max-width: 767px) {
            display: block;
        }
    }

    .sectionCollapse {
        background: url(${arrowDownIcon}) right 10px center no-repeat;
        background-color: #187C85;
    }

    .mciTitleMobile:hover {
        cursor: pointer;
    }

    p {
        margin-top: 0;
    }

    .mciContentContainer {
        font-family: Inter;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        margin-left: 20px;

        a {
            color: #455299;
            font-weight: 700;
            text-decoration: underline;
            text-underline-position: under;
        }

        .link {
            padding-right: 20px;
            background: url(${exportIconBlue}) right center no-repeat;
        }

        img {
            max-width: 100%;
            height: auto;
            margin: 16px 0;
            display: block;
        }

        blockquote {
            margin: 16px 0;
            padding: 12px 16px;
            border-left: 4px solid #087D6F;
            background: #f5fafa;
        }
    }

    @media (max-width: 767px) {
        padding: 55px 0 0 0;

        .navSection {
            display: none;
        }

        .contentSection {
            width: 100%;
            padding: 0 16px;
        }

        .contentList {
            width: 100%;
        }

        .mobileCollapse {
            display: block;
            @media (max-width: 767px) {
                display: none;
            }
        }

        .mciContentContainer {
            margin-left: 0;
        }
    }
`;

const MCIJson2TsvResourceView = ({ data }) => {
  const [selectedNavTitle, setSelectedNavTitle] = useState('');
  const [stickyNavStyle, setStickyNavStyle] = useState('navList');
  const sectionList = useRef([]);
  const content = data.mciJson2TsvContent;
  const navItems = buildMciJson2TsvNavItems(data.navTitles, content);
  const pageTitle = data.title || 'CCDI MCI JSON2TSV';

  if (content) {
    sectionList.current = content.map((_element, i) => sectionList.current[i] || createRef());
  }

  const handleScroll = () => {
    const bodyElement = document.getElementById('MCIJson2TsvBody');
    const footerList = document.getElementsByTagName('footer');
    let footer;
    if (window.innerWidth > 1204) {
      footer = footerList[0];
    } else if (window.innerWidth > 767) {
      footer = footerList[1];
    } else {
      footer = footerList[2];
    }
    const footerToTop = footer.getBoundingClientRect().top;
    const leftNavHeight = document.getElementById('leftNav').offsetHeight;
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > bodyElement.offsetTop) {
      setStickyNavStyle('navListSticky');
      if (footerToTop < leftNavHeight + 55) {
        setStickyNavStyle('navListAbsolute');
      }
    } else {
      setStickyNavStyle('navList');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClickEvent = (event) => {
    const id = event.target.getAttribute('name');
    setSelectedNavTitle(id);
    const element = document.getElementById(id);
    if (!element) {
      return;
    }
    window.scrollTo({
      top: element.offsetTop - 55,
      behavior: 'smooth',
    });
  };

  const handleCollapseSection = (e) => {
    const i = e.target.getAttribute('name');
    const currentDisplay = sectionList.current[i].current.style.display;
    if (currentDisplay === 'block') {
      sectionList.current[i].current.style.display = 'none';
      e.target.className = 'mciTitleMobile sectionCollapse';
    } else {
      sectionList.current[i].current.style.display = 'block';
      e.target.className = 'mciTitleMobile';
    }
  };

  return (
    <PageContainer headerImg={data.headerImage}>
      <div className="resourceHeader">
        <div className="resourceHeaderBackground">
          <div className="resourceHeaderText">CCDI Hub</div>
        </div>
      </div>
      <div className="resourceTitleContainer">
        <div className="resourceTitle">
          <div className="resourceTitleText">{pageTitle}</div>
          <div className="goToSiteButton">
            <a className="goToSiteText" href={CGC_APP_URL} target="_blank" rel="noopener noreferrer">
              CGC App
            </a>
          </div>
        </div>
      </div>
      <PageBody id="MCIJson2TsvBody">
        <div className="navSection">
          <div className={stickyNavStyle} id="leftNav">
            <div className="navTitle">TOPICS</div>
            {navItems.map((navItem, navIdx) => {
              const navKey = `nav_${navIdx}`;
              const className = selectedNavTitle === navItem.id
                ? 'navTopicItem selected'
                : 'navTopicItem';
              return (
                <div
                  name={navItem.id}
                  className={className}
                  key={navKey}
                  onClick={handleClickEvent}
                >
                  {navItem.label}
                </div>
              );
            })}
          </div>
        </div>
        <div className="contentSection">
          <div className="contentList">
            {data.introText && (
              <div className="introContainer">
                <MCIJson2TsvMarkdown>{data.introText}</MCIJson2TsvMarkdown>
              </div>
            )}
            {content && content.map((item, idx) => {
              const sectionKey = `json2tsv_${idx}`;
              return (
                <div key={sectionKey}>
                  <div id={item.id} className="mciTitle">{item.topic}</div>
                  <div
                    id={item.id}
                    name={idx}
                    className="mciTitleMobile sectionCollapse"
                    onClick={handleCollapseSection}
                  >
                    {item.topic}
                  </div>
                  <div className="mciSection mobileCollapse" ref={sectionList.current[idx]}>
                    <div className="mciContentContainer">
                      {item.content && (
                        <MCIJson2TsvMarkdown>{item.content}</MCIJson2TsvMarkdown>
                      )}
                    </div>
                    {item.content && <div style={{ height: '40px' }} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PageBody>
    </PageContainer>
  );
};

export default MCIJson2TsvResourceView;
