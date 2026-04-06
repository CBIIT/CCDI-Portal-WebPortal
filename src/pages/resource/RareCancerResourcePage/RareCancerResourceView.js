import React, { useState, useEffect, useRef, createRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import ReactHtmlParser from 'html-react-parser';
import { NavLink } from 'react-router-dom';
// import { MCIContent, introText } from '../../../bento/mciData';
import headerImg from '../../../assets/resources/Rare_Cancer_Header.png';
import exportIcon from '../../../assets/resources/Explore_Icon.svg';
import exportIconBlue from '../../../assets/icons/Export_Icon.svg';
import closeIcon from '../../../assets/icons/Close_Icon.svg';
import arrowDownIcon from '../../../assets/icons/Arrow_Down.svg';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import introImg from '../../../assets/resources/RCI_data_flow_chart.png'

const ResourceContainer = styled.div`
    width: 100%;

    .resourceBreadcrumbContainer {
        // width: 1420px;
        margin: 0 auto;
        display: none;
    }

    .resourceBreadcrumb {
        font-family: Public Sans;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        margin: 3px 0 3px 32px;
        line-height: 27px;
        color: #1B1B1B;
    }

    .breadcrumbLink:hover {
        color: #004e7a;
    }

    .arrowIcon {
        font-size: medium;
        padding-top: 7px;
        margin: 0 3px;
        color: #71767a;
    }

    .resourceHeader {
        width: 100%;
        height: 214px;
        background: #e6ebee;
    }

    .resourceHeaderBackground {
        width: 100%;
        height: 214px;
        background-image: url(${props => props.headerImg || headerImg});
        background-repeat:no-repeat;
        background-position:center;
    }

    .resourceHeaderText {
        // width: 1420px;
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
        // width: 1420px;
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
        padding: 42px 34px 23px 0;
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

        .resourceBreadcrumbContainer {
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

        .resourceBreadcrumb {
            margin-left: 16px;
        }
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

    @media (max-width: 865px) {
        .resourceHeaderBackground {
            width: 865px;
        }
    }
`;

const ResourceBody = styled.div`
    @media (min-width: 1420px) {
        width: 1420px;
    }

    margin: 0 auto;
    display: flex;
    padding: 55px 32px 0 32px; 
    .navSection {
        width: 240px;
        color: #477C90;
        position: relative;
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

    .subtitle {
        margin-left: 20px;
    }

    .contentSection {
        display: flex;
        width: calc(100% - 240px);
        padding: 0 32px 0 36px;
        margin-bottom: 100px;
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

        .link {
            padding-right: 20px;
            background: url(${exportIconBlue}) right center no-repeat;
        }
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

    .mciSubtitle {
        color: #05555C;
        font-family: Poppins;
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 26px; /* 118.182% */
        letter-spacing: -0.044px;
        text-transform: uppercase;
        margin-left: 20px;
        margin-bottom: 24px;
    }

    p {
        font-weight: 500;
        margin-top: 0;
        min-width: 0;
    }

    li {
        font-weight: 500;
    }

    h3 {
        color: #05555C;
        font-family: Poppins;
        font-size: 18px;
        font-style: italic;
        font-weight: 500;
        line-height: 26px; /* 144.444% */
        letter-spacing: -0.036px;
        margin-bottom: 24px;
        margin-top: -12px;
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
            line-break: anywhere;
        }

        h4 {
            font-family: Poppins;
            font-weight: 400;
            font-size: 19px;
            line-height: 21px;
            letter-spacing: 0.02em;
        }

        ul {
            padding-left: 30px;
        }

        .link {
            padding-right: 20px;
            background: url(${exportIconBlue}) right center no-repeat;
        }
    }

    .donutContainer {
        display: flex;
    }

    .donutTitleContainer {
        width: 100%;
        font-family: Poppins;
        font-size: 19px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0.02em;
        text-align: center;

        h4 {
            width: 400px;
            margin: 120px 0 0 150px;
        }

    }

    .introImg {
        width: 75%;
        max-width: 467px;
        margin-bottom: 30px;
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

        .mciSection {
            padding: 0 5px;
        }

        .mobileCollapse {
            display: block;
            @media (max-width: 767px) {
                display: none;
            }
        }

        .mciSubtitle {
            margin-left: 0;
        }

        .mciContentContainer {
            margin-left: 0;
        }
    }
`;

const DEFAULT_DOWNLOAD_CONFIG = {
  url: 'https://raw.githubusercontent.com/CBIIT/CCDI_Hub_Assets/main/PDF/Resources/RCI/rare-cancer-study_contact.pdf',
  filename: 'rare-cancer-study_contact.pdf',
};

async function handleContactFormDownload(e, config) {
  e.preventDefault();
  const { url, filename } = config && config.url ? config : DEFAULT_DOWNLOAD_CONFIG;
  const downloadUrl = url;

  const isSameOrigin = (targetUrl) => {
    try {
      return new URL(targetUrl, window.location.origin).origin === window.location.origin;
    } catch {
      return true; // relative path
    }
  };

  if (isSameOrigin(downloadUrl)) {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  try {
    const res = await fetch(downloadUrl, { mode: 'cors' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error('Download failed:', err);
    window.open(downloadUrl, '_blank');
  }
}

function ResourceContent({ htmlContent, downloadConfig }) {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const config = downloadConfig || DEFAULT_DOWNLOAD_CONFIG;
    const handler = (e) => handleContactFormDownload(e, config);
    const links = container.querySelectorAll('[data-action="download-contact-form"]');
    links.forEach((el) => {
      el.addEventListener('click', handler);
    });
    return () => {
      links.forEach((el) => {
        el.removeEventListener('click', handler);
      });
    };
  }, [htmlContent, downloadConfig]);
  return (
    <div ref={containerRef}>
      {ReactHtmlParser(htmlContent)}
    </div>
  );
}

const RareCancerResourceView = ({data}) => {
    const [selectedNavTitle, setSelectedNavTitle] = useState('');
    const [stickyNavStyle, setStickyNavStyle] = useState('navList');
    const sectionList = useRef([]);
    const location = useLocation();
    const MCIContent = data.rareCancerContent;
    if (MCIContent) {
        sectionList.current = MCIContent.map((element, i) => {
            return sectionList.current[i] || createRef()
        });
    }
    const handleScroll = () => {
        const bodyElement = document.getElementById('MCIBody');
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
            setStickyNavStyle("navListSticky");
            if (footerToTop < leftNavHeight + 55) {
                setStickyNavStyle("navListAbsolute");
            }
        } else {
            setStickyNavStyle("navList");
        }
    }

    useEffect(() => {
        const hash = location.hash ? location.hash.slice(1) : null;
        if (!hash) {
            window.scrollTo(0, 0);
        }
        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Scroll to hash anchor when data is loaded (YAML is async)
    useEffect(() => {
        const hash = location.hash ? location.hash.slice(1).toUpperCase() : null;
        if (!hash || !MCIContent) return;

        const scrollToAnchor = () => {
            const element = document.getElementById(hash);  
            if (element) {
                setSelectedNavTitle(hash);
                window.scrollTo({
                    top: element.offsetTop - 55,
                    behavior: 'smooth'
                });
            }
        };

        scrollToAnchor();
        // Retry after a short delay in case DOM hasn't finished painting
        const timer = setTimeout(scrollToAnchor, 1000);
        return () => clearTimeout(timer);
    }, [location.hash, MCIContent]);

    const handleClickEvent = (event) => {
        const id = event.target.getAttribute('name');
        setSelectedNavTitle(id);
        const element = document.getElementById(id);
        window.scrollTo({ 
            top: element.offsetTop - 55,
            behavior: "smooth" 
        });
    }

    const handleCollapseSection = e => {
        const i = e.target.getAttribute("name");
        const currentDisplay = sectionList.current[i].current.style.display;
        if (currentDisplay === 'block') {
            sectionList.current[i].current.style.display = 'none';
            e.target.className = 'mciTitleMobile sectionCollapse';
        } else {
            sectionList.current[i].current.style.display = 'block';
            e.target.className = 'mciTitleMobile';
        }
    }

    return (
        <ResourceContainer headerImg={data.RCI_Header}>
            <div className='resourceBreadcrumbContainer'>
                <div className='resourceBreadcrumb'>
                    <NavLink className="breadcrumbLink" to='/'>Home</NavLink>
                    <ArrowForwardIosIcon className='arrowIcon' alt="arrowIcon"/>
                    <span>Molecular Characterization Initative</span>
                    </div>
            </div>
            <div className='resourceHeader'>
                <div className='resourceHeaderBackground'><div className='resourceHeaderText'>CCDI Hub</div></div>
            </div>
            <div className='resourceTitleContainer'>
                <div className='resourceTitle'>
                    <div className='resourceTitleText'>Pediatric, Adolescent, and Young Adult Rare Cancer Study</div>
                </div>
            </div>
            <ResourceBody id='MCIBody'>
                <div className='navSection'>
                    <div className={stickyNavStyle} id='leftNav'>
                        <div className='navTitle'>TOPICS</div>
                        {
                            MCIContent && MCIContent.map((mci, topicid) => {
                                const topickey = `topic_${topicid}`;
                                return (
                                    <>
                                        <div name={mci.id} className={selectedNavTitle === mci.id ? 'navTopicItem selected' : 'navTopicItem'} key={topickey} onClick={handleClickEvent}>{mci.topic}</div>
                                        <div>
                                            {
                                                mci.list.map((mciItem, idx) => {
                                                    const listItemKey = `listItem_${idx}`;
                                                        return (
                                                            <div name={mciItem.id} className={selectedNavTitle === mciItem.id ? 'navTopicItem selected subtitle' : 'navTopicItem subtitle'} key={listItemKey} onClick={handleClickEvent}>{mciItem.subtopic}</div>
                                                        )
                                                })
                                            }
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='contentSection'>
                    <div className='contentList'>
                        {data.rareCancerIntroText && <div className='introContainer'><ResourceContent htmlContent={data.rareCancerIntroText} downloadConfig={data.RCI_DOWNLOAD_CONFIG} /></div>}
                        <div style={{ justifyContent: 'center', display: 'flex'}}>
                            <img className="introImg" src={data.RCI_Data_Flow_Chart_URL || introImg} alt="RCI data flow" />
                        </div>
                        {
                            MCIContent && MCIContent.map((mci, mciidx) => {
                                const mcikey = `mci_${mciidx}`;
                                return (
                                    <div key={mcikey}>
                                        <div id={mci.id} className='mciTitle'>{mci.topic && mci.topic}</div>
                                        <div id={mci.id} name={mciidx} className='mciTitleMobile sectionCollapse' onClick={handleCollapseSection}>{mci.topic && mci.topic}</div>
                                        <div className="mciSection mobileCollapse" ref={sectionList.current[mciidx]}>
                                        {
                                            mci.list.map((mciItem, idx) => {
                                                return (
                                                    <>
                                                        <div id={mciItem.id} className='mciSubtitle'>{mciItem.subtopic && mciItem.subtopic}</div>
                                                        <div className='mciContentContainer'>
                                                            {mciItem.content && <ResourceContent htmlContent={mciItem.content} downloadConfig={data.RCI_DOWNLOAD_CONFIG} />}
                                                        </div>
                                                        {mciItem.content && <div style={{height: '40px'}} />}
                                                    </>
                                                )
                                            })
                                        }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </ResourceBody>
        </ResourceContainer>
    )
}

export default RareCancerResourceView;
